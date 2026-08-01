// Centralized Mock Data Source for Stock Analysis Dashboard

export const MARKET_INDICES = [
  {
    name: 'NIFTY 50',
    value: '22,530.70',
    change: '+0.65%',
    positive: true,
    sparkline: [22400, 22420, 22410, 22480, 22460, 22510, 22530.70]
  },
  {
    name: 'SENSEX',
    value: '74,215.12',
    change: '+0.58%',
    positive: true,
    sparkline: [73800, 73900, 73850, 74050, 74100, 74180, 74215.12]
  },
  {
    name: 'NIFTY MIDCAP 150',
    value: '16,842.35',
    change: '+1.23%',
    positive: true,
    sparkline: [16600, 16650, 16700, 16720, 16780, 16810, 16842.35]
  },
  {
    name: 'NIFTY SMALLCAP 250',
    value: '12,843.45',
    change: '+1.53%',
    positive: true,
    sparkline: [12600, 12640, 12690, 12720, 12770, 12810, 12843.45]
  }
];

export const MY_WATCHLIST_DATA = [
  {
    company: 'TCS',
    symbol: 'TCS.NS',
    price: '4,112.80',
    change: '+12.30 (0.76%)',
    positive: true,
    score: 8.5,
    verdict: 'Excellent',
    verdictColor: 'emerald'
  },
  {
    company: 'HDFC Bank',
    symbol: 'HDFCBANK.NS',
    price: '1,632.45',
    change: '+18.20 (0.76%)',
    positive: true,
    score: 8.2,
    verdict: 'Excellent',
    verdictColor: 'emerald'
  },
  {
    company: 'Infosys',
    symbol: 'INFY.NS',
    price: '1,452.30',
    change: '+6.75 (0.47%)',
    positive: true,
    score: 7.4,
    verdict: 'Good',
    verdictColor: 'emerald'
  },
  {
    company: 'Reliance Ind.',
    symbol: 'RELIANCE.NS',
    price: '2,914.60',
    change: '+18.20 (0.63%)',
    positive: true,
    score: 7.1,
    verdict: 'Good',
    verdictColor: 'emerald'
  },
  {
    company: 'ICICI Bank',
    symbol: 'ICICIBANK.NS',
    price: '1,121.55',
    change: '+7.05 (0.63%)',
    positive: true,
    score: 6.8,
    verdict: 'Good',
    verdictColor: 'emerald'
  }
];

export const RECENTLY_VIEWED_DATA = [
  {
    company: 'Asian Paints Ltd.',
    symbol: 'ASIANPAINT.NS',
    timeAgo: 'Just now',
    logo: 'AP',
    bg: 'bg-rose-500/10 text-rose-500'
  },
  {
    company: 'Reliance Industries Ltd.',
    symbol: 'RELIANCE.NS',
    timeAgo: '2 hours ago',
    logo: 'RI',
    bg: 'bg-amber-500/10 text-amber-500'
  },
  {
    company: 'HDFC Bank Ltd.',
    symbol: 'HDFCBANK.NS',
    timeAgo: 'Yesterday',
    logo: 'HD',
    bg: 'bg-blue-500/10 text-blue-500'
  },
  {
    company: 'Tata Consultancy Services',
    symbol: 'TCS.NS',
    timeAgo: 'Yesterday',
    logo: 'TC',
    bg: 'bg-indigo-500/10 text-indigo-500'
  },
  {
    company: 'Nestle India Ltd.',
    symbol: 'NESTLEIND.NS',
    timeAgo: '2 days ago',
    logo: 'NI',
    bg: 'bg-emerald-500/10 text-emerald-500'
  }
];

