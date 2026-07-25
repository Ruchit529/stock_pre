import React, { useState, useEffect } from 'react';
import TopNav from './layouts/TopNav';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Company from './pages/Company';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [activeSymbol, setActiveSymbol] = useState('TCS');
  const [activeSubPage, setActiveSubPage] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDarkMode]);

  const navigate = (page, symbol = null, subPage = 'overview') => {
    setActivePage(page);
    if (symbol) {
      setActiveSymbol(symbol);
    }
    if (subPage) {
      setActiveSubPage(subPage);
    }
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090d16] text-[#f8fafc]' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* Top Navigation */}
      <TopNav
        activePage={activePage}
        activeSymbol={activeSymbol}
        activeSubPage={activeSubPage}
        navigate={navigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {(activePage === 'home' || activePage === 'screener') && (
            <Home navigate={navigate} activePage={activePage} isDarkMode={isDarkMode} />
          )}

          {activePage === 'company' && (
            <Company
              symbol={activeSymbol}
              activeSubPage={activeSubPage}
              navigate={navigate}
              isDarkMode={isDarkMode}
            />
          )}
        </main>

        <Footer navigate={navigate} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;
