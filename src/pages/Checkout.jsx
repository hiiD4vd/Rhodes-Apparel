import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, padding: '150px 5vw 50px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Link to="/" className="hover-target" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', fontSize: '0.9rem', color: 'var(--muted-text)' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '3rem' }}>Checkout</h1>

        <div style={{ display: 'flex', gap: '5vw', flexWrap: 'wrap' }}>
          
          {/* Form Section */}
          <div style={{ flex: '1 1 600px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Shipping Information</h3>
            
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="First Name" style={inputStyle} />
                <input type="text" placeholder="Last Name" style={inputStyle} />
              </div>
              <input type="email" placeholder="Email Address" style={inputStyle} />
              <input type="text" placeholder="Street Address" style={inputStyle} />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="City" style={inputStyle} />
                <input type="text" placeholder="Postal Code" style={inputStyle} />
              </div>
              <select style={inputStyle}>
                <option value="US">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="ID">Indonesia</option>
                <option value="EU">Europe</option>
              </select>

              <h3 style={{ fontSize: '1.2rem', marginTop: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Payment</h3>
              <input type="text" placeholder="Card Number" style={inputStyle} />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="MM/YY" style={inputStyle} />
                <input type="text" placeholder="CVC" style={inputStyle} />
              </div>

              <button className="btn-primary hover-target" type="button" style={{ marginTop: '2rem', padding: '1.5rem' }}>
                <span>Complete Order</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ flex: '1 1 400px', backgroundColor: '#111', padding: '3rem' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>Order Summary</h3>
            
            {cartItems.length === 0 ? (
              <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem' }}>Your cart is empty.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                {cartItems.map((item, idx) => (
                  <div key={`${item.id}-${idx}`} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '80px', height: '100px', backgroundColor: '#222' }}>
                       <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{item.name}</h4>
                      <p style={{ color: 'var(--muted-text)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Size: {item.size} | Qty: {item.quantity}</p>
                      <p>${item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)', fontSize: '0.9rem' }}>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted-text)', fontSize: '0.9rem' }}>
                <span>Shipping</span>
                <span>{subtotal > 0 ? 'Free' : '$0'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <span>Total</span>
                <span>${subtotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  backgroundColor: 'transparent',
  border: '1px solid var(--border-color)',
  color: 'var(--text-color)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.3s ease'
};
