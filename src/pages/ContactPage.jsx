import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Sourcing Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em' }}>GET IN TOUCH</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0.5rem 0 1rem 0', color: 'var(--text-primary)' }}>Contact Our Global Offices</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          Have a question about material procurement, dormitory spaces, or partnerships? Our local specialists are standing by.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
        
        {/* Contact Information & Channels (using hover-parallax-card) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div className="glass-panel hover-parallax-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }} className="parallax-child">Direct Channels</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '8px' }}>
                  <Phone style={{ color: 'var(--primary)', width: '22px', height: '22px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Telephone Support</div>
                  <a href="tel:+6562821436" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none' }}>+65 8399 5062</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '8px' }}>
                  <Mail style={{ color: 'var(--primary)', width: '22px', height: '22px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Inquiries</div>
                  <a href="mailto:francislim@uniqix.com" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none' }}>francislim@uniqix.com</a>
                </div>
              </div>

              {/* Social Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '0.5rem' }}>Follow Us</div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  {/* Facebook */}
                  <a href="https://facebook.com/Uniqix" target="_blank" rel="noreferrer" style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-glow)',
                    border: '1px solid rgba(197, 160, 89, 0.2)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary-glow)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  title="Facebook"
                  >
                    <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  
                  {/* Instagram */}
                  <a href="https://instagram.com/Uniqixsg" target="_blank" rel="noreferrer" style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-glow)',
                    border: '1px solid rgba(197, 160, 89, 0.2)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary-glow)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  title="Instagram"
                  >
                    <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                    </svg>
                  </a>
                  
                  {/* LinkedIn */}
                  <a href="https://linkedin.com/company/Uniqix" target="_blank" rel="noreferrer" style={{ 
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '50%', 
                    background: 'var(--primary-glow)',
                    border: '1px solid rgba(197, 160, 89, 0.2)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--primary)',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#ffffff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary-glow)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  title="LinkedIn"
                  >
                    <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Address Card (using glow-border-card) */}
          <div className="glass-panel glow-border-card" style={{ padding: '2.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <MapPin style={{ color: 'var(--accent)' }} /> Singapore Office
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '0.5rem' }}>
              8 Burn Road, Trivex #04-08, Singapore 369977.
            </p>
          </div>

        </div>

        {/* Contact Form Section (using floating-shadow-card) */}
        <div className="glass-panel floating-shadow-card" style={{ padding: '3rem' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <CheckCircle style={{ width: '56px', height: '56px', color: '#10b981', marginBottom: '1.5rem' }} className="animate-float" />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Message Transmitted</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem' }}>
                Your ticket has been logged. An regional logistics coordinator will contact you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
                Submit Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Send Message</h3>

              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  className="form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Inquiry Subject</label>
                <select
                  className="form-input"
                  style={{ appearance: 'none', background: 'var(--bg-secondary)' }}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="Dormitory Accommodation Inquiry">Dormitory Accommodation Inquiry</option>
                  <option value="Autonomous Mosquito Control Robot Leasing">Autonomous Mosquito Control Robot Leasing</option>
                  <option value="Bulk Packaging Materials Supply">Bulk Packaging Materials Supply</option>
                  <option value="Smart Energy-Saving Lighting Provision">Smart Energy-Saving Lighting Provision</option>
                  <option value="Physical Gold Trading Desk">Physical Gold Trading Desk</option>
                  <option value="Physical Oil & Gas Trading Desk">Physical Oil & Gas Trading Desk</option>
                  <option value="Physical Metals Sourcing">Physical Metals Sourcing</option>
                  <option value="General B2B Procurement Query">General B2B Procurement Query</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Details / Requirements</label>
                <textarea
                  required
                  className="form-input"
                  style={{ minHeight: '120px', resize: 'vertical' }}
                  placeholder="Detail your request..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                <Send style={{ width: '16px', height: '16px' }} /> Dispatch Message
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Map Embed */}
      <div className="glass-panel" style={{ height: '400px', position: 'relative', overflow: 'hidden', borderRadius: '1.5rem', border: '1px solid var(--border-glass)' }}>
        <iframe
          src="https://maps.google.com/maps?q=8%20Burn%20Road,%20Trivex,%20Singapore&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Uniqix Office Map"
        />
      </div>

    </div>
  );
};

export default ContactPage;
