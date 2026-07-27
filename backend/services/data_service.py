import yfinance as yf
import pandas as pd
from typing import Dict, Any, Tuple, List
from fastapi import HTTPException
from concurrent.futures import ThreadPoolExecutor
from backend.config import logger
from backend.utils import safe_float

def fetch_yahooquery_fallback(symbol: str) -> Dict[str, Any]:
    """Fallback Tier 2: Uses yahooquery if yfinance fails to get basic info."""
    try:
        from yahooquery import Ticker
        t = Ticker(symbol)
        yq_info = {}
        
        summary = t.summary_detail.get(symbol, {})
        if isinstance(summary, dict):
            yq_info["previousClose"] = summary.get("previousClose")
            yq_info["regularMarketPreviousClose"] = summary.get("previousClose")
            yq_info["marketCap"] = summary.get("marketCap")
            yq_info["trailingPE"] = summary.get("trailingPE")
            yq_info["forwardPE"] = summary.get("forwardPE")
            
        fin_data = t.financial_data.get(symbol, {})
        if isinstance(fin_data, dict):
            yq_info["currentPrice"] = fin_data.get("currentPrice")
            yq_info["returnOnEquity"] = fin_data.get("returnOnEquity")
            yq_info["returnOnAssets"] = fin_data.get("returnOnAssets")
            yq_info["debtToEquity"] = fin_data.get("debtToEquity")
            yq_info["currentRatio"] = fin_data.get("currentRatio")
            yq_info["operatingMargins"] = fin_data.get("operatingMargins")
            yq_info["totalRevenue"] = fin_data.get("totalRevenue")
            
        profile = t.asset_profile.get(symbol, {})
        if isinstance(profile, dict):
            yq_info["sector"] = profile.get("sector")
            yq_info["industry"] = profile.get("industry")
            
        qt = t.quote_type.get(symbol, {})
        if isinstance(qt, dict):
            yq_info["shortName"] = qt.get("shortName")
            yq_info["longName"] = qt.get("longName")
            yq_info["symbol"] = qt.get("symbol")
            
        return yq_info
    except Exception as e:
        logger.error(f"yahooquery fallback failed for {symbol}: {e}")
        return {}

