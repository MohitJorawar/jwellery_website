import React from 'react';
import { Heart, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onSelectProduct }) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop';
  const secondaryImage = product.images?.[1] || primaryImage;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, {
      metal: product.metal || 'Yellow Gold',
      karat: product.karat || '18K',
      size: product.availableSizes ? product.availableSizes[0] : 'Standard',
      quantity: 1
    });
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div 
      onClick={() => onSelectProduct && onSelectProduct(product)}
      className="group luxury-card relative rounded-xs overflow-hidden cursor-pointer flex flex-col justify-between"
    >
      {/* Visual Image Swap Area */}
      <div className="image-swap-wrapper relative overflow-hidden">
        <img 
          src={primaryImage} 
          alt={product.name} 
          className="img-primary w-full h-full object-cover" 
          loading="lazy"
        />
        <img 
          src={secondaryImage} 
          alt={`${product.name} alternate view`} 
          className="img-secondary w-full h-full object-cover" 
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#d4af37] text-black text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-xs shadow-md">
              Bestseller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-white/90 text-black text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-xs shadow-md">
              New
            </span>
          )}
          {product.karat && (
            <span className="bg-black/60 backdrop-blur-md text-[#d4af37] border border-[#d4af37]/30 text-[10px] tracking-wider font-medium px-2 py-0.5 rounded-xs">
              {product.karat} Gold
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md z-10 transition-all ${
            isWishlisted(product.id)
              ? 'bg-[#d4af37] text-black'
              : 'bg-black/40 text-white/80 hover:bg-[#d4af37] hover:text-black hover:scale-110'
          }`}
          title="Save to Wishlist"
        >
          <Heart size={16} fill={isWishlisted(product.id) ? 'currentColor' : 'none'} />
        </button>

        {/* Quick Add Bar (Slides up on card hover) */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <button
            onClick={handleQuickAdd}
            className="w-full bg-[#d4af37] hover:bg-[#f3e5ab] text-black text-xs font-semibold uppercase tracking-wider py-2.5 px-4 rounded-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
          >
            <ShoppingBag size={14} /> Quick Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#d4af37] mb-1.5 font-medium">
            <span>{product.category}</span>
            <div className="flex items-center gap-1 text-white/70">
              <Star size={11} className="fill-[#d4af37] text-[#d4af37]" />
              <span>{product.rating || '5.0'}</span>
            </div>
          </div>

          <h3 className="font-serif text-base text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-white/50 mt-1 line-clamp-1 font-light">
            {product.metal} • {product.diamondWeight || product.grossWeight || 'Handcrafted'}
          </p>
        </div>

        {/* Price & Hallmark */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base text-white font-medium">
              $ {product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
            </span>
          </div>
          <span className="text-[10px] text-white/50 tracking-wider uppercase">
            18k Solid Gold
          </span>
        </div>
      </div>
    </div>
  );
};
