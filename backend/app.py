from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any, List
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests
import threading
import yfinance as yf

from backend.config import logger, DATA_CACHE, SEARCH_CACHE, HTTP_SESSION, SECTOR_PEERS
from backend.utils import safe_float
from backend.services.data_service import fetch_raw_financial_data
from backend.services.scoring_service import (
    calculate_stage1_scorecard,
    calculate_stage2_scorecard,
    calculate_valuation_and_shareholding,
    generate_business_model
)

app = FastAPI(
    title="Stock Analysis API",
    description="Backend service fetching real financial data and scoring Indian stocks according to the 7-step Research Playbook.",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def fetch_company_data(symbol: str) -> Dict[str, Any]:
    """Retrieves raw data and runs the scoring modules to construct final API payload."""
    cached_key = symbol.strip().upper()
    if not (cached_key.endswith(".NS") or cached_key.endswith(".BO")):
        cached_key = f"{cached_key}.NS"

    if cached_key in DATA_CACHE:
        logger.info(f"Returning cached data for {cached_key}")
        return DATA_CACHE[cached_key]

    # Fetch raw inputs
    info, annual_results, bs_results, cf_results, price_info = fetch_raw_financial_data(cached_key)

    # Run scoring modules
    s1_scorecard, s1_total, max_s1, s1_verdict = calculate_stage1_scorecard(info, annual_results, price_info)
    s2_scorecard, s2_total = calculate_stage2_scorecard(info, annual_results, bs_results, cf_results, price_info)
    (
        fair_price, mos_pct, mos_text, val_status, val_conclusion,
        promoter_pct, fii_pct, dii_pct, public_pct,
        latest_q, sh_trend
    ) = calculate_valuation_and_shareholding(info, price_info)

    # Format output dictionary
    result_data = {
        "symbol": cached_key,
        "name": info.get("longName") or info.get("shortName") or cached_key,
        "exchange": "NSE" if cached_key.endswith(".NS") else "BSE",
        "sector": info.get("sector") or "General Sector",
        "industry": info.get("industry") or "General Industry",
        "currentPrice": price_info["current_price"],
        "priceChange": round(price_info["price_change"], 2),
        "priceChangePercent": round(price_info["price_change_pct"], 2),
        "marketCapValue": round(price_info["mcap_lakhs"], 2),
        "marketCapType": price_info["mcap_type"],
        "lastQuarterTimestamp": price_info.get("lastQuarterTimestamp", 0),
        "keyMetrics": {
            "pe": round(price_info["pe"], 1) if price_info.get("pe") is not None else "Null",
            "roe": f"{round(price_info['roe_val'], 1)}%" if price_info.get("roe_val") is not None else "Null",
            "revenue": round(price_info["revenue_raw"] / 10000000, 2) if price_info.get("revenue_raw") is not None else "Null"
        }
    }
    
    # Add dynamic business model and sector analysis
    biz, moat, sector_analysis = generate_business_model(info, symbol)
    result_data["businessAnalysis"] = biz
    result_data["moatAnalysis"] = moat
    result_data["sectorAnalysis"] = sector_analysis

    result_data.update({
        "fundamentalAnalysis": {
            "totalScore": round(s1_total, 1),
            "maxPossibleScore": max_s1,
            "finalVerdict": s1_verdict,
            "scorecard": s1_scorecard
        },
        "deepAnalysis": {
            "totalScore": round(s2_total, 1),
            "maxPossibleScore": 10,
            "scorecard": s2_scorecard,
            "annualResults": annual_results,
            "balanceSheet": bs_results,
            "cashFlow": cf_results,
            "shareholding": {
                "latestQuarter": latest_q,
                "promoter": promoter_pct,
                "fii": fii_pct,
                "dii": dii_pct,
                "public": public_pct,
                "trend": sh_trend
            }
        },
        "valuation": {
            "peValuation": {
                "fairPrice": round(fair_price, 2)
            },
            "marginOfSafety": {
                "pct": mos_pct,
                "text": mos_text,
                "status": val_status,
                "conclusion": val_conclusion
            }
        }
    })

    DATA_CACHE[cached_key] = result_data
    return result_data

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Stock Analysis API is running."}

@app.get("/api/company/{symbol}")
def get_company(symbol: str):
    sym = symbol.strip().upper()
    if not (sym.endswith(".NS") or sym.endswith(".BO")):
        sym = f"{sym}.NS"
    try:
        data = fetch_company_data(sym)
        return data
    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        logger.error(f"Error fetching data for {symbol}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to fetch stock data for '{symbol}': {str(e)}")

@app.get("/api/search")
def search_tickers(q: str = Query(..., min_length=1)):
    """Fetches real-time Indian ticker search suggestions from Yahoo Finance"""
    query = q.strip().upper()
    if query in SEARCH_CACHE:
        logger.info(f"Returning cached search results for query: '{query}'")
        return {"query": query, "results": SEARCH_CACHE[query]}

    results = []
    seen = set()

    def do_search(term: str):
        try:
            url = "https://query2.finance.yahoo.com/v1/finance/search"
            resp = HTTP_SESSION.get(url, params={"q": term, "quotesCount": 15, "newsCount": 0}, headers={"User-Agent": "Mozilla/5.0"}, timeout=3)
            if resp.status_code == 200:
                quotes = resp.json().get("quotes", [])
                for item in quotes:
                    sym = item.get("symbol")
                    if not sym or sym in seen:
                        continue

                    # Filter: Keep ONLY Indian stocks ending with .NS or .BO
                    if not (sym.endswith(".NS") or sym.endswith(".BO")):
                        continue

                    seen.add(sym)
                    name = item.get("shortname") or item.get("longname") or sym
                    results.append({
                        "symbol": sym,
                        "name": name,
                        "exchange": "NSE" if sym.endswith(".NS") else "BSE"
                    })
        except Exception as e:
            logger.warning(f"Yahoo Finance search failed for '{term}': {e}")

    do_search(query)

    # If no results and doesn't contain a dot, try appending .NS or .BO to search
    if not results and "." not in query:
        do_search(f"{query}.NS")
        if not results:
            do_search(f"{query}.BO")

    # If still no results and it ends with common typos
    if not results and len(query) > 4:
        if "EQUITUS" in query:
            do_search("EQUITAS")

    final_results = results[:8]
    SEARCH_CACHE[query] = final_results
    return {"query": query, "results": final_results}

# Peer data cache keyed by sector
PEER_CACHE: Dict[str, List[Dict[str, Any]]] = {}

def _fetch_single_peer(peer_sym: str) -> Dict[str, Any] | None:
    """Fetch lightweight metrics for a single peer ticker."""
    try:
        ticker = yf.Ticker(peer_sym)
        info = ticker.info or {}
        name = info.get("longName") or info.get("shortName")
        if not name:
            return None

        price = info.get("currentPrice") or info.get("regularMarketPrice") or info.get("previousClose")
        if price is None:
            return None

        mcap_raw = safe_float(info.get("marketCap"), 0)
        revenue_raw = safe_float(info.get("totalRevenue"), 0)
        opm_val = safe_float(info.get("operatingMargins"), 0) * 100
        roe_val = safe_float(info.get("returnOnEquity"), 0) * 100
        pe = safe_float(info.get("trailingPE") or info.get("forwardPE"), 0)

        return {
            "symbol": peer_sym,
            "name": name,
            "currentPrice": round(float(price), 2),
            "marketCap": round(mcap_raw / 10000000, 2),   # Crores
            "revenue": round(revenue_raw / 10000000, 2),   # Crores
            "opm": round(opm_val, 1),
            "roe": round(roe_val, 1),
            "pe": round(pe, 1),
        }
    except Exception as e:
        logger.warning(f"Failed to fetch peer data for {peer_sym}: {e}")
        return None

@app.get("/api/peers/{sector}")
def get_peers(sector: str):
    """Fetches live peer comparison data for a given sector."""
    sector_key = sector.strip()

    if sector_key in PEER_CACHE:
        logger.info(f"Returning cached peer data for sector: '{sector_key}'")
        return {"sector": sector_key, "peers": PEER_CACHE[sector_key]}

    # Find matching sector from SECTOR_PEERS (case-insensitive)
    matched_sector = None
    peer_symbols = []
    for key, syms in SECTOR_PEERS.items():
        if key.lower() == sector_key.lower():
            matched_sector = key
            peer_symbols = syms
            break

    if not matched_sector:
        # Fallback: return top Indian large caps as generic peers
        peer_symbols = ["TCS.NS", "RELIANCE.NS", "HDFCBANK.NS", "INFY.NS"]
        matched_sector = sector_key

    # Fetch all peers concurrently
    peers = []
    with ThreadPoolExecutor(max_workers=len(peer_symbols)) as executor:
        futures = {executor.submit(_fetch_single_peer, sym): sym for sym in peer_symbols}
        for future in as_completed(futures):
            result = future.result()
            if result:
                peers.append(result)

    # Sort by market cap descending
    peers.sort(key=lambda x: x["marketCap"], reverse=True)

    PEER_CACHE[sector_key] = peers
    logger.info(f"Fetched {len(peers)} peers for sector '{sector_key}'")
    return {"sector": matched_sector, "peers": peers}

# Trending & Benchmark stock list across top performing sectors
TRENDING_FEATURED_SYMBOLS = [
    "RELIANCE.NS", "HAL.NS", "BEL.NS", "NTPC.NS", "TATAPOWER.NS",
    "HDFCBANK.NS", "ICICIBANK.NS", "SBIN.NS", "TCS.NS", "INFY.NS",
    "LT.NS", "M&M.NS", "ITC.NS", "MARUTI.NS", "COALINDIA.NS",
    "TATASTEEL.NS", "ZOMATO.NS", "PERSISTENT.NS", "DIXON.NS", "TRENT.NS",
    "VBL.NS", "BHARTIARTL.NS", "POWERGRID.NS", "PFC.NS", "REC.NS"
]

FEATURED_CACHE: List[Dict[str, Any]] = []
_cache_lock = threading.Lock()

def load_featured_stocks_data():
    """Background loader that pre-fetches trending stocks in parallel."""
    global FEATURED_CACHE
    logger.info("Pre-loading trending featured stocks cache in parallel...")
    results = []
    import time
    with ThreadPoolExecutor(max_workers=2) as executor:
        futures = {}
        for sym in TRENDING_FEATURED_SYMBOLS:
            futures[executor.submit(fetch_company_data, sym)] = sym
            time.sleep(0.5)
        for future in as_completed(futures):
            try:
                res = future.result()
                if res and res.get("symbol"):
                    results.append(res)
            except Exception as e:
                logger.warning(f"Error fetching featured stock: {e}")

    if results:
        # Preserve original trending order
        symbol_order = {sym.replace('.NS',''): i for i, sym in enumerate(TRENDING_FEATURED_SYMBOLS)}
        results.sort(key=lambda x: symbol_order.get(x.get("symbol", "").replace('.NS',''), 99))
        with _cache_lock:
            FEATURED_CACHE = results
        logger.info(f"Successfully cached {len(FEATURED_CACHE)} trending featured stocks.")

# Start background cache preloader on module import
threading.Thread(target=load_featured_stocks_data, daemon=True).start()

@app.get("/api/featured")
def get_featured_stocks():
    """Fetches real-time financial summaries for trending & benchmark stocks."""
    global FEATURED_CACHE
    with _cache_lock:
        if FEATURED_CACHE:
            return {"featured": FEATURED_CACHE}

    # Fallback if cache not ready yet
    load_featured_stocks_data()
    return {"featured": FEATURED_CACHE}