def fetch_raw_financial_data(symbol: str) -> Tuple[Dict[str, Any], List[Dict[str, Any]], List[Dict[str, Any]], List[Dict[str, Any]], Dict[str, Any]]:
    """Fetches company ticker info, price info, and historical statements strictly from Yahoo Finance API (yfinance/yahooquery)."""
    raw_sym = symbol.strip().upper()
    if not (raw_sym.endswith(".NS") or raw_sym.endswith(".BO")):
        raw_sym = f"{raw_sym}.NS"

    annual_results = []
    bs_results = []
    cf_results = []

    logger.info(f"Fetching Yahoo Finance API data for {raw_sym}")
    ticker = yf.Ticker(raw_sym)

    with ThreadPoolExecutor(max_workers=4) as executor:
        future_info = executor.submit(lambda: ticker.info or {})
        future_income = executor.submit(lambda: ticker.financials)
        future_bs = executor.submit(lambda: ticker.balance_sheet)
        future_cf = executor.submit(lambda: ticker.cashflow)

        try:
            info = future_info.result()
        except Exception as e:
            logger.warning(f"yfinance info fetch failed: {e}")
            info = {}
            
        try:
            income_stmt = future_income.result()
        except Exception as e:
            logger.warning(f"yfinance financials fetch failed: {e}")
            income_stmt = None
            
        try:
            balance_sheet = future_bs.result()
        except Exception as e:
            logger.warning(f"yfinance balance sheet fetch failed: {e}")
            balance_sheet = None
            
        try:
            cashflow = future_cf.result()
        except Exception as e:
            logger.warning(f"yfinance cashflow fetch failed: {e}")
            cashflow = None

    has_name = info.get("shortName") or info.get("longName") or info.get("symbol")
    yf_price_raw = info.get("currentPrice") or info.get("regularMarketPrice") or info.get("previousClose")

    # Fallback to yahooquery if yfinance info is empty
    if not has_name or yf_price_raw is None:
        logger.warning(f"yfinance info missing for {raw_sym}. Triggering yahooquery fallback...")
        yq_info = fetch_yahooquery_fallback(raw_sym)
        info = {**info, **yq_info}
        has_name = info.get("shortName") or info.get("longName") or info.get("symbol")
        yf_price_raw = info.get("currentPrice") or info.get("regularMarketPrice") or info.get("previousClose")
        
        if not has_name or yf_price_raw is None:
            logger.warning(f"Yahoo Finance APIs blocked/failed for {raw_sym}. Triggering Screener.in fallback...")
            from backend.utils import fetch_screener_ratios
            try:
                scr_data = fetch_screener_ratios(raw_sym)
                if scr_data and scr_data.get("name") and scr_data.get("current_price"):
                    info["shortName"] = scr_data["name"]
                    info["longName"] = scr_data["name"]
                    info["symbol"] = raw_sym
                    info["currentPrice"] = scr_data["current_price"]
                    info["previousClose"] = scr_data["current_price"]
                    info["marketCap"] = scr_data.get("market_cap", 0) * 10000000
                    info["trailingPE"] = scr_data.get("pe")
                    info["returnOnEquity"] = scr_data.get("roe", 0) / 100.0 if scr_data.get("roe") else None
                    info["returnOnCapitalEmployed"] = scr_data.get("roce", 0) / 100.0 if scr_data.get("roce") else None
                    info["debtToEquity"] = scr_data.get("de", 0) * 100.0 if scr_data.get("de") else None
                    info["currentRatio"] = scr_data.get("current_ratio")
                    info["interestCoverage"] = scr_data.get("interest_coverage")
                    
                    if scr_data.get("annual_results"):
                        annual_results = scr_data["annual_results"]
                    if scr_data.get("bs_results"):
                        bs_results = scr_data["bs_results"]
                        
                    has_name = True
                    yf_price_raw = scr_data["current_price"]
                else:
                    raise HTTPException(status_code=404, detail=f"Stock ticker '{symbol}' was not found on NSE/BSE and Screener.in fallback failed.")
            except Exception as e:
                logger.error(f"Screener.in fallback failed for {raw_sym}: {e}", exc_info=True)
                raise HTTPException(status_code=404, detail=f"Stock ticker '{symbol}' was not found on NSE/BSE. Yahoo and Screener fallbacks failed: {str(e)}")

    current_price = float(yf_price_raw)
    prev_close = safe_float(info.get("previousClose") or info.get("regularMarketPreviousClose"), current_price)
    price_change = current_price - prev_close
    price_change_pct = (price_change / prev_close * 100) if prev_close else 0.0

    mcap_raw = safe_float(info.get("marketCap"), 0)
    mcap_lakhs = mcap_raw / 100000
    mcap_type = "Large Cap" if mcap_raw > 200000000000 else ("Mid Cap" if mcap_raw > 50000000000 else "Small Cap")
    is_bank = (info.get("sector") == "Financial Services") or ("Bank" in info.get("industry", "")) or ("Bank" in info.get("shortName", ""))

    # Key Ratios from Yahoo API
    pe = safe_float(info.get("trailingPE") or info.get("forwardPE"))
    roe_raw = safe_float(info.get("returnOnEquity"))
    roe_val = roe_raw * 100 if roe_raw is not None else None
    
    roa_raw = safe_float(info.get("returnOnAssets"))
    roa_val = roa_raw * 100 if roa_raw is not None else None
    
    roce_val = safe_float(info.get("returnOnCapitalEmployed"))
    if roce_val is not None:
        roce_val *= 100
        
    de_raw = safe_float(info.get("debtToEquity"))
    de_val = de_raw / 100.0 if de_raw is not None else None
    cr_val = safe_float(info.get("currentRatio"))
    ic_val = safe_float(info.get("interestCoverage"))
    opm_raw = safe_float(info.get("operatingMargins"))
    opm_val = opm_raw * 100 if opm_raw is not None else None
    revenue_raw = safe_float(info.get("totalRevenue"))
    industry_pe = None

    if not annual_results:
        annual_results = []
    if not bs_results:
        bs_results = []
    if not cf_results:
        cf_results = []
    
    latest_op_inc = 0
    latest_interest_expense = 0

    # 1. Income Statement from Yahoo
    if income_stmt is not None and not income_stmt.empty:
        cols = list(income_stmt.columns)[:6]
        cols.reverse() # Chronological
        for col in cols:
            year_str = str(col.year) if hasattr(col, 'year') else str(col)[:4]
            sales = safe_float(income_stmt.loc['Total Revenue', col] if 'Total Revenue' in income_stmt.index else (income_stmt.loc['Revenue', col] if 'Revenue' in income_stmt.index else 0), 0) / 10000000
            net_profit = safe_float(income_stmt.loc['Net Income', col] if 'Net Income' in income_stmt.index else (income_stmt.loc['Net Income Common Stockholders', col] if 'Net Income Common Stockholders' in income_stmt.index else 0), 0) / 10000000
            op_inc = safe_float(income_stmt.loc['Operating Income', col] if 'Operating Income' in income_stmt.index else net_profit, 0) / 10000000
            
            int_exp = 0
            if 'Interest Expense' in income_stmt.index:
                int_exp = safe_float(income_stmt.loc['Interest Expense', col], 0) / 10000000
                
            if is_bank or op_inc == 0:
                opm = (net_profit / sales * 100) if sales and sales > 0 else (opm_val if opm_val is not None else 0)
            else:
                opm = (op_inc / sales * 100) if sales and sales > 0 else (opm_val if opm_val is not None else 0)
            
            if col == cols[-1]:
                latest_op_inc = op_inc
                latest_interest_expense = int_exp
                opm_val = round(opm, 1)
                
            annual_results.append({
                "year": year_str,
                "sales": round(sales, 2),
                "netProfit": round(net_profit, 2),
                "opm": round(opm, 1)
            })

    # 2. Balance Sheet from Yahoo
    if balance_sheet is not None and not balance_sheet.empty:
        cols = list(balance_sheet.columns)[:6]
        cols.reverse()
        for col in cols:
            year_str = str(col.year) if hasattr(col, 'year') else str(col)[:4]
            reserves_val = None
            if 'Retained Earnings' in balance_sheet.index:
                val = balance_sheet.loc['Retained Earnings', col]
                if not pd.isna(val) and val != 0: reserves_val = val
            if (reserves_val is None or pd.isna(reserves_val)) and 'Stockholders Equity' in balance_sheet.index:
                val = balance_sheet.loc['Stockholders Equity', col]
                if not pd.isna(val) and val != 0: reserves_val = val
            reserves = safe_float(reserves_val, 0) / 10000000

            debt_val = None
            if 'Total Debt' in balance_sheet.index:
                val = balance_sheet.loc['Total Debt', col]
                if not pd.isna(val) and val != 0: debt_val = val
            borrowings = safe_float(debt_val, 0) / 10000000

            assets_val = None
            if 'Total Assets' in balance_sheet.index:
                val = balance_sheet.loc['Total Assets', col]
                if not pd.isna(val): assets_val = val
            assets = safe_float(assets_val, 0) / 10000000

            bs_results.append({
                "year": year_str,
                "reserves": round(reserves, 2),
                "borrowings": round(borrowings, 2),
                "totalAssets": round(assets, 2)
            })

    # 3. Cash Flow from Yahoo
    if cashflow is not None and not cashflow.empty:
        cols = list(cashflow.columns)[:6]
        cols.reverse()
        for col in cols:
            year_str = str(col.year) if hasattr(col, 'year') else str(col)[:4]
            cfo = safe_float(cashflow.loc['Operating Cash Flow', col] if 'Operating Cash Flow' in cashflow.index else 0, 0) / 10000000
            cfi = safe_float(cashflow.loc['Investing Cash Flow', col] if 'Investing Cash Flow' in cashflow.index else 0, 0) / 10000000
            cff = safe_float(cashflow.loc['Financing Cash Flow', col] if 'Financing Cash Flow' in cashflow.index else 0, 0) / 10000000
            cf_results.append({
                "year": year_str,
                "operatingCashFlow": round(cfo, 2),
                "investingCashFlow": round(cfi, 2),
                "financingCashFlow": round(cff, 2)
            })

    # Interest coverage calculation if missing but interest expense is present
    if ic_val is None or ic_val == 0:
        if latest_interest_expense > 0:
            ic_val = latest_op_inc / latest_interest_expense
        else:
            ic_val = None

    if roa_val is None or roa_val == 0:
        if annual_results and bs_results:
            latest_np = annual_results[-1].get("netProfit", 0)
            latest_ta = bs_results[-1].get("totalAssets", 0)
            if latest_np > 0 and latest_ta > 0:
                roa_val = round((latest_np / latest_ta) * 100, 2)

    if cr_val is None and balance_sheet is not None and not balance_sheet.empty:
        col = balance_sheet.columns[0]
        if 'Current Assets' in balance_sheet.index and 'Current Liabilities' in balance_sheet.index:
            ca = balance_sheet.loc['Current Assets', col]
            cl = balance_sheet.loc['Current Liabilities', col]
            if ca and cl and not pd.isna(ca) and not pd.isna(cl) and float(cl) > 0:
                cr_val = round(float(ca) / float(cl), 2)

    most_recent_q_ts = 0
    try:
        if income_stmt is not None and not income_stmt.empty:
            col = income_stmt.columns[0]
            if hasattr(col, 'timestamp'):
                most_recent_q_ts = int(col.timestamp())
            elif hasattr(col, 'year'):
                import datetime
                most_recent_q_ts = int(datetime.datetime(col.year, getattr(col, 'month', 1), getattr(col, 'day', 1)).timestamp())
    except Exception:
        pass

    if not most_recent_q_ts:
        most_recent_q_ts = int(safe_float(info.get("mostRecentQuarter") or info.get("earningsTimestamp") or info.get("lastFiscalYearEnd"), 0))

    price_info = {
        "current_price": current_price,
        "price_change": price_change,
        "price_change_pct": price_change_pct,
        "mcap_lakhs": mcap_lakhs,
        "mcap_type": mcap_type,
        "is_bank": is_bank,
        "pe": pe,
        "roe_val": roe_val,
        "roa_val": roa_val,
        "roce_val": roce_val,
        "de_val": de_val,
        "cr_val": cr_val,
        "ic_val": round(ic_val, 2) if ic_val is not None else None,
        "opm_val": opm_val,
        "revenue_raw": revenue_raw,
        "industry_pe": industry_pe,
        "lastQuarterTimestamp": most_recent_q_ts
    }

    # Fetch Screener.in enrichment for 1Yr & 5Yr growth & ratio precision
    try:
        screener_data = fetch_screener_enrichment(raw_sym)
        if screener_data:
            logger.info(f"Screener.in enrichment merged for {raw_sym}")
            price_info["sales_1yr"] = screener_data.get("sales_1yr")
            price_info["sales_5yr"] = screener_data.get("sales_5yr")
            price_info["profit_1yr"] = screener_data.get("profit_1yr")
            price_info["profit_5yr"] = screener_data.get("profit_5yr")
            price_info["opm_1yr"] = screener_data.get("opm_1yr") or opm_val
            price_info["opm_5yr_avg"] = screener_data.get("opm_5yr_avg")
            price_info["roe_1yr"] = screener_data.get("roe_1yr") or roe_val
            price_info["roe_5yr"] = screener_data.get("roe_5yr")
            price_info["roce_1yr"] = screener_data.get("roce_1yr") or roce_val
            price_info["roce_5yr"] = screener_data.get("roce_5yr")
            price_info["roa_1yr"] = screener_data.get("roa_1yr") or roa_val
            price_info["roa_5yr"] = screener_data.get("roa_5yr")
            
            if screener_data.get("roe_1yr") is not None: price_info["roe_val"] = screener_data["roe_1yr"]
            if screener_data.get("roce_1yr") is not None: price_info["roce_val"] = screener_data["roce_1yr"]
            if screener_data.get("roa_1yr") is not None: price_info["roa_val"] = screener_data["roa_1yr"]
            if screener_data.get("stock_pe"): price_info["pe"] = screener_data["stock_pe"]
            if screener_data.get("industry_pe"): price_info["industry_pe"] = screener_data["industry_pe"]
            if screener_data.get("debt_to_equity") is not None: price_info["de_val"] = screener_data["debt_to_equity"]
            if screener_data.get("current_ratio") is not None: price_info["cr_val"] = screener_data["current_ratio"]
            if screener_data.get("interest_coverage") is not None: price_info["ic_val"] = screener_data["interest_coverage"]
            if screener_data.get("shareholding_trend"):
                price_info["shareholding_trend"] = screener_data["shareholding_trend"]
                price_info["shareholding_latest_q"] = screener_data.get("shareholding_latest_q")
    except Exception as e:
        logger.warning(f"Screener enrichment error for {raw_sym}: {e}")

    return info, annual_results, bs_results, cf_results, price_info

