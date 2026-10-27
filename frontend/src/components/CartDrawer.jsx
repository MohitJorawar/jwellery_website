import React from 'react';
import { X, Trash2, Plus, Minus, ShieldCheck, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onNavigateCheckout, onContinueShopping }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotal,
    cartCount,
    shippingFee,
    freeShippingThreshold
  } = useCart();

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${isCartOpen ? 'active' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className={`drawer-content ${isCartOpen ? 'active' : ''}`}>
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e0e13]">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#d4af37]" />
            <h3 className="font-serif text-xl text-white tracking-wide">
              Your Jewelry Bag <span className="text-sm font-sans text-[#d4af37]">({cartCount})</span>
            </h3>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="px-6 py-3.5 bg-[#171720] border-b border-white/5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-white/80 flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#d4af37]" />
              {amountToFreeShipping > 0 ? (
                <>Add <strong className="text-[#d4af37]">$ {amountToFreeShipping.toLocaleString('en-US')} USD</strong> for Free Insured Express Delivery</>
              ) : (
                <span className="text-emerald-400 font-medium">✨ You qualify for Free Insured White-Glove Delivery!</span>
              )}
            </span>
            <span className="text-white/50 text-[11px]">{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-[#d4af37] to-[#f6e6b4] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#1c1c24] flex items-center justify-center mx-auto mb-4 border border-[#d4af37]/20">
                <ShoppingBag size={28} className="text-[#d4af37]/60" />
              </div>
              <p className="font-serif text-lg text-white mb-2">Your Bag is Empty</p>
              <p className="text-xs text-white/50 max-w-xs mx-auto mb-6">
                Discover our signature diamond solitaires, bridal jadau, and solid gold masterworks.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  if (onContinueShopping) onContinueShopping();
                }}
                className="btn-outline-gold text-xs px-6 py-2.5"
              >
                Browse Curated Jewels
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.cartItemId}
                className="flex gap-4 p-3.5 bg-[#14141a] border border-white/5 rounded-sm hover:border-[#d4af37]/30 transition-colors"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-20 h-24 object-cover rounded-xs border border-white/10 flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm text-white line-clamp-1">{item.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-white/40 hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1 text-[11px] text-white/60">
                      <span className="bg-white/5 px-2 py-0.5 rounded-xs">{item.selectedMetal}</span>
                      <span className="bg-white/5 px-2 py-0.5 rounded-xs">{item.selectedKarat}</span>
                      {item.selectedSize && (
                        <span className="bg-white/5 px-2 py-0.5 rounded-xs">Size: {item.selectedSize}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-white/15 rounded-xs">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="p-1 hover:bg-white/10 text-white/70 hover:text-white"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-2.5 text-xs font-semibold text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="p-1 hover:bg-white/10 text-white/70 hover:text-white"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-sm text-white font-medium">
                        $ {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-[#0e0e13]">
            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>$ {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Insured Doorstep Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 uppercase tracking-wider text-[11px] font-semibold">FREE</span>
                  ) : (
                    `$ ${shippingFee}.00 USD`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="text-white font-bold">$ {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onNavigateCheckout) onNavigateCheckout();
              }}
              className="w-full btn-gold py-3 text-xs flex items-center justify-center gap-2"
            >
              <span>PROCEED TO SECURE CHECKOUT</span>
              <ArrowRight size={15} />
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-[11px] text-white/50">
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-[#d4af37]" /> BIS 916 Guaranteed
              </span>
              <span>•</span>
              <span>100% Insured Transit</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
