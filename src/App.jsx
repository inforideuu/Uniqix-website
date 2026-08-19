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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState('light');
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [activeTradeSector, setActiveTradeSector] = useState(null);

  useEffect(() => {
    // Set theme attribute on root html tag
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section, .container > div');
    sections.forEach((sec) => {
      sec.classList.add('reveal-section');
      observer.observe(sec);
    });

    return () => {
      sections.forEach((sec) => {
        observer.unobserve(sec);
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
        return <DormitoriesPage />;
      case 'partnership':
        return <PartnershipPage setCurrentPage={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'case-studies':
        return <CaseStudiesPage setCurrentPage={setCurrentPage} />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      {/* 3D Interactive Canvas Background */}
      <ThreeDCanvas />

      {/* Floating Header Navbar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        setActiveProductTab={setActiveProductTab}
        setActiveTradeSector={setActiveTradeSector}
      />

      {/* Core Dynamic Content Wrapper */}
      <main className="content-wrapper">
        {renderPage()}
      </main>

      {/* Corporate Footer */}
      <Footer setCurrentPage={setCurrentPage} setActiveProductTab={setActiveProductTab} />
    </div>
  );
}

export default App;
