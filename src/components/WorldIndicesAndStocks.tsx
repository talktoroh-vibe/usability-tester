import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { WORLD_INDICES, HIGHEST_VOLUME_STOCKS } from '../data/marketData';
import { MarketItem } from '../types';

interface WorldIndicesAndStocksProps {
  onSelectItem: (item: MarketItem) => void;
  onViewAllWorldIndices: () => void;
  onViewAllActiveStocks: () => void;
}

export const WorldIndicesAndStocks: React.FC<WorldIndicesAndStocksProps> = ({
  onSelectItem,
  onViewAllWorldIndices,
  onViewAllActiveStocks,
}) => {
  return (
    <section id="section-world-indices-and-stocks" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14" data-purpose="market-data-tables">
      {/* World Major Indices Table */}
      <div className="border border-tv-grayBorder rounded-2xl p-5 bg-white shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <button
            id="world-indices-title-btn"
            onClick={onViewAllWorldIndices}
            className="group text-lg font-bold text-tv-black hover:text-tv-blue flex items-center cursor-pointer"
          >
            <span>World indices</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            id="see-all-world-indices-btn"
            onClick={onViewAllWorldIndices}
            className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer flex items-center"
          >
            <span>See all major indices</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        <div className="divide-y divide-tv-grayBorder/70">
          {WORLD_INDICES.map((item) => (
            <div
              key={item.id}
              id={`row-world-index-${item.id}`}
              onClick={() => onSelectItem(item)}
              className="py-3 flex items-center justify-between hover:bg-tv-grayBg px-2 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded group-hover:bg-blue-50 group-hover:text-tv-blue transition-colors">
                  {item.symbol}
                </span>
                <span className="font-medium text-sm text-tv-black group-hover:text-tv-blue transition-colors">
                  {item.name}
                </span>
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
          ))}
        </div>
      </div>

      {/* US Stocks Most Active Table */}
      <div className="border border-tv-grayBorder rounded-2xl p-5 bg-white shadow-xs hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <button
            id="highest-volume-stocks-title-btn"
            onClick={onViewAllActiveStocks}
            className="group text-lg font-bold text-tv-black hover:text-tv-blue flex items-center cursor-pointer"
          >
            <span>Highest volume stocks</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            id="see-all-volume-stocks-btn"
            onClick={onViewAllActiveStocks}
            className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer flex items-center"
          >
            <span>See most actively traded</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>

        <div className="divide-y divide-tv-grayBorder/70">
          {HIGHEST_VOLUME_STOCKS.map((stock) => (
            <div
              key={stock.id}
              id={`row-stock-${stock.id}`}
              onClick={() => onSelectItem(stock)}
              className="py-3 flex items-center justify-between hover:bg-tv-grayBg px-2 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center space-x-3">
                {stock.badge && (
                  <span
                    className="w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs"
                    style={{ backgroundColor: stock.badge.bgColor }}
                  >
                    {stock.badge.text}
                  </span>
                )}
                <div>
                  <span className="font-bold text-sm text-tv-black block group-hover:text-tv-blue transition-colors">
                    {stock.name}
                  </span>
                  <span className="text-xs text-tv-muted">{stock.symbol} • {stock.exchange}</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-bold text-tv-black">{stock.price}</div>
                <span
                  className={`text-xs font-semibold ${
                    stock.isPositive ? 'text-tv-green' : 'text-tv-red'
                  }`}
                >
                  {stock.changePercent}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