def fetch_screener_enrichment(symbol: str) -> Dict[str, Any]:
    """Fetches key 1Yr and 5Yr growth metrics, ratios, and Shareholding Pattern from Screener.in."""
    import requests
    from bs4 import BeautifulSoup

    clean_sym = symbol.replace('.NS', '').replace('.BO', '')
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    url = f'https://www.screener.in/company/{clean_sym}/consolidated/'
    
    try:
        res = requests.get(url, headers=headers, timeout=4)
        if res.status_code != 200:
            res = requests.get(f'https://www.screener.in/company/{clean_sym}/', headers=headers, timeout=4)
        if res.status_code != 200:
            return {}
        
        soup = BeautifulSoup(res.text, 'html.parser')
        enrichment = {}

        # 1. Top ratios
        for li in soup.find_all('li', class_=lambda c: c and 'flex' in c):
            name_el = li.find('span', class_='name')
            val_el = li.find('span', class_='number')
            if name_el and val_el:
                k = name_el.text.strip().lower()
                v_str = val_el.text.strip().replace(',', '').replace('%', '')
                try:
                    val = float(v_str)
                    if 'stock p/e' in k: enrichment['stock_pe'] = val
                    elif 'industry pe' in k: enrichment['industry_pe'] = val
                    elif 'roce' in k and '5yr' not in k: enrichment['roce_1yr'] = val
                    elif 'roce 5yr' in k: enrichment['roce_5yr'] = val
                    elif 'roe' in k and '5yr' not in k: enrichment['roe_1yr'] = val
                    elif 'roe 5yr' in k or 'return on equity 5yr' in k: enrichment['roe_5yr'] = val
                    elif 'sales growth' in k and '5yr' not in k and '5years' not in k: enrichment['sales_1yr'] = val
                    elif 'sales growth 5year' in k or 'sales growth 5yrs' in k: enrichment['sales_5yr'] = val
                    elif 'profit growth' in k and '5yr' not in k: enrichment['profit_1yr'] = val
                    elif 'profit var 5yrs' in k or 'profit growth 5yr' in k: enrichment['profit_5yr'] = val
                    elif 'opm' in k and '5yr' not in k: enrichment['opm_1yr'] = val
                    elif 'opm 5year' in k or 'opm 5yr' in k: enrichment['opm_5yr_avg'] = val
                    elif 'return on assets' in k and '5yr' not in k: enrichment['roa_1yr'] = val
                    elif 'roa 5yr' in k: enrichment['roa_5yr'] = val
                    elif 'debt to equity' in k: enrichment['debt_to_equity'] = val
                    elif 'current ratio' in k: enrichment['current_ratio'] = val
                    elif 'interest coverage' in k: enrichment['interest_coverage'] = val
                except ValueError:
                    pass

        # 2. Ranges tables (Sales Growth, Profit Growth, ROE)
        for table in soup.find_all('table', class_='ranges-table'):
            th = table.find('th')
            h_title = th.text.strip().lower() if th else ''
            rows = {}
            for tr in table.find_all('tr'):
                tds = tr.find_all('td')
                if len(tds) == 2:
                    period = tds[0].text.strip().replace(':', '')
                    val_s = tds[1].text.strip().replace('%', '')
                    try:
                        rows[period] = float(val_s)
                    except ValueError:
                        pass

            val_1yr = rows.get('TTM') if 'TTM' in rows else (rows.get('1 Year') if '1 Year' in rows else (rows.get('Last Year') if 'Last Year' in rows else None))
            val_5yr = rows.get('5 Years')

            if 'sales' in h_title:
                if 'sales_1yr' not in enrichment and val_1yr is not None: enrichment['sales_1yr'] = val_1yr
                if 'sales_5yr' not in enrichment and val_5yr is not None: enrichment['sales_5yr'] = val_5yr
            elif 'profit' in h_title:
                if 'profit_1yr' not in enrichment and val_1yr is not None: enrichment['profit_1yr'] = val_1yr
                if 'profit_5yr' not in enrichment and val_5yr is not None: enrichment['profit_5yr'] = val_5yr
            elif 'equity' in h_title or 'roe' in h_title:
                if 'roe_1yr' not in enrichment and val_1yr is not None: enrichment['roe_1yr'] = val_1yr
                if 'roe_5yr' not in enrichment and val_5yr is not None: enrichment['roe_5yr'] = val_5yr

        # 3. Profit & Loss table for OPM 1Yr & OPM 5Yr Avg
        pnl = soup.find('section', id='profit-loss')
        if pnl and pnl.find('table'):
            rev_vals, exp_vals, opm_vals = [], [], []
            for tr in pnl.find('table').find_all('tr'):
                tds = [td.text.strip().replace(',', '').replace('%', '') for td in tr.find_all(['th', 'td'])]
                if not tds: continue
                label = tds[0].lower()
                if 'revenue' in label or 'sales' in label:
                    rev_vals = [float(x) for x in tds[1:] if x and x != 'TTM']
                elif 'expenses' in label:
                    exp_vals = [float(x) for x in tds[1:] if x and x != 'TTM']
                elif 'opm' in label or 'financing margin' in label:
                    opm_vals = [float(x) for x in tds[1:] if x and x != 'TTM']

            if rev_vals and exp_vals:
                calc_opms = [(r - e) / r * 100 for r, e in zip(rev_vals, exp_vals) if r > 0]
                if calc_opms:
                    enrichment['opm_1yr'] = round(calc_opms[-1], 1)
                    enrichment['opm_5yr_avg'] = round(sum(calc_opms[-5:]) / len(calc_opms[-5:]), 1) if len(calc_opms) >= 5 else round(sum(calc_opms)/len(calc_opms), 1)
            elif opm_vals:
                enrichment['opm_1yr'] = round(opm_vals[-1], 1)
                enrichment['opm_5yr_avg'] = round(sum(opm_vals[-5:]) / len(opm_vals[-5:]), 1) if len(opm_vals) >= 5 else round(sum(opm_vals)/len(opm_vals), 1)

        # 4. Shareholding Pattern Trend Section
        sh_section = soup.find('section', id='shareholding')
        if sh_section:
            sh_table = sh_section.find('table')
            if sh_table:
                header_row = sh_table.find('tr')
                if header_row:
                    quarters = [th.text.strip() for th in header_row.find_all('th')[1:] if th.text.strip()]
                    if quarters:
                        q_data = {q: {'quarter': q, 'promoter': 0.0, 'fii': 0.0, 'dii': 0.0, 'public': 0.0} for q in quarters}
                        for tr in sh_table.find_all('tr')[1:]:
                            tds = [td.text.strip().replace('\xa0+', '').replace('\n', '') for td in tr.find_all(['td', 'th'])]
                            if len(tds) < 2: continue
                            row_label = tds[0].strip().lower()
                            values = tds[1:]
                            for idx, val_str in enumerate(values):
                                if idx >= len(quarters): break
                                q_name = quarters[idx]
                                clean_val = val_str.replace('%', '').replace(',', '').strip()
                                try: val = float(clean_val)
                                except ValueError: val = 0.0
                                
                                if 'promoter' in row_label: q_data[q_name]['promoter'] = round(val, 2)
                                elif 'fii' in row_label: q_data[q_name]['fii'] = round(val, 2)
                                elif 'dii' in row_label: q_data[q_name]['dii'] = round(val, 2)
                                elif 'public' in row_label or 'government' in row_label: q_data[q_name]['public'] = round(q_data[q_name]['public'] + val, 2)

                        enrichment['shareholding_latest_q'] = quarters[-1]
                        enrichment['shareholding_trend'] = [q_data[q] for q in quarters]

        return enrichment
    except Exception as e:
        return {}
