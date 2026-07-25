import math
import re
from typing import Any, Optional
from backend.config import logger, HTTP_SESSION
import pandas as pd

def safe_float(val: Any, default = None):
    """Safely cast input value to float, handling None, NaN, and conversion exceptions.
    Returns None by default if val is missing, so callers can distinguish 'no data' from 0."""
    try:
        if val is None:
            return default
        f = float(val)
        if pd.isna(f) or math.isnan(f):
            return default
        return f
    except Exception:
        return default


import bs4

def fetch_screener_ratios(symbol: str) -> dict:
    """Tier 3 Data Enrichment: Scrapes Screener.in for accurate Indian stock ratios and statements using BeautifulSoup.
    Returns a dict of key ratios and statements, or empty dict on failure."""
    ticker = symbol.strip().upper()
    if ticker.endswith(".NS") or ticker.endswith(".BO"):
        ticker = ticker[:-3]
    
    url = f"https://www.screener.in/company/{ticker}/consolidated/"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}
    
    try:
        resp = HTTP_SESSION.get(url, headers=headers, timeout=8)
        if resp.status_code != 200:
            url = f"https://www.screener.in/company/{ticker}/"
            resp = HTTP_SESSION.get(url, headers=headers, timeout=8)
        
        if resp.status_code != 200:
            logger.warning(f"Screener.in fetch failed for {ticker}: HTTP {resp.status_code}")
            return {}
        
        soup = bs4.BeautifulSoup(resp.text, 'html.parser')
        ratios = {}
        annual_results = []
        bs_results = []
        cf_results = []
        shareholding = {}

        # 1. Extract top key ratios
        for li in soup.find_all('li', class_='flex'):
            name_el = li.find('span', class_='name')
            num_el = li.find('span', class_='number')
            if name_el and num_el:
                name = name_el.text.strip()
                val_raw = num_el.text.strip().replace(',', '')
                try:
                    val = float(val_raw)
                    if 'ROE' in name: ratios['roe'] = val
                    elif 'ROCE' in name: ratios['roce'] = val
                    elif 'Stock P/E' in name: ratios['pe'] = val
                    elif 'Market Cap' in name: ratios['market_cap'] = val
                    elif 'Book Value' in name: ratios['book_value'] = val
                except ValueError:
                    pass

        # 2. Industry PE from Peers section if present
        peer_sec = soup.find('section', id='peers')
        if peer_sec:
            m = re.search(r'Industry PE\s*:\s*([0-9.]+)', peer_sec.text)
            if m: ratios['industry_pe'] = float(m.group(1))

        # 3. P&L Table (Annual Results)
        pnl_sec = soup.find('section', id='profit-loss')
        if pnl_sec:
            thead = pnl_sec.find('thead')
            years = [th.text.strip() for th in thead.find_all('th')[1:] if th.text.strip()] if thead else []
            rows = {}
            for tr in pnl_sec.find_all('tr'):
                tds = tr.find_all(['td', 'th'])
                if len(tds) > 1:
                    r_name = tds[0].text.strip().replace('\xa0+', '').replace('+', '').strip()
                    vals = []
                    for td in tds[1:]:
                        txt = td.text.strip().replace(',', '').replace('%', '')
                        try: vals.append(float(txt))
                        except ValueError: vals.append(0.0)
                    rows[r_name] = vals

            sales_key = 'Revenue' if 'Revenue' in rows else ('Sales' if 'Sales' in rows else None)
            np_key = 'Net Profit' if 'Net Profit' in rows else None
            opm_key = 'OPM %' if 'OPM %' in rows else ('Financing Margin %' if 'Financing Margin %' in rows else None)

            if sales_key and np_key and years:
                sales_list = rows[sales_key]
                np_list = rows[np_key]
                opm_list = rows.get(opm_key, [0.0]*len(sales_list))
                for i in range(min(len(years), len(sales_list), len(np_list))):
                    annual_results.append({
                        'year': years[i],
                        'sales': sales_list[i],
                        'netProfit': np_list[i],
                        'opm': opm_list[i] if i < len(opm_list) else 0.0
                    })

        # 4. Balance Sheet Table
        bs_sec = soup.find('section', id='balance-sheet')
        if bs_sec:
            thead = bs_sec.find('thead')
            years = [th.text.strip() for th in thead.find_all('th')[1:] if th.text.strip()] if thead else []
            rows = {}
            for tr in bs_sec.find_all('tr'):
                tds = tr.find_all(['td', 'th'])
                if len(tds) > 1:
                    r_name = tds[0].text.strip().replace('\xa0+', '').replace('+', '').strip()
                    vals = []
                    for td in tds[1:]:
                        txt = td.text.strip().replace(',', '').replace('%', '')
                        try: vals.append(float(txt))
                        except ValueError: vals.append(0.0)
                    rows[r_name] = vals

            res_key = 'Reserves' if 'Reserves' in rows else None
            bor_key = 'Borrowing' if 'Borrowing' in rows else ('Borrowings' if 'Borrowings' in rows else None)
            ast_key = 'Total Assets' if 'Total Assets' in rows else None

            if years and res_key and bor_key:
                res_list = rows[res_key]
                bor_list = rows[bor_key]
                ast_list = rows.get(ast_key, [0.0]*len(res_list))
                for i in range(min(len(years), len(res_list), len(bor_list))):
                    bs_results.append({
                        'year': years[i],
                        'reserves': res_list[i],
                        'borrowings': bor_list[i],
                        'totalAssets': ast_list[i] if i < len(ast_list) else 0.0
                    })

        # 5. Ratios Table
        rat_sec = soup.find('section', id='ratios')
        if rat_sec:
            for tr in rat_sec.find_all('tr'):
                tds = tr.find_all(['td', 'th'])
                if len(tds) > 1:
                    r_name = tds[0].text.strip()
                    vals = []
                    for td in tds[1:]:
                        txt = td.text.strip().replace(',', '').replace('%', '')
                        try: vals.append(float(txt))
                        except ValueError: pass
                    if vals:
                        if 'Debtor Days' in r_name: ratios['debtor_days'] = vals[-1]
                        elif 'Current ratio' in r_name: ratios['current_ratio'] = vals[-1]
                        elif 'Debt to equity' in r_name: ratios['de'] = vals[-1]
                        elif 'ROCE %' in r_name and 'roce' not in ratios: ratios['roce'] = vals[-1]
                        elif 'ROE %' in r_name and 'roe' not in ratios: ratios['roe'] = vals[-1]

        # 6. Shareholding Table
        sh_sec = soup.find('section', id='shareholding')
        if sh_sec:
            for tr in sh_sec.find_all('tr'):
                tds = tr.find_all(['td', 'th'])
                if len(tds) > 1:
                    r_name = tds[0].text.strip().replace('\xa0+', '').replace('+', '').strip()
                    if tds[-1].text.strip():
                        try:
                            val = float(tds[-1].text.strip().replace('%', ''))
                            if 'Promoter' in r_name: shareholding['promoter'] = val
                            elif 'FII' in r_name: shareholding['fii'] = val
                            elif 'DII' in r_name: shareholding['dii'] = val
                            elif 'Public' in r_name: shareholding['public'] = val
                        except ValueError: pass

        ratios['annual_results'] = annual_results
        ratios['bs_results'] = bs_results
        ratios['shareholding'] = shareholding
        
        logger.info(f"Screener.in enrichment for {ticker}: found {len(ratios)} keys and {len(annual_results)} annual records.")
        return ratios

    except Exception as e:
        logger.warning(f"Screener.in scrape failed for {ticker}: {e}")
        return {}
