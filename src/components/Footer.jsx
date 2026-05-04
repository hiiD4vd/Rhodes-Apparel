export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      padding: '5rem 5vw',
      marginTop: '5rem'
    }}>
      <div className="footer-grid">
        {/* Brand Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: 0, lineHeight: 1 }}>RHODES.</h2>
          <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '80%' }}>
            Defining the modern wardrobe with uncompromising quality and precision engineering. Designed for the eternal present.
          </p>
        </div>
        
        {/* Links 1 */}
        <div>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Shop</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--muted-text)', fontSize: '0.9rem' }}>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Outerwear</a></li>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Shirts</a></li>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Bottoms</a></li>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Accessories</a></li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>Support</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--muted-text)', fontSize: '0.9rem' }}>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>FAQ</a></li>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Shipping & Returns</a></li>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Size Guide</a></li>
            <li><a href="#" className="hover-target" style={{ transition: 'color 0.3s' }}>Contact Us</a></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Newsletter</h4>
          <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed!"); }} style={{ display: 'flex', borderBottom: '1px solid var(--text-color)' }}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              style={{
                width: '100%',
                padding: '0.8rem 0',
                backgroundColor: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-color)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem'
              }}
            />
            <button type="submit" className="hover-target" style={{ padding: '0.8rem 1rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--muted-text)',
        fontSize: '0.8rem',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <p>&copy; {new Date().getFullYear()} Rhodes Apparel. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#" className="hover-target" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Instagram</a>
          <a href="#" className="hover-target" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>Twitter</a>
          <a href="#" className="hover-target" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>TikTok</a>
        </div>
      </div>
    </footer>
  );
}
