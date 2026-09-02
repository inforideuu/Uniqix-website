import React, { useState, useEffect } from 'react';
import {
  Building, ShieldCheck, Globe, Users, Check, ArrowRight, HelpCircle,
  MapPin, Folder, Home, ChevronRight, BarChart2, Shield, Heart, Info, Clock, Download,
  TrendingUp
} from 'lucide-react';

const CaseStudiesPage = ({ setCurrentPage }) => {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [dbCaseStudies, setDbCaseStudies] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/case-studies/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDbCaseStudies(data);
        }
      })
      .catch(err => console.error("Error loading db case studies:", err));
  }, []);

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
          icon: <Building style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
        },
        {
          title: 'Zone 2 – Riverside Healthcare Centre & Peri-Urban',
          desc: 'Implemented smart, data-driven control in and around the healthcare centre, reducing mosquito density and improving patient safety.',
          color: '#3b82f6', // blue
          icon: <Heart style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
        },
        {
          title: 'Community Impact – Why Conventional Methods Failed',
          desc: "Traditional chemical spraying was ineffective in the region's diverse environment. Our autonomous, targeted approach delivered longer-lasting, data-backed results with minimal environmental impact.",
          color: '#f59e0b', // orange
          icon: <Home style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
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
          icon: <Building style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
        },
        {
          title: 'Zone 2 – Perimeter Vegetation & Marshes',
          desc: 'Dense landscape borders identified as primary larval reservoirs, now treated preventively on a scheduled cycle.',
          color: '#3b82f6',
          icon: <Heart style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
        },
        {
          title: 'Strategic Edge – Why Conventional Methods Failed',
          desc: 'Chemical fogging near swimming facilities presents severe health risks and forces facility shutdowns. Dragonfly operates chemical-free and autonomously.',
          color: '#f59e0b',
          icon: <Home style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
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
          icon: <Building style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
        },
        {
          title: 'Zone 2 – Active Sump Pits & Excavations',
          desc: 'Treating temporary water accumulation zones that change layout weekly as construction excavations progress.',
          color: '#3b82f6',
          icon: <Heart style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
        },
        {
          title: 'Tactical Edge – Why Conventional Methods Failed',
          desc: 'Fogging schedules cannot adapt to dynamic construction layouts, leaving pockets of pooled water untreated. Dragonfly adapts via real-time mapping.',
          color: '#f59e0b',
          icon: <Home style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
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

  const sourceList = dbCaseStudies.length > 0 ? dbCaseStudies : caseStudiesData;
  const current = sourceList[activeCaseStudy] || sourceList[0];
  if (!current) return null;

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
            {sourceList.map((cs, idx) => (
              <button
                key={cs.id}
                onClick={() => setActiveCaseStudy(idx)}
                style={{
                  background: activeCaseStudy === idx ? 'var(--primary)' : 'transparent',
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
                {idx === 0 ? <Folder style={{ width: '16px', height: '16px' }} /> : idx === 1 ? <Home style={{ width: '16px', height: '16px' }} /> : <Globe style={{ width: '16px', height: '16px' }} />}
                {cs.title ? `Case ${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1}: ${cs.title.split(' ')[0]}` : `Case ${idx + 1}`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CASE STUDY CONTENT CONTAINER */}
      <section style={{ padding: '4rem 0 3rem 0' }}>
        <div className="container bridge-layout" style={{ display: 'grid', gridTemplateColumns: '1.65fr 1fr', gap: '2rem', alignItems: 'stretch' }}>

          {/* Left Column: Main Case Details Card (Styled like Reference Image) */}
          <div className="glass-panel" style={{
            padding: '3.5rem 3.5rem 3rem 3.5rem',
            borderRadius: '2rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            boxShadow: '0 20px 45px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>

            <div>
              {/* Header Row: Case Label & Category Pill Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#c59a27', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {current.caseNum || `CASE STUDY • 0${activeCaseStudy + 1}`}
                </span>
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#06122c',
                  background: '#ffffff',
                  padding: '6px 18px',
                  borderRadius: '30px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <MapPin style={{ width: '14px', height: '14px', color: '#c59a27' }} /> {current.badge || 'Pest Control | Urban Health'}
                </span>
              </div>

              {/* Title & Subtitle */}
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '0.4rem', color: '#06122c', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: 1.15 }}>
                {current.title}
              </h2>
              <h4 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#475569', marginBottom: '0.85rem', lineHeight: '1.4' }}>
                {current.subtitle}
              </h4>

              {/* Gold Accent Bar */}
              <div style={{ width: '65px', height: '3.5px', background: 'linear-gradient(90deg, #d4a72c 0%, #e6ae46 100%)', borderRadius: '2px', marginBottom: '2.25rem' }} />

              {/* Stacked Zone Cards (3 Light Cream Cards) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
                {current.zones.map((zone, zIdx) => {
                  const isHovered = hoveredZoneCard === zIdx;
                  return (
                    <div
                      key={zIdx}
                      style={{
                        padding: '1.5rem 1.75rem',
                        borderRadius: '1.25rem',
                        background: '#faf8f5',
                        border: isHovered ? '1px solid #d4a72c' : '1px solid #efe9dc',
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'flex-start',
                        boxShadow: isHovered ? '0 10px 25px rgba(212, 167, 44, 0.12)' : 'none',
                        transform: isHovered ? 'translateY(-3px)' : 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={() => setHoveredZoneCard(zIdx)}
                      onMouseLeave={() => setHoveredZoneCard(null)}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: '#f7f0e3',
                        border: '1px solid #efe9dc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}>
                        {zone.icon || (zIdx === 0 ? <Building style={{ width: '22px', height: '22px', color: '#c59a27' }} /> : zIdx === 1 ? <Heart style={{ width: '22px', height: '22px', color: '#c59a27' }} /> : <Home style={{ width: '22px', height: '22px', color: '#c59a27' }} />)}
                      </div>
                      <div>
                        <h5 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#06122c', marginBottom: '0.35rem' }}>
                          {zone.title}
                        </h5>
                        <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.55', margin: 0 }}>
                          {zone.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* The Result Card (Gold Glowing Card at Bottom) */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRadius: '1.25rem',
              background: 'linear-gradient(180deg, #fffdf8 0%, #faf4e8 100%)',
              border: '1.5px solid #d4a72c',
              boxShadow: '0 15px 35px rgba(212, 167, 44, 0.22), 0 4px 15px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'flex-start',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Subtle Dot Pattern Overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '140px',
                backgroundImage: 'radial-gradient(#d4a72c 1px, transparent 1px)',
                backgroundSize: '10px 10px',
                opacity: 0.15,
                pointerEvents: 'none'
              }} />

              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4a72c 0%, #b58a20 100%)',
                boxShadow: '0 6px 15px rgba(212, 167, 44, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <TrendingUp style={{ width: '22px', height: '22px', color: '#ffffff' }} />
              </div>
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h5 style={{ fontSize: '1.08rem', fontWeight: 900, color: '#06122c', marginBottom: '0.35rem' }}>
                  The Result
                </h5>
                <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.55', margin: 0 }}>
                  {current.result}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: 4 Stacked Cards matching reference image */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '1.25rem' }}>

            {/* Card 1: Metrics Card (Light Mode Theme) */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRadius: '1.25rem',
              background: 'linear-gradient(180deg, #ffffff 0%, #faf8f5 100%)',
              border: '1px solid #efe9dc',
              boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Decorative Background Waves */}
              <div style={{
                position: 'absolute',
                right: '-20px',
                bottom: '-20px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '20px solid rgba(212, 167, 44, 0.05)',
                pointerEvents: 'none'
              }} />

              <h5 style={{ fontSize: '0.76rem', fontWeight: 800, color: '#c59a27', marginBottom: '1.35rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {current.metricsTitle || 'JUST 14 DAYS – A MEASURABLE SHIFT'}
              </h5>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {current.metrics.map((metric, mIdx) => (
                  <div key={mIdx} style={{ display: 'flex', alignItems: 'center', gap: '1.1rem' }}>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: '#e6f7f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {mIdx === 0 ? <ArrowRight style={{ width: '18px', height: '18px', color: '#10b981', transform: 'rotate(90deg)' }} /> : mIdx === 1 ? <ShieldCheck style={{ width: '18px', height: '18px', color: '#10b981' }} /> : <Clock style={{ width: '18px', height: '18px', color: '#10b981' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '1.65rem', fontWeight: 900, color: '#06122c', lineHeight: 1 }}>
                        {metric.val}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#475569', marginTop: '3px', fontWeight: 500 }}>
                        {metric.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Quote Card (Dark Navy Theme) */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRadius: '1.25rem',
              background: '#030d22',
              color: '#ffffff',
              boxShadow: '0 12px 30px rgba(3, 13, 34, 0.15)',
              position: 'relative'
            }}>
              <span style={{ fontSize: '2.5rem', color: '#d4a72c', lineHeight: '0', display: 'block', margin: '0.25rem 0 0.5rem 0', fontFamily: 'serif' }}>“</span>
              <blockquote style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', lineHeight: '1.45', marginBottom: '0.85rem', marginTop: 0 }}>
                {current.quote}
              </blockquote>
              <cite style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.7)', fontStyle: 'normal', fontWeight: 600 }}>
                {current.author}
              </cite>
            </div>

            {/* Card 3: Key Outcomes Card (Light Mode Theme) */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRadius: '1.25rem',
              background: '#faf8f5',
              border: '1px solid #efe9dc',
              boxShadow: '0 10px 25px rgba(0,0,0,0.03)'
            }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06122c', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Key Outcomes
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {current.outcomes.map((outcome, oIdx) => (
                  <div key={oIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#475569' }}>
                    <ShieldCheck style={{ width: '18px', height: '18px', color: '#d4a72c', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600 }}>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 4: Deployment Telemetry Card (Dark Navy Theme with Gold Button) */}
            <div style={{
              padding: '1.75rem 2rem',
              borderRadius: '1.25rem',
              background: '#030d22',
              border: '1px solid rgba(212, 167, 44, 0.35)',
              boxShadow: '0 15px 35px rgba(3, 13, 34, 0.2)',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Ambient Radial Glow */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212, 167, 44, 0.3) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              {/* Header Status Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    display: 'inline-block'
                  }} />
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#10b981', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    DEPLOYMENT TELEMETRY
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
                  LIVE AUDIT
                </span>
              </div>

              {/* Title & Subtitle */}
              <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.4rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Field Verified Performance
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: '1.45', marginBottom: '1.25rem' }}>
                Our autonomous vector platforms feature end-to-end auditability with NEA &amp; ISO compliance tracking.
              </p>

              {/* 3 Metric Badges Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', padding: '8px 4px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#d4a72c' }}>99.8%</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px', fontWeight: 600 }}>Precision</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', padding: '8px 4px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#10b981' }}>0.00%</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px', fontWeight: 600 }}>Waste</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', padding: '8px 4px', textAlign: 'center', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#38bdf8' }}>24/7</div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px', fontWeight: 600 }}>GPS Track</div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setCurrentPage('contact')}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #d4a72c 0%, #b58a20 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 6px 16px rgba(212, 167, 44, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 10px 24px rgba(212, 167, 44, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 167, 44, 0.3)';
                }}
              >
                <span>Request Detailed Audit Report</span>
              </button>
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

            <button onClick={() => {setCurrentPage('contact');
                      window.scrollTo({top:0,behavior:'smooth'})
                    }} className="btn btn-primary" style={{ padding: '0.85rem 2rem', whiteSpace: 'nowrap' }}>
              Contact Technical Team <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudiesPage;
