// ============================================================
// RefundRadar AI — Notification Service
// ============================================================
// TODO: Replace with actual API calls when backend is ready

import type { Notification } from '../types';
import { demoNotifications, DEMO_MODE } from '../data/mockData';

const delay = (ms = 300) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Get all notifications, newest first. */
export async function getNotifications(): Promise<Notification[]> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay();
  return [...demoNotifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

/** Mark a single notification as read. */
export async function markAsRead(id: string): Promise<Notification | undefined> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(200);

  const notification = demoNotifications.find((n) => n.id === id);
  if (!notification) return undefined;

  notification.read = true;
  return { ...notification };
}

/** Mark every notification as read. */
export async function markAllAsRead(): Promise<void> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(200);

  for (const n of demoNotifications) {
    n.read = true;
  }
}
