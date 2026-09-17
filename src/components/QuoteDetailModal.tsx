import React, { useState, useMemo } from 'react';
import { X, ArrowUpRight, ArrowDownRight, Bookmark, BookmarkCheck, ExternalLink, Activity } from 'lucide-react';
import { MarketItem } from '../types';

interface QuoteDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (id: string) => void;
}

const TIMEFRAMES = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'ALL'];

export const QuoteDetailModal: React.FC<QuoteDetailModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
}) => {
  const [selectedTf, setSelectedTf] = useState('1D');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  // Generate synthetic chart data based on timeframe and current price
  const chartPoints = useMemo(() => {
    if (!item) return [];
    const base = item.rawPrice;
    const count = 30;
    const points: { x: number; y: number; price: number; time: string }[] = [];
    let current = base * (item.isPositive ? 0.98 : 1.02);

    const stepFactor = item.isPositive ? 0.003 : -0.003;

    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1);
      const randomNoise = (Math.sin(i * 1.3) + Math.cos(i * 0.8)) * (base * 0.005);
      const trend = (base - current) * progress;
      const val = i === count - 1 ? base : current + trend + randomNoise;
      points.push({
        x: (i / (count - 1)) * 100,
        y: val,
        price: Number(val.toFixed(2)),
        time: `${9 + Math.floor(i / 4)}:${(i % 4) * 15 || '00'}`,
      });
    }
    return points;
  }, [item, selectedTf]);

  if (!item) return null;

  const minPrice = Math.min(...chartPoints.map((p) => p.y));
  const maxPrice = Math.max(...chartPoints.map((p) => p.y));
  const range = maxPrice - minPrice || 1;

  // Convert to SVG coordinate space
  const svgPath = chartPoints
    .map((p, idx) => {
      const x = p.x * 5; // 0 to 500
      const y = 160 - ((p.y - minPrice) / range) * 130; // 30 to 160
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaPath = `${svgPath} L 500 180 L 0 180 Z`;

  const strokeColor = item.isPositive ? '#089981' : '#f23645';
  const fillColor = item.isPositive ? 'rgba(8, 153, 129, 0.08)' : 'rgba(242, 54, 69, 0.08)';

  const activePoint = hoverIndex !== null ? chartPoints[hoverIndex] : chartPoints[chartPoints.length - 1];

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        id="quote-modal-container"
        className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl border border-tv-grayBorder overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-tv-grayBorder flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {item.badge ? (
              <div
                className="w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center shadow-xs"
                style={{
                  backgroundColor: item.badge.bgColor,
                  color: item.badge.textColor,
                }}
              >
                {item.badge.text}
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-tv-grayHover flex items-center justify-center font-bold text-sm text-tv-black">
                {item.symbol.slice(0, 3)}
              </div>
            )}
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-tv-black">{item.name}</h2>
                <span className="text-xs bg-tv-grayHover text-tv-muted font-bold px-2 py-0.5 rounded">
                  {item.symbol}
                </span>
              </div>
              <p className="text-xs text-tv-muted mt-0.5 uppercase tracking-wide">
                {item.exchange} • {item.currency || 'USD'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="quote-watchlist-btn"
              onClick={() => onToggleWatchlist(item.id)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-blue-50 border-tv-blue text-tv-blue'
                  : 'border-tv-grayBorder hover:bg-tv-grayHover text-tv-muted hover:text-tv-black'
              }`}
              title={isWatchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
            >
              {isWatchlisted ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>

            <button
              id="quote-close-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-tv-grayHover text-tv-muted hover:text-tv-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Current Price & Change Bar */}
        <div className="px-6 py-4 bg-tv-grayBg border-b border-tv-grayBorder flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-3xl font-extrabold text-tv-black">
              {hoverIndex !== null ? `$${activePoint.price.toLocaleString()}` : item.price}
            </div>
            <div
              className={`text-sm font-semibold flex items-center mt-0.5 ${
                item.isPositive ? 'text-tv-green' : 'text-tv-red'
              }`}
            >
              {item.isPositive ? (
                <ArrowUpRight className="w-4 h-4 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-0.5" />
              )}
              <span>{item.change}</span>
              <span className="ml-1.5">({item.changePercent})</span>
              <span className="text-xs text-tv-muted font-normal ml-3">
                {hoverIndex !== null ? `At ${activePoint.time}` : 'Real-time quote'}
              </span>
            </div>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-tv-grayBorder">
            {TIMEFRAMES.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTf(tf)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedTf === tf
                    ? 'bg-tv-black text-white'
                    : 'text-tv-muted hover:text-tv-black hover:bg-tv-grayHover'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Chart */}
        <div className="p-6">
          <div className="h-48 w-full relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 180"
              preserveAspectRatio="none"
              onMouseLeave={() => setHoverIndex(null)}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.18" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="#f0f3fa" strokeWidth="1" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="#f0f3fa" strokeWidth="1" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="#f0f3fa" strokeWidth="1" />

              {/* Shaded Area */}
              <path d={areaPath} fill="url(#areaGradient)" />

              {/* Line */}
              <path
                d={svgPath}
                fill="none"
                stroke={strokeColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Hover Crosshair & Pointer */}
              {hoverIndex !== null && (
                <g>
                  <line
                    x1={chartPoints[hoverIndex].x * 5}
                    y1="20"
                    x2={chartPoints[hoverIndex].x * 5}
                    y2="170"
                    stroke="#787b86"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                  <circle
                    cx={chartPoints[hoverIndex].x * 5}
                    cy={160 - ((chartPoints[hoverIndex].y - minPrice) / range) * 130}
                    r="5"
                    fill="#ffffff"
                    stroke={strokeColor}
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* Mouse trigger columns */}
              {chartPoints.map((pt, idx) => (
                <rect
                  key={idx}
                  x={pt.x * 5 - 8}
                  y="0"
                  width="16"
                  height="180"
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoverIndex(idx)}
                />
              ))}
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-tv-muted mt-2 border-t border-tv-grayBorder pt-2">
            <span>Low: ${minPrice.toFixed(2)}</span>
            <span>Hover chart to inspect prices</span>
            <span>High: ${maxPrice.toFixed(2)}</span>
          </div>

          {/* Key Statistics Grid */}
          <div className="mt-6 pt-4 border-t border-tv-grayBorder">
            <h3 className="text-xs font-bold uppercase tracking-wider text-tv-black mb-3">
              Key Statistics
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <div className="text-tv-muted">Open</div>
                <div className="font-bold text-tv-black">{item.stats?.open || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">High</div>
                <div className="font-bold text-tv-black">{item.stats?.high || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">Low</div>
                <div className="font-bold text-tv-black">{item.stats?.low || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">Prev Close</div>
                <div className="font-bold text-tv-black">{item.stats?.prevClose || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">Volume</div>
                <div className="font-bold text-tv-black">{item.stats?.volume || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">52-Wk High</div>
                <div className="font-bold text-tv-black">{item.stats?.week52High || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">52-Wk Low</div>
                <div className="font-bold text-tv-black">{item.stats?.week52Low || '—'}</div>
              </div>
              <div>
                <div className="text-tv-muted">Market Cap / P/E</div>
                <div className="font-bold text-tv-black">
                  {item.stats?.marketCap || item.stats?.peRatio || '—'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-tv-grayBg border-t border-tv-grayBorder flex items-center justify-between">
          <span className="text-xs text-tv-muted flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-tv-green" />
            Market status: Regular trading hours
          </span>
          <button
            onClick={onClose}
            className="btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-full cursor-pointer"
          >
            Launch in Supercharts
          </button>
        </div>
      </div>
    </div>
  );
};
