import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({ email: '', card: '', cvc: '' });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address';
    if (name === 'card' && value && !/^\d{16}$/.test(value.replace(/\s/g, ''))) error = 'Card number must be 16 digits';
    if (name === 'cvc' && value && !/^\d{3,4}$/.test(value)) error = 'CVC must be 3 or 4 digits';
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value); // clear error on type
  };

  const handleBlur = (e) => validateField(e.target.name, e.target.value);

  const getInputStyle = (name) => ({
    ...inputStyle,
    borderColor: errors[name] ? '#e53e3e' : 'var(--border-color)',
    backgroundColor: errors[name] ? '#fff5f5' : 'transparent',
  });

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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} onBlur={handleBlur} style={getInputStyle('email')} />
                {errors.email && <span style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><AlertCircle size={14} />{errors.email}</span>}
              </div>
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
              
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input type="text" name="card" placeholder="Card Number" value={formData.card} onChange={handleChange} onBlur={handleBlur} style={getInputStyle('card')} />
                {errors.card && <span style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><AlertCircle size={14} />{errors.card}</span>}
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="text" placeholder="MM/YY" style={inputStyle} />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <input type="text" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} onBlur={handleBlur} style={getInputStyle('cvc')} />
                  {errors.cvc && <span style={{ color: '#e53e3e', fontSize: '0.8rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}><AlertCircle size={14} />{errors.cvc}</span>}
                </div>
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
