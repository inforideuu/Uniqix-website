import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, MapPin, Calendar, Users, Home, Shield, Percent, Sparkles, Check, ShieldAlert, CheckCircle, RefreshCw, MessageSquare, X, Mail, User, Phone, Building } from 'lucide-react';
import dormImage from '../assets/uniqix_dormitory.png';
import { API_BASE_URL } from '../config';

const DormitoriesPage = ({ setCurrentPage }) => {
  const formRef = useRef(null);
  const [searchParams, setSearchParams] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    moveInDate: '',
    workers: '',
    type: 'Standard Shared Space',
  });

  const [searched, setSearched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState([]);
  const [dbDormitories, setDbDormitories] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [lastSearchParams, setLastSearchParams] = useState(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showModal]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/dormitories/`)
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
      await fetch(`${API_BASE_URL}/api/dormitories/search/`, {
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
    setLastSearchParams({ ...searchParams });
    setSearched(true);
    setShowModal(true);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleWhatsApp = () => {
    if (!lastSearchParams) return;
    const phone = '6596262970';
    const text = `Hello, I queried dormitory spaces on Uniqix:\n\n*Full Name:* ${lastSearchParams.name || 'N/A'}\n*Company:* ${lastSearchParams.company || 'N/A'}\n*Phone:* ${lastSearchParams.phone || 'N/A'}\n*Email:* ${lastSearchParams.email || 'N/A'}\n*Preferred Location:* ${lastSearchParams.location || 'Any'}\n*Move-in Date:* ${lastSearchParams.moveInDate || 'N/A'}\n*Number of Workers:* ${lastSearchParams.workers || 'N/A'}\n*Accommodation Type:* ${lastSearchParams.type}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    if (!lastSearchParams) return;
    const to = 'sam@uniqix.com';
    const subject = `Dormitory Space Inquiry: ${lastSearchParams.type} (${lastSearchParams.name || 'Guest'})`;
    const body = `Full Name: ${lastSearchParams.name || 'N/A'}\nCompany: ${lastSearchParams.company || 'N/A'}\nPhone: ${lastSearchParams.phone || 'N/A'}\nEmail: ${lastSearchParams.email || 'N/A'}\nPreferred Location: ${lastSearchParams.location || 'Any'}\nMove-in Date: ${lastSearchParams.moveInDate || 'N/A'}\nNumber of Workers: ${lastSearchParams.workers || 'N/A'}\nAccommodation Type: ${lastSearchParams.type}`;
    const mailtoUrl = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '5rem', alignItems: 'stretch' }}>

        {/* Search Dormitories Form */}
        <div ref={formRef} className="glass-panel" style={{ padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-glass)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Search style={{ color: 'var(--primary)' }} /> Search Accommodations
          </h2>
          <form onSubmit={handleSearchSubmit}>
            <div style={{ padding: '0.85rem 1rem', background: 'rgba(197, 160, 89, 0.08)', borderRadius: '8px', border: '1px solid rgba(197, 160, 89, 0.2)', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Contact Information (For Direct Admin Follow-up)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <User style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Full Name *
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="form-input"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                  value={searchParams.name}
                  onChange={(e) => setSearchParams({ ...searchParams, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Phone style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  placeholder="+65 9123 4567"
                  className="form-input"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                  value={searchParams.phone}
                  onChange={(e) => setSearchParams({ ...searchParams, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Mail style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Email Address *
                </label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  className="form-input"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                  value={searchParams.email}
                  onChange={(e) => setSearchParams({ ...searchParams, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  <Building style={{ width: '16px', height: '16px', color: 'var(--primary)' }} /> Company (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Acme Logistics"
                  className="form-input"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                  value={searchParams.company}
                  onChange={(e) => setSearchParams({ ...searchParams, company: e.target.value })}
                />
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', background: 'rgba(197, 160, 89, 0.08)', borderRadius: '8px', border: '1px solid rgba(197, 160, 89, 0.2)', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Accommodation Search Criteria
              </span>
            </div>

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
                    setSearchParams({ name: '', email: '', phone: '', company: '', location: '', moveInDate: '', workers: '', type: 'Standard Shared Space' });
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
        <div style={{ display: 'flex', height: '100%' }}>
          <div className="glass-panel" style={{ padding: '0.75rem', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: 'var(--shadow-glass)', border: '1px solid var(--border-glass)', width: '100%', height: '100%', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={dormImage}
              alt="Uniqix Modular Dormitories"
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '100%',
                objectFit: 'cover',
                borderRadius: '1.1rem',
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

      {/* FASTER REPLY DIALOG MODAL */}
      {showModal && createPortal(
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '1.5rem',
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'var(--bg-primary, #ffffff)',
            border: '1.5px solid var(--border-glass-hover, #D4A72C)',
            borderRadius: '24px',
            maxWidth: '500px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.25rem 2rem 2rem 2rem',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 35px rgba(212, 167, 44, 0.25)',
            color: 'var(--text-primary, #0f172a)',
            animation: 'fadeIn 0.25s ease-out',
            margin: 'auto'
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              aria-label="Close dialog"
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(212, 167, 44, 0.12)',
                border: '1.5px solid #D4A72C',
                color: '#D4A72C',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                zIndex: 10
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.background = '#D4A72C'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = 'rgba(212, 167, 44, 0.12)'; e.currentTarget.style.color = '#D4A72C'; }}
            >
              X
            </button>

            {/* Modal Title */}
            <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(212, 167, 44, 0.12)',
                border: '1.5px solid #D4A72C',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem'
              }}>
                <MessageSquare style={{ width: '28px', height: '28px', color: '#D4A72C' }} />
              </div>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0 0 0.5rem 0', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--text-primary)' }}>
                Faster Reply Options
              </h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.55' }}>
                Would you like to send your dormitory space query directly via WhatsApp or Email for instant priority dispatch?
              </p>
            </div>

            {/* Actions Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                Send via WhatsApp (+65 96262970)
              </button>

              {/* Email Button */}
              <button
                onClick={handleEmail}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '1rem 1.25rem',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(59, 130, 246, 0.3)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Mail style={{ width: '22px', height: '22px' }} />
                Send via Email (sam@uniqix.com)
              </button>

            </div>

            {/* Modal Footer Note */}
            <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Close & Continue with Web Submission
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

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
