import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GLYMORA_PRODUCTS, getProductBySlug, getRelatedProducts } from '../data/glymoraProducts';

export const ProductDetail = ({ product: incomingProduct, onSelectProduct, onNavigate, onBack }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  // If no product or incoming product needs hydration, lookup by slug
  const activeProduct = incomingProduct?.slug
    ? getProductBySlug(incomingProduct.slug)
    : incomingProduct?.id
    ? getProductBySlug(incomingProduct.id)
    : GLYMORA_PRODUCTS[3]; // Default to Golden Drop Earrings

  const relatedProducts = getRelatedProducts(activeProduct.slug);

  const handleAddToCart = () => {
    addToCart(activeProduct, { quantity });
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(activeProduct, { quantity });
    if (onNavigate) {
      onNavigate('checkout');
    }
  };

  const handleGoBack = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      window.history.back();
    } else if (onNavigate) {
      onNavigate('home');
    }
  };

  return (
    <div className="glymora-pdp-section">
      <div className="glymora-pdp-container">
        {/* Top Back & Breadcrumb Navigation Bar */}
        <div className="pdp-top-bar">
          <button
            type="button"
            onClick={handleGoBack}
            className="pdp-back-btn"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="pdp-crumbs">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              className="pdp-crumb-link"
            >
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('shop')}
              className="pdp-crumb-link"
            >
              Shop
            </button>
            <span>/</span>
            <span className="pdp-crumb-active">{activeProduct.name}</span>
          </div>
        </div>

        {/* ============================================= */}
        {/* MAIN PRODUCT ROW: IMAGE & INFO                */}
        {/* ============================================= */}
        <div className="pdp-main-layout">
          {/* Left: Product Image Showcase */}
          <div className="pdp-image-frame">
            <img
              src={activeProduct.image}
              alt={activeProduct.name}
              className="pdp-main-image"
              loading="eager"
            />
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="pdp-info-column">
            <div>
              <p className="pdp-category-tag">{activeProduct.category}</p>
              <h1 className="pdp-product-title">{activeProduct.name}</h1>
              <p className="pdp-description-text">{activeProduct.description}</p>
            </div>

            <div className="pdp-actions-box">
              <div className="pdp-cart-row">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="pdp-qty-input"
                  aria-label="Product quantity"
                />
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="pdp-add-cart-btn"
                >
                  {addedMessage ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="pdp-buy-now-btn"
                >
                  Buy now
                </button>
              </div>

              <h2 className="pdp-price-display">
                {activeProduct.formattedPrice || `$ ${activeProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`}
              </h2>
            </div>

            {/* Product Specifications Table */}
            <div className="pdp-specs-list">
              <div className="pdp-spec-row">
                <span className="pdp-spec-label">Category:</span>
                <span className="pdp-spec-val">{activeProduct.category}</span>
              </div>
              <div className="pdp-spec-row">
                <span className="pdp-spec-label">Gold Karats:</span>
                <span className="pdp-spec-val">{activeProduct.goldKarats || '32K'}</span>
              </div>
              <div className="pdp-spec-row">
                <span className="pdp-spec-label">Diamond Weight:</span>
                <span className="pdp-spec-val">{activeProduct.diamondWeight || '0.6h'}</span>
              </div>
              <div className="pdp-spec-row">
                <span className="pdp-spec-label">Product Number:</span>
                <span className="pdp-spec-val">{activeProduct.productNumber || '4672-9013-4827'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================= */}
        {/* EDITORIAL STORY / RICH-TEXT SECTION           */}
        {/* ============================================= */}
        <div className="pdp-story-section">
          <h3 className="pdp-story-title">
            {activeProduct.storyTitle || 'Radiance in Every Movement'}
          </h3>
          <p className="pdp-story-desc">
            {activeProduct.storyText || activeProduct.description}
          </p>
        </div>

        {/* ============================================= */}
        {/* MORE PRODUCTS SECTION                         */}
        {/* ============================================= */}
        <div className="pdp-more-products-wrap">
          <div className="pdp-more-products-header">
            <h2 className="pdp-more-products-title">More products</h2>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('shop')}
              className="glymora-button-shop"
            >
              <span className="glymora-btn-arrow-box">
                <ArrowRight size={14} className="glymora-btn-arrow" />
              </span>
              <span className="glymora-btn-label">View more</span>
            </button>
          </div>

          <div className="pdp-more-products-grid">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                onClick={() => {
                  if (onSelectProduct) {
                    onSelectProduct(relProduct);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="glymora-catalog-product-card"
                role="button"
                tabIndex={0}
              >
                <p className="glymora-product-card-category">{relProduct.category}</p>
                <div className="glymora-product-card-image-wrap">
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="glymora-product-card-image"
                    loading="lazy"
                  />
                </div>
                <div className="glymora-product-card-bottom">
                  <div className="glymora-product-card-info">
                    <h4 className="glymora-product-card-name">{relProduct.name}</h4>
                    <p className="glymora-product-card-price">{relProduct.formattedPrice}</p>
                  </div>
                  <div className="glymora-product-card-arrow-wrap">
                    <ArrowUpRight size={18} className="glymora-product-card-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
