import React from 'react';
import {
  LogoCozyNest,
  LogoNexaTech,
  LogoEleganza,
  LogoEnergetix,
  LogoPureGlow,
  GlymoraFooterStar,
} from './GlymoraBrandLogos';

const BRAND_CHEVRONS = [
  { line: 1, name: 'CozyNest', Logo: LogoCozyNest },
  { line: 2, name: 'NexaTech', Logo: LogoNexaTech },
  { line: 1, name: 'Eleganza', Logo: LogoEleganza },
  { line: 2, name: 'Energetix', Logo: LogoEnergetix },
  { line: 1, name: 'PureGlow', Logo: LogoPureGlow },
  { line: 2, name: 'CozyNest', Logo: LogoCozyNest },
  { line: 1, name: 'NexaTech', Logo: LogoNexaTech },
  { line: 2, name: 'Eleganza', Logo: LogoEleganza },
  { line: 1, name: 'Energetix', Logo: LogoEnergetix },
  { line: 2, name: 'PureGlow', Logo: LogoPureGlow },
];

export const Footer = ({ onNavigate }) => {
  // Triple the array to provide an uninterrupted continuous looping carousel
  const marqueeList = [...BRAND_CHEVRONS, ...BRAND_CHEVRONS, ...BRAND_CHEVRONS];

  const handleNav = (page) => {
    if (onNavigate) {
      onNavigate(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="glymora-footer-section">
      <div className="glymora-footer-layout">
        {/* 1. Carousel of brands in triangle-like chevron shapes */}
        <div className="glymora-footer-marquee-wrap">
          <div className="glymora-footer-marquee-track">
            {marqueeList.map((item, idx) => (
              <div className="glymora-footer-line-box" key={`brand-chevron-${idx}`}>
                <img
                  src={
                    item.line === 1
                      ? 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6948f1bd0f4750fbee021f5e_Footer%20Line%20One.png'
                      : 'https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/6948f1dbffa7a2d5e6364a90_Footer%20Line%20Two.png'
                  }
                  alt={item.line === 1 ? 'Chevron Top' : 'Chevron Bottom'}
                  className={item.line === 1 ? 'glymora-footer-line-one' : 'glymora-footer-line-two'}
                  loading="eager"
                />
                <div className={`glymora-collab-icon ${item.line === 1 ? 'one' : 'two'}`}>
                  <item.Logo />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Middle Row: Image in middle & navbar besides */}
        <div className="glymora-footer-middle-box">
          <div className="glymora-footer-menu-box">
            {/* Left Navbar: Home, About, Shop */}
            <div className="glymora-footer-left-menu">
              <button
                type="button"
                onClick={() => handleNav('home')}
                className="glymora-footer-nav-link active"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleNav('about')}
                className="glymora-footer-nav-link"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => handleNav('shop')}
                className="glymora-footer-nav-link"
              >
                Shop
              </button>
            </div>

            {/* Middle: Tilted portrait photo of elegant woman */}
            <div className="glymora-footer-image-box">
              <img
                src="https://cdn.prod.website-files.com/6947ba20efe4a10015df32b5/69493546078d7f4b126bb352_Elegant%20Profile%20Portrait.webp"
                alt="Elegant Profile Portrait"
                className="glymora-footer-image"
                loading="lazy"
              />
            </div>

            {/* Right Navbar: Blog, Contact, Licenses */}
            <div className="glymora-footer-right-menu">
              <button
                type="button"
                onClick={() => handleNav('blogs')}
                className="glymora-footer-nav-link"
              >
                Blog
              </button>
              <button
                type="button"
                onClick={() => handleNav('contact')}
                className="glymora-footer-nav-link"
              >
                Contact
              </button>
              <button
                type="button"
                onClick={() => handleNav('licenses')}
                className="glymora-footer-nav-link"
              >
                Licenses
              </button>
            </div>
          </div>

          {/* 3. Brand name below the image flanked by golden sparkle stars */}
          <div className="glymora-footer-bottom-box">
            <div className="glymora-footer-star-box">
              <GlymoraFooterStar />
            </div>

            <h2 className="glymora-footer-title">
              JaiShree Jwellers
            </h2>

            <div className="glymora-footer-star-box">
              <GlymoraFooterStar />
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="glymora-footer-copyright-box">
          <p className="glymora-footer-copyright-text">
            Copyright © JaiShree Jwellers | Designed by{' '}
            <a
              href="https://webflow.com/templates/designers/theme-sleek"
              target="_blank"
              rel="noreferrer"
            >
              Theme Sleek
            </a>
          </p>
          <p className="glymora-footer-copyright-text">
            Powered by{' '}
            <a
              href="https://webflow.com/"
              target="_blank"
              rel="noreferrer"
            >
              Webflow
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
