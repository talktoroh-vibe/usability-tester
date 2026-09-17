import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-tv-grayBorder bg-white pt-12 pb-16 text-sm" data-purpose="site-footer">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Footer Nav Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-xs text-tv-black uppercase tracking-wider mb-3">Products</h4>
            <ul className="space-y-2 text-xs text-tv-muted">
              <li><a className="hover:text-tv-blue transition-colors" href="#products">Supercharts</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#screener">Screeners</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#heatmap">Heatmaps</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#economic-calendar">Economic Calendar</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#earnings-calendar">Earnings Calendar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs text-tv-black uppercase tracking-wider mb-3">Community</h4>
            <ul className="space-y-2 text-xs text-tv-muted">
              <li><a className="hover:text-tv-blue transition-colors" href="#social">Social network</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#ideas">Trading ideas</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#scripts">Indicators &amp; strategies</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#pine-script">Pine Script®</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#house-rules">House Rules</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs text-tv-black uppercase tracking-wider mb-3">Markets</h4>
            <ul className="space-y-2 text-xs text-tv-muted">
              <li><a className="hover:text-tv-blue transition-colors" href="#us-stocks">US Stocks</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#crypto">Crypto coins</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#futures">Futures</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#forex">Forex</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#bonds">Government bonds</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs text-tv-black uppercase tracking-wider mb-3">Brokers</h4>
            <ul className="space-y-2 text-xs text-tv-muted">
              <li><a className="hover:text-tv-blue transition-colors" href="#brokers">Brokers overview</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#comparison">Brokers comparison</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#the-leap">The Leap</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#integration">Brokerage integration</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs text-tv-black uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs text-tv-muted">
              <li><a className="hover:text-tv-blue transition-colors" href="#about">Who we are</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#careers">Careers</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#blog">Blog</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#media">Media kit</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#policies">Terms &amp; Privacy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xs text-tv-black uppercase tracking-wider mb-3">Apps</h4>
            <ul className="space-y-2 text-xs text-tv-muted">
              <li><a className="hover:text-tv-blue transition-colors" href="#mobile">Mobile app</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#desktop">Desktop app</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#widgets">Widgets</a></li>
              <li><a className="hover:text-tv-blue transition-colors" href="#pricing">Pricing &amp; Plans</a></li>
            </ul>
          </div>
        </div>

        {/* Legal & Disclaimer */}
        <div className="border-t border-tv-grayBorder pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-tv-muted">
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-5 text-tv-black shrink-0" fill="currentColor" viewBox="0 0 36 28">
              <path d="M0 4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V24C14 26.2091 12.2091 28 10 28H4C1.79086 28 0 26.2091 0 24V4Z" />
              <path d="M22 0H16V28H22C24.2091 28 26 26.2091 26 24V14L32.2929 7.70711C33.6834 6.31658 32.6984 4 30.7322 4H26V4C26 1.79086 24.2091 0 22 0Z" />
            </svg>
            <span className="font-semibold text-tv-black">Made by humans</span>
          </div>

          <p className="text-center md:text-left max-w-2xl text-[11px] leading-relaxed">
            Select market data provided by ICE Data Services. Select reference data provided by FactSet. © 2026 TradingView, Inc. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            <a className="hover:text-tv-blue transition-colors" href="#terms">Terms</a>
            <a className="hover:text-tv-blue transition-colors" href="#privacy">Privacy</a>
            <a className="hover:text-tv-blue transition-colors" href="#security">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
