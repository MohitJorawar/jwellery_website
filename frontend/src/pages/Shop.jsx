import React, { useState, useEffect } from 'react';
import { Filter, SlidersHorizontal, Search, RotateCcw, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { GLYMORA_PRODUCTS } from '../data/glymoraProducts';

export const Shop = ({ initialCategory = 'All', initialSearch = '', onSelectProduct }) => {
  const [products, setProducts] = useState(GLYMORA_PRODUCTS);
  const [loading, setLoading] = useState(false);
  
  // Filter States
  const [category, setCategory] = useState(initialCategory);
  const [metal, setMetal] = useState('All');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState(initialSearch);
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch) setSearch(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    fetchProducts();
  }, [category, metal, sort]);

  const fetchProducts = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (metal && metal !== 'All') params.append('metal', metal);
    if (sort) params.append('sort', sort);
    if (search) params.append('search', search);

    fetch(`/api/products?${params.toString()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data && data.data.length > 0) {
          setProducts(data.data);
        } else {
          setProducts(GLYMORA_PRODUCTS);
        }
      })
      .catch(() => setProducts(GLYMORA_PRODUCTS))
      .finally(() => setLoading(false));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleResetFilters = () => {
    setCategory('All');
    setMetal('All');
    setSort('newest');
    setSearch('');
    setMaxPrice(10000);
  };

  // Filter client-side by price slider
  const displayedProducts = products.filter(p => p.price <= maxPrice);

  const categories = ['All', 'Ring', 'Earings', 'Bracelet'];
  const metals = ['All', 'Yellow Gold', 'Rose Gold', 'White Gold'];

  return (
    <div className="luxury-container py-12 space-y-10">
      {/* Shop Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles size={13} /> The JaiShree Jwellers Fine Jewelry Catalog
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-white">
          Timeless Adornments
        </h1>
        <p className="text-xs sm:text-sm text-white/60 font-light">
          Each masterpiece is cast in hallmarked 18K & 22K solid gold and set with certified natural diamonds.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-[#121218] border border-white/10 p-6 rounded-xs space-y-6">
        {/* Top Controls: Search & Category Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-xs uppercase tracking-wider py-2 px-4 rounded-xs transition-all ${
                  category.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#d4af37] text-black font-semibold shadow-md'
                    : 'bg-[#181822] text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative min-w-[260px]">
            <input
              type="text"
              placeholder="Search jewels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#181822] border border-white/10 text-white placeholder-white/40 text-xs py-2 px-3 pl-8 rounded-xs focus:outline-none focus:border-[#d4af37]"
            />
            <Search size={14} className="absolute left-2.5 top-2.5 text-white/40" />
          </form>
        </div>

        {/* Secondary Filters: Metal, Max Price, Sort */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            {/* Metal Select */}
            <div className="flex items-center gap-2">
              <span className="text-white/50 uppercase tracking-wider text-[10px]">Metal:</span>
              <select
                value={metal}
                onChange={(e) => setMetal(e.target.value)}
                className="bg-[#181822] border border-white/10 text-white text-xs py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#d4af37]"
              >
                {metals.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Price Range Slider */}
            <div className="flex items-center gap-3">
              <span className="text-white/50 uppercase tracking-wider text-[10px]">Max Price:</span>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-[#d4af37] cursor-pointer w-28"
              />
              <span className="text-white font-medium text-[11px]">
                $ {maxPrice.toLocaleString('en-US')} USD
              </span>
            </div>
          </div>

          {/* Sorting & Reset */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-white/50 uppercase tracking-wider text-[10px]">Sort:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-[#181822] border border-white/10 text-white text-xs py-1.5 px-3 rounded-xs focus:outline-none focus:border-[#d4af37]"
              >
                <option value="newest">Newest Additions</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Connoisseur Rating</option>
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="text-white/40 hover:text-[#d4af37] p-1.5 rounded-xs hover:bg-white/5 transition-colors"
              title="Reset Filters"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Count & Product Grid */}
      <div>
        <div className="flex justify-between items-center mb-6 text-xs text-white/60">
          <span>Displaying <strong>{displayedProducts.length}</strong> Fine Jewels</span>
          {category !== 'All' && (
            <span className="bg-[#d4af37]/10 text-[#d4af37] px-2.5 py-1 rounded-xs border border-[#d4af37]/30 text-[11px]">
              Filtering by: {category}
            </span>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
              <div key={n} className="h-96 bg-[#14141c] animate-pulse rounded-xs" />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-24 bg-[#121218] border border-white/10 rounded-xs">
            <h3 className="font-serif text-2xl text-white mb-2">No Matching Jewels Found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-6">
              Try adjusting your price range, metal filter, or search keywords.
            </p>
            <button
              onClick={handleResetFilters}
              className="btn-gold text-xs px-6 py-2.5"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
