export type MarketCategory = 
  | 'US stocks'
  | 'World stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Government bonds'
  | 'Corporate bonds'
  | 'ETFs'
  | 'Economy';

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  exchange: string;
  price: string;
  rawPrice: number;
  change: string;
  changePercent: string;
  isPositive: boolean;
  currency?: string;
  badge?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
  sparklinePoints?: string;
  chartColor?: 'green' | 'red';
  category: 'indices' | 'stocks' | 'crypto' | 'commodities' | 'forex' | 'bonds';
  stats?: {
    open?: string;
    high?: string;
    low?: string;
    prevClose?: string;
    volume?: string;
    marketCap?: string;
    peRatio?: string;
    week52High?: string;
    week52Low?: string;
  };
  historicalData?: {
    [timeframe: string]: { label: string; value: number }[];
  };
}

export interface YieldCurvePoint {
  maturity: string;
  yieldRate: string;
  change: string;
  isPositive: boolean;
  years: number;
}
