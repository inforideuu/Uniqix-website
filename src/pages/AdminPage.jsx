import React, { useState, useEffect, useRef } from 'react';
import {
  Lock, User, LogOut, Package, Building, MessageSquare, Briefcase,
  Plus, Edit, Trash2, CheckCircle, RefreshCw, FileText, X, Eye,
  Bell, Search, Layers, Cpu, Users, ChevronDown, ChevronRight
} from 'lucide-react';

import fu from '../assets/fieldunit.png';
import dash from '../assets/dashboard.png';
import school from '../assets/school.png';
import dragonflyConcept from '../assets/dragonfly_concept.jpg';
import { API_BASE_URL } from '../config';

const getTelemetryImage = (key) => {
  const map = {
    'fu': fu,
    'school': school,
    'dash': dash,
    'dragonflyConcept': dragonflyConcept
  };
  return map[key] || key;
};

const AdminPage = ({ setCurrentPage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isCardHovered, setIsCardHovered] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const prevNotificationsCount = useRef(0);

  // Navigation & Data Tabs
  const [activeTab, setActiveTab] = useState('products');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [cmsOpen, setCmsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [dormitories, setDormitories] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [partnerships, setPartnerships] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [accommodationSearches, setAccommodationSearches] = useState([]);
  const [aboutSettings, setAboutSettings] = useState({
    who_we_are_title: "",
    who_we_are_text: "",
    stat_industries: "",
    stat_partners: "",
    stat_headquarters: "",
    stat_global_network: "",
    stat_trusted_partners: "",
    stat_solutions_delivered: "",
    stat_years_excellence: "",
    vision_text: "",
    mission_text: "",
    incorporation_date: "",
    uen_number: "",
    registration_type: "",
    principal_activity: "",
  });

  // Loading States
  const [loading, setLoading] = useState(false);

  // Form/Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('product'); // product, dormitory, casestudy
  const [editId, setEditId] = useState(null); // null if adding
  const [productForm, setProductForm] = useState({ name: '', category: 'AI Robotics', description: '', price: '', image_url: '', specifications: '' });
  const [dormForm, setDormForm] = useState({ name: '', location: '', price: '', amenities: '', image_url: '', available_rooms: 1 });
  const [caseForm, setCaseForm] = useState({
    title: '',
    client: '',
    description: '',
    results: '',
    image_url: '',
    badge: '',
    caseNum: '',
    subtitle: '',
    result: '',
    metricsTitle: '',
    quote: '',
    author: '',
    zones: [
      { title: '', desc: '', color: '#10b981' },
      { title: '', desc: '', color: '#3b82f6' },
      { title: '', desc: '', color: '#f59e0b' }
    ],
    metrics: [
      { val: '', label: '' },
      { val: '', label: '' },
      { val: '', label: '' }
    ],
    outcomes: ['', '', '', '']
  });

  const [homeSettings, setHomeSettings] = useState({
    intro_title: "",
    intro_text_1: "",
    intro_text_2: "",
    stat1_target: "",
    stat1_label: "",
    stat2_target: "",
    stat2_label: "",
    stat3_target: "",
    stat3_label: "",
    stat4_target: "",
    stat4_label: "",
  });
  const [adminTestimonials, setAdminTestimonials] = useState([]);
  const [adminTelemetry, setAdminTelemetry] = useState([]);
  const [adminServices, setAdminServices] = useState([]);

  // Forms for the new CRUD items
  const [testimonialForm, setTestimonialForm] = useState({ quote: '', name: '', role: '', initials: 'CS', color: 'var(--primary)' });
  const [telemetryForm, setTelemetryForm] = useState({ image_url: '', caption: '' });
  const [serviceForm, setServiceForm] = useState({ num: '', title: '', desc: '', bullets: ['', '', '', ''], action: '', actionText: '', themeColor: '', badgeBg: '' });

  // Detail Modal for viewing inquiries/partnerships
  const [viewDetailItem, setViewDetailItem] = useState(null);

  // Check login on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('uniqix_admin_token');
    const savedUser = localStorage.getItem('uniqix_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUsername(savedUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch data when logged in or tab changes
  useEffect(() => {
    if (isLoggedIn) {
      fetchTabData();
    }
  }, [activeTab, isLoggedIn]);

  useEffect(() => {
    if (['services', 'home', 'about us', 'casestudies', 'testimonials'].includes(activeTab)) {
      setCmsOpen(true);
    }
  }, [activeTab]);

  const audioCtxRef = useRef(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };
    window.addEventListener('click', handleUserInteraction, { once: true });
    return () => window.removeEventListener('click', handleUserInteraction);
  }, []);

  const playNotificationSound = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.2);

      setTimeout(() => {
        if (!ctx) return;
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(880, ctx.currentTime);
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.25);
      }, 120);
    } catch (e) {
      console.error("Audio Context failed", e);
    }
  };

  const fetchNotifications = async () => {
    if (!token) return;
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/notifications/`, { headers });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
        const unreadCount = data.filter(n => !n.is_read).length;
        if (unreadCount > prevNotificationsCount.current) {
          playNotificationSound();
        }
        prevNotificationsCount.current = unreadCount;
      }
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn && token) {
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 6000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn, token]);

  const handleMarkNotificationsRead = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await fetch(`${API_BASE_URL}/api/admin/notifications/`, {
        method: 'PATCH',
        headers
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearAllNotifications = async () => {
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await fetch(`${API_BASE_URL}/api/admin/notifications/`, {
        method: 'DELETE',
        headers
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveNotification = async (e, id) => {
    e.stopPropagation();
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      await fetch(`${API_BASE_URL}/api/admin/notifications/${id}/`, {
        method: 'DELETE',
        headers
      });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSearch = async (id) => {
    if (!window.confirm("Are you sure you want to delete this search query log?")) return;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/accommodation-searches/${id}/`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        fetchTabData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveAboutSettings = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/about-settings/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(aboutSettings)
      });
      if (res.ok) {
        alert("About Us settings updated successfully!");
        fetchTabData();
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting the server.");
    }
  };

  const handleSaveHomeSettings = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/home-settings/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(homeSettings)
      });
      if (res.ok) {
        alert("Home Page settings updated successfully!");
        fetchTabData();
      } else {
        alert("Failed to save settings.");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting the server.");
    }
  };

  const fetchTabData = async () => {
    setLoading(true);
    const headers = { 'Authorization': `Bearer ${token}` };
    try {
      if (activeTab === 'products' || activeTab === 'industrial_supply' || activeTab === 'eco_food_service') {
        const res = await fetch(`${API_BASE_URL}/api/products/`);
        const data = await res.json();
        setProducts(data);
      } else if (activeTab === 'dormitories') {
        const res = await fetch(`${API_BASE_URL}/api/dormitories/`);
        const data = await res.json();
        setDormitories(data);
      } else if (activeTab === 'inquiries') {
        const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/`, { headers });
        const data = await res.json();
        setInquiries(data);
      } else if (activeTab === 'partnerships') {
        const res = await fetch(`${API_BASE_URL}/api/admin/partnerships/`, { headers });
        const data = await res.json();
        setPartnerships(data);
      } else if (activeTab === 'casestudies') {
        const res = await fetch(`${API_BASE_URL}/api/case-studies/`);
        const data = await res.json();
        setCaseStudies(data);
      } else if (activeTab === 'searches') {
        const res = await fetch(`${API_BASE_URL}/api/admin/accommodation-searches/`, { headers });
        const data = await res.json();
        setAccommodationSearches(data);
      } else if (activeTab === 'about us') {
        const res = await fetch(`${API_BASE_URL}/api/about-settings/`);
        const data = await res.json();
        setAboutSettings(data);
      } else if (activeTab === 'home') {
        const res = await fetch(`${API_BASE_URL}/api/home-settings/`);
        const data = await res.json();
        if (data.settings) setHomeSettings(data.settings);
      } else if (activeTab === 'testimonials') {
        const res = await fetch(`${API_BASE_URL}/api/home-settings/`);
        const data = await res.json();
        if (data.testimonials) setAdminTestimonials(data.testimonials);
      } else if (activeTab === 'services') {
        const resServices = await fetch(`${API_BASE_URL}/api/services/`);
        const dataServices = await resServices.json();
        setAdminServices(dataServices);

        const resTelemetry = await fetch(`${API_BASE_URL}/api/telemetry/`);
        const dataTelemetry = await resTelemetry.json();
        setAdminTelemetry(dataTelemetry);
      }
    } catch (err) {
      console.error("Error fetching admin tab data: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('uniqix_admin_token', data.token);
        localStorage.setItem('uniqix_admin_user', data.username);
        setToken(data.token);
        setUsername(data.username);
        setIsLoggedIn(true);
      } else {
        setLoginError(data.error || 'Invalid login details.');
      }
    } catch (err) {
      setLoginError('Failed to connect to backend.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uniqix_admin_token');
    localStorage.removeItem('uniqix_admin_user');
    setToken('');
    setUsername('');
    setIsLoggedIn(false);
  };

  // Delete Handlers
  const handleDelete = async (id, type) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    try {
      let endpoint = '';
      if (type === 'product') endpoint = `products/${id}/`;
      else if (type === 'dormitory') endpoint = `dormitories/${id}/`;
      else if (type === 'inquiry') endpoint = `inquiries/${id}/`;
      else if (type === 'partnership') endpoint = `partnerships/${id}/`;
      else if (type === 'casestudy') endpoint = `case-studies/${id}/`;
      else if (type === 'testimonial') endpoint = `testimonials/${id}/`;
      else if (type === 'telemetry') endpoint = `telemetry/${id}/`;
      else if (type === 'service') endpoint = `services/${id}/`;

      const res = await fetch(`${API_BASE_URL}/api/admin/${endpoint}`, {
        method: 'DELETE',
        headers
      });
      if (res.ok) {
        fetchTabData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Inquiry Status Change Handler
  const handleInquiryStatus = async (id, status) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${id}/`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        fetchTabData();
        if (viewDetailItem && viewDetailItem.id === id) {
          setViewDetailItem(prev => ({ ...prev, status }));
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Form Submissions
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    let endpoint = '';
    let method = editId ? 'PUT' : 'POST';
    let body = {};

    if (modalType === 'product') {
      endpoint = editId ? `products/${editId}/` : 'products/';
      body = productForm;
    } else if (modalType === 'dormitory') {
      endpoint = editId ? `dormitories/${editId}/` : 'dormitories/';
      body = dormForm;
    } else if (modalType === 'casestudy') {
      endpoint = editId ? `case-studies/${editId}/` : 'case-studies/';
      body = caseForm;
    } else if (modalType === 'testimonial') {
      endpoint = editId ? `testimonials/${editId}/` : 'testimonials/';
      body = testimonialForm;
    } else if (modalType === 'telemetry') {
      endpoint = editId ? `telemetry/${editId}/` : 'telemetry/';
      body = telemetryForm;
    } else if (modalType === 'service') {
      endpoint = editId ? `services/${editId}/` : 'services/';
      body = serviceForm;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setShowModal(false);
        fetchTabData();
      } else {
        const errorData = await res.json().catch(() => ({}));
        alert(`Failed to submit form: ${errorData.error || res.statusText || 'Server Error'}`);
      }
    } catch (err) {
      console.error(err);
      alert(`Network error: ${err.message}`);
    }
  };

  const openAddModal = (type) => {
    setModalType(type);
    setEditId(null);
    if (type === 'product') {
      setProductForm({ name: '', category: 'Industrial Supply Catalog', description: '', price: '', image_url: '', specifications: '' });
    }
    if (type === 'dormitory') setDormForm({ name: '', location: '', price: '', amenities: '', image_url: '', available_rooms: 1 });
    if (type === 'testimonial') setTestimonialForm({ quote: '', name: '', role: '', initials: 'CS', color: 'var(--primary)' });
    if (type === 'telemetry') setTelemetryForm({ image_url: '', caption: '' });
    if (type === 'service') setServiceForm({ num: '', title: '', desc: '', bullets: ['', '', '', ''], action: 'dormitories', actionText: 'Search Accommodation Hub', themeColor: '#D4A72C', badgeBg: 'rgba(197, 160, 89, 0.1)' });
    if (type === 'casestudy') {
      setCaseForm({
        title: '',
        client: '',
        description: '',
        results: '',
        image_url: '',
        badge: '',
        caseNum: '',
        subtitle: '',
        result: '',
        metricsTitle: '',
        quote: '',
        author: '',
        zones: [
          { title: '', desc: '', color: '#10b981' },
          { title: '', desc: '', color: '#3b82f6' },
          { title: '', desc: '', color: '#f59e0b' }
        ],
        metrics: [
          { val: '', label: '' },
          { val: '', label: '' },
          { val: '', label: '' }
        ],
        outcomes: ['', '', '', '']
      });
    }
    setShowModal(true);
  };

  const openEditModal = (item, type) => {
    setModalType(type);
    setEditId(item.id);
    if (type === 'product') setProductForm({ name: item.name, category: item.category, description: item.description, price: item.price, image_url: item.image_url, specifications: item.specifications });
    if (type === 'dormitory') setDormForm({ name: item.name, location: item.location, price: item.price, amenities: item.amenities, image_url: item.image_url, available_rooms: item.available_rooms });
    if (type === 'testimonial') setTestimonialForm({ quote: item.quote, name: item.name, role: item.role, initials: item.initials || 'CS', color: item.color || 'var(--primary)' });
    if (type === 'telemetry') setTelemetryForm({ image_url: item.image_url, caption: item.caption });
    if (type === 'service') setServiceForm({ num: item.num, title: item.title, desc: item.desc, bullets: item.bullets || ['', '', '', ''], action: item.action || 'dormitories', actionText: item.actionText || 'Search Accommodation Hub', themeColor: item.themeColor || '#D4A72C', badgeBg: item.badgeBg || 'rgba(197, 160, 89, 0.1)' });
    if (type === 'casestudy') {
      setCaseForm({
        title: item.title || '',
        client: item.client || '',
        description: item.description || '',
        results: item.results || '',
        image_url: item.image_url || '',
        badge: item.badge || '',
        caseNum: item.caseNum || '',
        subtitle: item.subtitle || '',
        result: item.result || '',
        metricsTitle: item.metricsTitle || '',
        quote: item.quote || '',
        author: item.author || '',
        zones: item.zones && item.zones.length > 0 ? item.zones : [
          { title: '', desc: '', color: '#10b981' },
          { title: '', desc: '', color: '#3b82f6' },
          { title: '', desc: '', color: '#f59e0b' }
        ],
        metrics: item.metrics && item.metrics.length > 0 ? item.metrics : [
          { val: '', label: '' },
          { val: '', label: '' },
          { val: '', label: '' }
        ],
        outcomes: item.outcomes && item.outcomes.length > 0 ? item.outcomes : ['', '', '', '']
      });
    }
    setShowModal(true);
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100vw',
        padding: '2rem',
        background: "url('/adminbg.png')",
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: 'border-box'
      }}>
        <div
          className="glass-panel"
          style={{
            width: '100%',
            maxWidth: '420px',
            padding: '3rem 2.5rem',
            borderRadius: '1.5rem',
            border: '1px solid #D4A72C',
            transform: 'scale(1.03) translateY(-4px)',
            boxShadow: '0 25px 50px rgba(197, 160, 89, 0.35), 0 0 30px rgba(197, 160, 89, 0.15)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              display: 'inline-flex',
              background: 'rgba(197, 160, 89, 0.15)',
              padding: '15px',
              borderRadius: '50%',
              marginBottom: '1rem',
              color: '#D4A72C',
              transition: 'all 0.3s'
            }}>
              <Lock size={32} />
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Admin Portal</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Secure administrative dashboard for Uniqix</p>
          </div>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {loginError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '10px 15px', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                {loginError}
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  required
                  placeholder="Enter username"
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  required
                  placeholder="Enter password"
                  style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '0.5rem', fontWeight: 700 }}>
              Access Dashboard
            </button>

            <button
              type="button"
              onClick={() => {
                if (setCurrentPage) {
                  setCurrentPage('home');
                } else {
                  window.location.hash = 'home';
                }
              }}
              style={{
                width: '100%',
                padding: '12px',
                marginTop: '0.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-glass-hover)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              ← Back to Home Page
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* 1. Permanent Left Sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: '260px',
        background: 'var(--footer-bg)',
        borderRight: '1px solid var(--border-glass)',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100,
        boxShadow: '4px 0 25px rgba(0,0,0,0.15)',
        overflowY: 'auto',
        maxHeight: '100vh'
      }}>
        <div>
          {/* Logo Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2.5rem', padding: '0 0.5rem' }}>
            <div style={{ background: 'var(--primary)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 900, fontSize: '1.25rem' }}>
              U
            </div>
            <div>
              <div style={{ fontWeight: 900, letterSpacing: '0.05em', color: '#ffffff', fontSize: '1.1rem' }}>UNIQIX</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.1em' }}>ADMIN CONSOLE</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {/* Standard non-CMS tabs */}
            {[
              { id: 'products', label: 'Product Management', icon: <Package size={18} /> },
              { id: 'dormitories', label: 'Dormitories Management', icon: <Building size={18} /> },
              { id: 'inquiries', label: 'Contact Inquiries', icon: <MessageSquare size={18} /> },
              { id: 'partnerships', label: 'Partnership Requests', icon: <Briefcase size={18} /> },
              { id: 'searches', label: 'Accommodation Searches', icon: <Search size={18} /> },
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.25s'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'var(--primary-glow)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  {tab.icon}
                  <span style={{ fontSize: '0.9rem' }}>{tab.label}</span>
                </button>
              );
            })}

            {/* CMS Category Accordion Dropdown */}
            <div>
              <button
                onClick={() => setCmsOpen(prev => !prev)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  color: ['services', 'home', 'about us', 'casestudies', 'testimonials'].includes(activeTab) ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.25s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--primary-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <FileText size={18} />
                  <span style={{ fontSize: '0.9rem' }}>CMS Settings</span>
                </div>
                {cmsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {cmsOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', paddingLeft: '20px', marginTop: '4px' }}>
                  {[
                    { id: 'home', label: 'Home Page CMS', icon: <FileText size={16} /> },
                    { id: 'about us', label: 'About Us CMS', icon: <FileText size={16} /> },
                    { id: 'casestudies', label: 'Case Studies CMS', icon: <FileText size={16} /> },
                    { id: 'services', label: 'Services CMS', icon: <Briefcase size={16} /> },
                    { id: 'testimonials', label: 'Testimonials CMS', icon: <Users size={16} /> },
                  ].map(tab => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: '6px',
                          border: 'none',
                          background: isActive ? 'var(--primary)' : 'transparent',
                          color: isActive ? '#ffffff' : 'var(--text-secondary)',
                          fontWeight: 600,
                          textAlign: 'left',
                          cursor: 'pointer',
                          transition: 'all 0.25s'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'var(--primary-glow)';
                            e.currentTarget.style.color = '#ffffff';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }
                        }}
                      >
                        {tab.icon}
                        <span style={{ fontSize: '0.85rem' }}>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Profile / Logout Footer */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 0.5rem' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <User size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Administrator</div>
              <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>{username}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: '0.85rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}
          >
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      {/* 2. Main Scrollable Content Area */}
      <main style={{
        marginLeft: '260px',
        flex: 1,
        padding: '3rem 4rem',
        minHeight: '100vh',
        background: 'var(--bg-secondary)',
        boxSizing: 'border-box',
        overflowY: 'auto'
      }}>

        {/* Top Header Card */}
        <div className="glass-panel" style={{
          padding: '2rem 2.5rem',
          borderRadius: '1.25rem',
          border: '1px solid var(--border-glass)',
          marginBottom: '2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1000
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>SYSTEM CONTROL</span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, margin: '0.25rem 0 0 0', textTransform: 'capitalize' }}>
              {activeTab === 'casestudies' ? 'Case Studies CMS' : activeTab === 'searches' ? 'Accommodation Searches' : `${activeTab} Management`}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            {/* Bell Icon Notification Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  handleMarkNotificationsRead();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  borderRadius: '50%',
                  position: 'relative',
                  background: showNotifDropdown ? 'var(--primary-glow)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-glass)',
                  color: showNotifDropdown ? 'var(--primary)' : 'var(--text-primary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
              >
                <Bell size={20} />
                {notifications.filter(n => !n.is_read).length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    background: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
                  }}>
                    {notifications.filter(n => !n.is_read).length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Card */}
              {showNotifDropdown && (
                <div className="glass-panel" style={{
                  position: 'absolute',
                  right: 0,
                  top: '55px',
                  width: '320px',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-glass)',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(25px)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
                  padding: '1.25rem',
                  zIndex: 9999,
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
                    <h4 style={{ margin: 0, fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Notifications</h4>
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearAllNotifications}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#ef4444',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {notifications.map(n => (
                      <div
                        key={n.id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          background: 'rgba(255, 255, 255, 0.03)',
                          padding: '10px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-glass)',
                          fontSize: '0.82rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ flex: 1, paddingRight: '8px', lineHeight: '1.4', textAlign: 'left' }}>
                          <div style={{ color: 'var(--text-primary)', fontWeight: n.is_read ? 500 : 700 }}>
                            {n.message}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleRemoveNotification(e, n.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--text-muted)',
                            cursor: 'pointer',
                            padding: '2px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                          title="Remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div style={{ textAlign: 'center', padding: '1.5rem 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        No notifications.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Context Action Button */}
            {['products', 'industrial_supply', 'eco_food_service', 'dormitories', 'casestudies', 'testimonials'].includes(activeTab) && (
              <button
                onClick={() => {
                  let type = '';
                  if (activeTab === 'products' || activeTab === 'industrial_supply' || activeTab === 'eco_food_service') type = 'product';
                  else if (activeTab === 'dormitories') type = 'dormitory';
                  else if (activeTab === 'casestudies') type = 'casestudy';
                  else if (activeTab === 'testimonials') type = 'testimonial';
                  openAddModal(type);
                }}
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem', fontWeight: 700 }}
              >
                <Plus size={16} /> Add {activeTab === 'casestudies' ? 'Case Study' : activeTab === 'dormitories' ? 'Dormitory Gallery Item' : activeTab === 'testimonials' ? 'Testimonial' : (activeTab === 'products' || activeTab === 'industrial_supply' || activeTab === 'eco_food_service') ? 'Product' : activeTab.slice(0, -1)}
              </button>
            )}

            {['inquiries', 'partnerships', 'searches'].includes(activeTab) && (
              <button
                onClick={fetchTabData}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '0.9rem', fontWeight: 700 }}
              >
                <RefreshCw size={14} /> Refresh Logs
              </button>
            )}
          </div>
        </div>

        {/* Content Box */}
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '1.25rem', border: '1px solid var(--border-glass)' }}>

          {/* Products Sourcing Tab */}
          {activeTab === 'products' && (
            <div>
              {/* Sub tabs for Product Categories */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
                {['All', 'Industrial Supply Catalog', 'Eco Food Service Packaging'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    style={{
                      background: productCategoryFilter === cat ? 'var(--primary-glow)' : 'transparent',
                      border: 'none',
                      color: productCategoryFilter === cat ? 'var(--primary)' : 'var(--text-secondary)',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: '0.88rem'
                    }}
                  >
                    {cat === 'All' ? 'All Sectors' : cat}
                  </button>
                ))}
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Product Name</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Category</th>
                      {/* <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Pricing Rate</th> */}
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products
                      .filter(p => {
                        if (productCategoryFilter !== 'All') return p.category === productCategoryFilter;
                        return true;
                      })
                      .map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '380px', marginTop: '4px' }}>{p.description}</div>
                          </td>
                          <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>{p.category}</td>
                          {/* <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>{p.price}</td> */}
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button onClick={() => openEditModal(p, 'product')} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit"><Edit size={14} /></button>
                              <button onClick={() => handleDelete(p.id, 'product')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    {products.filter(p => {
                      if (productCategoryFilter !== 'All') return p.category === productCategoryFilter;
                      return true;
                    }).length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No products in active catalog database.</td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dormitories Tab - Dormitory Gallery CRUD Manager */}
          {activeTab === 'dormitories' && (
            <div>
              <div style={{ marginBottom: '1.5rem', padding: '1.25rem 1.5rem', borderRadius: '1rem', background: 'var(--primary-glow)', border: '1px solid rgba(197, 160, 89, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    Dormitory Gallery Manager
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Create, update, or remove showcase images, accommodation titles, location sectors, rates, and available bed capacities displayed in the public Dormitory Gallery.
                  </p>
                </div>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Gallery Preview</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Lodge Title</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Location Sector</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Monthly Rate</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Available Capacity</th>
                      <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dormitories.map(d => (
                      <tr key={d.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <img
                            src={d.image_url || 'https://images.unsplash.com/photo-1555637138-afc824873004?auto=format&fit=crop&w=800&q=80'}
                            alt={d.name}
                            style={{ width: '80px', height: '54px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--border-glass)' }}
                          />
                        </td>
                        <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem' }}>{d.name}</td>
                        <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{d.location}</td>
                        <td style={{ padding: '16px', color: '#D4A72C', fontWeight: 800 }}>{d.price}</td>
                        <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                          <span style={{ padding: '4px 10px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
                            {d.available_rooms} Beds Available
                          </span>
                        </td>
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <button onClick={() => openEditModal(d, 'dormitory')} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit Gallery Item"><Edit size={14} /></button>
                            <button onClick={() => handleDelete(d.id, 'dormitory')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete Gallery Item"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {dormitories.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No Dormitory Gallery items registered in database. Click "Add Dormitory Gallery Item" to create your first entry.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Sender Details</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Subject Area</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Status Tag</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map(i => (
                    <tr key={i.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{i.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{i.email}</div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>{i.subject}</td>
                      <td style={{ padding: '16px' }}>
                        <select
                          value={i.status}
                          onChange={(e) => handleInquiryStatus(i.id, e.target.value)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-glass)',
                            background: i.status === 'Resolved' ? 'rgba(16, 185, 129, 0.12)' : i.status === 'In Progress' ? 'rgba(59, 130, 246, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                            color: i.status === 'Resolved' ? '#10b981' : i.status === 'In Progress' ? '#3b82f6' : '#ef4444',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => setViewDetailItem({ ...i, type: 'inquiry' })} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Eye size={14} /></button>
                          <button onClick={() => handleDelete(i.id, 'inquiry')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No inquiries logged in system.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Partnerships Tab */}
          {activeTab === 'partnerships' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Company Entity</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Contact Representative</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Focus Sourcing Sector</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerships.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{p.company_name}</td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{p.contact_name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{p.email} | {p.phone}</div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 600 }}>{p.interest_area}</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => setViewDetailItem({ ...p, type: 'partnership' })} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Eye size={14} /></button>
                          <button onClick={() => handleDelete(p.id, 'partnership')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {partnerships.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No partnership applications received.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Case Studies Tab */}
          {activeTab === 'casestudies' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Study Project &amp; Client</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Key Results / Success Metrics</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {caseStudies.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Client: {c.client}</div>
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-primary)' }}>
                        <div style={{ fontWeight: 600 }}>{c.result}</div>
                        {c.metrics && c.metrics.length > 0 && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700, marginTop: '4px' }}>
                            Metrics: {c.metrics.map(m => `${m.val} ${m.label}`).join(' | ')}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => openEditModal(c, 'casestudy')} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Edit size={14} /></button>
                          <button onClick={() => handleDelete(c.id, 'casestudy')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {caseStudies.length === 0 && (
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No CMS case study items cataloged.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Accommodation Searches Tab */}
          {activeTab === 'searches' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Requested Location</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Move-in Date</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Capacity / Workers</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Accommodation Type</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {accommodationSearches.map(q => (
                    <tr key={q.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {q.location || 'Any Location'}
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-primary)' }}>
                        {q.move_in_date || 'N/A'}
                      </td>
                      <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 700 }}>
                        {q.workers} workers
                      </td>
                      <td style={{ padding: '16px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        {q.accommodation_type}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <button onClick={() => handleDeleteSearch(q.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }} title="Delete"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                  {accommodationSearches.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No search query entries logged in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* About Us CMS Tab */}
          {activeTab === 'about us' && (
            <form onSubmit={handleSaveAboutSettings} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* 1. Who We Are Section */}
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>1. WHO WE ARE Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Section Title</label>
                    <input
                      type="text"
                      value={aboutSettings.who_we_are_title}
                      onChange={e => setAboutSettings(prev => ({ ...prev, who_we_are_title: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Section Description Text</label>
                    <textarea
                      rows="3"
                      value={aboutSettings.who_we_are_text}
                      onChange={e => setAboutSettings(prev => ({ ...prev, who_we_are_text: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    ></textarea>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Stat: Industries</label>
                      <input
                        type="text"
                        value={aboutSettings.stat_industries}
                        onChange={e => setAboutSettings(prev => ({ ...prev, stat_industries: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Stat: Global Partners</label>
                      <input
                        type="text"
                        value={aboutSettings.stat_partners}
                        onChange={e => setAboutSettings(prev => ({ ...prev, stat_partners: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Stat: Headquartered</label>
                      <input
                        type="text"
                        value={aboutSettings.stat_headquarters}
                        onChange={e => setAboutSettings(prev => ({ ...prev, stat_headquarters: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Stats Bar Section */}
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>2. ALL STATS Section</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Global Network</label>
                    <input
                      type="text"
                      value={aboutSettings.stat_global_network}
                      onChange={e => setAboutSettings(prev => ({ ...prev, stat_global_network: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Trusted Partners</label>
                    <input
                      type="text"
                      value={aboutSettings.stat_trusted_partners}
                      onChange={e => setAboutSettings(prev => ({ ...prev, stat_trusted_partners: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Solutions Delivered</label>
                    <input
                      type="text"
                      value={aboutSettings.stat_solutions_delivered}
                      onChange={e => setAboutSettings(prev => ({ ...prev, stat_solutions_delivered: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Years of Excellence</label>
                    <input
                      type="text"
                      value={aboutSettings.stat_years_excellence}
                      onChange={e => setAboutSettings(prev => ({ ...prev, stat_years_excellence: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                </div>
              </div>

              {/* 3. Vision & Mission Section */}
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>3. VISION & MISSION Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Our Vision Text</label>
                    <textarea
                      rows="2"
                      value={aboutSettings.vision_text}
                      onChange={e => setAboutSettings(prev => ({ ...prev, vision_text: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    ></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Our Mission Text</label>
                    <textarea
                      rows="2"
                      value={aboutSettings.mission_text}
                      onChange={e => setAboutSettings(prev => ({ ...prev, mission_text: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 4. Corporate History Section */}
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>4. CORPORATE HISTORY / Company Profile Section</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Incorporation Details</label>
                      <input
                        type="text"
                        value={aboutSettings.incorporation_date}
                        onChange={e => setAboutSettings(prev => ({ ...prev, incorporation_date: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Unique Entity Number (UEN)</label>
                      <input
                        type="text"
                        value={aboutSettings.uen_number}
                        onChange={e => setAboutSettings(prev => ({ ...prev, uen_number: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Company Type</label>
                      <input
                        type="text"
                        value={aboutSettings.registration_type}
                        onChange={e => setAboutSettings(prev => ({ ...prev, registration_type: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Principal Activity</label>
                      <input
                        type="text"
                        value={aboutSettings.principal_activity}
                        onChange={e => setAboutSettings(prev => ({ ...prev, principal_activity: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px', fontWeight: 700, fontSize: '0.95rem' }}>
                  Save All Settings
                </button>
              </div>
            </form>
          )}

          {/* Home Page CMS Tab */}
          {activeTab === 'home' && (
            <form onSubmit={handleSaveHomeSettings} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

              {/* 1. Introduction Section */}
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>1. COMPANY INTRODUCTION SECTION</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Introduction Title</label>
                    <input
                      type="text"
                      value={homeSettings.intro_title}
                      onChange={e => setHomeSettings(prev => ({ ...prev, intro_title: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Intro Paragraph 1</label>
                    <textarea
                      rows="3"
                      value={homeSettings.intro_text_1}
                      onChange={e => setHomeSettings(prev => ({ ...prev, intro_text_1: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    ></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Intro Paragraph 2</label>
                    <textarea
                      rows="3"
                      value={homeSettings.intro_text_2}
                      onChange={e => setHomeSettings(prev => ({ ...prev, intro_text_2: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* 2. Statistics Section */}
              <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--primary)' }}>2. STATISTICS SECTION (4 Stats)</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ padding: '1rem', border: '1px solid var(--border-glass)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Stat 1</h4>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target value (e.g. $580M+)</label>
                    <input type="text" value={homeSettings.stat1_target} onChange={e => setHomeSettings(prev => ({ ...prev, stat1_target: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.75rem' }} />
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Label description (e.g. Commodities Traded)</label>
                    <input type="text" value={homeSettings.stat1_label} onChange={e => setHomeSettings(prev => ({ ...prev, stat1_label: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ padding: '1rem', border: '1px solid var(--border-glass)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Stat 2</h4>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target value (e.g. 40+)</label>
                    <input type="text" value={homeSettings.stat2_target} onChange={e => setHomeSettings(prev => ({ ...prev, stat2_target: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.75rem' }} />
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Label description (e.g. Dormitory Hubs)</label>
                    <input type="text" value={homeSettings.stat2_label} onChange={e => setHomeSettings(prev => ({ ...prev, stat2_label: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ padding: '1rem', border: '1px solid var(--border-glass)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Stat 3</h4>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target value (e.g. 100%)</label>
                    <input type="text" value={homeSettings.stat3_target} onChange={e => setHomeSettings(prev => ({ ...prev, stat3_target: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.75rem' }} />
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Label description (e.g. Assay Traceability)</label>
                    <input type="text" value={homeSettings.stat3_label} onChange={e => setHomeSettings(prev => ({ ...prev, stat3_label: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ padding: '1rem', border: '1px solid var(--border-glass)', borderRadius: '8px' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem' }}>Stat 4</h4>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target value (e.g. 80k+)</label>
                    <input type="text" value={homeSettings.stat4_target} onChange={e => setHomeSettings(prev => ({ ...prev, stat4_target: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', marginBottom: '0.75rem' }} />
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Label description (e.g. Workers Housed)</label>
                    <input type="text" value={homeSettings.stat4_label} onChange={e => setHomeSettings(prev => ({ ...prev, stat4_label: e.target.value }))} required style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px', fontWeight: 700, fontSize: '0.95rem' }}>
                  Save Home Settings
                </button>
              </div>
            </form>
          )}

          {/* Testimonials CMS Tab */}
          {activeTab === 'testimonials' && (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Author</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Role</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Quote</th>
                    <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminTestimonials.map(t => (
                    <tr key={t.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                      <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>{t.name}</td>
                      <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 600 }}>{t.role}</td>
                      <td style={{ padding: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>"{t.quote}"</td>
                      <td style={{ padding: '16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button onClick={() => openEditModal(t, 'testimonial')} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit"><Edit size={14} /></button>
                          <button onClick={() => handleDelete(t.id, 'testimonial')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {adminTestimonials.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No testimonials in database.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Services & Telemetry CMS Tab */}
          {activeTab === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {/* 1. Services Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Services Config</h3>
                  <button
                    onClick={() => openAddModal('service')}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    <Plus size={14} /> Add Service
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Num</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Title</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Action Button</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminServices.map(s => (
                        <tr key={s.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                          <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>{s.num}</td>
                          <td style={{ padding: '16px' }}>
                            <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.desc}</div>
                          </td>
                          <td style={{ padding: '16px', color: 'var(--primary)', fontWeight: 600 }}>{s.actionText} ({s.action})</td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button onClick={() => openEditModal(s, 'service')} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit"><Edit size={14} /></button>
                              <button onClick={() => handleDelete(s.id, 'service')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {adminServices.length === 0 && (
                        <tr>
                          <td colSpan="4" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No services configured.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 2. Deployments & Telemetry Section */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', margin: 0 }}>Deployments & Telemetry Config</h3>
                  <button
                    onClick={() => openAddModal('telemetry')}
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', fontSize: '0.85rem', fontWeight: 700 }}
                  >
                    <Plus size={14} /> Add Telemetry Item
                  </button>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-glass)' }}>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Caption</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700 }}>Image Preview</th>
                        <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adminTelemetry.map(dt => (
                        <tr key={dt.id} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                          <td style={{ padding: '16px', color: 'var(--text-primary)', fontWeight: 700 }}>{dt.caption}</td>
                          <td style={{ padding: '16px' }}>
                            <img src={getTelemetryImage(dt.image_url)} alt="Telemetry Preview" style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-glass)' }} />
                          </td>
                          <td style={{ padding: '16px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button onClick={() => openEditModal(dt, 'telemetry')} style={{ background: 'var(--primary-glow)', border: 'none', color: 'var(--primary)', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit"><Edit size={14} /></button>
                              <button onClick={() => handleDelete(dt.id, 'telemetry')} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', color: '#ef4444', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {adminTelemetry.length === 0 && (
                        <tr>
                          <td colSpan="3" style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>No telemetry items configured.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* CRUD Form Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '2.5rem', borderRadius: '1.25rem', border: '1px solid var(--border-glass)', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>{editId ? 'Edit' : 'Add New'} {modalType}</h3>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Product Form */}
              {modalType === 'product' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Product Name</label>
                    <input type="text" value={productForm.name} onChange={e => setProductForm(prev => ({ ...prev, name: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                    <select value={productForm.category} onChange={e => setProductForm(prev => ({ ...prev, category: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}>
                      <option value="Industrial Supply Catalog">Industrial Supply Catalog</option>
                      <option value="Eco Food Service Packaging">Eco Food Service Packaging</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Price (or range)</label>
                    <input type="text" value={productForm.price} onChange={e => setProductForm(prev => ({ ...prev, price: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Product Image</label>
                    {productForm.image_url && (
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.75rem' }}>
                        <img 
                          src={productForm.image_url} 
                          alt="Product Preview" 
                          style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)', display: 'block' }} 
                        />
                        <button
                          type="button"
                          onClick={() => setProductForm(prev => ({ ...prev, image_url: '' }))}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ef4444',
                            color: '#ffffff',
                            border: '2px solid #020b1e',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                            zIndex: 10
                          }}
                          title="Remove Image"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProductForm(prev => ({ ...prev, image_url: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                    <textarea rows="3" value={productForm.description} onChange={e => setProductForm(prev => ({ ...prev, description: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Specifications</label>
                    <textarea rows="2" value={productForm.specifications} onChange={e => setProductForm(prev => ({ ...prev, specifications: e.target.value }))} placeholder="Key specs separated by pipeline (|)" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}></textarea>
                  </div>
                </>
              )}

              {/* Dormitory Form */}
              {modalType === 'dormitory' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Lodge Name</label>
                    <input type="text" value={dormForm.name} onChange={e => setDormForm(prev => ({ ...prev, name: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Location</label>
                    <input type="text" value={dormForm.location} onChange={e => setDormForm(prev => ({ ...prev, location: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Rent (e.g. $250/mo)</label>
                    <input type="text" value={dormForm.price} onChange={e => setDormForm(prev => ({ ...prev, price: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Amenities (comma separated)</label>
                    <input type="text" value={dormForm.amenities} onChange={e => setDormForm(prev => ({ ...prev, amenities: e.target.value }))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Dormitory Image</label>
                    {dormForm.image_url && (
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
                        <img
                          src={dormForm.image_url}
                          alt="Dormitory Preview"
                          style={{ maxWidth: '100%', maxHeight: '120px', borderRadius: '8px', border: '1px solid var(--border-glass)', display: 'block' }}
                        />
                        <button
                          type="button"
                          onClick={() => setDormForm(prev => ({ ...prev, image_url: '' }))}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ef4444',
                            color: '#ffffff',
                            border: '2px solid #020b1e',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                            zIndex: 10
                          }}
                          title="Remove Image"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setDormForm(prev => ({ ...prev, image_url: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Available Rooms</label>
                    <input type="number" value={dormForm.available_rooms || ''} onChange={e => setDormForm(prev => ({ ...prev, available_rooms: e.target.value === '' ? '' : (parseInt(e.target.value) || 1) }))} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                </>
              )}

              {/* Case Study Form */}
              {modalType === 'casestudy' && (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Case Title</label>
                      <input type="text" value={caseForm.title} onChange={e => setCaseForm(prev => ({ ...prev, title: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Case Number (e.g. CASE STUDY • 01)</label>
                      <input type="text" value={caseForm.caseNum} onChange={e => setCaseForm(prev => ({ ...prev, caseNum: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Badge Category (e.g. Pest Control | Urban Health)</label>
                      <input type="text" value={caseForm.badge} onChange={e => setCaseForm(prev => ({ ...prev, badge: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Subtitle</label>
                      <input type="text" value={caseForm.subtitle} onChange={e => setCaseForm(prev => ({ ...prev, subtitle: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Case Study Outcome Result Description</label>
                    <textarea rows="3" value={caseForm.result} onChange={e => setCaseForm(prev => ({ ...prev, result: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}></textarea>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Case Study Image</label>
                    {caseForm.image_url && (
                      <div style={{ position: 'relative', display: 'inline-block', marginBottom: '0.75rem' }}>
                        <img 
                          src={caseForm.image_url} 
                          alt="Case Study Preview" 
                          style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)', display: 'block' }} 
                        />
                        <button
                          type="button"
                          onClick={() => setCaseForm(prev => ({ ...prev, image_url: '' }))}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#ef4444',
                            color: '#ffffff',
                            border: '2px solid #020b1e',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                            zIndex: 10
                          }}
                          title="Remove Image"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setCaseForm(prev => ({ ...prev, image_url: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} 
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quote Text</label>
                      <input type="text" value={caseForm.quote} onChange={e => setCaseForm(prev => ({ ...prev, quote: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quote Author Citation</label>
                      <input type="text" value={caseForm.author} onChange={e => setCaseForm(prev => ({ ...prev, author: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>

                  {/* Zones Config */}
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '1rem' }}>
                    <h5 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>Zones Config (3 Zones)</h5>
                    {caseForm.zones.map((zone, zIdx) => (
                      <div key={zIdx} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', padding: '0.75rem', border: '1px solid var(--border-glass)', borderRadius: '6px' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Zone {zIdx + 1} Title</label>
                            <input
                              type="text"
                              value={zone.title}
                              onChange={e => {
                                const newZones = [...caseForm.zones];
                                newZones[zIdx].title = e.target.value;
                                // Automatically ensure a default premium color is set based on index
                                newZones[zIdx].color = zIdx === 0 ? '#10b981' : zIdx === 1 ? '#3b82f6' : '#f59e0b';
                                setCaseForm(prev => ({ ...prev, zones: newZones }));
                              }}
                              required
                              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Zone Description</label>
                          <textarea
                            rows="2"
                            value={zone.desc}
                            onChange={e => {
                              const newZones = [...caseForm.zones];
                              newZones[zIdx].desc = e.target.value;
                              setCaseForm(prev => ({ ...prev, zones: newZones }));
                            }}
                            required
                            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                          ></textarea>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Config */}
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '1rem' }}>
                    <h5 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>Metrics Config (3 Metrics)</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '0.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>Metrics Section Title</label>
                        <input
                          type="text"
                          value={caseForm.metricsTitle}
                          onChange={e => setCaseForm(prev => ({ ...prev, metricsTitle: e.target.value }))}
                          required
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                        />
                      </div>
                    </div>
                    {caseForm.metrics.map((metric, mIdx) => (
                      <div key={mIdx} style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem', padding: '0.5rem', border: '1px solid var(--border-glass)', borderRadius: '6px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Metric Value (e.g. 68%)</label>
                          <input
                            type="text"
                            value={metric.val}
                            onChange={e => {
                              const newMetrics = [...caseForm.metrics];
                              newMetrics[mIdx].val = e.target.value;
                              setCaseForm(prev => ({ ...prev, metrics: newMetrics }));
                            }}
                            required
                            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div style={{ flex: 2 }}>
                          <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Label / Description</label>
                          <input
                            type="text"
                            value={metric.label}
                            onChange={e => {
                              const newMetrics = [...caseForm.metrics];
                              newMetrics[mIdx].label = e.target.value;
                              setCaseForm(prev => ({ ...prev, metrics: newMetrics }));
                            }}
                            required
                            style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Outcomes Config */}
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '1rem' }}>
                    <h5 style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>Key Outcomes (4 Points)</h5>
                    {caseForm.outcomes.map((outcome, oIdx) => (
                      <div key={oIdx} style={{ marginBottom: '0.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Outcome Point {oIdx + 1}</label>
                        <input
                          type="text"
                          value={outcome}
                          onChange={e => {
                            const newOutcomes = [...caseForm.outcomes];
                            newOutcomes[oIdx] = e.target.value;
                            setCaseForm(prev => ({ ...prev, outcomes: newOutcomes }));
                          }}
                          required
                          style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Testimonial Form */}
              {modalType === 'testimonial' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Quote</label>
                    <textarea rows="3" value={testimonialForm.quote} onChange={e => setTestimonialForm(prev => ({ ...prev, quote: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}></textarea>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Author Name</label>
                    <input type="text" value={testimonialForm.name} onChange={e => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Author Role / Company</label>
                    <input type="text" value={testimonialForm.role} onChange={e => setTestimonialForm(prev => ({ ...prev, role: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Initials (e.g. HC)</label>
                      <input type="text" value={testimonialForm.initials} onChange={e => setTestimonialForm(prev => ({ ...prev, initials: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Color Theme</label>
                      <input type="text" value={testimonialForm.color} onChange={e => setTestimonialForm(prev => ({ ...prev, color: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                </>
              )}

              {/* Division Form */}
              {modalType === 'division' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Tag (e.g. WORKFORCE INFRASTRUCTURE)</label>
                    <input type="text" value={divisionForm.tag} onChange={e => setDivisionForm(prev => ({ ...prev, tag: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Title</label>
                    <input type="text" value={divisionForm.title} onChange={e => setDivisionForm(prev => ({ ...prev, title: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                    <textarea rows="3" value={divisionForm.desc} onChange={e => setDivisionForm(prev => ({ ...prev, desc: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Button Text</label>
                      <input type="text" value={divisionForm.action} onChange={e => setDivisionForm(prev => ({ ...prev, action: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Target Page</label>
                      <input type="text" value={divisionForm.target} onChange={e => setDivisionForm(prev => ({ ...prev, target: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Color Theme</label>
                      <input type="text" value={divisionForm.color} onChange={e => setDivisionForm(prev => ({ ...prev, color: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Image URL</label>
                      <input type="text" value={divisionForm.img} onChange={e => setDivisionForm(prev => ({ ...prev, img: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Bullet Features (3 items)</label>
                    {[0, 1, 2].map(idx => (
                      <div key={idx} style={{ marginBottom: '0.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Feature {idx + 1}</label>
                        <input
                          type="text"
                          value={divisionForm.features[idx] ? divisionForm.features[idx].text : ''}
                          onChange={e => {
                            const newFeatures = [...divisionForm.features];
                            if (!newFeatures[idx]) newFeatures[idx] = { text: '' };
                            newFeatures[idx].text = e.target.value;
                            setDivisionForm(prev => ({ ...prev, features: newFeatures }));
                          }}
                          required
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Telemetry Form */}
              {modalType === 'telemetry' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Caption</label>
                    <input type="text" value={telemetryForm.caption} onChange={e => setTelemetryForm(prev => ({ ...prev, caption: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Upload Image File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setTelemetryForm(prev => ({ ...prev, image_url: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}
                    />
                  </div>
                  {telemetryForm.image_url && (
                    <div style={{ marginTop: '1rem', position: 'relative', display: 'inline-block', width: '100%' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Current / Selected Image Preview</label>
                      <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                        <img
                          src={getTelemetryImage(telemetryForm.image_url)}
                          alt="Telemetry Preview"
                          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)', display: 'block' }}
                        />
                        <button
                          type="button"
                          onClick={() => setTelemetryForm(prev => ({ ...prev, image_url: '' }))}
                          style={{
                            position: 'absolute',
                            top: '8px',
                            right: '8px',
                            background: '#ef4444',
                            color: '#ffffff',
                            border: '2px solid #020b1e',
                            borderRadius: '50%',
                            width: '26px',
                            height: '26px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.4)',
                            zIndex: 10
                          }}
                          title="Remove Image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Service Form */}
              {modalType === 'service' && (
                <>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Service Number (e.g. 01)</label>
                      <input type="text" value={serviceForm.num} onChange={e => setServiceForm(prev => ({ ...prev, num: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Title</label>
                      <input type="text" value={serviceForm.title} onChange={e => setServiceForm(prev => ({ ...prev, title: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                    <textarea rows="3" value={serviceForm.desc} onChange={e => setServiceForm(prev => ({ ...prev, desc: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }}></textarea>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Button Text</label>
                      <input type="text" value={serviceForm.actionText} onChange={e => setServiceForm(prev => ({ ...prev, actionText: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Target Page (e.g. dormitories, products)</label>
                      <input type="text" value={serviceForm.action} onChange={e => setServiceForm(prev => ({ ...prev, action: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Theme Color Hex</label>
                      <input type="text" value={serviceForm.themeColor} onChange={e => setServiceForm(prev => ({ ...prev, themeColor: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>Badge Bg Color</label>
                      <input type="text" value={serviceForm.badgeBg} onChange={e => setServiceForm(prev => ({ ...prev, badgeBg: e.target.value }))} required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)' }} />
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary)' }}>Service Bullet Points</label>
                    {[0, 1, 2, 3].map(idx => (
                      <div key={idx} style={{ marginBottom: '0.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bullet Point {idx + 1}</label>
                        <input
                          type="text"
                          value={serviceForm.bullets[idx] || ''}
                          onChange={e => {
                            const newBullets = [...serviceForm.bullets];
                            newBullets[idx] = e.target.value;
                            setServiceForm(prev => ({ ...prev, bullets: newBullets }));
                          }}
                          style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontSize: '0.85rem' }}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--border-glass)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px', borderRadius: '8px', fontWeight: 700 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Viewer Modal */}
      {viewDetailItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '550px', padding: '2.5rem', borderRadius: '1.25rem', border: '1px solid var(--border-glass)', position: 'relative' }}>
            <button onClick={() => setViewDetailItem(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}><X size={20} /></button>

            {viewDetailItem.type === 'inquiry' && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Inquiry Details</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 850, margin: '0.25rem 0 1.5rem 0' }}>{viewDetailItem.subject}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>From</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{viewDetailItem.name}</strong> ({viewDetailItem.email})
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Submitted At</span>
                    <span>{new Date(viewDetailItem.created_at).toLocaleString()}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Message</span>
                    <div style={{ background: 'var(--primary-glow)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-glass)', lineHeight: '1.6', marginTop: '0.25rem', whiteSpace: 'pre-line' }}>{viewDetailItem.message}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginRight: '10px' }}>Mark Status:</span>
                    <select
                      value={viewDetailItem.status}
                      onChange={(e) => handleInquiryStatus(viewDetailItem.id, e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-glass)', background: 'var(--bg-glass)', color: 'var(--text-primary)', fontWeight: 600 }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <button onClick={() => { handleDelete(viewDetailItem.id, 'inquiry'); setViewDetailItem(null); }} className="btn btn-secondary" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none' }}>
                    Delete
                  </button>
                </div>
              </div>
            )}

            {viewDetailItem.type === 'partnership' && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Partnership Request</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 850, margin: '0.25rem 0 1.5rem 0' }}>{viewDetailItem.company_name}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Contact Name</span>
                      <strong>{viewDetailItem.contact_name}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Sourcing Sector</span>
                      <strong>{viewDetailItem.interest_area}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Email Address</span>
                      <span>{viewDetailItem.email}</span>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Phone Number</span>
                      <span>{viewDetailItem.phone}</span>
                    </div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Submitted At</span>
                    <span>{new Date(viewDetailItem.created_at).toLocaleString()}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Application Message</span>
                    <div style={{ background: 'var(--primary-glow)', padding: '15px', borderRadius: '8px', border: '1px solid var(--border-glass)', lineHeight: '1.6', marginTop: '0.25rem', whiteSpace: 'pre-line' }}>{viewDetailItem.message}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
                  <button onClick={() => { handleDelete(viewDetailItem.id, 'partnership'); setViewDetailItem(null); }} className="btn btn-secondary" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none' }}>
                    Delete Log
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
