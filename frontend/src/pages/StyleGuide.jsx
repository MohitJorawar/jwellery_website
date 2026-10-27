import React from 'react';
import { ArrowLeft, Sparkles, Diamond, ShieldCheck, Award } from 'lucide-react';

export const StyleGuide = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-28 pb-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-[1240px] mx-auto">
        {/* Back Link */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-[#eed18d] transition-colors mb-12 cursor-pointer font-sans"
        >
          <ArrowLeft size={14} /> Back to Atelier Home
        </button>

        {/* Hero Section */}
        <div className="border-b border-white/10 pb-12 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eed18d]/10 border border-[#eed18d]/30 text-[#eed18d] text-[11px] font-sans uppercase tracking-[0.25em] mb-4">
            <Sparkles size={12} /> Design System
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight text-white mb-4">
            Atelier Style Guide
          </h1>
          <p className="text-white/60 text-lg max-w-2xl font-light">
            The core visual language, harmonic typography scales, and curated color palettes powering the JaiShree Jwellers fine jewelry digital experience.
          </p>
        </div>

        {/* Color Palette */}
        <div className="mb-20">
          <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#eed18d] font-semibold mb-8">
            01 / Color Palette
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 border border-white/10 bg-[#0a0a0c]">
              <div className="h-16 w-full bg-[#eed18d] mb-4"></div>
              <p className="font-serif text-white font-medium">Champagne Gold</p>
              <p className="text-xs text-white/50 font-mono mt-1">#eed18d</p>
              <p className="text-xs text-white/40 mt-2">Primary accent & hallmarks</p>
            </div>
            <div className="p-5 border border-white/10 bg-[#0a0a0c]">
              <div className="h-16 w-full bg-[#0c1311] border border-white/20 mb-4"></div>
              <p className="font-serif text-white font-medium">Emerald Noir</p>
              <p className="text-xs text-white/50 font-mono mt-1">#0c1311</p>
              <p className="text-xs text-white/40 mt-2">Background atmosphere</p>
            </div>
            <div className="p-5 border border-white/10 bg-[#0a0a0c]">
              <div className="h-16 w-full bg-[#0a0a0c] border border-white/20 mb-4"></div>
              <p className="font-serif text-white font-medium">Deep Obsidian</p>
              <p className="text-xs text-white/50 font-mono mt-1">#0a0a0c</p>
              <p className="text-xs text-white/40 mt-2">Base page ground</p>
            </div>
            <div className="p-5 border border-white/10 bg-[#0a0a0c]">
              <div className="h-16 w-full bg-white mb-4"></div>
              <p className="font-serif text-white font-medium">Pearl White</p>
              <p className="text-xs text-white/50 font-mono mt-1">#ffffff</p>
              <p className="text-xs text-white/40 mt-2">Primary typography</p>
            </div>
            <div className="p-5 border border-white/10 bg-[#0a0a0c]">
              <div className="h-16 w-full bg-[#2a332f] mb-4"></div>
              <p className="font-serif text-white font-medium">Stroke Metal</p>
              <p className="text-xs text-white/50 font-mono mt-1">#2a332f</p>
              <p className="text-xs text-white/40 mt-2">Subtle dividers & borders</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="mb-20">
          <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#eed18d] font-semibold mb-8">
            02 / Typography Scales
          </h2>
          <div className="space-y-8 border border-white/10 p-8 sm:p-10 bg-white/[0.02]">
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs text-white/40 font-mono block mb-2">Display Heading (Cormorant / Serif)</span>
              <h1 className="text-5xl sm:text-7xl font-serif text-white">
                Timeless Brilliance
              </h1>
            </div>
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs text-white/40 font-mono block mb-2">Section Headline (H2 Serif)</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white">
                Handcrafted Solitaires & Celestial Gems
              </h2>
            </div>
            <div className="border-b border-white/10 pb-6">
              <span className="text-xs text-white/40 font-mono block mb-2">Body Text (Light / Sans)</span>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl font-light leading-relaxed">
                Every piece in our atelier is sculpted with ethically sourced 18k solid gold and certified diamonds, merging generational craftsmanship with modern grace.
              </p>
            </div>
            <div>
              <span className="text-xs text-white/40 font-mono block mb-2">Micro Label / Metadata</span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#eed18d] font-semibold">
                CERTIFIED VVS1 NATURAL DIAMOND · 18K SOLID GOLD
              </span>
            </div>
          </div>
        </div>

        {/* Buttons & Interactions */}
        <div>
          <h2 className="text-xs font-sans uppercase tracking-[0.3em] text-[#eed18d] font-semibold mb-8">
            03 / Interactive Components
          </h2>
          <div className="flex flex-wrap gap-6 items-center border border-white/10 p-8 sm:p-10 bg-white/[0.02]">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="px-8 py-3.5 bg-[#eed18d] text-[#0a0a0c] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              Primary Gold CTA
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className="px-8 py-3.5 border border-[#eed18d]/60 text-[#eed18d] text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#eed18d] hover:text-[#0a0a0c] transition-colors cursor-pointer"
            >
              Outlined Luxury
            </button>
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/80 hover:text-[#eed18d] transition-colors cursor-pointer font-medium"
            >
              Ghost Link with Icon <Sparkles size={13} className="text-[#eed18d]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
