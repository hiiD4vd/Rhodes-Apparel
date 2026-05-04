import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [zoomedImage, setZoomedImage] = useState(null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size first.');
      return;
    }
    setError('');
    // We can simulate adding multiple quantities by calling addToCart in a loop or updating the context to accept quantity
    // Let's assume addToCart just adds 1. To be accurate, we'd need to modify addToCart to accept quantity.
    // For now, we will just call it `quantity` times.
    for(let i=0; i<quantity; i++) {
      addToCart(product, selectedSize);
    }
  };

  if (!product) return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Product not found</div>;

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(255,255,255,0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
            }}
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
              style={{ position: 'absolute', top: '2rem', right: '2rem', cursor: 'pointer', background: 'none', border: 'none', color: 'var(--text-color)' }}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={zoomedImage} 
              alt="Zoomed product" 
              style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, padding: '150px 5vw 50px', display: 'flex', gap: '5vw', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 500px' }}>
          <Link to="/" className="hover-target" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--muted-text)' }}>
            <ArrowLeft size={16} /> Back to Collection
          </Link>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#f9f9f9', overflow: 'hidden' }}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} angle ${idx + 1}`} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }} 
                    onClick={() => setZoomedImage(img)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{ width: '100%', aspectRatio: '3/4', backgroundColor: '#f9f9f9', overflow: 'hidden' }}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }} 
                  onClick={() => setZoomedImage(product.image)}
                />
              </motion.div>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', position: 'sticky', top: '150px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              {product.category}
            </p>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '1rem', lineHeight: 1.1 }}>{product.name}</h1>
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>${product.price}</p>
            
            <p style={{ color: 'var(--muted-text)', lineHeight: 1.6, marginBottom: '3rem' }}>
              {product.description}
            </p>

            <div style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Size</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--muted-text)', textDecoration: 'underline', cursor: 'pointer' }}>Size Guide</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {['S', 'M', 'L', 'XL'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="hover-target"
                    style={{
                      width: '50px',
                      height: '50px',
                      border: `1px solid ${selectedSize === size ? 'var(--text-color)' : 'var(--border-color)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: selectedSize === size ? 'var(--bg-color)' : 'var(--text-color)',
                      backgroundColor: selectedSize === size ? 'var(--text-color)' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Quantity</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid var(--border-color)', width: 'fit-content', padding: '0.5rem 1rem' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="hover-target" style={{ fontSize: '1.2rem' }}>-</button>
                <span style={{ fontSize: '1rem', width: '20px', textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="hover-target" style={{ fontSize: '1.2rem' }}>+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-primary hover-target" style={{ width: '100%', padding: '1.5rem', marginTop: '1rem' }}>
              <span>Add to Cart</span>
            </button>
            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0 }} 
                  style={{ color: '#ff4444', fontSize: '0.85rem', marginTop: '1rem', textAlign: 'center' }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <div style={{ marginTop: '4rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Details</h4>
              <ul style={{ color: 'var(--muted-text)', fontSize: '0.9rem', lineHeight: 1.8, listStyleType: 'disc', paddingLeft: '1.2rem' }}>
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div style={{ padding: '5rem 5vw', borderTop: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '3rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>You May Also Like</h3>
          <div className="tabular-grid">
            {relatedProducts.map((relProduct, index) => (
              <motion.div 
                key={relProduct.id}
                className="tabular-item hover-target"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/product/${relProduct.id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%' }} onClick={() => window.scrollTo(0,0)}>
                  <div className="tabular-image-container">
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.8 }} className="product-image-wrap">
                      <img src={relProduct.image} alt={relProduct.name} className="product-image-primary" />
                      {relProduct.hoverImage && (
                        <img src={relProduct.hoverImage} alt="hover" className="product-image-hover" />
                      )}
                    </motion.div>
                  </div>
                  <div className="tabular-info">
                    <span className="tabular-title">{relProduct.name}</span>
                    <span className="tabular-price">${relProduct.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </motion.div>
  );
}
