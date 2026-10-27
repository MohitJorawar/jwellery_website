import React from 'react';
import { ArrowLeft, GitCommit, CheckCircle2 } from 'lucide-react';

export const Changelog = ({ onNavigate }) => {
  const releases = [
    {
      version: 'v2.4.0',
      date: 'October 2026',
      badge: 'Current Release',
      title: 'Full JaiShree Jwellers Bespoke Digital Atelier',
      items: [
        'Complete integration of 2026 Haute Couture Diamond and Solitaire collection.',
        'High-definition interactive editorial Jewelry Journal with author notes and reading mode.',
        'Artisan Team directory and direct atelier private showroom appointments.',
        'Refined luxury champagne typography, responsive mega-menu navigation and full brand mark.',
      ],
    },
    {
      version: 'v2.1.0',
      date: 'September 2026',
      badge: 'Feature Update',
      title: 'VIP Concierge & Seamless Checkout',
      items: [
        'Instant sliding cart drawer with live subtotal calculation and free worldwide shipping thresholds.',
        'Personal client wishlist synchronization with local storage persistence.',
        'Integrated WhatsApp direct jeweler concierge link.',
      ],
    },
    {
      version: 'v1.0.0',
      date: 'August 2026',
      badge: 'Initial Launch',
      title: 'Foundation Atelier Launch',
      items: [
        'Official launch of the JaiShree Jwellers fine jewelry flagship digital showroom.',
        'Conflict-free diamond provenance and Kimberley Process certification guarantees.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white pt-28 pb-24 px-6 sm:px-12 lg:px-20">
      <div className="max-w-[1000px] mx-auto">
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
            <GitCommit size={12} /> Version History
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight text-white mb-4">
            Atelier Changelog
          </h1>
          <p className="text-white/60 text-lg max-w-2xl font-light">
            Continuous enhancements, curated collections, and atelier craftsmanship notes.
          </p>
        </div>

        {/* Release Timeline */}
        <div className="space-y-12">
          {releases.map((rel) => (
            <div key={rel.version} className="border border-white/10 p-8 sm:p-10 bg-white/[0.02]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-serif text-[#eed18d]">{rel.version}</span>
                  <span className="px-2.5 py-0.5 text-[10px] uppercase tracking-widest font-sans font-semibold bg-[#eed18d]/10 text-[#eed18d] border border-[#eed18d]/30">
                    {rel.badge}
                  </span>
                </div>
                <span className="text-xs text-white/40 font-mono">{rel.date}</span>
              </div>
              <h3 className="text-xl font-serif text-white mb-4">{rel.title}</h3>
              <ul className="space-y-3">
                {rel.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-white/70 font-light leading-relaxed">
                    <CheckCircle2 size={16} className="text-[#eed18d] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
