// ============================================================
// RefundRadar AI — Refund Service
// ============================================================
// TODO: Replace with actual API calls when backend is ready

import type { Refund, RefundStatus, DashboardStats } from '../types';
import { demoRefunds, demoDashboardStats, DEMO_MODE } from '../data/mockData';

/** Simulates network latency for demo mode. */
const delay = (ms = 400) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface RefundFilters {
  status?: RefundStatus;
  merchant?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

/** Get all refunds, optionally filtered. */
export async function getRefunds(filters?: RefundFilters): Promise<Refund[]> {
  if (!DEMO_MODE) {
    // TODO: fetch('/api/refunds', { params: filters })
    throw new Error('Backend not connected');
  }

  await delay();
  let results = [...demoRefunds];

  if (filters?.status) {
    results = results.filter((r) => r.status === filters.status);
  }

  if (filters?.merchant) {
    results = results.filter(
      (r) => r.merchant.toLowerCase() === filters.merchant!.toLowerCase(),
    );
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (r) =>
        r.merchant.toLowerCase().includes(q) ||
        r.orderReference.toLowerCase().includes(q) ||
        r.reason?.toLowerCase().includes(q),
    );
  }

  if (filters?.dateFrom) {
    results = results.filter((r) => r.requestDate >= filters.dateFrom!);
  }

  if (filters?.dateTo) {
    results = results.filter((r) => r.requestDate <= filters.dateTo!);
  }

  return results;
}

/** Get a single refund by its id. */
export async function getRefundById(id: string): Promise<Refund | undefined> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(300);
  return demoRefunds.find((r) => r.id === id);
}

/** Create a new refund request. Returns the newly created refund. */
export async function createRefund(
  data: Omit<Refund, 'id' | 'timeline' | 'lastUpdated'>,
): Promise<Refund> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(600);

  const newRefund: Refund = {
    ...data,
    id: `ref_${Date.now()}`,
    lastUpdated: new Date().toISOString(),
    timeline: [
      {
        status: 'requested',
        date: new Date().toISOString().slice(0, 10),
        description: 'Refund request submitted.',
      },
    ],
  };

  // In a real app this would be persisted server-side.
  demoRefunds.push(newRefund);
  return newRefund;
}

/** Update the status of an existing refund. */
export async function updateRefundStatus(
  id: string,
  status: RefundStatus,
): Promise<Refund | undefined> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(500);

  const refund = demoRefunds.find((r) => r.id === id);
  if (!refund) return undefined;

  refund.status = status;
  refund.lastUpdated = new Date().toISOString();
  refund.timeline.push({
    status,
    date: new Date().toISOString().slice(0, 10),
    description: `Status changed to ${status}.`,
  });

  return { ...refund };
}

/** Get dashboard-level stats computed from refund data. */
export async function getRefundStats(): Promise<DashboardStats> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(300);
  return { ...demoDashboardStats };
}
