import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1000,
              cursor: 'pointer'
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '450px',
              height: '100vh',
              backgroundColor: 'var(--bg-color)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid var(--border-color)',
              color: 'var(--text-color)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={20} /> Cart ({cartItems.length})
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="hover-target"><X size={24} /></button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--muted-text)', marginTop: '4rem' }}>
                  Your cart is empty.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cartItems.map((item, i) => (
                    <div key={`${item.id}-${item.size}-${i}`} style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ width: '80px', height: '100px', backgroundColor: '#f9f9f9', border: '1px solid var(--border-color)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <div style={{ fontWeight: '600', textTransform: 'uppercase', fontSize: '0.85rem' }}>{item.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--muted-text)', marginTop: '0.2rem' }}>Size: {item.size} | Qty: {item.quantity}</div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ fontWeight: '600' }}>${item.price * item.quantity}</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem' }}>
                            <button onClick={() => updateQuantity(item.id, item.size, -1)} className="hover-target" style={{ fontSize: '1rem', lineHeight: 1 }}>-</button>
                            <span style={{ fontSize: '0.8rem' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, 1)} className="hover-target" style={{ fontSize: '1rem', lineHeight: 1 }}>+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.size)} style={{ fontSize: '0.75rem', textDecoration: 'underline', color: 'var(--muted-text)' }} className="hover-target">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '2rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: '600', textTransform: 'uppercase' }}>
                <span>Subtotal</span>
                <span>${total}</span>
              </div>
              <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                <button className="btn-primary hover-target" style={{ width: '100%', padding: '1rem', border: '1px solid var(--text-color)' }}>
                  <span>Checkout</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
