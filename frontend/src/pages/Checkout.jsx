import React, { useState } from 'react';
import { ShieldCheck, Lock, ArrowLeft, Check, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Checkout = ({ onOrderSuccess, onNavigate }) => {
  const { cartItems, cartSubtotal, shippingFee, cartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('Prepaid (UPI / Card / NetBanking)');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'JAISHREE10' || promoCode.trim().toUpperCase() === 'GLYMORA') {
      const discountAmount = Math.round(cartSubtotal * 0.1);
      setDiscount(discountAmount);
      setPromoApplied(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid promotion code. Try JAISHREE10 for 10% VIP inaugural savings.');
    }
  };

  const finalPayable = Math.max(0, cartTotal - discount);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setErrorMessage('Your bag is currently empty.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const orderPayload = {
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          notes: formData.notes
        },
        items: cartItems,
        subtotal: cartSubtotal,
        shipping: shippingFee,
        discount,
        totalAmount: finalPayable,
        paymentMethod
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || 'Failed to place order.');
      }

      clearCart();
      onOrderSuccess(data.data);
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred while creating your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="luxury-container py-24 text-center">
        <h2 className="font-serif text-3xl text-white mb-3">Your Jewelry Bag is Empty</h2>
        <p className="text-xs text-white/50 mb-6">Explore our curated collections before checking out.</p>
        <button onClick={() => onNavigate('shop')} className="btn-gold text-xs">
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="luxury-container py-12">
      {/* Header Back Link */}
      <button
        onClick={() => onNavigate('shop')}
        className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white uppercase tracking-wider mb-8 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Customer Address & Payment Details (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#d4af37] flex items-center gap-1.5">
              <Sparkles size={12} /> Confidential Checkout
            </span>
            <h1 className="font-serif text-3xl text-white mt-1">Delivery Destination</h1>
            <p className="text-xs text-white/60 mt-1">All orders are shipped via armored, insured white-glove courier.</p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/60 border border-red-500/40 text-red-200 text-xs rounded-xs flex items-center gap-2">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmitOrder} className="space-y-4 text-xs">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-white/70 block mb-1">Full Recipient Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Kapoor"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="text-white/70 block mb-1">Mobile / WhatsApp for OTP *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="text-white/70 block mb-1">Email Address for Invoice & Certificate *</label>
              <input
                type="email"
                required
                placeholder="radhika@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-white/70 block mb-1">Street Address / Suite / Apartment *</label>
              <input
                type="text"
                required
                placeholder="Apartment 402, Palm Heights, Altamount Road"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-white/70 block mb-1">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Mumbai"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="text-white/70 block mb-1">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option>Maharashtra</option>
                  <option>Delhi NCR</option>
                  <option>Karnataka</option>
                  <option>Gujarat</option>
                  <option>Tamil Nadu</option>
                  <option>Rajasthan</option>
                  <option>West Bengal</option>
                  <option>Telangana</option>
                  <option>Other State / UT</option>
                </select>
              </div>
              <div>
                <label className="text-white/70 block mb-1">Postal Code (PIN) *</label>
                <input
                  type="text"
                  required
                  placeholder="400026"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full bg-[#14141c] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h3 className="font-serif text-lg text-white">Payment Method</h3>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3.5 rounded-xs border cursor-pointer transition-all ${
                  paymentMethod.includes('Prepaid')
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                    : 'border-white/10 bg-[#14141c] text-white/70'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod.includes('Prepaid')}
                    onChange={() => setPaymentMethod('Prepaid (UPI / Card / NetBanking)')}
                    className="accent-[#d4af37]"
                  />
                  <div>
                    <span className="font-medium text-white block">Prepaid (Instant 100% Insured Clearance)</span>
                    <span className="text-[11px] text-white/50">UPI (Google Pay / PhonePe / Paytm), Credit/Debit Card, NetBanking</span>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3.5 rounded-xs border cursor-pointer transition-all ${
                  paymentMethod.includes('Cash')
                    ? 'border-[#d4af37] bg-[#d4af37]/10 text-white'
                    : 'border-white/10 bg-[#14141c] text-white/70'
                }`}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod.includes('Cash')}
                    onChange={() => setPaymentMethod('Cash on Delivery (Insured Armored Courier)')}
                    className="accent-[#d4af37]"
                  />
                  <div>
                    <span className="font-medium text-white block">Cash on Delivery (Insured Armored Courier)</span>
                    <span className="text-[11px] text-white/50">Pay upon secure unboxing with verification OTP</span>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Order Summary Breakdown (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#121218] border border-white/10 rounded-xs space-y-6">
            <h3 className="font-serif text-xl text-white">Order Summary</h3>

            {/* Items Mini List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item.cartItemId} className="flex gap-3 text-xs py-2 border-b border-white/5">
                  <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-xs border border-white/10" />
                  <div className="flex-1">
                    <h5 className="font-serif text-white line-clamp-1">{item.name}</h5>
                    <p className="text-[11px] text-white/50 mt-0.5">
                      {item.selectedMetal} • {item.selectedKarat} • Size: {item.selectedSize}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-white/60">Qty: {item.quantity}</span>
                      <strong className="text-white font-medium">$ {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                placeholder="Promo Code (e.g. GLYMORA)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-[#181822] border border-white/15 text-white placeholder-white/30 text-xs py-2 px-3 rounded-xs uppercase focus:outline-none focus:border-[#d4af37]"
              />
              <button type="submit" className="btn-outline-gold text-[10px] py-2 px-4 whitespace-nowrap">
                Apply
              </button>
            </form>

            {promoApplied && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Check size={13} /> 10% Inaugural Privilege Savings Applied!
              </p>
            )}

            {/* Totals */}
            <div className="space-y-2 text-xs pt-4 border-t border-white/10">
              <div className="flex justify-between text-white/70">
                <span>Subtotal</span>
                <span>$ {cartSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Armored Insured Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-400">FREE</strong> : `$ ${shippingFee}.00 USD`}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>VIP Privilege Discount</span>
                  <span>- $ {discount.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
                </div>
              )}
              <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-white/10 font-bold">
                <span>Total Amount</span>
                <span className="text-white font-semibold">$ {finalPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              form="checkout-form"
              disabled={isSubmitting}
              className="w-full btn-gold py-3.5 text-xs tracking-widest flex items-center justify-center gap-2"
            >
              <Lock size={15} />
              <span>{isSubmitting ? 'Securing Transaction...' : `PLACE ORDER • $ ${finalPayable.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`}</span>
            </button>

            {/* Trust Assurance */}
            <div className="text-center pt-2">
              <span className="text-[11px] text-white/50 flex items-center justify-center gap-1.5">
                <ShieldCheck size={14} className="text-[#d4af37]" /> 256-Bit SSL Encrypted & BIS 916 Guaranteed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
