import React, { useState, useEffect } from 'react';
import { Home, ShieldCheck, Box, HardHat, Cpu, Globe, Check, HelpCircle, ArrowRight, Phone, Mail } from 'lucide-react';
import { API_BASE_URL } from '../config';

const ServicesPage = ({ setCurrentPage }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isTradeHovered, setIsTradeHovered] = useState(false);
  const [isSupportHovered, setIsSupportHovered] = useState(false);

  const [dbServices, setDbServices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) setDbServices(data);
      })
      .catch(err => console.error("Error loading services:", err));
  }, []);

  const getServiceIcon = (num, color) => {
    const style = { width: '28px', height: '28px', color: color };
    if (num === '01') return <Home style={style} />;
    if (num === '02') return <Box style={style} />;
    if (num === '03') return <HardHat style={style} />;
    if (num === '04') return <Cpu style={style} />;
    return <Globe style={style} />;
  };

  const servicesList = [
    {
      num: '01',
      title: 'Supply of Dormitory Accommodation',
      icon: <Home style={{ width: '28px', height: '28px', color: '#D4A72C' }} />,
      desc: 'Providing dormitory accommodation for clients to house their workers.',
      bullets: [
        'Access to 40+ dormitories islandwide in Singapore.',
        'Fully compliant with FEDA (Foreign Employee Dormitories Act).',
        'End-to-end boarding logistics and check-in management.'
      ],
      action: 'dormitories',
      actionText: 'Search Accommodation Hub',
      themeColor: '#D4A72C',
      badgeBg: 'rgba(197, 160, 89, 0.1)'
    },
    {
      num: '02',
      title: 'Supply of Latest Green Packaging Materials',
      icon: <Box style={{ width: '28px', height: '28px', color: '#10b981' }} />,
      desc: 'Supplying environmentally friendly / green packaging materials.',
      bullets: [
        'Biodegradable, recyclable, and carbon-neutral solutions.',
        'Custom specifications for corporate logistics and cargo needs.'
      ],
      action: 'products',
      actionText: 'View Packaging Suite',
      themeColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.1)'
    },
    {
      num: '03',
      title: 'Supply of Latest Building Materials',
      icon: <HardHat style={{ width: '28px', height: '28px', color: '#2563eb' }} />,
      desc: 'Supplying the latest building materials.',
      bullets: [
        'Premium grade structural concrete, cement, and reinforcement steel.',
        'Direct procurement and container delivery for large development projects.'
      ],
      action: 'products',
      actionText: 'View Building Materials',
      themeColor: '#2563eb',
      badgeBg: 'rgba(37, 99, 235, 0.1)'
    },
    {
      num: '04',
      title: 'Leasing of Uniqix Dragonfly for Mosquito Control',
      icon: <Cpu style={{ width: '28px', height: '28px', color: '#7c3aed' }} />,
      desc: 'Uniqix Dragonfly is an autonomous robot designed to tackle Aedes mosquitoes.',
      bullets: [
        'AI-powered mosquito monitoring & reporting.',
        'Fully autonomous patrol – no manpower required.',
        'Chemical-free and safe for occupied environments.',
        'Operation 24/7 (day and night).'
      ],
      action: 'products',
      actionText: 'Explore Dragonfly Robot',
      themeColor: '#7c3aed',
      badgeBg: 'rgba(124, 58, 237, 0.1)'
    }
  ];

  return (
    <div style={{ color: 'var(--text-primary)', paddingBottom: '6rem' }}>

      {/* Header */}
      <section style={{ padding: '4.5rem 0 3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 800,
            color: 'var(--primary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '0.75rem'
          }}>
            <span style={{ width: '32px', height: '1px', background: 'var(--primary)', opacity: 0.6 }}></span>
            B2B CORE SERVICES
            <span style={{ width: '32px', height: '1px', background: 'var(--primary)', opacity: 0.6 }}></span>
          </span>
          <h1 style={{ fontSize: '3.6rem', fontWeight: 900, margin: '0.5rem 0 1.25rem 0', letterSpacing: '-0.02em', fontFamily: "'Times New Roman', Georgia, serif" }}>
            Products & Services Aggregation
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.7' }}>
            Uniqix specializes in source procurement, credit facilitation, and compliance management for enterprise operations.
          </p>
        </div>
      </section>

      {/* Services Grid (Dorms, Packaging, Materials, Dragonfly) */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container services-grid">
          {(dbServices.length > 0 ? dbServices : servicesList).map((service, idx) => {
            const isHovered = hoveredCard === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '2.5rem 2rem 2rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  background: isHovered ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                  border: '1px solid var(--border-glass)',
                  borderBottom: `4px solid ${service.themeColor}`,
                  borderRadius: '1.5rem',
                  boxShadow: isHovered ? 'var(--card-hover-shadow)' : '0 8px 30px rgba(0,0,0,0.02)',
                  borderColor: isHovered ? 'var(--card-hover-border)' : 'var(--border-glass)',
                  transform: isHovered ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div>
                  {/* Card Badge Number */}
                  <span style={{
                    position: 'absolute',
                    top: '2rem',
                    right: '2rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: service.themeColor,
                    background: service.badgeBg,
                    padding: '4px 10px',
                    borderRadius: '8px'
                  }}>
                    {service.num}
                  </span>

                  {/* Circular Icon Wrapper */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    border: '1px solid rgba(197, 160, 89, 0.15)',
                    boxShadow: '0 6px 16px rgba(197, 160, 89, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2rem'
                  }}>
                    {getServiceIcon(service.num, service.themeColor)}
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Times New Roman', Georgia, serif", minHeight: '3.2rem', display: 'flex', alignItems: 'center' }}>
                    {service.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', minHeight: '4.8rem' }}>
                    {service.desc}
                  </p>

                  {/* Divider line */}
                  <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', margin: '1.5rem 0' }}></div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {service.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                        <div style={{
                          width: '18px',
                          height: '18px',
                          borderRadius: '50%',
                          background: '#D4A72C',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          <Check style={{ width: '11px', height: '11px', color: '#ffffff', strokeWidth: 3 }} />
                        </div>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow Action Link */}
                <div
                  onClick={() => setCurrentPage(service.action)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--primary)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    transition: 'gap 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
                >
                  <span>{service.actionText}</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* International Trade Deep-Dive Card */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              padding: '4rem',
              borderRadius: '2rem',
              background: 'var(--footer-bg)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderTop: '4px solid var(--primary)',
              boxShadow: isTradeHovered ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
              borderColor: isTradeHovered ? 'var(--card-hover-border)' : 'rgba(255, 255, 255, 0.05)',
              transform: isTradeHovered ? 'translateY(-6px)' : 'none',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={() => setIsTradeHovered(true)}
            onMouseLeave={() => setIsTradeHovered(false)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '4rem' }} className="bridge-layout">

              {/* Left Column: Heading */}
              <div>
                <div style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '12px', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                  <Globe style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
                </div>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  International Trade
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '2.5rem' }}>
                  Uniqix operates as a trusted intermediary mandate and trading partner for physical commodities, bridging producers and industrial buyers globally.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  <a
                    href="https://wa.me/6596262970?text=Hello%20Uniqix%20Trade%20Desk%2C%20I%20would%20like%20to%20inquire%20about%20commodities%20trading."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontWeight: 600,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
                    }}
                  >
                    <Phone style={{ width: '16px', height: '16px' }} />
                    +65 9626 2970
                  </a>
                  <a
                    href="mailto:Sam@uniqix.com?subject=International%20Trade%20Desk%20Inquiry"
                    className="btn"
                    style={{
                      background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontWeight: 600,
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.75rem',
                      textDecoration: 'none',
                      fontSize: '0.92rem',
                      boxShadow: '0 4px 12px rgba(212, 167, 44, 0.25)'
                    }}
                  >
                    <Mail style={{ width: '16px', height: '16px' }} />
                    Sam@uniqix.com
                  </a>
                </div>
              </div>

              {/* Right Column: Detailed Commodities List */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="bridge-layout">

                {/* Sector 1 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>LNG (Liquefied Natural Gas)</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Intermediary mandate for LNG sellers from Malaysia, Oman, Rotterdam, and Qatar.
                    </p>
                  </div>

                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>Physical Gold</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '0.5rem' }}>
                      <strong>Sellers</strong>: Malaysia, Africa, Indonesia.
                    </p>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      <strong>Buyers</strong>: Hong Kong, Dubai, Singapore.
                    </p>
                  </div>
                </div>

                {/* Sector 2 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>Oil & Gas Products</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Trading of crude oil, diesel, and petroleum products.
                    </p>
                  </div>

                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>Industrial Sands</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Trading of Silica Sand, Sea Sand, and Concreting Sand.
                    </p>
                  </div>

                  <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>Metals & Commodities</h4>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', lineHeight: '1.5' }}>
                      Trading of Copper, Tin, Coal, and other essential base metals.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Support Info Box */}
      <div className="container">
        <div
          className="glass-panel"
          style={{
            padding: '3.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            border: '1px solid var(--border-glass)',
            background: 'var(--bg-glass)',
            boxShadow: isSupportHovered ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
            borderColor: isSupportHovered ? 'var(--card-hover-border)' : 'var(--border-glass)',
            transform: isSupportHovered ? 'translateY(-6px)' : 'none',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setIsSupportHovered(true)}
          onMouseLeave={() => setIsSupportHovered(false)}
        >
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <HelpCircle style={{ width: '48px', height: '48px', color: 'var(--primary)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Require custom specifications or bulk corporate quotes?</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>Our procurement specialists negotiate directly with mines, factories, and operators.</p>
            </div>
          </div>
          <button onClick={() => { setCurrentPage('contact'); scrollTo(0, { top: 0, behavior: 'smooth' }); }} className="btn btn-primary">
            Connect Sourcing Specialist
          </button>
        </div>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 2rem;
        }
        @media (max-width: 1100px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
