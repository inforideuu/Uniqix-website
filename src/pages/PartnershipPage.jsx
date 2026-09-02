import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Users, Landmark, ShieldCheck, ArrowRight, Building,
  RefreshCw, Truck, Globe, Heart, ShieldAlert, Award, Target,
  Send, CheckCircle, Phone, Mail, FileText, X
} from 'lucide-react';

const PartnershipPage = ({ setCurrentPage }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    interest_area: 'Corporate Partnership',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleCardClick = (frameworkTitle) => {
    setFormData(prev => ({ ...prev, interest_area: frameworkTitle }));
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/partnerships/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Failed to submit partnership application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend server.");
    } finally {
      setSubmitting(false);
    }
  };

  const frameworks = [
    {
      num: '01',
      title: 'Corporate Partnership',
      icon: <Building />,
      desc: 'Long-term partnership structures built on aligned strategic goals.'
    },
    {
      num: '02',
      title: 'Trade Partnership',
      icon: <RefreshCw />,
      desc: 'Enable co-trading arrangements for mutual growth.'
    },
    {
      num: '03',
      title: 'Supplier Partnership',
      icon: <Truck />,
      desc: 'Reliable and ethical supply networks for shared success.'
    },
    {
      num: '04',
      title: 'Strategic Partnership',
      icon: <Target />,
      desc: 'Co-investment and collaboration to scale impact.'
    },
    {
      num: '05',
      title: 'Logistics Partnership',
      icon: <Globe />,
      desc: 'Coordinated logistics management and global shipping solutions.'
    },
    {
      num: '06',
      title: 'Joint Venture Partnership',
      icon: <Users />,
      desc: 'Shared ventures to build innovative and high-impact ecosystems.'
    }
  ];

  return (
    <div style={{ color: 'var(--text-primary)', position: 'relative' }}>

      {/* 1. HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '95vh',
        marginTop: '-90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '130px',
        paddingBottom: '4rem',
        background: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        color: '#ffffff'
      }}>
        {/* Dark navy overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(2, 11, 30, 0.93) 0%, rgba(2, 11, 30, 0.65) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            COLLABORATION MODELS
          </span>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Partnership Models
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
            Unique engagement models that connect your goals with proven execution. Explore our structured and flexible partnerships.
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
            style={{
              padding: '1.1rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.05rem',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #D4A72C 0%, #a8843f 100%)',
              border: 'none',
              color: '#ffffff',
              boxShadow: '0 10px 30px rgba(197, 160, 89, 0.4)',
              cursor: 'pointer'
            }}
          >
            Apply for Strategic Partnership <ArrowRight style={{ width: '20px', height: '20px' }} />
          </button>
        </div>
      </section>

      {/* 2. THE UNIQUE BRIDGE MODEL */}
      <section style={{ padding: '5rem 0 3rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>
              The Unique <span style={{ color: 'var(--primary)' }}>Bridge Model</span>
            </h2>
          </div>

          {/* Flow Diagram Panel */}
          <div className="glass-panel" style={{
            padding: '4rem 3.5rem',
            borderRadius: '2rem',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-glass)',
            marginBottom: '2.5rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem' }} className="bridge-layout">

              {/* Card 1: Demand */}
              <div className="glass-panel" style={{
                flex: 1,
                padding: '2.5rem 1.5rem',
                borderRadius: '1.25rem',
                background: '#ffffff',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid var(--border-glass)',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ background: 'var(--primary-glow)', padding: '12px', borderRadius: '50%', marginBottom: '1.25rem' }}>
                  <Users style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.05em', color: '#0b1f3a', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Demand
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                  Private or Government Buyers, Project Owners, and Investment Sponsors.
                </p>
              </div>

              {/* Arrow 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '100px' }} className="hide-on-mobile">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Needs / Goals</span>
                <ArrowRight style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Requirements</span>
              </div>

              {/* Card 2: Central Union */}
              <div style={{
                flex: 1.1,
                padding: '2.5rem 2rem',
                borderRadius: '1.5rem',
                background: 'var(--footer-bg)',
                color: '#ffffff',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(11,31,58,0.25)',
                border: '2px solid var(--primary)',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                transform: 'scale(1.05)'
              }} className="no-scale-mobile">
                <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '50%', marginBottom: '1.25rem' }}>
                  <Users style={{ width: '24px', height: '24px', color: '#ffffff' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                  CAPITAL PROVIDER
                </span>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.05em' }}>
                  UNION
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                  Connects Strategic Capital with Viable Opportunities. We Bridge.
                </p>
              </div>

              {/* Arrow 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', minWidth: '100px' }} className="hide-on-mobile">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Capital Access</span>
                <ArrowRight style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Action / Returns</span>
              </div>

              {/* Card 3: Capital Source */}
              <div className="glass-panel" style={{
                flex: 1,
                padding: '2.5rem 1.5rem',
                borderRadius: '1.25rem',
                background: '#ffffff',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                border: '1px solid var(--border-glass)',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <div style={{ background: 'var(--primary-glow)', padding: '12px', borderRadius: '50%', marginBottom: '1.25rem' }}>
                  <Landmark style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
                </div>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.05em', color: '#0b1f3a', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Capital Source
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                  Investors, Funds, and Financial Institutions.
                </p>
              </div>

            </div>
          </div>

          {/* Safety Banner */}
          <div className="glass-panel" style={{
            padding: '1.25rem 2.5rem',
            borderRadius: '1rem',
            background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.03) 100%)',
            border: '1px solid var(--border-glass)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '0.92rem',
            color: 'var(--text-primary)',
            fontWeight: 500
          }}>
            <ShieldCheck style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
            <span>
              <strong style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginRight: '6px' }}>Safety |</strong>
              Structured Transactions. Transparency. Security. Compliant Operations.
            </span>
          </div>

        </div>
      </section>

      {/* 3. PARTNERSHIP FRAMEWORKS */}
      <section style={{ padding: '4rem 0 6rem 0', position: 'relative' }}>
        <div className="container">

          {/* Header Block */}
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#D4A72C', fontSize: '0.9rem' }}>◆</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                OUR PARTNERSHIP FRAMEWORKS
              </span>
              <span style={{ color: '#D4A72C', fontSize: '0.9rem' }}>◆</span>
            </div>

            <h2 style={{
              fontSize: '3.4rem',
              fontWeight: 900,
              color: 'var(--text-primary)',
              fontFamily: "'Playfair Display', Georgia, serif",
              margin: '0 0 1rem 0',
              lineHeight: '1.15'
            }}>
              Our Partnership Frameworks
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '60px', height: '1px', background: 'rgba(197, 160, 89, 0.4)' }} />
              <span style={{ color: '#D4A72C', fontSize: '0.75rem' }}>◆</span>
              <div style={{ width: '60px', height: '1px', background: 'rgba(197, 160, 89, 0.4)' }} />
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: '0 auto', maxWidth: '600px', lineHeight: '1.6' }}>
              Building strong relationships through trust, collaboration, and shared value. Click any framework card to apply.
            </p>
          </div>

          {/* 6 Grid Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4.5rem' }}>
            {frameworks.map((fw, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '3.75rem 2rem 3rem 2rem',
                  borderRadius: '1.75rem',
                  background: hoveredCard === idx
                    ? 'linear-gradient(180deg, #ffffff 0%, #faf6ed 100%)'
                    : 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(253, 251, 247, 0.95) 100%)',
                  border: '1.5px solid rgba(197, 160, 89, 0.35)',
                  boxShadow: hoveredCard === idx
                    ? '0 20px 45px rgba(197, 160, 89, 0.2)'
                    : '0 10px 30px rgba(0, 0, 0, 0.04)',
                  transform: hoveredCard === idx ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  cursor: 'pointer',
                  minHeight: '290px'
                }}
                onClick={() => handleCardClick(fw.title)}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top Left Number Ribbon Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '2rem',
                  width: '42px',
                  height: '48px',
                  background: 'linear-gradient(180deg, #D4A72C 0%, #b08d4a 100%)',
                  borderRadius: '0 0 10px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  boxShadow: '0 6px 15px rgba(197, 160, 89, 0.35)',
                  zIndex: 3
                }}>
                  {fw.num}
                </div>

                {/* Centered Circular Icon Container */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.08)',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                  boxShadow: '0 8px 20px rgba(197, 160, 89, 0.1)'
                }}>
                  {React.cloneElement(fw.icon, { style: { width: '28px', height: '28px', color: '#D4A72C' } })}
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: '1.3'
                }}>
                  {fw.title}
                </h3>

                {/* Underline Accent */}
                <div style={{ width: '40px', height: '2px', background: '#D4A72C', marginBottom: '1.25rem', borderRadius: '1px' }} />

                {/* Description */}
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.65', margin: 0, maxWidth: '260px' }}>
                  {fw.desc}
                </p>

                {/* Bottom-Right Arrow Circle */}
                <div style={{
                  position: 'absolute',
                  bottom: '1.25rem',
                  right: '1.25rem',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  border: '1.5px solid #D4A72C',
                  background: hoveredCard === idx
                    ? '#D4A72C'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 237, 222, 0.9) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(197, 160, 89, 0.15)',
                  transition: 'all 0.3s ease'
                }}>
                  <ArrowRight style={{ width: '16px', height: '16px', color: hoveredCard === idx ? '#ffffff' : '#D4A72C' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary"
              style={{
                padding: '1.1rem 2.5rem',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #D4A72C 0%, #a8843f 100%)',
                border: 'none',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 800,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 30px rgba(197, 160, 89, 0.4)',
                cursor: 'pointer'
              }}
            >
              Apply for Strategic Partnership <ArrowRight style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

        </div>
      </section>

      {/* OVERLAY POPUP MODAL (PORTALED DIRECTLY TO BODY TO AVOID AFFECTING PAGE CONTAINER, NAVBAR, OR FOOTER) */}
      {isModalOpen && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(2, 11, 30, 0.85)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          boxSizing: 'border-box'
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsModalOpen(false);
        }}
        >
          <div className="glass-panel" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '750px',
            maxHeight: '85vh',
            overflowY: 'auto',
            borderRadius: '2rem',
            background: 'var(--bg-glass)',
            border: '1.5px solid var(--border-glass-hover)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
            padding: '3rem 2.5rem',
            color: 'var(--text-primary)',
            boxSizing: 'border-box'
          }}>
            {/* Close Button */}
            <button
  onClick={() => setIsModalOpen(false)}
  style={{
    position: 'absolute',
    top: '1.5rem',
    right: '1.5rem',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    background: '#ffffff',
    border: '1px solid #c5a059',
    color: '#000000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    zIndex: 9999,
    padding: 0,
  }}
  title="Close modal"
