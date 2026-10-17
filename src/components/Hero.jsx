import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center bg-brand-dark overflow-hidden">
      {/* Background Lifestyle Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.08, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
          src="/images/banners/hero-craft-banner.jpg"
          alt="JAN BALOCH Handcrafted Pakistani Footwear Lifestyle"
          className="w-full h-full object-cover object-center"
        />
        {/* Multilayered Luxury Gradients for Perfect Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/80 to-brand-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-white w-full">
        <div className="max-w-2xl">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-brand-gold/30 text-brand-gold text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Authentic Pakistani Footwear Artisans</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-cream leading-[1.1] mb-6"
          >
            Step Into <br />
            <span className="italic font-normal text-brand-gold">Heritage & Stature.</span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg text-brand-cream/80 font-light leading-relaxed mb-10 max-w-xl"
          >
            Discover 100+ footwear styles designed for comfort, cultural pride, and everyday elegance. Hand-cut Balochi Chawat, iconic Peshawari chappals, embroidered bridal khussas, and modern sneakers.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              to="/shop?audience=men"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow-lg hover:shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Shop Men's Collection</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>

            <Link
              to="/shop?audience=women"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium text-xs uppercase tracking-widest rounded-sm backdrop-blur-md border border-white/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Shop Women's Collection</span>
            </Link>
          </motion.div>

          {/* Highlight badges at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-center sm:text-left"
          >
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-brand-gold">100+</p>
              <p className="text-[11px] uppercase tracking-wider text-brand-cream/70 mt-0.5">Authentic Styles</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-brand-gold">Balochi</p>
              <p className="text-[11px] uppercase tracking-wider text-brand-cream/70 mt-0.5">Chawat Collection</p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-brand-gold">+92 331</p>
              <p className="text-[11px] uppercase tracking-wider text-brand-cream/70 mt-0.5">WhatsApp Orders</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
