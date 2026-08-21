import React, { useState } from 'react';
import { 
  Box, Settings, Users, Leaf, Globe, Shield, Truck, FileText, 
  TrendingUp, MessageCircle, ArrowRight, Check, CheckCircle, Cpu, Lightbulb,
  Droplet, ThermometerSnowflake, Flame, Trash2, Sparkles, ChevronRight,
  Building, ShieldCheck, Target, Award, Calendar, HelpCircle
} from 'lucide-react';

import fu from '../assets/fieldunit.png';
import dash from '../assets/dashboard.png';
import school from '../assets/school.png';
import dragonflyConcept from '../assets/dragonfly_concept.jpg';

import emsMgmtImg from '../assets/ems_management.png';
import dimmingImg from '../assets/stepless_dimming.png';
import groupSensingImg from '../assets/group_sensing.png';

import ecoPalletsImg from '../assets/eco_pallets.jpg';
import stretchFilmImg from '../assets/stretch_film.jpg';
import bubbleWrapImg from '../assets/bubble_wrap.jpg';
import oppTapeImg from '../assets/opp_tape.jpg';

import eggCartonImg from '../assets/egg_carton.jpeg';
import rectangularTubsImg from '../assets/rectangular_tubs.jpg';
import dividedContainerImg from '../assets/divided_container.jpg';
import rectContainerImg from '../assets/rect_container.jpg';

