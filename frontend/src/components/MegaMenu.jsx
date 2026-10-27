import React from 'react';
import { GLYMORA_PRODUCTS } from '../data/glymoraProducts';

export const MegaMenu = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  onSelectCategory,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const handleLink = (action) => {
    action();
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const celesteRing = GLYMORA_PRODUCTS.find((p) => p.slug === 'celeste-diamond-ring') || GLYMORA_PRODUCTS[0];

  return (
    // Outer hover bridge container: positioned so Pages aligns above column 3, extending luxuriously to the left
    <div
      className="absolute top-full -right-16 sm:-right-20 md:-right-24 lg:-right-28 pt-3.5 z-50 transition-all duration-300"
      onMouseEnter={(e) => e.stopPropagation()}
      onMouseLeave={onClose}
    >
      {/* Exact Glymora Mega Menu Box - Spacious, Open & Airy Luxury Design */}
      <div
        style={{ fontFamily: "'Lora', serif" }}
        className="w-[740px] sm:w-[820px] lg:w-[880px] max-w-[calc(100vw-30px)] bg-[#0c1311]/98 backdrop-blur-md border border-[#2a332f] shadow-[0_40px_100px_rgba(0,0,0,0.95)] p-10 sm:p-12 lg:p-14 text-white select-none transition-all duration-300 animate-in fade-in duration-200"
      >
        <div className="grid grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
          {/* Column 1: PAges */}
          <div>
            <h5 className="font-serif text-[30px] sm:text-[34px] text-white font-normal mb-8 tracking-tight">
              PAges
            </h5>
            <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] font-normal tracking-[0.02em]">
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('home'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'home' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Home
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('about'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'about' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  About
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('shop'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'shop' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Shop
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('contact'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'contact' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Contact
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('blogs'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'blogs' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Blogs
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('team'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'team' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Team
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('changelog'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'changelog' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Changelog
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('licenses'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'licenses' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Licenses
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Cms */}
          <div>
            <h5 className="font-serif text-[30px] sm:text-[34px] text-white font-normal mb-8 tracking-tight">
              Cms
            </h5>
            <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] font-normal tracking-[0.02em]">
              <div>
                <button
                  type="button"
                  onClick={() =>
                    handleLink(() => {
                      if (onSelectProduct && celesteRing) onSelectProduct(celesteRing);
                      else onNavigate('product');
                    })
                  }
                  className="hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer text-white/85 hover:text-white transition-colors block text-left"
                >
                  Products Details
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('blogs'))}
                  className="hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer text-white/85 hover:text-white transition-colors block text-left"
                >
                  Blogs Details
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    handleLink(() => {
                      if (onSelectCategory) onSelectCategory('All');
                      onNavigate('shop');
                    })
                  }
                  className="hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer text-white/85 hover:text-white transition-colors block text-left"
                >
                  Categories Details
                </button>
              </div>
            </div>
          </div>

          {/* Column 3: utility */}
          <div>
            <h5 className="font-serif text-[30px] sm:text-[34px] text-white font-normal mb-8 tracking-tight">
              utility
            </h5>
            <div className="space-y-4 sm:space-y-5 text-[16px] sm:text-[17px] font-normal tracking-[0.02em]">
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('styleguide'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'styleguide' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Style Guide
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('404'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === '404' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  404
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('login'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'login' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Password
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('checkout'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'checkout' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Checkout
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('success'))}
                  className={`hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer transition-colors block text-left ${
                    currentView === 'success' ? 'text-[#eed18d]' : 'text-white/85 hover:text-white'
                  }`}
                >
                  Order Confirmation
                </button>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => handleLink(() => onNavigate('checkout'))}
                  className="hover:underline underline-offset-6 decoration-[#eed18d] cursor-pointer text-white/85 hover:text-white transition-colors block text-left"
                >
                  Checkout (PayPal)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
