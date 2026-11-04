// ============================================================
// RefundRadar AI — Order Service
// ============================================================
// TODO: Replace with actual API calls when backend is ready

import type { Order, OrderStatus } from '../types';
import { demoOrders, DEMO_MODE } from '../data/mockData';

const delay = (ms = 400) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface OrderFilters {
  status?: OrderStatus;
  merchant?: string;
  search?: string;
  hasRefund?: boolean;
}

/** Get all orders, optionally filtered. */
export async function getOrders(filters?: OrderFilters): Promise<Order[]> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay();
  let results = [...demoOrders];

  if (filters?.status) {
    results = results.filter((o) => o.status === filters.status);
  }

  if (filters?.merchant) {
    results = results.filter(
      (o) => o.merchant.toLowerCase() === filters.merchant!.toLowerCase(),
    );
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    results = results.filter(
      (o) =>
        o.merchant.toLowerCase().includes(q) ||
        o.orderReference.toLowerCase().includes(q) ||
        o.items.some((i) => i.name.toLowerCase().includes(q)),
    );
  }

  if (filters?.hasRefund !== undefined) {
    results = results.filter((o) => o.hasRefund === filters.hasRefund);
  }

  return results;
}

/** Get a single order by its id. */
export async function getOrderById(id: string): Promise<Order | undefined> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(300);
  return demoOrders.find((o) => o.id === id);
}

/** Create a new order. Returns the newly created order. */
export async function createOrder(
  data: Omit<Order, 'id'>,
): Promise<Order> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(600);

  const newOrder: Order = {
    ...data,
    id: `ord_${Date.now()}`,
  };

  demoOrders.push(newOrder);
  return newOrder;
}
