import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      description: 'Explore our latest collections and find the perfect pieces that elevate your everyday aesthetic.'
    },
    {
      number: '02',
      title: 'SELECT',
      description: 'Choose your preferred size and fit. Add your desired items to the premium shopping bag.'
    },
    {
      number: '03',
      title: 'CHECKOUT',
      description: 'Proceed to our secure checkout. We offer worldwide shipping and multiple secure payment options.'
    },
    {
      number: '04',
      title: 'RECEIVE',
      description: 'Your Rhodes Apparel package will arrive in signature premium packaging. Ready to wear.'
    }
  ];

  return (
    <section id="how-it-works" style={{ 
      padding: '8rem 5vw', 
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-color)',
      borderTop: '1px solid var(--border-color)',
      marginTop: '4rem'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 5rem)',
            lineHeight: 1,
            textTransform: 'uppercase',
            margin: 0,
            letterSpacing: '-0.02em',
            fontWeight: '400',
            fontStyle: 'italic'
          }}>
            How To Order
          </h2>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            maxWidth: '400px',
            margin: 0,
            lineHeight: 1.5,
            color: 'var(--muted-text)'
          }}>
            A seamless experience from discovery to delivery. Follow these simple steps to acquire your Rhodes pieces.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '3rem'
        }}>
          {steps.map((step, index) => (
            <motion.div 
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              <div style={{
                fontSize: '0.85rem',
                fontFamily: 'var(--font-sans)',
                fontWeight: '600',
                color: 'var(--text-color)',
                paddingBottom: '1rem',
                borderBottom: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                opacity: 0.6
              }}>
                <span>STEP</span>
                <span>{step.number}</span>
              </div>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  textTransform: 'uppercase',
                  margin: '0 0 1rem 0',
                  fontWeight: '400',
                  letterSpacing: '0.02em'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  color: 'var(--muted-text)',
                  margin: 0
                }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
