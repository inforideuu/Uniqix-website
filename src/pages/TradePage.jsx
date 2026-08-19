import React, { useState } from 'react';
import { 
  Coins, Flame, Layers, ShieldCheck, Globe, TrendingUp, HelpCircle, 
  Search, FileText, Truck, Users, Check, ArrowRight, Shield, Database, 
  ArrowUpRight, Briefcase, BarChart2, ShieldAlert
} from 'lucide-react';

const TradePage = ({ setCurrentPage }) => {
  const [tiltStyles, setTiltStyles] = useState({});
  const [hoveredCardId, setHoveredCardId] = useState(null);

  const handleMouseMove3D = (e, id) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    setTiltStyles(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`,
        boxShadow: 'var(--card-hover-shadow)',
        borderColor: 'var(--card-hover-border)',
        transition: 'transform 0.1s ease'
      }
    }));
    setHoveredCardId(id);
  };

  const handleMouseLeave3D = (id) => {
    setTiltStyles(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }));
    setHoveredCardId(null);
  };

  const goldCapabilities = [
    { title: 'Multi-country trade facilitation', icon: <Globe style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'Regulatory & compliance advisory', icon: <ShieldCheck style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'Custom duty & documentation support', icon: <FileText style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'Risk mitigation strategies', icon: <ShieldAlert style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'Secure escrow & payment solutions', icon: <Shield style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'Market intelligence & insights', icon: <BarChart2 style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'Logistics coordination & tracking', icon: <Truck style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> },
    { title: 'End-to-end transaction support', icon: <Briefcase style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> }
  ];

  return (
    <div style={{ color: 'var(--text-primary)', position: 'relative' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '6rem 0',
        background: 'url("https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        color: '#ffffff'
      }}>
        {/* Dark navy overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(2, 11, 30, 0.9) 0%, rgba(2, 11, 30, 0.6) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            GLOBAL OPPORTUNITIES. SMARTER TRADE.
          </span>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
            International Trade Desk
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
            Connecting businesses across borders with seamless trade solutions, expert guidance and reliable execution.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage('contact')} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Get Started <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>
            <button 
              onClick={() => setCurrentPage('services')} 
              className="btn btn-secondary" 
              style={{ 
                padding: '0.85rem 2rem', 
                background: 'transparent', 
                border: '1px solid rgba(255,255,255,0.3)', 
                color: '#ffffff' 
              }}
            >
              Explore Services
            </button>
          </div>
        </div>
      </section>

      {/* 2. PHYSICAL GOLD SECTION */}
      <section style={{ padding: '5rem 0 3rem 0' }}>
        <div className="container">
          <div className="glass-panel bridge-layout" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1.2fr 1.3fr', 
            gap: '4rem', 
            borderRadius: '2rem', 
            background: 'var(--bg-glass)', 
            border: '1px solid var(--border-glass)',
            boxShadow: 'var(--shadow-glass)',
            overflow: 'hidden',
            position: 'relative'
          }}>
            
            {/* Left Content Column */}
            <div style={{ padding: '3.5rem 0 3.5rem 3.5rem' }} className="responsive-padding-override">
              <div style={{ background: 'var(--primary-glow)', padding: '12px', borderRadius: '12px', width: 'fit-content', marginBottom: '1.5rem' }}>
                <Coins style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Physical Gold
              </h2>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Secure. Transparent. Globally Trusted.
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                We offer end-to-end support for physical gold trade, from sourcing to delivery, with full compliance and trusted logistics.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {[
                  'Sellers & Buyers Verified',
                  'Transparent Pricing',
                  'Secure & Insured Logistics'
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <Check style={{ width: '18px', height: '18px', color: 'var(--primary)', strokeWidth: 3 }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setCurrentPage('contact')} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Request Gold Transaction Procedures <ArrowRight style={{ width: '16px', height: '16px' }} />
              </button>
            </div>

            {/* Right Capabilities Column */}
            <div style={{ padding: '3.5rem 3.5rem 3.5rem 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="responsive-padding-override">
              {/* Gold Bars Top Mask */}
              <div style={{ 
                height: '160px', 
                borderRadius: '1.5rem', 
                overflow: 'hidden', 
                marginBottom: '2rem',
                background: 'url("https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80") center/cover no-repeat',
                border: '1px solid var(--border-glass)'
              }} />

              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                Supporting Capabilities Include:
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }} className="bridge-layout">
                {goldCapabilities.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    <div style={{ marginTop: '2px' }}>{item.icon}</div>
                    <span>{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FOUR COMMODITIES GRID */}
      <section style={{ padding: '2rem 0 4rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          
          {[
            {
              id: 'comm-1',
              title: 'ENG Qualified Natural Gas',
              desc: 'Internationally transferable for LNG offtakes from Malaysia, Gulf, Oman, Rotterdam, and Qatar.',
              icon: <Globe style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
            },
            {
              id: 'comm-2',
              title: 'Oil & Gas Products',
              desc: 'Trading of crude, refined petroleum products, fuel oil, and petrochemicals.',
              icon: <Database style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
            },
            {
              id: 'comm-3',
              title: 'Industrial Sands',
              desc: 'Trading of Silica Sand, Silica Fines, and Carbonate & Kaolin Sands.',
              icon: <Layers style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
            },
            {
              id: 'comm-4',
              title: 'Metals & Commodities',
              desc: 'Trading of Copper, Tin, Coal, and other essential bulk materials.',
              icon: <TrendingUp style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
            }
          ].map((item) => (
            <div 
              key={item.id}
              className="glass-panel" 
              style={{ 
                padding: '2.5rem', 
                borderRadius: '1.5rem', 
                border: '1px solid var(--border-glass)', 
                background: hoveredCardId === item.id ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                minHeight: '260px',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                transition: 'all 0.3s ease',
                ...(hoveredCardId === item.id ? tiltStyles[item.id] : {})
              }}
              onMouseMove={(e) => handleMouseMove3D(e, item.id)}
              onMouseLeave={() => handleMouseLeave3D(item.id)}
            >
              <div>
                <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '10px', width: 'fit-content', marginBottom: '1.5rem', transform: 'translateZ(10px)' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', fontFamily: "'Playfair Display', Georgia, serif", transform: 'translateZ(15px)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', transform: 'translateZ(10px)' }}>
                  {item.desc}
                </p>
              </div>
              <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: 0, marginTop: '1.5rem', transform: 'translateZ(20px)' }}>
                Learn More <ArrowRight style={{ width: '14px', height: '14px' }} />
              </button>
            </div>
          ))}

        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section style={{ padding: '4rem 0 5rem 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ 
            padding: '4rem', 
            borderRadius: '2rem', 
            background: 'var(--footer-bg)', 
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'var(--shadow-glass)',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              WHY CHOOSE US
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '3.5rem', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Key Benefits Across Services
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem 4rem', textAlign: 'left' }} className="bridge-layout">
              {/* Item 1 */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Transparent & Compliant Trade Processes
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Full regulatory adherence and documentation support.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Globe style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Global Network & Market Access
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Connect with trusted partners worldwide.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <TrendingUp style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Efficient & Cost-Effective Solutions
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Optimized processes for better business outcomes.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(255,255,255,0.08)', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                    Trusted by Global Businesses
                  </h4>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                    Long-term partnerships built on reliability.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. READY TO EXPLORE BANNER */}
      <section style={{ padding: '0 0 5rem 0' }}>
        <div className="container">
          <div className="glass-panel bridge-layout" style={{ 
            padding: '2.5rem 3.5rem', 
            borderRadius: '1.5rem', 
            background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.03) 100%)', 
            border: '1px solid var(--border-glass)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--primary-glow)', padding: '12px', borderRadius: '50%' }}>
                <Users style={{ width: '28px', height: '28px', color: 'var(--primary)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Ready to explore trade opportunities?
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
                  Let our experts guide you through a seamless and successful trading journey.
                </p>
              </div>
            </div>
            
            <button onClick={() => setCurrentPage('contact')} className="btn btn-primary" style={{ padding: '0.85rem 2rem', whiteSpace: 'nowrap' }}>
              Contact Trade Coordinator <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .responsive-padding-override {
            padding: 2rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default TradePage;
