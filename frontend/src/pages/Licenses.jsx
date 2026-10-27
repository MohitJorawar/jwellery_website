import React from 'react';
import { ArrowLeft, Shield, Sparkles, ExternalLink } from 'lucide-react';

export const Licenses = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0b1210] text-white pt-24 pb-28">
      <div className="max-w-4xl mx-auto px-6 sm:px-12">
        {/* Breadcrumb / Back button */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#eed18d] hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Home
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-8 mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#eed18d] font-semibold mb-3 inline-block">
            Legal & Attribution
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl text-white font-normal mb-4">
            Licenses & Credits
          </h1>
          <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
            All imagery, typographic fonts, and assets used on this site are respected under their respective creators' open licenses and commercial agreements.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Images */}
          <div className="bg-[#121816] border border-white/10 p-8 sm:p-10 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Photography & Imagery</h2>
            <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
              All luxury photography showcasing jewelry models, diamonds, rings, and textures are sourced from royalty-free editorial databases and professional model collections including Unsplash, Pexels, and Webflow assets.
            </p>
            <div className="pt-3">
              <a
                href="https://unsplash.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#eed18d] hover:underline"
              >
                <span>View Unsplash License</span> <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Typography */}
          <div className="bg-[#121816] border border-white/10 p-8 sm:p-10 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Typography & Fonts</h2>
            <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
              The primary and secondary typefaces powering JaiShree Jwellers—including Cormorant Garamond, Playfair Display, and Inter—are open-source Google Fonts released under the SIL Open Font License (OFL).
            </p>
            <div className="pt-3">
              <a
                href="https://scripts.sil.org/OFL"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#eed18d] hover:underline"
              >
                <span>View SIL Open Font License</span> <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Vectors & Icons */}
          <div className="bg-[#121816] border border-white/10 p-8 sm:p-10 space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-white">Vector Assets & Monograms</h2>
            <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
              Geometric emblems, star sparkles, and brand partnership vector icons are rendered via SVG vectors and Lucide icon systems released under MIT licensing.
            </p>
            <div className="pt-3">
              <a
                href="https://lucide.dev/license"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#eed18d] hover:underline"
              >
                <span>View Lucide License</span> <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-14 pt-8 border-t border-white/10 text-center text-xs text-white/40">
          JaiShree Jwellers Fine Jewelry Atelier © 2026. All rights reserved.
        </div>
      </div>
    </div>
  );
};
