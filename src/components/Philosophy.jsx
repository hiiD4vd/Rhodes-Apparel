import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Philosophy() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" ref={containerRef} className="section-padding container">
      {/* Desktop Layout (Hidden on Mobile) */}
      <div className="philosophy-grid desktop-only">
        
        {/* Left Side - Images */}
        <div className="philosophy-img-container">
          <motion.div 
            style={{ y: y1, position: 'absolute', top: '10%', left: 0, width: '70%', aspectRatio: '3/4', overflow: 'hidden' }}
          >
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/viero%20boxy%20(2).jpg" 
              alt="Editorial" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
          
          <motion.div 
            style={{ y: y2, position: 'absolute', bottom: '10%', right: 0, width: '50%', aspectRatio: '4/5', overflow: 'hidden' }}
          >
            <motion.img 
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              src="/viero%20boxy%20grey%20(3).jpg" 
              alt="Detail" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        {/* Right Side - Text */}
        <div style={{ paddingRight: '5vw' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 1.1, marginBottom: '3rem' }}>
              Redefining <br/>
              <span style={{ fontStyle: 'italic', color: '#888' }}>Modern</span> <br/>
              Elegance.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{ color: 'var(--muted-text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '400px' }}>
              At Rhodes Apparel, we believe that true luxury lies in simplicity. Our garments are meticulously crafted from the finest materials, designed to transcend seasonal trends and become eternal staples in your wardrobe.
            </p>
            <p style={{ color: 'var(--muted-text)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '4rem', maxWidth: '400px' }}>
              Every stitch, every cut, and every silhouette is considered. We strip away the unnecessary, leaving only what is essential, beautiful, and lasting.
            </p>
            
            <a href="#" className="hover-target" style={{ 
              display: 'inline-block',
              fontSize: '0.85rem', 
              textTransform: 'uppercase', 
              letterSpacing: '0.15em',
              borderBottom: '1px solid var(--text-color)',
              paddingBottom: '0.5rem',
              transition: 'color 0.3s'
            }}>
              Discover Our Story
            </a>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout (Hidden on Desktop) */}
      <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingTop: '2rem' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem', lineHeight: 1.1, marginBottom: '1rem', padding: '0 5vw' }}
        >
          Redefining <br/>
          <span style={{ fontStyle: 'italic', color: '#888' }}>Modern</span> <br/>
          Elegance.
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ width: '100%', aspectRatio: '4/5', overflow: 'hidden' }}
        >
          <img src="/viero%20boxy%20(2).jpg" alt="Editorial" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ color: 'var(--muted-text)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '1rem', padding: '0 5vw' }}
        >
          At Rhodes Apparel, we believe that true luxury lies in simplicity. Our garments are meticulously crafted from the finest materials, designed to transcend seasonal trends and become eternal staples in your wardrobe.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ width: '85%', alignSelf: 'flex-end', aspectRatio: '3/4', overflow: 'hidden', marginTop: '1rem' }}
        >
          <img src="/viero%20boxy%20grey%20(3).jpg" alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ color: 'var(--muted-text)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: '1rem', marginBottom: '1rem', padding: '0 5vw' }}
        >
          Every stitch, every cut, and every silhouette is considered. We strip away the unnecessary, leaving only what is essential, beautiful, and lasting.
        </motion.p>

        <a href="#" style={{ 
          alignSelf: 'flex-start',
          fontSize: '0.8rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.15em',
          borderBottom: '1px solid var(--text-color)',
          paddingBottom: '0.4rem',
          marginTop: '1rem',
          marginLeft: '5vw'
        }}>
          Discover Our Story
        </a>
      </div>
    </section>
  );
}
