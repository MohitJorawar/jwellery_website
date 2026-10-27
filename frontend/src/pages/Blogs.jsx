import React, { useState } from 'react';
import { ArrowRight, Calendar, User, Clock, Sparkles, X } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: 'Our Founder’s Journey: The Passion Behind the Brand',
    date: 'April 19, 2026',
    author: 'Daniel Wright',
    readTime: '5 min read',
    category: 'Heritage',
    image: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/69624cffa395e5a88b92e2fc_Beautiful%20Flower%20Ring.webp',
    excerpt: 'Explore how a lifelong devotion to gemstone alchemy and artisanal diamond setting laid the foundation for JaiShree Jwellers’s high jewelry atelier.',
    content: `From early childhood days spent admiring master gem cutters in historic European workshops, our founder nurtured a singular dream: creating fine jewelry that exists beyond fleeting trends. 

At JaiShree Jwellers, every diamond is selected not merely for technical clarity, but for its inner fire and light architecture. We believe high jewelry is a personal talisman—a quiet yet radiant declaration of poise, heritage, and timeless grace.`,
  },
  {
    id: 2,
    title: 'Bridal Jewelry Trends Every Bride Should Know',
    date: 'April 19, 2026',
    author: 'Henry Lewis',
    readTime: '4 min read',
    category: 'Bridal',
    image: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd6805263b89fb2d51c58_Henry%20Lewis.webp',
    excerpt: 'From architectural bezel settings to luminous South Sea pearl tiers, discover the curated bridal silhouettes defining this wedding season.',
    content: `Modern bridal luxury is characterized by effortless sophistication. Contemporary brides are pairing vintage-cut marquise stones with minimalist platinum bands, celebrating both family ancestry and modern individuality.

Discover our curated bridal sets crafted with conflict-free diamonds and recycled precious gold, meticulously balanced to complement everything from classic lace gowns to sleek satin silhouettes.`,
  },
  {
    id: 3,
    title: 'How Our Designs Go from Sketch to Sparkle',
    date: 'January 14, 2026',
    author: 'Grace Patel',
    readTime: '6 min read',
    category: 'Craftsmanship',
    image: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd6ccde19c6eb7e294fd5_Grace%20Patel.webp',
    excerpt: 'Step inside our master atelier to witness the painstaking hand-sketches, lost-wax casting, and microscopic pavé setting that bring each jewel to life.',
    content: `Before a piece takes physical form, it lives as hand-drawn gouache sketches where proportions, gemstone weights, and light reflections are scrutinized down to a fraction of a millimeter.

Our master goldsmiths spend up to 140 hours hand-carving and hand-polishing every curve. The result is jewelry with a silk-soft touch against the skin and an unmistakable luminescence in motion.`,
  },
  {
    id: 4,
    title: 'Jewelry That Complements Your Wedding Dress Style',
    date: 'January 14, 2025',
    author: 'Mia Carter',
    readTime: '4 min read',
    category: 'Styling',
    image: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd70b0a8dec4a7b378347_Mia%20Carter.webp',
    excerpt: 'Harmonize your neckline, silhouette, and precious metal choice with our definitive guide to bridal jewelry styling.',
    content: `The secret to exceptional bridal styling lies in intentional balance. A sweetheart neckline asks for an intimate drop pendant or bold chandelier earrings, while a high-neck halter gown shines brightest with sculptural ear cuffs and a stacked solitaire ring.

Our stylists recommend focusing on one focal statement piece, letting the brilliance of the stones echo the gentle drape of your dress.`,
  },
  {
    id: 5,
    title: 'The Ultimate Guide to Styling Jewelry for Elegance',
    date: 'January 14, 2025',
    author: 'Evelyn Harper',
    readTime: '5 min read',
    category: 'Editorial',
    image: 'https://cdn.prod.website-files.com/694a845cb7f2ddee3bad49a9/694cd769e2e43f7ad86d7dfb_Chloe%20Anderson.webp',
    excerpt: 'Master the art of layering delicate chains, pairing contrasting gold tones, and curating an effortless day-to-evening jewelry wardrobe.',
    content: `True elegance is never overstated. By blending contrasting textures—such as a polished 18K yellow gold band paired with an eternity diamond pavé—you create depth without clutter.

Discover the foundational principles of building a fine jewelry capsule that moves fluidly from morning meetings to candlelit galas with perpetual poise.`,
  },
];

export const Blogs = ({ onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState(null);

  return (
    <div className="min-h-screen bg-[#0b1210] text-white pt-24 pb-28">
      {/* Hero Header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 mb-16 text-center">
        <span className="text-xs uppercase tracking-[0.25em] text-[#eed18d] font-semibold mb-3 inline-block">
          The Atelier Chronicle
        </span>
        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white mb-6 tracking-tight">
          Jewelry Journal
        </h1>
        <p className="max-w-xl mx-auto font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed">
          Stories of heritage, high craftsmanship, styling guides, and the enduring poetry behind JaiShree Jwellers’s fine jewelry collections.
        </p>
      </div>

      {/* Blog Cards Container */}
      <div className="max-w-6xl mx-auto px-6 sm:px-12 space-y-12">
        {BLOG_POSTS.map((post, idx) => (
          <article
            key={post.id}
            className="group bg-[#121816] border border-white/10 hover:border-[#eed18d]/40 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch"
          >
            {/* Image Column */}
            <div className="md:w-5/12 relative overflow-hidden min-h-[260px] md:min-h-[340px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#0b1210]/85 backdrop-blur-md px-3 py-1 border border-white/15 text-[11px] uppercase tracking-widest text-[#eed18d] font-sans">
                {post.category}
              </div>
            </div>

            {/* Content Column */}
            <div className="md:w-7/12 p-8 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Meta Header */}
                <div className="flex items-center gap-4 text-xs text-white/50 mb-4 font-sans tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-[#eed18d]" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-[#eed18d]" /> {post.author}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white group-hover:text-[#eed18d] transition-colors mb-4 leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="font-sans text-sm text-white/70 font-light leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveArticle(post)}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#eed18d] hover:text-white font-medium transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="text-xs text-white/40 hover:text-white/80 transition-colors"
                >
                  Explore jewels
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#0e1614] border border-white/20 p-8 sm:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <span className="text-[11px] uppercase tracking-[0.2em] text-[#eed18d] font-semibold mb-2 block">
              {activeArticle.category} • {activeArticle.date}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6 leading-tight">
              {activeArticle.title}
            </h2>

            <div className="w-full h-64 overflow-hidden mb-6 border border-white/10">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="font-sans text-sm sm:text-base text-white/80 font-light leading-relaxed whitespace-pre-line space-y-4 mb-8">
              {activeArticle.content}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-white/50">
                Author: <span className="text-white">{activeArticle.author}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveArticle(null);
                  onNavigate('shop');
                }}
                className="px-6 py-2.5 bg-[#eed18d] text-[#0b1210] font-serif text-sm hover:bg-white transition-colors"
              >
                Shop Featured Pieces
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
