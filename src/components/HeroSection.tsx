import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { MarketCategory } from '../types';

interface HeroSectionProps {
  selectedCategory: MarketCategory;
  onSelectCategory: (category: MarketCategory) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

const CATEGORIES: MarketCategory[] = [
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Government bonds',
  'Corporate bonds',
  'ETFs',
  'Economy',
];

const REGIONS = [
  { id: 'global', name: 'Global Markets' },
  { id: 'us', name: 'United States' },
  { id: 'europe', name: 'Europe' },
  { id: 'asia', name: 'Asia-Pacific' },
  { id: 'americas', name: 'Americas' },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  return (
    <section className="text-center mb-10 pt-4" data-purpose="hero-title">
      {/* Title with Dropdown Indicator */}
      <div className="relative inline-block">
        <button
          id="hero-dropdown-trigger"
          onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-tv-black inline-flex items-center justify-center gap-3 cursor-pointer group focus:outline-none"
        >
          <span>Markets, everywhere</span>
          <ChevronDown
            className={`w-7 h-7 sm:w-9 sm:h-9 text-tv-black group-hover:translate-y-0.5 transition-transform ${
              regionDropdownOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {regionDropdownOpen && (
          <div
            id="region-dropdown-menu"
            className="absolute left-1/2 -translate-x-1/2 mt-3 w-64 bg-white border border-tv-grayBorder rounded-2xl shadow-xl py-2 z-30 text-left animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-4 py-2 text-xs font-semibold text-tv-muted uppercase border-b border-tv-grayBorder">
              Select Market Focus
            </div>
            {REGIONS.map((region) => (
              <button
                key={region.id}
                onClick={() => {
                  onSelectRegion(region.name);
                  setRegionDropdownOpen(false);
                }}
                className="w-full px-4 py-2.5 text-sm text-tv-black hover:bg-tv-grayHover flex items-center justify-between transition-colors"
              >
                <span>{region.name}</span>
                {selectedRegion === region.name && (
                  <Check className="w-4 h-4 text-tv-blue" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Horizontal Filter Pills */}
      <div className="flex items-center justify-start lg:justify-center overflow-x-auto custom-scrollbar gap-2 mt-8 pb-2 text-sm px-2">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              id={`filter-pill-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-1.5 rounded-full font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-tv-grayHover text-tv-black shadow-xs font-semibold border border-tv-grayBorder/80'
                  : 'text-tv-muted hover:text-tv-black hover:bg-tv-grayHover'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </section>
  );
};
