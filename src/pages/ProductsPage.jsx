import React, { useState, useEffect } from 'react';
import {
  Box, Settings, Users, Leaf, Globe, Shield, Truck, FileText,
  TrendingUp, MessageCircle, ArrowRight, Check, CheckCircle, Cpu, Lightbulb,
  Droplet, ThermometerSnowflake, Flame, Trash2, Sparkles, ChevronRight,
  Building, ShieldCheck, Target, Award, Calendar, HelpCircle,
  Utensils, ShoppingBag, Coffee, Wrench, Layers, Package, ChevronDown, ChevronUp,
  Phone, Mail
} from 'lucide-react';

import fu from '../assets/fieldunit.png';
import dash from '../assets/dashboard.png';
import school from '../assets/school.png';
import dragonflyConcept from '../assets/dragonfly_concept.jpg';

import emsMgmtImg from '../assets/ems_management.png';
import dimmingImg from '../assets/stepless_dimming.png';
import groupSensingImg from '../assets/group_sensing.png';

import ecoPalletsImg from '../assets/eco_pallets.jpg';
import { API_BASE_URL } from '../config';
import stretchFilmImg from '../assets/stretch_film.jpg';
import bubbleWrapImg from '../assets/bubble_wrap.jpg';
import oppTapeImg from '../assets/opp_tape.jpg';

import eggCartonImg from '../assets/egg_carton.jpeg';
import roundReheatingTubsImg from '../assets/round_reheating_tubs.jpg';
import dividedContainerImg from '../assets/divided_container.jpeg';
import rectangularReheatingTubsImg from '../assets/rectangular_reheating_tubs.jpg';

