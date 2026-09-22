const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (isLocal ? 'http://127.0.0.1:8000' : 'https://uniqix-website-b64g.onrender.com');
