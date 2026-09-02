import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Dormitory Accommodation Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://127.0.0.1:8000/api/inquiries/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting the backend server.");
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1.5rem 6rem 1.5rem', color: 'var(--text-primary)' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <span style={{ color: '#D4A72C', fontSize: '0.9rem' }}>◆</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            GET IN TOUCH
          </span>
          <span style={{ color: '#D4A72C', fontSize: '0.9rem' }}>◆</span>
        </div>

        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: 900,
          margin: '0 0 1rem 0',
          color: 'var(--text-primary)',
          fontFamily: "'Playfair Display', Georgia, serif",
          lineHeight: '1.15'
        }}>
          Contact Our Global Offices
        </h1>

        <p style={{ color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.65' }}>
          Have a question about material procurement, dormitory spaces, or partnerships? Our local specialists are standing by.
        </p>
      </div>

      {/* Main 2-Column Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '3rem', marginBottom: '5rem', alignItems: 'stretch' }} className="responsive-contact-grid">

        {/* LEFT COLUMN: Direct Channels + Singapore Office */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          {/* Card 1: Direct Channels (Dark Navy Obsidian Theme) */}
          <div
            className="glass-panel"
            style={{
              padding: '3rem 2.5rem',
              borderRadius: '2rem',
              background: 'linear-gradient(135deg, #020b1e 0%, #081226 60%, #0f1c36 100%)',
              border: '1px solid rgba(197, 160, 89, 0.35)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden',
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* World Map Overlay Graphics */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '65%',
              background: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80") center right/cover no-repeat',
              opacity: 0.18,
              mixBlendMode: 'luminosity',
              pointerEvents: 'none'
            }} />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: 900,
                marginBottom: '0.5rem',
                color: '#ffffff',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}>
                Direct Channels
              </h3>
              <div style={{ width: '50px', height: '2px', background: '#D4A72C', marginBottom: '2.5rem', borderRadius: '1px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Phone Item */}
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(197, 160, 89, 0.15)',
                    border: '1px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Phone style={{ color: '#D4A72C', width: '22px', height: '22px' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                      Telephone Support
                    </div>
                    <a href="tel:+6583995062" style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, textDecoration: 'none', letterSpacing: '0.02em' }}>
                      +65 8399 5062
                    </a>
                  </div>
                </div>

                {/* Email Item */}
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(197, 160, 89, 0.15)',
                    border: '1px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail style={{ color: '#D4A72C', width: '22px', height: '22px' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
                      Email Inquiries
                    </div>
                    <a href="mailto:francislim@uniqix.com" style={{ color: '#ffffff', fontSize: '1.15rem', fontWeight: 800, textDecoration: 'none' }}>
                      francislim@uniqix.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Social Links Bottom Bar */}
            <div style={{ position: 'relative', zIndex: 2, borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.5rem', marginTop: '2.5rem' }}>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
                Follow Us
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>

                {/* Facebook Button */}
                <a href="https://facebook.com/Uniqix" target="_blank" rel="noreferrer" style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4A72C',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A72C'; e.currentTarget.style.color = '#020b1e'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)'; e.currentTarget.style.color = '#D4A72C'; }}
                  title="Facebook"
                >
                  <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* Instagram Button */}
                <a href="https://instagram.com/Uniqixsg" target="_blank" rel="noreferrer" style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4A72C',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A72C'; e.currentTarget.style.color = '#020b1e'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)'; e.currentTarget.style.color = '#D4A72C'; }}
                  title="Instagram"
                >
                  <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* LinkedIn Button */}
                <a href="https://linkedin.com/company/Uniqix" target="_blank" rel="noreferrer" style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.1)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4A72C',
                  transition: 'all 0.3s'
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D4A72C'; e.currentTarget.style.color = '#020b1e'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)'; e.currentTarget.style.color = '#D4A72C'; }}
                  title="LinkedIn"
                >
                  <svg style={{ width: '18px', height: '18px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

              </div>
            </div>

          </div>

          {/* Card 2: Singapore Office Address Card */}
          <div
            className="glass-panel"
            style={{
              padding: '2rem 2.25rem',
              borderRadius: '1.75rem',
              background: 'var(--bg-glass)',
              border: '1.5px solid var(--border-glass-hover)',
              boxShadow: 'var(--shadow-glass)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Circular Location Badge */}
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(197, 160, 89, 0.08)',
              border: '1.5px solid #D4A72C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 6px 15px rgba(197, 160, 89, 0.15)',
              flexShrink: 0
            }}>
              <MapPin style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
            </div>

            <div style={{ flex: 1, position: 'relative', zIndex: 2 }}>
              <h3 style={{
                fontSize: '1.45rem',
                fontWeight: 900,
                color: 'var(--text-primary)',
                margin: '0 0 0.4rem 0',
                fontFamily: "'Playfair Display', Georgia, serif"
              }}>
                Singapore Office
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0, maxWidth: '280px' }}>
                8 Burn Road, Trivex #04-08, Singapore 369977.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Send Message Form Card */}
        <div
          className="glass-panel"
          style={{
            padding: '3rem',
            borderRadius: '2rem',
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--border-glass-hover)',
            boxShadow: 'var(--shadow-glass)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <CheckCircle style={{ width: '64px', height: '64px', color: '#10b981', marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Message Transmitted
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                Your ticket has been logged. Our regional specialist will contact you shortly.
              </p>
              <button onClick={() => setSubmitted(false)} className="btn btn-secondary" style={{ padding: '0.8rem 2rem' }}>
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>

                {/* Form Header with Circle Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#020b1e',
                    border: '2px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(2, 11, 30, 0.2)',
                    flexShrink: 0
                  }}>
                    <Send style={{ width: '22px', height: '22px', color: '#D4A72C', transform: 'rotate(-20deg) translateX(2px)' }} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      margin: 0,
                      color: 'var(--text-primary)',
                      fontFamily: "'Playfair Display', Georgia, serif"
                    }}>
                      Send Message
                    </h3>
                  </div>
                </div>

                {/* Full Name */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.2rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Email Address */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.2rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Inquiry Subject Select */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Inquiry Subject
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.2rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option value="Dormitory Accommodation Inquiry" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Dormitory Accommodation Inquiry</option>
                    <option value="Autonomous Mosquito Control Robot Leasing" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Autonomous Mosquito Control Robot Leasing</option>
                    <option value="Bulk Packaging Materials Supply" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Bulk Packaging Materials Supply</option>
                    <option value="Smart Energy-Saving Lighting Provision" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Smart Energy-Saving Lighting Provision</option>
                    <option value="Physical Gold Trading Desk" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Physical Gold Trading Desk</option>
                    <option value="Physical Oil & Gas Trading Desk" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Physical Oil & Gas Trading Desk</option>
                    <option value="Physical Metals Sourcing" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Physical Metals Sourcing</option>
                    <option value="General B2B Procurement Query" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>General B2B Procurement Query</option>
                  </select>
                </div>

                {/* Details / Requirements Textarea */}
                <div style={{ marginBottom: '1.75rem' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Details / Requirements
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Detail your request..."
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.2rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '120px'
                    }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '1.1rem 2rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #D4A72C 0%, #a8843f 100%)',
                  border: 'none',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  boxShadow: '0 10px 25px rgba(197, 160, 89, 0.3)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <Send style={{ width: '18px', height: '18px' }} /> Dispatch Message
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Google Map Embed */}
      <div className="glass-panel" style={{ height: '400px', position: 'relative', overflow: 'hidden', borderRadius: '2rem', border: '1px solid var(--border-glass)' }}>
        <iframe
          src="https://maps.google.com/maps?q=8%20Burn%20Road,%20Trivex,%20Singapore&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Uniqix Office Location"
        />
      </div>

      {/* Media Query for responsive grid */}
      <style>{`
        @media (max-width: 991px) {
          .responsive-contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

    </div>
  );
};

export default ContactPage;
