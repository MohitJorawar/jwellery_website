import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, Sparkles } from 'lucide-react';

export const ShowroomModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Mumbai - Flagship Salon (Zaveri Bazaar)',
    date: '',
    time: '12:00 PM - 02:00 PM',
    collectionInterest: 'Bridal Couture & Solitaires'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#121218] border border-[#d4af37]/40 max-w-lg w-full rounded-xs shadow-2xl relative overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e0e13]">
          <div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#d4af37] flex items-center gap-1.5">
              <Sparkles size={12} /> VIP Salon Experience
            </span>
            <h3 className="font-serif text-xl text-white mt-1">Book a Private Showroom Consultation</h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto mb-4 text-[#d4af37]">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-serif text-2xl text-white mb-2">Salon Appointment Confirmed</h4>
              <p className="text-xs text-white/70 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. A dedicated JaiShree private jeweler has been assigned to prepare your private viewing salon for <strong>{formData.date || 'your selected date'}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Kapoor"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Select Salon City</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option>Mumbai - Flagship Salon (Zaveri Bazaar)</option>
                  <option>Mumbai - Bandra West Haute Suite</option>
                  <option>New Delhi - Defence Colony Salon</option>
                  <option>Bangalore - Lavelle Road Showroom</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 block mb-1">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 block mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                  >
                    <option>11:00 AM - 01:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                    <option>04:30 PM - 06:30 PM</option>
                    <option>07:00 PM - 08:30 PM (Private Evening)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Primary Jewelry Interest</label>
                <select
                  value={formData.collectionInterest}
                  onChange={(e) => setFormData({ ...formData, collectionInterest: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option>Bridal Couture & Royal Jadau Sets</option>
                  <option>Natural Diamond Solitaires & Rings</option>
                  <option>Daily Luxury Solid 22K/18K Gold</option>
                  <option>Custom Bespoke Commission</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full btn-gold py-3 text-xs tracking-widest mt-2 uppercase"
              >
                Confirm VIP Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
