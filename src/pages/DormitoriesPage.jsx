import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users, Home, Shield, Percent, Sparkles, Check } from 'lucide-react';
import dormImage from '../assets/uniqix_dormitory.png';

const DormitoriesPage = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    moveInDate: '',
    workers: '',
    type: 'Standard Shared Space',
  });
  
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);

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

  const allLocations = [
    { name: 'Tuas Industrial Hub Accommodation', location: 'Tuas, Singapore', beds: 420, price: '$220/month', type: 'Standard Shared Space' },
    { name: 'Woodlands Sector 3 Dormitories', location: 'Woodlands, Singapore', beds: 180, price: '$240/month', type: 'Executive Cabin' },
    { name: 'Changi Logistics Residence', location: 'Changi, Singapore', beds: 95, price: '$260/month', type: 'Premium Suite' },
    { name: 'Jurong West Worker Complex', location: 'Jurong, Singapore', beds: 310, price: '$210/month', type: 'Standard Shared Space' },
    { name: 'Penjuru Road Accommodation', location: 'Penjuru, Singapore', beds: 150, price: '$230/month', type: 'Standard Shared Space' },
    { name: 'Sembawang Coastal Lodging', location: 'Sembawang, Singapore', beds: 200, price: '$250/month', type: 'Executive Cabin' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const filtered = allLocations.filter(loc => {
      if (searchParams.location && !loc.location.toLowerCase().includes(searchParams.location.toLowerCase())) {
        return false;
      }
      return true;
    });
    setResults(filtered.length > 0 ? filtered : allLocations);
    setSearched(true);
  };

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 6rem 1.5rem', color: 'var(--text-primary)' }}>
      {/* Title & Introduction */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4f46e5', letterSpacing: '0.1em' }}>WORKFORCE ACCOMMODATION</span>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: '0.5rem 0 1rem 0' }}>Dormitory Management &amp; Housing</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
          Fully compliant, secure, and modern housing facilities strategically located near major industrial and construction sectors.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'center' }}>
        
        {/* Search Dormitories Form (using tilt-card-primary) */}
        <div className="glass-panel tilt-card-primary" style={{ padding: '2.5rem', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Search style={{ color: '#4f46e5' }} /> Search Accommodations
          </h2>
          <form onSubmit={handleSearchSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin style={{ width: '16px', height: '16px' }} /> Preferred Location
              </label>
              <input
                type="text"
                placeholder="e.g. Tuas, Jurong"
                className="form-input"
                value={searchParams.location}
                onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Calendar style={{ width: '16px', height: '16px' }} /> Move-in Date
              </label>
              <input
                type="date"
                className="form-input"
                value={searchParams.moveInDate}
                onChange={(e) => setSearchParams({ ...searchParams, moveInDate: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users style={{ width: '16px', height: '16px' }} /> Number of Workers
              </label>
              <input
                type="number"
                placeholder="e.g. 50"
                className="form-input"
                value={searchParams.workers}
                onChange={(e) => setSearchParams({ ...searchParams, workers: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Home style={{ width: '16px', height: '16px' }} /> Accommodation Type
              </label>
              <select
                className="form-input"
                style={{ appearance: 'none', background: 'var(--bg-secondary)' }}
                value={searchParams.type}
                onChange={(e) => setSearchParams({ ...searchParams, type: e.target.value })}
              >
                <option value="Standard Shared Space">Standard Shared Space (4-8 beds)</option>
                <option value="Executive Cabin">Executive Cabin (2 beds)</option>
                <option value="Premium Suite">Premium Suite (Single occupancy)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Query Available spaces
            </button>
          </form>
        </div>

        {/* Dynamic Architectural Render (using tilt-card-secondary) */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="glass-panel tilt-card-secondary" style={{ padding: '1rem', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.06)' }}>
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

      {/* Value Highlights Grid (using tilt-card-scale) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '5rem' }}>
        <div className="glass-panel tilt-card-scale" style={{ padding: '2rem', borderLeft: '4px solid #06b6d4' }}>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.08)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}>
              <Shield style={{ color: '#06b6d4', width: '24px', height: '24px' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Move-In Support</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>related content to be displayed.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel tilt-card-scale" style={{ padding: '2rem', borderLeft: '4px solid #4f46e5' }}>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(79, 70, 229, 0.08)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}>
              <Percent style={{ color: '#4f46e5', width: '24px', height: '24px' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Special Corporate Rates</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>related content to be displayed.</p>
            </div>
          </div>
        </div>

        <div className="glass-panel tilt-card-scale" style={{ padding: '2rem', borderLeft: '4px solid #d97706' }}>
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <div style={{ background: 'rgba(217, 119, 6, 0.08)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}>
              <Sparkles style={{ color: '#d97706', width: '24px', height: '24px' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>40+ Locations Available</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>related content to be displayed.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Results / Dormitory Listings (using tilt-card-secondary) */}
      <div>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)' }}>
          {searched ? 'Query Results' : 'Premium Dormitory Hubs'}
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {(searched ? results : allLocations).map((dorm, idx) => {
            const cardId = `dorm-${idx}`;
            return (
              <div 
                key={idx} 
                className="glass-panel" 
                style={{ 
                  padding: '2rem', 
                  position: 'relative',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s ease',
                  background: hoveredCardId === cardId ? 'var(--card-hover-bg-white)' : 'var(--bg-glass)',
                  ...(hoveredCardId === cardId ? tiltStyles[cardId] : {})
                }}
                onMouseMove={(e) => handleMouseMove3D(e, cardId)}
                onMouseLeave={() => handleMouseLeave3D(cardId)}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10b981',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '30px',
                    transform: 'translateZ(15px)'
                  }}
                >
                  {dorm.beds} Bed Spaces Live
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem', paddingRight: '120px', color: 'var(--text-primary)', transform: 'translateZ(15px)' }}>
                  {dorm.name}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '4px', transform: 'translateZ(10px)' }}>
                  <MapPin style={{ width: '14px', height: '14px' }} /> {dorm.location}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border-glass)', transform: 'translateZ(10px)' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Est. Rate</span>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>{dorm.price}</div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check style={{ color: '#10b981', width: '16px', height: '16px' }} /> Verified Safety
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DormitoriesPage;
