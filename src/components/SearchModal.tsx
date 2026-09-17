import React, { useState, useEffect, useRef } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { ALL_SEARCH_ITEMS } from '../data/marketData';
import { MarketItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MarketItem) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'stocks', label: 'Stocks' },
  { id: 'indices', label: 'Indices' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'commodities', label: 'Futures' },
  { id: 'forex', label: 'Forex' },
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveCategory('all');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = ALL_SEARCH_ITEMS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesQuery =
      query.trim() === '' ||
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.exchange.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl border border-tv-grayBorder overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-tv-grayBorder flex items-center space-x-3">
          <Search className="w-5 h-5 text-tv-muted shrink-0" />
          <input
            ref={inputRef}
            id="symbol-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, or ticker (e.g. AAPL, BTC, Gold)..."
            className="w-full bg-transparent text-tv-black placeholder:text-tv-muted focus:outline-none text-base font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-tv-muted hover:text-tv-black hover:bg-tv-grayHover"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[11px] font-semibold text-tv-muted bg-tv-grayHover px-2 py-0.5 rounded border border-tv-grayBorder">
            ESC
          </kbd>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-2.5 bg-tv-grayBg border-b border-tv-grayBorder flex items-center space-x-2 overflow-x-auto custom-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-tv-black text-white'
                  : 'text-tv-muted hover:text-tv-black hover:bg-tv-grayHover'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-tv-grayBorder/60">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-tv-muted">
              No symbols found matching "{query}".
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                id={`search-result-${item.id}`}
                onClick={() => {
                  onSelectItem(item);
                  onClose();
                }}
                className="px-4 py-3 flex items-center justify-between hover:bg-tv-grayHover cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-tv-grayBg border border-tv-grayBorder flex items-center justify-center font-bold text-xs text-tv-black group-hover:border-tv-blue">
                    {item.badge ? (
                      <span
                        className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold"
                        style={{ backgroundColor: item.badge.bgColor, color: item.badge.textColor }}
                      >
                        {item.badge.text}
                      </span>
                    ) : (
                      <TrendingUp className="w-4 h-4 text-tv-muted" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-tv-black group-hover:text-tv-blue">
                        {item.symbol}
                      </span>
                      <span className="text-xs text-tv-muted">{item.name}</span>
                    </div>
                    <span className="text-[11px] text-tv-muted uppercase font-medium">
                      {item.exchange} • {item.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-tv-black">{item.price}</div>
                  <span
                    className={`text-xs font-semibold ${
                      item.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {item.changePercent}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