const ProductsPage = ({ setCurrentPage, activeProductTab, setActiveProductTab }) => {
  const [showTechDetails, setShowTechDetails] = useState(true);
  const [hoveredBoxIdx, setHoveredBoxIdx] = useState(null);

  // Reusable 3D Tilt state dictionary for multiple cards
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

  // Technical packaging data
  const turnoverBoxes = [
    { name: 'Velcro Turnover Box', specs: '680X560X360mm', advantages: 'Easy folding for loading/unloading, slip-resistant, pressure-resistant, high recyclability.', apps: 'Fresh produce cold chain, production line distribution, retail loops.' },
    { name: 'Knife Card Grid', specs: '600X300X500mm', advantages: 'Lightweight & durable, precision die-cutting, foldable, ultrasonic edge sealing.', apps: 'Glass industry filling, precision instrument protection.' },
    { name: 'Pallet Box', specs: '1000X1200mm', advantages: 'Sturdy load-bearing, stackable for visibility, customizable specs.', apps: 'Fruit/veg distribution, auto parts inter-factory transit, parcel consolidation.' }
  ];

  const physicalTests = [
    { title: 'Water Resistance', desc: 'Soaking test for one week — box remains intact without damage.', icon: <Droplet style={{ color: '#06b6d4', width: '20px', height: '20px' }} /> },
    { title: 'Compression Resistance', desc: 'Superior load-bearing capability verified on customer sample boxes.', icon: <Shield style={{ color: '#4f46e5', width: '20px', height: '20px' }} /> },
    { title: 'Freezing Resistance', desc: 'Resilient at low temperatures (-20°C) for 3–4 months without softening.', icon: <ThermometerSnowflake style={{ color: '#3b82f6', width: '20px', height: '20px' }} /> },
    { title: 'Complete Degradation', desc: 'Controllable degradation; burns cleanly into powder with zero plastic residue.', icon: <Flame style={{ color: '#ec4899', width: '20px', height: '20px' }} /> },
    { title: 'Adjustable Service Life', desc: 'Material degradation parameters can be pre-configured to meet requirements.', icon: <Trash2 style={{ color: '#10b981', width: '20px', height: '20px' }} /> },
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
      { title: 'AI-Powered Analytics', desc: 'Smart vector activity monitoring, telemetry, and automated compliance reporting.', icon: <Cpu style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
      { title: 'Fully Autonomous Patrol', desc: 'Patrols campuses, factories, and outdoor spaces 24/7 without needing operator manpower.', icon: <Settings style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
      { title: 'Chemical-Free & Safe', desc: 'Non-toxic trapping lures make it perfect for schools, public areas, and occupied sites.', icon: <ShieldCheck style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
      { title: '24/7 Active Trap', desc: 'Smart UV light and specialized pheromone lures target Aedes mosquitoes day and night.', icon: <Target style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
      { title: 'Zero Capital Expense', desc: 'Flexible monthly leasing model avoids heavy upfront investments.', icon: <TrendingUp style={{ width: '24px', height: '24px', color: '#c5a059' }} /> },
      { title: 'Versatile Operations', desc: 'Ideal for construction sites, dorms, warehouses, logistics depots, and malls.', icon: <Building style={{ width: '24px', height: '24px', color: '#c5a059' }} /> }
    ];

    const whyDragonflyCards = [
      {
        title: 'Continuous Source Elimination',
        desc: 'Traditional chemical fogging and misting only disperse flying insects temporarily. Dragonfly patrols continuously to eliminate the breeding population at the source',
        tag: 'PROACTIVE',
        color: '#c5a059'
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
        <section style={{ padding: '4rem 0 3rem 0', textAlign: 'center' }}>
          <div className="container">
            <button 
              onClick={() => setActiveProductTab(null)} 
              className="btn btn-secondary" 
              style={{ 
                marginBottom: '2rem', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '0.6rem 1.2rem',
                fontSize: '0.85rem'
              }}
            >
              ← Back to B2B Catalog
            </button>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c5a059', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              AI ROBOTICS SOLUTION
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.25rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Uniqix Dragonfly
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Uniqix Dragonfly is an autonomous robot designed to tackle Aedes mosquitoes. It patrols spaces independently, attracts mosquitoes using UV light and smart lures, and traps them without chemicals or fogging.
            </p>
          </div>
        </section>

        {/* 6 Features Grid */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1em' }}>FEATURES & BENEFITS</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: '"Times New Roman", Times, serif' }}>Smart Capabilities</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {aiRoboticsFeatures.map((feat, idx) => {
                const cardId = `feat-${idx}`;
                return (
                  <div 
                    key={idx}
                    className="glass-panel"
                    style={{
                      padding: '2.5rem 2rem',
                      borderRadius: '1.25rem',
                      border: '1px solid var(--border-glass)',
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
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '10px', 
                      background: 'rgba(197, 160, 89, 0.08)',
                      border: '1px solid rgba(197, 160, 89, 0.15)',
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      marginBottom: '1.5rem',
                      transform: 'translateZ(10px)'
                    }}>
                      {feat.icon}
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem', transform: 'translateZ(15px)' }}>
                      {feat.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                      {feat.desc}
                    </p>
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
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1em' }}>COMPARISON REVIEW</span>
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
                      border: `1px solid var(--border-glass)`,
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
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#c5a059', textTransform: 'uppercase', letterSpacing: '0.1%m' }}>FIELD EVIDENCE</span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 850, marginTop: '0.5rem', fontFamily: '"Times New Roman", Times, serif' }}>Deployments & Telemetry</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
              
              {/* Card 1: Grass Patrol */}
              <div 
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
                  ...(hoveredCardId === 'vis-0' ? tiltStyles['vis-0'] : {})
                }}
                onMouseMove={(e) => handleMouseMove3D(e, 'vis-0')}
                onMouseLeave={() => handleMouseLeave3D('vis-0')}
              >
                <img src={fu} alt="Dragonfly Grass Patrol" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', height: '240px', transform: 'translateZ(10px)' }} />
                <div style={{ padding: '1rem 0.5rem 0.5rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center', transform: 'translateZ(15px)' }}>
                  Dragonfly Autonomous Field Unit
                </div>
              </div>

              {/* Card 2: Campus Patrol */}
              <div 
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
                  ...(hoveredCardId === 'vis-1' ? tiltStyles['vis-1'] : {})
                }}
                onMouseMove={(e) => handleMouseMove3D(e, 'vis-1')}
                onMouseLeave={() => handleMouseLeave3D('vis-1')}
              >
                <img src={school} alt="Dragonfly Public Campus Patrol" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', height: '240px', transform: 'translateZ(10px)' }} />
                <div style={{ padding: '1rem 0.5rem 0.5rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center', transform: 'translateZ(15px)' }}>
                  Safe Chemical-Free Public Operations
                </div>
              </div>

              {/* Card 3: ROS Dashboard */}
              <div 
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
                  ...(hoveredCardId === 'vis-2' ? tiltStyles['vis-2'] : {})
                }}
                onMouseMove={(e) => handleMouseMove3D(e, 'vis-2')}
                onMouseLeave={() => handleMouseLeave3D('vis-2')}
              >
                <img src={dash} alt="Dragonfly Telemetry Dashboard" style={{ width: '100%', borderRadius: '1rem', objectFit: 'cover', height: '240px', transform: 'translateZ(10px)' }} />
                <div style={{ padding: '1rem 0.5rem 0.5rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center', transform: 'translateZ(15px)' }}>
                  L3 SUTD ROS Telemetry & Active Sensor Dashboard
                </div>
              </div>

              {/* Card 4: AI Vector Control Robot */}
              <div 
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
              </div>

            </div>
          </div>
        </section>

        {/* CTA Rental Request Card */}
        <section style={{ padding: '4rem 0 0 0' }}>
          <div className="container" style={{ maxWidth: '650px' }}>
            <div 
              className="glass-panel"
              style={{
                padding: '3rem',
                borderRadius: '1.5rem',
                border: '1px solid var(--border-glass)',
                background: 'var(--primary-glow)',
                boxShadow: 'var(--shadow-glass)',
                cursor: 'pointer',
                textAlign: 'center',
                transformStyle: 'preserve-3d',
                transition: 'all 0.3s ease',
                ...(hoveredCardId === 'vis-cta' ? tiltStyles['vis-cta'] : {})
              }}
              onMouseMove={(e) => handleMouseMove3D(e, 'vis-cta')}
              onMouseLeave={() => handleMouseLeave3D('vis-cta')}
            >
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                background: 'rgba(197, 160, 89, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                transform: 'translateZ(10px)'
              }}>
                <Calendar style={{ width: '26px', height: '26px', color: '#c5a059' }} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem', transform: 'translateZ(15px)' }}>
                Request Monthly Rental Rates
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
                No heavy upfront capital investment. Schedule an on-site inspection vector audit for deployment.
              </p>
              <button 
                onClick={() => setCurrentPage('contact')} 
                className="btn btn-primary" 
                style={{ padding: '0.85rem 2rem', transform: 'translateZ(20px)' }}
              >
                Book Vector Audit
              </button>
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
      { case: 'Food Industry Case 1', wB: '800g', wS: '710g ↑', lB: '20.7kg', lS: '23.6kg ↑', eB: '3720 N/m', eS: '8420 N/m ↑', bB: '804 kPa', bS: '1040 kPa ↑' },
      { case: 'Food Industry Case 2', wB: '460g', wS: '520g ↑', lB: '24.5kg', lS: '281kg ↑', eB: '5020 N/m', eS: '10880 N/m ↑', bB: '839.7 kPa', bS: '1257 kPa ↑' },
      { case: 'Beverage Industry Case', wB: '120g', wS: '200g ↑', lB: '113kg', lS: '136kg ↑', eB: '3260 N/m', eS: '10680 N/m ↑', bB: '739 kPa', bS: '1257 kPa ↑' },
      { case: 'Tool Industry Case', wB: '240g', wS: '230g ↑', lB: '75kg', lS: '123kg ↑', eB: '4130 N/m', eS: '10880 N/m ↑', bB: '848 kPa', bS: '1257 kPa ↑' }
    ];

    return (
      <div style={{ color: 'var(--text-primary)', position: 'relative', paddingBottom: '6rem' }}>
        
        {/* Header Block */}
        <section style={{ padding: '4rem 0 3rem 0', textAlign: 'center', position: 'relative' }}>
          <div className="container">
            <button 
              onClick={() => setActiveProductTab(null)} 
              className="btn btn-secondary" 
              style={{ 
                position: 'absolute', 
                left: '1.5rem', 
                top: '4rem', 
                padding: '0.6rem 1.2rem', 
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              ← Back to B2B Catalog
            </button>

            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              PRODUCT SPECIFICATIONS
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Bulk Supply of Sustainable Packaging
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Sustainable packaging engineered for industrial use — durable, reliable and designed to achieve double the compression strength.
            </p>
          </div>
        </section>

        {/* 6 Grid Cards */}
        <section style={{ padding: '1rem 0 4rem 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
              {packagingCards.map((card, idx) => {
                const cardId = `pack-${idx}`;
                return (
                  <div 
                    key={idx} 
                    className="glass-panel" 
                    style={{ 
                      padding: '2.5rem', 
                      borderRadius: '1.5rem', 
                      border: '1px solid var(--border-glass)',
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
                    <div style={{ background: 'var(--primary-glow)', width: 'fit-content', padding: '10px', borderRadius: '10px', marginBottom: '1.25rem', transform: 'translateZ(10px)' }}>
                      {card.icon}
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.75rem', color: 'var(--text-primary)', transform: 'translateZ(15px)' }}>
                      {card.title}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                      {card.desc}
                    </p>
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
              {[
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
              ].map((item) => (
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
                          <Check style={{ width: '12px', height: '12px', color: '#c5a059' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setCurrentPage('contact')} className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', transform: 'translateZ(15px)' }}>
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
              {[
                {
                  id: 'inv-egg',
                  title: 'Biodegradable Egg Cartons',
                  specs: 'Moulded paper pulp 15-egg cartons, export-grade cushioning and nesting.',
                  features: ['100% Recyclable pulp', 'Impact-resistant structure', 'Biodegradable material'],
                  image: eggCartonImg
                },
                {
                  id: 'inv-rectangular-tubs',
                  title: 'Rectangular Microwave Safe Tubs',
                  specs: 'BPA-free transparent rectangular plastic containers with leak-resistant lids.',
                  features: ['Microwave safe reheating', 'BPA-free formulation', 'Tight liquid-safe seals'],
                  image: rectangularTubsImg
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
                  image: rectContainerImg
                }
              ].map((item) => (
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
                          <Check style={{ width: '12px', height: '12px', color: '#c5a059' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setCurrentPage('contact')} className="btn btn-secondary" style={{ width: '100%', padding: '0.6rem', fontSize: '0.85rem', transform: 'translateZ(15px)' }}>
                    Inquire Specifications
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Physical Compression Table */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="glass-panel" style={{ padding: '3.5rem', borderRadius: '2rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 750, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
                  LABORATORY VERIFIED DATA
                </span>
                <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-primary)', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Compression Performance Record
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                  Comparison showing original box (B) versus Uniqix reinforced packaging (S).
                </p>
              </div>

              <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '680px' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(197, 160, 89, 0.15)' }}>
                      <th style={{ padding: '16px 12px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sample / Sector Case</th>
                      <th style={{ padding: '16px 12px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Weight (B vs S)</th>
                      <th style={{ padding: '16px 12px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Load Limit (B vs S)</th>
                      <th style={{ padding: '16px 12px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Edge Crush (ECT)</th>
                      <th style={{ padding: '16px 12px', fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Bursting Strength</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compressionRecords.map((row, idx) => (
                      <tr 
                        key={idx} 
                        style={{ 
                          borderBottom: '1px solid var(--border-glass)',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(197, 160, 89, 0.03)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '20px 12px', fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                          {row.case}
                        </td>
                        <td style={{ padding: '20px 12px', fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{row.wB}</span>
                          <span style={{ color: '#c5a059', marginRight: '6px', fontWeight: 700 }}>→</span>
                          <span style={{ fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 8px', borderRadius: '6px' }}>{row.wS}</span>
                        </td>
                        <td style={{ padding: '20px 12px', fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{row.lB}</span>
                          <span style={{ color: '#c5a059', marginRight: '6px', fontWeight: 700 }}>→</span>
                          <span style={{ fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 8px', borderRadius: '6px' }}>{row.lS}</span>
                        </td>
                        <td style={{ padding: '20px 12px', fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{row.eB}</span>
                          <span style={{ color: '#c5a059', marginRight: '6px', fontWeight: 700 }}>→</span>
                          <span style={{ fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 8px', borderRadius: '6px' }}>{row.eS}</span>
                        </td>
                        <td style={{ padding: '20px 12px', fontSize: '0.9rem' }}>
                          <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>{row.bB}</span>
                          <span style={{ color: '#c5a059', marginRight: '6px', fontWeight: 700 }}>→</span>
                          <span style={{ fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '4px 8px', borderRadius: '6px' }}>{row.bS}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Data Suite Toggle */}
        <section style={{ padding: '2rem 0' }}>
          <div className="container" style={{ maxWidth: '900px' }}>
            <div className="glass-panel" style={{ padding: '3.5rem', borderRadius: '2rem', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-glass)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: "'Playfair Display', Georgia, serif" }}>
                    Standard Turnover Box Specifications
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0', fontSize: '0.95rem' }}>
                    Click button to show or hide the structural engineering data sheet.
                  </p>
                </div>
                <button 
                  onClick={() => setShowTechDetails(!showTechDetails)} 
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}
                >
                  {showTechDetails ? 'Hide Spec Sheet' : 'Show Spec Sheet'}
                </button>
              </div>

              {showTechDetails && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', transition: 'all 0.5s ease' }}>
                  {turnoverBoxes.map((box, idx) => {
                    const isHovered = hoveredBoxIdx === idx;
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          borderLeft: '4px solid var(--primary)', 
                          paddingLeft: '1.5rem', 
                          background: isHovered ? 'var(--card-hover-bg-white)' : 'rgba(6, 182, 212, 0.02)', 
                          padding: '1.5rem',
                          borderRadius: '0 1rem 1rem 0',
                          border: '1px solid var(--border-glass)',
                          borderLeft: '4px solid var(--primary)',
                          boxShadow: isHovered ? 'var(--card-hover-shadow)' : 'none',
                          borderColor: isHovered ? 'var(--card-hover-border)' : 'var(--border-glass)',
                          transform: isHovered ? 'translateY(-2px)' : 'none',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={() => setHoveredBoxIdx(idx)}
                        onMouseLeave={() => setHoveredBoxIdx(null)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{box.name}</h4>
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, background: 'var(--primary-glow)', color: 'var(--primary)', padding: '4px 10px', borderRadius: '20px' }}>
                            Specs: {box.specs}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '0.5rem' }}>
                          <strong>Material Advantages</strong>: {box.advantages}
                        </p>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0 }}>
                          <strong>Applications</strong>: {box.apps}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
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
        title: 'Local + Cloud EMS Management',
        desc: (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', transform: 'translateZ(15px)' }}>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)' }}>
              <strong>Local EMS</strong>: Provides real-time device control, data collection, and instant response, ensuring independent operation even during network interruptions.
            </p>
            <p style={{ fontSize: '0.92rem', lineHeight: '1.6', margin: 0, color: 'var(--text-secondary)' }}>
              <strong>Cloud EMS</strong>: Enables centralized management across multiple buildings and regions, supporting energy statistics, AI-driven efficiency analysis, remote monitoring, and reporting.
            </p>
          </div>
        ),
        image: emsMgmtImg,
        imgAlt: 'EMS Management Diagram'
      },
      {
        id: 'energy-dimming',
        title: 'Stepless Dimming with Microwave',
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
        title: 'Localized Light Tube Group Sensing',
        bullets: [
          'Multiple light tubes can be grouped for inter-control.',
          'When any light tube within a group detects vehicles or human motion, it triggers all other light tubes in the group to light up simultaneously.',
          'This ensures that lighting is activated in advance of vehicle or pedestrian arrival, enhancing user experience and driving safety.',
          'In addition, group data and light tube parameters are stored in the built-in intelligent chip of each light tube, ensuring stable, safe, and reliable operation.'
        ],
        image: groupSensingImg,
        imgAlt: 'Group Sensing'
      }
    ];

    return (
      <div style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '6rem' }}>
        
        {/* Header Block */}
        <section style={{ padding: '4rem 0 3rem 0', textAlign: 'center', position: 'relative' }}>
          <div className="container">
            <button 
              onClick={() => setActiveProductTab(null)} 
              className="btn btn-secondary" 
              style={{ 
                marginBottom: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.6rem 1.2rem', 
                fontSize: '0.85rem'
              }}
            >
              ← Back to B2B Catalog
            </button>

            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c5a059', letterSpacing: '0.15em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
              SMART ENERGY SAVING
            </span>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: "'Playfair Display', Georgia, serif" }}>
              Smart Lighting for Energy Saving
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.6' }}>
              Convert illumination into energy efficiency. Retrofit warehouses, parking spaces, and commercial facilities with IoT-enabled smart grids, microwave motion tracking, and local + cloud management systems.
            </p>
          </div>
        </section>

        {/* Content Layout: Stacked column to avoid empty space */}
        <section style={{ padding: '1rem 0' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              
              {energyCards.map((card) => (
                <div 
                  key={card.id}
                  className="glass-panel"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '1.5rem',
                    border: '1px solid var(--border-glass)',
                    background: 'var(--bg-glass)',
                    boxShadow: 'var(--shadow-glass)',
                    cursor: 'pointer',
                    transformStyle: 'preserve-3d',
                    transition: 'all 0.3s ease',
                    ...(hoveredCardId === card.id ? tiltStyles[card.id] : {})
                  }}
                  onMouseMove={(e) => handleMouseMove3D(e, card.id)}
                  onMouseLeave={() => handleMouseLeave3D(card.id)}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'center' }} className="bridge-layout">
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem', fontFamily: "'Playfair Display', Georgia, serif", transform: 'translateZ(15px)' }}>
                        {card.title}
                      </h3>
                      {card.desc ? card.desc : (
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingLeft: 0, listStyle: 'none', transform: 'translateZ(15px)' }}>
                          {card.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                              <CheckCircle style={{ width: '16px', height: '16px', color: '#c5a059', flexShrink: 0, marginTop: '3px' }} />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div style={{ transform: 'translateZ(10px)', borderRadius: '1rem', overflow: 'hidden', border: '1px solid var(--border-glass)', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}>
                      <img src={card.image} alt={card.imgAlt} style={{ width: '100%', display: 'block', objectFit: 'contain' }} />
                    </div>
                  </div>
                </div>
              ))}

              {/* Full-width Energy Efficiency Audits CTA Banner Card */}
              <div 
                className="glass-panel"
                style={{
                  padding: '3rem 2.5rem',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--border-glass)',
                  borderLeft: '4px solid #c5a059',
                  background: 'var(--bg-glass)',
                  boxShadow: 'var(--shadow-glass)',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s ease',
                  marginTop: '1rem',
                  ...(hoveredCardId === 'energy-audit' ? tiltStyles['energy-audit'] : {})
                }}
                onMouseMove={(e) => handleMouseMove3D(e, 'energy-audit')}
                onMouseLeave={() => handleMouseLeave3D('energy-audit')}
              >
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    borderRadius: '50%', 
                    background: 'rgba(197, 160, 89, 0.08)', 
                    border: '1px solid rgba(197, 160, 89, 0.15)',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    flexShrink: 0,
                    transform: 'translateZ(10px)'
                  }}>
                    <Award style={{ width: '30px', height: '30px', color: '#c5a059' }} />
                  </div>
                  <div style={{ flex: '1', minWidth: '280px' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: "'Playfair Display', Georgia, serif", transform: 'translateZ(15px)' }}>
                      Energy Efficiency Audits
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0, transform: 'translateZ(10px)' }}>
                      Our engineering team conducts compliance scans to project your consumption reductions and ensure optimal hardware layouts.
                    </p>
                  </div>
                  <button 
                    onClick={() => setCurrentPage('contact')} 
                    className="btn btn-primary" 
                    style={{ padding: '0.85rem 2rem', transform: 'translateZ(20px)', flexShrink: 0 }}
                  >
                    Schedule Energy Audit
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
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
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.borderColor = 'var(--border-glass)';
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
