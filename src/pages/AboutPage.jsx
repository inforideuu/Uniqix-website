import React, { useState, useEffect } from 'react';
import {
  Building, HardHat, Factory, Compass, Truck, Flame, Home, Cpu,
  Layers, Users, ShieldAlert, Award, Target, Eye, Sparkles,
  Lightbulb, Briefcase, RefreshCw, Box, ShieldCheck, HeartHandshake,
  TrendingUp, Users2, Shield, Heart, Globe, Calendar, FileText, Leaf, Phone, Mail
} from 'lucide-react';
import aboutOfficeImage from '../assets/uniqix_hero_logistics.png'; // Fallback / existing asset
import { API_BASE_URL } from '../config';

const AboutPage = () => {
  const [settings, setSettings] = useState({
    who_we_are_title: "Welcome to Uniqix Pte Ltd",
    who_we_are_text: "Uniqix Pte Ltd is a Singapore-based company specializing in aggregating the procurement of products and services for more than 23 industries, fostering a merit savings and technology transformation for our clients.",
    stat_industries: "23+",
    stat_partners: "100+",
    stat_headquarters: "Singapore",
    stat_global_network: "50+ Countries",
    stat_trusted_partners: "500+",
    stat_solutions_delivered: "10K+",
    stat_years_excellence: "7+",
    vision_text: "To become the biggest B2B Procurement Aggregation Platform in Asia Pacific.",
    mission_text: "To continuously identify our clients’ procurement needs and source for the best quality and most value-for-money products and services to match those needs.",
    incorporation_date: "26 July 2016 in Singapore",
    uen_number: "201620244N",
    registration_type: "Exempt Private Company Limited by Shares",
    principal_activity: "Retail sale of other household utensils and equipment n.e.c.",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/about-settings/`)
      .then(res => res.json())
      .then(data => {
        if (data && !data.error) {
          setSettings(data);
        }
      })
      .catch(err => console.error("Error loading about settings:", err));
  }, []);

  const corporateConsumers = [
    { name: 'Construction', icon: <HardHat style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Manufacturing', icon: <Factory style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Engineering', icon: <Compass style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Logistics', icon: <Truck style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Energy', icon: <Flame style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Facility Management', icon: <Home style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Industrial Operations', icon: <Cpu style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
  ];

  const tradePartners = [
    { name: 'Suppliers', icon: <Layers style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Manufacturers', icon: <Factory style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Service Providers', icon: <Users style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Technology Partners', icon: <Cpu style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Global Sources', icon: <Globe style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Logistics Partners', icon: <Truck style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
    { name: 'Industry Experts', icon: <Award style={{ width: '16px', height: '16px', color: '#D4A72C' }} /> },
  ];

  const bridgeSolutions = [
    { name: 'Procurement Services', icon: <Briefcase style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
    { name: 'AI Robotics', icon: <Cpu style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
    { name: 'Smart Energy Solutions', icon: <Lightbulb style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
    { name: 'Sustainable Packaging', icon: <Box style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
    { name: 'International Trade', icon: <Globe style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
  ];

  const coreValues = [
    {
      name: 'Integrity',
      desc: 'We act with honesty, transparency, and strong ethical standards in everything we do.',
      color: '#2563eb',
      icon: <ShieldCheck style={{ width: '24px', height: '24px', color: '#2563eb' }} />
    },
    {
      name: 'Innovation',
      desc: 'We embrace new ideas and technologies to deliver smarter, more effective solutions.',
      color: '#06b6d4',
      icon: <Lightbulb style={{ width: '24px', height: '24px', color: '#06b6d4' }} />
    },
    {
      name: 'Collaboration',
      desc: 'We believe in the power of partnerships and teamwork to achieve shared success.',
      color: '#10b981',
      icon: <HeartHandshake style={{ width: '24px', height: '24px', color: '#10b981' }} />
    },
    {
      name: 'Sustainability',
      desc: 'We are committed to responsible practices that protect the planet and support communities.',
      color: '#84cc16',
      icon: <Leaf style={{ width: '24px', height: '24px', color: '#84cc16' }} />
    },
    {
      name: 'Excellence',
      desc: 'We strive for the highest quality in our products, services, and relationships every single day.',
      color: '#f59e0b',
      icon: <Award style={{ width: '24px', height: '24px', color: '#f59e0b' }} />
    },
    {
      name: 'Customer Focus',
      desc: 'We listen, understand, and deliver value that helps our clients grow and succeed.',
      color: '#8b5cf6',
      icon: <Users2 style={{ width: '24px', height: '24px', color: '#8b5cf6' }} />
    },
  ];

  // Interactive 3D Tilt states for bottom solutions cards
  const [hoveredCardIdx, setHoveredCardIdx] = useState(null);
  const [cardTiltStyle, setCardTiltStyle] = useState({});

  // Hover states for Left & Right main list cards
  const [isCorpHovered, setIsCorpHovered] = useState(false);
  const [isTradeHovered, setIsTradeHovered] = useState(false);

  // 3D Tilt for Company Profile
  const [profileTiltStyle, setProfileTiltStyle] = useState({});
  const [isProfileHovered, setIsProfileHovered] = useState(false);

  // 3D Tilt for Core Values
  const [hoveredValueIdx, setHoveredValueIdx] = useState(null);
  const [valueTiltStyle, setValueTiltStyle] = useState({});

  // 3D Tilt for Bottom Highlight Banner
  const [bannerTiltStyle, setBannerTiltStyle] = useState({});
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const handleMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 8;
    const angleY = (x - xc) / 8;
    setCardTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale3d(1.03, 1.03, 1.03)`,
      boxShadow: '0 20px 40px rgba(197, 160, 89, 0.35)',
      borderColor: 'rgba(197, 160, 89, 0.65)',
      background: '#df9f28ff',
      transition: 'transform 0.1s ease'
    });
    setHoveredCardIdx(idx);
  };

  const handleMouseLeave = () => {
    setCardTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setHoveredCardIdx(null);
  };

  // Profile Card Tilt handlers
  const handleProfileMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 25;
    const angleY = (x - xc) / 25;
    setProfileTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px)`,
      boxShadow: '0 25px 50px rgba(197, 160, 89, 0.18)',
      borderColor: 'rgba(197, 160, 89, 0.45)',
      transition: 'transform 0.1s ease'
    });
    setIsProfileHovered(true);
  };

  const handleProfileMouseLeave = () => {
    setProfileTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setIsProfileHovered(false);
  };

  // Value Card Tilt handlers
  const handleValueMouseMove = (e, idx) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 10;
    const angleY = (x - xc) / 10;
    setValueTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
      transition: 'transform 0.1s ease'
    });
    setHoveredValueIdx(idx);
  };

  const handleValueMouseLeave = () => {
    setValueTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setHoveredValueIdx(null);
  };

  // Banner Tilt handlers
  const handleBannerMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 30;
    const angleY = (x - xc) / 30;
    setBannerTiltStyle({
      transform: `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px)`,
      boxShadow: '0 20px 40px rgba(197, 160, 89, 0.2)',
      transition: 'transform 0.1s ease'
    });
    setIsBannerHovered(true);
  };

  const handleBannerMouseLeave = () => {
    setBannerTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    setIsBannerHovered(false);
  };

  return (
    <div style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* 1. WHO WE ARE Section */}
      <section style={{ padding: '6rem 0 4rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>

          {/* Left Text Block */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '40px', height: '1px', background: '#D4A72C' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>WHO WE ARE</span>
              <div style={{ width: '40px', height: '1px', background: '#D4A72C' }} />
            </div>

            <h1 style={{ fontSize: '3rem', fontWeight: 850, lineHeight: '1.15', color: 'var(--text-primary)', marginBottom: '2rem', fontFamily: '"Times New Roman", Times, serif' }}>
              {settings.who_we_are_title}
            </h1>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '2.5rem', textAlign: 'justify', maxWidth: '480px' }}>
              {settings.who_we_are_text}
            </p>

            {/* Stats Row */}
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              {/* Stat 1 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.08)',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Users style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{settings.stat_industries}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Industries</div>
                </div>
              </div>

              {/* Stat 2 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.08)',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Award style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{settings.stat_partners}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global Partners</div>
                </div>
              </div>

              {/* Stat 3 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.08)',
                  border: '1px solid rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Globe style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{settings.stat_headquarters}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Headquartered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Block with Premium Double Gold Border */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', padding: '1rem' }}>
            {/* Underlying Gold Outline Frame */}
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              width: '100%',
              maxWidth: '480px',
              height: '92%',
              border: '2px solid #D4A72C',
              borderRadius: '2rem 6rem 2rem 6rem',
              zIndex: 1,
              transform: 'translate(12px, 12px)'
            }} />

            {/* Image Container */}
            <div style={{
              borderRadius: '2rem 6rem 2rem 6rem',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '480px',
              position: 'relative',
              zIndex: 2,
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }}>
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                alt="Uniqix Corporate Office"
                style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 FOUNDER & LEADERSHIP SPOTLIGHT */}
      <section style={{ padding: '2rem 0 5rem 0', position: 'relative' }}>
        <div className="container">
          <div
            className="glass-panel"
            style={{
              borderRadius: '2.5rem',
              background: 'linear-gradient(135deg, rgba(2, 11, 30, 0.97) 0%, rgba(10, 18, 36, 0.93) 100%)',
              border: '2px solid #D4A72C',
              padding: '4.5rem 4rem',
              boxShadow: '0 25px 60px rgba(212, 167, 44, 0.25)',
              color: '#ffffff',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Ambient Glow */}
            <div style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '450px',
              height: '450px',
              background: 'radial-gradient(circle, rgba(212, 167, 44, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.35fr', gap: '4rem', alignItems: 'center' }} className="bridge-layout">

              {/* LEFT: FOUNDER PORTRAIT CARD (founder.png) */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                {/* Gold Outer Dashed Frame */}
                <div style={{
                  position: 'absolute',
                  inset: '-12px',
                  borderRadius: '2.4rem',
                  border: '1.5px dashed rgba(212, 167, 44, 0.6)',
                  pointerEvents: 'none'
                }} />

                <div style={{
                  position: 'relative',
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  width: '100%',
                  maxWidth: '420px',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 167, 44, 0.2)',
                  border: '2.5px solid #D4A72C',
                  background: '#020b1e'
                }}>
                  <img
                    src="/founder.png"
                    alt="Sam Tay - Founder & Managing Director"
                    style={{
                      width: '100%',
                      height: '480px',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      display: 'block'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(2, 11, 30, 0.95) 0%, rgba(2, 11, 30, 0.2) 50%, transparent 100%)'
                  }} />

                  {/* Founder Nameplate Overlay */}
                  <div style={{
                    position: 'absolute',
                    bottom: '1.75rem',
                    left: '1.75rem',
                    right: '1.75rem',
                    background: 'rgba(2, 11, 30, 0.88)',
                    border: '1.5px solid rgba(212, 167, 44, 0.7)',
                    borderRadius: '1.25rem',
                    padding: '1.25rem 1.5rem',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
                  }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
                      UNIQIX LEADERSHIP
                    </span>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#ffffff', margin: '0 0 0.2rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Sam Tay
                    </h3>
                    <span style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600, display: 'block', marginBottom: '0.75rem' }}>
                      Founder & Managing Director
                    </span>

                    {/* Direct Contact Details */}
                    <div style={{ borderTop: '1px solid rgba(212, 167, 44, 0.35)', paddingTop: '0.65rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <a
                        href="https://wa.me/6596262970?text=Hello%20Sam,%20I%20have%20an%20inquiry%20regarding%20Uniqix."
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#10B981',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textDecoration: 'none'
                        }}
                      >
                        <Phone style={{ width: '14px', height: '14px', color: '#10B981' }} />
                        +65 96262970
                      </a>
                      <a
                        href="mailto:Sam@uniqix.com?subject=Inquiry%20for%20Sam%20Tay%20-%20Uniqix"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#ffffff',
                          fontWeight: 700,
                          fontSize: '0.82rem',
                          textDecoration: 'none'
                        }}
                      >
                        <Mail style={{ width: '14px', height: '14px', color: '#D4A72C' }} />
                        Sam@uniqix.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: FOUNDER'S MESSAGE & VISION */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Sparkles style={{ width: '18px', height: '18px', color: '#D4A72C' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    FOUNDER'S VISION & MESSAGE
                  </span>
                </div>

                <h2 style={{
                  fontSize: '2.8rem',
                  fontWeight: 900,
                  color: '#ffffff',
                  fontFamily: "'Playfair Display', Georgia, serif",
                  lineHeight: '1.2',
                  marginBottom: '1.75rem'
                }}>
                  "Building bridges of trust across <em style={{ fontStyle: 'italic', color: '#D4A72C' }}>global trade</em>."
                </h2>

                <div style={{ width: '60px', height: '3px', background: '#D4A72C', borderRadius: '2px', marginBottom: '2rem' }} />

                <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.15rem', lineHeight: '1.85', marginBottom: '1.75rem', fontStyle: 'italic' }}>
                  "Uniqix was established with a singular vision: to revolutionize B2B procurement and trade aggregation by connecting verified buyers and suppliers across 23+ industries with complete transparency and execution excellence."
                </p>

                <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.02rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                  Under Sam Tay's leadership, Uniqix has grown from its Singapore headquarters into an international trade, energy mandate, precious metals trading, and AI-driven procurement power serving global corporate clients.
                </p>

                {/* Key Leadership Highlights Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid rgba(212, 167, 44, 0.3)', paddingTop: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(212, 167, 44, 0.15)', border: '1px solid #D4A72C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Globe style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#D4A72C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>GLOBAL NETWORK</div>
                      <div style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 800 }}>50+ Countries</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(212, 167, 44, 0.15)', border: '1px solid #D4A72C', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ShieldCheck style={{ width: '22px', height: '22px', color: '#D4A72C' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#D4A72C', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>HEADQUARTERS</div>
                      <div style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 800 }}>Singapore UEN 201620244N</div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR BUSINESS MODEL Section */}
      <section style={{
        padding: '6rem 0',
        borderTop: '1px solid var(--border-glass)',
        background: 'var(--bg-secondary)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative gold curves in background */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '-5%',
          width: '400px',
          height: '400px',
          backgroundImage: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          backgroundImage: 'radial-gradient(ellipse at center, rgba(197, 160, 89, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ maxWidth: '1200px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              OUR BUSINESS MODEL
            </span>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 850,
              color: 'var(--text-primary)',
              marginTop: '0.5rem',
              marginBottom: '0.75rem',
              fontFamily: '"Times New Roman", Times, serif'
            }}>
              Bridging Possibilities. Delivering Value.
            </h2>
            <div style={{ width: '80px', height: '3px', background: '#D4A72C', margin: '0.5rem auto 1.5rem auto', borderRadius: '2px' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Uniqix connects corporate consumers with trusted trade partners to create a seamless ecosystem of supply, solutions, and growth.
            </p>
          </div>

          {/* Bridge Interaction Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '2rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', position: 'relative' }} className="bridge-layout">

            {/* Left Box: Corporate Consumers */}
            <div
              className="glass-panel"
              style={{
                background: 'var(--bg-glass)',
                borderRadius: '1.5rem',
                boxShadow: 'var(--shadow-glass)',
                border: '1px solid var(--border-glass)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                background: 'var(--footer-bg)',
                color: '#ffffff',
                padding: '1.5rem 1.25rem',
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <Users style={{ width: '18px', height: '18px', color: '#ffffff' }} />
                <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, color: '#ffffff' }}>CORPORATE</div>
                  <div style={{ color: '#ffffff' }}>CONSUMERS</div>
                </div>
              </div>
              <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {corporateConsumers.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(197, 160, 89, 0.06)',
                      border: '1px solid rgba(197, 160, 89, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {React.cloneElement(item.icon, { style: { width: '13px', height: '13px', color: '#D4A72C' } })}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Bridge Illustration */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem', position: 'relative' }}>

              {/* UNIQIX Logo Text Above Bridge */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '0.08em', marginBottom: '2px' }}>UNIQIX</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', opacity: 0.8 }}>THE CONNECTING EDGE</div>
              </div>

              <div style={{ width: '100%', position: 'relative' }}>

                {/* Gold bridge graphic matching image */}
                <svg viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                  {/* Gold Dotted Arch Connections */}
                  <path d="M 10 120 C 120 70, 220 70, 250 120" stroke="#D4A72C" strokeWidth="2.5" strokeDasharray="3 4" opacity="0.7" />
                  <path d="M 250 120 C 280 70, 380 70, 490 120" stroke="#D4A72C" strokeWidth="2.5" strokeDasharray="3 4" opacity="0.7" />
                  <path d="M 10 130 C 120 85, 220 85, 250 120" stroke="#D4A72C" strokeWidth="1.5" strokeDasharray="1 3" opacity="0.4" />
                  <path d="M 250 120 C 280 85, 380 85, 490 130" stroke="#D4A72C" strokeWidth="1.5" strokeDasharray="1 3" opacity="0.4" />

                  {/* Arches of the bridge */}
                  <path d="M 20 180 Q 135 110 250 180" stroke="#D4A72C" strokeWidth="4.5" fill="none" opacity="0.9" />
                  <path d="M 250 180 Q 365 110 480 180" stroke="#D4A72C" strokeWidth="4.5" fill="none" opacity="0.9" />
                  <path d="M 20 180 Q 135 125 250 180" stroke="#D4A72C" strokeWidth="1.5" fill="none" opacity="0.6" />
                  <path d="M 250 180 Q 365 125 480 180" stroke="#D4A72C" strokeWidth="1.5" fill="none" opacity="0.6" />

                  {/* Vertical pillars */}
                  <line x1="80" y1="140" x2="80" y2="160" stroke="#D4A72C" strokeWidth="2.5" />
                  <line x1="135" y1="140" x2="135" y2="150" stroke="#D4A72C" strokeWidth="2.5" />
                  <line x1="190" y1="140" x2="190" y2="160" stroke="#D4A72C" strokeWidth="2.5" />

                  <line x1="310" y1="140" x2="310" y2="160" stroke="#D4A72C" strokeWidth="2.5" />
                  <line x1="365" y1="140" x2="365" y2="150" stroke="#D4A72C" strokeWidth="2.5" />
                  <line x1="420" y1="140" x2="420" y2="160" stroke="#D4A72C" strokeWidth="2.5" />

                  {/* Bridge Deck */}
                  <line x1="10" y1="140" x2="490" y2="140" stroke="#06122c" strokeWidth="6.5" strokeLinecap="round" />
                  <line x1="10" y1="145" x2="490" y2="145" stroke="#D4A72C" strokeWidth="2" strokeLinecap="round" />

                  {/* Water Reflection */}
                  <path d="M 10 195 Q 125 190 250 195 T 490 195" stroke="rgba(197, 160, 89, 0.25)" strokeWidth="2.5" />
                  <path d="M 30 205 Q 140 202 250 205 T 470 205" stroke="rgba(197, 160, 89, 0.15)" strokeWidth="1.5" />
                </svg>

                {/* Central circular badge overlay */}
                <div style={{
                  position: 'absolute',
                  top: '59%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: '#06122c',
                  border: '4px solid #D4A72C',
                  boxShadow: '0 4px 15px rgba(197, 160, 89, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 5
                }}>
                  <span style={{ color: '#ffffff', fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.05em' }}>UNIQIX</span>
                </div>

              </div>

              {/* Three inline badges underneath the bridge */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  <Briefcase style={{ width: '15px', height: '15px', color: '#D4A72C' }} /> Streamlined Procurement
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                  <Users style={{ width: '15px', height: '15px', color: '#D4A72C' }} /> Trusted Partnerships
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#D4A72C', fontWeight: 700 }}>
                  <TrendingUp style={{ width: '15px', height: '15px', color: '#D4A72C' }} /> Sustainable Growth
                </div>
              </div>

            </div>

            {/* Right Box: Trade Partners */}
            <div
              className="glass-panel"
              style={{
                background: 'var(--bg-glass)',
                borderRadius: '1.5rem',
                boxShadow: 'var(--shadow-glass)',
                border: '1px solid var(--border-glass)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                background: 'var(--footer-bg)',
                color: '#ffffff',
                padding: '1.5rem 1.25rem',
                textAlign: 'center',
                fontWeight: 800,
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <HeartHandshake style={{ width: '18px', height: '18px', color: '#ffffff' }} />
                <div style={{ textAlign: 'left', lineHeight: '1.2' }}>
                  <div style={{ fontSize: '0.7rem', opacity: 0.7, color: '#ffffff' }}>TRADE</div>
                  <div style={{ color: '#ffffff' }}>PARTNERS</div>
                </div>
              </div>
              <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {tradePartners.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    fontWeight: 600
                  }}>
                    <div style={{
                      width: '26px',
                      height: '26px',
                      borderRadius: '50%',
                      background: 'rgba(197, 160, 89, 0.06)',
                      border: '1px solid rgba(197, 160, 89, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {React.cloneElement(item.icon, { style: { width: '13px', height: '13px', color: '#D4A72C' } })}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Grid: 5 Solutions Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '1.25rem',
            marginTop: '5rem'
          }} className="bridge-solutions-grid">
            {[
              {
                name: 'Procurement Services',
                desc: 'End-to-end procurement solutions tailored to your business needs.',
                icon: <Briefcase style={{ width: '22px', height: '22px' }} />
              },
              {
                name: 'AI Robotics',
                desc: 'Autonomous solutions powered by advanced AI for a smarter tomorrow.',
                icon: <Cpu style={{ width: '22px', height: '22px' }} />
              },
              {
                name: 'Smart Energy Solutions',
                desc: 'Energy-efficient systems innovatively designed for a sustainable future.',
                icon: <Lightbulb style={{ width: '22px', height: '22px' }} />
              },
              {
                name: 'Sustainable Packaging',
                desc: 'Eco-friendly packaging solutions innovative for a greener planet.',
                icon: <Box style={{ width: '22px', height: '22px' }} />
              },
              {
                name: 'International Trade',
                desc: 'Global trade solutions connecting markets and opportunities.',
                icon: <Globe style={{ width: '22px', height: '22px' }} />
              }
            ].map((sol, idx) => {
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '2.25rem 1.25rem',
                    borderRadius: '1.25rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-glass)',
                    boxShadow: 'var(--shadow-glass)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = '#D4A72C';
                    e.currentTarget.style.boxShadow = 'var(--card-hover-shadow)';
                    e.currentTarget.style.background = 'var(--bg-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'var(--border-glass)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                    e.currentTarget.style.background = 'var(--bg-glass)';
                  }}
                >
                  <div style={{
                    background: 'rgba(197, 160, 89, 0.05)',
                    border: '2px solid #D4A72C',
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {React.cloneElement(sol.icon, { style: { ...sol.icon.props.style, color: '#D4A72C' } })}
                  </div>
                  <div style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    lineHeight: '1.3',
                    marginBottom: '0.5rem'
                  }}>
                    {sol.name}
                  </div>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.4'
                  }}>
                    {sol.desc}
                  </div>
                  <div style={{ width: '36px', height: '2px', background: '#D4A72C', margin: '0.75rem auto 0 auto', borderRadius: '1px' }} />
                </div>
              );
            })}
          </div>

          {/* Dark Blue stats bar at the bottom */}
          <div style={{
            background: 'var(--footer-bg)',
            borderRadius: '1rem',
            padding: '1.75rem 3rem',
            marginTop: '4rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            boxShadow: 'var(--shadow-glass)'
          }} className="bridge-stats-bar">

            {/* Stat 1 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Globe style={{ width: '28px', height: '28px', color: '#D4A72C' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Global Network</span>
                <span style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>{settings.stat_global_network}</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.15)' }} className="stats-divider" />

            {/* Stat 2 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Users style={{ width: '28px', height: '28px', color: '#D4A72C' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Trusted Partners</span>
                <span style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>{settings.stat_trusted_partners}</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.15)' }} className="stats-divider" />

            {/* Stat 3 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <TrendingUp style={{ width: '28px', height: '28px', color: '#D4A72C' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solutions Delivered</span>
                <span style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>{settings.stat_solutions_delivered}</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.15)' }} className="stats-divider" />

            {/* Stat 4 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Award style={{ width: '28px', height: '28px', color: '#D4A72C' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years of Excellence</span>
                <span style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 800 }}>{settings.stat_years_excellence}</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. VISION & MISSION Section */}
      <section style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>

          {/* Vision Column */}
          <div style={{
            position: 'relative',
            background: 'url("https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80") center/cover no-repeat',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 4rem',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(74, 28, 28, 0.85)',
              zIndex: 1
            }} />
            <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', maxWidth: '500px' }}>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>Our Vision</h3>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.95)' }}>
                {settings.vision_text}
              </p>
            </div>
          </div>

          {/* Mission Column */}
          <div style={{
            position: 'relative',
            background: 'url("https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80") center/cover no-repeat',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            padding: '6rem 4rem',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(38, 38, 38, 0.85)',
              zIndex: 1
            }} />
            <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', maxWidth: '500px' }}>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>Our Mission</h3>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.95)' }}>
                {settings.mission_text}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. CORPORATE HISTORY / Company Profile */}
      <section style={{
        padding: '6rem 0',
        borderTop: '1px solid var(--border-glass)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Faded World Map Pattern Background Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03,
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>

          <div
            className="profile-card"
            style={{
              position: 'relative',
              background: 'var(--footer-bg)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '18px',
              padding: '3.5rem 3rem',
              boxShadow: 'var(--shadow-glass)',
              transformStyle: 'preserve-3d',
              overflow: 'hidden',
              ...profileTiltStyle
            }}
            onMouseMove={handleProfileMouseMove}
            onMouseLeave={handleProfileMouseLeave}
          >
            {/* Gold corner design accents */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #D4A72C 25%, transparent 25%)',
              opacity: 0.35
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(315deg, #D4A72C 25%, transparent 25%)',
              opacity: 0.35
            }} />

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                CORPORATE HISTORY
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, color: '#ffffff', margin: 0, fontFamily: '"Times New Roman", Times, serif' }}>
                Company Profile
              </h2>
              <div style={{ width: '50px', height: '2px', background: '#D4A72C', margin: '0.75rem auto 0 auto', borderRadius: '2px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="bridge-layout">
              {/* Left Column stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* Stat 1 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Calendar style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Incorporation Details
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                      {settings.incorporation_date}
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileText style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Unique Entity Number (UEN)
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                      {settings.uen_number}
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)', paddingLeft: '3rem' }} className="no-border-mobile">

                {/* Stat 3 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Building style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Company Status
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                      Live Company
                    </div>
                  </div>
                </div>

                {/* Stat 4 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Layers style={{ width: '20px', height: '20px', color: '#D4A72C' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Company Type
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                      {settings.registration_type}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Values Section */}
      <section style={{ padding: '6rem 0', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>
              OUR FOUNDATION
            </span>
            <h2 style={{
              fontSize: '2.8rem',
              fontWeight: 850,
              color: 'var(--text-primary)',
              marginTop: '0.5rem',
              marginBottom: '1.25rem',
              fontFamily: '"Times New Roman", Times, serif'
            }}>
              Our Core Values
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
              These values guide our decisions, shape our culture, and define how we create value for our partners and communities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
            {coreValues.map((val, idx) => {
              const isHovered = hoveredValueIdx === idx;
              return (
                <div
                  key={idx}
                  className="value-card"
                  style={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2.5rem 1.25rem 2rem 1.25rem',
                    borderRadius: '16px',
                    border: '1px solid var(--border-glass)',
                    borderBottom: `4px solid ${val.color}`,
                    borderTop: `4px solid ${val.color}`,
                    background: isHovered ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                    boxShadow: 'var(--shadow-glass)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease',
                    ...(isHovered ? valueTiltStyle : {})
                  }}
                  onMouseMove={(e) => handleValueMouseMove(e, idx)}
                  onMouseLeave={handleValueMouseLeave}
                >
                  {/* Top circular icon backdrop */}
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--bg-glass), var(--bg-secondary))',
                    border: `1px solid ${val.color}35`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.05)',
                    transform: 'translateZ(10px)',
                    transition: 'all 0.3s'
                  }}>
                    {val.icon}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, transform: 'translateZ(15px)' }}>
                    {val.name}
                  </h3>

                  {/* Horizontal line segment */}
                  <div style={{ width: '25px', height: '2px', background: val.color, margin: '0.75rem auto 1rem auto', borderRadius: '2px' }} />

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom horizontal highlight bar */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem 3rem',
              borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.05)',
              background: 'var(--footer-bg)',
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              boxShadow: 'var(--shadow-glass)',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              position: 'relative',
              overflow: 'hidden',
              ...bannerTiltStyle
            }}
            onMouseMove={handleBannerMouseMove}
            onMouseLeave={handleBannerMouseLeave}
          >
            {/* Faded Globe illustration on the right */}
            <div style={{
              position: 'absolute',
              right: '-1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.04,
              pointerEvents: 'none',
              zIndex: 1
            }}>
              <Globe style={{ width: '260px', height: '260px', color: '#D4A72C' }} />
            </div>

            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 8px 24px rgba(6, 18, 44, 0.15)',
              transform: 'translateZ(10px)',
              zIndex: 2
            }}>
              <Target style={{ width: '30px', height: '30px', color: '#D4A72C' }} />
            </div>

            <div style={{ flex: 1, minWidth: '280px', transform: 'translateZ(15px)', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  Committed to Creating Lasting Impact
                </h4>
              </div>
              <div style={{ width: '40px', height: '2px', background: '#D4A72C', marginBottom: '0.75rem', borderRadius: '1px' }} />
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                Our core values are more than words — they are the principles that inspire our people, strengthen our partnerships, and drive sustainable growth worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 991px) {
          .bridge-layout {
            grid-template-columns: 1fr !important;
          }
          .no-border-mobile {
            border-left: none !important;
            padding-left: 0 !important;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
