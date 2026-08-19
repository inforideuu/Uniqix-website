import React from 'react';
import { HardHat, Factory, Compass, Cpu, Layers, Home } from 'lucide-react';

const IndustriesPage = () => {
  const industries = [
    {
      title: 'Construction',
      icon: <HardHat style={{ color: '#06b6d4' }} />,
      tag: 'Heavy Infrastructure',
      description: 'construction related content to be displayed.',
    },
    {
      title: 'Manufacturing',
      icon: <Factory style={{ color: '#6366f1' }} />,
      tag: 'Automated Pipelines',
      description: 'manufacturing related content to be displayed.',
    },
    {
      title: 'Engineering',
      icon: <Compass style={{ color: '#f59e0b' }} />,
      tag: 'R&D / Prototypes',
      description: 'engineering related content to be displayed.',
    },
    {
      title: 'Fabrication',
      icon: <Layers style={{ color: '#10b981' }} />,
      tag: 'Custom Machining',
      description: 'fabrication related content to be displayed.',
    },
    {
      title: 'Industrial Projects',
      icon: <Cpu style={{ color: '#ec4899' }} />,
      tag: 'Megaprojects & Energy',
      description: 'industrial projects related content to be displayed.',
    },
    {
      title: 'Facility Management',
      icon: <Home style={{ color: '#3b82f6' }} />,
      tag: 'Workforce Hubs',
      description: 'facility management related content to be displayed.',
    },
  ];

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.1em' }}>GLOBAL REACH</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0.5rem 0 1rem 0', color: 'var(--text-primary)' }}>Industries We Empower</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          Uniqix serves key sectors driving international development, providing robust material pipelines and logistical infrastructure.
        </p>
      </div>

      {/* Grid of Industries (using hover-parallax-card) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
        {industries.map((ind, idx) => (
          <div
            key={idx}
            className="glass-panel hover-parallax-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="parallax-child">
              <div style={{ background: 'rgba(79, 70, 229, 0.05)', padding: '10px', borderRadius: '8px' }}>
                {React.cloneElement(ind.icon, { style: { width: '28px', height: '28px', ...ind.icon.props.style } })}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: ind.icon.props.style.color,
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-glass)',
                }}
              >
                {ind.tag}
              </span>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }} className="parallax-child">{ind.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{ind.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustriesPage;
