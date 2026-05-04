import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Philosophy from '../components/Philosophy';
import HowItWorks from '../components/HowItWorks';
import Products from '../components/Products';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: '100%' }}
    >
      <Hero />
      <Philosophy />
      <HowItWorks />
      <Marquee />
      <Products />
      <Footer />
    </motion.div>
  );
}
