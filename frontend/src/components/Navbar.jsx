import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { MegaMenu } from './MegaMenu';

export const Navbar = ({ currentView, onNavigate, onOpenShowroomModal, onSelectCategory, onSelectProduct }) => {
  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAdmin } = useAuth();

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isHome = currentView === 'home';

  return (
    <header
      className={`w-full transition-all duration-300 z-50 ${
        isHome
          ? isScrolled
            ? 'fixed top-0 left-0 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
            : 'fixed top-0 left-0 bg-transparent border-b border-transparent py-5 sm:py-6'
          : 'sticky top-0 bg-[#0a0a0c]/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
        {/* Left: JaiShree Jwellers Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center gap-2.5 sm:gap-3 select-none group"
        >
          {/* Diamond Monogram Icon */}
          <div className="w-[30px] sm:w-[34px] h-[30px] text-[#eed18d] group-hover:scale-105 transition-transform flex items-center justify-center">
            <svg
              viewBox="0 0 36 32"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full block"
            >
              <path d="M5.68516 4.00196C5.78253 4.0015 5.78253 4.0015 5.88187 4.00103C6.01877 4.00082 6.15568 4.0014 6.29258 4.00274C6.50126 4.00444 6.70972 4.00275 6.91839 4.00071C7.05178 4.00092 7.18518 4.00133 7.31857 4.00196C7.38051 4.00131 7.44246 4.00067 7.50628 4C8.24257 4.0126 8.63881 4.49949 9.12963 5.00011C9.19074 5.06187 9.25185 5.12363 9.31481 5.18726C9.44366 5.31766 9.57233 5.44824 9.70081 5.57901C9.89596 5.77758 10.0917 5.97551 10.2876 6.17334C10.4132 6.30061 10.5388 6.42793 10.6643 6.55528C10.7511 6.64304 10.7511 6.64304 10.8396 6.73257C10.8949 6.78898 10.9503 6.84538 11.0073 6.90349C11.0551 6.95212 11.103 7.00074 11.1523 7.05084C11.3011 7.21047 11.4434 7.37328 11.5854 7.5391C11.853 7.84959 12.1336 8.14281 12.423 8.43257C12.4745 8.48453 12.5261 8.5365 12.5792 8.59004C12.6901 8.70169 12.801 8.81326 12.912 8.92474C13.0882 9.10166 13.2641 9.27883 13.4399 9.45607C13.8133 9.83228 14.1869 10.2082 14.5607 10.584C14.9941 11.0199 15.4273 11.4559 15.8603 11.8923C16.0327 12.066 16.2054 12.2394 16.3781 12.4128C16.4849 12.5204 16.5916 12.6279 16.6983 12.7355C16.7457 12.7829 16.793 12.8303 16.8418 12.8791C17.1278 13.1679 17.3958 13.4678 17.6603 13.7766C17.8786 14.0257 18.1109 14.2596 18.3447 14.4937C18.3963 14.5457 18.4478 14.5977 18.5009 14.6512C18.6118 14.7629 18.7227 14.8744 18.8337 14.9859C19.0099 15.1628 19.1858 15.34 19.3617 15.5172C19.735 15.8935 20.1087 16.2693 20.4824 16.6452C20.9158 17.0811 21.3491 17.5171 21.782 17.9535C21.9545 18.1271 22.1271 18.3006 22.2999 18.474C22.4066 18.5815 22.5133 18.6891 22.6201 18.7966C22.6674 18.844 22.7148 18.8915 22.7635 18.9403C23.0541 19.2338 23.3285 19.5375 23.5964 19.8522C23.7726 20.0561 23.9586 20.2466 24.148 20.4381C24.1854 20.4759 24.2228 20.5138 24.2613 20.5528C24.339 20.6314 24.4168 20.7098 24.4947 20.7882C24.6142 20.9084 24.7333 21.0291 24.8523 21.1498C24.9284 21.2266 25.0045 21.3034 25.0807 21.3802C25.1491 21.4492 25.2175 21.5182 25.288 21.5893C25.4436 21.7523 25.4436 21.7523 25.6145 21.8291C25.6338 21.7834 25.653 21.7378 25.6728 21.6908C25.7902 21.4778 25.9288 21.3395 26.1031 21.1711C26.3848 20.8934 26.6469 20.6074 26.9031 20.3057C27.077 20.1072 27.2634 19.9234 27.4506 19.7378C27.5936 19.5908 27.7269 19.4383 27.8598 19.282C28.0998 19.0006 28.3551 18.7403 28.617 18.4798C28.8181 18.2735 29.0034 18.0556 29.1901 17.8362C29.365 17.637 29.552 17.4523 29.74 17.2658C29.8847 17.117 30.0198 16.9627 30.1545 16.8047C30.3318 16.5968 30.5134 16.3988 30.7072 16.2066C30.8994 16.0159 31.0794 15.8197 31.255 15.6134C31.4949 15.332 31.7502 15.0717 32.0121 14.8112C32.2132 14.6049 32.3985 14.387 32.5852 14.1676C32.7174 14.017 32.8548 13.8753 32.9969 13.7342C33.1967 13.5347 33.3906 13.3315 33.5792 13.1211C33.6246 13.0707 33.67 13.0202 33.7168 12.9682C33.8421 12.7947 33.8992 12.714 33.9049 12.4981C33.8093 12.3077 33.711 12.1412 33.5941 11.9647C33.5422 11.8837 33.5422 11.8837 33.4892 11.8011C33.4104 11.6781 33.3311 11.5553 33.2515 11.4327C33.0436 11.1109 32.8395 10.7867 32.6348 10.4627C32.4751 10.21 32.3149 9.95754 32.1546 9.70518C31.7748 9.10681 31.3973 8.50689 31.0203 7.9067C30.9743 7.83361 30.9284 7.76051 30.881 7.6852C30.7878 7.53695 30.6947 7.38866 30.6016 7.24034C30.3427 6.82878 30.0794 6.42167 29.8046 6.02073C29.7203 5.87863 29.7203 5.87863 29.7203 5.71912C29.6584 5.71942 29.5965 5.71971 29.5327 5.72001C28.027 5.72706 26.5212 5.73234 25.0155 5.73565C24.2873 5.7373 23.5592 5.73954 22.831 5.74319C22.1964 5.74637 21.5617 5.74843 20.9271 5.74914C20.591 5.74955 20.255 5.75053 19.9189 5.75285C19.6026 5.75502 19.2863 5.75569 18.97 5.75521C18.8539 5.75529 18.7378 5.75593 18.6217 5.75715C18.4632 5.75874 18.3046 5.75817 18.146 5.75749C18.0573 5.75778 17.9686 5.75807 17.8772 5.75838C17.586 5.71019 17.455 5.6055 17.2452 5.40011C17.1177 5.14263 17.1192 4.88093 17.1662 4.60259C17.3033 4.36133 17.4691 4.1705 17.7189 4.04433C17.8841 4.0363 18.0495 4.03355 18.2148 4.03312C18.2663 4.03289 18.3177 4.03265 18.3707 4.03241C18.5439 4.03171 18.7171 4.03159 18.8902 4.03147C19.0141 4.03111 19.1379 4.0307 19.2618 4.03027C19.5988 4.02923 19.9358 4.02871 20.2729 4.02836C20.4834 4.02813 20.6938 4.0278 20.9043 4.02744C21.5626 4.02635 22.2209 4.02558 22.8792 4.02527C23.6396 4.02492 24.3999 4.02352 25.1603 4.02121C25.7477 4.01948 26.3351 4.01868 26.9225 4.01857C27.2735 4.01849 27.6244 4.01801 27.9754 4.01659C28.3056 4.01528 28.6358 4.0151 28.966 4.0158C29.0871 4.01587 29.2083 4.01552 29.3295 4.01473C29.495 4.01372 29.6604 4.01418 29.8259 4.01502C29.9648 4.01484 29.9648 4.01484 30.1065 4.01466C30.4531 4.05655 30.6613 4.18183 30.8855 4.44899C30.9269 4.51191 30.9683 4.57483 31.011 4.63966C31.0581 4.71069 31.1053 4.78172 31.1538 4.85489C31.2019 4.92954 31.2499 5.00419 31.2994 5.08111C31.3463 5.1536 31.3932 5.22609 31.4415 5.30077C31.5911 5.53415 31.7391 5.76854 31.8866 6.00324C31.998 6.17968 32.1093 6.35611 32.2206 6.53253C32.2777 6.62313 32.3348 6.71372 32.3919 6.80431C32.6119 7.15318 32.833 7.50134 33.054 7.84956C33.511 8.56961 33.967 9.29022 34.4155 10.0157C34.6358 10.3702 34.8627 10.7192 35.0951 11.0656C35.1498 11.1479 35.2045 11.2302 35.2609 11.315C35.3679 11.4755 35.4758 11.6352 35.5849 11.7942C36.0408 12.4809 36.0408 12.4809 35.9578 12.9766C35.7477 13.4108 35.3907 13.7167 35.0517 14.0517C34.8324 14.2728 34.6309 14.5044 34.4296 14.742C34.2568 14.9398 34.0711 15.1224 33.8849 15.3072C33.7419 15.4542 33.6086 15.6067 33.4756 15.7629C33.2846 15.9869 33.087 16.1986 32.8785 16.4059C32.6716 16.6117 32.4756 16.8215 32.2863 17.044C32.0482 17.3239 31.7944 17.5823 31.5341 17.8412C31.3331 18.0474 31.1478 18.2654 30.961 18.4848C30.7861 18.684 30.5991 18.8687 30.4111 19.0552C30.2664 19.204 30.1313 19.3583 29.9966 19.5163C29.8193 19.7241 29.6377 19.9222 29.4439 20.1144C29.2517 20.3051 29.0717 20.5012 28.8962 20.7076C28.6618 20.9825 28.4143 21.2382 28.1559 21.4901C28.006 21.6459 27.8648 21.805 27.7238 21.969C27.4384 22.3009 27.1427 22.6216 26.8433 22.9406C26.732 23.0596 26.6208 23.1786 26.5096 23.2977C26.4531 23.358 26.3965 23.4184 26.3383 23.4806C26.0622 23.7755 25.7865 24.0708 25.5109 24.3662C25.4583 24.4226 25.4057 24.479 25.3515 24.537C25.0416 24.8697 24.7345 25.2047 24.4302 25.5426C24.1473 25.8561 23.8573 26.1589 23.5578 26.4562C23.4141 26.6036 23.2796 26.7549 23.1462 26.9117C22.8571 27.2478 22.5572 27.5722 22.254 27.8952C22.1421 28.0149 22.0302 28.1345 21.9184 28.2541C21.8628 28.3136 21.8072 28.373 21.75 28.4342C21.5091 28.6923 21.2695 28.9516 21.0301 29.2112C20.7457 29.5195 20.461 29.8275 20.1752 30.1345C20.072 30.2454 19.9687 30.3564 19.8655 30.4673C19.8159 30.5206 19.7662 30.5739 19.7151 30.6288C19.376 30.994 19.0434 31.3639 18.7167 31.7405C18.5141 31.9558 18.3515 31.9805 18.0653 32C17.7238 31.996 17.5583 31.933 17.3059 31.7009C17.1997 31.5891 17.0956 31.4752 16.9935 31.3595C16.9414 31.304 16.8894 31.2485 16.8357 31.1913C16.579 30.9153 16.3323 30.6309 16.0864 30.3451C15.8764 30.1013 15.6585 29.8704 15.4292 29.6448C15.1478 29.364 14.8841 29.076 14.6273 28.7725C14.3907 28.5052 14.1352 28.2574 13.8827 28.0055C13.6694 27.7873 13.4718 27.5593 13.2745 27.3264C13.1301 27.1619 12.9787 27.0077 12.8236 26.8535C12.62 26.6509 12.4271 26.4448 12.2413 26.2254C12.0249 25.9709 11.7966 25.7335 11.5603 25.4977C11.2772 25.2152 11.0117 24.9254 10.7532 24.6201C10.5378 24.3758 10.3054 24.1497 10.0749 23.9201C9.87049 23.7106 9.68207 23.4903 9.49264 23.2671C9.33288 23.0863 9.16505 22.9165 8.99423 22.7462C8.72521 22.4782 8.47513 22.201 8.22934 21.9113C8.06958 21.7305 7.90175 21.5607 7.73093 21.3905C7.51257 21.1729 7.30355 20.953 7.10422 20.7175C6.88956 20.4645 6.66285 20.229 6.42815 19.9948C6.14505 19.7123 5.87949 19.4225 5.62101 19.1172C5.4623 18.9372 5.29526 18.7684 5.12537 18.5991C4.90864 18.3831 4.70116 18.1651 4.50359 17.9312C4.24082 17.6213 3.95624 17.3361 3.66894 17.0498C3.40886 16.7893 3.1661 16.5193 2.92848 16.238C2.73554 16.0177 2.52707 15.8144 2.31965 15.6081C2.17065 15.4552 2.03132 15.2977 1.8931 15.1349C1.63509 14.8315 1.35754 14.5527 1.07578 14.2719C0.862866 14.0538 0.664147 13.8259 0.467569 13.5928C0.351046 13.4535 0.351046 13.4535 0.219597 13.3324C0.0527714 13.1523 0.0323787 12.9743 0 12.7345C0.0466766 12.2831 0.248636 11.971 0.476822 11.5859C0.5231 11.5056 0.569378 11.4253 0.617058 11.3425C0.76336 11.089 0.91121 10.8365 1.05912 10.584C1.14922 10.4283 1.23918 10.2726 1.32899 10.1167C1.46404 9.88241 1.59918 9.64817 1.73478 9.41419C2.06386 8.84627 2.38882 8.27606 2.71155 7.70445C2.79083 7.56411 2.87022 7.42384 2.94964 7.28358C3.19276 6.85407 3.43521 6.42422 3.67516 5.99288C3.78209 5.80094 3.88966 5.60938 3.99734 5.41787C4.07233 5.28394 4.14648 5.14952 4.2206 5.0151C4.26625 4.93408 4.3119 4.85305 4.35894 4.76957C4.39845 4.69859 4.43796 4.6276 4.47867 4.55446C4.81323 4.07545 5.12358 3.99612 5.68516 4.00196Z"/>
            </svg>
          </div>
          {/* Brand Wordmark */}
          <div className="flex flex-col">
            <span
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-[19px] sm:text-[22px] font-semibold tracking-[0.06em] text-white group-hover:text-[#eed18d] transition-colors leading-tight"
            >
              JaiShree
            </span>
            <span
              style={{ fontFamily: "'Montserrat', sans-serif" }}
              className="text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-[#eed18d] font-medium"
            >
              Jwellers
            </span>
          </div>
        </div>

        {/* Center/Right: Desktop Navigation Items - Generous Luxury Separation */}
        <nav
          style={{ fontFamily: "'Lora', serif" }}
          className="hidden md:flex items-center gap-12 md:gap-16 lg:gap-20 xl:gap-24 text-[16px] sm:text-[17px] tracking-[0.05em] text-white"
        >
          {/* 1. About Link */}
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: currentView === 'about' ? '#eed18d' : '#ffffff',
              boxShadow: 'none',
              fontFamily: "'Lora', serif",
            }}
            className="hover:text-[#eed18d] hover:underline underline-offset-8 decoration-[#eed18d] transition-colors py-1 px-1 cursor-pointer font-normal whitespace-nowrap"
          >
            About
          </button>

          {/* 2. Pages Dropdown */}
          <div
            className="relative py-2 -my-2"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color:
                  isMegaMenuOpen ||
                  ['blogs', 'team', 'licenses', 'styleguide', 'changelog', '404'].includes(currentView)
                    ? '#eed18d'
                    : '#ffffff',
                boxShadow: 'none',
                fontFamily: "'Lora', serif",
              }}
              className="flex items-center gap-2 hover:text-[#eed18d] hover:underline underline-offset-8 decoration-[#eed18d] py-1 px-1 transition-colors cursor-pointer group font-normal whitespace-nowrap"
            >
              <span>Pages</span>
              <span className="text-[13px] font-sans font-light leading-none transition-transform inline-block">
                {isMegaMenuOpen ? '×' : '+'}
              </span>
            </button>

            {/* Dropdown Menu - Left-aligned with Pages */}
            <MegaMenu
              isOpen={isMegaMenuOpen}
              onClose={() => setIsMegaMenuOpen(false)}
              currentView={currentView}
              onNavigate={handleNavClick}
              onSelectCategory={(cat) => {
                if (onSelectCategory) onSelectCategory(cat);
                handleNavClick('shop');
              }}
              onSelectProduct={onSelectProduct}
            />
          </div>

          {/* 3. Contact Link */}
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: currentView === 'contact' ? '#eed18d' : '#ffffff',
              boxShadow: 'none',
              fontFamily: "'Lora', serif",
            }}
            className="hover:text-[#eed18d] hover:underline underline-offset-8 decoration-[#eed18d] transition-colors py-1 px-1 cursor-pointer font-normal whitespace-nowrap"
          >
            Contact
          </button>

          {/* 4. Shop Link */}
          <button
            type="button"
            onClick={() => handleNavClick('shop')}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: currentView === 'shop' ? '#eed18d' : '#ffffff',
              boxShadow: 'none',
              fontFamily: "'Lora', serif",
            }}
            className="hover:text-[#eed18d] hover:underline underline-offset-8 decoration-[#eed18d] transition-colors py-1 px-1 cursor-pointer font-normal whitespace-nowrap"
          >
            Shop
          </button>

          {/* 5. Cart Link with count */}
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              boxShadow: 'none',
              fontFamily: "'Lora', serif",
            }}
            className="hover:text-[#eed18d] hover:underline underline-offset-8 decoration-[#eed18d] transition-colors py-1 px-1 cursor-pointer font-normal whitespace-nowrap"
          >
            Cart({cartCount})
          </button>
        </nav>

        {/* Mobile Hamburger & Cart */}
        <div className="flex md:hidden items-center gap-4">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="text-white hover:text-[#eed18d] text-sm font-serif"
          >
            Cart({cartCount})
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-1 hover:text-[#eed18d] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0d12]/98 backdrop-blur-2xl border-b border-white/10 px-8 py-6 space-y-3.5 shadow-2xl">
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'home' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('about')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'about' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('shop')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'shop' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Shop
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('blogs')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'blogs' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Jewelry Journal (Blog)
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('team')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'team' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Artisan Team
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'contact' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Contact
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('styleguide')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'styleguide' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Atelier Style Guide
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('changelog')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'changelog' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Changelog
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('licenses')}
            className={`block w-full text-left font-serif text-xl ${
              currentView === 'licenses' ? 'text-[#eed18d]' : 'text-white'
            } hover:text-[#eed18d] py-1.5 transition-colors`}
          >
            Licenses & Credits
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('wishlist')}
            className="block w-full text-left font-serif text-lg text-white/80 hover:text-[#eed18d] py-1.5 transition-colors"
          >
            Wishlist ({wishlistCount})
          </button>
          <button
            type="button"
            onClick={() => {
              if (onOpenShowroomModal) onOpenShowroomModal();
              setIsMobileMenuOpen(false);
            }}
            className="block w-full text-left text-xs uppercase tracking-widest text-[#eed18d] font-semibold py-2.5 transition-colors border-t border-white/10"
          >
            ✨ Book Private Showroom Viewing
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className="block w-full text-left text-xs uppercase tracking-widest text-[#eed18d] font-bold py-2.5 bg-[#eed18d]/10 px-3 border border-[#eed18d]/30"
            >
              👑 Admin Dashboard
            </button>
          )}
        </div>
      )}
    </header>
  );
};
