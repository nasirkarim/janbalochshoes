import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppDirectUrl, DISPLAY_PHONE } from '../utils/whatsapp';

/**
 * Floating WhatsApp contact button at the bottom-right corner
 */
export const FloatingWhatsApp = () => {
  const whatsappUrl = getWhatsAppDirectUrl(
    'Hello JAN BALOCH SHOES STORE! I am browsing your online store and would like some assistance with footwear styles and orders.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip on hover */}
      <div className="mr-3 hidden sm:block bg-brand-dark text-brand-cream text-xs px-3 py-1.5 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-brand-gold/30">
        Order on WhatsApp <span className="text-brand-gold font-semibold ml-1">{DISPLAY_PHONE}</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order or Chat with JAN BALOCH SHOES STORE on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Radar ping animation effect */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:opacity-0" />
        
        {/* Official-style WhatsApp SVG */}
        <svg
          className="w-8 h-8 fill-current relative z-10"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.99.578 3.847 1.578 5.419L2 22l4.673-1.523A9.99 9.99 0 0 0 12.031 22C17.567 22 22 17.505 22 12.031 22 6.495 17.567 2 12.031 2zm5.733 14.338c-.244.686-1.22 1.258-1.745 1.298-.488.037-1.114.183-3.6-0.846-3.176-1.314-5.212-4.52-5.372-4.733-.158-.213-1.292-1.722-1.292-3.284 0-1.562.818-2.33 1.107-2.648.289-.318.633-.398.843-.398.211 0 .422.002.607.012.196.01.458-.074.717.549.266.638.908 2.215.987 2.375.08.16.133.348.026.562-.107.214-.16.348-.319.535-.16.187-.336.417-.48.56-.16.16-.328.333-.141.653.187.32.83 1.369 1.78 2.215 1.222 1.088 2.253 1.424 2.573 1.584.32.16.507.133.694-.08.187-.213.801-.933 1.014-1.253.213-.32.427-.267.72-.16.293.107 1.867.88 2.187 1.04.32.16.533.24.613.373.08.134.08.773-.164 1.459z" />
        </svg>
      </a>
    </div>
  );
};

/**
 * Reusable WhatsApp CTA Button for product pages & carts
 */
export const WhatsAppOrderButton = ({
  url,
  onClick,
  text = 'Buy on WhatsApp',
  className = '',
  size = 'md',
  fullWidth = false,
}) => {
  const sizeClasses = {
    sm: 'py-2 px-3 text-xs',
    md: 'py-3 px-5 text-sm',
    lg: 'py-3.5 px-6 text-base font-semibold',
  };

  const content = (
    <>
      <svg
        className="w-5 h-5 fill-current shrink-0 mr-2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12.031 2C6.495 2 2 6.495 2 12.031c0 1.99.578 3.847 1.578 5.419L2 22l4.673-1.523A9.99 9.99 0 0 0 12.031 22C17.567 22 22 17.505 22 12.031 22 6.495 17.567 2 12.031 2zm5.733 14.338c-.244.686-1.22 1.258-1.745 1.298-.488.037-1.114.183-3.6-0.846-3.176-1.314-5.212-4.52-5.372-4.733-.158-.213-1.292-1.722-1.292-3.284 0-1.562.818-2.33 1.107-2.648.289-.318.633-.398.843-.398.211 0 .422.002.607.012.196.01.458-.074.717.549.266.638.908 2.215.987 2.375.08.16.133.348.026.562-.107.214-.16.348-.319.535-.16.187-.336.417-.48.56-.16.16-.328.333-.141.653.187.32.83 1.369 1.78 2.215 1.222 1.088 2.253 1.424 2.573 1.584.32.16.507.133.694-.08.187-.213.801-.933 1.014-1.253.213-.32.427-.267.72-.16.293.107 1.867.88 2.187 1.04.32.16.533.24.613.373.08.134.08.773-.164 1.459z" />
      </svg>
      <span>{text}</span>
    </>
  );

  const baseClasses = `inline-flex items-center justify-center rounded-md bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white shadow transition-all duration-200 uppercase tracking-wider font-medium ${sizeClasses[size] || sizeClasses.md} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

export default FloatingWhatsApp;
