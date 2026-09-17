import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      id="auth-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-tv-grayBorder p-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-6 text-tv-black" fill="currentColor" viewBox="0 0 36 28">
              <path d="M0 4C0 1.79086 1.79086 0 4 0H10C12.2091 0 14 1.79086 14 4V24C14 26.2091 12.2091 28 10 28H4C1.79086 28 0 26.2091 0 24V4Z" />
              <path d="M22 0H16V28H22C24.2091 28 26 26.2091 26 24V14L32.2929 7.70711C33.6834 6.31658 32.6984 4 30.7322 4H26V4C26 1.79086 24.2091 0 22 0Z" />
            </svg>
            <span className="font-bold text-lg text-tv-black">Get started for free</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-tv-grayHover text-tv-muted hover:text-tv-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-tv-green flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-tv-black">Verification Link Sent</h4>
            <p className="text-xs text-tv-muted mt-1">
              We sent a login confirmation email to <span className="font-semibold">{email}</span>.
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full py-2.5 rounded-full bg-tv-black text-white text-xs font-semibold hover:bg-black transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSubmitted(true);
            }}
            className="space-y-4"
          >
            <p className="text-xs text-tv-muted">
              Access real-time financial quotes, customized watchlists, technical charts, and community trading ideas.
            </p>

            <div>
              <label className="block text-xs font-semibold text-tv-black mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="trader@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-tv-grayBorder text-sm text-tv-black placeholder:text-tv-muted focus:outline-none focus:border-tv-blue"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-gradient text-white text-sm font-semibold py-2.5 rounded-full shadow-xs hover:shadow transition-all cursor-pointer"
            >
              Continue with Email
            </button>

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-tv-grayBorder"></div>
              <span className="shrink-0 mx-3 text-[11px] text-tv-muted">or continue with</span>
              <div className="flex-grow border-t border-tv-grayBorder"></div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="py-2 px-3 border border-tv-grayBorder hover:bg-tv-grayHover rounded-xl text-xs font-semibold text-tv-black transition-colors"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="py-2 px-3 border border-tv-grayBorder hover:bg-tv-grayHover rounded-xl text-xs font-semibold text-tv-black transition-colors"
              >
                Apple
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
