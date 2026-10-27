import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const handleClick = () => {
    const phoneNumber = "919820012345";
    const message = encodeURIComponent("Namaste Jaishree Jewellers, I would like to inquire about your fine diamond & gold collections.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#16161d] border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black p-3.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.7)] flex items-center gap-2 group transition-all duration-300 hover:scale-105"
      title="Chat with Private Concierge"
    >
      <MessageCircle size={22} className="group-hover:rotate-12 transition-transform" />
      <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider pr-1">
        Concierge
      </span>
    </button>
  );
};
