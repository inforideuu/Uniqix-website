import React, { useState } from 'react';
import { 
  Building, ShieldCheck, Globe, Users, Check, ArrowRight, HelpCircle, 
  MapPin, Folder, Home, ChevronRight, BarChart2, Shield, Heart, Info, Clock, Download,
  TrendingUp
} from 'lucide-react';

const CaseStudiesPage = ({ setCurrentPage }) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  // Hover and tilt states
  const [hoveredZoneCard, setHoveredZoneCard] = useState(null);
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

  // Content configuration for the 3 case studies matching the mockup's structure
  const caseStudiesData = [
    {
      id: 0,
      badge: 'Pest Control | Urban Health',
      caseNum: 'CASE STUDY • 01',
      title: 'District-Wide Deployment',
      subtitle: 'Autonomous Mosquito Control for Healthier Communities',
      zones: [
        {
          title: 'Zone 1 – Central City, Terrasex',
          desc: 'Deployed autonomous mosquito control units across 12 km² of urban area, targeting high-breeding zones and public health hotspots.',
          color: '#10b981', // green
          icon: <Building style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        },
        {
          title: 'Zone 2 – Riverside Healthcare Centre & Peri-Urban',
          desc: 'Implemented smart, data-driven control in and around the healthcare centre, reducing mosquito density and improving patient safety.',
          color: '#3b82f6', // blue
          icon: <Heart style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        },
        {
          title: 'Community Impact – Why Conventional Methods Failed',
          desc: "Traditional chemical spraying was ineffective in the region's diverse environment. Our autonomous, targeted approach delivered longer-lasting, data-backed results with minimal environmental impact.",
          color: '#f59e0b', // orange
          icon: <Home style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        }
      ],
      result: 'Choosing Dragonfly was the right approach as it could operate safely in and around the diverse set of areas, without needing to evacuate, and with data trends for better decision making.',
      metricsTitle: 'JUST 14 DAYS – A MEASURABLE SHIFT',
      metrics: [
        { val: '68%', label: 'Reduction in mosquito nuisance', icon: <ArrowRight style={{ width: '18px', height: '18px', color: '#10b981', transform: 'rotate(90deg)' }} />, bg: '#e8f7f2' },
        { val: '100%', label: 'Operational safety record', icon: <Shield style={{ width: '18px', height: '18px', color: '#10b981' }} />, bg: '#e8f7f2' },
        { val: '14 Hours', label: 'Daily operation', icon: <Clock style={{ width: '18px', height: '18px', color: '#10b981' }} />, bg: '#e8f7f2' }
      ],
      quote: '“I would deploy in every place to reduce dengue using this robot.”',
      author: '— Technocrat, PCEO',
      outcomes: [
        'Healthier communities',
        'Lower environmental impact',
        'More efficient resource use',
        'Scalable & sustainable model'
      ]
    },
    {
      id: 1,
      badge: 'Recreational Parks | Public Space',
      caseNum: 'CASE STUDY • 02',
      title: 'Aqua Adventure Deployment',
      subtitle: 'Safety-First Vector Control in High-Traffic Water Parks',
      zones: [
        {
          title: 'Zone 1 – Active Pool & Splash Areas',
          desc: 'Coordinating automated flights near water rides and swimming pools without causing spray drift or guest evacuations.',
          color: '#10b981',
          icon: <Building style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        },
        {
          title: 'Zone 2 – Perimeter Vegetation & Marshes',
          desc: 'Dense landscape borders identified as primary larval reservoirs, now treated preventively on a scheduled cycle.',
          color: '#3b82f6',
          icon: <Heart style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        },
        {
          title: 'Strategic Edge – Why Conventional Methods Failed',
          desc: 'Chemical fogging near swimming facilities presents severe health risks and forces facility shutdowns. Dragonfly operates chemical-free and autonomously.',
          color: '#f59e0b',
          icon: <Home style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        }
      ],
      result: 'Dragonfly provided zero-downtime mosquito control, maintaining visitor comfort and eliminating chemical runoff into pool systems.',
      metricsTitle: '3 MONTHS OF DEPLOYMENT: TO ZERO',
      metrics: [
        { val: '100%', label: 'Reduction in trap captures', icon: <ArrowRight style={{ width: '18px', height: '18px', color: '#10b981', transform: 'rotate(90deg)' }} />, bg: '#e8f7f2' },
        { val: '100%', label: 'Autonomous flight safety', icon: <Shield style={{ width: '18px', height: '18px', color: '#10b981' }} />, bg: '#e8f7f2' },
        { val: '14 Hours', label: 'Daily operation', icon: <Clock style={{ width: '18px', height: '18px', color: '#10b981' }} />, bg: '#e8f7f2' }
      ],
      quote: '“Lesser mosquitoes in the facility and around the facility.”',
      author: '— Team Lead, Aqua Adventure',
      outcomes: [
        'Safe recreational spaces',
        'Zero chemical drift into water',
        'Continuous business operations',
        'Data-vetted breeding maps'
      ]
    },
    {
      id: 2,
      badge: 'Infrastructure | Heavy Industry',
      caseNum: 'CASE STUDY • 03',
      title: 'EGH Construction Project',
      subtitle: 'Preventive Larval Mitigation for Heavy Infrastructure Sites',
      zones: [
        {
          title: 'Zone 1 – Workers Rest & Congregation Areas',
          desc: 'Non-PPE designated spaces treated daily to secure workforce welfare and prevent site-borne dengue outbreaks.',
          color: '#10b981',
          icon: <Building style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        },
        {
          title: 'Zone 2 – Active Sump Pits & Excavations',
          desc: 'Treating temporary water accumulation zones that change layout weekly as construction excavations progress.',
          color: '#3b82f6',
          icon: <Heart style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        },
        {
          title: 'Tactical Edge – Why Conventional Methods Failed',
          desc: 'Fogging schedules cannot adapt to dynamic construction layouts, leaving pockets of pooled water untreated. Dragonfly adapts via real-time mapping.',
          color: '#f59e0b',
          icon: <Home style={{ width: '22px', height: '22px', color: '#c5a059' }} />
        }
      ],
      result: 'Dragonfly operated seamlessly alongside cranes and heavy vehicles, safeguarding workers and keeping the project on schedule.',
      metricsTitle: '1 MONTH: PREVENTIVE CONTROL',
      metrics: [
        { val: '85%', label: 'Larvae reduction in sumps', icon: <ArrowRight style={{ width: '18px', height: '18px', color: '#10b981', transform: 'rotate(90deg)' }} />, bg: '#e8f7f2' },
        { val: '100%', label: 'Workspace protection', icon: <Shield style={{ width: '18px', height: '18px', color: '#10b981' }} />, bg: '#e8f7f2' },
        { val: '24/7', label: 'Active protection monitoring', icon: <Clock style={{ width: '18px', height: '18px', color: '#10b981' }} />, bg: '#e8f7f2' }
      ],
      quote: '“Autonomous mosquito control operates daily without halting crane movements.”',
      author: '— HSE Director, EGH Project',
      outcomes: [
        'Zero project downtime',
        'Vetted safety audits',
        'Dynamic site mapping',
        'Workforce health assurance'
      ]
    }
  ];

  const current = caseStudiesData[activeCaseStudy] || caseStudiesData[0];
  if (!current) return null;

  return (
    <div style={{ color: 'var(--text-primary)', position: 'relative' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        minHeight: '75vh', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '6rem 0',
        background: 'url("https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        color: '#ffffff'
      }}>
        {/* Dark navy grid overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(2, 11, 30, 0.92) 0%, rgba(2, 11, 30, 0.7) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            REAL-WORLD IMPACT
          </span>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Dragonfly Case Studies
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem auto' }}>
            Explore real-world data and deployment results from our autonomous robotic mosquito control operations.
          </p>

          {/* Interactive Toggle Pills */}
          <div style={{
            display: 'inline-flex',
            gap: '0.75rem',
            background: 'rgba(15, 23, 42, 0.75)',
            padding: '6px',
            borderRadius: '30px',
            border: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setActiveCaseStudy(0)}
              style={{
                background: activeCaseStudy === 0 ? 'var(--primary)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Folder style={{ width: '16px', height: '16px' }} /> Case 01: PDD District
            </button>
            <button
              onClick={() => setActiveCaseStudy(1)}
              style={{
                background: activeCaseStudy === 1 ? 'var(--primary)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Home style={{ width: '16px', height: '16px' }} /> Case 02: HomeTeamNS
            </button>
            <button
              onClick={() => setActiveCaseStudy(2)}
              style={{
                background: activeCaseStudy === 2 ? 'var(--primary)' : 'transparent',
                border: 'none',
                color: '#ffffff',
                padding: '12px 24px',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Globe style={{ width: '16px', height: '16px' }} /> Case 03: EGH Project
            </button>
          </div>
        </div>
      </section>

      {/* 2. CASE STUDY CONTENT CONTAINER */}
      <section style={{ padding: '5rem 0 3rem 0' }}>
        <div className="container bridge-layout" style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '2.5rem' }}>
          
          {/* Left Column: Case Details Card */}
          <div className="glass-panel" style={{ padding: '4rem', borderRadius: '2rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>{current.caseNum}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', background: 'var(--bg-primary)', padding: '6px 14px', borderRadius: '30px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin style={{ width: '14px', height: '14px', color: 'var(--primary)' }} /> {current.badge}
              </span>
            </div>

            <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>
              {current.title}
            </h2>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              {current.subtitle}
            </h4>

            {/* Stacked Cards for Zones */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              {current.zones.map((zone, zIdx) => {
                const isHovered = hoveredZoneCard === zIdx;
                return (
                  <div 
                    key={zIdx} 
                    style={{ 
                      padding: '1.75rem', 
                      borderRadius: '1rem', 
                      background: isHovered ? '#ffffff' : 'rgba(0,0,0,0.01)', 
                      border: '1px solid var(--border-glass)',
                      borderLeft: `4px solid ${zone.color}`,
                      display: 'flex',
                      gap: '1.25rem',
                      alignItems: 'flex-start',
                      boxShadow: isHovered ? 'var(--card-hover-shadow)' : 'none',
                      borderColor: isHovered ? 'var(--card-hover-border)' : 'var(--border-glass)',
                      transform: isHovered ? 'translateY(-4px)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredZoneCard(zIdx)}
                    onMouseLeave={() => setHoveredZoneCard(null)}
                  >
                    <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '10px', marginTop: '2px' }}>
                      {zone.icon}
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: isHovered ? '#06122c' : 'var(--text-primary)', marginBottom: '0.5rem', transition: 'color 0.3s' }}>
                        {zone.title}
                      </h5>
                      <p style={{ fontSize: '0.9rem', color: isHovered ? '#475569' : 'var(--text-secondary)', lineHeight: '1.6', margin: 0, transition: 'color 0.3s' }}>
                        {zone.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* The Result Card */}
            <div style={{ 
              padding: '2rem', 
              borderRadius: '1.25rem', 
              background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.03) 100%)',
              border: '1px solid var(--border-glass)',
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start'
            }}>
              <div style={{ background: 'var(--primary-glow)', padding: '10px', borderRadius: '10px' }}>
                <TrendingUp style={{ width: '22px', height: '22px', color: 'var(--primary)' }} />
              </div>
              <div>
                <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  The Result
                </h5>
                <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {current.result}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Metrics, Quote & Outcomes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Card 1: Metrics */}
            <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.5rem', background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.08) 0%, rgba(197, 160, 89, 0.03) 100%)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
              <h5 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '2rem', letterSpacing: '0.05em' }}>
                {current.metricsTitle}
              </h5>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {current.metrics.map((metric, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ background: '#ffffff', padding: '10px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {metric.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>
                        {metric.val}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {metric.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Quote */}
            <div style={{ padding: '3rem 2.5rem', borderRadius: '1.5rem', background: 'var(--footer-bg)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
              <span style={{ fontSize: '4rem', color: 'var(--primary)', lineHeight: '0', display: 'block', margin: '0.5rem 0', fontFamily: 'serif' }}>“</span>
              <blockquote style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: '1.5', marginBottom: '1.5rem', marginTop: 0 }}>
                {current.quote}
              </blockquote>
              <cite style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'normal', fontWeight: 600 }}>
                {current.author}
              </cite>
            </div>

            {/* Card 3: Key Outcomes */}
            <div 
              className="glass-panel" 
              style={{ 
                padding: '2.5rem', 
                borderRadius: '1.5rem', 
                background: 'var(--bg-glass)', 
                border: '1px solid var(--border-glass)', 
                boxShadow: 'var(--shadow-glass)',
                cursor: 'pointer',
                transformStyle: 'preserve-3d',
                transition: 'all 0.3s ease',
                ...(hoveredCardId === 'key-outcomes' ? tiltStyles['key-outcomes'] : {})
              }}
              onMouseMove={(e) => handleMouseMove3D(e, 'key-outcomes')}
              onMouseLeave={() => handleMouseLeave3D('key-outcomes')}
            >
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem', transform: 'translateZ(15px)' }}>
                Key Outcomes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', transform: 'translateZ(10px)' }}>
                {current.outcomes.map((outcome, oIdx) => (
                  <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <ShieldCheck style={{ width: '18px', height: '18px', color: 'var(--primary)' }} />
                    <span style={{ fontWeight: 600 }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. BOTTOM BANNER */}
      <section style={{ padding: '2rem 0 6rem 0' }}>
        <div className="container">
          <div className="glass-panel bridge-layout" style={{ 
            padding: '4rem', 
            borderRadius: '2rem', 
            background: 'var(--footer-bg)', 
            border: '1px solid rgba(255,255,255,0.05)', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            color: '#ffffff'
          }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <Globe style={{ width: '48px', height: '48px', color: 'var(--primary)', flexShrink: 0 }} />
              <div>
                <h4 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Interested in our case studies or technical papers?
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.98rem', margin: 0 }}>
                  We share deep insights, field data and lessons learned from our autonomous solutions.
                </p>
              </div>
            </div>
            
            <button onClick={() => setCurrentPage('contact')} className="btn btn-primary" style={{ padding: '0.85rem 2rem', whiteSpace: 'nowrap' }}>
              Contact Technical Team <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudiesPage;
