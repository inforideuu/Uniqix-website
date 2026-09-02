import React, { useState } from 'react';
import { Menu, X, ChevronDown, Sparkles, Sun, Moon } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, theme, toggleTheme, setActiveProductTab, setActiveTradeSector }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'solutions' | 'trade' | null

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '78%',
        maxWidth: '1000px',
        zIndex: 100,
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
      }}
      className="glass-panel"
    >
      {/* Logo */}
      <div
        onClick={() => handleNavClick('home')}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <img src="/logo.png" alt="Uniqix Logo" style={{ height: '40px', objectFit: 'contain' }} />
      </div>

      {/* Desktop Navigation */}
      <div
        style={{
          display: 'none',
          gap: '1.75rem',
          alignItems: 'center',
        }}
        className="desktop-menu"
      >
        {/* HOME */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'home' ? 'var(--primary)' : 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.5rem',
            cursor: 'pointer',
            transition: 'color 0.2s',
            letterSpacing: '0.05em'
          }}
        >
          HOME
        </button>

        {/* ABOUT US */}
        <button
          onClick={() => handleNavClick('about')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'about' ? 'var(--primary)' : 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.5rem',
            cursor: 'pointer',
            transition: 'color 0.2s',
            letterSpacing: '0.05em'
          }}
        >
          ABOUT US
        </button>

        {/* SOLUTIONS DROPDOWN */}
        <div style={{ position: 'relative' }} className="nav-dropdown-container">
          <button
            onClick={() => toggleDropdown('solutions')}
            style={{
              background: 'none',
              border: 'none',
              color: (currentPage === 'services' || currentPage === 'products') ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
              letterSpacing: '0.05em'
            }}
          >
            SOLUTIONS <ChevronDown style={{ width: '14px', height: '14px' }} />
          </button>
          {activeDropdown === 'solutions' && (
            <div className="nav-dropdown-menu">
              <button onClick={() => handleNavClick('services')}>Procurement Services</button>
              <button onClick={() => { setActiveProductTab(0); handleNavClick('products'); }}>AI Robotics</button>
              <button onClick={() => { setActiveProductTab(1); handleNavClick('products'); }}>Sustainable Packaging</button>
              <button onClick={() => { setActiveProductTab(2); handleNavClick('products'); }}>Smart Energy Solutions</button>
            </div>
          )}
        </div>

        {/* OUR DORMITORIES */}
        <button
          onClick={() => handleNavClick('dormitories')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'dormitories' ? 'var(--primary)' : 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.5rem',
            cursor: 'pointer',
            transition: 'color 0.2s',
            letterSpacing: '0.05em'
          }}
        >
          OUR DORMITORIES
        </button>

        {/* MORE DROPDOWN */}
        <div style={{ position: 'relative' }} className="nav-dropdown-container">
          <button
            onClick={() => toggleDropdown('more')}
            style={{
              background: 'none',
              border: 'none',
              color: (currentPage === 'trade' || currentPage === 'case-studies' || currentPage === 'partnership') ? 'var(--primary)' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '0.5rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
              letterSpacing: '0.05em'
            }}
          >
            MORE <ChevronDown style={{ width: '14px', height: '14px' }} />
          </button>
          {activeDropdown === 'more' && (
            <div className="nav-dropdown-menu">
              <button onClick={() => handleNavClick('trade')}>International Trade</button>
              <button onClick={() => handleNavClick('case-studies')}>Case Studies</button>
              <button onClick={() => handleNavClick('partnership')}>Partnership</button>
            </div>
          )}
        </div>

        {/* CONTACT US */}
        <button
          onClick={() => handleNavClick('contact')}
          style={{
            background: 'none',
            border: 'none',
            color: currentPage === 'contact' ? 'var(--primary)' : 'var(--text-secondary)',
            fontSize: '0.85rem',
            fontWeight: 700,
            padding: '0.5rem',
            cursor: 'pointer',
            transition: 'color 0.2s',
            letterSpacing: '0.05em'
          }}
        >
          CONTACT US
        </button>

        {/* Theme Switcher Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            marginLeft: '0.5rem'
          }}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <Moon style={{ width: '20px', height: '20px' }} /> : <Sun style={{ width: '20px', height: '20px' }} />}
        </button>
      </div>

      {/* Mobile Toggle / Menu Items */}
      <div style={{ display: 'none', alignItems: 'center', gap: '0.5rem' }} className="mobile-toggle-group">
        <button
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem',
          }}
        >
          {theme === 'light' ? <Moon style={{ width: '20px', height: '20px' }} /> : <Sun style={{ width: '20px', height: '20px' }} />}
        </button>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
          }}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '76px',
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            padding: '1.5rem',
            boxShadow: '0 15px 30px rgba(0, 0, 0, 0.05)',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}
          className="glass-panel"
        >
          <button onClick={() => handleNavClick('home')} className="mobile-nav-btn">HOME</button>
          <button onClick={() => handleNavClick('about')} className="mobile-nav-btn">ABOUT US</button>
          
          {/* SOLUTIONS */}
          <div>
            <div onClick={() => toggleDropdown('solutions')} className="mobile-nav-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>SOLUTIONS</span> <ChevronDown style={{ width: '16px', height: '16px' }} />
            </div>
            {activeDropdown === 'solutions' && (
              <div style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => handleNavClick('services')} className="mobile-sub-btn">Procurement Services</button>
                <button onClick={() => { setActiveProductTab(0); handleNavClick('products'); }} className="mobile-sub-btn">AI Robotics</button>
                <button onClick={() => { setActiveProductTab(1); handleNavClick('products'); }} className="mobile-sub-btn">Sustainable Packaging</button>
                <button onClick={() => { setActiveProductTab(2); handleNavClick('products'); }} className="mobile-sub-btn">Smart Energy Solutions</button>
              </div>
            )}
          </div>

          <button onClick={() => handleNavClick('dormitories')} className="mobile-nav-btn">OUR DORMITORIES</button>

           {/* MORE */}
          <div>
            <div onClick={() => toggleDropdown('more')} className="mobile-nav-btn" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>MORE</span> <ChevronDown style={{ width: '16px', height: '16px' }} />
            </div>
            {activeDropdown === 'more' && (
              <div style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button onClick={() => handleNavClick('trade')} className="mobile-sub-btn">International Trade</button>
                <button onClick={() => handleNavClick('case-studies')} className="mobile-sub-btn">Case Studies</button>
                <button onClick={() => handleNavClick('partnership')} className="mobile-sub-btn">Partnership</button>
              </div>
            )}
          </div>
          <button onClick={() => handleNavClick('contact')} className="mobile-nav-btn">CONTACT US</button>
        </div>
      )}

      {/* Media query CSS injection for Navbar responsiveness */}
      <style>{`
        @media (min-width: 990px) {
          .desktop-menu { display: flex !important; }
        }
        @media (max-width: 989px) {
          .mobile-toggle-group { display: flex !important; }
          nav.glass-panel {
            width: 92% !important;
            padding: 0 1.25rem !important;
            top: 0.75rem !important;
            height: 60px !important;
          }
        }
        .nav-dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-glass);
          border-radius: 12px;
          min-width: 220px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          margin-top: 10px;
        }
        .nav-dropdown-menu button {
          background: none;
          border: none;
          padding: 10px 16px;
          text-align: left;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          width: 100%;
          transition: all 0.2s;
        }
        .nav-dropdown-menu button:hover {
          background: rgba(255,255,255,0.05);
          color: var(--primary);
        }
        .mobile-nav-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          font-weight: 700;
          text-align: left;
          padding: 0.5rem 0;
          width: 100%;
          cursor: pointer;
        }
        .mobile-sub-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
          text-align: left;
          padding: 0.25rem 0;
          width: 100%;
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