export const DISCOVER_CATEGORIES = {
  topRated: [
    { rank: 1, name: 'Asian Paints Ltd.', symbol: 'ASIANPAINT', score: 8.5 },
    { rank: 2, name: 'HDFC Bank Ltd.', symbol: 'HDFCBANK', score: 8.2 },
    { rank: 3, name: 'Nestle India Ltd.', symbol: 'NESTLEIND', score: 7.8 }
  ],
  topFundamentals: [
    { rank: 1, name: 'TCS', symbol: 'TCS', score: 8.5 },
    { rank: 2, name: 'Infosys Ltd.', symbol: 'INFY', score: 8.0 },
    { rank: 3, name: 'HDFC Bank Ltd.', symbol: 'HDFCBANK', score: 7.9 }
  ],
  consistentPerformers: [
    { rank: 1, name: 'HDFC Bank Ltd.', symbol: 'HDFCBANK', score: 8.2 },
    { rank: 2, name: 'TCS', symbol: 'TCS', score: 8.1 },
    { rank: 3, name: 'Infosys Ltd.', symbol: 'INFY', score: 7.7 }
  ]
};

export const EXPLORE_SECTORS = [
  { id: 'it', name: 'IT Services', icon: 'Laptop' },
  { id: 'banking', name: 'Banking', icon: 'Landmark' },
  { id: 'fmcg', name: 'FMCG', icon: 'ShoppingBag' },
  { id: 'auto', name: 'Automobile', icon: 'Car' },
  { id: 'pharma', name: 'Pharma', icon: 'Stethoscope' },
  { id: 'consumer', name: 'Consumer Durables', icon: 'Tv' },
  { id: 'energy', name: 'Energy', icon: 'Zap' },
  { id: 'metals', name: 'Metals', icon: 'Layers' },
  { id: 'more', name: 'More', icon: 'MoreHorizontal' }
];

export const NEWS_AND_UPDATES = [
  {
    id: 1,
    title: 'Markets end higher as IT and Banking stocks rally',
    time: 'May 21, 2024 • 2 hours ago',
    iconBg: 'bg-emerald-500/10 text-emerald-500',
    type: 'market'
  },
  {
    id: 2,
    title: 'RBI keeps repo rate unchanged for the 8th consecutive time',
    time: 'May 21, 2024 • 4 hours ago',
    iconBg: 'bg-blue-500/10 text-blue-500',
    type: 'rbi'
  },
  {
    id: 3,
    title: 'Asian Paints Q4 results beat estimates; stock rises 2%',
    time: 'May 21, 2024 • 6 hours ago',
    iconBg: 'bg-amber-500/10 text-amber-500',
    type: 'stock'
  }
];

