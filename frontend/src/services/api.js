const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const APP_URL = (import.meta.env.VITE_APP_URL || BASE_URL.replace(/\/api\/?$/, '')).replace(/\/$/, '');

let csrfRequest;

function readCookie(name) {
  const prefix = `${encodeURIComponent(name)}=`;
  const cookie = document.cookie.split('; ').find((item) => item.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

// Sanctum SPA memerlukan cookie XSRF-TOKEN sebelum request stateful.
function ensureCsrfCookie() {
  if (!csrfRequest) {
    csrfRequest = fetch(`${APP_URL}/sanctum/csrf-cookie`, {
      credentials: 'include'
    }).catch(() => {
      csrfRequest = null;
    });
  }

  return csrfRequest;
}

async function request(path, options = {}) {
  await ensureCsrfCookie();

  const method = (options.method || 'GET').toUpperCase();
  const headers = {
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(options.headers || {})
  };

  if (!['GET', 'HEAD'].includes(method)) {
    const token = readCookie('XSRF-TOKEN');
    if (token) headers['X-XSRF-TOKEN'] = token;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',
    ...options,
    headers
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(payload?.message || 'Terjadi kesalahan saat memuat data');
    error.status = response.status;
    error.details = Array.isArray(payload?.details) ? payload.details : [];
    throw error;
  }

  return payload?.data ?? payload;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) })
};
