import React, { useState } from 'react';
import { LineChart, BarChart2, Check, ArrowRight } from 'lucide-react';
import { US_YIELD_CURVE, MAJOR_10Y_BONDS } from '../data/marketData';
import { YieldCurvePoint, MarketItem } from '../types';

interface BondsSectionProps {
  onSelectYieldPoint: (point: YieldCurvePoint) => void;
}

export const BondsSection: React.FC<BondsSectionProps> = ({ onSelectYieldPoint }) => {
  const [activeTab, setActiveTab] = useState<'us' | 'major'>('us');
  const [showGraph, setShowGraph] = useState(false);
  const [customizeModalOpen, setCustomizeModalOpen] = useState(false);
  const [selectedMaturities, setSelectedMaturities] = useState<string[]>([
    '1 Year', '2 Years', '5 Years', '10 Years', '20 Years', '30 Years'
  ]);

  const currentData = activeTab === 'us' ? US_YIELD_CURVE : MAJOR_10Y_BONDS;
  const filteredData = activeTab === 'us'
    ? currentData.filter((d) => selectedMaturities.includes(d.maturity))
    : currentData;

  return (
    <section
      id="section-government-bonds"
      className="border border-tv-grayBorder rounded-2xl p-6 bg-white shadow-xs hover:shadow-sm transition-shadow mb-12"
      data-purpose="bonds-and-macro"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-tv-grayBorder gap-3">
        <div>
          <h2 className="text-xl font-bold text-tv-black flex items-center gap-2">
            <span>Government Bonds Yield Curve</span>
          </h2>
          <p className="text-xs text-tv-muted mt-0.5">
            {activeTab === 'us'
              ? 'United States Treasury benchmark yield curve data'
              : 'Global benchmark 10-year sovereign government bond yields'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* US vs Global toggle */}
          <button
            id="bond-tab-us"
            onClick={() => setActiveTab('us')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'us'
                ? 'bg-tv-grayHover text-tv-black font-semibold border border-tv-grayBorder/80'
                : 'text-tv-muted hover:text-tv-black hover:bg-tv-grayHover'
            }`}
          >
            US Yield Curve
          </button>
          <button
            id="bond-tab-major"
            onClick={() => setActiveTab('major')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
              activeTab === 'major'
                ? 'bg-tv-grayHover text-tv-black font-semibold border border-tv-grayBorder/80'
                : 'text-tv-muted hover:text-tv-black hover:bg-tv-grayHover'
            }`}
          >
            Major 10Y Bonds
          </button>

          {/* Toggle curve graph */}
          <button
            id="bond-toggle-graph-btn"
            onClick={() => setShowGraph(!showGraph)}
            className="p-1.5 rounded-full hover:bg-tv-grayHover text-tv-muted hover:text-tv-black transition-colors"
            title={showGraph ? 'Show cards' : 'Show yield curve chart'}
          >
            {showGraph ? <BarChart2 className="w-4 h-4" /> : <LineChart className="w-4 h-4 text-tv-blue" />}
          </button>

          {/* Customize curves link */}
          <button
            id="customize-curves-btn"
            onClick={() => setCustomizeModalOpen(true)}
            className="text-xs font-semibold text-tv-blue hover:underline cursor-pointer flex items-center ml-1"
          >
            <span>Customize curves</span>
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Yield Curve Interactive Visual Graph */}
      {showGraph && (
        <div className="mb-6 p-4 bg-tv-grayBg rounded-xl border border-tv-grayBorder/70">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-tv-black">Treasury Yield Term Structure</span>
            <span className="text-[11px] text-tv-muted">Maturity (Years) vs Yield (%)</span>
          </div>
          <div className="h-40 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="#e0e3eb" strokeDasharray="3 3" />
              <line x1="40" y1="60" x2="480" y2="60" stroke="#e0e3eb" strokeDasharray="3 3" />
              <line x1="40" y1="100" x2="480" y2="100" stroke="#e0e3eb" />

              {/* Yield Line */}
              <polyline
                fill="none"
                stroke="#2962ff"
                strokeWidth="2.5"
                points="50,90 120,70 200,55 280,45 380,25 460,30"
              />

              {/* Data points */}
              {[
                { x: 50, y: 90, label: '1Y', val: '4.44%' },
                { x: 120, y: 70, label: '2Y', val: '4.73%' },
                { x: 200, y: 55, label: '5Y', val: '4.86%' },
                { x: 280, y: 45, label: '10Y', val: '5.00%' },
                { x: 380, y: 25, label: '20Y', val: '5.38%' },
                { x: 460, y: 30, label: '30Y', val: '5.34%' },
              ].map((pt, idx) => (
                <g key={idx}>
                  <circle cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#2962ff" strokeWidth="2" />
                  <text x={pt.x} y={pt.y - 8} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#131722">
                    {pt.val}
                  </text>
                  <text x={pt.x} y="115" textAnchor="middle" fontSize="10" fill="#787b86">
                    {pt.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      )}

      {/* Yield Curve Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {filteredData.map((item, index) => (
          <div
            key={index}
            id={`bond-card-${item.maturity.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelectYieldPoint(item)}
            className="p-3 bg-tv-grayBg hover:bg-tv-grayHover rounded-xl border border-tv-grayBorder/50 text-center cursor-pointer transition-all hover:scale-[1.02] shadow-xs group"
          >
            <div className="text-xs text-tv-muted font-medium mb-1 group-hover:text-tv-blue transition-colors">
              {item.maturity}
            </div>
            <div className="text-lg font-bold text-tv-black">{item.yieldRate}</div>
            <div
              className={`text-[11px] font-semibold ${
                item.isPositive ? 'text-tv-green' : 'text-tv-red'
              }`}
            >
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* Customize Curves Modal */}
      {customizeModalOpen && (
        <div
          id="customize-curves-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setCustomizeModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-tv-grayBorder animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-tv-black mb-2">Customize Yield Curve Points</h3>
            <p className="text-xs text-tv-muted mb-4">
              Select which Treasury maturities to display on your benchmark dashboard.
            </p>

            <div className="space-y-2 mb-6">
              {US_YIELD_CURVE.map((point) => {
                const isSelected = selectedMaturities.includes(point.maturity);
                return (
                  <button
                    key={point.maturity}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedMaturities.length > 1) {
                          setSelectedMaturities(selectedMaturities.filter((m) => m !== point.maturity));
                        }
                      } else {
                        setSelectedMaturities([...selectedMaturities, point.maturity]);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-sm border transition-colors ${
                      isSelected
                        ? 'border-tv-blue bg-blue-50/50 text-tv-black font-semibold'
                        : 'border-tv-grayBorder hover:bg-tv-grayHover text-tv-muted'
                    }`}
                  >
                    <span>{point.maturity} Treasury Yield ({point.yieldRate})</span>
                    {isSelected && <Check className="w-4 h-4 text-tv-blue" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setSelectedMaturities(US_YIELD_CURVE.map((p) => p.maturity));
                }}
                className="px-4 py-2 text-xs font-semibold text-tv-muted hover:text-tv-black"
              >
                Reset All
              </button>
              <button
                onClick={() => setCustomizeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-tv-black text-white rounded-xl hover:bg-black transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
