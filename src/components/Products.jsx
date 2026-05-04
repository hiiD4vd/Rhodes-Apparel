import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [viewMode, setViewMode] = useState('ITEMS'); // 'ITEMS' or 'MODELS'
  const { addToCart } = useCart();
  
  const categories = ['ALL', 'OUTERWEAR', 'SHIRTS', 'BOTTOMS', 'TOPS', 'ACCESSORIES'];

  const filteredProducts = activeCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category.toUpperCase() === activeCategory);
  return (
    <section id="shop" className="container" style={{ padding: '0', borderTop: '1px solid var(--border-color)', marginTop: '8rem' }}>
      
      {/* Category Nav Header - Sticky & Exclusive */}
      <div className="filter-header" style={{ 
        position: 'sticky',
        top: '76px', // Fine-tuned to perfectly meet the Navbar
        zIndex: 40,
        backgroundColor: 'var(--bg-color)', // Fallback
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        borderTop: '1px solid var(--border-color)', // Added black line separator
        padding: '1.5rem 4vw',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        {/* Categories (Filter) */}
        <div className="filter-categories" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <span className="filter-label" style={{ color: 'var(--muted-text)', opacity: 0.6, fontSize: '0.7rem', letterSpacing: '0.1em', flexShrink: 0 }}>FILTER:</span>
          {categories.map(cat => (
            <span 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="hover-target"
              style={{ 
                cursor: 'pointer',
                color: activeCategory === cat ? 'var(--text-color)' : 'var(--muted-text)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                transition: 'all 0.3s',
                opacity: activeCategory === cat ? 1 : 0.6,
                borderBottom: activeCategory === cat ? '1px solid var(--text-color)' : '1px solid transparent',
                paddingBottom: '2px'
              }}
            >
              {cat === 'ALL' ? 'SHOP ALL' : cat}
            </span>
          ))}
        </div>
        
        {/* View Mode (Not a filter, distinctly separated) */}
        <div className="view-mode-toggle" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexShrink: 0 }}>
          <span className="view-label" style={{ color: 'var(--muted-text)', opacity: 0.6, fontSize: '0.7rem', letterSpacing: '0.1em' }}>VIEW:</span>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <span 
              onClick={() => setViewMode('MODELS')}
              className="hover-target"
              style={{ 
                cursor: 'pointer', 
                color: viewMode === 'MODELS' ? 'var(--text-color)' : 'var(--muted-text)',
                opacity: viewMode === 'MODELS' ? 1 : 0.5,
                transition: 'all 0.3s'
              }}
            >
              MODELS
            </span>
            <span style={{ color: 'var(--muted-text)', opacity: 0.3 }}>/</span>
            <span 
              onClick={() => setViewMode('ITEMS')}
              className="hover-target"
              style={{ 
                cursor: 'pointer', 
                color: viewMode === 'ITEMS' ? 'var(--text-color)' : 'var(--muted-text)',
                opacity: viewMode === 'ITEMS' ? 1 : 0.5,
                transition: 'all 0.3s'
              }}
            >
              ITEMS
            </span>
          </div>
        </div>
      </div>

      {/* The Tabular Grid */}
      <div className="tabular-grid">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, index) => (
            <motion.div 
              layout
              key={product.id}
              className="tabular-item hover-target"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <button 
                className="wishlist-icon hover-target" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product, 'M'); 
                }}
                style={{ backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              >
                <ShoppingBag size={18} strokeWidth={1.5} color="var(--text-color)" />
              </button>
              
              <Link to={`/product/${product.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className="tabular-image-container">

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="product-image-wrap"
                  >
                    <img 
                      src={viewMode === 'ITEMS' ? product.image : (product.hoverImage || product.image)} 
                      alt={product.name} 
                      className="product-image-primary" 
                    />
                    <img 
                      src={viewMode === 'ITEMS' ? (product.hoverImage || product.image) : product.image} 
                      alt={`${product.name} alternate`} 
                      className="product-image-hover" 
                    />
                  </motion.div>
                </div>
                
                <div className="tabular-info">
                  <span className="tabular-title">{product.name}</span>
                  <span className="tabular-price">${product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        .filter-categories {
          white-space: nowrap;
        }
        
        .filter-categories span {
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .filter-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1rem !important;
            padding: 1rem 4vw 1rem 4vw !important;
          }
          
          .filter-categories {
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 0.5rem;
            gap: 1.5rem !important;
          }
          
          /* Hide scrollbar for cleaner look on mobile */
          .filter-categories::-webkit-scrollbar {
            display: none;
          }
          .filter-categories {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .view-mode-toggle {
            width: 100%;
            justify-content: space-between;
            border-top: 1px solid var(--border-color);
            padding-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
