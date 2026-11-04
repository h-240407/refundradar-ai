// ============================================================
// RefundRadar AI — Global API Client Configuration
// ============================================================

/**
 * Base URL for backend API requests.
 * Defaults to '' for same-domain or Vite development proxy (/api/...).
 * Can be overridden via VITE_API_URL environment variable for split-domain deployments (e.g. Vercel frontend + Render backend).
 */
export const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
