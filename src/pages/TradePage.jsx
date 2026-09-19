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
                      className="glass-panel"
                      style={{
                        marginLeft: '3.25rem',
                        flex: 1,
                        padding: '1.4rem 1.75rem',
                        borderRadius: '1.25rem',
                        cursor: 'pointer',
                        border: activeServiceIdx === idx
                          ? '2px solid #D4A72C'
                          : '1px solid var(--border-glass)',
                        borderLeft: activeServiceIdx === idx
                          ? '5px solid #D4A72C'
                          : '1px solid var(--border-glass)',
                        background: activeServiceIdx === idx
                          ? 'linear-gradient(135deg, rgba(2, 11, 30, 0.92) 0%, rgba(2, 11, 30, 0.85) 100%), url("' + service.bgImage + '") center/cover no-repeat'
                          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0.9) 100%), url("' + service.bgImage + '") center/cover no-repeat',
                        boxShadow: activeServiceIdx === idx ? '0 12px 30px rgba(197, 160, 89, 0.2)' : '0 4px 15px rgba(0,0,0,0.03)',
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
                          ? 'linear-gradient(135deg, #D4A72C 0%, #a8843f 100%)'
                          : 'rgba(197, 160, 89, 0.15)',
                        border: activeServiceIdx === idx ? 'none' : '1px solid rgba(197, 160, 89, 0.4)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: activeServiceIdx === idx ? '#020b1e' : '#D4A72C',
                        fontFamily: "'Playfair Display', Georgia, serif",
                        flexShrink: 0,
                        transition: 'all 0.3s ease'
                      }}>
                        {service.num}
                      </div>

                      {/* Title Content */}
                      <div style={{ flex: 1 }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem', letterSpacing: '0.08em' }}>
                          {service.subtitle}
                        </span>
                        <h4 style={{
                          fontSize: '1.08rem',
                          fontWeight: 800,
                          margin: 0,
                          color: activeServiceIdx === idx ? '#ffffff' : 'var(--text-primary)',
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
                        background: activeServiceIdx === idx ? '#D4A72C' : 'rgba(197, 160, 89, 0.1)',
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
                          color: activeServiceIdx === idx ? '#020b1e' : '#D4A72C'
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
                          borderLeft: '16px solid #020b1e',
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
              border: '2px solid var(--card-gold-border, #D4A72C)',
              background: 'linear-gradient(90deg, #020b1e 35%, rgba(2, 11, 30, 0.8) 60%, rgba(2, 11, 30, 0.25) 100%), url("' + activeService.bgImage + '") center right/cover no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '520px',
              padding: '4rem',
              boxShadow: 'var(--shadow-glass)',
              color: '#ffffff'
            }}>
              {/* Giant watermarked number in top-right */}
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '40px',
                fontSize: '6.5rem',
                fontWeight: 900,
                color: 'rgba(197, 160, 89, 0.12)',
                fontFamily: "'Playfair Display', Georgia, serif",
                userSelect: 'none',
                zIndex: 0
              }}>
                {activeService.num}
              </div>

              <div style={{ position: 'relative', zIndex: 1, maxWidth: '65%' }} key={activeService.id} className="fade-in-slide">
                {/* Gold-bordered icon square badge */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'rgba(197, 160, 89, 0.08)',
                  border: '2px solid #D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2.5rem'
                }}>
                  {React.cloneElement(activeService.icon, { style: { width: '28px', height: '28px', color: '#D4A72C' } })}
                </div>

                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  {activeService.subtitle}
                </span>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 900, color: '#ffffff', marginBottom: '1.75rem', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: '1.25' }}>
                  {activeService.title}
                </h3>

                {/* Thin gold decorative divider line */}
                <div style={{ width: '80px', height: '2px', background: '#D4A72C', marginBottom: '2rem', borderRadius: '1px' }} />

                <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                  {activeService.desc}
                </p>

                {activeService.items.length > 0 && (
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: '#D4A72C', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                      Key Products & Portfolio:
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                      {activeService.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)' }}>
                          <Check style={{ width: '16px', height: '16px', color: '#D4A72C', strokeWidth: 3 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button at bottom left */}
              <div style={{ position: 'relative', zIndex: 1, marginTop: '3rem' }}>
                <button
                  onClick={() => {setCurrentPage('contact');
                      window.scrollTo({top:0,behavior:'smooth'})
                    }}
                  className="btn btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '1rem 2.5rem',
                    background: 'linear-gradient(135deg, #D4A72C 0%, #b08d4a 100%)',
                    border: 'none',
                    color: '#ffffff',
                    fontWeight: 700
                  }}
                >
                  Inquire Trade Mandate <ArrowRight style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2.5 LIVE PRECIOUS METALS RATES SECTION */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, #020b1e 0%, #05132b 50%, #020b1e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Wave Background Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(ellipse at top right, rgba(212, 167, 44, 0.12) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(212, 167, 44, 0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.25fr',
            gap: '3.5rem',
            alignItems: 'center'
          }} className="responsive-split-grid">

            {/* Left Column: Heading, Subtitle & Value Proposition */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <span style={{ color: '#D4A72C', fontSize: '0.75rem' }}>✦</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                  LIVE PRECIOUS METALS RATES
                </span>
                <span style={{ color: '#D4A72C', fontSize: '0.75rem' }}>✦</span>
              </div>

              <h2 style={{
                fontSize: '3.5rem',
                fontWeight: 900,
                fontFamily: "'Playfair Display', Georgia, serif",
                color: '#ffffff',
                lineHeight: '1.15',
                marginBottom: '1.5rem'
              }}>
                Live Gold & Silver <br />
                <span style={{ color: '#D4A72C' }}>Prices</span>
              </h2>

              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                marginBottom: '2.5rem',
                maxWidth: '460px'
              }}>
                Real-time market rates for your trusted precious metals trading.
              </p>

              {/* 4 Feature Badges */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
                marginBottom: '3rem'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 167, 44, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'rgba(212, 167, 44, 0.05)',
                    color: '#D4A72C'
                  }}>
                    ⚡
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', display: 'block', lineHeight: '1.2' }}>
                    Live Market<br />Updates
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 167, 44, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'rgba(212, 167, 44, 0.05)',
                    color: '#D4A72C'
                  }}>
                    🛡️
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', display: 'block', lineHeight: '1.2' }}>
                    Trusted<br />Rates
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 167, 44, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'rgba(212, 167, 44, 0.05)',
                    color: '#D4A72C'
                  }}>
                    🌐
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', display: 'block', lineHeight: '1.2' }}>
                    Global<br />Markets
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: '1px solid rgba(212, 167, 44, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    background: 'rgba(212, 167, 44, 0.05)',
                    color: '#D4A72C'
                  }}>
                    🔄
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', display: 'block', lineHeight: '1.2' }}>
                    Updated<br />Instantly
                  </span>
                </div>
              </div>

              {/* Bottom Image Showcase */}
              <div style={{
                borderRadius: '1.5rem',
                overflow: 'hidden',
                border: '1px solid rgba(212, 167, 44, 0.3)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
              }}>
                <img
                  src="/precious_metals_stack.png"
                  alt="Gold and Silver Bullion Stack"
                  style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>

            {/* Right Column: Live Price Cards Container */}
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>

                {/* GOLD CARD */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 11, 30, 0.95) 100%)',
                  borderRadius: '1.75rem',
                  border: '2px solid #D4A72C',
                  padding: '2rem 1.75rem',
                  boxShadow: '0 0 30px rgba(212, 167, 44, 0.15)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)'
                }}>
                  {/* Top Live Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #D4A72C 0%, #99741a 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(212, 167, 44, 0.3)'
                      }}>
                        🏆
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.05em' }}>
                          GOLD
                        </h3>
                        <span style={{ fontSize: '0.72rem', color: '#8E9BAE', fontWeight: 600 }}>
                          (USD / oz)
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      color: '#4ADE80',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }}></span>
                      LIVE
                    </div>
                  </div>

                  {/* Price Header with pulse/flash tick effect */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '2.4rem',
                      fontWeight: 900,
                      color: goldFlash === 'up' ? '#4ADE80' : goldFlash === 'down' ? '#EF4444' : '#ffffff',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      lineHeight: '1.1',
                      transition: 'color 0.3s ease, text-shadow 0.3s ease',
                      textShadow: goldFlash === 'up' ? '0 0 15px rgba(74, 222, 128, 0.6)' : goldFlash === 'down' ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none'
                    }}>
                      $ {goldPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div style={{ color: '#4ADE80', fontSize: '0.9rem', fontWeight: 700, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      ▲ +{goldChange.toFixed(2)} (+{goldChangePct.toFixed(2)}%)
                    </div>
                  </div>

                  {/* Sparkline Curve Chart */}
                  <div style={{ height: '60px', margin: '1rem 0 1.5rem 0' }}>
                    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#D4A72C" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#D4A72C" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,45 Q30,40 60,48 T120,30 T170,38 T200,10 L200,60 L0,60 Z" fill="url(#goldGrad)" />
                      <path d="M0,45 Q30,40 60,48 T120,30 T170,38 T200,10" fill="none" stroke="#D4A72C" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Units Table Breakdown */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: '#94A3B8' }}>1 Gram</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>$ {(goldPrice / 31.1035).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: '#94A3B8' }}>1 Tola</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>$ {(goldPrice / 31.1035 * 11.6638).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: '#94A3B8' }}>1 Kg</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>$ {(goldPrice / 31.1035 * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* SILVER CARD */}
                <div style={{
                  background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.9) 0%, rgba(2, 11, 30, 0.95) 100%)',
                  borderRadius: '1.75rem',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  padding: '2rem 1.75rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                  position: 'relative',
                  backdropFilter: 'blur(10px)'
                }}>
                  {/* Top Live Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #CBD5E1 0%, #64748B 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(203, 213, 225, 0.2)'
                      }}>
                        🥈
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ffffff', margin: 0, letterSpacing: '0.05em' }}>
                          SILVER
                        </h3>
                        <span style={{ fontSize: '0.72rem', color: '#8E9BAE', fontWeight: 600 }}>
                          (USD / oz)
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      color: '#4ADE80',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      letterSpacing: '0.05em'
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', boxShadow: '0 0 8px #4ADE80' }}></span>
                      LIVE
                    </div>
                  </div>

                  {/* Price Header with pulse/flash tick effect */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{
                      fontSize: '2.4rem',
                      fontWeight: 900,
                      color: silverFlash === 'up' ? '#4ADE80' : silverFlash === 'down' ? '#EF4444' : '#ffffff',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      lineHeight: '1.1',
                      transition: 'color 0.3s ease, text-shadow 0.3s ease',
                      textShadow: silverFlash === 'up' ? '0 0 15px rgba(74, 222, 128, 0.6)' : silverFlash === 'down' ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none'
                    }}>
                      $ {silverPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div style={{ color: '#4ADE80', fontSize: '0.9rem', fontWeight: 700, marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      ▲ +{silverChange.toFixed(2)} (+{silverChangePct.toFixed(2)}%)
                    </div>
                  </div>

                  {/* Sparkline Curve Chart */}
                  <div style={{ height: '60px', margin: '1rem 0 1.5rem 0' }}>
                    <svg viewBox="0 0 200 60" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="silverGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#CBD5E1" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,50 Q40,42 70,35 T130,45 T170,25 T200,18 L200,60 L0,60 Z" fill="url(#silverGrad)" />
                      <path d="M0,50 Q40,42 70,35 T130,45 T170,25 T200,18" fill="none" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Units Table Breakdown */}
                  <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: '#94A3B8' }}>1 Gram</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>$ {(silverPrice / 31.1035).toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: '#94A3B8' }}>1 Kg</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>$ {(silverPrice / 31.1035 * 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', fontSize: '0.88rem' }}>
                      <span style={{ color: '#94A3B8' }}>1 Tola</span>
                      <span style={{ color: '#ffffff', fontWeight: 700 }}>$ {(silverPrice / 31.1035 * 11.6638).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* View Full Price Chart Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => {
                    if (setCurrentPage) {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  style={{
                    background: 'transparent',
                    border: '1px solid #D4A72C',
                    color: '#ffffff',
                    padding: '0.85rem 2rem',
                    borderRadius: '30px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(212, 167, 44, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#D4A72C';
                    e.currentTarget.style.color = '#020b1e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  Inquire Live Trade Mandate <ArrowRight style={{ width: '16px', height: '16px' }} />
                </button>
              </div>

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
                background: 'linear-gradient(180deg, #020b1e 0%, #081226 60%, #0f1c36 100%)',
                borderRadius: '2rem',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                padding: '3.5rem 3rem 2.5rem 3rem',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                color: '#ffffff'
              }}
            >
              {/* Top Accent Gold Bar */}
              <div style={{ position: 'absolute', top: 0, left: '3rem', width: '4px', height: '40px', background: '#D4A72C', borderRadius: '0 0 2px 2px' }} />

              <div>
                {/* Roman Numeral & Label */}
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '2.2rem', color: '#D4A72C', fontWeight: 700 }}>
                    i.
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.7)' }}>
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
                  To redefine the future of <em style={{ fontStyle: 'italic', color: '#D4A72C' }}>gold</em>.
                </h3>

                {/* Body Text Blocks */}
                <p style={{ color: 'rgba(255, 255, 255, 0.88)', fontSize: '1.05rem', lineHeight: '1.8', marginBottom: '1.75rem' }}>
                  To set new standards in <strong style={{ color: '#ffffff', fontWeight: 700 }}>excellence</strong>, <strong style={{ color: '#ffffff', fontWeight: 700 }}>transparency, and sustainability</strong>. To create lasting value for generations.
                </p>

                <p style={{ color: 'rgba(197, 160, 89, 0.95)', fontSize: '1.05rem', lineHeight: '1.8', fontWeight: 600, borderLeft: '2px solid #D4A72C', paddingLeft: '1rem', margin: 0 }}>
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
                border: '1px solid rgba(197, 160, 89, 0.4)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)',
                cursor: 'pointer'
              }} onClick={() => setActiveModalMedia({ type: 'image', src: '/gold2.png', title: 'Physical Gold Bullion & Vault Stock', sub: 'Assayed & Certified Institutional Stock' })}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(2, 11, 30, 0.9) 0%, transparent 60%)',
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
                background: 'var(--bg-secondary, #faf7ee)',
                borderRadius: '2rem',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                padding: '3.5rem 3.5rem 3.5rem 3.5rem',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
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
      {/* 3.5 CREATIVE GOLD VAULT & REFINERY MEDIA SHOWCASE */}
      <section style={{ padding: '0 0 6rem 0' }}>
        <div className="container">

          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
                PHYSICAL BULLION VERIFICATION & REFINERY MEDIA
              </span>
              <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
            </div>
            <h2 style={{
              fontSize: '3.5rem',
              fontWeight: 900,
              fontFamily: "'Playfair Display', Georgia, serif",
              color: 'var(--text-primary)',
              margin: '0 0 1rem 0',
              lineHeight: '1.2'
            }}>
              Gold Vault & Media <em style={{ fontStyle: 'italic', color: '#D4A72C' }}>Gallery</em>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '780px', margin: '0 auto' }}>
              Authentic high-resolution visual inspection of our physical gold inventory, vaulted storage, fire-assay refining, and verification stream.
            </p>
            <div style={{ width: '80px', height: '3px', background: 'linear-gradient(90deg, #D4A72C 0%, #e0c080 100%)', margin: '1.25rem auto 0 auto', borderRadius: '2px' }} />
          </div>

          {/* 1. MASSIVE CINEMATIC VIDEO PLAYER (gold4.mp4) */}
          <div
            className="glass-panel"
            style={{
              borderRadius: '2.5rem',
              border: '2px solid #D4A72C',
              overflow: 'hidden',
              position: 'relative',
              background: '#020b1e',
              boxShadow: '0 25px 50px rgba(212, 167, 44, 0.3)',
              marginBottom: '3rem'
            }}
          >
            <div style={{ position: 'relative', width: '100%', height: '500px', background: '#000000' }}>
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

              {/* Video Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(2, 11, 30, 0.95) 0%, rgba(2, 11, 30, 0.15) 50%, rgba(2, 11, 30, 0.7) 100%)',
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
                  padding: '0.66rem 1.25rem',
                  borderRadius: '50px',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1.5px solid #D4A72C',
                  backdropFilter: 'blur(12px)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em'
                }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 12px #22c55e', display: 'inline-block' }} />
                  LIVE VAULT & REFINERY REEL • 999.9 PURE AU
                </div>

                <button
                  onClick={() => setActiveModalMedia({ type: 'video', src: '/gold4.mp4', title: 'Gold Vault Operations & Refining Video Stream', sub: 'High-purity 999.9 Fine Gold Bullion Processing & Inspection' })}
                  style={{
                    background: 'rgba(2, 11, 30, 0.85)',
                    border: '1.5px solid #D4A72C',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D4A72C',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    transition: 'all 0.3s ease'
                  }}
                  title="Expand Fullscreen"
                >
                  <Maximize2 style={{ width: '22px', height: '22px' }} />
                </button>
              </div>

              {/* Center Big Play Button (shows when paused) */}
              {!isVideoPlaying && (
                <button
                  onClick={toggleVideoPlay}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #D4A72C 0%, #a8843f 100%)',
                    border: '4px solid #ffffff',
                    color: '#020b1e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 40px rgba(212, 167, 44, 0.9)',
                    zIndex: 3
                  }}
                >
                  <Play style={{ width: '38px', height: '38px', marginLeft: '5px', fill: '#020b1e' }} />
                </button>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div style={{
              padding: '1.75rem 2.5rem',
              background: 'linear-gradient(180deg, rgba(2, 11, 30, 0.95) 0%, #020b1e 100%)',
              borderTop: '1px solid rgba(212, 167, 44, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#ffffff',
              flexWrap: 'wrap',
              gap: '1.5rem',
              zIndex: 2
            }}>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '0 0 0.3rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff' }}>
                  Gold Vault Inspection & Live Refining Stream
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
                  Real-time high-definition video of 999.9 fine gold bar inspection & bullion vault operations.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={toggleVideoPlay}
                  style={{
                    background: 'linear-gradient(135deg, #D4A72C 0%, #b08d4a 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.75rem 1.5rem',
                    color: '#020b1e',
                    fontWeight: 900,
                    fontSize: '0.92rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(212, 167, 44, 0.4)'
                  }}
                >
                  {isVideoPlaying ? <Pause style={{ width: '18px', height: '18px' }} /> : <Play style={{ width: '18px', height: '18px' }} />}
                  {isVideoPlaying ? 'Pause Video' : 'Play Video'}
                </button>

                <button
                  onClick={toggleVideoMute}
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    borderRadius: '12px',
                    padding: '0.75rem 1.25rem',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  {isVideoMuted ? <VolumeX style={{ width: '18px', height: '18px' }} /> : <Volume2 style={{ width: '18px', height: '18px' }} />}
                  {isVideoMuted ? 'Unmute' : 'Mute'}
                </button>
              </div>
            </div>
          </div>

          {/* 2. THREE LARGE HIGH-RESOLUTION GOLD IMAGE CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>

            {/* CARD 1: gold1.png (LARGE) */}
            <div
              onClick={() => setActiveModalMedia({ type: 'image', src: '/gold1.png', title: '999.9 Fine Gold Bars & Cast Bullion', sub: 'Fire Assayed & XRF Certified Pure Gold (AU 999.9)' })}
              className="glass-panel"
              style={{
                borderRadius: '2rem',
                border: '2px solid rgba(212, 167, 44, 0.5)',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #020b1e 0%, #081226 100%)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 167, 44, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 167, 44, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#000' }}>
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
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2, 11, 30, 0.95) 0%, transparent 60%)' }} />
                
                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '50px',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1px solid #D4A72C',
                  color: '#D4A72C',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em'
                }}>
                  AU · 999.9 PURE GOLD
                </span>

                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1px solid #D4A72C',
                  color: '#D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Eye style={{ width: '18px', height: '18px' }} />
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff' }}>
                    999.9 Fine Gold Bars
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', margin: 0 }}>
                    Certified investment-grade 1g, 50g, 100g, 500g, and 1kg pure gold bullion bars with fire-assay credentials.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(212, 167, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✦ CLICK TO VIEW HIGH-RES
                  </span>
                  <ArrowUpRight style={{ width: '18px', height: '18px', color: '#D4A72C' }} />
                </div>
              </div>
            </div>

            {/* CARD 2: gold2.png (LARGE) */}
            <div
              onClick={() => setActiveModalMedia({ type: 'image', src: '/gold2.png', title: 'Institutional Vaulted Bullion Reserves', sub: 'Audited Depository Reserves & Wholesale Trade Allocations' })}
              className="glass-panel"
              style={{
                borderRadius: '2rem',
                border: '2px solid rgba(212, 167, 44, 0.5)',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #020b1e 0%, #081226 100%)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 167, 44, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 167, 44, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#000' }}>
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
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2, 11, 30, 0.95) 0%, transparent 60%)' }} />
                
                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '50px',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1px solid #D4A72C',
                  color: '#D4A72C',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em'
                }}>
                  VAULTED BULLION STOCK
                </span>

                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1px solid #D4A72C',
                  color: '#D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Eye style={{ width: '18px', height: '18px' }} />
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff' }}>
                    Vault Storage & Reserves
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', margin: 0 }}>
                    High-security depository reserves for institutional buyers, bulk off-takers, and trading mandates.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(212, 167, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✦ CLICK TO VIEW HIGH-RES
                  </span>
                  <ArrowUpRight style={{ width: '18px', height: '18px', color: '#D4A72C' }} />
                </div>
              </div>
            </div>

            {/* CARD 3: gold3.png (LARGE) */}
            <div
              onClick={() => setActiveModalMedia({ type: 'image', src: '/gold3.png', title: 'Fire Assay & High Purity Gold Ingots', sub: 'XRF Spectrometry & Fire Assay Verified 999.9 Gold Benchmark' })}
              className="glass-panel"
              style={{
                borderRadius: '2rem',
                border: '2px solid rgba(212, 167, 44, 0.5)',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #020b1e 0%, #081226 100%)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#D4A72C';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(212, 167, 44, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 167, 44, 0.5)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden', background: '#000' }}>
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
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(2, 11, 30, 0.95) 0%, transparent 60%)' }} />
                
                <span style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '50px',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1px solid #D4A72C',
                  color: '#D4A72C',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.1em'
                }}>
                  FIRE ASSAY REFINED
                </span>

                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(2, 11, 30, 0.85)',
                  border: '1px solid #D4A72C',
                  color: '#D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Eye style={{ width: '18px', height: '18px' }} />
                </div>
              </div>

              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#ffffff' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff' }}>
                    Fire Assay & Refined Ingots
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6', margin: 0 }}>
                    Precision laboratory fire-assay and XRF spectrometry verified 999.9 pure gold ingots.
                  </p>
                </div>

                <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(212, 167, 44, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ✦ CLICK TO VIEW HIGH-RES
                  </span>
                  <ArrowUpRight style={{ width: '18px', height: '18px', color: '#D4A72C' }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. LUXURY BULLION CATALOG SHOWCASE (999.9 FINE GOLD & SILVER BULLION) */}
      <section style={{ padding: '0 0 6rem 0' }}>
        <div className="container">

          <div className="glass-panel" style={{
            borderRadius: '2.5rem',
            padding: '4rem 3.5rem',
            background: 'linear-gradient(135deg, rgba(2, 11, 30, 0.98) 0%, rgba(10, 17, 34, 0.95) 100%)',
            border: '1px solid rgba(197, 160, 89, 0.35)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.35)',
            color: '#ffffff'
          }}>

            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem' }}>
              <div style={{ maxWidth: '650px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' }}>
                  PRECIOUS METALS CATALOG & SPECIFICATIONS
                </span>
                <h2 style={{
                  fontSize: '3.2rem',
                  fontWeight: 900,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: '#ffffff',
                  margin: '0 0 1.25rem 0',
                  lineHeight: '1.15'
                }}>
                  999.9 fine gold & <em style={{ fontStyle: 'italic', color: '#cbd5e1' }}>silver bullion.</em>
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.05rem', lineHeight: '1.7', margin: 0 }}>
                  999.9 fine gold and silver bullion. Wholesale and retail tiers. Live XAU/XAG spot pricing, transparent spreads, same-day settlement.
                </p>
              </div>

              {/* Spot Pricing Tagline Badge */}
              <div style={{
                padding: '1.25rem 1.75rem',
                borderRadius: '1.25rem',
                background: 'rgba(197, 160, 89, 0.08)',
                border: '1px solid rgba(197, 160, 89, 0.4)',
                textAlign: 'right'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.35rem' }}>
                  LIVE MARKET INTEGRATION
                </span>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 }}>
                  "Linked to global XAU and XAG spot."
                </span>
              </div>
            </div>

            {/* TIER I: WHOLESALE · BULK ORDERS · MIN. 1 KILOGRAM */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#D4A72C', fontWeight: 700 }}>
                  i.
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A72C' }}>
                  WHOLESALE · BULK ORDERS · MIN. 1 KILOGRAM
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.25)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>

                {/* 1kg Gold Bar Card */}
                <div style={{
                  padding: '1.75rem 2rem',
                  borderRadius: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.15) 0%, rgba(2, 11, 30, 0.9) 100%)',
                  border: '1.5px solid #D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.75rem',
                  boxShadow: '0 10px 25px rgba(197, 160, 89, 0.12)',
                  cursor: 'pointer'
                }} onClick={() => setActiveModalMedia({ type: 'image', src: '/gold1.png', title: '1kg Fine Gold Bullion Bar (999.9 Purity)', sub: 'Wholesale Cast Bar · Same-day Settlement Available' })}>
                  <div style={{
                    width: '100px',
                    height: '90px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1.5px solid #D4A72C',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                    flexShrink: 0
                  }}>
                    <img src="/gold1.png" alt="1kg Gold Bar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      AU · 999.9 · PURE GOLD
                    </span>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: '0.2rem 0 0.4rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Gold Bar · 1kg
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
                      Cast bar. Wholesale. Same-day settlement.
                    </p>
                  </div>
                </div>

                {/* 1kg Silver Bar Card */}
                <div style={{
                  padding: '1.75rem 2rem',
                  borderRadius: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(226, 232, 240, 0.12) 0%, rgba(2, 11, 30, 0.9) 100%)',
                  border: '1.5px solid rgba(226, 232, 240, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.75rem',
                  boxShadow: '0 10px 25px rgba(255, 255, 255, 0.05)'
                }}>
                  <div style={{
                    width: '64px',
                    height: '84px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #64748b 100%)',
                    border: '1px solid #ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f172a',
                    fontWeight: 900,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em' }}>1 KILO</span>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800 }}>FINE SILVER</span>
                    <span style={{ fontSize: '0.55rem' }}>999.9</span>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#cbd5e1', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      AG · 999.9 · FINE SILVER
                    </span>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: '0.2rem 0 0.4rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Silver Bar · 1kg
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
                      Cast bar · wholesale · same-day settlement.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* TIER II: RETAIL · GOLD BARS · 999.9 FINE */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#D4A72C', fontWeight: 700 }}>
                  ii.
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#D4A72C' }}>
                  RETAIL · GOLD BARS · 999.9 FINE
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.25)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.25rem' }}>

                {/* 1g Gold */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(197, 160, 89, 0.06)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '36px',
                    height: '50px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #f3d082 0%, #D4A72C 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffe8aa',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    1g
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#D4A72C', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AU · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Minted
                  </span>
                </div>

                {/* 50g Gold */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(197, 160, 89, 0.06)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '42px',
                    height: '56px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #f3d082 0%, #D4A72C 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffe8aa',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    50g
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#D4A72C', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AU · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Cast
                  </span>
                </div>

                {/* 100g Gold */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(197, 160, 89, 0.06)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '48px',
                    height: '62px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #f3d082 0%, #D4A72C 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffe8aa',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    100g
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#D4A72C', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AU · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Cast
                  </span>
                </div>

                {/* 500g Gold */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(197, 160, 89, 0.06)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '52px',
                    height: '68px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #f3d082 0%, #D4A72C 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffe8aa',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    500g
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#D4A72C', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AU · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Cast
                  </span>
                </div>

                {/* 1kg Gold */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(197, 160, 89, 0.06)',
                  border: '1px solid rgba(197, 160, 89, 0.4)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '74px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #f3d082 0%, #D4A72C 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffe8aa',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    1kg
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#D4A72C', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AU · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Cast
                  </span>
                </div>

              </div>
            </div>

            {/* TIER III: RETAIL · SILVER BARS · 999.9 FINE */}
            <div style={{ marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: 'italic', fontSize: '1.5rem', color: '#cbd5e1', fontWeight: 700 }}>
                  iii.
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#cbd5e1' }}>
                  RETAIL · SILVER BARS · 999.9 FINE
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(226, 232, 240, 0.25)' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 240px))', gap: '1.25rem' }}>

                {/* 1g Silver */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(226, 232, 240, 0.05)',
                  border: '1px solid rgba(226, 232, 240, 0.3)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '36px',
                    height: '50px',
                    borderRadius: '4px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffffff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    1g
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AG · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Cast
                  </span>
                </div>

                {/* 1kg Silver */}
                <div style={{
                  padding: '1.75rem 1rem',
                  borderRadius: '1.25rem',
                  background: 'rgba(226, 232, 240, 0.05)',
                  border: '1px solid rgba(226, 232, 240, 0.3)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}>
                  <div style={{
                    width: '56px',
                    height: '74px',
                    borderRadius: '6px',
                    background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
                    marginBottom: '1rem',
                    border: '1px solid #ffffff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }} />
                  <h4 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.25rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    1kg
                  </h4>
                  <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 800, letterSpacing: '0.05em' }}>
                    AG · 999.9
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                    Cast
                  </span>
                </div>

              </div>
            </div>

            {/* Certification Footer Note Banner */}
            <div style={{
              padding: '1.5rem 2rem',
              borderRadius: '1.25rem',
              background: 'rgba(197, 160, 89, 0.08)',
              border: '1px solid rgba(197, 160, 89, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '400px', lineHeight: '1.5' }}>
                All bars assayed to <strong style={{ color: '#D4A72C' }}>999.9</strong> by fire assay and XRF. Released with full international certification.
              </div>

              {/* Au · Ag Hallmark Badge */}
              <div style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                background: 'linear-gradient(135deg, #D4A72C 0%, #b08d4a 100%)',
                color: '#020b1e',
                fontWeight: 900,
                fontSize: '1rem',
                letterSpacing: '0.1em',
                boxShadow: '0 4px 15px rgba(197, 160, 89, 0.3)'
              }}>
                Au · Ag
              </div>

              <div style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.9)', maxWidth: '400px', lineHeight: '1.5', textAlign: 'right' }}>
                Bulk and institutional enquiries welcome. Same-day settlement available.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ADVISORY BANNER */}
      <section style={{ padding: '2rem 0 6rem 0' }}>
        <div className="container">
          <div className="glass-panel" style={{
            padding: '4.5rem 3.5rem',
            borderRadius: '2.5rem',
            background: 'var(--footer-bg)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: 'var(--shadow-glass)',
            color: '#ffffff',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>
              TRADE ADVISORY & EXECUTIVE EXECUTION
            </span>

            {/* Founder Profile Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2rem',
              padding: '0.85rem 1.75rem',
              borderRadius: '50px',
              background: 'rgba(2, 11, 30, 0.85)',
              border: '1.5px solid #D4A72C',
              boxShadow: '0 10px 25px rgba(212, 167, 44, 0.2)',
              backdropFilter: 'blur(10px)'
            }}>
              <img
                src="/founder.png"
                alt="Sam Tay - Founder & Managing Director"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  border: '2px solid #D4A72C',
                  flexShrink: 0
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block' }}>
                  EXECUTIVE TRADE DESK
                </span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#ffffff', margin: '0.1rem 0 0.15rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Sam Tay
                </h4>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>
                  Founder & Managing Director
                </span>
              </div>
            </div>

            <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.3rem', lineHeight: '1.85', maxWidth: '880px', margin: '0 auto 2.5rem auto' }}>
              Uniqix International Trade prioritizes reliability, clear communication, and professional execution across all mandates and commodity trades. Contact us to discuss your specific requirements for LNG, physical gold, industrial sands, or bulk commodities.
            </p>

            <button onClick={() => {setCurrentPage('contact');
                      window.scrollTo({top:0,behavior:'smooth'})
                    }} className="btn btn-primary" style={{ padding: '0.95rem 2.5rem', marginBottom: '2.5rem' }}>
              Contact Our Trade Desk <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>

            {/* DIRECT FAST CONTACT DESK (WhatsApp & Email) */}
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.15)',
              paddingTop: '2.5rem',
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                DIRECT INSTANT DESK CHANNELS
              </span>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', width: '100%', maxWidth: '650px' }}>
                {/* WhatsApp Direct */}
                <a
                  href="https://wa.me/6596262970?text=Hello%20Uniqix%20Trade%20Desk,%20I%20have%20an%20inquiry%20regarding%20Trade%20Services."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: '1 1 240px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '0.9rem 1.5rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  WhatsApp: +65 96262970
                </a>

                {/* Email Direct */}
                <a
                  href="mailto:sam@aptiveight.com?subject=Trade%20Desk%20Inquiry"
                  style={{
                    flex: '1 1 240px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '0.9rem 1.5rem',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    textDecoration: 'none',
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Mail style={{ width: '20px', height: '20px' }} />
                  Email: sam@aptiveight.com
                </a>
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
        .trade-details-panel * {
          color: #ffffff !important;
        }
        .trade-details-panel strong {
          color: #D4A72C !important;
        }
        @media (max-width: 991px) {
          .responsive-split-grid, .responsive-vision-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>

    </div>
  );
};

export default TradePage;
