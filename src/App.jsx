import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThreeDCanvas from './components/ThreeDCanvas';

// Pages
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import TradePage from './pages/TradePage';
import DormitoriesPage from './pages/DormitoriesPage';
import PartnershipPage from './pages/PartnershipPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import EcoPackagingPage from './pages/EcoPackagingPage';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) return hash;
    return localStorage.getItem('uniqix_current_page') || 'home';
  });

  const [theme, setTheme] = useState('light');
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [activeTradeSector, setActiveTradeSector] = useState(null);

  useEffect(() => {
    if (currentPage) {
      localStorage.setItem('uniqix_current_page', currentPage);
      if (window.location.hash.replace('#', '') !== currentPage) {
        window.location.hash = currentPage;
      }
    }
  }, [currentPage]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentPage) {
        setCurrentPage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

  useEffect(() => {
    // Set theme attribute on root html tag
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.02
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const initReveal = () => {
      const selectors = 'section, .container, .container > div, .reveal-on-scroll, [data-reveal]';
      const elements = document.querySelectorAll(selectors);
      elements.forEach((el, idx) => {
        // Skip elements that are nested inside another reveal container to avoid double transform
        if (el.parentElement && el.parentElement.classList.contains('reveal-section')) {
          return;
        }
        el.classList.add('reveal-section');
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          setTimeout(() => {
            el.classList.add('revealed');
          }, idx * 60);
        } else {
          observer.observe(el);
        }
      });
    };

    const timer = setTimeout(initReveal, 100);

    return () => {
      clearTimeout(timer);
      const elements = document.querySelectorAll('.reveal-section');
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, [currentPage]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage setCurrentPage={setCurrentPage} />;
      case 'products':
        return (
          <ProductsPage 
            setCurrentPage={setCurrentPage} 
            activeProductTab={activeProductTab} 
            setActiveProductTab={setActiveProductTab} 
          />
        );
      case 'trade':
        return (
          <TradePage 
            setCurrentPage={setCurrentPage} 
            activeTradeSector={activeTradeSector} 
            setActiveTradeSector={setActiveTradeSector} 
          />
        );
      case 'dormitories':
        return <DormitoriesPage setCurrentPage={setCurrentPage} />;
      case 'partnership':
        return <PartnershipPage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      case 'case-studies':
        return <CaseStudiesPage setCurrentPage={setCurrentPage} />;
      case 'eco-packaging':
        return <EcoPackagingPage setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="app-container">
      {/* 3D Interactive Canvas Background */}
      {!isAdminPage && <ThreeDCanvas />}

      {/* Floating Header Navbar */}
      {!isAdminPage && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          theme={theme} 
          toggleTheme={toggleTheme} 
          setActiveProductTab={setActiveProductTab}
          setActiveTradeSector={setActiveTradeSector}
        />
      )}

      {/* Core Dynamic Content Wrapper */}
      <main className={isAdminPage ? "admin-content-wrapper" : "content-wrapper"}>
        {renderPage()}
      </main>

      {/* Corporate Footer */}
      {!isAdminPage && (
        <Footer setCurrentPage={setCurrentPage} setActiveProductTab={setActiveProductTab} />
      )}
    </div>
  );
}

export default App;
