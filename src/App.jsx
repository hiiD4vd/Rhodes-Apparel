import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, .hover-target');
      if (target) {
        setHovered(true);
        if (target.dataset.cursor) {
          setText(target.dataset.cursor);
        } else {
          setText('');
        }
      } else {
        setHovered(false);
        setText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouchDevice) return null;

  return (
    <div 
      className={`cursor ${hovered ? 'hovered' : ''} ${text ? 'has-text' : ''}`} 
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      {text && <span className="cursor-text">{text}</span>}
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Cursor />
        <Navbar />
        <CartDrawer />
        <AnimatedRoutes />
      </Router>
    </CartProvider>
  );
}

export default App;