>
  <X
    size={20}
    strokeWidth={2.5}
    color="#000000"
  />
</button>

            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '6px 16px', background: 'rgba(197, 160, 89, 0.15)', borderRadius: '50px', border: '1px solid #D4A72C', marginBottom: '1rem' }}>
                <Send style={{ width: '16px', height: '16px', color: '#D4A72C' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  PARTNERSHIP APPLICATION
                </span>
              </div>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif", marginBottom: '0.5rem' }}>
                Apply for Strategic Partnership
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '550px', margin: '0 auto', lineHeight: '1.6' }}>
                Complete the application form below. Our executive development team will review your proposal and respond promptly.
              </p>
            </div>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle style={{ width: '64px', height: '64px', color: '#10b981', marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.75rem', color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Application Transmitted Successfully
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                  Your partnership application has been logged in the Uniqix Executive Management System.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsModalOpen(false);
                    setFormData({ company_name: '', contact_name: '', email: '', phone: '', interest_area: 'Corporate Partnership', message: '' });
                  }}
                  className="btn btn-primary"
                  style={{ padding: '0.85rem 2.25rem', borderRadius: '30px' }}
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                
                {/* Company Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Company / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Global Logistics"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  />
                </div>

                {/* Contact Person Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    value={formData.contact_name}
                    onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                  />
                </div>

                {/* Corporate Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
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

                {/* Contact Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Telephone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+65 9123 4567"
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none'
                    }}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Interest Area Select (Full Width) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Partnership Framework *
                  </label>
                  <select
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                    value={formData.interest_area}
                    onChange={(e) => setFormData({ ...formData, interest_area: e.target.value })}
                  >
                    <option value="Corporate Partnership" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Corporate Partnership</option>
                    <option value="Trade Partnership" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Trade Partnership</option>
                    <option value="Supplier Partnership" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Supplier Partnership</option>
                    <option value="Strategic Partnership" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Strategic Partnership</option>
                    <option value="Logistics Partnership" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Logistics Partnership</option>
                    <option value="Joint Venture Partnership" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>Joint Venture Partnership</option>
                  </select>
                </div>

                {/* Message Proposal Details (Full Width) */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Partnership Proposal / Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your organization, objectives, and proposed partnership synergy..."
                    style={{
                      width: '100%',
                      padding: '0.85rem 1.1rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border-glass-hover)',
                      background: 'var(--bg-secondary)',
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      resize: 'vertical',
                      minHeight: '110px'
                    }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                {/* Submit Button (Full Width) */}
                <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    disabled={submitting}
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
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      opacity: submitting ? 0.7 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Send style={{ width: '18px', height: '18px' }} />
                    {submitting ? "Transmitting..." : "Submit Partnership Application"}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>,
        document.body
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
          .no-scale-mobile {
            transform: scale(1) !important;
          }
        }
      `}</style>

    </div>
  );
};

export default PartnershipPage;
