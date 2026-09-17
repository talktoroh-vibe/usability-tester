import React, { useState } from 'react';
import { Search, Globe, User, Menu, X, Check } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  activeNav: string;
  onNavClick: (nav: string) => void;
  onOpenAuth: () => void;
}

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'FR', name: 'Français' },
  { code: 'JA', name: '日本語' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  activeNav,
  onNavClick,
  onOpenAuth,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-tv-grayBorder" data-purpose="global-navigation">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[60px] flex items-center justify-between">
        {/* Left Navigation & Brand */}
        <div className="flex items-center space-x-6">
          {/* TradingView Monogram Logo */}
          <button
            id="brand-logo"
            onClick={() => onNavClick('Markets')}
            className="flex items-center text-tv-black hover:opacity-80 transition-opacity focus:outline-none"
            title="TradingView Home"
          >
            <svg className="w-9 h-7" fill="currentColor" viewBox="0 0 36 28">
              <path d="M0 4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V24C14 26.2091 12.2091 28 10 28H4C1.79086 28 0 26.2091 0 24V4Z" />
              <path d="M22 0H16V28H22C24.2091 28 26 26.2091 26 24V14L32.2929 7.70711C33.6834 6.31658 32.6984 4 30.7322 4H26V4C26 1.79086 24.2091 0 22 0Z" />
            </svg>
          </button>

          {/* Search Input Bar */}
          <div className="relative hidden sm:block w-48 md:w-60 lg:w-64" data-purpose="quick-search">
            <button
              id="search-trigger-btn"
              onClick={onOpenSearch}
              className="w-full h-9 pl-9 pr-3 rounded-full bg-tv-grayHover hover:bg-slate-200/80 text-left text-xs md:text-sm text-tv-muted flex items-center justify-between transition-colors border border-transparent focus:outline-none focus:border-tv-blue cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-tv-muted absolute left-3" />
                <span>Search (Ctrl+K)</span>
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => (
              <button
                key={item}
                id={`nav-link-${item.toLowerCase()}`}
                onClick={() => onNavClick(item)}
                className={`transition-colors cursor-pointer ${
                  activeNav === item
                    ? 'text-tv-blue font-semibold'
                    : 'text-tv-black hover:text-tv-blue'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile search button */}
          <button
            id="mobile-search-btn"
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-full hover:bg-tv-grayHover text-tv-black transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              id="language-selector-btn"
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setProfileMenuOpen(false);
              }}
              className="flex items-center space-x-1 text-sm font-semibold text-tv-black hover:text-tv-blue px-2 py-1.5 rounded transition-colors cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">{selectedLang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-tv-grayBorder rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-tv-black hover:bg-tv-grayHover flex items-center justify-between"
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && <Check className="w-3.5 h-3.5 text-tv-blue" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Avatar Icon */}
          <div className="relative">
            <button
              id="profile-menu-btn"
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
                setLangMenuOpen(false);
              }}
              className="p-1.5 rounded-full hover:bg-tv-grayHover text-tv-black transition-colors cursor-pointer"
              title="Account profile"
            >
              <User className="w-6 h-6" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-tv-grayBorder rounded-xl shadow-lg py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-tv-grayBorder font-semibold text-tv-black">
                  Welcome to TradingView
                </div>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full text-left px-3 py-2 text-tv-black hover:bg-tv-grayHover"
                >
                  Sign in / Register
                </button>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavClick('Help Center');
                  }}
                  className="w-full text-left px-3 py-2 text-tv-black hover:bg-tv-grayHover"
                >
                  Help Center
                </button>
                <button
                  onClick={() => {
                    setProfileMenuOpen(false);
                    onNavClick('Keyboard Shortcuts');
                  }}
                  className="w-full text-left px-3 py-2 text-tv-black hover:bg-tv-grayHover"
                >
                  Keyboard shortcuts (Ctrl+K)
                </button>
              </div>
            )}
          </div>

          {/* Get Started CTA Button */}
          <button
            id="get-started-btn"
            onClick={onOpenAuth}
            className="btn-gradient text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
          >
            Get started
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-tv-black hover:bg-tv-grayHover"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-tv-grayBorder bg-white px-4 py-3 space-y-2">
          {['Products', 'Community', 'Markets', 'Brokers', 'More'].map((item) => (
            <button
              key={item}
              onClick={() => {
                onNavClick(item);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-medium ${
                activeNav === item
                  ? 'bg-tv-grayHover text-tv-blue font-semibold'
                  : 'text-tv-black hover:bg-tv-grayHover'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
