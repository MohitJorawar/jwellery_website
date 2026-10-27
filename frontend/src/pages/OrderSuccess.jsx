import React, { useEffect } from 'react';
import { CheckCircle2, ShieldCheck, Package, MapPin, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccess = ({ order, onNavigate }) => {
  useEffect(() => {
    // Luxury Gold & Diamond Sparkle Confetti Burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f6e6b4', '#ffffff', '#aa8420']
      });
    } catch {
      // Graceful fallback if confetti fails
    }
  }, []);

  if (!order) {
    return (
      <div className="luxury-container py-24 text-center">
        <h2 className="font-serif text-3xl text-white mb-4">Order Received</h2>
        <button onClick={() => onNavigate('shop')} className="btn-gold text-xs">
          Explore Jewelry
        </button>
      </div>
    );
  }

  return (
    <div className="luxury-container py-16 max-w-3xl mx-auto space-y-8">
      {/* Success Badge Banner */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <CheckCircle2 size={40} />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
          Haute Joaillerie Commission Confirmed
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-white">
          Thank You, {order.customer?.name}
        </h1>
        <p className="text-xs sm:text-sm text-white/60 max-w-md mx-auto">
          Your fine jewelry order has been entrusted to our vault master. A wax-sealed certificate of authenticity is being drafted.
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-[#121218] border border-[#d4af37]/30 p-8 rounded-xs space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-3">
          <div>
            <span className="text-[10px] text-white/40 uppercase tracking-widest block">Reference Order Dossier</span>
            <strong className="font-serif text-xl text-[#d4af37] tracking-wider">{order.orderNumber}</strong>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-white/40 uppercase tracking-widest block">Estimated Armored Dispatch</span>
            <span className="text-xs text-white font-medium">3 - 5 Business Days via Secure Courier</span>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-white/80 font-medium">Reserved Pieces</h4>
          <div className="space-y-3">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-[#181822] rounded-xs border border-white/5">
                <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-xs border border-white/10" />
                <div className="flex-1 text-xs">
                  <h5 className="font-serif text-white text-sm">{item.name}</h5>
                  <p className="text-white/50 text-[11px] mt-0.5">
                    {item.selectedMetal} • {item.selectedKarat} • Size: {item.selectedSize}
                  </p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-white/60">Quantity: {item.quantity}</span>
                      <strong className="font-serif text-sm text-white">
                        $ {(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Address and Payment Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10 text-xs">
            <div>
              <h5 className="text-[11px] uppercase tracking-widest text-white/40 mb-2 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#d4af37]" /> Insured Destination
              </h5>
              <p className="text-white font-medium">{order.customer?.name}</p>
              <p className="text-white/60 mt-0.5">{order.customer?.address}</p>
              <p className="text-white/60">{order.customer?.city}, {order.customer?.state} - {order.customer?.postalCode}</p>
              <p className="text-white/60 mt-1">Contact: {order.customer?.phone}</p>
            </div>

            <div>
              <h5 className="text-[11px] uppercase tracking-widest text-white/40 mb-2 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#d4af37]" /> Payment & Authentication
              </h5>
              <p className="text-white font-medium">{order.paymentMethod}</p>
              <p className="text-white/60 mt-0.5">Status: <strong className="text-emerald-400 font-normal">{order.paymentStatus}</strong></p>
              <p className="text-white/60 mt-1">Total Paid: <strong className="font-serif text-white">$ {order.totalAmount?.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</strong></p>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
          <button
            onClick={() => onNavigate('shop')}
            className="flex-1 btn-gold text-xs py-3"
          >
            Explore More Jewels <ArrowRight size={15} />
          </button>
          <button
            onClick={() => window.print()}
            className="btn-outline-gold text-xs py-3 flex items-center justify-center gap-2"
          >
            <Printer size={15} /> Print Vault Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
