import React from 'react';
import ProductCard from './ProductCard';

export const ProductGrid = ({ products = [], emptyMessage = "No footwear matches your selection." }) => {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-brand-surface rounded-lg border border-dashed border-brand-border px-4">
        <p className="text-base text-brand-muted font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
