import React, { useState } from 'react';
import { 
  Building, HardHat, Factory, Compass, Truck, Flame, Home, Cpu, 
  Layers, Users, ShieldAlert, Award, Target, Eye, Sparkles, 
  Lightbulb, Briefcase, RefreshCw, Box, ShieldCheck, HeartHandshake,
  TrendingUp, Users2, Shield, Heart, Globe, Calendar, FileText, Leaf
} from 'lucide-react';
import aboutOfficeImage from '../assets/uniqix_hero_logistics.png'; // Fallback / existing asset

const AboutPage = () => {
  const corporateConsumers = [
    { name: 'Construction', icon: <HardHat style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Manufacturing', icon: <Factory style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Engineering', icon: <Compass style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Logistics', icon: <Truck style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Energy', icon: <Flame style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Facility Management', icon: <Home style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Industrial Operations', icon: <Cpu style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
  ];

  const tradePartners = [
    { name: 'Suppliers', icon: <Layers style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Manufacturers', icon: <Factory style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Service Providers', icon: <Users style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Technology Partners', icon: <Cpu style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Global Sources', icon: <Globe style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Logistics Partners', icon: <Truck style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
    { name: 'Industry Experts', icon: <Award style={{ width: '16px', height: '16px', color: '#c5a059' }} /> },
  ];

  const bridgeSolutions = [
    { name: 'Procurement Services', icon: <Briefcase style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
    { name: 'AI Robotics', icon: <Cpu style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
    { name: 'Smart Energy Solutions', icon: <Lightbulb style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
    { name: 'Sustainable Packaging', icon: <Box style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
    { name: 'International Trade', icon: <Globe style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
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
              <div style={{ width: '40px', height: '1px', background: '#c5a059' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c5a059', letterSpacing: '0.15em', textTransform: 'uppercase' }}>WHO WE ARE</span>
              <div style={{ width: '40px', height: '1px', background: '#c5a059' }} />
            </div>
            
            <h1 style={{ fontSize: '3rem', fontWeight: 850, lineHeight: '1.15', color: 'var(--text-primary)', marginBottom: '2rem', fontFamily: '"Times New Roman", Times, serif' }}>
              Welcome to <br />
              <span style={{ color: '#c5a059' }}>Uniqix</span> Pte Ltd
            </h1>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.8', marginBottom: '2.5rem', textAlign: 'justify', maxWidth: '480px' }}>
              Uniqix Pte Ltd is a Singapore-based company specializing in aggregating the procurement of products and services for more than 23 industries, fostering a merit savings and technology transformation for our clients.
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
                  <Users style={{ width: '20px', height: '20px', color: '#c5a059' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>23+</div>
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
                  <Award style={{ width: '20px', height: '20px', color: '#c5a059' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>100+</div>
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
                  <Globe style={{ width: '20px', height: '20px', color: '#c5a059' }} />
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>Singapore</div>
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
              border: '2px solid #c5a059',
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

      {/* 2. OUR BUSINESS MODEL Section */}
      <section style={{ padding: '4rem 0 6rem 0', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c5a059', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
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
              Bridge The Gap
            </h2>
            <div style={{ width: '80px', height: '3px', background: '#c5a059', margin: '0.5rem auto 1.5rem auto', borderRadius: '2px' }} />
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text-secondary)' }}>
              Between Corporate Consumers and Trade Partners
            </p>
          </div>

          {/* Bridge Interaction Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr 1fr', gap: '2rem', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }} className="bridge-layout">
            
            {/* Left Box: Corporate Consumers */}
            <div 
              className="glass-panel" 
              style={{ 
                padding: '2.5rem 1.75rem', 
                borderRadius: '1.5rem', 
                border: '1px solid rgba(197, 160, 89, 0.25)', 
                background: isCorpHovered ? '#df9f28ff' : 'var(--bg-glass)',
                boxShadow: isCorpHovered ? '0 20px 45px rgba(197, 160, 89, 0.35)' : '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsCorpHovered(true)}
              onMouseLeave={() => setIsCorpHovered(false)}
            >
              <div style={{ 
                background: isCorpHovered ? '#ffffff' : '#06122c', 
                color: isCorpHovered ? '#c5a059' : '#ffffff', 
                padding: '12px 16px', 
                borderRadius: '0.75rem', 
                textAlign: 'center', 
                fontWeight: 800, 
                fontSize: '0.95rem', 
                marginBottom: '2rem',
                letterSpacing: '0.03em',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                Corporate Consumers
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {corporateConsumers.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    fontSize: '0.95rem', 
                    color: isCorpHovered ? '#ffffff' : 'var(--text-secondary)', 
                    fontWeight: 550,
                    transition: 'color 0.4s'
                  }}>
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: isCorpHovered ? '#ffffff' : 'rgba(197, 160, 89, 0.06)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'background-color 0.4s'
                    }}>
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Middle: Bridge Illustration */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div style={{ width: '100%', position: 'relative' }}>
                
                {/* stylized bridge graphic */}
                <svg viewBox="0 0 600 240" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto' }}>
                  {/* Wave pattern under the bridge */}
                  <path d="M0 210 Q 50 205 100 210 T 200 210 T 300 210 T 400 210 T 500 210 T 600 210" stroke="rgba(197, 160, 89, 0.15)" strokeWidth="2" />
                  <path d="M0 218 Q 70 214 140 218 T 280 218 T 420 218 T 560 218" stroke="rgba(197, 160, 89, 0.08)" strokeWidth="1" />

                  {/* Arches of the bridge */}
                  <path d="M 30 200 C 100 130, 180 130, 250 200" stroke="var(--text-primary)" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 250 200 C 300 150, 360 150, 410 200" stroke="var(--text-primary)" strokeWidth="4.5" strokeLinecap="round" />
                  <path d="M 410 200 C 470 140, 530 140, 570 200" stroke="var(--text-primary)" strokeWidth="4.5" strokeLinecap="round" />
                  
                  {/* Thin golden arch details */}
                  <path d="M 30 200 C 100 145, 180 145, 250 200" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M 250 200 C 300 160, 360 160, 410 200" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M 410 200 C 470 150, 530 150, 570 200" stroke="#c5a059" strokeWidth="1.5" strokeDasharray="4 3" />

                  {/* Main Road Deck */}
                  <line x1="20" y1="140" x2="580" y2="140" stroke="var(--text-primary)" strokeWidth="6" strokeLinecap="round" />
                  <line x1="20" y1="145" x2="580" y2="145" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" />

                  {/* Vertical support suspenders */}
                  <line x1="90" y1="140" x2="90" y2="175" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="140" y1="140" x2="140" y2="155" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="190" y1="140" x2="190" y2="172" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="300" y1="140" x2="300" y2="176" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="330" y1="140" x2="330" y2="172" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="360" y1="140" x2="360" y2="175" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="470" y1="140" x2="470" y2="174" stroke="var(--text-primary)" strokeWidth="1.5" />
                  <line x1="510" y1="140" x2="510" y2="175" stroke="var(--text-primary)" strokeWidth="1.5" />

                  {/* UNIQIX Badge centered in the bridge */}
                  <g filter="drop-shadow(0px 6px 12px rgba(197, 160, 89, 0.25))">
                    <rect x="238" y="105" width="124" height="34" rx="8" fill="#c5a059" />
                    <text x="300" y="127" fill="#ffffff" fontSize="13" fontWeight="800" textAnchor="middle" letterSpacing="0.08em" fontFamily="Inter, sans-serif">UNIQIX</text>
                  </g>
                </svg>

              </div>
            </div>

            {/* Right Box: Trade Partners */}
            <div 
              className="glass-panel" 
              style={{ 
                padding: '2.5rem 1.75rem', 
                borderRadius: '1.5rem', 
                border: '1px solid rgba(197, 160, 89, 0.25)', 
                background: isTradeHovered ? '#df9f28ff' : 'var(--bg-glass)',
                boxShadow: isTradeHovered ? '0 20px 45px rgba(197, 160, 89, 0.35)' : '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer'
              }}
              onMouseEnter={() => setIsTradeHovered(true)}
              onMouseLeave={() => setIsTradeHovered(false)}
            >
              <div style={{ 
                background: isTradeHovered ? '#ffffff' : '#06122c', 
                color: isTradeHovered ? '#c5a059' : '#ffffff', 
                padding: '12px 16px', 
                borderRadius: '0.75rem', 
                textAlign: 'center', 
                fontWeight: 800, 
                fontSize: '0.95rem', 
                marginBottom: '2rem',
                letterSpacing: '0.03em',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                Trade Partners
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {tradePartners.map((item, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    fontSize: '0.95rem', 
                    color: isTradeHovered ? '#ffffff' : 'var(--text-secondary)', 
                    fontWeight: 550,
                    transition: 'color 0.4s'
                  }}>
                    <div style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: isTradeHovered ? '#ffffff' : 'rgba(197, 160, 89, 0.06)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      transition: 'background-color 0.4s'
                    }}>
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Bottom Grid: 6 Solutions Cards with 3D Effect */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem', marginTop: '5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '5rem' }}>
            {bridgeSolutions.map((sol, idx) => {
              const isHovered = hoveredCardIdx === idx;
              return (
                <div 
                  key={idx} 
                  className="glass-panel" 
                  style={{ 
                    padding: '2.5rem 1.5rem', 
                    borderRadius: '1.25rem', 
                    textAlign: 'center', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    gap: '16px',
                    background: isHovered ? '#df9f28ff' : 'var(--bg-glass)',
                    border: '1px solid rgba(197, 160, 89, 0.18)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.015)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    ...(isHovered ? cardTiltStyle : {})
                  }}
                  onMouseMove={(e) => handleMouseMove(e, idx)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={{ 
                    background: isHovered ? '#ffffff' : 'rgba(197, 160, 89, 0.08)', 
                    border: '1px solid rgba(197, 160, 89, 0.15)',
                    width: '52px', 
                    height: '52px', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'translateZ(10px)',
                    boxShadow: '0 4px 10px rgba(197, 160, 89, 0.05)',
                    transition: 'all 0.4s'
                  }}>
                    {React.cloneElement(sol.icon, { style: { ...sol.icon.props.style, color: isHovered ? '#c5a059' : '#c5a059' } })}
                  </div>
                  <div style={{ 
                    fontSize: '0.9rem', 
                    fontWeight: 800, 
                    color: isHovered ? '#ffffff' : 'var(--text-primary)',
                    lineHeight: '1.3',
                    transform: 'translateZ(15px)',
                    transition: 'color 0.4s'
                  }}>
                    {sol.name}
                  </div>
                </div>
              );
            })}
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
                To become the biggest B2B Procurement Aggregation Platform in Asia Pacific.
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
                To continuously identify our clients’ procurement needs and source for the best quality and most value-for-money products and services to match those needs.
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
              background: 'linear-gradient(135deg, #c5a059 25%, transparent 25%)',
              opacity: 0.35
            }} />
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '60px',
              height: '60px',
              background: 'linear-gradient(315deg, #c5a059 25%, transparent 25%)',
              opacity: 0.35
            }} />

            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c5a059', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                CORPORATE HISTORY
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, color: '#ffffff', margin: 0, fontFamily: '"Times New Roman", Times, serif' }}>
                Company Profile
              </h2>
              <div style={{ width: '50px', height: '2px', background: '#c5a059', margin: '0.75rem auto 0 auto', borderRadius: '2px' }} />
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
                    <Calendar style={{ width: '20px', height: '20px', color: '#c5a059' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Incorporation Details
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                      26 July 2016 in Singapore
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
                    <FileText style={{ width: '20px', height: '20px', color: '#c5a059' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Unique Entity Number (UEN)
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                      201620397R
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
                    <Building style={{ width: '20px', height: '20px', color: '#c5a059' }} />
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
                    <Layers style={{ width: '20px', height: '20px', color: '#c5a059' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Company Type
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
                      Private Company Limited by Shares
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
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.15em', display: 'block', marginBottom: '0.5rem' }}>
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
              <Globe style={{ width: '260px', height: '260px', color: '#c5a059' }} />
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
              <Target style={{ width: '30px', height: '30px', color: '#c5a059' }} />
            </div>
            
            <div style={{ flex: 1, minWidth: '280px', transform: 'translateZ(15px)', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  Committed to Creating Lasting Impact
                </h4>
              </div>
              <div style={{ width: '40px', height: '2px', background: '#c5a059', marginBottom: '0.75rem', borderRadius: '1px' }} />
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
