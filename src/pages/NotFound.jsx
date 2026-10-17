import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 bg-white">
      <div className="w-20 h-20 rounded-full bg-brand-cream text-brand-gold flex items-center justify-center mb-6">
        <Compass className="w-10 h-10 stroke-1" />
      </div>
      <span className="text-xs uppercase font-bold tracking-widest text-brand-gold mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-dark mb-4">
        Looking for a Lost Pair?
      </h1>
      <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto mb-8 font-light">
        The page you are looking for may have stepped away or no longer exists. Let's guide you back to our handcrafted footwear collection.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center px-7 py-3 bg-brand-dark text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-brand-gold hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/shop"
          className="inline-flex items-center px-7 py-3 bg-brand-surface text-brand-dark text-xs uppercase tracking-wider font-semibold rounded-sm border border-brand-border hover:border-brand-gold transition-colors"
        >
          <span>Explore Footwear</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
