import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '150px 5vw 50px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(6rem, 20vw, 15rem)', lineHeight: 0.8, marginBottom: '2rem', color: 'var(--text-color)' }}>404</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--muted-text)', marginBottom: '3rem', maxWidth: '400px', lineHeight: 1.6 }}>
          We couldn't find the page you're looking for. It might have been removed, renamed, or did not exist in the first place.
        </p>
        <Link to="/" className="btn-primary hover-target" style={{ textDecoration: 'none' }}>
          <span>Return Home</span>
        </Link>
      </div>
      <Footer />
    </motion.div>
  );
}
