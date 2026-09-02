import React, { useState } from 'react';
import { Package, Award, ShieldCheck, HelpCircle, CheckCircle, Globe, Send } from 'lucide-react';
import { API_BASE_URL } from '../config';

const SuppliersPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Construction Materials',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/api/partnerships/submit/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company_name: formData.companyName,
          contact_name: formData.contactPerson,
          email: formData.email,
          phone: formData.phone,
          interest_area: formData.category,
          message: formData.message
        })
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting the backend server.");
    }
  };

  const categories = [
    { title: 'Product 1', count: '14 Vetted Partners' },
    { title: 'Product 2', count: '8 Vetted Partners' },
    { title: 'Product 3', count: '11 Vetted Partners' },
    { title: 'Product 4', count: '6 Vetted Partners' },
    { title: 'Product 5', count: '9 Vetted Partners' },
    { title: 'Product 6', count: '5 Vetted Partners' },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em' }}>SUPPLY CHAIN INFRASTRUCTURE</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0.5rem 0 1rem 0', color: 'var(--text-primary)' }}>Our Global Supplier Network</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          We collaborate with premium manufacturers worldwide, managing logistical execution, quality compliance, and financial transactions.
        </p>
      </div>

      {/* Grid of Categories and Benefits */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem' }}>
        
        {/* Product Categories (using hover-parallax-card) */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Package style={{ color: 'var(--primary)' }} /> Product Categories
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {categories.map((cat, idx) => (
              <div key={idx} className="glass-panel hover-parallax-card" style={{ padding: '1.25rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }} className="parallax-child">{cat.title}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier Benefits (using glow-border-card) */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Award style={{ color: 'var(--secondary)' }} /> Partnership Benefits
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-panel glow-border-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '8px', borderRadius: '8px', height: 'fit-content' }}>
                <Globe style={{ color: 'var(--secondary)', width: '20px', height: '20px' }} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Global Market Penetration</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>related content to be displayed.</p>
              </div>
            </div>

            <div className="glass-panel glow-border-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(79, 70, 229, 0.08)', padding: '8px', borderRadius: '8px', height: 'fit-content' }}>
                <ShieldCheck style={{ color: 'var(--primary)', width: '20px', height: '20px' }} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Financial Security</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>related content to be displayed.</p>
              </div>
            </div>

            <div className="glass-panel glow-border-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'rgba(217, 119, 6, 0.08)', padding: '8px', borderRadius: '8px', height: 'fit-content' }}>
                <HelpCircle style={{ color: 'var(--accent)', width: '20px', height: '20px' }} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Automated Customs Support</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>related content to be displayed.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Become a Supplier Form Section (using floating-shadow-card) */}
      <div className="glass-panel floating-shadow-card" style={{ padding: '3.5rem', background: 'var(--bg-glass)' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle style={{ width: '64px', height: '64px', color: '#10b981', marginBottom: '1.5rem' }} className="animate-float" />
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Application Submitted</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto' }}>
              Thank you for applying. Our vendor compliance team will contact you within 3 business days to request audited safety certifications.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
              Submit Another Application
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Become a Partner</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                related content to be displayed...
              </p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600 }}>
                <span>Standard SLA Response Time: 72 Hours</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Primary Product Category</label>
                <select
                  className="form-input"
                  style={{ appearance: 'none', background: 'var(--bg-secondary)' }}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Construction Materials">Construction Materials</option>
                  <option value="Construction Equipment">Construction Equipment</option>
                  <option value="Manufacturing Equipment">Manufacturing Equipment</option>
                  <option value="Workforce Lodging">Workforce Lodging Services</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Message / Company Portfolio Link</label>
                <textarea
                  className="form-input"
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  placeholder="Tell us about your production capacity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                <Send style={{ width: '16px', height: '16px' }} /> Submit Registration
              </button>
            </form>
          </div>
        )}
      </div>

    </div>
  );
};

export default SuppliersPage;
