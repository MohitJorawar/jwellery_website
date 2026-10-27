import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

export const Contact = ({ onOpenShowroomModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Jewelry Commission',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setFormData({ name: '', email: '', phone: '', subject: 'Bespoke Jewelry Commission', message: '' });
  };

  const showrooms = [
    {
      city: "Mumbai - Flagship Atelier",
      address: "14/B Jewelers Lane, Zaveri Bazaar, Mumbai 400002",
      phone: "+91 22 2345 6789 / +91 98200 12345",
      hours: "Mon - Sat: 11:00 AM - 08:00 PM"
    },
    {
      city: "Mumbai - Bandra Haute Salon",
      address: "Penthouse 7, Turner Road, Bandra West, Mumbai 400050",
      phone: "+91 22 4567 8901",
      hours: "By Private Appointment Only"
    },
    {
      city: "New Delhi - Defence Colony",
      address: "C-48 Defence Colony Main Ring Road, New Delhi 110024",
      phone: "+91 11 2468 1357",
      hours: "Mon - Sun: 11:30 AM - 08:30 PM"
    }
  ];

  return (
    <div className="luxury-container py-12 space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center justify-center gap-2">
          <Sparkles size={13} /> Private Concierge & Showrooms
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl text-white">
          We Are At Your Service
        </h1>
        <p className="text-xs sm:text-sm text-white/60 font-light">
          Whether you seek a bespoke bridal commission, diamond solitaire consultation, or heirloom restoration, our master gemologists welcome your inquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#121218] border border-white/10 p-8 rounded-xs space-y-6">
          <h3 className="font-serif text-2xl text-white">Send a Private Dispatch</h3>

          {sent ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-500/50 rounded-xs text-center space-y-2">
              <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
              <h4 className="font-serif text-lg text-white">Dispatch Entrusted to Our Concierge</h4>
              <p className="text-xs text-white/70">
                A senior jewelry advisor will reach out to you within two business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Radhika Kapoor"
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
                <label className="text-white/70 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="radhika@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1">Subject of Inquiry</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                >
                  <option>Bespoke Jewelry Commission</option>
                  <option>Bridal Trousseau Consultation</option>
                  <option>Diamond Solitaire Pricing & Sourcing</option>
                  <option>Existing Order Inquiries</option>
                  <option>Other VIP Inquiries</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 block mb-1">Your Message / Specific Requirements *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please describe your desired metal, carat weight, budget or occasion..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#181822] border border-white/15 text-white p-2.5 rounded-xs focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
                <button type="submit" className="w-full sm:w-auto btn-gold text-xs py-3 px-8 flex items-center justify-center gap-2">
                  <Send size={14} /> Send Inquiry
                </button>
                <button
                  type="button"
                  onClick={onOpenShowroomModal}
                  className="w-full sm:w-auto btn-outline-gold text-xs py-2.5 px-6"
                >
                  Book Showroom Appointment
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right: Showroom Directory & Fast Connect (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-white">Our Salons & Boutiques</h3>
            {showrooms.map((s, idx) => (
              <div key={idx} className="p-4 bg-[#14141c] border border-white/5 rounded-xs space-y-1.5 text-xs">
                <h4 className="font-serif text-sm text-[#d4af37] font-semibold">{s.city}</h4>
                <p className="text-white/80 flex items-start gap-1.5">
                  <MapPin size={13} className="text-[#d4af37] mt-0.5 flex-shrink-0" />
                  <span>{s.address}</span>
                </p>
                <p className="text-white/60 flex items-center gap-1.5">
                  <Phone size={13} className="text-[#d4af37]" />
                  <span>{s.phone}</span>
                </p>
                <p className="text-white/50 flex items-center gap-1.5 text-[11px]">
                  <Clock size={13} className="text-[#d4af37]" />
                  <span>{s.hours}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Instant WhatsApp Concierge Box */}
          <div className="p-6 bg-gradient-to-br from-[#1c1c28] to-[#121218] border border-[#d4af37]/40 rounded-xs text-center space-y-3">
            <MessageCircle size={28} className="text-[#d4af37] mx-auto" />
            <h4 className="font-serif text-lg text-white">Instant VIP Concierge</h4>
            <p className="text-xs text-white/60 max-w-xs mx-auto">
              Prefer instant communication? Connect directly with our lead jewelry curator over WhatsApp for live videos of gemstones.
            </p>
            <button
              onClick={() => window.open('https://wa.me/919820012345', '_blank')}
              className="btn-gold text-xs py-2.5 px-6"
            >
              Start WhatsApp Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