const ProductsPage = ({ setCurrentPage, activeProductTab, setActiveProductTab }) => {
  const [showTechDetails, setShowTechDetails] = useState(true);
  const [hoveredBoxIdx, setHoveredBoxIdx] = useState(null);

  // Reusable 3D Tilt state dictionary for multiple cards
  const [tiltStyles, setTiltStyles] = useState({});
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [dbProducts, setDbProducts] = useState([]);
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setDbProducts(data);
        }
      })
      .catch(err => console.error("Error loading products:", err));

    fetch(`${API_BASE_URL}/api/telemetry/`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTelemetry(data);
        }
      })
      .catch(err => console.error("Error loading telemetry:", err));
  }, []);

  const getTelemetryImage = (key) => {
    const map = {
      'fu': fu,
      'school': school,
      'dash': dash,
      'dragonflyConcept': dragonflyConcept
    };
    return map[key] || key;
  };

  const renderDbProducts = (category) => {
    const items = dbProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
    if (items.length === 0) return null;

    return (
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>DYNAMIC SOLUTIONS</span>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>Additional {category} Catalog</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {items.map((prod) => {
              const cardId = `db-prod-${prod.id}`;
              return (
                <div
                  key={prod.id}
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '1.25rem',
                    border: '1px solid var(--border-glass)',
                    background: hoveredCardId === cardId ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                    boxShadow: 'var(--shadow-glass)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: category === 'AI Robotics' ? 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)' : 'all 0.3s ease',
                    transform: (hoveredCardId === cardId && category === 'AI Robotics')
                      ? 'translateY(-12px)'
                      : (hoveredCardId === cardId ? (tiltStyles[cardId]?.transform || 'none') : 'none'),
                    borderColor: hoveredCardId === cardId ? 'var(--primary)' : 'var(--border-glass)'
                  }}
                  onMouseMove={(e) => {
                    if (category === 'AI Robotics') {
                      setHoveredCardId(cardId);
                    } else {
                      handleMouseMove3D(e, cardId);
                    }
                  }}
                  onMouseLeave={() => {
                    if (category === 'AI Robotics') {
                      setHoveredCardId(null);
                    } else {
                      handleMouseLeave3D(cardId);
                    }
                  }}
                >
                  <div style={{ transform: 'translateZ(10px)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-glass)', marginBottom: '1.5rem', height: '220px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={getProductItemImage(prod.name, prod.image_url)} alt={prod.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', transform: 'translateZ(15px)' }}>
                    {prod.name}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.25rem', transform: 'translateZ(10px)' }}>
                    {prod.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', transform: 'translateZ(15px)' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{prod.price}</span>
                    <button onClick={() => {
                      setCurrentPage('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
                      Inquire
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

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

  // Technical packaging data
  const turnoverBoxes = [
    {
      name: 'Velcro Turnover Box',
      icon: <Box style={{ width: '22px', height: '22px', color: '#D4A72C' }} />,
      specs: '600X400X300mm',
      advantages: 'Easy folding for loading/unloading, slip-resistant, pressure-resistant, high recyclability.',
      apps: 'Fresh produce cold chain, production line distribution, retail loops.'
    },
    {
      name: 'Knife Card Grid',
      icon: <Layers style={{ width: '22px', height: '22px', color: '#D4A72C' }} />,
      specs: '600X400X500mm',
      advantages: 'Lightweight & durable, precision die-cutting, foldable, ultrasonic edge sealing.',
      apps: 'Glass industry lining, precision instrument protection.'
    },
    {
      name: 'Pallet Box',
      icon: <Package style={{ width: '22px', height: '22px', color: '#D4A72C' }} />,
      specs: '1000X1200mm',
      advantages: 'Sturdy load-bearing, stackable for visibility, customizable specs.',
      apps: 'Fruit/veg distribution, auto parts inter-factory transit, parcel consolidation.'
    }
  ];

  const physicalTests = [
    { title: 'Water Resistance', desc: 'Soaking test for one week — box remains intact without damage.', icon: <Droplet style={{ color: '#06b6d4', width: '20px', height: '20px' }} /> },
    { title: 'Compression Resistance', desc: 'Superior load-bearing capability verified on customer sample boxes.', icon: <Shield style={{ color: '#4f46e5', width: '20px', height: '20px' }} /> },
    { title: 'Freezing Resistance', desc: 'Resilient at low temperatures (-20°C) for 3–4 months without softening.', icon: <ThermometerSnowflake style={{ color: '#3b82f6', width: '20px', height: '20px' }} /> },
    { title: 'Complete Degradation', desc: 'Controllable degradation; burns cleanly into powder with zero plastic residue.', icon: <Flame style={{ color: '#ec4899', width: '20px', height: '20px' }} /> },
    { title: 'Adjustable Service Life', desc: 'Material degradation parameters can be easily pre-configured to meet specific requirements.', icon: <Trash2 style={{ color: '#10b981', width: '20px', height: '20px' }} /> },
    { title: 'Stain & Oil Resistance', desc: 'Edible oil, chili sauce, soy sauce, and coffee wipe off leaving box like new.', icon: <Sparkles style={{ color: '#d97706', width: '20px', height: '20px' }} /> }
  ];

  const compressionData = [
    { case: 'Food Industry Case 1', wB: '800g', wS: '710g ↓', lB: '207kg', lS: '236kg ↑', eB: '3720 N/m', eS: '8420 N/m ↑', bB: '806 kPa', bS: '1040 kPa ↑' },
    { case: 'Food Industry Case 2', wB: '460g', wS: '520g ↑', lB: '246.5kg', lS: '281kg ↑', eB: '5020 N/m', eS: '10880 N/m ↑', bB: '839.7 kPa', bS: '1257 kPa ↑' },
    { case: 'Beverage Industry Case', wB: '120g', wS: '200g ↑', lB: '113kg', lS: '130kg ↑', eB: '3260 N/m', eS: '10880 N/m ↑', bB: '739 kPa', bS: '1257 kPa ↑' },
    { case: 'Tool Industry Case', wB: '240g', wS: '230g ↓', lB: '75kg', lS: '123kg ↑', eB: '4130 N/m', eS: '10880 N/m ↑', bB: '848 kPa', bS: '1257 kPa ↑' }
  ];

  // TAB 0: AI Robotics
  if (activeProductTab === 0) {
    const aiRoboticsFeatures = [
      { title: 'AI-Powered Analytics', desc: 'Smart vector activity monitoring, telemetry, and automated compliance reporting.', icon: <Cpu style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
      { title: 'Fully Autonomous Patrol', desc: 'Patrols campuses, factories, and outdoor spaces securely 24/7 without needing operator manpower..', icon: <Settings style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
      { title: 'Chemical-Free & Safe', desc: 'Non-toxic trapping lures make it perfect for schools, public areas, and occupied sites.', icon: <ShieldCheck style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
      { title: '24/7 Active Trap', desc: 'Smart UV light and specialized pheromone lures effectively target Aedes mosquitoes day and night.', icon: <Target style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
      { title: 'Zero Capital Expense', desc: 'Flexible monthly leasing model avoids heavy upfront investments.', icon: <TrendingUp style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> },
      { title: 'Versatile Operations', desc: 'Ideal for construction sites, dorms, warehouses, logistics depots, and malls.', icon: <Building style={{ width: '24px', height: '24px', color: '#D4A72C' }} /> }
    ];

    const whyDragonflyCards = [
      {
        title: 'Continuous Source Elimination',
        desc: 'Traditional chemical fogging and misting only disperse flying insects temporarily. Dragonfly patrols continuously to eliminate the breeding population at the source',
        tag: 'PROACTIVE',
        color: '#D4A72C'
      },
      {
        title: 'FEDA & NEA Compliance Assurance',
        desc: 'Maintains required vector control standards. Proactive monitoring helps building operators secure compliance audits and avoid heavy penalties.',
        tag: 'COMPLIANCE',
        color: '#ef4444'
      }
    ];

    return (
      <div style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '6rem' }}>

        {/* Hero Section */}
        <section style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
          <div className="container">
            <button
              onClick={() => setActiveProductTab(null)}
              className="btn btn-secondary"
              style={{
                marginBottom: '2.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem'
              }}
            >
              ← Back to B2B Catalog
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="bridge-layout">
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                  AI ROBOTICS SOLUTION
                </span>
                <h1 style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', lineHeight: '1.15' }}>
                  Uniqix Dragonfly<br />Autonomous Robotics
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.75', margin: 0, maxWidth: '650px' }}>
                  Uniqix Dragonfly is an autonomous robot engineered to tackle vector mosquitoes. Operating independently across district-scale facilities, it utilizes UV sensing, AI mapping, and targeted trapping without chemicals or evacuation.
                </p>
              </div>

              {/* Premium Featured Robotics Image with Floating Gold Badges */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-glass)',
                  border: '1px solid var(--border-glass)',
                  height: '320px',
                  background: `url(${fu}) center/cover no-repeat`
                }} />

                {/* Floating Gold Badges */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  left: '-30px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #D4A72C',
                  transform: 'translateZ(20px)'
                }}>
                  <Cpu style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '-15px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #D4A72C',
                  transform: 'translateZ(20px)'
                }}>
                  <ShieldCheck style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Features Grid (Smart Capabilities) */}
        <section style={{ padding: '3rem 0 4rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FEATURES & BENEFITS</span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>Smart Capabilities</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.25rem' }}>
              {aiRoboticsFeatures.map((feat, idx) => {
                const cardId = `feat-${idx}`;
                return (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '2.5rem 2rem 2.25rem 2rem',
                      borderRadius: '1.25rem',
                      border: '1.5px solid rgba(212, 167, 44, 0.45)',
                      background: 'var(--bg-glass)',
                      boxShadow: 'var(--shadow-glass)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '290px',
                      display: 'flex',
                      flexDirection: 'column',
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      ...(hoveredCardId === cardId ? tiltStyles[cardId] : {})
                    }}
                    onMouseMove={(e) => handleMouseMove3D(e, cardId)}
                    onMouseLeave={() => handleMouseLeave3D(cardId)}
                  >
                    {/* Top-Right Gold 5x5 Dot Matrix Pattern */}
                    <svg width="55" height="55" viewBox="0 0 55 55" style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.45, pointerEvents: 'none' }}>
                      <g fill="#D4A72C">
                        {[0, 1, 2, 3, 4].map(row =>
                          [0, 1, 2, 3, 4].map(col => (
                            <circle key={`${row}-${col}`} cx={col * 10 + 5} cy={row * 10 + 5} r="1.2" />
                          ))
                        )}
                      </g>
                    </svg>

                    {/* Gold Hexagon Icon Badge */}
                    <div style={{ position: 'relative', width: '56px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', transform: 'translateZ(10px)' }}>
                      <svg width="56" height="62" viewBox="0 0 56 62" style={{ position: 'absolute', inset: 0 }}>
                        <polygon
                          points="28,2 53,16 53,46 28,60 3,46 3,16"
                          fill="rgba(212, 167, 44, 0.08)"
                          stroke="#D4A72C"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {React.cloneElement(feat.icon, { style: { width: '24px', height: '24px', color: '#D4A72C' } })}
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      lineHeight: '1.25',
                      transform: 'translateZ(15px)'
                    }}>
                      {feat.title}
                    </h3>

                    {/* Gold Line + Dot Accent */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '1.25rem', transform: 'translateZ(12px)' }}>
                      <div style={{ width: '42px', height: '2px', background: 'linear-gradient(90deg, #D4A72C 0%, #c59a27 100%)', borderRadius: '2px' }} />
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4A72C' }} />
                    </div>

                    {/* Description */}
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: '1.65',
                      margin: 0,
                      maxWidth: '260px',
                      transform: 'translateZ(10px)'
                    }}>
                      {feat.desc}
                    </p>

                    {/* Bottom Curved Gold Wave Effect */}
                    <svg width="100%" height="30" viewBox="0 0 300 30" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
                      <path d="M 0 30 Q 150 10 300 30 L 300 30 L 0 30 Z" fill="url(#gold-wave-grad)" />
                      <path d="M 0 30 Q 150 10 300 30" stroke="url(#gold-line-grad)" strokeWidth="1.5" fill="none" />
                      <defs>
                        <linearGradient id="gold-wave-grad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(212, 167, 44, 0.03)" />
                          <stop offset="100%" stopColor="rgba(212, 167, 44, 0.2)" />
                        </linearGradient>
                        <linearGradient id="gold-line-grad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="rgba(212, 167, 44, 0.1)" />
                          <stop offset="50%" stopColor="#FCE8A6" />
                          <stop offset="100%" stopColor="rgba(212, 167, 44, 0.1)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Bottom-Right Arrow Circle Button */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      right: '1.25rem',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1.5px solid #D4A72C',
                      background: hoveredCardId === cardId ? '#D4A72C' : 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(197, 160, 89, 0.25)',
                      transition: 'all 0.3s ease',
                      zIndex: 3,
                      transform: 'translateZ(20px)'
                    }}>
                      <ArrowRight style={{ width: '18px', height: '18px', color: hoveredCardId === cardId ? '#ffffff' : '#D4A72C', transition: 'color 0.3s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Dragonfly Comparison Grid */}
        <section style={{ padding: '4rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1em' }}>COMPARISON REVIEW</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: '"Times New Roman", Times, serif' }}>Why Dragonfly?</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="bridge-layout">
              {whyDragonflyCards.map((card, idx) => {
                const cardId = `why-${idx}`;
                return (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '3rem',
                      borderRadius: '1.5rem',
                      border: `1px solid var(--card-gold-border, #D4A72C)`,
                      borderTop: `4px solid ${card.color}`,
                      background: hoveredCardId === cardId ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                      boxShadow: 'var(--shadow-glass)',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.3s ease',
                      ...(hoveredCardId === cardId ? tiltStyles[cardId] : {})
                    }}
                    onMouseMove={(e) => handleMouseMove3D(e, cardId)}
                    onMouseLeave={() => handleMouseLeave3D(cardId)}
                  >
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: card.color, letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem', transform: 'translateZ(10px)' }}>
                      {card.tag}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif", transform: 'translateZ(15px)' }}>
                      {card.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.7', margin: 0 }}>
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Visual Gallery Grid & ROS Dashboard */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.1%m' }}>FIELD EVIDENCE</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: '"Times New Roman", Times, serif' }}>Deployments & Telemetry</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              {(telemetry.length > 0 ? telemetry : [
                { id: 'vis-0', image_url: 'fu', caption: 'Dragonfly Autonomous Field Unit' },
                { id: 'vis-1', image_url: 'school', caption: 'Safe Chemical-Free Public Operations' },
                { id: 'vis-2', image_url: 'dash', caption: 'L3 SUTD ROS Telemetry & Active Sensor Dashboard' }
              ]).map((card, cIdx) => {
                const cardId = `vis-${card.id || cIdx}`;
                return (
                  <div
                    key={cardId}
                    className="glass-panel"
                    style={{
                      padding: '12px',
                      borderRadius: '1.25rem',
                      border: '1px solid var(--border-glass)',
                      background: 'var(--bg-glass)',
                      boxShadow: 'var(--shadow-glass)',
                      cursor: 'pointer',
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.3s ease',
                      ...(hoveredCardId === cardId ? (tiltStyles[cardId] || {}) : {})
                    }}
                    onMouseMove={(e) => handleMouseMove3D(e, cardId)}
                    onMouseLeave={() => handleMouseLeave3D(cardId)}
                  >
                    <img src={getTelemetryImage(card.image_url)} alt={card.caption} style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', height: '240px', transform: 'translateZ(10px)' }} />
                    <div style={{ padding: '1rem 0.5rem 0.5rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center', transform: 'translateZ(15px)' }}>
                      {card.caption}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Card 4: AI Vector Control Robot */}
            {/* <div 
                className="glass-panel"
                style={{
                  padding: '12px',
                  borderRadius: '1.25rem',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-glass)',
                  boxShadow: 'var(--shadow-glass)',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s ease',
                  ...(hoveredCardId === 'vis-3' ? tiltStyles['vis-3'] : {})
                }}
                onMouseMove={(e) => handleMouseMove3D(e, 'vis-3')}
                onMouseLeave={() => handleMouseLeave3D('vis-3')}
              >
                <img src={dragonflyConcept} alt="Dragonfly AI Vector Control" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', height: '240px', transform: 'translateZ(10px)' }} />
                <div style={{ padding: '1rem 0.5rem 0.5rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center', transform: 'translateZ(15px)' }}>
                  Co-branded AI Vector Control Autonomous Unit
                </div>
              </div> */}

          </div>
        </section>

        {/* CTA Rental Request Card */}
        <section style={{ padding: '4rem 0 0 0' }}>
          <div className="container">
            <div
              className="glass-panel"
              style={{
                padding: '4rem',
                borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.05)',
                background: 'var(--footer-bg)',
                boxShadow: 'var(--shadow-glass)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
                Request Monthly Rental Rates
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.05rem', lineHeight: '1.6' }}>
                No heavy upfront capital investment. Schedule an on-site inspection vector audit for deployment.
              </p>
              <button
                onClick={() => { setCurrentPage('contact'); scrollTo(0, { top: 0, behavior: 'smooth' }); }}
                className="btn btn-primary"
                style={{ padding: '1rem 2.5rem', marginBottom: '2rem' }}
              >
                Book Vector Audit
              </button>

              {/* Direct Contact Info */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  href="https://wa.me/6583995062?text=Hello%20Francis,%20I%20have%20an%20inquiry%20regarding%20AI%20Robotics."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <Phone style={{ width: '18px', height: '18px' }} />
                  +65 83995062
                </a>
                <a
                  href="mailto:francislim@uniqix.com?subject=AI%20Robotics%20Inquiry"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '0.85rem 1.75rem',
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(212, 167, 44, 0.3)'
                  }}
                >
                  <Mail style={{ width: '18px', height: '18px' }} />
                  francislim@uniqix.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Dragonfly Field Operation Videos Section */}
        <section style={{ padding: '4rem 0 6rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  FIELD DEMONSTRATION & TELEMETRY
                </span>
                <span style={{ color: '#D4A72C', fontSize: '1rem' }}>✦</span>
              </div>
              <h2 style={{ fontSize: '3rem', fontWeight: 900, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', margin: '0.5rem 0 1rem 0' }}>
                Uniqix Dragonfly in Action
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto', lineHeight: '1.6' }}>
                Explore real-world operational video footage of Uniqix Dragonfly performing autonomous field patrols, UV vector trapping, and intelligent smart navigation.
              </p>
              <div style={{ width: '60px', height: '3px', background: '#D4A72C', margin: '1.25rem auto 0 auto', borderRadius: '2px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>

              {/* Video 1 Card */}
              <div
                className="glass-panel"
                style={{
                  borderRadius: '2rem',
                  padding: '1.5rem',
                  border: '2px solid var(--card-gold-border, #D4A72C)',
                  background: 'var(--bg-glass)',
                  boxShadow: 'var(--shadow-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', background: '#020b1e', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
                  >
                    <source src="/dragonfly1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      ✦ FIELD DEMONSTRATION 01
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '50px', background: 'rgba(197, 160, 89, 0.15)', color: '#D4A72C', fontWeight: 700 }}>
                      AUTONOMOUS PATROL
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Dragonfly Autonomous Patrol & Trapping
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                    Demonstrating autonomous navigation, active UV vector lure engagement, and chemical-free mosquito trapping across urban environments.
                  </p>
                </div>
              </div>

              {/* Video 2 Card */}
              <div
                className="glass-panel"
                style={{
                  borderRadius: '2rem',
                  padding: '1.5rem',
                  border: '2px solid var(--card-gold-border, #D4A72C)',
                  background: 'var(--bg-glass)',
                  boxShadow: 'var(--shadow-glass)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', background: '#020b1e', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
                  >
                    <source src="/dragonfly2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div style={{ padding: '0.5rem 0.5rem 0.5rem 0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      ✦ FIELD DEMONSTRATION 02
                    </span>
                    <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '50px', background: 'rgba(197, 160, 89, 0.15)', color: '#D4A72C', fontWeight: 700 }}>
                      TELEMETRY & MAPPING
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Dragonfly Telemetry & Operational Review
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', margin: 0 }}>
                    In-depth operational coverage showing high-resolution telemetry, obstacle avoidance, and continuous district monitoring.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    );
  }

  // TAB 1: Sustainable Packaging
  if (activeProductTab === 1) {
    const packagingCards = [
      { title: 'Water Resistance', desc: 'Soaking test for one week — box remains intact without damage.', icon: <Droplet style={{ color: 'var(--primary)', width: '22px', height: '22px' }} /> },
      { title: 'Compression Resistance', desc: 'Superior load-bearing capability verified on customer sample boxes.', icon: <Shield style={{ color: 'var(--primary)', width: '22px', height: '22px' }} /> },
      { title: 'Freezing Resistance', desc: 'Resilient at low temperatures (-20°C to 3–4 months without softening).', icon: <ThermometerSnowflake style={{ color: 'var(--primary)', width: '22px', height: '22px' }} /> },
      { title: 'Complete Degradation', desc: 'Controlled biodegradation breaks down naturally into powder with zero plastic residue.', icon: <Flame style={{ color: 'var(--primary)', width: '22px', height: '22px' }} /> },
      { title: 'Adjustable Service Life', desc: 'Material degradation parameters can be pre-configured to meet requirements.', icon: <Settings style={{ color: 'var(--primary)', width: '22px', height: '22px' }} /> },
      { title: 'Stain & Oil Resistance', desc: 'Effective oil, chemical and moisture resistance with no leakage or staining.', icon: <Sparkles style={{ color: 'var(--primary)', width: '22px', height: '22px' }} /> }
    ];

    const compressionRecords = [
      {
        case: 'Food Industry Case 1',
        icon: <Utensils style={{ width: '20px', height: '20px', color: '#D4A72C' }} />,
        wB: '800g', wS: '700g',
        lB: '20.7kg', lS: '23.8kg',
        eB: '3270 N/m', eS: '8420 N/m',
        bB: '804 kPa', bS: '1240 kPa'
      },
      {
        case: 'Food Industry Case 2',
        icon: <ShoppingBag style={{ width: '20px', height: '20px', color: '#D4A72C' }} />,
        wB: '480g', wS: '320g',
        lB: '24.5kg', lS: '28.1kg',
        eB: '5020 N/m', eS: '10680 N/m',
        bB: '821.7 kPa', bS: '1257 kPa'
      },
      {
        case: 'Beverage Industry Case',
        icon: <Coffee style={{ width: '20px', height: '20px', color: '#D4A72C' }} />,
        wB: '120g', wS: '200g',
        lB: '113kg', lS: '136kg',
        eB: '3250 N/m', eS: '10680 N/m',
        bB: '739 kPa', bS: '1257 kPa'
      },
      {
        case: 'Tool Industry Case',
        icon: <Wrench style={{ width: '20px', height: '20px', color: '#D4A72C' }} />,
        wB: '240g', wS: '230g',
        lB: '75kg', lS: '123kg',
        eB: '4130 N/m', eS: '10680 N/m',
        bB: '818 kPa', bS: '1257 kPa'
      }
    ];

    const defaultIndustrialSupply = [
      {
        id: 'inv-pallets',
        title: 'Moulded Wood Eco Pallets',
        specs: 'Available in 1300x1300mm, 1050x1050mm, 1250x1000mm, and 1200x1000mm.',
        features: ['Sustainable moulded wood', 'Strong load limit', 'Export-ready nesting'],
        image: ecoPalletsImg
      },
      {
        id: 'inv-films',
        title: 'Standard & Mini Stretch Film',
        specs: 'Standard (50cm x 23Mic x 2.5kg / 3kg) & Mini (10cm x 23Mic x 300g).',
        features: ['High puncture resistance', 'Excellent stretch recovery', 'Standard and mini rolls'],
        image: stretchFilmImg
      },
      {
        id: 'inv-wrap',
        title: 'Single Layer Bubble Wrap',
        specs: 'Single layer rolls available in 25cm x 91m and 50cm x 91m.',
        features: ['Premium impact protection', 'Lightweight cushioning', 'Standard 91m (91ft) length'],
        image: bubbleWrapImg
      },
      {
        id: 'inv-tape',
        title: 'High-Tack OPP Packaging Tape',
        specs: 'Transparent adhesive tape (48mm width x 90m length per roll).',
        features: ['High-tensile strength', 'Strong adhesive tack', 'Ideal for cardboard sealing'],
        image: oppTapeImg
      }
    ];

  const getProductItemImage = (name, rawImageUrl) => {
    if (rawImageUrl && rawImageUrl.startsWith('data:image')) {
      return rawImageUrl;
    }
    const n = (name || '').toLowerCase();
    const key = (rawImageUrl || '').toLowerCase();

    if (n.includes('tape') || n.includes('opp') || key === 'opp_tape') return oppTapeImg;
    if (n.includes('stretch') || n.includes('film') || key === 'stretch_film') return stretchFilmImg;
    if (n.includes('bubble') || n.includes('wrap') || key === 'bubble_wrap') return bubbleWrapImg;
    if (n.includes('pallet') || key === 'eco_pallets') return ecoPalletsImg;
    if (n.includes('egg') || n.includes('carton') || key === 'egg_carton') return eggCartonImg;
    if (n.includes('round') || n.includes('bowl') || key === 'round_reheating_tubs') return roundReheatingTubsImg;
    if (n.includes('divided') || n.includes('bento') || n.includes('container') || key === 'divided_container') return dividedContainerImg;
    if (n.includes('rectangular') || n.includes('tub') || key === 'rectangular_reheating_tubs') return rectangularReheatingTubsImg;
    
    return (rawImageUrl && rawImageUrl.length > 5) ? rawImageUrl : ecoPalletsImg;
  };

    const dbIndustrialSupply = dbProducts
      .filter(p => p.category === 'Industrial Supply Catalog')
      .map(p => ({
        id: `db-inv-${p.id}`,
        title: p.name,
        specs: p.description,
        features: p.specifications ? p.specifications.split('|').map(f => f.trim()) : [],
        image: getProductItemImage(p.name, p.image_url)
      }));

    const industrialSupplyList = dbIndustrialSupply.length > 0 ? dbIndustrialSupply : defaultIndustrialSupply;

    const defaultFoodPackaging = [
      {
        id: 'inv-egg',
        title: 'Biodegradable Egg Cartons',
        specs: 'Moulded paper pulp 15-egg cartons, export-grade cushioning and nesting.',
        features: ['100% Recyclable pulp', 'Impact-resistant structure', 'Biodegradable material'],
        image: eggCartonImg
      },
      {
        id: 'inv-soup-bowls',
        title: 'Round Bowls Containers',
        specs: 'High-temperature resistant transparent round bowls with secure leak-proof lids.',
        features: ['High-heat resilient', 'Leak-proof liquid seal', 'Freezer & microwave safe'],
        image: roundReheatingTubsImg
      },
      {
        id: 'inv-divided',
        title: 'Divided Bento Trays',
        specs: '2-compartment and 3-compartment black bento boxes with clear matching lids.',
        features: ['Divided section trays', 'Premium presentation', 'Leak-proof containment'],
        image: dividedContainerImg
      },
      {
        id: 'inv-rect',
        title: 'Rectangular Reheating Tubs',
        specs: 'BPA-free transparent rectangular containers for bulk catering and meal prep.',
        features: ['Space-saving stack design', 'Microwave safe body', 'Flexible plastic resilience'],
        image: rectangularReheatingTubsImg
      }
    ];

    const dbFoodPackaging = dbProducts
      .filter(p => p.category === 'Eco Food Service Packaging')
      .map(p => ({
        id: `db-food-${p.id}`,
        title: p.name,
        specs: p.description,
        features: p.specifications ? p.specifications.split('|').map(f => f.trim()) : [],
        image: getProductItemImage(p.name, p.image_url)
      }));

    const foodPackagingList = dbFoodPackaging.length > 0 ? dbFoodPackaging : defaultFoodPackaging;

    return (
      <div style={{ color: 'var(--text-primary)', position: 'relative', paddingBottom: '6rem' }}>

        {/* Header Block */}
        {/* Hero Section */}
        <section style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
          <div className="container">
            <button
              onClick={() => setActiveProductTab(null)}
              className="btn btn-secondary"
              style={{
                marginBottom: '2.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem'
              }}
            >
              ← Back to B2B Catalog
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="bridge-layout">
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                  INDUSTRIAL ECO MATERIALS
                </span>
                <h1 style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', lineHeight: '1.15' }}>
                  Bulk Supply of<br />Sustainable Packaging
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.75', margin: 0, maxWidth: '650px' }}>
                  Sustainable packaging engineered for industrial supply chains — heavy-duty eco pallets, corrugated containers, stretch film, and eco food service solutions designed with double compression strength.
                </p>
              </div>

              {/* Premium Featured Packaging Image with Floating Gold Badges */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-glass)',
                  border: '1px solid var(--border-glass)',
                  height: '320px',
                  background: `url(${ecoPalletsImg}) center/cover no-repeat`
                }} />

                {/* Floating Gold Badges */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  left: '-30px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #D4A72C',
                  transform: 'translateZ(20px)'
                }}>
                  <Box style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '-15px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #D4A72C',
                  transform: 'translateZ(20px)'
                }}>
                  <Leaf style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 Physical Test Grid Cards (Styled like Smart Capabilities) */}
        <section style={{ padding: '2rem 0 4rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.25rem' }}>
              {packagingCards.map((card, idx) => {
                const cardId = `pack-${idx}`;
                return (
                  <div
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '2.5rem 2rem 2.25rem 2rem',
                      borderRadius: '1.25rem',
                      border: '1.5px solid rgba(212, 167, 44, 0.45)',
                      background: 'var(--bg-glass)',
                      boxShadow: 'var(--shadow-glass)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      minHeight: '290px',
                      display: 'flex',
                      flexDirection: 'column',
                      transformStyle: 'preserve-3d',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      ...(hoveredCardId === cardId ? tiltStyles[cardId] : {})
                    }}
                    onMouseMove={(e) => handleMouseMove3D(e, cardId)}
                    onMouseLeave={() => handleMouseLeave3D(cardId)}
                  >
                    {/* Top-Right Gold 5x5 Dot Matrix Pattern */}
                    <svg width="55" height="55" viewBox="0 0 55 55" style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.45, pointerEvents: 'none' }}>
                      <g fill="#D4A72C">
                        {[0, 1, 2, 3, 4].map(row =>
                          [0, 1, 2, 3, 4].map(col => (
                            <circle key={`${row}-${col}`} cx={col * 10 + 5} cy={row * 10 + 5} r="1.2" />
                          ))
                        )}
                      </g>
                    </svg>

                    {/* Gold Hexagon Icon Badge */}
                    <div style={{ position: 'relative', width: '56px', height: '62px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', transform: 'translateZ(10px)' }}>
                      <svg width="56" height="62" viewBox="0 0 56 62" style={{ position: 'absolute', inset: 0 }}>
                        <polygon
                          points="28,2 53,16 53,46 28,60 3,46 3,16"
                          fill="rgba(212, 167, 44, 0.08)"
                          stroke="#D4A72C"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {React.cloneElement(card.icon, { style: { width: '24px', height: '24px', color: '#D4A72C' } })}
                      </div>
                    </div>

                    {/* Card Title */}
                    <h3 style={{
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '0.4rem',
                      fontFamily: "'Playfair Display', Georgia, serif",
                      lineHeight: '1.25',
                      transform: 'translateZ(15px)'
                    }}>
                      {card.title}
                    </h3>

                    {/* Gold Line + Dot Accent */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '1.25rem', transform: 'translateZ(12px)' }}>
                      <div style={{ width: '42px', height: '2px', background: 'linear-gradient(90deg, #D4A72C 0%, #c59a27 100%)', borderRadius: '2px' }} />
                      <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4A72C' }} />
                    </div>

                    {/* Description */}
                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: '1.65',
                      margin: 0,
                      maxWidth: '260px',
                      transform: 'translateZ(10px)'
                    }}>
                      {card.desc}
                    </p>

                    {/* Bottom Curved Gold Wave Effect */}
                    <svg width="100%" height="30" viewBox="0 0 300 30" preserveAspectRatio="none" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
                      <path d="M 0 30 Q 150 10 300 30 L 300 30 L 0 30 Z" fill="url(#gold-wave-grad-pack)" />
                      <path d="M 0 30 Q 150 10 300 30" stroke="url(#gold-line-grad-pack)" strokeWidth="1.5" fill="none" />
                      <defs>
                        <linearGradient id="gold-wave-grad-pack" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(212, 167, 44, 0.03)" />
                          <stop offset="100%" stopColor="rgba(212, 167, 44, 0.2)" />
                        </linearGradient>
                        <linearGradient id="gold-line-grad-pack" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="rgba(212, 167, 44, 0.1)" />
                          <stop offset="50%" stopColor="#FCE8A6" />
                          <stop offset="100%" stopColor="rgba(212, 167, 44, 0.1)" />
                        </linearGradient>
                      </defs>
                    </svg>

                    {/* Bottom-Right Arrow Circle Button */}
                    <div style={{
                      position: 'absolute',
                      bottom: '1.25rem',
                      right: '1.25rem',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '1.5px solid #D4A72C',
                      background: hoveredCardId === cardId ? '#D4A72C' : 'var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(197, 160, 89, 0.25)',
                      transition: 'all 0.3s ease',
                      zIndex: 3,
                      transform: 'translateZ(20px)'
                    }}>
                      <ArrowRight style={{ width: '18px', height: '18px', color: hoveredCardId === cardId ? '#ffffff' : '#D4A72C', transition: 'color 0.3s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Packaging Catalog Section */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                BULK PACKAGING INVENTORY
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Industrial Supply Catalog
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.95rem' }}>
                High-performance stretch wrap, heavy-duty moulded eco pallets, protective bubble wrap, and high-tack packaging tapes.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {industrialSupplyList.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1.5rem',
                    border: '1px solid var(--border-glass)',
                    background: 'var(--bg-glass)',
                    boxShadow: 'var(--shadow-glass)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ...(hoveredCardId === item.id ? tiltStyles[item.id] : {})
                  }}
                  onMouseMove={(e) => handleMouseMove3D(e, item.id)}
                  onMouseLeave={() => handleMouseLeave3D(item.id)}
                >
                  <div>
                    <div style={{ transform: 'translateZ(10px)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-glass)', marginBottom: '1.5rem', height: '220px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', transform: 'translateZ(15px)' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.25rem', transform: 'translateZ(10px)' }}>
                      {item.specs}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: 0, listStyle: 'none', marginBottom: '1.5rem', transform: 'translateZ(10px)' }}>
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <Check style={{ width: '12px', height: '12px', color: '#D4A72C' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => {setCurrentPage('contact');
                    window.scrollTo({top:0,behavior:'smooth'})
                  }} className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', transform: 'translateZ(15px)' }}>
                    Inquire Specifications
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Food Sourcing & Packaging Section */}
        <section style={{ padding: '2rem 0 4rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                FOOD SERVICE PACKAGING
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Eco Food Service Packaging
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.95rem' }}>
                Microwave-safe reheating containers, divided bento trays, and biodegradable paper pulp egg packaging.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
              {foodPackagingList.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '1.5rem',
                    border: '1px solid var(--border-glass)',
                    background: 'var(--bg-glass)',
                    boxShadow: 'var(--shadow-glass)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ...(hoveredCardId === item.id ? tiltStyles[item.id] : {})
                  }}
                  onMouseMove={(e) => handleMouseMove3D(e, item.id)}
                  onMouseLeave={() => handleMouseLeave3D(item.id)}
                >
                  <div>
                    <div style={{ transform: 'translateZ(10px)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-glass)', marginBottom: '1.5rem', height: '220px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={item.image} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', transform: 'translateZ(15px)' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1.25rem', transform: 'translateZ(10px)' }}>
                      {item.specs}
                    </p>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: 0, listStyle: 'none', marginBottom: '1.5rem', transform: 'translateZ(10px)' }}>
                      {item.features.map((feat, fIdx) => (
                        <li key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          <Check style={{ width: '12px', height: '12px', color: '#D4A72C' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => {setCurrentPage('contact');
                    window.scrollTo({top:0,behavior:'smooth'})
                  }} className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', transform: 'translateZ(15px)' }}>
                    Inquire Specifications
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Physical Compression Performance Record Section (Styled like Reference Image) */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container">
            <div className="glass-panel" style={{
              padding: '3.5rem 3rem',
              borderRadius: '2rem',
              background: 'var(--bg-glass)',
              border: '1.5px solid rgba(212, 167, 44, 0.35)',
              boxShadow: 'var(--shadow-glass)'
            }}>
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#C59A27', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>
                  LABORATORY VERIFIED DATA
                </span>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Compression Performance Record
                </h2>
                <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.98rem' }}>
                  Comparison showing original box (B) versus Uniqix reinforced packaging (S).
                </p>
              </div>

              {/* Responsive Table Wrapper for Mobile Devices */}
              <div className="responsive-table-wrapper">
                <div style={{ minWidth: '780px' }}>
                  {/* Table Column Headers Bar */}
                  <div style={{
                    background: 'rgba(212, 167, 44, 0.08)',
                    borderRadius: '14px',
                    padding: '1.1rem 1.75rem',
                    marginBottom: '1rem',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                      SAMPLE / SECTOR CASE
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em', textAlign: 'center' }}>
                      WEIGHT (B VS S)
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em', textAlign: 'center' }}>
                      LOAD LIMIT (B VS S)
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em', textAlign: 'center' }}>
                      EDGE CRUSH (ECT)
                    </div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em', textAlign: 'center' }}>
                      BURSTING STRENGTH
                    </div>
                  </div>

                  {/* 4 Independent Row Cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                    {compressionRecords.map((row, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-glass)',
                          borderRadius: '16px',
                          border: '1.5px solid rgba(212, 167, 44, 0.25)',
                          padding: '1.1rem 1.75rem',
                          display: 'grid',
                          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                          alignItems: 'center',
                          gap: '1rem',
                          boxShadow: 'var(--shadow-glass)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {/* Left Cell: Icon Badge & Case Title */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            background: 'rgba(212, 167, 44, 0.08)',
                            border: '1px solid rgba(212, 167, 44, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            {row.icon}
                          </div>
                          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                            {row.case}
                          </span>
                        </div>

                        {/* Weight (B vs S) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '55px', textAlign: 'center' }}>
                            {row.wB}
                          </div>
                          <span style={{ color: '#D4A72C', fontWeight: 800, fontSize: '0.95rem' }}>→</span>
                          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '5px 12px', borderRadius: '8px', color: '#10B981', minWidth: '65px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.25' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{row.wS}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>↑</span>
                          </div>
                        </div>

                        {/* Load Limit (B vs S) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '55px', textAlign: 'center' }}>
                            {row.lB}
                          </div>
                          <span style={{ color: '#D4A72C', fontWeight: 800, fontSize: '0.95rem' }}>→</span>
                          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '5px 12px', borderRadius: '8px', color: '#10B981', minWidth: '65px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.25' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{row.lS}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>↑</span>
                          </div>
                        </div>

                        {/* Edge Crush (ECT) */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '55px', textAlign: 'center' }}>
                            {row.eB}
                          </div>
                          <span style={{ color: '#D4A72C', fontWeight: 800, fontSize: '0.95rem' }}>→</span>
                          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '5px 12px', borderRadius: '8px', color: '#10B981', minWidth: '65px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.25' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{row.eS}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>↑</span>
                          </div>
                        </div>

                        {/* Bursting Strength */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-glass)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', minWidth: '55px', textAlign: 'center' }}>
                            {row.bB}
                          </div>
                          <span style={{ color: '#D4A72C', fontWeight: 800, fontSize: '0.95rem' }}>→</span>
                          <div style={{ background: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '5px 12px', borderRadius: '8px', color: '#10B981', minWidth: '65px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.25' }}>
                            <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{row.bS}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 900 }}>↑</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Data Suite (Standard Turnover Box Specifications) */}
        <section style={{ padding: '2rem 0 4rem 0' }}>
          <div className="container">
            <div className="glass-panel" style={{
              padding: '3.5rem 3rem',
              borderRadius: '2rem',
              background: 'var(--bg-glass)',
              border: '1.5px solid rgba(212, 167, 44, 0.35)',
              boxShadow: 'var(--shadow-glass)'
            }}>

              {/* Section Header with Hide/Show Spec Sheet Pill Button */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Standard Turnover Box Specifications
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>
                    Click button to show or hide the structural engineering data sheet.
                  </p>
                </div>
                <button
                  onClick={() => setShowTechDetails(!showTechDetails)}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1.5px solid #D4A72C',
                    borderRadius: '10px',
                    padding: '0.65rem 1.4rem',
                    color: 'var(--text-primary)',
                    fontWeight: 800,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(197, 160, 89, 0.15)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {showTechDetails ? (
                    <>Hide Spec Sheet <ChevronUp style={{ width: '16px', height: '16px', color: '#D4A72C' }} /></>
                  ) : (
                    <>Show Spec Sheet <ChevronDown style={{ width: '16px', height: '16px', color: '#D4A72C' }} /></>
                  )}
                </button>
              </div>

              {/* Spec Sheet Cards */}
              {showTechDetails && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', transition: 'all 0.5s ease' }}>
                  {turnoverBoxes.map((box, idx) => (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        background: 'var(--bg-glass)',
                        borderRadius: '16px',
                        border: '1.5px solid rgba(212, 167, 44, 0.25)',
                        padding: '1.5rem 2rem 1.5rem 2.25rem',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {/* Left Accent Gold Strip */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        width: '5px',
                        background: '#D4A72C',
                        borderRadius: '16px 0 0 16px'
                      }} />

                      {/* Icon Badge */}
                      <div style={{
                        width: '52px',
                        height: '52px',
                        borderRadius: '14px',
                        background: 'rgba(212, 167, 44, 0.08)',
                        border: '1px solid rgba(212, 167, 44, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {box.icon}
                      </div>

                      {/* Center Content */}
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 0.4rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
                          {box.name}
                        </h4>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: '0 0 0.3rem 0' }}>
                          <strong style={{ color: '#D4A72C' }}>Material Advantages:</strong> {box.advantages}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.55', margin: 0 }}>
                          <strong style={{ color: '#D4A72C' }}>Applications:</strong> {box.apps}
                        </p>
                      </div>

                      {/* Right Spec Badge & Arrow */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                        <span style={{
                          background: 'rgba(212, 167, 44, 0.08)',
                          border: '1px solid rgba(212, 167, 44, 0.3)',
                          color: '#D4A72C',
                          fontWeight: 800,
                          fontSize: '0.82rem',
                          padding: '6px 16px',
                          borderRadius: '20px',
                          whiteSpace: 'nowrap'
                        }}>
                          Spec: {box.specs}
                        </span>
                        <ChevronDown style={{ width: '18px', height: '18px', color: 'var(--text-secondary)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Direct Contact Card for Sustainable Packaging */}
              <div
                style={{
                  marginTop: '4rem',
                  padding: '2.5rem',
                  borderRadius: '1.5rem',
                  background: 'linear-gradient(135deg, rgba(212, 167, 44, 0.08) 0%, rgba(197, 150, 25, 0.03) 100%)',
                  border: '1.5px solid rgba(212, 167, 44, 0.4)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  textAlign: 'center'
                }}
              >
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#D4A72C', fontSize: '0.8rem' }}>✦</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    SUSTAINABLE PACKAGING SPECIALIST CONTACT
                  </span>
                  <span style={{ color: '#D4A72C', fontSize: '0.8rem' }}>✦</span>
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 850, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)' }}>
                  Get in Touch with Francis Lim
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', margin: '0 0 1.75rem 0' }}>
                  Direct inquiries for bulk eco-packaging specs, custom box dimensions, and technical sales support.
                </p>
                <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href="https://wa.me/6583995062?text=Hello%20Francis,%20I%20have%20an%20inquiry%20regarding%20Sustainable%20Packaging."
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '0.85rem 1.75rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <Phone style={{ width: '18px', height: '18px' }} />
                    +65 83995062
                  </a>
                  <a
                    href="mailto:francislim@uniqix.com?subject=Sustainable%20Packaging%20Inquiry"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '0.85rem 1.75rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      boxShadow: '0 6px 20px rgba(212, 167, 44, 0.3)'
                    }}
                  >
                    <Mail style={{ width: '18px', height: '18px' }} />
                    francislim@uniqix.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    );
  }

  // TAB 2: Smart Energy Solutions
  if (activeProductTab === 2) {
    const energyCards = [
      {
        id: 'energy-ems',
        num: '01',
        title: 'Local + Cloud EMS Management',
        badgeText: 'EMS Dashboard',
        icon: <Cpu style={{ color: '#ffffff', width: '16px', height: '16px' }} />,
        desc: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)' }}>
              <strong>Local EMS:</strong> Provides real-time device control, data collection, and instant response, ensuring independent operation even during network interruptions.
            </p>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)' }}>
              <strong>Cloud EMS:</strong> Enables centralized management across multiple buildings and regions, supporting energy statistics, AI-driven efficiency analysis, remote monitoring, and reporting.
            </p>
          </div>
        ),
        image: emsMgmtImg,
        imgAlt: 'EMS Management Diagram'
      },
      {
        id: 'energy-dimming',
        num: '02',
        title: 'Stepless Dimming with Microwave',
        badgeText: 'Stepless Dimming',
        icon: <Globe style={{ color: '#ffffff', width: '16px', height: '16px' }} />,
        bullets: [
          'Lights turn on when vehicle or human motion is detected and automatically dim when no motion is present.',
          'Reduces electricity costs, enhances safety with proper lighting, and is more environmentally friendly.',
          'Dimming levels (0%–100%) can be adjusted on the platform according to user requirements.'
        ],
        image: dimmingImg,
        imgAlt: 'Stepless Dimming'
      },
      {
        id: 'energy-sensing',
        num: '03',
        title: 'Localized Light Tube Group Sensing',
        badgeText: 'Group Sensing',
        icon: <Lightbulb style={{ color: '#ffffff', width: '16px', height: '16px' }} />,
        bullets: [
          'Multiple light tubes can be grouped for inter-control.',
          'When any light tube within a group detects vehicle or human motion, it triggers all other light tubes in the group to light up simultaneously.',
          'This ensures that lighting is activated in advance of vehicle or pedestrian arrival, enhancing user experience and driving safety.',
          'In addition, group data and light tube parameters are stored in the built-in intelligent chip of each light tube, ensuring stable, safe, and reliable operation.'
        ],
        image: groupSensingImg,
        imgAlt: 'Group Sensing'
      }
    ];

    return (
      <div style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh' }}>

        {/* Header Block */}
        <section style={{ padding: '4rem 0 3rem 0', position: 'relative' }}>
          <div className="container">
            <button
              onClick={() => setActiveProductTab(null)}
              className="btn btn-secondary"
              style={{
                marginBottom: '2.5rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem'
              }}
            >
              ← Back to B2B Catalog
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="bridge-layout">
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
                  SMART ENERGY SAVING
                </span>
                <h1 style={{ fontSize: '3.8rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', lineHeight: '1.15' }}>
                  Smart Lighting for<br />Energy Saving
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.75', margin: 0, maxWidth: '650px' }}>
                  Convert illumination into energy efficiency. Retrofit warehouses, parking spaces, and commercial facilities with IoT-enabled smart grids, microwave motion tracking, and local + cloud management systems.
                </p>
              </div>

              {/* Premium Building Image on Right with Overlays */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '2rem',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-glass)',
                  border: '1px solid var(--border-glass)',
                  height: '320px',
                  background: 'url("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80") center/cover no-repeat'
                }} />
                {/* Floating Gold Badges */}
                <div style={{
                  position: 'absolute',
                  top: '15%',
                  left: '-30px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #D4A72C',
                  transform: 'translateZ(20px)'
                }}>
                  <Leaf style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '20%',
                  left: '-15px',
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #D4A72C',
                  transform: 'translateZ(20px)'
                }}>
                  <Flame style={{ color: '#D4A72C', width: '26px', height: '26px' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Layout */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '4rem' }}>
              {energyCards.map((card, idx) => {
                const isEven = idx % 2 === 0;

                const descCard = (
                  <div
                    className="glass-panel energy-card"
                    style={{
                      padding: '2.25rem 2.5rem',
                      borderRadius: '2rem',
                      border: '2px solid var(--card-gold-border, #D4A72C)',
                      background: 'var(--bg-glass)',
                      boxShadow: 'var(--shadow-glass)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      flex: 1,
                      height: '390px'
                    }}
                  >
                    <span style={{ color: '#ef4444', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                      ⚡ SERVICE BREAKDOWN
                    </span>
                    <h3 style={{ fontSize: '1.65rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '1.25rem', fontFamily: "'Playfair Display', Georgia, serif", lineHeight: '1.3' }}>
                      {card.title}
                    </h3>
                    {card.desc ? card.desc : (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem 1.5rem' }}>
                        {card.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444', marginTop: '6px', flexShrink: 0 }} />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );

                const imgCard = (
                  <div
                    className="glass-panel energy-card"
                    style={{
                      borderRadius: '2rem',
                      border: '2px solid var(--card-gold-border, #D4A72C)',
                      background: 'var(--bg-glass)',
                      boxShadow: 'var(--shadow-glass)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      height: '390px',
                      transition: 'all 0.3s ease',
                      flex: 1
                    }}
                  >
                    <img src={card.image} alt={card.imgAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {/* Floating Bottom-Left Badge */}
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                      background: 'rgba(2, 11, 30, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '6px 16px',
                      borderRadius: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ffffff',
                      fontSize: '0.85rem',
                      fontWeight: 700
                    }}>
                      <div style={{ background: '#2563eb', padding: '6px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {card.icon}
                      </div>
                      <span>{card.badgeText}</span>
                    </div>
                  </div>
                );

                return (
                  <div key={card.id} style={{ display: 'grid', gridTemplateColumns: isEven ? '1.25fr 0.75fr' : '0.75fr 1.25fr', gap: '3rem', alignItems: 'stretch' }} className="bridge-layout">
                    {isEven ? (
                      <>
                        {descCard}
                        {imgCard}
                      </>
                    ) : (
                      <>
                        {imgCard}
                        {descCard}
                      </>
                    )}
                  </div>
                );
              })}

              {/* Energy Efficiency Audits CTA Banner Card */}
              <div
                className="glass-panel energy-card"
                style={{
                  padding: '3rem',
                  borderRadius: '2rem',
                  border: '2px solid #D4A72C',
                  background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.1) 0%, rgba(197, 160, 89, 0.03) 100%)',
                  boxShadow: 'var(--shadow-glass)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: '1.5rem'
                }}
              >
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="energy-icon-badge" style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    boxShadow: '0 10px 25px rgba(197, 160, 89, 0.2)',
                    border: '2px solid #D4A72C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    <Award style={{ width: '28px', height: '28px', color: '#D4A72C' }} />
                  </div>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                      Energy Efficiency Audits
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.65', margin: 0 }}>
                      Our engineering team conducts compliance scans to project your consumption reductions and ensure optimal hardware layouts.
                    </p>
                  </div>
                  <button
                    onClick={() => {setCurrentPage('contact');
                      window.scrollTo({top:0,behavior:'smooth'})
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.95rem 2.5rem', flexShrink: 0 }}
                  >
                    Schedule Energy Audit &rarr;
                  </button>
                </div>

                {/* Direct Contact Info */}
                <div style={{ borderTop: '1px solid rgba(212, 167, 44, 0.3)', paddingTop: '1.75rem', marginTop: '1.75rem', display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Direct Specialist Contact:
                  </span>
                  <a
                    href="https://wa.me/6583995062?text=Hello%20Francis,%20I%20have%20an%20inquiry%20regarding%20Smart%20Energy%20Solutions."
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.65rem 1.4rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)'
                    }}
                  >
                    <Phone style={{ width: '16px', height: '16px' }} />
                    +65 83995062
                  </a>
                  <a
                    href="mailto:francislim@uniqix.com?subject=Smart%20Energy%20Solutions%20Inquiry"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '0.65rem 1.4rem',
                      borderRadius: '50px',
                      background: 'linear-gradient(135deg, #D4A72C 0%, #B8860B 100%)',
                      color: '#ffffff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      boxShadow: '0 4px 14px rgba(212, 167, 44, 0.3)'
                    }}
                  >
                    <Mail style={{ width: '16px', height: '16px' }} />
                    francislim@uniqix.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4 Bottom Features Bar */}
        <section style={{ padding: '3.5rem 0', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            {[
              { text: 'Reduce Energy Consumption', icon: <Flame style={{ color: '#D4A72C', width: '18px', height: '18px' }} /> },
              { text: 'Enhance Safety & Security', icon: <ShieldCheck style={{ color: '#D4A72C', width: '18px', height: '18px' }} /> },
              { text: 'Lower Carbon Footprint', icon: <Leaf style={{ color: '#D4A72C', width: '18px', height: '18px' }} /> },
              { text: 'Real-time Data & Smart Analytics', icon: <TrendingUp style={{ color: '#D4A72C', width: '18px', height: '18px' }} /> }
            ].map((f, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                <div style={{ background: 'rgba(197, 160, 89, 0.08)', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center' }}>
                  {f.icon}
                </div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </section>

        {renderDbProducts('Smart Energy Solutions')}

        <style>{`
        .energy-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .energy-card:hover {
          animation: bounceSlow 2s ease-in-out infinite alternate !important;
          border-color: #D4A72C !important;
          box-shadow: 0 25px 50px rgba(197, 160, 89, 0.15) !important;
        }
        :root:not([data-theme="dark"]) .energy-card:hover {
          background: #ffffff !important;
        }
        .energy-card:hover .energy-icon-badge {
          transform: scale(1.1) rotate(5deg) !important;
          background: rgba(197, 160, 89, 0.12) !important;
        }
        @keyframes bounceSlow {
          0% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(-16px);
          }
        }
      `}</style>

      </div>
    );
  }

  // DEFAULT / B2B CATALOG PAGE (Grid list of major categories)
  return (
    <div style={{ color: 'var(--text-primary)', paddingBottom: '6rem' }}>

      {/* Header */}
      <section style={{ padding: '4rem 0 3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>UNIQIX CATALOG</span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, margin: '0.5rem 0 1rem 0', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Products Catalog
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.6' }}>
            Browse our aggregated product categories, technical specifications, and industrial test data.
          </p>
        </div>
      </section>

      {/* Catalog Grid */}
      <section style={{ padding: '0 0 4rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

          {/* Card 1: AI Robotics */}
          <div
            className="glass-panel"
            style={{
              padding: '3rem',
              borderRadius: '2rem',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderTop: '4px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-glass)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = 'var(--card-hover-bg-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
              e.currentTarget.style.background = 'var(--bg-glass)';
            }}
          >
            <div>
              <div style={{ background: 'var(--primary-glow)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '2rem' }}>
                <Cpu style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                AI Robotics
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '2rem' }}>
                Patrol mosquito vector traps and remote sensing data services for commercial assets.
              </p>
            </div>
            <button onClick={() => setActiveProductTab(0)} className="btn btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Explore AI Robotics <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

          {/* Card 2: Sustainable Packaging */}
          <div
            className="glass-panel"
            style={{
              padding: '3rem',
              borderRadius: '2rem',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderTop: '4px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-glass)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = 'var(--card-hover-bg-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
              e.currentTarget.style.background = 'var(--bg-glass)';
            }}
          >
            <div>
              <div style={{ background: 'var(--primary-glow)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '2rem' }}>
                <Leaf style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Sustainable Packaging
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '2rem' }}>
                Advanced eco-friendly and biodegradable cardboard, paper packaging, and turnover containers.
              </p>
            </div>
            <button onClick={() => setActiveProductTab(1)} className="btn btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Explore Packaging Suite <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

          {/* Card 3: Smart Energy Solutions */}
          <div
            className="glass-panel"
            style={{
              padding: '3rem',
              borderRadius: '2rem',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glass)',
              borderTop: '4px solid var(--primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-glass)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = 'var(--card-hover-bg-white)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
              e.currentTarget.style.background = 'var(--bg-glass)';
            }}
          >
            <div>
              <div style={{ background: 'var(--primary-glow)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '2rem' }}>
                <Lightbulb style={{ width: '32px', height: '32px', color: 'var(--primary)' }} />
              </div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: "'Playfair Display', Georgia, serif" }}>
                Smart Energy Solutions
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.75', marginBottom: '2rem' }}>
                Convert illumination into energy efficiency with IoT-enabled smart lighting grids.
              </p>
            </div>
            <button onClick={() => setActiveProductTab(2)} className="btn btn-primary" style={{ width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              Explore Energy Solutions <ArrowRight style={{ width: '16px', height: '16px' }} />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ProductsPage;
