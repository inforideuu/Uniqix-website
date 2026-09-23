import React, { useState, useRef, useEffect } from 'react';
import {
  Coins, Flame, Layers, ShieldCheck, Globe, TrendingUp, HelpCircle,
  Search, FileText, Truck, Users, Check, ArrowRight, Shield, Database,
  ArrowUpRight, Briefcase, BarChart2, ShieldAlert, Phone, Mail, Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles, Eye
} from 'lucide-react';

const TradePage = ({ setCurrentPage }) => {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [activeModalMedia, setActiveModalMedia] = useState(null);
  const videoRef = useRef(null);

  // Live price animated state with micro-fluctuations
  const [goldPrice, setGoldPrice] = useState(3329.45);
  const [goldChange, setGoldChange] = useState(18.32);
  const [goldChangePct, setGoldChangePct] = useState(0.55);
  const [goldFlash, setGoldFlash] = useState(null); // 'up' or 'down'

  const [silverPrice, setSilverPrice] = useState(38.76);
  const [silverChange, setSilverChange] = useState(0.62);
  const [silverChangePct, setSilverChangePct] = useState(1.63);
  const [silverFlash, setSilverFlash] = useState(null); // 'up' or 'down'

  useEffect(() => {
    const interval = setInterval(() => {
      // Small random fluctuation simulation
      const goldDelta = (Math.random() - 0.48) * 0.85;
      const silverDelta = (Math.random() - 0.48) * 0.08;

      if (Math.abs(goldDelta) > 0.05) {
        setGoldPrice(prev => {
          const next = Number((prev + goldDelta).toFixed(2));
          setGoldFlash(goldDelta > 0 ? 'up' : 'down');
          setTimeout(() => setGoldFlash(null), 800);
          return next;
        });
      }

      if (Math.abs(silverDelta) > 0.01) {
        setSilverPrice(prev => {
          const next = Number((prev + silverDelta).toFixed(2));
          setSilverFlash(silverDelta > 0 ? 'up' : 'down');
          setTimeout(() => setSilverFlash(null), 800);
          return next;
        });
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const tradeServices = [
    {
      id: 'lng',
      num: '01',
      title: 'Intermediary Mandate for LNG Sellers and Buyers',
      subtitle: 'Energy & LNG Offtakes',
      desc: (
        <span>
          We act as a trusted intermediary for Liquefied Natural Gas (LNG) transactions. Our mandate services support both sellers and buyers by facilitating <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>deal structuring</strong>, <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>counterparty matching</strong>, <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>documentation coordination</strong>, and transaction support throughout the process. We help bridge reputable producers, traders, and end-users while maintaining confidentiality and professional standards.
        </span>
      ),
      items: [],
      icon: <Flame style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
      bgImage: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'gold',
      num: '02',
      title: 'Intermediary Mandate for Physical Gold Trading',
      subtitle: 'Precious Metals Trade',
      desc: (
        <span>
          Uniqix offers intermediary mandate services for physical gold trading serving both sellers and buyers. Our role focuses on connecting legitimate parties, supporting <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>due diligence processes</strong>, and assisting with the <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>smooth execution</strong> of physical gold transactions under clear mandate arrangements.
        </span>
      ),
      items: [
        '999.9 Fine Gold Bars (1g, 50g, 100g, 500g, 1kg)',
        '999.9 Fine Silver Bars (1g, 1kg)',
        'Wholesale Bulk Orders (Min. 1 Kilogram)',
        'Cast & Minted 999.9 Pure Gold (AU)',
        'Fire Assay & XRF 999.9 Certified'
      ],
      icon: <Coins style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
      bgImage: '/gold1.png'
    },
    {
      id: 'sand',
      num: '03',
      title: 'Trading of High-Grade Silica Sand, Concreting Sand and Reclamation Sand',
      subtitle: 'Industrial Minerals Sourcing',
      desc: (
        <span>
          We trade and source high-quality industrial sands to meet construction, manufacturing, and infrastructure requirements. These materials are supplied for applications ranging from <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>concrete production</strong> and foundry use to <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>land reclamation</strong> and industrial processes, with attention to grade specifications and consistent quality.
        </span>
      ),
      items: ['High-grade silica sand', 'Concreting sand', 'Reclamation sand'],
      icon: <Layers style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
      bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'commodities',
      num: '04',
      title: 'Trading in Physical Commodities',
      subtitle: 'Bulk Materials & Logistics',
      desc: (
        <span>
          Uniqix engages in the trading of key physical commodities. We facilitate bulk commodity transactions by linking producers, suppliers, and industrial buyers, supporting <strong style={{ color: '#D4A72C', fontWeight: 'bold' }}>efficient and transparent trade flows</strong> in the metals and energy-related markets.
        </span>
      ),
      items: ['Steam coal', 'Copper', 'Tin', 'Aluminum', 'Other metals'],
      icon: <TrendingUp style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
      bgImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  const activeService = tradeServices[activeServiceIdx];

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
        background: 'url("https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80") center/cover no-repeat',
        color: '#ffffff'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(2, 11, 30, 0.95) 0%, rgba(2, 11, 30, 0.75) 100%)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>
            GLOBAL REACH. TRUSTED SOLUTIONS.
          </span>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.02em', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: '1.15' }}>
            Uniqix International Trade
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.2rem', lineHeight: '1.75', marginBottom: '2.5rem', maxWidth: '780px', margin: '0 auto' }}>
            Uniqix International Trade provides professional intermediary and trading services across energy, precious metals, industrial minerals, and bulk commodities. We connect verified sellers and buyers worldwide with reliable, compliant, and efficient solutions.
          </p>
        </div>
      </section>

      {/* 2. CREATIVE SPLIT SECTION */}      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>EXPLORE OUR PORTFOLIO</span>
              <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', margin: '0.5rem 0 1rem 0' }}>
              Core Mandates & Trading Desks
            </h2>
            <div style={{ width: '60px', height: '3px', background: '#D4A72C', margin: '0 auto', borderRadius: '2px' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3.5rem', alignItems: 'stretch' }} className="responsive-split-grid">

            {/* Left Nav Column with Timeline Line */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Timeline Line */}
              <div style={{
                position: 'absolute',
                top: '35px',
                bottom: '35px',
                left: '20px',
                width: '2px',
                background: 'linear-gradient(to bottom, #D4A72C 0%, rgba(197, 160, 89, 0.4) 50%, #D4A72C 100%)',
                zIndex: 1
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', gap: '1.25rem', paddingLeft: '0' }}>
                {tradeServices.map((service, idx) => (
                  <div key={service.id} style={{ display: 'flex', alignItems: 'center', position: 'relative', flex: 1 }}>

                    {/* Glowing Timeline Dot */}
                    <div style={{
                      position: 'absolute',
                      left: '20px',
                      width: activeServiceIdx === idx ? '13px' : '9px',
                      height: activeServiceIdx === idx ? '13px' : '9px',
                      borderRadius: '50%',
                      background: activeServiceIdx === idx ? '#D4A72C' : '#e0c080',
                      border: '2px solid #ffffff',
                      boxShadow: activeServiceIdx === idx ? '0 0 12px #D4A72C, 0 0 20px rgba(197, 160, 89, 0.6)' : '0 0 6px rgba(197, 160, 89, 0.3)',
                      zIndex: 2,
                      transform: 'translateX(-50%)',
                      transition: 'all 0.3s ease'
                    }} />

                    {/* Navigation Card */}
                    <div
                      onClick={() => setActiveServiceIdx(idx)}
                      className={"glass-panel trade-portfolio-tab " + (activeServiceIdx === idx ? "active" : "")}
                      style={{
                        marginLeft: '3.25rem',
                        flex: 1,
                        padding: '1.4rem 1.75rem',
                        borderRadius: '1.25rem',
                        cursor: 'pointer',
                        border: activeServiceIdx === idx
                          ? '2px solid #D4A72C'
                          : '1px solid rgba(212, 167, 44, 0.25)',
                        borderLeft: activeServiceIdx === idx
                          ? '5px solid #D4A72C'
                          : '1px solid rgba(212, 167, 44, 0.25)',
                        background: activeServiceIdx === idx
                          ? 'var(--tab-active-bg, linear-gradient(135deg, #FFFDF8 0%, #FAF0D8 100%))'
                          : 'var(--tab-inactive-bg, rgba(255, 255, 255, 0.94))',
                        boxShadow: activeServiceIdx === idx ? '0 12px 30px rgba(212, 167, 44, 0.25)' : '0 4px 15px rgba(0,0,0,0.03)',
                        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Left Number Badge */}
                      <div style={{
                        width: '56px',
                        height: '44px',
                        borderRadius: '10px',
                        background: activeServiceIdx === idx
                          ? 'linear-gradient(135deg, #D4A72C 0%, #b45309 100%)'
                          : 'rgba(197, 160, 89, 0.15)',
                        border: activeServiceIdx === idx ? 'none' : '1px solid rgba(197, 160, 89, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: activeServiceIdx === idx ? '#ffffff' : '#D4A72C',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}>
                        {service.num}
                      </div>

                      {/* Title Content */}
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#b45309', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem', letterSpacing: '0.08em' }}>
                          {service.subtitle}
                        </span>
                        <h4 style={{
                          fontSize: '1.08rem',
                          fontWeight: 800,
                          margin: 0,
                          color: activeServiceIdx === idx ? '#0f172a' : 'var(--text-primary)',
                          lineHeight: '1.35'
                        }}>
                          {service.title.split(' for ').pop().split(' of ').pop()}
                        </h4>
                      </div>

                      {/* Action Arrow Icon Button */}
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: activeServiceIdx === idx ? 'linear-gradient(135deg, #D4A72C 0%, #b45309 100%)' : 'rgba(197, 160, 89, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                        transform: activeServiceIdx === idx ? 'translateX(3px)' : 'none'
                      }}>
                        <ArrowRight style={{
                          width: '16px',
                          height: '16px',
                          color: activeServiceIdx === idx ? '#ffffff' : '#D4A72C'
                        }} />
                      </div>

                      {/* Triangle Pointer pointing to Details Panel */}
                      {activeServiceIdx === idx && (
                        <div style={{
                          position: 'absolute',
                          right: '-16px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '0',
                          height: '0',
                          borderTop: '10px solid transparent',
                          borderBottom: '10px solid transparent',
                          borderLeft: '16px solid #FFFDF7',
                          zIndex: 3
                        }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Details Panel Column */}
            <div className="trade-details-panel" style={{
              borderRadius: '2rem',
              border: '2.5px solid #D4A72C',
              background: 'linear-gradient(90deg, #FFFDF8 0%, #FFF9E6 35%, rgba(255, 255, 255, 0.75) 55%, rgba(255, 255, 255, 0.25) 80%, transparent 100%), url("' + activeService.bgImage + '") center right/cover no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '520px',
              padding: '4rem',
              boxShadow: '0 25px 60px rgba(212, 167, 44, 0.25), 0 5px 20px rgba(0, 0, 0, 0.04)',
              color: '#1e293b'
            }}>
              {/* Giant watermarked number in top-right */}
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '40px',
                fontSize: '6.5rem',
                fontWeight: 900,
                color: 'rgba(212, 167, 44, 0.15)',
                fontFamily: "'Playfair Display', Georgia, serif",
                userSelect: 'none',
                zIndex: 0
              }}>
                {activeService.num}
              </div>

              <div style={{ position: 'relative', zIndex: 1, maxWidth: '90%' }} key={activeService.id} className="fade-in-slide">
                {/* Gold-bordered icon square badge */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #FFFDF8 0%, #F5E8C8 100%)',
                  border: '2px solid #D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2.5rem',
                  boxShadow: '0 6px 16px rgba(212, 167, 44, 0.25)'
                }}>
                  {React.cloneElement(activeService.icon, { style: { width: '28px', height: '28px', color: '#b45309' } })}
                </div>

                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#b45309', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  {activeService.subtitle}
                </span>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '1.75rem', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: '1.25' }}>
                  {activeService.title}
                </h3>

                {/* Thin gold decorative divider line */}
                <div style={{ width: '80px', height: '2px', background: 'linear-gradient(90deg, #D4A72C 0%, #b45309 100%)', marginBottom: '2rem', borderRadius: '1px' }} />

                <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2.5rem', fontWeight: 500 }}>
                  {activeService.desc}
                </p>

                {activeService.items.length > 0 && (
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: '#b45309', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                      Key Products & Portfolio:
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {activeService.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: '#334155', fontWeight: 600 }}>
                          <Check style={{ width: '16px', height: '16px', color: '#b45309', strokeWidth: 3 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button / Direct Contact Info at bottom left */}
              <div style={{ position: 'relative', zIndex: 1, marginTop: '3rem' }}>
                {activeService.id === 'gold' || activeService.num === '02' ? (
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <a
                      href="https://wa.me/6596262970?text=Hello%20Uniqix%20Trade%20Desk,%20I%20have%20an%20inquiry%20regarding%20Physical%20Gold%20Trading."
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0.85rem 1.75rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        textDecoration: 'none',
                        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
                      }}
                    >
                      <Phone style={{ width: '18px', height: '18px' }} />
                      WhatsApp: +65 96262970
                    </a>

                    <a
                      href="mailto:Sam@uniqix.com?subject=Physical%20Gold%20Trading%20Inquiry"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '0.85rem 1.75rem',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.92rem',
                        textDecoration: 'none',
                        boxShadow: '0 6px 20px rgba(217, 119, 6, 0.3)'
                      }}
                    >
                      <Mail style={{ width: '18px', height: '18px' }} />
                      Email: Sam@uniqix.com
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '1rem 2.5rem',
                      background: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)',
                      border: 'none',
                      borderRadius: '50px',
                      color: '#ffffff',
                      fontWeight: 800,
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px rgba(217, 119, 6, 0.35)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 14px 30px rgba(217, 119, 6, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(217, 119, 6, 0.35)';
                    }}
                  >
                    Inquire Trade Mandate <ArrowRight style={{ width: '18px', height: '18px' }} />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 LIVE PRECIOUS METALS RATES SECTION (EXACT REFERENCE DESIGN MATCH) */}
      <section className="trade-live-metals-section" style={{
        padding: '6rem 0 6.5rem 0',
        background: 'radial-gradient(ellipse at 50% 30%, #FFFDF8 0%, #FAF3E6 50%, #F5E9D4 85%, #EFE1C7 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top & Bottom Sweeping Luxury Gold Wave Ribbons */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: 0,
          right: 0,
          height: '80px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(212, 167, 44, 0.4) 0%, transparent 75%)',
          pointerEvents: 'none'
        }} />

        {/* Top Right & Bottom Left Swirling Gold Arc Borders */}
        <svg viewBox="0 0 1440 600" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.65
        }}>
          <defs>
            <linearGradient id="goldArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#D4A72C" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#B3871E" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M-100,-50 C300,100 800,-80 1550,120 M-100,650 C600,450 1100,680 1550,480" stroke="url(#goldArcGrad)" strokeWidth="3" fill="none" />
          <path d="M-50,-20 C350,140 850,-40 1600,160 M-50,680 C650,480 1150,710 1600,510" stroke="url(#goldArcGrad)" strokeWidth="1.5" fill="none" opacity="0.6" />
        </svg>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '3.5rem',
            alignItems: 'center'
          }} className="responsive-split-grid">

            {/* Left Column: Heading, Subtitle & Value Proposition */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ color: '#C59619', fontSize: '0.8rem' }}>✦</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  LIVE PRECIOUS METALS RATES
                </span>
                <span style={{ color: '#C59619', fontSize: '0.8rem' }}>✦</span>
              </div>

              <h2 style={{
                fontSize: '3.6rem',
                fontWeight: 900,
                fontFamily: "'Playfair Display', Georgia, serif",
                color: 'var(--text-primary)',
                lineHeight: '1.12',
                marginBottom: '1.5rem',
                letterSpacing: '-0.01em'
              }}>
                Live Gold & <br />
                Silver <br />
                <span style={{
                  background: 'linear-gradient(135deg, #D4A72C 0%, #99741A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>Prices</span>
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem',
                lineHeight: '1.65',
                marginBottom: '2.5rem',
                maxWidth: '440px'
              }}>
                Real-time market rates for your trusted precious metals trading.
              </p>

              {/* 4 Circular Metallic Feature Badges */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1.5px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'var(--badge-bg, linear-gradient(135deg, #FFFDF8 0%, #F5E8C8 100%))',
                    color: '#B8860B',
                    boxShadow: '0 4px 12px rgba(212, 167, 44, 0.25)'
                  }}>
                    ⚡
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: '1.2' }}>
                    Live Market<br />Updates
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1.5px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'var(--badge-bg, linear-gradient(135deg, #FFFDF8 0%, #F5E8C8 100%))',
                    color: '#B8860B',
                    boxShadow: '0 4px 12px rgba(212, 167, 44, 0.25)'
                  }}>
                    🛡️
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: '1.2' }}>
                    Trusted<br />Rates
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1.5px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'var(--badge-bg, linear-gradient(135deg, #FFFDF8 0%, #F5E8C8 100%))',
                    color: '#B8860B',
                    boxShadow: '0 4px 12px rgba(212, 167, 44, 0.25)'
                  }}>
                    🌐
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: '1.2' }}>
                    Global<br />Markets
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1.5px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'var(--badge-bg, linear-gradient(135deg, #FFFDF8 0%, #F5E8C8 100%))',
                    color: '#B8860B',
                    boxShadow: '0 4px 12px rgba(212, 167, 44, 0.25)'
                  }}>
                    🔄
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-primary)', display: 'block', lineHeight: '1.2' }}>
                    Updated<br />Instantly
                  </span>
                </div>
              </div>

              {/* Bottom Bullion Stack Image Showcase */}
              <div style={{
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: '2px solid rgba(212, 167, 44, 0.6)',
                boxShadow: '0 15px 30px rgba(212, 167, 44, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <img
                  src="/precious_metals_stack.png"
                  alt="Gold & Silver Bullion Bars Showcase"
                  style={{
                    width: '100%',
                    height: '185px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>

            {/* Right Column: Interactive Gold & Silver Cards */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>

                {/* GOLD CARD (3D Glowing Gold Border Frame) */}
                <div className="trade-live-card-gold" style={{
                  background: 'var(--card-bg, #FFFFFF)',
                  borderRadius: '1.75rem',
                  border: '2.5px solid #D4A72C',
                  padding: '2rem 1.75rem',
                  boxShadow: '0 20px 45px rgba(212, 167, 44, 0.28), 0 0 25px rgba(255, 215, 0, 0.15)',
                  position: 'relative'
                }}>
                  {/* Top Live Badge Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #EAB308 0%, #CA8A04 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(202, 138, 4, 0.35)',
                        fontSize: '1.2rem'
                      }}>
                        🏆
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#B8860B', margin: 0, letterSpacing: '0.04em' }}>
                          GOLD
                        </h3>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          (USD / oz)
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      color: '#10B981',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
                      LIVE
                    </div>
                  </div>

                  {/* Price Header */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '2.4rem',
                      fontWeight: 900,
                      color: goldFlash === 'up' ? '#10B981' : goldFlash === 'down' ? '#EF4444' : 'var(--text-primary)',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      lineHeight: '1.1',
                      transition: 'color 0.3s ease'
                    }}>
                      $ {goldPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div style={{ color: '#10B981', fontSize: '0.88rem', fontWeight: 800, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      ▲ +{goldChange.toFixed(2)} (+{goldChangePct.toFixed(2)}%)
                    </div>
                  </div>

                  {/* Sparkline Curve Chart */}
                  <div style={{ height: '60px', margin: '1rem 0 1.5rem 0' }}>
                    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="goldRefGradMatch" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4A72C" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#D4A72C" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,45 Q30,40 60,48 T120,30 T170,38 T200,10 L200,60 L0,60 Z" fill="url(#goldRefGradMatch)" />
                      <path d="M0,45 Q30,40 60,48 T120,30 T170,38 T200,10" fill="none" stroke="#D4A72C" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Units Table Breakdown */}
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1 Gram</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>$ {(goldPrice / 31.1035).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1 Tola</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>$ {(goldPrice / 31.1035 * 11.6638).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1 Kg</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>$ {(goldPrice / 31.1035 * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* SILVER CARD */}
                <div className="trade-live-card-silver" style={{
                  background: 'var(--card-bg, #FFFFFF)',
                  borderRadius: '1.75rem',
                  border: '1.5px solid var(--border-glass-hover, #CBD5E1)',
                  padding: '2rem 1.75rem',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.06)',
                  position: 'relative'
                }}>
                  {/* Top Live Badge Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #94A3B8 0%, #64748B 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 10px rgba(100, 116, 139, 0.2)',
                        fontSize: '1.2rem'
                      }}>
                        🥈
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, letterSpacing: '0.04em' }}>
                          SILVER
                        </h3>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
                          (USD / oz)
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid rgba(16, 185, 129, 0.4)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      color: '#10B981',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }}></span>
                      LIVE
                    </div>
                  </div>

                  {/* Price Header */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '2.4rem',
                      fontWeight: 900,
                      color: silverFlash === 'up' ? '#10B981' : silverFlash === 'down' ? '#EF4444' : 'var(--text-primary)',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      lineHeight: '1.1',
                      transition: 'color 0.3s ease'
                    }}>
                      $ {silverPrice.toFixed(2)}
                    </div>
                    <div style={{ color: '#10B981', fontSize: '0.88rem', fontWeight: 800, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      ▲ +{silverChange.toFixed(2)} (+{silverChangePct.toFixed(2)}%)
                    </div>
                  </div>

                  {/* Sparkline Curve Chart */}
                  <div style={{ height: '60px', margin: '1rem 0 1.5rem 0' }}>
                    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="silverRefGradMatch" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,50 Q40,35 80,42 T140,25 T200,15 L200,60 L0,60 Z" fill="url(#silverRefGradMatch)" />
                      <path d="M0,50 Q40,35 80,42 T140,25 T200,15" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Units Table Breakdown */}
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1 Gram</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>$ {(silverPrice / 31.1035).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1 Kg</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>$ {(silverPrice / 31.1035 * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>1 Tola</span>
                      <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>$ {(silverPrice / 31.1035 * 11.6638).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Large Action Button Navigating to Contact Page */}
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  width: '100%',
                  padding: '1.15rem 2rem',
                  borderRadius: '50px',
                  background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  border: 'none',
                  boxShadow: '0 12px 30px rgba(212, 167, 44, 0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  letterSpacing: '0.04em',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(212, 167, 44, 0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(212, 167, 44, 0.4)';
                }}
              >
                Inquire Live Trade Mandate <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. LUXURY VISION & MISSION SECTION (WHERE WE ARE HEADED) */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                STRATEGIC DIRECTION
              </span>
              <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
            </div>
            <h2 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: '1.2'
            }}>
              Where we are <em style={{ fontStyle: 'italic', color: '#D4A72C' }}>headed</em>, and how we get there.
            </h2>
            <div style={{ width: '70px', height: '3px', background: 'linear-gradient(90deg, #D4A72C 0%, #e0c080 100%)', margin: '1.25rem auto 0 auto', borderRadius: '2px' }} />
          </div>

          {/* Luxury 2-Column Split Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '2.5rem', alignItems: 'stretch' }} className="responsive-vision-grid">

            {/* LEFT CARD: i. OUR VISION */}
            <div
              className="glass-panel"
              style={{
                background: 'linear-gradient(145deg, #E5BA42 0%, #D4A72C 45%, #B8860B 80%, #906502 100%)',
                borderRadius: '2rem',
                border: '2.5px solid #FFDF80',
                padding: '3.5rem 3rem 2.5rem 3rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 25px 60px rgba(212, 167, 44, 0.4), 0 5px 20px rgba(0, 0, 0, 0.15)',
                color: '#ffffff'
              }}
            >
              {/* Top Accent Gold Bar */}
              <div style={{ position: 'absolute', top: 0, left: '3rem', width: '4px', height: '40px', background: '#FFFFFF', borderRadius: '0 0 2px 2px' }} />

              <div>
                {/* Roman Numeral & Label */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '2.2rem', color: '#FFFFFF', fontWeight: 900 }}>
                    i.
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.9)' }}>
                    OUR VISION
                  </span>
                </div>

                {/* Main Headline */}
                <h3 style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#ffffff',
                  lineHeight: '1.25',
                  marginBottom: '2rem'
                }}>
                  To redefine the future of <em style={{ fontStyle: 'italic', color: '#FFF5D6' }}>gold</em>.
                </h3>

                {/* Body Text Blocks */}
                <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.75rem', fontWeight: 500 }}>
                  To set new standards in <strong style={{ color: '#ffffff', fontWeight: 900 }}>excellence</strong>, <strong style={{ color: '#ffffff', fontWeight: 900 }}>transparency, and sustainability</strong>. To create lasting value for generations.
                </p>

                <p style={{ color: '#FFF5D6', fontSize: '1.05rem', lineHeight: '1.8', fontWeight: 700, borderLeft: '3px solid #FFFFFF', paddingLeft: '1rem', margin: 0 }}>
                  Gold as more than wealth. As a foundation for security and shared prosperity.
                </p>
              </div>

              {/* Bottom Raw Gold Ore Visual Highlight */}
              <div style={{
                marginTop: '3rem',
                height: '180px',
                borderRadius: '1.25rem',
                background: 'url("/gold2.png") center/cover no-repeat',
                position: 'relative',
                border: '2px solid #FFDF80',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer'
              }} onClick={() => setActiveModalMedia({ type: 'image', src: '/gold2.png', title: 'Physical Gold Bullion & Vault Stock', sub: 'Assayed & Certified Institutional Stock' })}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)',
                  borderRadius: '1.25rem'
                }} />
                <span style={{
                  position: 'absolute',
                  bottom: '1rem',
                  left: '1.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#D4A72C',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Sparkles style={{ width: '14px', height: '14px' }} /> PHYSICAL GOLD BULLION & ORE BENCHMARKS
                </span>
              </div>
            </div>

            {/* RIGHT CARD: ii. OUR MISSION */}
            <div
              className="glass-panel"
              style={{
                background: 'var(--bg-glass)',
                borderRadius: '2rem',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                padding: '3.5rem 3.5rem 3.5rem 3.5rem',
                position: 'relative',
                boxShadow: 'var(--shadow-glass)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {/* Top Accent Gold Bar */}
              <div style={{ position: 'absolute', top: 0, left: '3.5rem', width: '4px', height: '40px', background: '#D4A72C', borderRadius: '0 0 2px 2px' }} />

              <div>
                {/* Roman Numeral & Label */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '2.2rem', color: '#D4A72C', fontWeight: 700 }}>
                    ii.
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                    OUR MISSION
                  </span>
                </div>

                {/* Main Headline */}
                <h3 style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: 'var(--text-primary)',
                  lineHeight: '1.25',
                  marginBottom: '2.5rem'
                }}>
                  Four <em style={{ fontStyle: 'italic', color: '#D4A72C' }}>commitments</em> that guide every gram.
                </h3>

                {/* 4 Commitments List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

                  {/* Commitment 1 */}
                  <div style={{ paddingBottom: '1.5rem', borderBottom: '1px dashed rgba(197, 160, 89, 0.3)' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                      Premium quality
                    </h4>
                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                      Deliver gold products and services that meet the highest international benchmarks.
                    </p>
                  </div>

                  {/* Commitment 2 */}
                  <div style={{ paddingBottom: '1.5rem', borderBottom: '1px dashed rgba(197, 160, 89, 0.3)' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                      Trust-based partnerships
                    </h4>
                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                      Build enduring relationships with clients and partners worldwide.
                    </p>
                  </div>

                  {/* Commitment 3 */}
                  <div style={{ paddingBottom: '1.5rem', borderBottom: '1px dashed rgba(197, 160, 89, 0.3)' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                      Innovation & efficiency
                    </h4>
                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                      Drive forward the practice of gold trading, refining, and investment.
                    </p>
                  </div>

                  {/* Commitment 4 */}
                  <div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.35rem 0' }}>
                      Responsible sustainability
                    </h4>
                    <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
                      Contribute positively to the communities and environments we touch.
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3.5 CREATIVE GOLD VAULT & REFINERY MEDIA SHOWCASE */}
      <section style={{ padding: '2rem 0 6rem 0' }}>
        <div className="container">

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#B8860B', fontSize: '1rem' }}>✦</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                PHYSICAL BULLION VERIFICATION & REFINERY MEDIA
              </span>
              <span style={{ color: '#B8860B', fontSize: '1rem' }}>✦</span>
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: 'var(--text-primary)',
              margin: '0 0 1rem 0',
              lineHeight: '1.2'
            }}>
              Gold Vault & Media <em style={{ fontStyle: 'italic', color: '#B8860B' }}>Gallery</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto' }}>
              Authentic high-resolution visual inspection of our physical gold inventory, vaulted storage, fire-assay refining, and verification stream.
            </p>
            <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, #D4A72C 0%, #CA8A04 100%)', margin: '1.25rem auto 0 auto', borderRadius: '2px' }} />
          </div>

          {/* 1. MASSIVE CINEMATIC VIDEO PLAYER (CREATIVE WHITE & GOLD CARD) */}
          <div
            className="trade-gallery-card"
            style={{
              borderRadius: '2.5rem',
              border: '2.5px solid #D4A72C',
              overflow: 'hidden',
              position: 'relative',
              background: '#FFFFFF',
              boxShadow: '0 25px 60px rgba(212, 167, 44, 0.22), 0 5px 20px rgba(0, 0, 0, 0.04)',
              marginBottom: '3.5rem'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '520px', background: '#0F172A' }}>
              <video
                ref={videoRef}
                src="/gold4.mp4"
                autoPlay
                loop
                muted={isVideoMuted}
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />

              {/* Video Light Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, rgba(15, 23, 42, 0.1) 50%, rgba(15, 23, 42, 0.6) 100%)',
                pointerEvents: 'none'
              }} />

              {/* Top Badges */}
              <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                right: '2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 2
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0.66rem 1.35rem',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  backdropFilter: 'blur(12px)',
                  color: '#B8860B',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 15px rgba(212, 167, 44, 0.25)'
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981', display: 'inline-block' }} />
                  LIVE VAULT & REFINERY REEL • 999.9 PURE AU
                </div>

                <button
                  onClick={() => setActiveModalMedia({ type: 'video', src: '/gold4.mp4', title: 'Gold Vault Operations & Refining Video Stream', sub: 'High-purity 999.9 Fine Gold Bullion Processing & Inspection' })}
                  style={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1.5px solid #D4A72C',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#B8860B',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 15px rgba(212, 167, 44, 0.25)',
                    transition: 'all 0.3s ease'
                  }}
                  title="Expand Fullscreen"
                >
                  <Maximize2 style={{ width: '22px', height: '22px' }} />
                </button>
              </div>

              {/* Center Big Play Button */}
              {!isVideoPlaying && (
                <button
                  onClick={toggleVideoPlay}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '88px',
                    height: '88px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FFD700 0%, #D4A72C 100%)',
                    border: '4px solid #FFFFFF',
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 45px rgba(212, 167, 44, 0.8)',
                    zIndex: 3
                  }}
                >
                  <Play style={{ width: '40px', height: '40px', marginLeft: '5px', fill: '#0F172A' }} />
                </button>
              )}
            </div>

            {/* Bottom Controls Bar (CREATIVE LIGHT CHAMPAGNE GOLD CONTROLS) */}
            <div className="trade-gallery-controls" style={{
              padding: '1.85rem 2.5rem',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #FFFDF8 60%, #FAF4E8 100%)',
              borderTop: '2px solid rgba(212, 167, 44, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#0F172A',
              flexWrap: 'wrap',
              gap: '1.5rem',
              zIndex: 2
            }}>
              <div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, margin: '0 0 0.3rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: '#0F172A' }}>
                  Gold Vault Inspection & Live Refining Stream
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#475569', margin: 0, fontWeight: 500 }}>
                  Real-time high-definition video of 999.9 fine gold bar inspection & bullion vault operations.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={toggleVideoPlay}
                  style={{
                    background: 'linear-gradient(135deg, #D4A72C 0%, #CA8A04 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.8rem 1.6rem',
                    color: '#FFFFFF',
                    fontWeight: 900,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(212, 167, 44, 0.35)'
                  }}
                >
                  {isVideoPlaying ? <Pause style={{ width: '18px', height: '18px' }} /> : <Play style={{ width: '18px', height: '18px' }} />}
                  {isVideoPlaying ? 'Pause Video' : 'Play Video'}
                </button>

                <button
                  onClick={toggleVideoMute}
                  style={{
                    background: '#FFFFFF',
                    border: '1.5px solid #D4A72C',
                    borderRadius: '12px',
                    padding: '0.8rem 1.35rem',
                    color: '#B8860B',
                    fontWeight: 800,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 3px 10px rgba(0,0,0,0.03)'
                  }}
                >
                  {isVideoMuted ? <VolumeX style={{ width: '18px', height: '18px' }} /> : <Volume2 style={{ width: '18px', height: '18px' }} />}
                  {isVideoMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>
          </div>

          {/* 2. THREE LARGE HIGH-RESOLUTION GOLD IMAGE CARDS (CREATIVE WHITE & GOLD THEME) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>

            {/* CARD 1: gold1.png */}
            <div
              className="trade-gallery-card"
              onClick={() => setActiveModalMedia({ type: 'image', src: '/gold1.png', title: '999.9 Fine Gold Bars & Cast Bullion', sub: 'Fire Assayed & XRF Certified Pure Gold (AU 999.9)' })}
              style={{
                borderRadius: '2rem',
                border: '2px solid #D4A72C',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFDF5 100%)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 15px 35px rgba(212, 167, 44, 0.18), 0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B8860B';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 167, 44, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 167, 44, 0.18), 0 4px 15px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#0F172A' }}>
                <img
                  src="/gold1.png"
                  alt="999.9 Fine Gold Bars"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)' }} />

                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  color: '#B8860B',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  AU · 999.9 PURE GOLD
                </span>

                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  color: '#B8860B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Eye style={{ width: '18px', height: '18px' }} />
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#0F172A' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: 'inherit' }}>
                    999.9 Fine Gold Bars
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
                    Certified investment-grade 1g, 50g, 100g, 500g, and 1kg pure gold bullion bars with fire-assay credentials.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(212, 167, 44, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✦ CLICK TO VIEW HIGH-RES
                  </span>
                  <ArrowUpRight style={{ width: '18px', height: '18px', color: '#B8860B' }} />
                </div>
              </div>
            </div>

            {/* CARD 2: gold2.png */}
            <div
              className="trade-gallery-card"
              onClick={() => setActiveModalMedia({ type: 'image', src: '/gold2.png', title: 'Institutional Vaulted Bullion Reserves', sub: 'Audited Depository Reserves & Wholesale Trade Allocations' })}
              style={{
                borderRadius: '2rem',
                border: '2px solid #D4A72C',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFDF5 100%)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 15px 35px rgba(212, 167, 44, 0.18), 0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B8860B';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 167, 44, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 167, 44, 0.18), 0 4px 15px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#0F172A' }}>
                <img
                  src="/gold2.png"
                  alt="Vaulted Bullion Reserves"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)' }} />

                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  color: '#B8860B',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  VAULTED BULLION STOCK
                </span>

                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  color: '#B8860B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Eye style={{ width: '18px', height: '18px' }} />
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#0F172A' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: 'inherit' }}>
                    Vault Storage & Reserves
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
                    High-security depository reserves for institutional buyers, bulk off-takers, and trading mandates.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(212, 167, 44, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✦ CLICK TO VIEW HIGH-RES
                  </span>
                  <ArrowUpRight style={{ width: '18px', height: '18px', color: '#B8860B' }} />
                </div>
              </div>
            </div>

            {/* CARD 3: gold3.png */}
            <div
              className="trade-gallery-card"
              onClick={() => setActiveModalMedia({ type: 'image', src: '/gold3.png', title: 'Fire Assay & High Purity Gold Ingots', sub: 'XRF Spectrometry & Fire Assay Verified 999.9 Gold Benchmark' })}
              style={{
                borderRadius: '2rem',
                border: '2px solid #D4A72C',
                overflow: 'hidden',
                background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFDF5 100%)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 15px 35px rgba(212, 167, 44, 0.18), 0 4px 15px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B8860B';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 167, 44, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 167, 44, 0.18), 0 4px 15px rgba(0,0,0,0.03)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#0F172A' }}>
                <img
                  src="/gold3.png"
                  alt="Fire Assay Gold Ingot"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, transparent 60%)' }} />

                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.45rem 1rem',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  color: '#B8860B',
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  letterSpacing: '0.1em',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  FIRE ASSAY REFINED
                </span>

                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1.5px solid #D4A72C',
                  color: '#B8860B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <Eye style={{ width: '18px', height: '18px' }} />
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#0F172A' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: 'inherit' }}>
                    Fire Assay & Refined Ingots
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.6', margin: 0, fontWeight: 500 }}>
                    Precision laboratory fire-assay and XRF spectrometry verified 999.9 pure gold ingots.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(212, 167, 44, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✦ CLICK TO VIEW HIGH-RES
                  </span>
                  <ArrowUpRight style={{ width: '18px', height: '18px', color: '#B8860B' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LUXURY BULLION CATALOG SHOWCASE (999.9 FINE GOLD & SILVER BULLION) */}
      <section className="trade-bullion-section" style={{
        padding: '2rem 0 6rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #FAF3E6 60%, #F3E5C8 100%)'
      }}>
        {/* Background Decorative Gold Silk Ribbons / Waves */}
        <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '45%', height: '60%', pointerEvents: 'none', zIndex: 0, opacity: 0.85 }}>
          <svg viewBox="0 0 500 500" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="goldRibbonTopLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#D4A72C" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#B8860B" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M-100,50 Q150,-50 250,150 T450,250 T200,450 Z" fill="url(#goldRibbonTopLeft)" />
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: '-5%', right: '-10%', width: '50%', height: '55%', pointerEvents: 'none', zIndex: 0, opacity: 0.85 }}>
          <svg viewBox="0 0 500 500" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="goldRibbonBottomRight" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#F5D061" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#E5BA42" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#FAF3E6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M100,450 Q300,200 450,300 T600,100 T250,-50 Z" fill="url(#goldRibbonBottomRight)" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>

          {/* MAIN CATALOG CONTAINER CARD */}
          <div className="glass-panel trade-luxury-card" style={{
            borderRadius: '2.5rem',
            padding: '4.5rem 3.5rem',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #FAF3E6 65%, #F7E9CF 100%)',
            border: '2px solid rgba(212, 167, 44, 0.45)',
            boxShadow: '0 30px 70px rgba(212, 167, 44, 0.18), 0 8px 24px rgba(0, 0, 0, 0.03)',
            color: '#1e293b'
          }}>

            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem' }}>
              <div style={{ maxWidth: '680px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
                  <span style={{ color: '#C59619', fontSize: '0.8rem' }}>✦</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    PRECIOUS METALS CATALOG & SPECIFICATIONS
                  </span>
                  <span style={{ color: '#C59619', fontSize: '0.8rem' }}>✦</span>
                </div>
                <h2 style={{
                  fontSize: '3.6rem',
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#0B132B',
                  margin: '0 0 1rem 0',
                  lineHeight: '1.12'
                }}>
                  999.9 fine gold & silver <br />
                  <em style={{ fontStyle: 'italic', color: '#B8860B', fontWeight: 800 }}>bullion.</em>
                </h2>
                <p style={{ color: '#5C6B73', fontSize: '1.05rem', lineHeight: '1.7', margin: 0, fontWeight: 500 }}>
                  999.9 fine gold and silver bullion. Wholesale and retail bars. Live XAUUSD spot pricing. Transparent spreads, zero-delay settlement.
                </p>
              </div>

              {/* Spot Pricing Tagline Badge */}
              <div className="trade-badge-pill" style={{
                padding: '1.25rem 2rem',
                borderRadius: '1.5rem',
                background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF0D8 100%)',
                border: '1.5px solid rgba(212, 167, 44, 0.55)',
                boxShadow: '0 10px 25px rgba(212, 167, 44, 0.18)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                alignSelf: 'flex-start'
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #F3D082 0%, #C59619 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0B132B',
                  boxShadow: '0 4px 12px rgba(197, 150, 25, 0.35)',
                  flexShrink: 0
                }}>
                  <TrendingUp style={{ width: '22px', height: '22px', strokeWidth: 2.5 }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                    <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                      LIVE MARKET FIXATION
                    </span>
                    <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.2rem', color: '#0B132B', fontWeight: 800 }}>
                    "Linked to global XAU and XAG spot."
                  </span>
                </div>
              </div>
            </div>

            {/* TIER I: WHOLESALE · BULLION BARS · KILOGRAM */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#B8860B', fontWeight: 900 }}>
                  I.
                </span>
                <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8860B' }}>
                  WHOLESALE - BULLION BARS - KILOGRAM
                </span>
                <div style={{ flex: 1, height: '1.5px', background: 'rgba(212, 167, 44, 0.35)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.75rem' }}>

                {/* 1kg Gold Bar Card */}
                <div className="trade-item-card-gold" style={{
                  padding: '2rem 2.25rem',
                  borderRadius: '1.75rem',
                  background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF0D8 100%)',
                  border: '2px solid #D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  boxShadow: '0 14px 30px rgba(212, 167, 44, 0.28), inset 0 2px 4px #FFFFFF',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                  onClick={() => setActiveModalMedia({ type: 'image', src: '/gold1.png', title: '1kg Fine Gold Bullion Bar (999.9 Purity)', sub: 'Wholesale Cast Bar · Same-day Settlement Available' })}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 167, 44, 0.4), inset 0 2px 4px #FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 14px 30px rgba(212, 167, 44, 0.28), inset 0 2px 4px #FFFFFF';
                  }}
                >
                  <div style={{
                    width: '110px',
                    height: '95px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid #D4A72C',
                    boxShadow: '0 10px 24px rgba(212, 167, 44, 0.35)',
                    flexShrink: 0,
                    background: '#FAF0D8'
                  }}>
                    <img src="/gold1.png" alt="1kg Gold Bar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B8860B', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      GOLD - FINE GOLD
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0B132B', margin: '0.2rem 0 0.4rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Gold Bar - 1kg
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#5C6B73', margin: 0, fontWeight: 500 }}>
                      Good Luck. Wholesaler. 0% purity, guaranteed.
                    </p>
                  </div>
                </div>

                {/* 1kg Silver Bar Card */}
                <div className="trade-item-card-silver" style={{
                  padding: '2rem 2.25rem',
                  borderRadius: '1.75rem',
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)',
                  border: '1.5px solid #CBD5E1',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease'
                }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    width: '75px',
                    height: '95px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 50%, #94A3B8 100%)',
                    border: '1.5px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0F172A',
                    fontWeight: 900,
                    boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em' }}>1 KILO</span>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800 }}>FINE SILVER</span>
                    <span style={{ fontSize: '0.58rem', opacity: 0.8 }}>999.9</span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      SILVER - FINE SILVER
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0B132B', margin: '0.2rem 0 0.4rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Silver Bar - 1kg
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#5C6B73', margin: 0, fontWeight: 500 }}>
                      Good Luck. Wholesaler. 0% purity, guaranteed.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* TIER II: RETAIL - GOLD BARS - 100g & FINE */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#B8860B', fontWeight: 900 }}>
                  II.
                </span>
                <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8860B' }}>
                  RETAIL - GOLD BARS - 100g & FINE
                </span>
                <div style={{ flex: 1, height: '1.5px', background: 'rgba(212, 167, 44, 0.35)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem' }}>

                {[
                  { weight: '25g', h: '50px', w: '34px' },
                  { weight: '50g', h: '56px', w: '38px' },
                  { weight: '100g', h: '62px', w: '44px' },
                  { weight: '500g', h: '68px', w: '48px' },
                  { weight: '1kg', h: '74px', w: '52px' }
                ].map((item, idx) => (
                  <div key={idx} className="trade-item-card-gold" style={{
                    padding: '2rem 1rem',
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(180deg, #FFFDF8 0%, #FAF0D8 100%)',
                    border: '1.5px solid rgba(212, 167, 44, 0.55)',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 6px 18px rgba(212, 167, 44, 0.14)',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px rgba(212, 167, 44, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(212, 167, 44, 0.14)';
                    }}
                  >
                    {/* 3D Gold Bar Icon */}
                    <div style={{
                      width: item.w,
                      height: item.h,
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #FFEAA7 0%, #D4A72C 50%, #906502 100%)',
                      marginBottom: '1.2rem',
                      border: '1px solid #FFE8AA',
                      boxShadow: '0 6px 16px rgba(212, 167, 44, 0.35), inset 0 1px 2px #FFFFFF',
                      position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', top: '3px', left: '3px', right: '3px', height: '2px', background: 'rgba(255,255,255,0.7)', borderRadius: '2px' }} />
                    </div>
                    <h4 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B132B', margin: '0 0 0.2rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {item.weight}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 700, display: 'block' }}>
                      Gold Bar
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>
                      (Retail)
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* TIER III: RETAIL - SILVER BARS - 500g & FINE */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#B8860B', fontWeight: 900 }}>
                  III.
                </span>
                <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#B8860B' }}>
                  RETAIL - SILVER BARS - 500g & FINE
                </span>
                <div style={{ flex: 1, height: '1.5px', background: 'rgba(212, 167, 44, 0.35)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 240px))', gap: '1.5rem' }}>

                {[
                  { weight: '5g', h: '50px', w: '34px' },
                  { weight: '10g', h: '56px', w: '38px' }
                ].map((item, idx) => (
                  <div key={idx} className="trade-item-card-silver" style={{
                    padding: '2rem 1rem',
                    borderRadius: '1.5rem',
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)',
                    border: '1.5px solid #CBD5E1',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)',
                    transition: 'all 0.3s ease'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    {/* 3D Silver Bar Icon */}
                    <div style={{
                      width: item.w,
                      height: item.h,
                      borderRadius: '6px',
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #CBD5E1 50%, #64748B 100%)',
                      marginBottom: '1.2rem',
                      border: '1px solid #FFFFFF',
                      boxShadow: '0 6px 16px rgba(0,0,0,0.15), inset 0 1px 2px #FFFFFF',
                      position: 'relative'
                    }}>
                      <div style={{ position: 'absolute', top: '3px', left: '3px', right: '3px', height: '2px', background: 'rgba(255,255,255,0.9)', borderRadius: '2px' }} />
                    </div>
                    <h4 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0B132B', margin: '0 0 0.2rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {item.weight}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#1E293B', fontWeight: 700, display: 'block' }}>
                      Silver Bar
                    </span>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 500 }}>
                      (Retail)
                    </span>
                  </div>
                ))}

              </div>
            </div>

            {/* Certification Footer Note Banner */}
            <div className="trade-hallmark-bar" style={{
              padding: '1.5rem 2.5rem',
              borderRadius: '1.75rem',
              background: 'linear-gradient(135deg, #FFFDF8 0%, #FAF0D8 100%)',
              border: '1.5px solid rgba(212, 167, 44, 0.6)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              boxShadow: '0 10px 25px rgba(212, 167, 44, 0.18)'
            }}>
              <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.55', fontWeight: 600, flex: 1 }}>
                All bars accompanied by 999.9 purity and assay certificate, ensuring authenticity and international certification.
              </div>

              {/* Au | Ag Hallmark Badge */}
              <div style={{
                padding: '0.75rem 2.25rem',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '1.15rem',
                letterSpacing: '0.08em',
                boxShadow: '0 8px 20px rgba(212, 167, 44, 0.4)',
                textAlign: 'center',
                margin: '0 auto',
                whiteSpace: 'nowrap'
              }}>
                Au | Ag
              </div>

              <div style={{ fontSize: '0.88rem', color: '#475569', lineHeight: '1.55', textAlign: 'right', fontWeight: 600, flex: 1 }}>
                Right next to live XAU/XAG pricing and real-time updates. Reliable. Transparent. Secure.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. ADVISORY BANNER */}
      <section className="trade-advisory-section" style={{
        padding: '2rem 0 6rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, #FFFDF8 0%, #FAF3E6 60%, #F3E5C8 100%)'
      }}>
        {/* Outer Ribbon Graphics Wrapping Bottom Container Corners */}
        <div style={{ position: 'absolute', bottom: '-15%', left: '-8%', width: '40%', height: '70%', pointerEvents: 'none', zIndex: 0, opacity: 0.9 }}>
          <svg viewBox="0 0 500 500" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="advRibbonLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F5D061" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#E5BA42" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#FAF3E6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M-50,500 Q150,300 250,400 T450,200 Z" fill="url(#advRibbonLeft)" />
          </svg>
        </div>

        <div style={{ position: 'absolute', bottom: '-15%', right: '-8%', width: '40%', height: '70%', pointerEvents: 'none', zIndex: 0, opacity: 0.9 }}>
          <svg viewBox="0 0 500 500" fill="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="advRibbonRight" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.85" />
                <stop offset="70%" stopColor="#D4A72C" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FAF3E6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M550,500 Q350,300 250,400 T50,200 Z" fill="url(#advRibbonRight)" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="glass-panel trade-luxury-card" style={{
            padding: '4.5rem 3.5rem',
            borderRadius: '2.5rem',
            background: 'linear-gradient(180deg, #FFFDF8 0%, #FAF3E6 65%, #F7E9CF 100%)',
            border: '2px solid rgba(212, 167, 44, 0.45)',
            boxShadow: '0 30px 70px rgba(212, 167, 44, 0.18), 0 8px 24px rgba(0, 0, 0, 0.03)',
            color: '#1e293b',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* World Map Overlay Watermark */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(rgba(212, 167, 44, 0.15) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none',
              opacity: 0.7
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
                <span style={{ color: '#C59619', fontSize: '0.8rem' }}>✦</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#B8860B', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  TRADE ASSISTANCE & EXECUTIVE EXECUTION
                </span>
                <span style={{ color: '#C59619', fontSize: '0.8rem' }}>✦</span>
              </div>

              {/* Founder / Execution Desk Badge */}
              <div className="trade-badge-pill" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.5rem',
                marginBottom: '2.5rem',
                padding: '1rem 2.5rem',
                borderRadius: '1.75rem'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid #D4A72C',
                  boxShadow: '0 6px 16px rgba(212, 167, 44, 0.4)',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)'
                }}>
                  <img src="/founder.png" alt="Sam Tay" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span className="badge-title" style={{ fontSize: '0.74rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block' }}>
                    EXECUTION TRADE DESK
                  </span>
                  <h4 className="badge-name" style={{ fontSize: '1.35rem', fontWeight: 900, margin: '0.15rem 0 0.2rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Sam Tay
                  </h4>
                  <span className="badge-role" style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                    Founder & Managing Director
                  </span>
                </div>
              </div>

              <p style={{ color: '#334155', fontSize: '1.2rem', lineHeight: '1.85', maxWidth: '880px', margin: '0 auto 2.5rem auto', fontWeight: 500 }}>
                Uniqix International Trade prioritizes reliability, clear communication, and professional execution across all mandates and commodity trades. Contact us to discuss your specific requirements for LNG, physical gold, industrial sands, or bulk commodities.
              </p>

              {/* Contact CTA Button */}
              <button
                onClick={() => {
                  setCurrentPage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{
                  padding: '1.15rem 3rem',
                  marginBottom: '2.8rem',
                  background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '50px',
                  fontWeight: 900,
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  boxShadow: '0 14px 32px rgba(212, 167, 44, 0.42)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 18px 40px rgba(212, 167, 44, 0.6)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 14px 32px rgba(212, 167, 44, 0.42)';
                }}
              >
                <Mail style={{ width: '20px', height: '20px' }} /> Contact Our Trade Desk <ArrowRight style={{ width: '20px', height: '20px' }} />
              </button>

              {/* DIRECT INSTANT DESK CHANNELS */}
              <div style={{
                borderTop: '1.5px solid rgba(212, 167, 44, 0.35)',
                paddingTop: '2.5rem',
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.25rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#B8860B', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    DIRECT INSTANT DESK CHANNELS
                  </span>
                  <span style={{ color: '#C59619', fontSize: '0.75rem' }}>✦</span>
                </div>

                <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '680px' }}>
                  {/* WhatsApp Direct */}
                  <a
                    href="https://wa.me/6596262970?text=Hello%20Uniqix%20Trade%20Desk,%20I%20have%20an%20inquiry%20regarding%20Trade%20Services."
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      flex: '1 1 260px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      boxShadow: '0 10px 24px rgba(16, 185, 129, 0.38)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 14px 30px rgba(16, 185, 129, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(16, 185, 129, 0.38)';
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    WhatsApp: +65 96262970
                  </a>

                  {/* Email Direct */}
                  <a
                    href="mailto:sam@uniqix.com?subject=Trade%20Desk%20Inquiry"
                    style={{
                      flex: '1 1 260px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      padding: '1rem 2rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      boxShadow: '0 10px 24px rgba(37, 99, 235, 0.38)',
                      transition: 'transform 0.2s, box-shadow 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 14px 30px rgba(37, 99, 235, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 24px rgba(37, 99, 235, 0.38)';
                    }}
                  >
                    <Mail style={{ width: '22px', height: '22px' }} />
                    Email: sam@uniqix.com

                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* LIGHTBOX MEDIA MODAL */}
      {activeModalMedia && (
        <div
          onClick={() => setActiveModalMedia(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            background: 'rgba(2, 11, 30, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '110px 2rem 2rem 2rem',
            overflowY: 'auto'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '850px',
              width: '100%',
              borderRadius: '2rem',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #020b1e 0%, #0a1122 100%)',
              border: '2px solid #D4A72C',
              boxShadow: '0 30px 70px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 167, 44, 0.3)',
              color: '#ffffff',
              margin: 'auto 0'
            }}
          >
            {/* Close Button Header Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.75rem',
              background: 'rgba(2, 11, 30, 0.95)',
              borderBottom: '1px solid rgba(212, 167, 44, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D4A72C', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                <Sparkles style={{ width: '14px', height: '14px' }} /> PHYSICAL BULLION SPECIFICATION
              </div>

              <button
                onClick={() => setActiveModalMedia(null)}
                style={{
                  background: 'rgba(212, 167, 44, 0.15)',
                  border: '1px solid #D4A72C',
                  borderRadius: '50px',
                  padding: '0.4rem 1rem',
                  color: '#D4A72C',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4A72C';
                  e.currentTarget.style.color = '#020b1e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 167, 44, 0.15)';
                  e.currentTarget.style.color = '#D4A72C';
                }}
              >
                Close Preview <X style={{ width: '16px', height: '16px' }} />
              </button>
            </div>

            {/* Media Content Box */}
            <div style={{ maxHeight: '52vh', minHeight: '300px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {activeModalMedia.type === 'video' ? (
                <video
                  src={activeModalMedia.src}
                  controls
                  autoPlay
                  playsInline
                  style={{ width: '100%', height: '100%', maxHeight: '52vh', objectFit: 'contain', display: 'block' }}
                />
              ) : (
                <img
                  src={activeModalMedia.src}
                  alt={activeModalMedia.title}
                  style={{ width: '100%', height: '100%', maxHeight: '52vh', objectFit: 'contain', display: 'block' }}
                />
              )}
            </div>

            {/* Modal Info Footer */}
            <div style={{ padding: '1.75rem 2.25rem', background: 'linear-gradient(180deg, rgba(2, 11, 30, 0.98) 0%, #020b1e 100%)', borderTop: '1px solid rgba(212, 167, 44, 0.3)' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff', margin: '0 0 0.4rem 0' }}>
                {activeModalMedia.title}
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '0.98rem', margin: 0, lineHeight: '1.6' }}>
                {activeModalMedia.sub}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fade-in-slide {
          animation: fadeInSlide 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .trade-details-panel {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .trade-details-panel strong {
          color: #b45309 !important;
        }
        @media (max-width: 991px) {
          .responsive-split-grid, .responsive-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }

        /* PORTFOLIO TAB DARK MODE FIX */
        :root[data-theme="dark"] .trade-portfolio-tab {
          background: rgba(15, 23, 42, 0.88) !important;
          border-color: rgba(212, 167, 44, 0.3) !important;
          color: #f8fafc !important;
        }
        :root[data-theme="dark"] .trade-portfolio-tab h4 {
          color: #f8fafc !important;
        }
        :root[data-theme="dark"] .trade-portfolio-tab.active {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: #D4A72C !important;
        }

        /* LIVE METALS SECTION & CARDS DARK MODE FIX */
        :root[data-theme="dark"] .trade-live-metals-section {
          background: radial-gradient(circle at 50% 30%, #0c1020 0%, #030712 100%) !important;
        }
        :root[data-theme="dark"] .trade-live-card-gold,
        :root[data-theme="dark"] .trade-live-card-silver {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(212, 167, 44, 0.5) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6) !important;
          color: #f8fafc !important;
        }
        :root[data-theme="dark"] .trade-live-card-gold h3,
        :root[data-theme="dark"] .trade-live-card-silver h3 {
          color: #f8fafc !important;
        }
        :root[data-theme="dark"] .trade-live-card-gold span,
        :root[data-theme="dark"] .trade-live-card-silver span {
          color: #cbd5e1 !important;
        }

        /* DARK THEME OVERRIDES FOR TRADE PAGE */
        :root[data-theme="dark"] .trade-bullion-section,
        :root[data-theme="dark"] .trade-advisory-section {
          background: radial-gradient(circle at 50% 30%, #0c1020 0%, #030712 100%) !important;
        }

        :root[data-theme="dark"] .trade-luxury-card {
          background: linear-gradient(180deg, #0f172a 0%, #0b0f19 65%, #030712 100%) !important;
          border-color: rgba(212, 167, 44, 0.4) !important;
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 167, 44, 0.12) !important;
          color: #f3f4f6 !important;
        }

        :root[data-theme="dark"] .trade-luxury-card h2,
        :root[data-theme="dark"] .trade-luxury-card h3,
        :root[data-theme="dark"] .trade-luxury-card h4 {
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-luxury-card p {
          color: #9ca3af !important;
        }

        .trade-badge-pill {
          background: linear-gradient(135deg, #FFFDF8 0%, #FAF0D8 100%);
          border: 1.5px solid rgba(212, 167, 44, 0.6);
          box-shadow: 0 12px 28px rgba(212, 167, 44, 0.22);
          transition: all 0.3s ease;
        }

        .trade-badge-pill .badge-title {
          color: #B8860B;
        }

        .trade-badge-pill .badge-name {
          color: #0B132B;
        }

        .trade-badge-pill .badge-role {
          color: #5C6B73;
        }

        :root[data-theme="dark"] .trade-badge-pill,
        [data-theme="dark"] .trade-badge-pill {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(212, 167, 44, 0.5) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
        }

        :root[data-theme="dark"] .trade-badge-pill .badge-title,
        [data-theme="dark"] .trade-badge-pill .badge-title {
          color: #D4A72C !important;
        }

        :root[data-theme="dark"] .trade-badge-pill .badge-name,
        [data-theme="dark"] .trade-badge-pill .badge-name {
          color: #FFFFFF !important;
        }

        :root[data-theme="dark"] .trade-badge-pill .badge-role,
        [data-theme="dark"] .trade-badge-pill .badge-role {
          color: #94A3B8 !important;
        }

        /* MEDIA GALLERY CARDS & CONTROLS DARK MODE OVERRIDES */
        :root[data-theme="dark"] .trade-gallery-card {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(212, 167, 44, 0.5) !important;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.6) !important;
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-gallery-card h3 {
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-gallery-card p {
          color: #9ca3af !important;
        }

        :root[data-theme="dark"] .trade-gallery-controls {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(212, 167, 44, 0.4) !important;
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-gallery-controls h3 {
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-gallery-controls p {
          color: #9ca3af !important;
        }

        :root[data-theme="dark"] .trade-item-card-gold {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(212, 167, 44, 0.6) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
        }

        :root[data-theme="dark"] .trade-item-card-gold h3,
        :root[data-theme="dark"] .trade-item-card-gold h4,
        :root[data-theme="dark"] .trade-item-card-gold span {
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-item-card-gold p {
          color: #9ca3af !important;
        }

        :root[data-theme="dark"] .trade-item-card-silver {
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
        }

        :root[data-theme="dark"] .trade-item-card-silver h3,
        :root[data-theme="dark"] .trade-item-card-silver h4,
        :root[data-theme="dark"] .trade-item-card-silver span {
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-item-card-silver p {
          color: #9ca3af !important;
        }

        :root[data-theme="dark"] .trade-hallmark-bar {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;
          border-color: rgba(212, 167, 44, 0.5) !important;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4) !important;
        }

        :root[data-theme="dark"] .trade-hallmark-bar div {
          color: #cbd5e1 !important;
        }

        :root[data-theme="dark"] .trade-details-panel {
          background: linear-gradient(90deg, #1e293b 0%, #0f172a 45%, #030712 100%) !important;
          color: #f8fafc !important;
          border-color: rgba(212, 167, 44, 0.3) !important;
        }

        :root[data-theme="dark"] .trade-details-panel h3,
        :root[data-theme="dark"] .trade-details-panel h4,
        :root[data-theme="dark"] .trade-details-panel p,
        :root[data-theme="dark"] .trade-details-panel li {
          color: #f8fafc !important;
        }

        :root[data-theme="dark"] .trade-details-panel p span,
        :root[data-theme="dark"] .trade-details-panel strong {
          color: #f59e0b !important;
        }
      `}</style>

    </div>
  );
};

export default TradePage;
