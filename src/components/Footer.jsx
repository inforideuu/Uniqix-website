import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Globe, Mail, Phone, MapPin, Shield, RefreshCw, FileText, Lock, X } from 'lucide-react';

const Footer = ({ setCurrentPage, setActiveProductTab }) => {
  const [legalModal, setLegalModal] = useState(null); // 'terms' | 'privacy' | null

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
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3rem', marginBottom: '2rem' }}>
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
            <img src="/logo.png" alt="Uniqix Logo" style={{ height: '52px', objectFit: 'contain' }} />
          </div>
          <p style={{ color: 'var(--footer-text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', textAlign: 'justify' }}>
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
            
            <button onClick={() => handleNavClick('admin')} style={{ ...linkStyle, color: 'var(--primary)', fontWeight: 700 }}>
              Admin Console
            </button>
          </div>
        </div>

        {/* Office Contact Info */}
        <div style={{ textAlign: 'left' }}>
          <h4 style={{ color: 'var(--footer-text-primary)', marginBottom: '1.25rem', fontSize: '1.1rem', fontWeight: 700 }}>Global Headquarters</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--footer-text-secondary)', fontSize: '0.9rem', padding: 0, margin: '0 0 1.75rem 0' }}>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin style={{ width: '18px', height: '18px', color: 'var(--footer-text-primary)', flexShrink: 0, marginTop: '2px' }} />
              <span>8 Burn Road, Trivex #04-08, Singapore 369977.</span>
            </li>
            <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Phone style={{ width: '18px', height: '18px', color: 'var(--footer-text-primary)', flexShrink: 0 }} />
              <div>
                <div>Tel: <a href="tel:+6562821436" style={{ color: 'inherit', textDecoration: 'none' }}>+65 8399 5062</a></div>
              </div>
            </li>
            {/* <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <Mail style={{ width: '18px', height: '18px', color: 'var(--footer-text-primary)', flexShrink: 0 }} />
              <a href="mailto:francislim@uniqix.com" style={{ color: 'inherit', textDecoration: 'none' }}>francislim@uniqix.com</a>
            </li> */}
          </ul>

          {/* Powered By Info (Placed directly under Global Headquarters) */}
          <div>
            <div style={{ color: 'var(--footer-text-primary)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.65rem' }}>Powered By</div>
            <a
              href="https://zenelaitinfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src="/zenelaitinfotech_logo.png"
                alt="Zenelait Infotech"
                style={{
                  height: '42px',
                  borderRadius: '8px',
                  background: '#ffffff',
                  padding: '4px 10px',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)',
                  objectFit: 'contain'
                }}
              />
            </a>
          </div>
        </div>
      </div>

    </footer>
    {/* Separate Socket Bottom Bar with a different background color */}
    <div
      style={{
        background: 'var(--footer-socket-bg)',
        borderTop: '1px solid var(--border-glass)',
        padding: '1.25rem 0',
        transition: 'background-color 0.4s ease',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        {/* Copyright Info */}
        <div style={{ color: 'var(--footer-text-secondary)', fontSize: '0.85rem' }}>
          © 2026 Uniqix Global Platform. All rights reserved.
        </div>

        {/* Center Links (Privacy & Terms) */}
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.85rem', alignItems: 'center' }}>
          <button
            onClick={() => setLegalModal('privacy')}
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0, textDecoration: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
          >
            Privacy Policy
          </button>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
          <button
            onClick={() => setLegalModal('terms')}
            style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, padding: 0, textDecoration: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
          >
            Terms &amp; Conditions
          </button>
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

    {/* LEGAL & POLICIES MODAL DIALOG */}
    {legalModal && createPortal(
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <div style={{
          background: 'var(--bg-primary, #ffffff)',
          border: '1.5px solid var(--border-glass-hover, #D4A72C)',
          borderRadius: '24px',
          maxWidth: '680px',
          width: '100%',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '2.5rem 2rem 2rem 2rem',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 35px rgba(212, 167, 44, 0.25)',
          color: 'var(--text-primary, #0f172a)',
          animation: 'fadeIn 0.25s ease-out',
          margin: 'auto'
        }}>
          {/* Close Button */}
          <button
            onClick={() => setLegalModal(null)}
            aria-label="Close legal modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              background: 'rgba(212, 167, 44, 0.12)',
              border: '1.5px solid #D4A72C',
              color: '#D4A72C',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontWeight: 'bold',
              zIndex: 10
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#D4A72C'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(212, 167, 44, 0.12)'; e.currentTarget.style.color = '#D4A72C'; }}
          >
            <X size={20} stroke="currentColor" strokeWidth={2.5} />
          </button>

          {/* Modal Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 167, 44, 0.12)', border: '1px solid #D4A72C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {legalModal === 'terms' ? <FileText style={{ color: '#D4A72C', width: '24px', height: '24px' }} /> : <Lock style={{ color: '#D4A72C', width: '24px', height: '24px' }} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                {legalModal === 'terms' ? 'Terms & Conditions' : 'Privacy & Data Protection Policy'}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Uniqix Pte Ltd • Effective Date: January 2026 • Singapore Jurisdiction
              </div>
            </div>
          </div>

          {/* Content Text Body */}
          <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.7', textAlign: 'justify' }}>
            {legalModal === 'terms' ? (
              <>
                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>1. Acceptance &amp; Platform Scope</h4>
                <p>Welcome to Uniqix Pte Ltd. By accessing our web application, submitting procurement inquiries, or querying dormitory accommodation listings, you agree to be bound by these Terms and Conditions and our Privacy Policy. Uniqix aggregates industrial procurement and workforce housing solutions across Singapore and Asia-Pacific.</p>

                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>2. Dormitory &amp; Accommodation Services</h4>
                <p>All dormitory housing arrangements, worker placement queries, and capacity searches conducted through Uniqix comply with Singapore's Foreign Employee Dormitories Act (FEDA). Uniqix acts as a managed procurement interface connecting verified enterprise clients with licensed accommodation operators.</p>

                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>3. User Conduct &amp; Contact Verification</h4>
                <p>Users submitting inquiries agree to provide authentic company credentials, contact numbers, and capacity requirements. Uniqix reserves the right to verify user identity before processing high-capacity lodging reservations or physical trade contracts.</p>

                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>4. Intellectual Property &amp; Governing Law</h4>
                <p>All trademarks, platform technology, proprietary database schemas, and media assets belong to Uniqix Pte Ltd. These Terms shall be governed by and construed in accordance with the laws of the Republic of Singapore.</p>
              </>
            ) : (
              <>
                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>1. Data Collection &amp; PDPA Compliance</h4>
                <p>Uniqix Pte Ltd respects user privacy and complies fully with Singapore's Personal Data Protection Act (PDPA). We collect contact names, email addresses, phone/WhatsApp numbers, and corporate designations submitted via our inquiry forms.</p>

                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>2. Purpose of Processing</h4>
                <p>Collected personal and business data is exclusively used for fulfilling procurement requests, facilitating dormitory placement follow-ups by Uniqix administrators, and maintaining enterprise service records.</p>

                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>3. Data Security &amp; Third-Party Non-Disclosure</h4>
                <p>We implement technical and organizational security controls to protect user records against unauthorized access. Personal data is never sold, rented, or commercialized to third parties without explicit consent.</p>

                <h4 style={{ color: 'var(--text-primary)', margin: '1rem 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 700 }}>4. Contact Our Data Officer</h4>
                <p>For data access requests, corrections, or privacy inquiries, please contact our Data Protection Officer at 8 Burn Road, Trivex #04-08, Singapore 369977 or email <strong>sam@aptiveight.com</strong>.</p>
              </>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)' }}>
            <button
              onClick={() => setLegalModal(null)}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.75rem', borderRadius: '10px', fontWeight: 700 }}
            >
              I Understand &amp; Agree
            </button>
          </div>
        </div>
      </div>,
      document.body
    )}
  </div>
  );
};

export default Footer;
