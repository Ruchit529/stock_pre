import React, { useState } from 'react';
import {
  MARKET_INDICES,
  MY_WATCHLIST_DATA,
  RECENTLY_VIEWED_DATA,
  DISCOVER_CATEGORIES,
  EXPLORE_SECTORS,
  NEWS_AND_UPDATES
} from '../data/mockData';
import SparklineGraph from '../components/ui/SparklineGraph';
import {
  Search,
  Star,
  Clock,
  ArrowRight,
  TrendingUp,
  Award,
  BookOpen,
  Filter,
  FileText,
  Layers,
  Download,
  Plus,
  ChevronRight,
  Laptop,
  Landmark,
  ShoppingBag,
  Car,
  Stethoscope,
  Tv,
  Zap,
  MoreHorizontal,
  Newspaper,
  LineChart
} from 'lucide-react';

export default function DashboardView({ onSelectStock, isDarkMode = false }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAllSectors, setShowAllSectors] = useState(false);

  const sectorIcons = {
    Laptop: Laptop,
    Landmark: Landmark,
    ShoppingBag: ShoppingBag,
    Car: Car,
    Stethoscope: Stethoscope,
    Tv: Tv,
    Zap: Zap,
    Layers: Layers,
    MoreHorizontal: MoreHorizontal
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-start max-w-[1550px] mx-auto w-full text-xs">
      
      {/* LEFT & CENTER MAIN AREA (9 Columns) */}
      <div className="lg:col-span-9 space-y-2.5">
        


        {/* 2. Quick Search Banner Card (Compact) */}
        <div className={`p-3 rounded-xl border relative overflow-hidden flex items-center justify-between gap-3 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] border-slate-800' 
            : 'bg-gradient-to-r from-white via-sky-100/50 to-white border-sky-100 shadow-xs'
        }`}>
          <div className="space-y-1 z-10 max-w-lg">
            <div className="flex items-center gap-1.5 text-sky-600">
              <Search className="w-3.5 h-3.5" />
              <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Quick Search</h3>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">Start your analysis by searching for any company or stock</p>
            
            <div className="flex items-center gap-2 pt-0.5">
              <div className={`flex-1 flex items-center gap-2 px-2.5 py-1 rounded-lg border ${
                isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-sky-200/80 shadow-2xs'
              }`}>
                <Search className="w-3 h-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search company name, symbol or keyword..."
                  className="bg-transparent border-none outline-none text-[11px] w-full placeholder:text-slate-400"
                />
              </div>
              <button className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold transition-all shadow-2xs active:scale-[0.98] cursor-pointer shrink-0 ${
                isDarkMode
                  ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/30'
                  : 'bg-sky-100/90 hover:bg-sky-200 text-sky-900 border border-sky-300/70'
              }`}>
                Search
              </button>
            </div>
          </div>

          {/* Decorative graphic illustration on the right */}
          <div className="hidden sm:flex items-center justify-center opacity-80 shrink-0 pr-1">
            <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center relative">
              <LineChart className="w-7 h-7 text-blue-600 stroke-[1.5]" />
              <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-2.5 h-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Row 3: My Watchlist & Recently Viewed (Equal-Height Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 items-stretch">
          
          {/* My Watchlist Card */}
          <div className={`p-3 rounded-xl border flex flex-col justify-between h-full ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My Watchlist</h3>
                </div>
                <button className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[11px] text-left">
                  <thead>
                    <tr className={`border-b text-[9px] uppercase font-bold tracking-wider ${
                      isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
                    }`}>
                      <th className="pb-1">Company</th>
                      <th className="pb-1 text-right">Price</th>
                      <th className="pb-1 text-right">Change</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                    {MY_WATCHLIST_DATA.map((item, idx) => (
                      <tr
                        key={idx}
                        onClick={() => onSelectStock && onSelectStock(item.symbol.replace('.NS', ''))}
                        className={`cursor-pointer transition-colors ${
                          isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-1">
                          <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.company}</div>
                          <div className="text-[9px] text-slate-400 font-medium">{item.symbol}</div>
                        </td>
                        <td className={`py-1 text-right font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                          ₹{item.price}
                        </td>
                        <td className="py-1 text-right font-semibold text-emerald-500">
                          {item.change}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button className={`w-full mt-2 py-1 rounded-lg text-[11px] font-bold border flex items-center justify-center gap-1 transition-all cursor-pointer ${
              isDarkMode ? 'border-slate-800 text-blue-400 hover:bg-slate-800' : 'border-blue-200 text-blue-600 hover:bg-blue-50'
            }`}>
              <span>View Watchlist</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Recently Viewed Card */}
          <div className={`p-3 rounded-xl border flex flex-col justify-between h-full ${
            isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Recently Viewed</h3>
                </div>
                <button className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</button>
              </div>

              <div className="space-y-1">
                {RECENTLY_VIEWED_DATA.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectStock && onSelectStock(item.symbol.replace('.NS', ''))}
                    className={`p-1 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] ${item.bg}`}>
                        {item.logo}
                      </div>
                      <div>
                        <div className={`font-bold text-[11px] ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.company}</div>
                        <div className="text-[9px] text-slate-400 font-medium">{item.symbol}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[9px] font-medium text-slate-400">
                      <span>{item.timeAgo}</span>
                      <ChevronRight className="w-2.5 h-2.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1 text-center">
              <span className="text-[9px] text-slate-400 font-medium">
                5 stocks recently analyzed
              </span>
            </div>
          </div>
        </div>

        {/* 5. Row 5: Explore by Sector (5 Larger Cards with More Option) */}
        <div className={`p-3 rounded-xl border space-y-2.5 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Explore by Sector</h3>
            <button
              onClick={() => setShowAllSectors(!showAllSectors)}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>View All Sectors</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {/* Top 4 Primary Sectors */}
            {[
              { id: 'it', name: 'IT Services', icon: Laptop, count: '42 Companies' },
              { id: 'banking', name: 'Banking & Finance', icon: Landmark, count: '38 Companies' },
              { id: 'fmcg', name: 'FMCG', icon: ShoppingBag, count: '29 Companies' },
              { id: 'auto', name: 'Automobile', icon: Car, count: '24 Companies' }
            ].map((sec) => {
              const IconComp = sec.icon;
              return (
                <button
                  key={sec.id}
                  className={`p-3 rounded-xl flex flex-col items-start justify-between gap-2 border transition-all cursor-pointer text-left hover:border-blue-500/50 hover:shadow-xs ${
                    isDarkMode
                      ? 'bg-slate-900/80 border-slate-800 text-slate-200 hover:bg-slate-800/80'
                      : 'bg-slate-50/80 border-slate-200/80 text-slate-800 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold block leading-tight">{sec.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">{sec.count}</span>
                  </div>
                </button>
              );
            })}

            {/* 5th Card: + More Option */}
            <button
              onClick={() => setShowAllSectors(true)}
              className={`p-3 rounded-xl flex flex-col items-start justify-between gap-2 border transition-all cursor-pointer text-left ${
                isDarkMode
                  ? 'bg-slate-900/40 border-dashed border-slate-700 text-blue-400 hover:bg-slate-800/80'
                  : 'bg-blue-50/40 border-dashed border-blue-200 text-blue-600 hover:bg-blue-50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block leading-tight">+ More Sectors</span>
                <span className="text-[10px] text-blue-500 font-medium">12+ Industry Groups</span>
              </div>
            </button>
          </div>
        </div>

        {/* Modal / Overlay for All Sectors when 'More' is clicked */}
        {showAllSectors && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <div className={`w-full max-w-xl p-5 rounded-2xl border shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 ${
              isDarkMode ? 'bg-[#0f172a] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <div className="flex items-center justify-between border-b pb-3 border-slate-200/20">
                <div>
                  <h3 className="font-bold text-sm">All Industry Sectors</h3>
                  <p className="text-xs text-slate-400 font-medium">Select a sector to view categorized stocks & analytics</p>
                </div>
                <button
                  onClick={() => setShowAllSectors(false)}
                  className="p-1 rounded-lg hover:bg-slate-800/20 text-slate-400 hover:text-slate-200 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
                {EXPLORE_SECTORS.map((sec) => {
                  const IconComp = sectorIcons[sec.icon] || Layers;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => setShowAllSectors(false)}
                      className={`p-3 rounded-xl flex items-center gap-3 border text-left transition-all cursor-pointer ${
                        isDarkMode
                          ? 'bg-slate-900 border-slate-800 hover:border-blue-500/50 hover:bg-slate-800'
                          : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold">{sec.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium">Browse Stocks</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* RIGHT SIDEBAR PANEL (3 Columns) */}
      <div className="lg:col-span-3 space-y-2.5">
        
        {/* 1. Market Overview Panel */}
        <div className={`p-3 rounded-xl border space-y-2 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between pb-0.5 border-b border-slate-100 dark:border-slate-800/60">
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Market Indices</h3>
            <span className="text-[9px] font-semibold text-emerald-500 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live
            </span>
          </div>

          <div className="space-y-1.5">
            {MARKET_INDICES.map((idx, i) => (
              <div key={i} className={`flex items-center justify-between py-1 border-b last:border-none ${
                isDarkMode ? 'border-slate-800/60' : 'border-slate-100'
              }`}>
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 block tracking-tight">{idx.name}</span>
                  <span className={`text-xs font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{idx.value}</span>
                </div>

                <div className="flex items-center gap-2">
                  <SparklineGraph data={idx.sparkline} positive={idx.positive} width={50} height={16} />
                  <span className="text-[11px] font-bold text-emerald-500">{idx.change}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline pt-0.5 cursor-pointer">
            <span>View Market Summary</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* 2. News & Updates Panel */}
        <div className={`p-3 rounded-xl border space-y-2 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between">
            <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>News & Updates</h3>
            <button className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer">View All</button>
          </div>

          <div className="space-y-1.5">
            {NEWS_AND_UPDATES.map((news) => (
              <div key={news.id} className={`flex items-start gap-2 p-1.5 rounded-lg transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
              }`}>
                <div className={`w-7 h-7 rounded-md shrink-0 flex items-center justify-center ${news.iconBg}`}>
                  {news.type === 'market' && <Newspaper className="w-3.5 h-3.5" />}
                  {news.type === 'rbi' && <Landmark className="w-3.5 h-3.5" />}
                  {news.type === 'stock' && <TrendingUp className="w-3.5 h-3.5" />}
                </div>
                <div className="space-y-0.5">
                  <h4 className={`text-[11px] font-bold leading-tight ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    {news.title}
                  </h4>
                  <p className="text-[9px] text-slate-400 font-medium">{news.time}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline pt-0.5 cursor-pointer">
            <span>View all news</span>
            <ArrowRight className="w-2.5 h-2.5" />
          </button>
        </div>

        {/* 3. Quick Actions Grid */}
        <div className={`p-3 rounded-xl border space-y-2 ${
          isDarkMode ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <h3 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Quick Actions</h3>

          <div className="grid grid-cols-2 gap-1.5 text-center">
            <button className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-blue-50 hover:border-blue-200'
            }`}>
              <div className="w-6 h-6 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <Filter className="w-3 h-3" />
              </div>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Stock Screener</span>
            </button>

            <button className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-blue-50 hover:border-blue-200'
            }`}>
              <div className="w-6 h-6 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <Layers className="w-3 h-3" />
              </div>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Compare Stocks</span>
            </button>

            <button className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-blue-50 hover:border-blue-200'
            }`}>
              <div className="w-6 h-6 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <Download className="w-3 h-3" />
              </div>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Download Report</span>
            </button>

            <button className={`p-2 rounded-lg border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-slate-900/60 border-slate-800 text-slate-200 hover:bg-slate-800'
                : 'bg-slate-50 border-slate-200/80 text-slate-800 hover:bg-blue-50 hover:border-blue-200'
            }`}>
              <div className="w-6 h-6 rounded-md bg-blue-600/10 text-blue-600 flex items-center justify-center">
                <Star className="w-3 h-3" />
              </div>
              <span className={`text-[10px] font-bold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>Add to Watchlist</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
