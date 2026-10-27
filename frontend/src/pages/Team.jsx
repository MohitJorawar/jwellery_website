import React from 'react';
import { Sparkles, ArrowRight, Award, Compass, HeartHandshake, ShieldCheck } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Aria Vellin',
    role: 'Founder & Creative Director',
    bio: 'Guided by two decades of European high jewelry mentorship, Aria breathes soul and sculptural balance into every Glymora silhouette.',
    image: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694ce498c9cdc08489ec1b04_Professional%20Portrait%20of%20a%20Women.webp',
  },
  {
    name: 'Adrian Vale',
    role: 'Head of Craftsmanship',
    bio: 'A certified master gemologist and goldsmith, Adrian oversees our precision lost-wax casting and microscopic diamond pavé settings.',
    image: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694cea037be15b3ceac4906d_Adrian%20Vale.webp',
  },
  {
    name: 'Selene Hart',
    role: 'Brand Experience Lead',
    bio: 'Ensuring that private showroom viewings, bespoke commissions, and VIP concierge sessions are as seamless and unforgettable as the jewels themselves.',
    image: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694cea8517c8aebabb8347d1_Selene%20Hart.webp',
  },
  {
    name: 'Owen Blake',
    role: 'Gemological Sourcing Director',
    bio: 'Traveling globally to curate exceptional ethically mined and certified conflict-free diamonds with extraordinary fire and optical symmetry.',
    image: 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694ceafeebc6d94b41912d82_Owen%20Blake.webp',
  },
];

export const Team = ({ onNavigate, onOpenShowroomModal }) => {
  return (
    <div className="min-h-screen bg-[#0b1210] text-white pt-24 pb-28">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#eed18d] font-semibold mb-3 inline-block">
          The Artisans & Visionaries
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-6 tracking-tight">
          Passion Team
        </h1>
        <p className="max-w-xl mx-auto font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
          Meet the dedicated master goldsmiths, certified gemologists, and creative directors shaping the future of fine jewelry artistry.
        </p>
      </div>

      {/* Team Grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
        {TEAM_MEMBERS.map((member, idx) => (
          <div
            key={idx}
            className="group bg-[#121816] border border-white/10 hover:border-[#eed18d]/40 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col sm:flex-row items-stretch"
          >
            <div className="sm:w-5/12 overflow-hidden relative min-h-[280px]">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                loading="lazy"
              />
            </div>
            <div className="sm:w-7/12 p-8 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#eed18d] font-sans font-semibold mb-2 block">
                  {member.role}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3 group-hover:text-[#eed18d] transition-colors">
                  {member.name}
                </h3>
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/40 tracking-wider">Glymora Atelier</span>
                <button
                  type="button"
                  onClick={() => onOpenShowroomModal ? onOpenShowroomModal() : onNavigate('contact')}
                  className="text-xs text-[#eed18d] hover:text-white transition-colors uppercase tracking-widest"
                >
                  Consultation →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Values Banner */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12">
        <div className="border border-white/10 bg-[#0d1412] p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <h2 className="font-serif text-3xl sm:text-4xl text-white">
              Experience Bespoke Fine Jewelry
            </h2>
            <p className="font-sans text-sm text-white/70 font-light">
              Connect directly with our master craftsmen to commission a one-of-a-kind solitaire ring, custom bridal suite, or heirloom redesign.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-8 py-3.5 bg-[#eed18d] text-[#0b1210] font-serif text-sm hover:bg-white transition-colors uppercase tracking-wider font-medium flex-shrink-0"
          >
            Schedule Consultation
          </button>
        </div>
      </div>
    </div>
  );
};
