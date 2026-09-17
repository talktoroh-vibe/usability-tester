import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { WorldIndicesAndStocks } from './components/WorldIndicesAndStocks';
import { CryptoCommoditiesForex } from './components/CryptoCommoditiesForex';
import { BondsSection } from './components/BondsSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { QuoteDetailModal } from './components/QuoteDetailModal';
import { CategoryViewModal } from './components/CategoryViewModal';
import { AuthModal } from './components/AuthModal';
import {
  HERO_INDICES,
  WORLD_INDICES,
  HIGHEST_VOLUME_STOCKS,
  CRYPTO_COINS,
  COMMODITIES,
  FOREX_PAIRS,
} from './data/marketData';
import { MarketCategory, MarketItem, YieldCurvePoint } from './types';
import { CheckCircle2, Bookmark, Activity } from 'lucide-react';

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('US stocks');
  const [selectedRegion, setSelectedRegion] = useState('Global Markets');
  const [activeNav, setActiveNav] = useState('Markets');

  // Active Quote Detail Modal
  const [selectedQuote, setSelectedQuote] = useState<MarketItem | null>(null);

  // Category View Modal (See All)
  const [categoryModal, setCategoryModal] = useState<{
    isOpen: boolean;
    title: string;
    items: MarketItem[];
  }>({
    isOpen: false,
    title: '',
    items: [],
  });

  // Watchlist state
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      return saved ? JSON.parse(saved) : ['sp500', 'btc', 'nvda'];
    } catch {
      return ['sp500', 'btc', 'nvda'];
    }
  });

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleToggleWatchlist = (id: string) => {
    setWatchlist((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem('tv_watchlist', JSON.stringify(next));
      } catch {}
      showToast(exists ? 'Removed from Watchlist' : 'Added to Watchlist');
      return next;
    });
  };

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCategory = (category: MarketCategory) => {
    setSelectedCategory(category);
    // Smooth scroll or trigger modal based on selection
    if (category === 'Government bonds') {
      document.getElementById('section-government-bonds')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Crypto') {
      document.getElementById('section-crypto-commodities-forex')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Futures') {
      document.getElementById('section-crypto-commodities-forex')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'Forex') {
      document.getElementById('section-crypto-commodities-forex')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'World stocks') {
      document.getElementById('section-world-indices-and-stocks')?.scrollIntoView({ behavior: 'smooth' });
    } else if (category === 'US stocks') {
      document.getElementById('section-indices')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      showToast(`Filter set to ${category}`);
    }
  };

  const handleSelectYieldPoint = (point: YieldCurvePoint) => {
    const item: MarketItem = {
      id: `bond-${point.maturity.toLowerCase().replace(/\s+/g, '-')}`,
      symbol: point.maturity,
      name: `US Treasury ${point.maturity} Benchmark`,
      exchange: 'US TREASURY',
      price: point.yieldRate,
      rawPrice: parseFloat(point.yieldRate),
      change: point.change,
      changePercent: point.change,
      isPositive: point.isPositive,
      category: 'bonds',
      stats: {
        open: point.yieldRate,
        high: `${(parseFloat(point.yieldRate) + 0.05).toFixed(3)}%`,
        low: `${(parseFloat(point.yieldRate) - 0.03).toFixed(3)}%`,
        prevClose: `${(parseFloat(point.yieldRate) - (point.isPositive ? 0.02 : -0.01)).toFixed(3)}%`,
        week52High: '5.450%',
        week52Low: '3.880%',
      },
    };
    setSelectedQuote(item);
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white text-tv-black antialiased selection:bg-blue-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-tv-black text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-tv-green" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        onOpenSearch={() => setSearchOpen(true)}
        activeNav={activeNav}
        onNavClick={(nav) => {
          setActiveNav(nav);
          if (nav === 'Products' || nav === 'Community' || nav === 'Brokers' || nav === 'More') {
            showToast(`Switched to ${nav} section`);
          }
        }}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-[1400px] mx-auto px-4 sm:px-6 w-full pt-8 pb-20">
        {/* Hero Section with Dropdown and Filter Pills */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          selectedRegion={selectedRegion}
          onSelectRegion={(reg) => {
            setSelectedRegion(reg);
            showToast(`Region updated to ${reg}`);
          }}
        />

        {/* Indices Section (S&P 500, Nasdaq 100, Dow 30) */}
        <IndicesSection
          onSelectItem={setSelectedQuote}
          onViewAllIndices={() =>
            setCategoryModal({
              isOpen: true,
              title: 'US & Global Major Indices',
              items: [...HERO_INDICES, ...WORLD_INDICES],
            })
          }
        />

        {/* World Indices & Most Active US Stocks (2 Columns) */}
        <WorldIndicesAndStocks
          onSelectItem={setSelectedQuote}
          onViewAllWorldIndices={() =>
            setCategoryModal({
              isOpen: true,
              title: 'World Major Indices',
              items: WORLD_INDICES,
            })
          }
          onViewAllActiveStocks={() =>
            setCategoryModal({
              isOpen: true,
              title: 'Highest Volume Stocks (US)',
              items: HIGHEST_VOLUME_STOCKS,
            })
          }
        />

        {/* Crypto, Commodities & Forex (3 Columns) */}
        <CryptoCommoditiesForex
          onSelectItem={setSelectedQuote}
          onViewAllCrypto={() =>
            setCategoryModal({
              isOpen: true,
              title: 'Cryptocurrency Pairs & Rates',
              items: CRYPTO_COINS,
            })
          }
          onViewAllCommodities={() =>
            setCategoryModal({
              isOpen: true,
              title: 'Futures & Commodities Contracts',
              items: COMMODITIES,
            })
          }
          onViewAllForex={() =>
            setCategoryModal({
              isOpen: true,
              title: 'Foreign Exchange (Forex) Major Pairs',
              items: FOREX_PAIRS,
            })
          }
        />

        {/* Government Bonds Yield Curve Section */}
        <BondsSection onSelectYieldPoint={handleSelectYieldPoint} />
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectItem={setSelectedQuote}
      />

      {/* Quote Detail Modal */}
      <QuoteDetailModal
        item={selectedQuote}
        onClose={() => setSelectedQuote(null)}
        isWatchlisted={selectedQuote ? watchlist.includes(selectedQuote.id) : false}
        onToggleWatchlist={handleToggleWatchlist}
      />

      {/* Category Expanded View Modal */}
      <CategoryViewModal
        title={categoryModal.title}
        items={categoryModal.items}
        isOpen={categoryModal.isOpen}
        onClose={() => setCategoryModal({ isOpen: false, title: '', items: [] })}
        onSelectItem={setSelectedQuote}
      />

      {/* Auth / Get Started Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}
