import React, { useState } from 'react';
import { X, ArrowUpDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { MarketItem } from '../types';

interface CategoryViewModalProps {
  title: string;
  items: MarketItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MarketItem) => void;
}

export const CategoryViewModal: React.FC<CategoryViewModalProps> = ({
  title,
  items,
  isOpen,
  onClose,
  onSelectItem,
}) => {
  const [sortField, setSortField] = useState<'name' | 'price' | 'change'>('change');
  const [sortAsc, setSortAsc] = useState(false);

  if (!isOpen) return null;

  const sortedItems = [...items].sort((a, b) => {
    let diff = 0;
    if (sortField === 'name') {
      diff = a.name.localeCompare(b.name);
    } else if (sortField === 'price') {
      diff = a.rawPrice - b.rawPrice;
    } else {
      const aPct = parseFloat(a.changePercent.replace('%', ''));
      const bPct = parseFloat(b.changePercent.replace('%', ''));
      diff = aPct - bPct;
    }
    return sortAsc ? diff : -diff;
  });

  const handleSort = (field: 'name' | 'price' | 'change') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div
      id="category-view-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] shadow-2xl border border-tv-grayBorder flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-tv-grayBorder flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-tv-black">{title}</h2>
            <p className="text-xs text-tv-muted mt-0.5">
              Live market quotes, daily price variations, and trading volume
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-tv-grayHover text-tv-muted hover:text-tv-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table Header */}
        <div className="overflow-y-auto flex-1 divide-y divide-tv-grayBorder/60">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-tv-grayBg border-b border-tv-grayBorder text-xs text-tv-muted font-semibold">
              <tr>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-tv-black select-none"
                >
                  <div className="flex items-center space-x-1">
                    <span>Symbol / Asset</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 hidden sm:table-cell">Exchange</th>
                <th
                  onClick={() => handleSort('price')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-tv-black select-none"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Last Price</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('change')}
                  className="py-3 px-4 text-right cursor-pointer hover:text-tv-black select-none"
                >
                  <div className="flex items-center justify-end space-x-1">
                    <span>Change %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tv-grayBorder/60 text-sm">
              {sortedItems.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    onSelectItem(item);
                    onClose();
                  }}
                  className="hover:bg-tv-grayHover cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      {item.badge ? (
                        <span
                          className="w-7 h-7 rounded-full text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-xs"
                          style={{
                            backgroundColor: item.badge.bgColor,
                            color: item.badge.textColor,
                          }}
                        >
                          {item.badge.text}
                        </span>
                      ) : (
                        <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {item.symbol.slice(0, 4)}
                        </span>
                      )}
                      <div>
                        <span className="font-bold text-tv-black block">{item.symbol}</span>
                        <span className="text-xs text-tv-muted">{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-tv-muted hidden sm:table-cell">
                    {item.exchange}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-tv-black">
                    {item.price}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div
                      className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${
                        item.isPositive
                          ? 'text-tv-green bg-emerald-50'
                          : 'text-tv-red bg-red-50'
                      }`}
                    >
                      {item.isPositive ? (
                        <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                      ) : (
                        <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                      )}
                      {item.changePercent}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
