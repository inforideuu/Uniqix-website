import React, { useState } from 'react';
import { 
  Users, Landmark, ShieldCheck, ArrowRight, Building, 
  RefreshCw, Truck, Globe, Heart, ShieldAlert, Award
} from 'lucide-react';

const PartnershipPage = ({ setCurrentPage }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const frameworks = [
    {
      title: 'Corporate Partnership',
      icon: <Building style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />,
      desc: 'Long-term partnership structures built on aligned strategic goals.'
    },
    {
      title: 'Trade Partnership',
      icon: <RefreshCw style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />,
      desc: 'Enable co-trading arrangements for mutual growth.'
    },
    {
      title: 'Supplier Partnership',
      icon: <Truck style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />,
      desc: 'Reliable and ethical supply networks for shared success.'
    },
    {
      title: 'Strategic Partnership',
      icon: <Award style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />, // chess/knight style replacement
      desc: 'Co-investment and collaboration to scale impact.'
    },
    {
      title: 'Logistics Partnership',
      icon: <Globe style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />,
      desc: 'Coordinated logistics management and global shipping solutions.'
    },
    {
      title: 'Joint Venture Partnership',
      icon: <Users style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />, // handshake icon style
      desc: 'Shared ventures to build innovative and high-impact ecosystems.'
    }
  ];

  return (
    <div style={{ color: 'var(--text-primary)', position: 'relative' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '6rem 0',
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
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '650px', margin: '0 auto' }}>
            Unique engagement models that connect your goals with proven execution. Explore our structured and flexible partnerships.
          </p>
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
                  <Users style={{ width: '24px', height: '24px', color: '#ffffff' }} /> {/* custom handshake replacement */}
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
      <section style={{ padding: '3rem 0 6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              OUR PARTNERSHIP FRAMEWORKS
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Our Partnership Frameworks
            </h2>
          </div>

          {/* 6 Grid Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {frameworks.map((fw, idx) => (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ 
                  padding: '2.5rem', 
                  borderRadius: '1.5rem', 
                  background: 'var(--bg-glass)', 
                  border: '1px solid var(--border-glass)', 
                  boxShadow: hoveredCard === idx ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
                  background:hoveredCard === idx ? 'var(--bg-primary)' : 'var(--bg-glass)',
                  borderColor: hoveredCard === idx ? 'var(--card-hover-border)' : 'var(--border-glass)',
                  transform: hoveredCard === idx ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                  position: 'relative',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div>
                  <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '10px', width: 'fit-content', marginBottom: '1.5rem' }}>
                    {fw.icon}
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    {fw.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
                    {fw.desc}
                  </p>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                  <ArrowRight style={{ width: '18px', height: '18px', color: 'var(--primary)' }} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Button */}
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={() => setCurrentPage('contact')} 
              className="btn btn-primary" 
              style={{ 
                padding: '1rem 2.5rem', 
                borderRadius: '30px', 
                background: 'var(--footer-bg)', 
                border: 'none', 
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              Explore Partnership Opportunities <ArrowRight style={{ width: '18px', height: '18px', color: 'var(--primary)' }} />
            </button>
          </div>

        </div>
      </section>

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
