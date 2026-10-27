import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Wishlist = ({ onSelectProduct, onNavigate }) => {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product) => {
    addToCart(product, {
      metal: product.metal || 'Yellow Gold',
      karat: product.karat || '18K',
      size: product.availableSizes?.[0] || 'Standard',
      quantity: 1
    });
    toggleWishlist(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="luxury-container py-24 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#16161d] border border-[#d4af37]/30 flex items-center justify-center mx-auto text-[#d4af37]">
          <Heart size={28} />
        </div>
        <h2 className="font-serif text-3xl text-white">Your Wishlist is Empty</h2>
        <p className="text-xs text-white/50 leading-relaxed">
          Curate your personal collection of solitaires, royal jadau, and solid gold heirlooms.
        </p>
        <button
          onClick={() => onNavigate('shop')}
          className="btn-gold text-xs px-6 py-3"
        >
          Discover Fine Jewels <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="luxury-container py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
            Personal Curations
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-white mt-1">
            My Desired Jewels ({wishlist.length})
          </h1>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs text-white/40 hover:text-red-400 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
        >
          <Trash2 size={14} /> Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div
            key={product.id}
            className="bg-[#121218] border border-white/10 rounded-xs overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/40 transition-colors"
          >
            <div
              onClick={() => onSelectProduct(product)}
              className="cursor-pointer relative aspect-square overflow-hidden"
            >
              <img
                src={product.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop'}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className="absolute top-3 right-3 p-2 bg-black/60 rounded-full text-[#d4af37] hover:scale-110 transition-transform"
                title="Remove"
              >
                <Heart size={16} fill="currentColor" />
              </button>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#d4af37] uppercase tracking-wider block mb-1">
                  {product.category}
                </span>
                <h3
                  onClick={() => onSelectProduct(product)}
                  className="font-serif text-base text-white hover:text-[#d4af37] cursor-pointer line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-sm font-serif text-white font-medium mt-2">
                  $ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4">
                <button
                  onClick={() => handleMoveToBag(product)}
                  className="w-full btn-gold text-[11px] py-2.5 flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} /> Move to Bag
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
