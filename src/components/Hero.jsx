import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const frameCount = 120;
  const currentFrame = useTransform(scrollYProgress, [0, 1], [1, frameCount]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0vh", "35vh"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    
    // Progressive Image Loading
    const images = new Array(frameCount).fill(null);
    let isComponentMounted = true;
    
    const loadImage = (index) => {
      if (images[index]) return;
      const img = new Image();
      const paddedIndex = (index + 1).toString().padStart(4, '0');
      img.src = `/sequence/frame_${paddedIndex}.jpg`;
      img.onload = () => {
        if (!isComponentMounted) return;
        images[index] = img;
        if (index === 0) render(1); // Render first frame immediately
        // If this image is the currently requested frame, render it
        if (index === Math.max(0, Math.floor(currentFrame.get()) - 1)) {
          render(currentFrame.get());
        }
      };
    };

    // 1. Load the first frame immediately for fast Time To Interactive
    loadImage(0);
    
    // 2. Load the rest asynchronously so we don't block the main thread
    setTimeout(() => {
      for (let i = 1; i < frameCount; i++) {
        // Stagger the loading slightly to prevent network bottlenecks
        setTimeout(() => {
          if (isComponentMounted) loadImage(i);
        }, i * 10);
      }
    }, 100);

    const render = (frameIndex) => {
      const index = Math.min(frameCount - 1, Math.max(0, Math.floor(frameIndex) - 1));
      const img = images[index];
      
      if (img && img.complete) {
        const isMobile = window.innerWidth <= 900;
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (isMobile) {
          // Object-fit: cover logic for mobile
          if (canvasRatio > imgRatio) {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
          } else {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
          }
        } else {
          // Object-fit: contain logic for desktop
          if (canvasRatio > imgRatio) {
            drawWidth = canvas.height * imgRatio;
            offsetX = (canvas.width - drawWidth) / 2;
          } else {
            drawHeight = canvas.width / imgRatio;
            offsetY = (canvas.height - drawHeight) / 2;
          }
        }

        // Fill background with white
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    const handleResize = () => {
      // Find the parent container size instead of window size
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        render(currentFrame.get());
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup

    const unsubscribe = currentFrame.on('change', (latest) => {
      requestAnimationFrame(() => render(latest));
    });

    return () => {
      isComponentMounted = false;
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [currentFrame]);

  return (
    <section ref={containerRef} style={{
      height: '300vh', // Long scroll for the sequence
      width: '100%',
      position: 'relative',
      backgroundColor: 'var(--bg-color)',
    }}>
      <div className="hero-layout" style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        zIndex: 1,
        display: 'flex',
        backgroundColor: 'var(--bg-color)'
      }}>
        {/* Typography Left Side (Desktop) / Overlay (Mobile) */}
        <motion.div className="hero-text-container" style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '5vw',
          zIndex: 5,
          y: textY,
          color: 'white',
          mixBlendMode: 'difference'
        }}>
          <h1 className="hero-title-text" style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            lineHeight: 0.85,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                style={{ display: 'block' }}
              >
                RHODES
              </motion.span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.span 
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                style={{ display: 'block', fontStyle: 'italic', paddingLeft: '5vw' }}
              >
                APPAREL
              </motion.span>
            </div>
          </h1>
        </motion.div>

        {/* Scroll Indicator (Bottom Center) */}
        <div className="scroll-indicator" style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          fontWeight: '600',
          letterSpacing: '0.1em',
          color: 'var(--text-color)',
          textTransform: 'uppercase',
          opacity: 0.8
        }}>
          <span>Scroll</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: '1px', height: '30px', backgroundColor: 'var(--text-color)', opacity: 0.5 }}
          />
        </div>

        {/* The Image Sequence Canvas Right Side (Desktop) / Background (Mobile) */}
        <div className="hero-canvas-container" style={{
          flex: 1,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }} aria-hidden="true">
          <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Interactive 3D model sequence of Rhodes Apparel" />
        </div>
      </div>

      {/* Normal Scrolling Texts (Not Sticky) - Positioned below initial 100vh fold */}
      <div className="scroll-text-1" style={{
        position: 'absolute',
        top: '140vh',
        zIndex: 10,
        maxWidth: '300px',
        color: 'white',
        mixBlendMode: 'difference',
        fontFamily: 'var(--font-sans)',
        pointerEvents: 'none'
      }}>
        <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>THE COLLECTION</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
          Discover garments meticulously crafted to bridge the gap between everyday comfort and editorial elegance.
        </p>
      </div>

      <div className="scroll-text-2" style={{
        position: 'absolute',
        top: '200vh',
        zIndex: 10,
        maxWidth: '280px',
        color: 'white',
        mixBlendMode: 'difference',
        fontFamily: 'var(--font-sans)',
        pointerEvents: 'none'
      }}>
        <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0', fontWeight: '600' }}>TIMELESS DESIGN</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.9 }}>
          We focus on minimalist silhouettes and premium fabrics that endure beyond fleeting seasonal trends.
        </p>
      </div>
      
      <style>{`
        .scroll-text-1 {
          left: 55vw;
          text-align: left;
        }
        .scroll-text-2 {
          right: 5vw;
          text-align: right;
        }

        @media (max-width: 900px) {
          .hero-layout {
            display: block !important;
          }
          .hero-text-container {
            position: absolute !important;
            top: 35vh !important;
            left: 0 !important;
            width: 100% !important;
            height: auto !important;
            padding-left: 0 !important;
            padding-top: 0 !important;
            justify-content: center !important;
            align-items: center !important;
          }
          .hero-title-text {
            align-items: center !important;
          }
          .hero-canvas-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100vh !important;
          }
          .scroll-text-1 {
            left: 5vw !important; /* Moved to left on mobile */
          }
          .scroll-text-2 {
            right: 5vw !important;
          }
          .scroll-indicator {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
