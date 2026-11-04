// ============================================================
// RefundRadar AI — Order Service (Connected to Backend API)
// ============================================================

import type { Order, OrderStatus } from '../types';
import { demoOrders } from '../data/mockData';
import { API_BASE } from './apiConfig';

const delay = (ms = 200) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface OrderFilters {
  status?: OrderStatus;
  merchant?: string;
  search?: string;
  hasRefund?: boolean;
}

/** Get all orders, optionally filtered. */
export async function getOrders(filters?: OrderFilters): Promise<Order[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/api/orders?${params.toString()}`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  await delay(150);
  let results = [...demoOrders];

  if (filters?.status) {
    results = results.filter((o) => o.status === filters.status);
  }

  if (filters?.merchant) {
    results = results.filter(
      (o) => o.merchant.toLowerCase() === filters.merchant!.toLowerCase()
    );
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (o) =>
        o.merchant.toLowerCase().includes(q) ||
        o.orderReference.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q))
    );
  }

  if (filters?.hasRefund !== undefined) {
    results = results.filter((o) => o.hasRefund === filters.hasRefund);
  }

  return results;
}

/** Get a single order by its id. */
export async function getOrderById(id: string): Promise<Order | undefined> {
  try {
    const res = await fetch(`${API_BASE}/api/orders/${id}`);
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
  return demoOrders.find((o) => o.id === id);
}

/** Create a new order. Returns the newly created order. */
export async function createOrder(data: Omit<Order, 'id'>): Promise<Order> {
  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
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
  const newOrder: Order = {
    ...data,
    id: `ord_${Date.now()}`,
  };

  demoOrders.unshift(newOrder);
  return newOrder;
}
