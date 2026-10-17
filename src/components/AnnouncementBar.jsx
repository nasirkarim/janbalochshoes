import React, { useState } from 'react';
import { X, PhoneCall, Sparkles } from 'lucide-react';
import { DISPLAY_PHONE } from '../utils/whatsapp';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-brand-dark text-brand-cream border-b border-brand-gold/20 text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-brand-gold font-medium">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Handcrafted Footwear Artisans</span>
        </div>

        <div className="flex-1 text-center font-medium tracking-wide">
          <span className="text-white">Discover Your Perfect Pair</span>
          <span className="mx-2 text-brand-gold">•</span>
          <span className="text-brand-cream/80">Direct Orders via WhatsApp: </span>
          <a
            href={`https://wa.me/923315971035`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold font-semibold hover:underline inline-flex items-center ml-1"
          >
            <PhoneCall className="w-3 h-3 mr-1 inline" />
            {DISPLAY_PHONE}
          </a>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-brand-cream/60 hover:text-white p-1 ml-2 transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
