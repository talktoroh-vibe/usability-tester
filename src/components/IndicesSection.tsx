import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { HERO_INDICES } from '../data/marketData';
import { MarketItem } from '../types';

interface IndicesSectionProps {
  onSelectItem: (item: MarketItem) => void;
  onViewAllIndices: () => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  onSelectItem,
  onViewAllIndices,
}) => {
  return (
    <section id="section-indices" className="mb-14" data-purpose="indices-grid">
      {/* Section Header */}
      <div className="flex items-center space-x-1 mb-5">
        <button
          id="indices-header-link"
          onClick={onViewAllIndices}
          className="group inline-flex items-center text-2xl sm:text-3xl font-bold text-tv-black hover:text-tv-blue transition-colors cursor-pointer"
        >
          <span>Indices</span>
          <ChevronRight className="w-6 h-6 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Indices Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {HERO_INDICES.map((item) => (
          <div
            key={item.id}
            id={`card-index-${item.id}`}
            onClick={() => onSelectItem(item)}
            className="bg-tv-grayBg hover:bg-tv-grayHover p-4 rounded-2xl transition-all border border-tv-grayBorder/50 flex flex-col justify-between cursor-pointer group shadow-xs hover:shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                {item.badge && (
                  <span
                    className="w-9 h-9 rounded-full text-white flex items-center justify-center font-bold text-xs shadow-xs"
                    style={{ backgroundColor: item.badge.bgColor }}
                  >
                    {item.badge.text}
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-base text-tv-black group-hover:text-tv-blue transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-tv-muted">{item.symbol} • {item.exchange}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-base font-bold text-tv-black">{item.price}</div>
                <div
                  className={`text-xs font-semibold flex items-center justify-end ${
                    item.isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {item.isPositive ? (
                    <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                  )}
                  {item.changePercent}
                </div>
              </div>
            </div>

            {/* Sparkline Chart SVG */}
            <div className="h-10 w-full mt-2">
              <svg
                className={`w-full h-full overflow-visible ${
                  item.chartColor === 'red' ? 'text-tv-red' : 'text-tv-green'
                }`}
                preserveAspectRatio="none"
                viewBox="0 0 100 30"
              >
                <polyline
                  fill="none"
                  points={item.sparklinePoints}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
