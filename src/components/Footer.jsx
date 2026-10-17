import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-brand-cream border-t border-brand-border/20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-wider text-brand-cream uppercase block">
                JAN BALOCH
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase font-semibold text-brand-gold">
                SHOES STORE
              </span>
            </Link>
            <p className="text-xs text-brand-cream/70 leading-relaxed font-light">
              Pakistani artisanal footwear for men, boys, women, and girls. Handcrafted Balochi Chawat, traditional Peshawari chappals, embroidered bridal khussas, executive formal shoes, and modern sneakers.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-brand-gold hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Order ({DISPLAY_PHONE})</span>
              </a>
            </div>
          </div>

          {/* Men's Footwear */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-brand-gold mb-4">
              Men's Collections (50)
            </h4>
            <ul className="space-y-2 text-xs text-brand-cream/80">
              <li>
                <Link to="/shop?category=mens-chappal" className="hover:text-brand-gold transition-colors">
                  Peshawari & Kaptaan Chappals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=balochi-traditional" className="hover:text-brand-gold transition-colors font-medium text-brand-gold">
                  Balochi Chawat Traditional Footwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mens-shoes" className="hover:text-brand-gold transition-colors">
                  Executive Formal Oxfords & Derbies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mens-sandals" className="hover:text-brand-gold transition-colors">
                  Men's Handcrafted Leather Sandals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=mens-sneakers" className="hover:text-brand-gold transition-colors">
                  Modern Everyday Sneakers & Loafers
                </Link>
              </li>
            </ul>
          </div>

          {/* Women's Footwear */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-brand-gold mb-4">
              Women's Collections (50)
            </h4>
            <ul className="space-y-2 text-xs text-brand-cream/80">
              <li>
                <Link to="/shop?category=womens-khussa" className="hover:text-brand-gold transition-colors font-medium text-brand-gold">
                  Embroidered Tilla & Zari Khussas
                </Link>
              </li>
              <li>
                <Link to="/shop?category=festive-collection" className="hover:text-brand-gold transition-colors">
                  Bridal & Mehndi Wedding Footwear
                </Link>
              </li>
              <li>
                <Link to="/shop?category=womens-sandals" className="hover:text-brand-gold transition-colors">
                  Party Sandals & Ethnic Chappals
                </Link>
              </li>
              <li>
                <Link to="/shop?category=womens-shoes" className="hover:text-brand-gold transition-colors">
                  Formal Flats, Block Heels & Loafers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=womens-sneakers" className="hover:text-brand-gold transition-colors">
                  Active Women's Casual Sneakers
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-brand-gold mb-4">
              Direct Orders & Support
            </h4>
            <div className="space-y-3 text-xs text-brand-cream/80">
              <p className="font-light">
                All order confirmations, custom size verification, and shipping details are handled directly via WhatsApp with our master cordwainers.
              </p>
              <div className="pt-2 space-y-2">
                <div className="flex items-center space-x-2 text-white">
                  <Phone className="w-4 h-4 text-brand-gold" />
                  <span className="font-semibold">{DISPLAY_PHONE}</span>
                </div>
                <div className="flex items-center space-x-2 text-brand-cream/70 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>Cash on Delivery Across Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-cream/50">
          <p>© {currentYear} JAN BALOCH SHOES STORE. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center">
            Handcrafted with cultural heritage and pride in Pakistan.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
