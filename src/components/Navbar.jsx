import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.5rem 5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
        background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none'
      }}
    >
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <button onClick={() => setIsMobileMenuOpen(true)} className="hover-target mobile-menu-icon" style={{ alignItems: 'center' }}>
          <Menu size={20} />
        </button>
        <div style={{ display: 'flex', gap: '2rem' }} className="nav-links">
          <a href="#shop" onClick={(e) => handleNavClick(e, 'shop')} className="hover-target" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Shop</a>
          <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="hover-target" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>About</a>
        </div>
      </div>

      <Link to="/" style={{ 
        fontFamily: 'var(--font-serif)', 
        fontSize: '1.5rem', 
        letterSpacing: '0.05em',
        fontWeight: 500,
        position: 'absolute',
        left: '50%',
        transform: 'translateX(calc(-50% - 3px))' // Optical centering for the period
      }}>
        RHODES.
      </Link>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button onClick={() => alert("Login portal is under construction.")} className="hover-target" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Log In</button>
        <button onClick={toggleCart} className="hover-target" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <ShoppingBag size={20} />
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-10px',
            background: 'var(--text-color)',
            color: 'var(--bg-color)',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontWeight: 'bold'
          }}>{cartItems.length}</span>
        </button>
      </div>
    </motion.nav>

    {/* Fullscreen Mobile Menu */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundColor: 'var(--bg-color)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem 5vw'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '3rem' }}>
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>RHODES.</span>
            <button onClick={() => setIsMobileMenuOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
              <X size={28} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
            <a href="#shop" onClick={(e) => handleNavClick(e, 'shop')} style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>Shop</a>
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} style={{ fontSize: '2.5rem', textTransform: 'uppercase', fontFamily: 'var(--font-serif)' }}>About Us</a>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <button onClick={() => { setIsMobileMenuOpen(false); alert("Login portal is under construction."); }}>Log In</button>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <span>Instagram</span>
              <span>Twitter</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
