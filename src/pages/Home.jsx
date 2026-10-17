import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Clock, MessageCircle, Sparkles, Heart, Crown, Footprints } from 'lucide-react';
import toast from 'react-hot-toast';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { CategoryCard } from '../components/CategoryCard';
import { CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { DISPLAY_PHONE, WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Curated selections from the 100 products
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);
  const balochiProducts = PRODUCTS.filter(p => p.isBalochi || p.category === 'balochi-traditional').slice(0, 4);
  const peshawariProducts = PRODUCTS.filter(p => p.name.toLowerCase().includes('peshawari') || p.name.toLowerCase().includes('kaptaan') || p.name.toLowerCase().includes('zalmi')).slice(0, 4);
  const khussaProducts = PRODUCTS.filter(p => p.audience === 'women' && (p.name.toLowerCase().includes('khussa') || p.category === 'womens-khussa')).slice(0, 4);
  const newArrivalProducts = PRODUCTS.filter(p => p.isNewArrival).slice(0, 4);

  // Sample customer feedback
  const sampleReviews = [
    {
      id: 1,
      name: 'Sheraz Baloch',
      city: 'Quetta',
      rating: 5,
      comment: 'The Balochi Chawat footwear is crafted with remarkable authenticity and pride. Heavy-gauge leather with a comfortable footbed that looks majestic with traditional shalwar kameez.',
      product: 'Balochi Chawat Traditional Footwear',
    },
    {
      id: 2,
      name: 'Ayesha Siddiqui',
      city: 'Islamabad',
      rating: 5,
      comment: 'Ordered the Golden Royal Wedding Khussa for my sister’s reception. The dabka and tilla embroidery is stunning in real life, with extra soft heel padding so no blisters at all!',
      product: 'Golden Royal Wedding Khussa',
    },
    {
      id: 3,
      name: 'Farhan Zaidi',
      city: 'Karachi',
      rating: 5,
      comment: 'The Kaptaan Chappal and Norozi Peshawari cuts are unmatched. High arch support, durable tire sole, and placing the order over WhatsApp was effortless and quick.',
      product: 'Premium Kaptaan Chappal',
    },
  ];

  // Instagram gallery photography
  const lifestyleGallery = [
    {
      image: '/images/men/men-footwear-01.jpg',
      alt: 'Artisan Balochi and Peshawari leather craft'
    },
    {
      image: '/images/women/women-footwear-01.jpg',
      alt: 'Bridal embroidered women khussa'
    },
    {
      image: '/images/men/men-footwear-02.jpg',
      alt: 'Heritage Pakistani leather chappal'
    },
    {
      image: '/images/women/women-footwear-03.jpg',
      alt: 'Festive party footwear for women'
    },
    {
      image: '/images/men/men-footwear-18.jpg',
      alt: 'Executive formal shoe design'
    },
    {
      image: '/images/men/men-footwear-24.jpg',
      alt: 'Minimalist everyday casual sneaker'
    },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing! (Frontend Demo Preview)', {
      icon: '✨',
      style: {
        background: '#111111',
        color: '#F7F3EB',
        border: '1px solid #C8A45D',
      },
    });
    setNewsletterEmail('');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Men & Women Dual Portals */}
      <section className="py-12 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Men's Collection Portal */}
            <Link
              to="/shop?audience=men"
              className="group relative overflow-hidden rounded-sm aspect-[16/9] sm:aspect-[21/9] bg-brand-dark flex items-center p-8 sm:p-12 shadow-sm border border-brand-border"
            >
              <img
                src="/images/men/men-footwear-01.jpg"
                alt="Men's Pakistani Footwear Collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
              <div className="relative z-10 text-white max-w-sm">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                  50 Handcrafted Styles
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream mt-1 mb-2">
                  Shop Men's & Boys
                </h3>
                <p className="text-xs text-brand-cream/80 font-light mb-4">
                  Peshawari chappals, Balochi Chawat, executive Oxfords, and casual sneakers.
                </p>
                <div className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-gold group-hover:text-white transition-colors">
                  <span>Explore Men's Store</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </Link>

            {/* Women's Collection Portal */}
            <Link
              to="/shop?audience=women"
              className="group relative overflow-hidden rounded-sm aspect-[16/9] sm:aspect-[21/9] bg-brand-dark flex items-center p-8 sm:p-12 shadow-sm border border-brand-border"
            >
              <img
                src="/images/women/women-footwear-01.jpg"
                alt="Women's Pakistani Footwear Collection"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
              <div className="relative z-10 text-white max-w-sm">
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                  50 Handcrafted Styles
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream mt-1 mb-2">
                  Shop Women's & Girls
                </h3>
                <p className="text-xs text-brand-cream/80 font-light mb-4">
                  Embroidered wedding khussas, tilla flats, festive sandals, and daily chappals.
                </p>
                <div className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-brand-gold group-hover:text-white transition-colors">
                  <span>Explore Women's Store</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Special Balochi Chawat Collection Showcase */}
      <section className="py-20 bg-brand-surface border-b border-brand-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Banner */}
          <div className="bg-brand-dark text-white rounded-sm p-8 sm:p-14 mb-14 relative overflow-hidden border border-brand-gold/30 shadow-xl">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 hidden md:block">
              <img
                src="/images/banners/balochi-heritage-banner.jpg"
                alt="Balochi Traditional Leather Footwear"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-transparent" />

            <div className="relative z-10 max-w-xl">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/20 text-brand-gold text-[10px] font-bold uppercase tracking-widest mb-3">
                <Crown className="w-3.5 h-3.5" />
                <span>Balochi Traditional Collection</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-cream mb-4 leading-tight">
                Celebrate Balochi Heritage — <br />
                <span className="italic font-normal text-brand-gold">Tradition in Every Step.</span>
              </h2>
              <p className="text-xs sm:text-sm text-brand-cream/80 font-light leading-relaxed mb-8">
                Discover traditional-inspired footwear celebrating Pakistani culture, craftsmanship and timeless style. Hand-stitched thick leather soles, authentic Balochi Chawat cuts, and cultural embroidery.
              </p>
              <Link
                to="/shop?category=balochi-traditional"
                className="inline-flex items-center px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark text-xs uppercase tracking-widest font-bold rounded-sm transition-all shadow-md"
              >
                <span>Explore Balochi Collection</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Balochi Highlight Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {balochiProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Peshawari Chappal Collection */}
      <section className="py-20 border-b border-brand-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                Heritage Pakistani Craft
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">
                Peshawari & Kaptaan Chappals
              </h2>
            </div>
            <Link
              to="/shop?category=mens-chappal"
              className="mt-3 sm:mt-0 text-xs uppercase font-semibold tracking-wider text-brand-dark hover:text-brand-gold transition-colors inline-flex items-center"
            >
              <span>View All Men's Chappals</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {peshawariProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Handcrafted Khussa Collection */}
      <section className="py-20 border-b border-brand-border bg-brand-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                Royal Zardozi & Tilla
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">
                Pakistani Women's Khussa Collection
              </h2>
            </div>
            <Link
              to="/shop?category=womens-khussa"
              className="mt-3 sm:mt-0 text-xs uppercase font-semibold tracking-wider text-brand-dark hover:text-brand-gold transition-colors inline-flex items-center"
            >
              <span>View All Women's Khussas</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {khussaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category Tiles */}
      <section className="py-20 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
                Browse Footwear Categories
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">
                Explore Complete Footwear Lines
              </h2>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-wider font-semibold text-brand-dark hover:text-brand-gold transition-colors"
            >
              <span>View Complete 100+ Catalog</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.filter(c => c.slug !== 'all').slice(0, 6).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Footwear Grid (8 products) */}
      <section className="py-20 border-b border-brand-border bg-brand-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
              Masterpieces in Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">
              Featured Handcrafted Pairs
            </h2>
            <p className="text-xs sm:text-sm text-brand-muted mt-2 font-light">
              Selected by master cordwainers for supreme balance, supple full-grain leather, and timeless Pakistani distinction.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white font-semibold text-xs uppercase tracking-widest rounded-sm transition-all shadow"
            >
              <span>Explore All 100 Products</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Banner with WhatsApp Action */}
      <section className="relative py-24 bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1920&q=80"
            alt="Artisan shoe making"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-brand-gold">
              Everyday Distinction & Festive Poise
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-brand-cream mt-2 mb-4 leading-tight">
              Your Style. <br />
              Your Statement.
            </h2>
            <p className="text-sm text-brand-cream/80 font-light mb-8 leading-relaxed">
              Order directly through WhatsApp with custom size guidance, Cash on Delivery across Pakistan, and fast doorstep shipping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center px-7 py-3.5 bg-brand-gold hover:bg-brand-gold-hover text-brand-dark text-xs uppercase tracking-widest font-bold rounded-sm transition-all shadow-md"
              >
                <span>Explore Footwear</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold rounded-sm transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 mr-2 fill-current" />
                <span>WhatsApp ({DISPLAY_PHONE})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 border-b border-brand-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
              The Jan Baloch Standard
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">
              Why Customers Rely On Us
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-sm border border-brand-border bg-brand-surface/60">
              <div className="w-12 h-12 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">
                Authentic Craftsmanship
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Carefully patterned Balochi Chawat cuts, Peshawari soles, and zardozi embroidery inspired by regional traditions.
              </p>
            </div>

            <div className="p-6 rounded-sm border border-brand-border bg-brand-surface/60">
              <div className="w-12 h-12 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">
                Everyday Comfort
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Anatomically shaped insoles and double-cushioned footbeds engineered for all-day weddings and continuous stride.
              </p>
            </div>

            <div className="p-6 rounded-sm border border-brand-border bg-brand-surface/60">
              <div className="w-12 h-12 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-5">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">
                Easy WhatsApp Ordering
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Direct one-to-one communication with our shop manager at {DISPLAY_PHONE} for custom size verification.
              </p>
            </div>

            <div className="p-6 rounded-sm border border-brand-border bg-brand-surface/60">
              <div className="w-12 h-12 rounded bg-brand-gold/15 text-brand-gold flex items-center justify-center mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-brand-dark mb-2">
                Cash on Delivery
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                Reliable doorstep delivery nationwide with Cash on Delivery for complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 border-b border-brand-border bg-brand-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
              Customer Feedback
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark mt-1">
              Sample Customer Reviews
            </h2>
            <p className="text-[11px] text-brand-muted mt-1 uppercase tracking-wider">
              (Illustrative sample testimonials for store presentation)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-sm bg-white border border-brand-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 text-amber-500 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-brand-dark leading-relaxed font-light italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-border/60">
                  <p className="text-xs font-bold text-brand-dark">{rev.name}</p>
                  <p className="text-[11px] text-brand-muted">
                    {rev.city} • <span className="text-brand-gold">{rev.product}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram-Style Gallery */}
      <section className="py-16 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-gold">
              Visual Narrative
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mt-1">
              Pakistani Footwear in Everyday Life
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {lifestyleGallery.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-sm bg-brand-dark"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <span className="text-[10px] text-brand-cream font-medium uppercase tracking-wider">
                    {item.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-brand-surface">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-12 h-12 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-brand-dark mb-2">
            Join the Gentlemen & Ladies Circle
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md mx-auto mb-6 font-light">
            Receive updates on limited artisan drops, festive Eid releases, and bespoke Balochi collections.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 text-xs bg-white border border-brand-border rounded-sm focus:outline-none focus:border-brand-gold text-brand-dark placeholder:text-brand-muted/70"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-brand-muted/70 mt-3">
            Frontend demo subscription. No spam, ever.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
