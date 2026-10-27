import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TickerStar = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="glymora-ticker-star"
    style={{ width: '18px', height: '18px', display: 'inline-block', margin: '0 24px', color: '#eed18d', verticalAlign: 'middle' }}
  >
    <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
  </svg>
);

const TabStarIcon = () => (
  <svg
    viewBox="0 0 14 14"
    fill="currentColor"
    className="values-pill-icon"
  >
    <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" />
  </svg>
);

export const About = ({ onNavigate, onOpenShowroomModal }) => {
  const [activeTab, setActiveTab] = useState('craftsmanship');
  const [openFaq, setOpenFaq] = useState(0);

  const valuesData = {
    craftsmanship: {
      title: 'Where Craft Meets Soul',
      text: 'True beauty begins with authenticity. Every Caelora piece reflects genuine intention and thoughtful design, created to honor individuality, confidence, and quiet strength.'
    },
    authenticity: {
      title: 'Where authenticity lives',
      text: 'We believe true beauty shines from authenticity — from the heart and the hands that create it. Every Caelora creation embodies precision, passion, and purpose, designed to stand the test of time. Our jewels are more than adornments; they are symbols of elegance, emotion, and individuality — crafted to celebrate confidence, grace, and the quiet strength within every woman.'
    },
    elegance: {
      title: 'Where Elegance Unfolds',
      text: 'Elegance lives in simplicity. Each Caelora piece is thoughtfully designed to reflect grace, emotion, and understated sophistication.'
    }
  };

  const faqData = [
    {
      q: 'Are your products genuine?',
      a: 'Yes, every piece is crafted from certified, ethically sourced materials — ensuring authenticity and lasting brilliance.'
    },
    {
      q: 'Do you ship worldwide?',
      a: 'Yes, we ship internationally to most countries. Shipping costs and delivery times vary by location and will be calculated at checkout.'
    },
    {
      q: 'Can I track my order?',
      a: 'Yes — once your order ships, you’ll receive a tracking number so you can track its delivery status. If you need help tracking it, just let me know!'
    },
    {
      q: 'Do you offer custom designs?',
      a: 'Yes — we offer custom designs! You can request personalized/custom items based on your preferences. Just provide your design details, and we’ll help make it happen.'
    },
    {
      q: 'How long does delivery take?',
      a: 'Delivery times vary depending on your location and shipping method, but it typically takes 7–21 business days for international orders. Domestic delivery may be faster (often 3–7 business days). Exact estimates will be provided at checkout.'
    },
    {
      q: 'Is there a warranty on my jewelry?',
      a: 'Yes, our jewelry includes a warranty covering manufacturing defects.'
    },
    {
      q: 'How should I care for my pieces?',
      a: 'Store your jewelry safely, avoid water and chemicals, and clean gently with a soft cloth.'
    }
  ];

  const tickerItems = [
    'GET 20% DISCOUNT FOR ALL PRODUCTS',
    'GET 20% DISCOUNT FOR ALL PRODUCTS',
    'GET 20% DISCOUNT FOR ALL PRODUCTS',
    'GET 20% DISCOUNT FOR ALL PRODUCTS',
    'GET 20% DISCOUNT FOR ALL PRODUCTS',
    'GET 20% DISCOUNT FOR ALL PRODUCTS'
  ];

  return (
    <div className="glymora-about-page">
      {/* ============================================= */}
      {/* SECTION 1: HERO BANNER "Our story"            */}
      {/* ============================================= */}
      <section className="glymora-about-hero">
        <div className="about-banner-container">
          <div className="about-banner-layout">
            <div className="about-banner-left">
              <h1 className="about-title-row" aria-label="Our story">
                <span className="about-title-char gold-accent">O</span>
                <span className="about-title-char">u</span>
                <span className="about-title-char">r</span>
                <span className="about-title-char">&nbsp;</span>
                <span className="about-title-char">s</span>
                <span className="about-title-char">t</span>
                <span className="about-title-char">o</span>
                <span className="about-title-char">r</span>
                <span className="about-title-char gold-accent">y</span>
              </h1>
            </div>

            <div className="about-banner-right">
              <div className="about-video-container">
                <video
                  className="about-video-player"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5%2F694f78a93d24c0d09561170f_Women%20With%20Earings_poster.0000000.jpg"
                >
                  <source
                    src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5%2F694f78a93d24c0d09561170f_Women%20With%20Earings_mp4.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="about-banner-info">
                <p className="about-banner-desc">
                  Where timeless artistry meets modern sophistication — discover the story behind
                  Caelora’s exquisite craftsmanship and enduring beauty.
                </p>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('shop')}
                  className="glymora-button-shop"
                  aria-label="Visit shop"
                >
                  <span className="glymora-btn-arrow-box">
                    <ArrowRight size={14} className="glymora-btn-arrow" />
                  </span>
                  <span className="glymora-btn-label">Visit shop</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Discount Ribbon */}
        <div className="glymora-ticker-wrap">
          <div className="glymora-ticker-track">
            {tickerItems.map((text, idx) => (
              <span key={`a-${idx}`} className="glymora-ticker-item">
                {text}
                <TickerStar />
              </span>
            ))}
            {tickerItems.map((text, idx) => (
              <span key={`b-${idx}`} className="glymora-ticker-item">
                {text}
                <TickerStar />
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 2: OUR VALUES (Interactive Tabs)      */}
      {/* ============================================= */}
      <section className="glymora-values-section">
        <div className="values-container">
          <div className="values-layout">
            <div className="values-image-wrap">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fe379d462cfffbb010e79_Elegant%20Hair%20Portrait%20(1).webp"
                alt="Elegant Hair Portrait"
                className="values-image"
                loading="eager"
              />
            </div>

            <div className="values-right-content">
              <h2 className="values-section-tag">Our values</h2>

              <div className="values-card">
                <h3 className="values-card-title">{valuesData[activeTab].title}</h3>
                <p className="values-card-text">{valuesData[activeTab].text}</p>
              </div>

              <div className="values-tab-row" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'craftsmanship'}
                  onClick={() => setActiveTab('craftsmanship')}
                  className={`values-tab-pill ${activeTab === 'craftsmanship' ? 'active' : ''}`}
                >
                  <TabStarIcon />
                  <span>Craftsmanship</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'authenticity'}
                  onClick={() => setActiveTab('authenticity')}
                  className={`values-tab-pill ${activeTab === 'authenticity' ? 'active' : ''}`}
                >
                  <TabStarIcon />
                  <span>Authenticity</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'elegance'}
                  onClick={() => setActiveTab('elegance')}
                  className={`values-tab-pill ${activeTab === 'elegance' ? 'active' : ''}`}
                >
                  <TabStarIcon />
                  <span>Elegance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 3: STATS SHOWCASE                     */}
      {/* ============================================= */}
      <section className="glymora-stats-section">
        <div className="values-container">
          <div className="stats-grid">
            {/* 1. Photo 1 with Stats label */}
            <div className="stats-card photo-card" style={{ position: 'relative' }}>
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fac32ee4099a70a70584c_Elegant%20Hairstyle%20Portrait.webp"
                alt="Elegant Hairstyle Portrait"
                loading="lazy"
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '28px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '36px',
                  color: '#ffffff',
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}
              >
                Stats
              </div>
            </div>

            {/* 2. Stat 1 */}
            <div className="stats-card">
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#eed18d">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 className="stats-number">15,000+</h3>
                <p className="stats-desc">Happy clients wearing caelora with pride.</p>
              </div>
            </div>

            {/* 3. Photo 2 */}
            <div className="stats-card photo-card">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fbab487fa3866ee8e1d6d_Elegant%20Monochrome%20Portrait.webp"
                alt="Elegant Monochrome Portrait"
                loading="lazy"
              />
            </div>

            {/* 4. Stat 2 */}
            <div className="stats-card">
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#eed18d">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 className="stats-number">10+</h3>
                <p className="stats-desc">Years of crafting timeless fine jewelry.</p>
              </div>
            </div>

            {/* 5. Photo 3 */}
            <div className="stats-card photo-card">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fbc9ce2020de7ebb5079e_Elegant%20Gold%20Jewelry%20Portrait.webp"
                alt="Elegant Gold Jewelry Portrait"
                loading="lazy"
              />
            </div>

            {/* 6. Stat 3 */}
            <div className="stats-card">
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#eed18d">
                  <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 className="stats-number">25+</h3>
                <p className="stats-desc">Skilled artisans dedicated to perfection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 4: OUR TEAMS                          */}
      {/* ============================================= */}
      <section className="glymora-teams-section">
        <div className="values-container">
          <div className="teams-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="teams-title">Our teams</h2>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('shop')}
              className="glymora-button-shop"
            >
              <span className="glymora-btn-arrow-box">
                <ArrowRight size={14} className="glymora-btn-arrow" />
              </span>
              <span className="glymora-btn-label">View all</span>
            </button>
          </div>

          <div className="teams-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {/* Member 1: Aria Vellin */}
            <div className="team-member-card">
              <div className="team-member-photo-wrap">
                <img
                  src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fcac60951a14b78886e5a_Women%20Portrait.webp"
                  alt="Aria Vellin"
                  className="team-member-photo"
                  loading="lazy"
                />
              </div>
              <div className="team-member-info">
                <div>
                  <h4 className="team-member-name">Aria Vellin</h4>
                  <p className="team-member-role">Founder &amp; Creative Director</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.7)' }}>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <InstagramIcon />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Member 2: Adrian Vale */}
            <div className="team-member-card">
              <div className="team-member-photo-wrap">
                <img
                  src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/695cde757db32326c8a1347a_A%20Man%20Portrait.webp"
                  alt="Adrian Vale"
                  className="team-member-photo"
                  loading="lazy"
                />
              </div>
              <div className="team-member-info">
                <div>
                  <h4 className="team-member-name">Adrian Vale</h4>
                  <p className="team-member-role">Head of Craftsmanship</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.7)' }}>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <InstagramIcon />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Member 3: Elena Brooks */}
            <div className="team-member-card">
              <div className="team-member-photo-wrap">
                <img
                  src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fd0705c13ee50984e1a6c_Young%20Women%20portrait.webp"
                  alt="Elena Brooks"
                  className="team-member-photo"
                  loading="lazy"
                />
              </div>
              <div className="team-member-info">
                <div>
                  <h4 className="team-member-name">Elena Brooks</h4>
                  <p className="team-member-role">Lead Jewelry Designer</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', color: 'rgba(255,255,255,0.7)' }}>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <InstagramIcon />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
                    <LinkedinIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 5: GOLDEN GALLERY                     */}
      {/* ============================================= */}
      <section className="glymora-gallery-section">
        <div className="values-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ffffff', margin: 0, fontWeight: 400 }}>
              Golden
            </h2>
            <div style={{ width: '130px', height: '60px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)' }}>
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fdc8ab6c982850fc4dbba_Vintage%20Sophistication.webp"
                alt="Vintage Sophistication"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ffffff', margin: 0, fontWeight: 400 }}>
              gallery
            </h2>
          </div>

          <div className="gallery-grid">
            {/* Gallery Image 1 */}
            <div className="gallery-card one">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/694fdc8ab6c982850fc4dbba_Vintage%20Sophistication.webp"
                alt="Vintage Sophistication"
                loading="lazy"
              />
            </div>

            {/* Gallery Image 2 */}
            <div className="gallery-card two">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/695907d5efe59f7b8ec6d7f2_Women%20Wearing%20A%20Gold%20Nackelace.webp"
                alt="Women Wearing A Gold Necklace"
                loading="lazy"
              />
            </div>

            {/* Gallery Image 3 */}
            <div className="gallery-card three">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69590856eed657f426dd79ba_Beautiful%20Women%20Portrait.webp"
                alt="Beautiful Women Portrait"
                loading="lazy"
              />
            </div>

            {/* Gallery Image 4 with Glymora brand overlay */}
            <div className="gallery-card four">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/695908bf89cc6f663a8f1ea3_Beautiful%20Engagement%20Ring.webp"
                alt="Beautiful Engagement Ring"
                loading="lazy"
              />
              <div className="gallery-overlay-badge">
                Glymora
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SECTION 6: HELP & ANSWERS (FAQ Accordion)     */}
      {/* ============================================= */}
      <section className="glymora-faq-section">
        <div className="values-container">
          <h2 className="faq-title">Help &amp; answers</h2>

          <div className="faq-list">
            {faqData.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="faq-question-btn"
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question-text">{item.q}</span>
                    <span className="faq-icon-wrap">
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="faq-answer-panel">
                      <p className="faq-answer-text">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
