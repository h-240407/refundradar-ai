// ============================================================
// RefundRadar AI — Refund Service (Connected to Backend API)
// ============================================================

import type { Refund, RefundStatus, DashboardStats } from '../types';
import { demoRefunds, demoDashboardStats } from '../data/mockData';
import { API_BASE } from './apiConfig';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface RefundFilters {
  status?: RefundStatus;
  merchant?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

/** Get all refunds, optionally filtered. */
export async function getRefunds(filters?: RefundFilters): Promise<Refund[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.merchant) params.append('merchant', filters.merchant);
    if (filters?.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/api/refunds?${params.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch {
    // Backend offline — fallback to local demo data
  }

  await delay(150);
  let results = [...demoRefunds];

  if (filters?.status) {
    results = results.filter((r) => r.status === filters.status);
  }

  if (filters?.merchant) {
    results = results.filter(
      (r) => r.merchant.toLowerCase() === filters.merchant!.toLowerCase()
    );
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.merchant.toLowerCase().includes(q) ||
        r.orderReference.toLowerCase().includes(q) ||
        r.reason?.toLowerCase().includes(q)
    );
  }

  return results;
}

/** Get a single refund by its id. */
export async function getRefundById(id: string): Promise<Refund | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/refunds/${id}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  await delay(100);
  return demoRefunds.find((r) => r.id === id);
}

/** Create a new refund request. Returns the newly created refund. */
export async function createRefund(
  data: Omit<Refund, 'id' | 'timeline' | 'lastUpdated'>
): Promise<Refund> {
  try {
    const res = await fetch(`${API_BASE}/api/refunds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  await delay(200);
  const nowStr = new Date().toISOString().split('T')[0];
  const newRefund: Refund = {
    ...data,
    id: `ref_${Date.now()}`,
    lastUpdated: nowStr,
    timeline: [
      {
        status: 'requested',
        date: nowStr,
        description: data.reason || 'Refund request submitted.',
      },
    ],
  };

  demoRefunds.unshift(newRefund);
  return newRefund;
}

/** Update the status of an existing refund. */
export async function updateRefundStatus(
  id: string,
  status: RefundStatus,
  note?: string
): Promise<Refund | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/refunds/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, note }),
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  await delay(150);
  const refund = demoRefunds.find((r) => r.id === id);
  if (!refund) return undefined;

  const nowStr = new Date().toISOString().split('T')[0];
  refund.status = status;
  refund.lastUpdated = nowStr;
  refund.timeline.push({
    status,
    date: nowStr,
    description: note || `Status changed to ${status}.`,
  });

  return { ...refund };
}

/** Get dashboard-level stats computed from refund data. */
export async function getRefundStats(): Promise<DashboardStats> {
  try {
    const res = await fetch(`${API_BASE}/api/refunds/stats`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  await delay(100);
  return { ...demoDashboardStats };
}
