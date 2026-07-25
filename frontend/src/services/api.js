const API_BASE_URL = 'http://localhost:8000/api';

export async function fetchCompanyData(symbol) {
  if (!symbol) throw new Error("No symbol provided");
  const response = await fetch(`${API_BASE_URL}/company/${encodeURIComponent(symbol)}`);
  if (!response.ok) {
    const errJson = await response.json().catch(() => ({}));
    throw new Error(errJson.detail || `Failed to fetch stock data for '${symbol}' (${response.status})`);
  }
  const data = await response.json();
  return data;
}

export async function searchTickers(query) {
  if (!query) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.warn(`[API] Search failed, falling back.`, error);
    return [];
  }
}

export async function fetchPeers(sector) {
  if (!sector) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/peers/${encodeURIComponent(sector)}`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.peers || [];
  } catch (error) {
    console.warn(`[API] Peer fetch failed for sector '${sector}'.`, error);
    return [];
  }
}

export async function fetchFeaturedStocks() {
  try {
    const response = await fetch(`${API_BASE_URL}/featured`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.featured || [];
  } catch (error) {
    console.warn(`[API] Featured stocks fetch failed.`, error);
    return [];
  }
}

