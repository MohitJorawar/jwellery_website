import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const NotFound = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.3em] text-[#eed18d] font-semibold block">
          404 · Atelier Notice
        </span>
        <h1 className="text-6xl sm:text-8xl font-serif text-white font-normal">
          404
        </h1>
        <p className="text-white/70 text-base font-light leading-relaxed">
          The fine jewelry piece or page you are seeking has retired to our private vault or does not exist.
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#eed18d] text-[#0a0a0c] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} /> Return to Atelier Home
          </button>
        </div>
      </div>
    </div>
  );
};
