import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Home, Shield, Percent, Sparkles, Check, ShieldAlert, CheckCircle, RefreshCw } from 'lucide-react';
import dormImage from '../assets/uniqix_dormitory.png';

const DormitoriesPage = ({ setCurrentPage }) => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    moveInDate: '',
    workers: '',
    type: 'Standard Shared Space',
  });

  const [searched, setSearched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  const [dbDormitories, setDbDormitories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dormitories/')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const formatted = data.map(item => ({
            name: item.name,
            location: item.location,
            beds: item.available_rooms,
            price: item.price,
            type: 'Standard Shared Space',
            image_url: item.image_url
          }));
          setDbDormitories(formatted);
        }
      })
      .catch(err => console.error("Error loading db dorms:", err));
  }, []);

  const [currentPageIdx, setCurrentPageIdx] = useState(0);
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

  const allLocations = [
    { name: 'Tuas Industrial Hub Accommodation', location: 'Tuas, Singapore', beds: 420, price: '$220/month', type: 'Standard Shared Space', image_url: 'https://images.unsplash.com/photo-1555637138-afc824873004?auto=format&fit=crop&w=800&q=80' },
    { name: 'Woodlands Sector 3 Dormitories', location: 'Woodlands, Singapore', beds: 180, price: '$240/month', type: 'Executive Cabin', image_url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80' },
    { name: 'Changi Logistics Residence', location: 'Changi, Singapore', beds: 95, price: '$260/month', type: 'Premium Suite', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { name: 'Jurong West Worker Complex', location: 'Jurong, Singapore', beds: 310, price: '$210/month', type: 'Standard Shared Space', image_url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' },
    { name: 'Penjuru Road Accommodation', location: 'Penjuru, Singapore', beds: 150, price: '$230/month', type: 'Standard Shared Space', image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
    { name: 'Sembawang Coastal Lodging', location: 'Sembawang, Singapore', beds: 200, price: '$250/month', type: 'Executive Cabin', image_url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80' },
  ];

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('http://127.0.0.1:8000/api/dormitories/search/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      });
    } catch (err) {
      console.error("Error logging search parameters:", err);
    } finally {
      setIsSubmitting(false);
    }
    const sourceList = dbDormitories.length > 0 ? dbDormitories : allLocations;
    const filtered = sourceList.filter(loc => {
      if (searchParams.location && !loc.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
        return false;
      }
      return true;
    });
    setResults(filtered.length > 0 ? filtered : sourceList);
    setSearched(true);
  };

  const whyChooseCards = [
    {
      id: 'why-1',
      title: 'FEDA-Compliant & Fully Managed',
      desc: 'Our dormitories meet and exceed Singapore’s Foreign Employee Dormitories Act (FEDA) requirements. From licensing and safety standards to daily operations, we handle everything so you can focus on your business.',
      icon: <Shield style={{ color: 'var(--primary)', width: '24px', height: '24px' }} />
    },
    {
      id: 'why-2',
      title: 'Strategically Located Near Industrial Zones',
      desc: 'Our accommodation hubs are positioned close to major industrial areas, reducing travel time for your workers and improving punctuality and productivity.',
      icon: <MapPin style={{ color: 'var(--primary)', width: '24px', height: '24px' }} />
    },
    {
      id: 'why-3',
      title: 'Secure & Well-Maintained Living',
      bullets: [
        '24/7 security and controlled access',
        'Clean, well-ventilated rooms with proper amenities',
        'Regular maintenance and housekeeping',
        'On-site management team for quick issue resolution'
      ],
      icon: <Users style={{ color: 'var(--primary)', width: '24px', height: '24px' }} />
    },
    {
      id: 'why-4',
      title: 'Comfort That Supports Worker Well-Being',
      desc: 'We understand that quality rest directly impacts performance. Our facilities are designed to provide a safe, hygienic, and comfortable living environment that helps your workforce stay healthy and motivated.',
      icon: <Sparkles style={{ color: 'var(--primary)', width: '24px', height: '24px' }} />
    },
    {
      id: 'why-5',
      title: 'End-to-End Support for Companies',
      desc: 'Whether you need short-term or long-term housing solutions, Uniqix offers flexible arrangements tailored to your manpower requirements. We manage the entire process — from placement and onboarding to ongoing facility management — giving you peace of mind.',
      icon: <Check style={{ color: 'var(--primary)', width: '24px', height: '24px' }} />
    },
    {
      id: 'why-6',
      title: 'Built for Companies That Value Reliability',
      desc: 'At Uniqix, we don’t just provide beds. We provide dependable workforce lodging solutions that help you attract, retain, and support your foreign employees while staying fully compliant with Singapore’s strict regulatory framework.',
      icon: <Percent style={{ color: 'var(--primary)', width: '24px', height: '24px' }} />
    }
  ];

  const dormList = searched ? results : (dbDormitories.length > 0 ? dbDormitories : allLocations);
  const totalPages = Math.ceil(dormList.length / 4);
  const currentImages = dormList.slice(currentPageIdx * 4, (currentPageIdx + 1) * 4);
  const nextPage = () => setCurrentPageIdx(prev => (prev + 1) % totalPages);
  const prevPage = () => setCurrentPageIdx(prev => (prev - 1 + totalPages) % totalPages);

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem', color: 'var(--text-primary)' }}>
      {/* Title & Introduction */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>WORKFORCE HOOD LODGING</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, margin: '0.5rem 0 1rem 0', fontFamily: "'Playfair Display', Georgia, serif" }}>
          Reliable, Fully-Managed Housing
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto', fontSize: '1.15rem', lineHeight: '1.7' }}>
          Looking for secure, compliant, and well-managed accommodation for your foreign workforce in Singapore? Uniqix delivers purpose-built dormitory housing solutions designed specifically for companies that need to house their workers safely, comfortably, and in full compliance with local regulations.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'center' }}>

        {/* Search Dormitories Form */}
        <div className="glass-panel" style={{ padding: '2.5rem', height: 'fit-content', border: '1px solid var(--border-glass)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Search style={{ color: 'var(--primary)' }} /> Search Accommodations
          </h2>
          <form onSubmit={handleSearchSubmit}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <MapPin style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Preferred Location
              </label>
              <input
                type="text"
                placeholder="e.g. Tuas, Jurong"
                className="form-input"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Calendar style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Move-in Date
              </label>
              <input
                type="date"
                className="form-input"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                value={searchParams.moveInDate}
                onChange={(e) => setSearchParams({ ...searchParams, moveInDate: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Users style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Number of Workers
              </label>
              <input
                type="number"
                placeholder="e.g. 50"
                className="form-input"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                value={searchParams.workers}
                onChange={(e) => setSearchParams({ ...searchParams, workers: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                <Home style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Accommodation Type
              </label>
              <select
                className="form-input"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                value={searchParams.type}
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
              >
                <option value="Standard Shared Space">Standard Shared Space (4-8 beds)</option>
                <option value="Executive Cabin">Executive Cabin (2 beds)</option>
                <option value="Premium Suite">Premium Suite (Single occupancy)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
              style={{
                width: '100%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0.85rem 1.5rem',
                borderRadius: '10px',
                fontWeight: 700
              }}
            >
              {isSubmitting ? (
                <>Transmitting Search Query...</>
              ) : searched ? (
                <>
                  <CheckCircle style={{ width: '18px', height: '18px', color: '#10b981' }} />
                  Query Submitted & Transmitted ✓
                </>
              ) : (
                <>Query Available Spaces</>
              )}
            </button>
          </form>

          {searched && (
            <div style={{
              marginTop: '1.25rem',
              padding: '1.1rem 1.25rem',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1.5px solid #10b981',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              animation: 'fadeIn 0.3s ease'
            }}>
              <CheckCircle style={{ width: '22px', height: '22px', color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#10b981', marginBottom: '2px' }}>
                  Search Query Submitted Successfully!
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.45' }}>
                  Your search inquiry ({searchParams.workers ? `${searchParams.workers} workers, ` : ''}{searchParams.type}) has been logged in the Admin Management System.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearched(false);
                    setSearchParams({ location: '', moveInDate: '', workers: '', type: 'Standard Shared Space' });
                    setResults([]);
                  }}
                  style={{
                    marginTop: '8px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    padding: 0,
                    textDecoration: 'underline',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw style={{ width: '12px', height: '12px' }} /> Reset & Clear Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic Architectural Render */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ padding: '1rem', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-glass)', border: '1px solid var(--border-glass)' }}>
            <img
              src={dormImage}
              alt="Uniqix Modular Dormitories"
              style={{
                width: '100%',
                maxWidth: '450px',
                height: 'auto',
                borderRadius: '1rem',
                display: 'block',
              }}
            />
          </div>
        </div>
      </div>

      {/* Why Choose Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '40px', height: '1px', background: '#D4A72C' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D4A72C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>FEATURES & BENEFITS</span>
          <div style={{ width: '40px', height: '1px', background: '#D4A72C' }} />
        </div>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 900, fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)', margin: '0.5rem 0 1rem 0' }}>
          Why Choose Uniqix Dormitory Housing?
        </h2>
        <div style={{ width: '60px', height: '3px', background: '#D4A72C', margin: '0 auto', borderRadius: '2px' }} />
      </div>

      {/* Value Highlights Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
        {whyChooseCards.map((card) => (
          <div
            key={card.id}
            className="glass-panel dormitory-why-card"
            style={{
              padding: '2.5rem',
              borderRadius: '2rem',
              border: '2px solid var(--card-gold-border, #D4A72C)',
              background: 'var(--bg-glass)',
              boxShadow: 'var(--shadow-glass)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            {/* Top-Right Gold Ribbon for featured cards */}
            {(card.id === 'why-3' || card.id === 'why-6') && (
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, transparent 50%, #D4A72C 50%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyItems: 'flex-end',
                justifyContent: 'flex-end',
                padding: '6px 8px',
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                transform: 'rotate(90deg)',
                zIndex: 2
              }}>
                <span style={{ color: '#ffffff', fontSize: '0.75rem', transform: 'rotate(-45deg) translate(-2px, -2px)', fontWeight: 'bold' }}>★</span>
              </div>
            )}

            <div>
              {/* Header: Icon + Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: 'rgba(197, 160, 89, 0.05)',
                  border: '2px solid #D4A72C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {card.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: '1.35' }}>
                  {card.title}
                </h3>
              </div>

              {/* Content: Description / Bullets */}
              <div>
                {card.desc && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.65', margin: 0 }}>
                    {card.desc}
                  </p>
                )}
                {card.bullets && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', paddingLeft: 0, listStyle: 'none', margin: 0 }}>
                    {card.bullets.map((li, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                        <span style={{ color: '#D4A72C', fontWeight: 'bold', fontSize: '1rem', lineHeight: '1', display: 'inline-block' }}>✓</span>
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dormitory Gallery Section */}
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif", margin: 0 }}>
              {searched ? 'Query Results' : 'Dormitory Gallery'}
            </h2>
            {searched && (
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: '20px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid #10b981',
                color: '#10b981',
                fontSize: '0.82rem',
                fontWeight: 700
              }}>
                <CheckCircle style={{ width: '14px', height: '14px' }} /> Query Transmitted ({dormList.length} Matching Hubs)
              </span>
            )}
          </div>
          {/* Carousel Controls */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={prevPage}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', borderRadius: '30px', cursor: 'pointer' }}
              >
                &larr; Prev
              </button>
              <button
                onClick={nextPage}
                className="btn btn-secondary"
                style={{ padding: '8px 16px', borderRadius: '30px', cursor: 'pointer' }}
              >
                Next &rarr;
              </button>
            </div>
          )}
        </div>

        {/* 2x2 Grid Layout */}
        <div className="gallery-grid">
          {currentImages.map((dorm, idx) => {
            const cardId = `gallery-${idx}`;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  position: 'relative',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  border: '2px solid var(--card-gold-border, #D4A72C)',
                  boxShadow: 'var(--shadow-glass)',
                  height: '280px',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s ease',
                  ...(hoveredCardId === cardId ? tiltStyles[cardId] : {})
                }}

              >
                <img
                  src={dorm.image_url || 'https://images.unsplash.com/photo-1555637138-afc824873004?auto=format&fit=crop&w=800&q=80'}
                  alt={dorm.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Bed spaces badge */}
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(16, 185, 129, 0.9)',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '30px',
                    transform: 'translateZ(15px)'
                  }}
                >
                  {dorm.beds} Beds Available
                </span>

                {/* Bottom Overlay with details */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.5rem',
                  background: 'linear-gradient(transparent, rgba(2, 11, 30, 0.95))',
                  color: '#ffffff',
                  transform: 'translateZ(10px)'
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', fontWeight: 800 }}>{dorm.name}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin style={{ width: '14px', height: '14px', color: 'var(--primary)' }} /> {dorm.location}
                    </p>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {dorm.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Page dots indicator */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '2rem' }}>
            {Array.from({ length: totalPages }).map((_, pageIdx) => (
              <button
                key={pageIdx}
                onClick={() => setCurrentPageIdx(pageIdx)}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: 'none',
                  background: currentPageIdx === pageIdx ? 'var(--primary)' : 'rgba(197, 160, 89, 0.3)',
                  cursor: 'pointer',
                  padding: 0
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <section style={{ padding: '0 0 2rem 0' }}>
        <div className="glass-panel" style={{
          padding: '4rem 3rem',
          borderRadius: '2rem',
          background: 'var(--footer-bg)',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: 'var(--shadow-glass)',
          color: '#ffffff',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 750, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            GET STARTED
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff', fontFamily: "'Playfair Display', Georgia, serif" }}>
            Ready to house your workers with confidence?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
            Contact us today to discuss available capacities, view our facilities, or request a customized proposal for your company.
          </p>

          <button onClick={() => {
            setCurrentPage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }} className="btn btn-primary" style={{ padding: '0.85rem 2rem' }}>
            Contact Us Today
          </button>
        </div>
      </section>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
        .dormitory-why-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .dormitory-why-card:hover {
          transform: translateY(-8px) !important;
          border-color: #D4A72C !important;
          box-shadow: 0 25px 50px rgba(197, 160, 89, 0.15) !important;
        }
        :root:not([data-theme="dark"]) .dormitory-why-card:hover {
          background: #ffffff !important;
        }
      `}</style>
    </div>
  );
};

export default DormitoriesPage;
