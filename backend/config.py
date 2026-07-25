import logging
import requests
from typing import Dict, Any, List

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("stock_analysis_api")

# Caches to prevent redundant network fetches
DATA_CACHE: Dict[str, Dict[str, Any]] = {}
SEARCH_CACHE: Dict[str, List[Dict[str, Any]]] = {}

# Keep-Alive HTTP session for optimized API requests
HTTP_SESSION = requests.Session()

# Industry/Sector Peer mapping for Indian markets
SECTOR_PEERS = {
    "Technology": ["TCS.NS", "INFY.NS", "WIPRO.NS", "HCLTECH.NS"],
    "Financial Services": ["HDFCBANK.NS", "ICICIBANK.NS", "SBIN.NS", "AXISBANK.NS"],
    "Energy": ["RELIANCE.NS", "ONGC.NS", "BPCL.NS", "IOC.NS"],
    "Consumer Defensive": ["HINDUNILVR.NS", "ITC.NS", "NESTLEIND.NS", "TATACONSUM.NS"],
    "Consumer Cyclical": ["TATAMOTORS.NS", "M&M.NS", "MARUTI.NS", "TIINDIA.NS"],
    "Industrials": ["LT.NS", "HAL.NS", "BEL.NS", "SIEMENS.NS"],
    "Basic Materials": ["TATASTEEL.NS", "JSWSTEEL.NS", "HINDALCO.NS", "GRASIM.NS"],
    "Healthcare": ["SUNPHARMA.NS", "CIPLA.NS", "DRREDDY.BO", "APOLLOHOSP.NS"],
    "Utilities": ["NTPC.NS", "POWERGRID.NS", "ADANIGREEN.NS", "TATAPOWER.NS"],
    "Communication Services": ["BHARTIARTL.NS", "IDEA.NS", "TATACOMM.NS"]
}
