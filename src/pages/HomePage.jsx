import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Star, Shield, Cpu, RefreshCw, BarChart2, Users, CheckCircle,
  Quote, Activity, Sparkles, Lightbulb, Building, Home, ShieldCheck, Layers,
  Globe, Coins, TrendingUp, UserCheck, FileText, Search, Box, Truck, Clock,
  Target, ChevronRight, ChevronLeft
} from 'lucide-react';
import Counter from '../components/Counter';
import heroImage from '../assets/uniqix_hero_logistics.png';
import logoHomeTeamNS from '../assets/hometeamns.png';
import logoObayashi from '../assets/obayashi.png';
import logoPdd from '../assets/pdd.png';
import logoSp from '../assets/sp.png';
import logoSutd from '../assets/sutd.png';

const HomePage = ({ setCurrentPage }) => {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [isIntroHovered, setIsIntroHovered] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isWhyHovered1, setIsWhyHovered1] = useState(false);
  const [isWhyHovered2, setIsWhyHovered2] = useState(false);

  // Home Page CMS Dynamic States
  const [introSettings, setIntroSettings] = useState({
    intro_title: "What Defines Uniqix ?",
    intro_text_1: "Uniqix Pte Ltd is a Singapore-based company specializing in aggregating the procurement of products and services for more than 23 industries, focusing on cost savings and technology transformation for our clients.",
    intro_text_2: "By integrating physical shipping operations, rigid compliance, and direct-from-manufacturer pricing structures, we eliminate high-margin intermediaries and supply chain vulnerabilities.",
    stat1_target: "$580M+",
    stat1_label: "Commodities Traded",
    stat2_target: "40+",
    stat2_label: "Dormitory Hubs",
    stat3_target: "100%",
    stat3_label: "Assay Traceability",
    stat4_target: "80k+",
    stat4_label: "Workers Housed"
  });
  const [testimonials, setTestimonials] = useState([]);
  const [divisions, setDivisions] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/home-settings/')
      .then(res => res.json())
      .then(data => {
        if (data) {
          if (data.settings) setIntroSettings(data.settings);
          if (data.testimonials) setTestimonials(data.testimonials);
          if (data.divisions) setDivisions(data.divisions);
        }
      })
      .catch(err => console.error("Error loading home settings:", err));
  }, []);

  const getFeatureIcon = (text, divisionColor) => {
    const style = { width: '16px', height: '16px', color: divisionColor };
    if (text.includes('FEDA') || text.includes('Verified') || text.includes('Compliant')) return <ShieldCheck style={style} />;
    if (text.includes('Safe') || text.includes('Living') || text.includes('Users')) return <Users style={style} />;
    if (text.includes('End-to-End') || text.includes('Accommodation') || text.includes('Management')) return <Home style={style} />;
    if (text.includes('Robotics') || text.includes('Advanced') || text.includes('Solutions')) return <Cpu style={style} />;
    if (text.includes('High-Quality') || text.includes('Products')) return <Layers style={style} />;
    if (text.includes('Smart') || text.includes('Energy') || text.includes('IoT') || text.includes('Innovations')) return <Lightbulb style={style} />;
    if (text.includes('Gold') || text.includes('Trading') || text.includes('Metals')) return <Coins style={style} />;
    if (text.includes('Network') || text.includes('Global')) return <Globe style={style} />;
    return <CheckCircle style={style} />;
  };

  const getDivisionIcon = (title) => {
    const style = { width: '24px', height: '24px', color: '#ffffff' };
    if (title.includes('Dormitory') || title.includes('Housing')) return <Building style={style} />;
    if (title.includes('Industrial') || title.includes('Products') || title.includes('Robotics')) return <Cpu style={style} />;
    return <Globe style={style} />;
  };

  const heroSlides = [
    {
      title: <>Foreign Worker<br /><span className="gradient-text">Dormitory Housing</span></>,
      content: "FEDA-compliant, fully-managed, secure accommodation hubs positioned near major industrial zones to ensure safety and comfort.",
      tagline: "Workforce Lodging Solutions"
    },
    {
      title: <>Advanced Specialized<br /><span className="gradient-text">Enterprise Products</span></>,
      content: "Leasing autonomous mosquito robots, sourcing bulk packaging materials, and retrofitting smart lighting for energy efficiency.",
      tagline: "Industrial Product Suite"
    },
    {
      title: <>Physical Commodity<br /><span className="gradient-text">International Trade</span></>,
      content: "Secure, regulatory-compliant trade operations spanning physical gold bullion, crude/refined oil & gas, and industrial metals.",
      tagline: "Global Trading Corridor"
    }
  ];

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [tiltStyle, setTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  });
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const [badgeTiltStyle, setBadgeTiltStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  });
  const [hoveredDivIdx, setHoveredDivIdx] = useState(null);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 20;
    const angleY = (x - xc) / 20;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.015, 1.015, 1.015)`,
      transition: 'transform 0.1s ease'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  const handleBadgeMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    setBadgeTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease'
    });
    setHoveredCardIdx(idx);
  };

  const handleBadgeMouseLeave = () => {
    setBadgeTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setHoveredCardIdx(null);
  };



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ color: 'var(--text-primary)' }}>
      {/* 1. Centered Hero Section with Background Video */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        marginTop: '-90px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '130px',
        textAlign: 'center',
        overflow: 'hidden',
        color: '#ffffff'
      }}>
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
          }}
        >
          <source src="/hero_video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Readability Overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(11, 15, 25, 0.75) 0%, rgba(11, 15, 25, 0.6) 50%, rgba(11, 15, 25, 0.8) 100%)',
          zIndex: 2,
        }} />

        {/* Content overlay */}
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 3 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            background: 'rgba(99, 102, 241, 0.15)',
            borderRadius: '50px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            marginBottom: '2rem'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1', display: 'inline-block' }}></span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em', color: '#6366f1' }}>
              {heroSlides[currentSlideIdx].tagline}
            </span>
          </div>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 800,
            lineHeight: '1.2',
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em',
            color: '#ffffff',
            minHeight: '9.6rem',
            textAlign: 'center'
          }}>
            {heroSlides[currentSlideIdx].title}
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1.25rem',
            marginBottom: '3rem',
            lineHeight: '1.7',
            maxWidth: '650px',
            margin: '0 auto 3rem auto',
            minHeight: '4.5rem'
          }}>
            {heroSlides[currentSlideIdx].content}
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => setCurrentPage('services')} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
              Explore Services <ArrowRight style={{ width: '18px', height: '18px' }} />
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="btn btn-secondary"
              style={{
                padding: '0.85rem 2rem',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff'
              }}
            >
              Request Quote
            </button>
          </div>
        </div>
      </section>

      {/* 2. Company Introduction */}
      <section>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'stretch' }}>
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              borderRadius: '1.5rem',
              boxShadow: isIntroHovered ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
              border: '1px solid var(--border-glass)',
              transformStyle: 'preserve-3d',
              ...tiltStyle,
              background: isIntroHovered ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
              transition: 'background 0.3s ease, transform 0.1s ease, box-shadow 0.3s ease'
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsIntroHovered(true)}
            onMouseLeave={(e) => {
              handleMouseLeave(e);
              setIsIntroHovered(false);
            }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>{introSettings.intro_title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '1.5rem', textAlign: 'justify' }}>
              {introSettings.intro_text_1}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', textAlign: 'justify' }}>
              {introSettings.intro_text_2}
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
            <div className="glass-panel floating-shadow-card" style={{ padding: '1rem', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.06)', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Uniqix Headquarters Building"
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: '1rem',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro Badges Grid */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              {
                icon: <Cpu style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
                title: "Compliance Integration",
                desc: "We operate in strict alignment with regional guidelines (such as FEDA housing audits in Singapore and LBMA certifications for physical gold trade)."
              },
              {
                icon: <Shield style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
                title: "Risk Mitigation",
                desc: "Comprehensive trade credit, escrow procedures, and independent third-party laboratory verification protect every transaction from trade failure."
              },
              {
                icon: <RefreshCw style={{ width: '36px', height: '36px', color: 'var(--primary)' }} />,
                title: "Logistical Efficiency",
                desc: "Optimized freight routing models and direct factory-to-port transmissions ensure minimal port delays and competitive transport costs."
              }
            ].map((badge, idx) => (
              <div
                key={idx}
                className="intro-badge-card"
                style={hoveredCardIdx === idx ? badgeTiltStyle : {}}
                onMouseMove={(e) => handleBadgeMouseMove(e, idx)}
                onMouseLeave={handleBadgeMouseLeave}
              >
                <div className="icon-container">
                  {badge.icon}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>{badge.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Solutions Summary */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>WHAT WE DO</span>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>Core Operating Divisions</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
              Uniqix operates across three key divisions, delivering integrated solutions that create value, drive efficiency, and support sustainable growth.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
            {(divisions.length > 0 ? divisions : [
              {
                tag: 'WORKFORCE INFRASTRUCTURE',
                title: 'Dormitory Housing',
                desc: 'Secure, compliant, and comfortable dormitory accommodation services for foreign workers in key industrial sectors, fully compliant with FEDA.',
                action: 'Explore Housing Services',
                target: 'services',
                color: '#2563eb',
                img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80',
                features: [
                  { text: 'FEDA Compliant Facilities' },
                  { text: 'Safe, Secure & Comfortable Living' },
                  { text: 'End-to-End Accommodation Management' }
                ]
              },
              {
                tag: 'SPECIALIZED PRODUCTS',
                title: 'Industrial Products',
                desc: 'Autonomous mosquito vector control robots, bulk packaging materials, and smart IoT lighting solutions tailored for corporate facility energy saving.',
                action: 'View Product Suite',
                target: 'products',
                color: '#0d9488',
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
                features: [
                  { text: 'Advanced Robotics Solutions' },
                  { text: 'High-Quality Industrial Products' },
                  { text: 'Smart Energy & IoT Innovations' }
                ]
              },
              {
                tag: 'PHYSICAL COMMODITIES',
                title: 'International Trade',
                desc: 'Physical Gold Trade, Physical Oil & Gas Trade, and Physical Metals trade conducted through verified, LBMA/LME-grade global trade channels.',
                action: 'Access Trade Desk',
                target: 'trade',
                color: '#f59e0b',
                img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
                features: [
                  { text: 'Gold, Oil & Gas, Metals Trading' },
                  { text: 'Verified & Compliant Trade Channels' },
                  { text: 'Global Network, Local Expertise' }
                ]
              }
            ]).map((div, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '24px',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-glass)',
                  boxShadow: hoveredDivIdx === i ? `0 20px 48px ${div.color}b3` : 'var(--shadow-glass)',
                  borderColor: hoveredDivIdx === i ? `${div.color}88` : 'var(--border-glass)',
                  transform: hoveredDivIdx === i ? 'translateY(-8px)' : 'none',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'pointer',
                  overflow: 'hidden'
                }}
                onMouseEnter={() => setHoveredDivIdx(i)}
                onMouseLeave={() => setHoveredDivIdx(null)}
              >
                <div>
                  {/* Image container with SVG curve cut at bottom */}
                  <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={div.img}
                      alt={div.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Curve background cut */}
                    <svg viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', fill: 'var(--bg-glass)', stroke: 'none' }}>
                      <path d="M0,160 C480,240,960,100,1440,160 L1440,320 L0,320 Z"></path>
                    </svg>
                    {/* Wave color matching division color */}
                    <svg viewBox="0 0 1440 320" style={{ position: 'absolute', bottom: -1, left: 0, width: '100%', fill: div.color, opacity: 0.15, stroke: 'none' }}>
                      <path d="M0,160 C480,240,960,100,1440,160 L1440,320 L0,320 Z"></path>
                    </svg>
                    {/* Floating icon */}
                    <div style={{
                      position: 'absolute',
                      left: '2rem',
                      bottom: '-2px',
                      width: '54px',
                      height: '54px',
                      borderRadius: '12px',
                      background: div.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                      zIndex: 10
                    }}>
                      {getDivisionIcon(div.title)}
                    </div>
                  </div>

                  {/* Content area */}
                  <div style={{ padding: '2.5rem 2rem 1.5rem 2rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: div.color, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>{div.tag}</span>
                    <h3 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>{div.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '2rem' }}>{div.desc}</p>

                    {/* Bullet features list */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                      {div.features && div.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: `${div.color}0a`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {getFeatureIcon(feat.text, div.color)}
                          </div>
                          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{feat.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom link button */}
                <div style={{ padding: '0 2rem 2.5rem 2rem' }}>
                  <button
                    onClick={() => setCurrentPage(div.target)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: div.color,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                  >
                    {div.action} <ArrowRight style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom horizontal highlights bar */}
          <div
            className="glass-panel"
            style={{
              padding: '1.25rem 2rem',
              borderRadius: '16px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              boxShadow: 'var(--shadow-glass)',
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center'
            }}
          >
            {[
              { text: 'Trusted & Compliant', icon: <ShieldCheck style={{ width: '18px', height: '18px', color: '#2563eb' }} /> },
              { text: 'Integrated Solutions', icon: <Users style={{ width: '18px', height: '18px', color: '#0d9488' }} /> },
              { text: 'Value Driven Approach', icon: <TrendingUp style={{ width: '18px', height: '18px', color: '#f59e0b' }} /> },
              { text: 'Global Standards, Local Commitment', icon: <Globe style={{ width: '18px', height: '18px', color: '#2563eb' }} /> }
            ].map((hl, hlIdx) => (
              <div key={hlIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {hl.icon}
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{hl.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Industries Served Section */}
      <section>
        <div className="container">
          <h2 className="section-title">Industries Served</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {[
              { title: 'Construction & Heavy Infrastructure', desc: 'Sourcing specialized materials, structural steels, and providing worker housing facilities near urban developments.', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=600&q=80' },
              { title: 'Manufacturing & Automation', desc: 'Providing packaging materials, smart lighting setups, and automated robotics to streamline manufacturing assembly lines.', img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' },
              { title: 'Logistics & Warehousing', desc: 'Supplying bulk pallet wraps, corrugated materials, and retrofitting smart light energy systems in major cargo terminals.', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80' },
              { title: 'Pest Management & Facilities', desc: 'Deploying the world\'s first autonomous vector control robots in large-scale residential and commercial areas.', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80' },
              { title: 'Mining & Metals Trading', desc: 'Managing raw ore transportation, precious metals trading contracts, and bullion logistics securely.', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
              { title: 'Energy & Refining', desc: 'Facilitating heavy physical oil products trade, LNG supply, and maritime fuel distribution networks.', img: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=600&q=80' }
            ].map((industry, i) => (
              <div key={i} className="flip-card">
                <div className="flip-card-inner">
                  {/* Front Side */}
                  <div className="flip-card-front" style={{
                    backgroundImage: `linear-gradient(rgba(11, 15, 25, 0.5), rgba(11, 15, 25, 0.6)), url(${industry.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: 'none',
                  }}>
                    <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>{industry.title}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#ffffff', marginTop: '1rem', fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.3)', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', backdropFilter: 'blur(4px)' }}>Hover to Flip</span>
                  </div>
                  {/* Back Side */}
                  <div className="flip-card-back">
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>{industry.title}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{industry.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works */}
      <section style={{ padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>OUR PROCESS</span>
            <h2 className="section-title" style={{ marginBottom: '1rem' }}>How It Works</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
              A simple, transparent, and secure process that ensures quality, compliance, and on-time delivery.
            </p>
          </div>

          {/* Single Large Parent Card Wrapper */}
          <div className="glass-panel" style={{ padding: '3.5rem 2.5rem', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.05)', background: 'var(--footer-bg)', boxShadow: 'var(--shadow-glass)', marginBottom: '5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', position: 'relative' }}>
              {[
                {
                  step: '01',
                  title: 'Specification & KYC',
                  desc: 'Client specifies material requirements or lodging needs and undergoes AML/KYC checks.',
                  color: '#2563eb',
                  icon: <FileText style={{ width: '32px', height: '32px', color: '#2563eb' }} />,
                  features: [
                    { text: 'Requirement Analysis', icon: <FileText /> },
                    { text: 'KYC Verification', icon: <UserCheck /> },
                    { text: 'Compliance Check', icon: <ShieldCheck /> }
                  ]
                },
                {
                  step: '02',
                  title: 'Global Vetting & Sync',
                  desc: 'We source from LBMA/LME-grade miners, FEDA housing complexes, or advanced IoT factories.',
                  color: '#0d9488',
                  icon: <Globe style={{ width: '32px', height: '32px', color: '#0d9488' }} />,
                  features: [
                    { text: 'Global Sourcing', icon: <Globe /> },
                    { text: 'Supplier Vetting', icon: <ShieldCheck /> },
                    { text: 'Real-time Sync & Updates', icon: <RefreshCw /> }
                  ]
                },
                {
                  step: '03',
                  title: 'Escrow & Trade Contract',
                  desc: 'Securing transaction funds through certified banking institutions and third-party inspectors.',
                  color: '#10b981',
                  icon: <FileText style={{ width: '32px', height: '32px', color: '#10b981' }} />,
                  features: [
                    { text: 'Escrow Protection', icon: <ShieldCheck /> },
                    { text: 'Trade Agreement', icon: <FileText /> },
                    { text: 'Third-party Inspection', icon: <Search /> }
                  ]
                },
                {
                  step: '04',
                  title: 'Logistics & Delivery',
                  desc: 'Customs clearance, physical cargo monitoring, and compliant check-in onboarding.',
                  color: '#f59e0b',
                  icon: <Box style={{ width: '32px', height: '32px', color: '#f59e0b' }} />,
                  features: [
                    { text: 'Customs Clearance', icon: <FileText /> },
                    { text: 'Cargo Monitoring', icon: <Activity /> },
                    { text: 'Delivery & Onboarding', icon: <Truck /> }
                  ]
                }
              ].map((stepObj, idx) => {
                const isHovered = hoveredStep === idx;
                return (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '3rem 2rem 2.5rem 2rem',
                      position: 'relative',
                      borderRadius: '24px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      background: isHovered ? '#D4A72C' : 'linear-gradient(180deg, #FFFDF8 0%, #8770dcff 100%)',
                      boxShadow: isHovered ? '0 20px 45px rgba(0, 0, 0, 0.15)' : '0 10px 25px rgba(197, 160, 89, 0.2)',
                      borderColor: isHovered ? '#ffffff' : 'rgba(197, 160, 89, 0.3)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={() => setHoveredStep(idx)}
                    onMouseLeave={() => setHoveredStep(null)}
                  >
                    {/* Arrow connector */}
                    {idx < 3 && (
                      <div className="arrow-connector" style={{
                        position: 'absolute',
                        right: '-1.5rem',
                        top: '35%',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        background: isHovered ? 'rgba(197, 160, 89, 0.2)' : 'rgba(255, 255, 255, 0.2)',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s'
                      }}>
                        <ChevronRight style={{ width: '16px', height: '16px', color: '#06122c' }} />
                      </div>
                    )}

                    {/* Bookmark/Ribbon */}
                    <div style={{
                      position: 'absolute',
                      top: '-1px',
                      left: '2rem',
                      background: isHovered ? stepObj.color : '#06122c',
                      color: '#ffffff',
                      padding: '6px 14px 10px 14px',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                      fontFamily: 'monospace',
                      transition: 'all 0.3s'
                    }}>
                      {stepObj.step}
                    </div>

                    {/* Large circular icon */}
                    <div
                      className="process-icon-container"
                      style={{
                        width: '88px',
                        height: '88px',
                        borderRadius: '50%',
                        border: isHovered ? `2px solid ${stepObj.color}25` : '2px solid rgba(6, 18, 44, 0.1)',
                        background: isHovered ? 'rgba(0, 0, 0, 0.02)' : 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '1.5rem auto 1.5rem auto',
                        boxShadow: isHovered ? `0 8px 24px ${stepObj.color}15` : 'none',
                        transition: 'all 0.3s'
                      }}
                    >
                      {isHovered ? stepObj.icon : React.cloneElement(stepObj.icon, { style: { ...stepObj.icon.props.style, color: '#06122c' } })}
                    </div>

                    <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06122c', marginBottom: '0.75rem', letterSpacing: '-0.01em', transition: 'color 0.4s' }}>
                      {stepObj.title}
                    </h4>
                    <p style={{ color: isHovered ? '#475569' : 'rgba(6, 18, 44, 0.8)', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '1.5rem', transition: 'color 0.4s' }}>
                      {stepObj.desc}
                    </p>

                    {/* Feature checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', borderTop: isHovered ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid rgba(6, 18, 44, 0.15)', paddingTop: '1.25rem', textAlign: 'left', transition: 'all 0.3s' }}>
                      {stepObj.features.map((feat, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {React.cloneElement(feat.icon, { style: { width: '14px', height: '14px', color: isHovered ? stepObj.color : '#06122c' } })}
                          <span style={{ fontSize: '0.85rem', color: isHovered ? '#475569' : 'rgba(6, 18, 44, 0.8)', fontWeight: 500, transition: 'color 0.4s' }}>
                            {feat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom horizontal highlights bar */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem 2.5rem',
              borderRadius: '20px',
              border: '1px solid var(--border-glass)',
              background: 'var(--bg-glass)',
              boxShadow: 'var(--shadow-glass)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'center'
            }}
          >
            {[
              { title: 'Secure & Compliant', desc: 'End-to-end compliance with international standards.', icon: <ShieldCheck style={{ width: '18px', height: '18px', color: '#2563eb' }} /> },
              { title: 'Transparent Process', desc: 'Real-time updates and clear communication at every step.', icon: <Clock style={{ width: '18px', height: '18px', color: '#0d9488' }} /> },
              { title: 'Global Network', desc: 'Access to trusted partners worldwide.', icon: <Globe style={{ width: '18px', height: '18px', color: '#10b981' }} /> },
              { title: 'On-Time Delivery', desc: 'Efficient logistics ensuring safe and timely delivery.', icon: <Target style={{ width: '18px', height: '18px', color: '#f59e0b' }} /> }
            ].map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', maxWidth: '240px' }}>
                <div style={{ background: `${feat.icon.props.color}0a`, padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {feat.icon}
                </div>
                <div>
                  <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px' }}>{feat.title}</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 991px) {
            .arrow-connector {
              display: none !important;
            }
          }
        `}</style>
      </section>

      {/* 6. Why Choose Uniqix */}
      <section>
        <div className="container" >
          <h2 className="section-title">Why Choose Uniqix</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div
              style={{
                padding: '2.5rem',
                borderRadius: '1.5rem',
                boxShadow: isWhyHovered1 ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
                border: '1px solid var(--border-glass)',
                borderColor: isWhyHovered1 ? 'var(--card-hover-border)' : 'var(--border-glass)',
                transformStyle: 'preserve-3d',
                ...tiltStyle,
                background: isWhyHovered1 ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                transition: 'background 0.3s ease, transform 0.1s ease'
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsWhyHovered1(true)}
              onMouseLeave={(e) => {
                handleMouseLeave(e);
                setIsWhyHovered1(false);
              }}
              className="glass-panel"
            >
              <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: '1.2', color: 'var(--text-primary)' }}>
                Powering Enterprise Supply Chains with Total Integrity
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem',textAlign:'justify' }}>
                We bridge international sourcing channels, technology production, and service compliance. Under one unified operational roof, client enterprises secure raw resources and workforce lodging seamlessly.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle style={{ color: '#4f46e5', width: '20px', height: '20px' }} />
                  <span>100% Vetted Suppliers & LBMA/LME Grade Traceability</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle style={{ color: '#4f46e5', width: '20px', height: '20px' }} />
                  <span>Comprehensive Regulatory Housing Compliance</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle style={{ color: '#4f46e5', width: '20px', height: '20px' }} />
                  <span>Structured Trade Credit & Vaulted Logistics</span>
                </li>
              </ul>
            </div>
            <div
              className="glass-panel"
              style={{
                padding: '3rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                justifyContent: 'center',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-glass)',
                background: isWhyHovered2 ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                boxShadow: isWhyHovered2 ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
                borderColor: isWhyHovered2 ? 'var(--card-hover-border)' : 'var(--border-glass)',
                transform: isWhyHovered2 ? 'translateY(-6px)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsWhyHovered2(true)}
              onMouseLeave={() => setIsWhyHovered2(false)}
            >
              <div style={{ borderLeft: '4px solid #06b6d4', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Transparent Pricing</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We operate directly with bulk manufacturers and mine operators to keep costs clear.</p>
              </div>
              <div style={{ borderLeft: '4px solid #4f46e5', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>FEDA Housing Audits</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Comprehensive building safety verification, fire codes, and sanitation management.</p>
              </div>
              <div style={{ borderLeft: '4px solid #d97706', paddingLeft: '1rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Secure Vaulting & Assay</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Precious metal trades are fully audited by LBMA refineries and independent surveyors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Statistics Section */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
          {[
            { target: introSettings.stat1_target, label: introSettings.stat1_label },
            { target: introSettings.stat2_target, label: introSettings.stat2_label },
            { target: introSettings.stat3_target, label: introSettings.stat3_label },
            { target: introSettings.stat4_target, label: introSettings.stat4_label }
          ].map((stat, idx) => {
            const [hovered, setHovered] = useState(false);
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '3rem 2rem',
                  borderRadius: '18px',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'var(--footer-bg)',
                  boxShadow: 'var(--shadow-glass)',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: hovered ? 'translateY(-6px)' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  setHovered(true);
                  e.currentTarget.style.borderColor = 'rgba(197, 160, 89, 0.35)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(197, 160, 89, 0.15)';
                }}
                onMouseLeave={(e) => {
                  setHovered(false);
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                }}
              >
                {/* Gold corner accents */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(135deg, #D4A72C 25%, transparent 25%)',
                  opacity: hovered ? 0.6 : 0.3,
                  transition: 'opacity 0.3s'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '30px',
                  height: '30px',
                  background: 'linear-gradient(315deg, #D4A72C 25%, transparent 25%)',
                  opacity: hovered ? 0.6 : 0.3,
                  transition: 'opacity 0.3s'
                }} />

                <span className="stat-number" style={{ fontSize: '3.2rem', fontWeight: 900, color: '#D4A72C', display: 'block', marginBottom: '0.75rem', letterSpacing: '-0.03em' }}>
                  <Counter target={stat.target} trigger={hovered} />
                </span>
                <span style={{ color: '#ffffff', opacity: 0.85, fontSize: '0.98rem', fontWeight: 700, letterSpacing: '0.01em' }}>{stat.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Testimonials Section (3D Stacked Carousel) */}
      <section style={{ padding: '6rem 0', overflow: 'hidden', position: 'relative' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>Corporate Feedback</h2>

          <div style={{ position: 'relative', width: '100%', maxWidth: '1120px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Left Button */}
            <button
              onClick={() => {
                const len = testimonials.length > 0 ? testimonials.length : 4;
                setActiveTestimonial(prev => (prev - 1 + len) % len);
              }}
              style={{
                position: 'absolute',
                left: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '102px',
                height: '102px',
                borderRadius: '50%',
                background: 'var(--primary)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(197, 160, 89, 0.35)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(197, 160, 89, 0.55)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(197, 160, 89, 0.35)'; }}
            >
              <ChevronLeft style={{ width: '22px', height: '22px', strokeWidth: 3 }} />
            </button>

            {/* Stacked Cards */}
            <div style={{
              position: 'relative',
              height: '340px',
              width: '100%',
              maxWidth: '520px',
              perspective: '1000px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {(testimonials.length > 0 ? testimonials : [
                {
                  quote: "Deploying the Uniqix mosquito control robots in our construction staging grounds significantly decreased our vector counts and ensured local environmental safety compliance.",
                  name: "Director of Operations",
                  role: "Hyundai Engineering & Construction",
                  initials: "HC",
                  color: "#06b6d4"
                },
                {
                  quote: "Uniqix managed our corporate worker lodging transitions flawlessly. All 800 staff were successfully housed in fully compliant, high-quality, safe dormitories in Tuas.",
                  name: "VP of HR & Logistics",
                  role: "Mitsui Logistics Singapore",
                  initials: "ML",
                  color: "var(--primary)"
                },
                {
                  quote: "Their precious metals desk is top-tier. Sourcing physical gold bullion through their audited refinery logistics eliminated our supply chain security concerns completely.",
                  name: "Managing Director",
                  role: "Kiewit Metals Corp",
                  initials: "KM",
                  color: "#f59e0b"
                },
                {
                  quote: "The Smart Lighting retrofits reduced our warehouse energy consumption by 55% within the first month. Excellent ROI and execution.",
                  name: "Sustainability Manager",
                  role: "Bouygues Building Asia",
                  initials: "BA",
                  color: "#ec4899"
                }
              ]).map((t, idx) => {
                const len = (testimonials.length > 0 ? testimonials.length : 4);
                const offset = (idx - activeTestimonial + len) % len;
                const isActive = offset === 0;
                const isNext = offset === 1;
                const isPrev = offset === len - 1;

                let transformStyle = 'translate3d(0, 100px, -200px) scale(0.8)';
                let opacityVal = 0;
                let zIndexVal = 1;
                let pointerEventsStyle = 'none';

                if (isActive) {
                  transformStyle = 'translate3d(0, 0, 0) scale(1)';
                  opacityVal = 1;
                  zIndexVal = 3;
                  pointerEventsStyle = 'auto';
                } else if (isNext) {
                  transformStyle = 'translate3d(120px, 0, -100px) scale(0.9)';
                  opacityVal = 0.55;
                  zIndexVal = 2;
                } else if (isPrev) {
                  transformStyle = 'translate3d(-120px, 0, -100px) scale(0.9)';
                  opacityVal = 0.55;
                  zIndexVal = 2;
                }

                return (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '2.5rem',
                      width: '100%',
                      maxWidth: '460px',
                      height: '280px',
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderRadius: '24px',
                      border: '1px solid var(--border-glass)',
                      borderLeft: `4px solid ${t.color}`,
                      background: 'var(--bg-glass)',
                      boxShadow: isActive ? 'var(--card-hover-shadow)' : 'var(--shadow-glass)',
                      transform: transformStyle,
                      opacity: opacityVal,
                      zIndex: zIndexVal,
                      pointerEvents: pointerEventsStyle,
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <Quote style={{ width: '32px', height: '32px', color: 'rgba(65, 164, 222, 0.08)', position: 'absolute', top: '20px', right: '20px' }} />
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '1.75rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                      "{t.quote}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${t.color === 'var(--primary)' ? '#41a4de' : t.color} 0%, rgba(255, 255, 255, 0.1) 100%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.85rem',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.06)'
                      }}>
                        {t.initials}
                      </div>
                      <div>
                        <h5 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 0.15rem 0' }}>{t.name}</h5>
                        <span style={{ fontSize: '0.8rem', color: t.color, fontWeight: 600 }}>{t.role}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Button */}
            <button
              onClick={() => {
                const len = testimonials.length > 0 ? testimonials.length : 4;
                setActiveTestimonial(prev => (prev + 1) % len);
              }}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '102px',
                height: '102px',
                borderRadius: '50%',
                background: 'var(--primary)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(197, 160, 89, 0.35)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(197, 160, 89, 0.55)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(197, 160, 89, 0.35)'; }}
            >
              <ChevronRight style={{ width: '22px', height: '22px', strokeWidth: 3 }} />
            </button>
          </div>

          {/* Dots Indicator (Centered Underneath) */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2.5rem' }}>
            {Array.from({ length: testimonials.length > 0 ? testimonials.length : 4 }).map((_, dotIdx) => (
              <span
                key={dotIdx}
                onClick={() => setActiveTestimonial(dotIdx)}
                style={{
                  width: activeTestimonial === dotIdx ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: activeTestimonial === dotIdx ? 'var(--primary)' : 'rgba(197, 160, 89, 0.25)',
                  display: 'inline-block',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 9. Partners Section */}
      <section>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 className="section-title">Leading the Way</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <img src={logoHomeTeamNS} alt="HomeTeamNS" style={{ height: '55px', objectFit: 'contain', marginRight: '5px' }} />
            <img src={logoObayashi} alt="Obayashi" style={{ height: '55px', objectFit: 'contain', marginRight: '5px' }} />
            <img src={logoPdd} alt="Punggol Digital District" style={{ height: '55px', objectFit: 'contain', marginRight: '5px' }} />
            <img src={logoSp} alt="Singapore Polytechnic" style={{ height: '55px', objectFit: 'contain', marginRight: '5px' }} />
            <img src={logoSutd} alt="SUTD" style={{ height: '55px', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* 10. Call to Action (CTA) */}
      <section style={{ paddingBottom: '7rem', background: 'var(--bg-section-cta)' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', background: 'var(--footer-bg)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'var(--shadow-glass)', borderRadius: '2rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>Ready to Secure Your B2B Operations?</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.05rem' }}>
              Connect with our trade coordinators and facilities managers to initiate custom sourcing plans, query dormitory bed availability, or lease robotics.
            </p>
            <button onClick={() =>{ setCurrentPage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
              Contact Global Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
