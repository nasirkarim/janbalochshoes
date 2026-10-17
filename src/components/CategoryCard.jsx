import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="group relative overflow-hidden rounded-sm aspect-[4/5] sm:aspect-[3/4] block shadow-sm border border-brand-border bg-brand-dark"
    >
      {/* Background Image with Dark Vignette */}
      <img
        src={category.image}
        alt={category.name}
        onError={(e) => {
          e.target.src = '/images/men/men-footwear-01.jpg';
        }}
        className="w-full h-full object-cover object-center group-hover:scale-105 group-hover:opacity-90 transition-all duration-700 ease-out opacity-80"
      />
      
      {/* Gradient Overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-brand-gold mb-1">
          {category.itemCount} Designs
        </span>
        <h3 className="font-serif text-2xl font-bold tracking-tight text-brand-cream group-hover:text-white transition-colors">
          {category.name}
        </h3>
        <p className="text-xs text-brand-cream/80 line-clamp-2 mt-1.5 font-light">
          {category.description}
        </p>

        <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-gold group-hover:text-white transition-colors">
          <span>Explore Collection</span>
          <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-brand-gold group-hover:text-brand-dark flex items-center justify-center transition-all">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