export const PDF_COMPANIES = [
  {
    symbol: 'ASIANPAINT',
    name: 'Asian Paints Ltd.',
    exchange: 'NSE',
    sector: 'Consumer Discretionary',
    industry: 'Paints & Decorative Coatings',
    businessType: 'Product Based',
    currentPrice: 3186.45,
    priceChange: 24.35,
    priceChangePercent: 0.77,
    marketCapValue: 301234, // Cr
    marketCapType: 'Large Cap',
    overview: 'Asian Paints is India’s largest paint company and a leading player in the global decorative paints industry. Operating across 15 countries with 27 paint manufacturing facilities worldwide.',
    sectorQuickTip: 'Defensive Tip: Consistent demand, brand moat & pricing power insulate against raw material crude volatility.',
    keyMetrics: {
      pe: 48.2,
      industryPe: 25.1,
      fairPe: 50.2,
      peg: 1.28,
      priceToBook: 11.2,
      roe: 28.6,
      roce: 33.4,
      opm: 18.7,
      debtToEquity: 0.15,
      currentRatio: 2.35,
      interestCoverage: 25.6,
      salesGrowth1Yr: 12.5,
      salesGrowth5Yr: 14.2,
      profitGrowth1Yr: 15.1,
      profitGrowth5Yr: 18.7,
      roa: 18.2,
      eps: 63.4
    },
    keyHighlights: [
      'Strong brand with market leadership in decorative paints',
      'Consistent revenue and profit growth over 10+ years',
      'High ROE (28.6%) and ROCE (33.4%) metrics',
      'Low debt (0.15 D/E) and robust balance sheet',
      'Attractive valuations with MOS > 20% on DCF basis'
    ],
    scoresSnapshot: {
      growth: 88,
      profitability: 95,
      efficiency: 92,
      financialHealth: 96,
      valuation: 65,
      quality: 94
    },
    businessAnalysis: {
      businessType: 'Product Based',
      description: 'Asian Paints is India’s largest paint company and a leading player in the global decorative paints industry.',
      whatBusinessDoes: 'Asian Paints is India’s largest paint company and a leading player in the global decorative paints industry.',
      productsServices: 'Decorative Paints, Industrial Coatings, Wood Finishes, Waterproofing Solutions, Home Décor',
      customer: 'Homeowners, Contractors, Architects, Interior Designers, Industries',
      problemSolved: 'Enhances aesthetics and protects surfaces with high-quality paints and coatings.',
      howBusinessMakesMoney: [
        { label: 'Revenue from paint sales', icon: 'DollarSign' },
        { label: 'Premium product pricing', icon: 'Crown' },
        { label: 'Dealer & distributor network', icon: 'Network' },
        { label: 'Ancillary products and services', icon: 'Package' }
      ]
    },
    sectorAnalysis: {
      sectorType: 'Defensive',
      classificationDescription: 'Consistent demand, not highly affected by economic cycles.',
      peers: [
        { company: 'Asian Paints', mcap: '3,01,234', pe: '48.2', roe: '28.6%', active: true },
        { company: 'Berger Paints', mcap: '85,412', pe: '42.1', roe: '24.3%', active: false },
        { company: 'Kansai Nerolac', mcap: '57,856', pe: '38.6', roe: '21.7%', active: false }
      ]
    },
    fundamentalAnalysis: {
      stage1Score: 8.5,
      stage1Verdict: 'Excellent',
      stage2Score: 7.6,
      stage2Verdict: 'Good',
      totalScore: 8.5,
      scorecard: [
        { metric: '1. Sales Growth (5Y)', value: '14.2%', score: '0.9', remarks: 'Strong', criteria: '5Yr > 10%' },
        { metric: '2. Profit Growth (5Y)', value: '18.7%', score: '0.9', remarks: 'Strong', criteria: '5Yr > 10%' },
        { metric: '3. Operating Profit Margin', value: '18.7%', score: '0.8', remarks: 'Good', criteria: '> 15%' },
        { metric: '4. Return on Equity', value: '28.6%', score: '0.9', remarks: 'Strong', criteria: '> 20%' },
        { metric: '5. Return on Capital Employed', value: '33.4%', score: '0.9', remarks: 'Strong', criteria: '> 20%' },
        { metric: '6. Debt / Equity', value: '0.15', score: '1.0', remarks: 'Very Low', criteria: '< 0.50' },
        { metric: '7. Current Ratio', value: '2.35', score: '0.8', remarks: 'Good', criteria: '> 1.25' },
        { metric: '8. Interest Coverage', value: '25.6', score: '1.0', remarks: 'Strong', criteria: '> 3.0x' },
        { metric: '9. P/E Ratio', value: '48.2', score: '0.6', remarks: 'Fair', criteria: '≤ Ind P/E + 10%' },
        { metric: '10. Return on Assets', value: '18.2%', score: '0.7', remarks: 'Good', criteria: '> 10%' }
      ]
    },
    valuation: {
      peRatio: { companyPe: 48.2, industryPe: 25.1, fairPe: 50.2, fairPrice: 3178.00, eps: 63.4 },
      pegRatio: { pe: 48.2, earningsGrowth: 18.7, peg: 1.28, verdict: 'Fair Valued' },
      marginOfSafety: { fairValue: 3178.00, currentPrice: 3186.45, mos: -0.27, verdict: 'Overvalued' }
    }
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    exchange: 'NSE',
    sector: 'Information Technology',
    industry: 'IT Services & Consulting',
    businessType: 'Service Based',
    currentPrice: 4112.80,
    priceChange: 12.30,
    priceChangePercent: 0.76,
    marketCapValue: 1480000,
    marketCapType: 'Large Cap',
    overview: 'Tata Consultancy Services is an IT services, consulting and business solutions organization that has been partnering with many of the world’s largest businesses for over 50 years.',
    keyMetrics: { pe: 31.5, roe: 48.2, roce: 59.1, opm: 24.5, debtToEquity: 0.04, peg: 1.45 },
    scoresSnapshot: { growth: 85, profitability: 96, efficiency: 95, financialHealth: 98, valuation: 72, quality: 96 },
    fundamentalAnalysis: { stage1Score: 8.5, stage1Verdict: 'Excellent', stage2Score: 8.2, stage2Verdict: 'Excellent', totalScore: 8.5 }
  },
  {
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Sector Bank',
    businessType: 'Service Based',
    currentPrice: 1632.45,
    priceChange: 18.20,
    priceChangePercent: 0.76,
    marketCapValue: 1230000,
    marketCapType: 'Large Cap',
    overview: 'HDFC Bank Limited is India’s largest private sector bank by assets.',
    keyMetrics: { pe: 18.2, roe: 16.5, roce: 0, opm: 0, debtToEquity: null, peg: 1.04 },
    scoresSnapshot: { growth: 85, profitability: 88, efficiency: 90, financialHealth: 95, valuation: 82, quality: 92 },
    fundamentalAnalysis: { stage1Score: 8.2, stage1Verdict: 'Excellent', stage2Score: 8.5, stage2Verdict: 'Exceptional', totalScore: 8.2 }
  },
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    exchange: 'NSE',
    sector: 'Energy & Retail',
    industry: 'Conglomerate',
    businessType: 'Asset Based',
    currentPrice: 2914.60,
    priceChange: 18.20,
    priceChangePercent: 0.63,
    marketCapValue: 2020000,
    marketCapType: 'Large Cap',
    overview: 'Reliance Industries Limited is an integrated energy, materials, retail, and digital services conglomerate.',
    keyMetrics: { pe: 26.8, roe: 12.8, roce: 11.4, opm: 17.2, debtToEquity: 0.42, peg: 1.82 },
    scoresSnapshot: { growth: 78, profitability: 75, efficiency: 72, financialHealth: 82, valuation: 70, quality: 85 },
    fundamentalAnalysis: { stage1Score: 7.1, stage1Verdict: 'Good', stage2Score: 7.0, stage2Verdict: 'Good', totalScore: 7.1 }
  },
  {
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    exchange: 'NSE',
    sector: 'Information Technology',
    industry: 'IT Services & Consulting',
    businessType: 'Service Based',
    currentPrice: 1452.30,
    priceChange: 6.75,
    priceChangePercent: 0.47,
    marketCapValue: 602000,
    marketCapType: 'Large Cap',
    overview: 'Infosys is a global leader in next-generation digital services and consulting.',
    keyMetrics: { pe: 24.5, roe: 31.8, roce: 40.2, opm: 21.0, debtToEquity: 0.08, peg: 1.15 },
    scoresSnapshot: { growth: 82, profitability: 90, efficiency: 88, financialHealth: 94, valuation: 78, quality: 90 },
    fundamentalAnalysis: { stage1Score: 7.4, stage1Verdict: 'Good', stage2Score: 7.8, stage2Verdict: 'Good', totalScore: 7.4 }
  },
  {
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    exchange: 'NSE',
    sector: 'Financial Services',
    industry: 'Private Sector Bank',
    businessType: 'Service Based',
    currentPrice: 1121.55,
    priceChange: 7.05,
    priceChangePercent: 0.63,
    marketCapValue: 789000,
    marketCapType: 'Large Cap',
    overview: 'ICICI Bank is a leading private sector bank in India providing financial services.',
    keyMetrics: { pe: 17.8, roe: 18.2, roce: 0, opm: 0, debtToEquity: null, peg: 0.95 },
    scoresSnapshot: { growth: 88, profitability: 91, efficiency: 90, financialHealth: 94, valuation: 84, quality: 93 },
    fundamentalAnalysis: { stage1Score: 6.8, stage1Verdict: 'Good', stage2Score: 7.5, stage2Verdict: 'Good', totalScore: 6.8 }
  }
];
