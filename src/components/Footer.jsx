import React from 'react';
import { Globe, Mail, Phone, MapPin, Shield, RefreshCw } from 'lucide-react';

const Footer = ({ setCurrentPage, setActiveProductTab }) => {
  const handleNavClick = (id, tab = null) => {
    if (tab !== null && setActiveProductTab) {
      setActiveProductTab(tab);
    }
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const linkStyle = {
    background: 'none',
    border: 'none',
    color: 'var(--footer-text-secondary)',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    padding: '4px 0',
    display: 'inline-block',
    textAlign: 'left',
    width: '100%',
    fontFamily: 'inherit',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      <footer
      style={{
        borderTop: '1px solid var(--border-glass)',
        borderTopLeftRadius: '2.5rem',
        borderTopRightRadius: '2.5rem',
        overflow: 'hidden',
        background: 'var(--footer-bg)',
        backdropFilter: 'blur(16px)',
        padding: '5rem 0 0 0', /* zero bottom padding since socket handles it */
        zIndex: 10,
        position: 'relative',
        color: 'var(--footer-text-secondary)',
        transition: 'background-color 0.4s ease',
        flexShrink: 0,
      }}
    >
      {/* Top Footer contents */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
        {/* Brand Info */}
        <div style={{ textAlign: 'left' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              marginBottom: '1.25rem',
              cursor: 'pointer',
              background: '#ffffff',
              padding: '6px 12px',
              borderRadius: '6px',
            }}
            onClick={() => handleNavClick('home')}
          >
            <img src="/logo.png" alt="Uniqix Logo" style={{ height: '32px', objectFit: 'contain' }} />
          </div>
          <p style={{ color: 'var(--footer-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Uniqix is a leading B2B procurement services and global physical trade company. We streamline international supply chains with direct-from-manufacturer sourcing and compliant industrial solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: 'var(--footer-text-primary)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>Solutions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => handleNavClick('dormitories')} style={linkStyle}>
              Worker Accommodation
            </button>
            <button onClick={() => handleNavClick('products', 1)} style={linkStyle}>
              Sustainable Packaging
            </button>
            <button onClick={() => handleNavClick('products', 0)} style={linkStyle}>
              AI Robotics
            </button>
            <button onClick={() => handleNavClick('products', 2)} style={linkStyle}>
              Smart Energy Saving
            </button>
            <button onClick={() => handleNavClick('trade')} style={linkStyle}>
              Physical Commodities Trade
            </button>
          </div>
        </div>

        {/* Company Links */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: 'var(--footer-text-primary)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => handleNavClick('about')} style={linkStyle}>
              About Us
            </button>
            <button onClick={() => handleNavClick('contact')} style={linkStyle}>
              Contact &amp; Support
            </button>
            <button onClick={() => handleNavClick('partnership')} style={linkStyle}>
              Partnership Hub
            </button>
            <button onClick={() => handleNavClick('case-studies')} style={linkStyle}>
              Case Studies
            </button>
            <button onClick={() => handleNavClick('services')} style={linkStyle}>
              Global Supplier Portal
            </button>
          </div>
        </div>

        {/* Office Contact Info */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: 'var(--footer-text-primary)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>Global Headquarters</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--footer-text-secondary)', fontSize: '0.9rem' }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin style={{ width: '18px', height: '18px', color: 'var(--footer-text-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>8 Burn Road, Trivex #04-08, Singapore 369977.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Phone style={{ width: '18px', height: '18px', color: 'var(--footer-text-primary)' }} />
              <div>
                <div>Tel: <a href="tel:+6562821436" style={{ color: 'inherit', textDecoration: 'none' }}>+65 8399 5062</a></div>
              </div>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Mail style={{ width: '18px', height: '18px', color: 'var(--footer-text-primary)' }} />
              <a href="mailto:francislim@uniqix.com" style={{ color: 'inherit', textDecoration: 'none' }}>francislim@uniqix.com</a>
            </li>
          </ul>
        </div>
      </div>

    </footer>
    {/* Separate Socket Bottom Bar with a different background color */}
    <div
      style={{
        background: 'var(--footer-socket-bg)',
        borderTop: '1px solid var(--border-glass)',
        padding: '1.5rem 0',
        transition: 'background-color 0.4s ease',
        position: 'relative',
        zIndex: 10,
        height:'80px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        {/* Copyright Info */}
        <div style={{ color: 'var(--footer-text-secondary)', fontSize: '0.85rem' }}>
          © 2026 Uniqix Global Platform. All rights reserved.
        </div>

        {/* Center Links (Privacy & Terms) */}
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem' }}>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); }} style={{ color: 'var(--footer-text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}>Privacy Policy</a>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <a href="#terms" onClick={(e) => { e.preventDefault(); }} style={{ color: 'var(--footer-text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'}>Terms of Service</a>
        </div>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          {/* Custom inline SVG for Facebook */}
          <a href="https://facebook.com/Uniqix" target="_blank" rel="noreferrer" style={{ color: 'var(--footer-text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'} title="Facebook">
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          
          {/* Custom inline SVG for Instagram */}
          <a href="https://instagram.com/Uniqixsg" target="_blank" rel="noreferrer" style={{ color: 'var(--footer-text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'} title="Instagram">
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          
          {/* Custom inline SVG for LinkedIn */}
          <a href="https://linkedin.com/company/Uniqix" target="_blank" rel="noreferrer" style={{ color: 'var(--footer-text-secondary)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--footer-text-secondary)'} title="LinkedIn">
            <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Footer;
