import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { CRYPTO_COINS, COMMODITIES, FOREX_PAIRS } from '../data/marketData';
import { MarketItem } from '../types';

interface CryptoCommoditiesForexProps {
  onSelectItem: (item: MarketItem) => void;
  onViewAllCrypto: () => void;
  onViewAllCommodities: () => void;
  onViewAllForex: () => void;
}

export const CryptoCommoditiesForex: React.FC<CryptoCommoditiesForexProps> = ({
  onSelectItem,
  onViewAllCrypto,
  onViewAllCommodities,
  onViewAllForex,
}) => {
  return (
    <section
      id="section-crypto-commodities-forex"
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14"
      data-purpose="crypto-and-commodities"
    >
      {/* Crypto Assets Column */}
      <div className="border border-tv-grayBorder rounded-2xl p-5 bg-white shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              id="crypto-title-btn"
              onClick={onViewAllCrypto}
              className="group text-lg font-bold text-tv-black hover:text-tv-blue flex items-center cursor-pointer"
            >
              <span>Crypto coins</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-semibold text-tv-muted">Market cap</span>
          </div>

          <div className="space-y-3">
            {CRYPTO_COINS.map((crypto) => (
              <div
                key={crypto.id}
                id={`row-crypto-${crypto.id}`}
                onClick={() => onSelectItem(crypto)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-tv-grayBg cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  {crypto.badge && (
                    <div
                      className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: crypto.badge.bgColor,
                        color: crypto.badge.textColor,
                      }}
                    >
                      {crypto.badge.text}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-tv-black group-hover:text-tv-blue transition-colors">
                      {crypto.name}
                    </div>
                    <div className="text-[11px] text-tv-muted">{crypto.symbol}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-tv-black">{crypto.price}</div>
                  <span
                    className={`text-xs font-semibold ${
                      crypto.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {crypto.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          id="see-all-crypto-btn"
          onClick={onViewAllCrypto}
          className="mt-4 text-xs font-semibold text-tv-blue hover:underline block text-center cursor-pointer py-1"
        >
          See all crypto pairs →
        </button>
      </div>

      {/* Futures & Commodities Column */}
      <div className="border border-tv-grayBorder rounded-2xl p-5 bg-white shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              id="commodities-title-btn"
              onClick={onViewAllCommodities}
              className="group text-lg font-bold text-tv-black hover:text-tv-blue flex items-center cursor-pointer"
            >
              <span>Futures &amp; Commodities</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {COMMODITIES.map((commodity) => (
              <div
                key={commodity.id}
                id={`row-commodity-${commodity.id}`}
                onClick={() => onSelectItem(commodity)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-tv-grayBg cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  {commodity.badge && (
                    <div
                      className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: commodity.badge.bgColor,
                        color: commodity.badge.textColor,
                      }}
                    >
                      {commodity.badge.text}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-tv-black group-hover:text-tv-blue transition-colors">
                      {commodity.name}
                    </div>
                    <div className="text-[11px] text-tv-muted">{commodity.exchange}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-tv-black">{commodity.price}</div>
                  <span
                    className={`text-xs font-semibold ${
                      commodity.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {commodity.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          id="see-all-commodities-btn"
          onClick={onViewAllCommodities}
          className="mt-4 text-xs font-semibold text-tv-blue hover:underline block text-center cursor-pointer py-1"
        >
          See all commodities →
        </button>
      </div>

      {/* Currencies & Forex Column */}
      <div className="border border-tv-grayBorder rounded-2xl p-5 bg-white shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              id="forex-title-btn"
              onClick={onViewAllForex}
              className="group text-lg font-bold text-tv-black hover:text-tv-blue flex items-center cursor-pointer"
            >
              <span>Forex &amp; Currencies</span>
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="space-y-3">
            {FOREX_PAIRS.map((pair) => (
              <div
                key={pair.id}
                id={`row-forex-${pair.id}`}
                onClick={() => onSelectItem(pair)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-tv-grayBg cursor-pointer transition-colors group"
              >
                <div className="flex items-center space-x-2.5">
                  {pair.badge && (
                    <div
                      className="w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center shrink-0 shadow-xs"
                      style={{
                        backgroundColor: pair.badge.bgColor,
                        color: pair.badge.textColor,
                      }}
                    >
                      {pair.badge.text}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-tv-black group-hover:text-tv-blue transition-colors">
                      {pair.name}
                    </div>
                    <div className="text-[11px] text-tv-muted">{pair.exchange}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-tv-black">{pair.price}</div>
                  <span
                    className={`text-xs font-semibold ${
                      pair.isPositive ? 'text-tv-green' : 'text-tv-red'
                    }`}
                  >
                    {pair.changePercent}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          id="see-all-forex-btn"
          onClick={onViewAllForex}
          className="mt-4 text-xs font-semibold text-tv-blue hover:underline block text-center cursor-pointer py-1"
        >
          See all major pairs →
        </button>
      </div>
    </section>
  );
};
