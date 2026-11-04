// ============================================================
// RefundRadar AI — Notification Service (Connected to Backend API)
// ============================================================

import type { Notification } from '../types';
import { demoNotifications } from '../data/mockData';

const delay = (ms = 150) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Get all notifications, newest first. */
export async function getNotifications(): Promise<Notification[]> {
  try {
    const res = await fetch('/api/notifications');
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch {
    // Fallback
  }

  await delay(100);
  return [...demoNotifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

/** Mark a single notification as read. */
export async function markAsRead(id: string): Promise<Notification | undefined> {
  try {
    const res = await fetch(`/api/notifications/${id}/read`, { method: 'PATCH' });
    if (res.ok) {
      const target = demoNotifications.find((n) => n.id === id);
      if (target) target.read = true;
      return target;
    }
  } catch {
    // Fallback
  }

  await delay(100);
  const notification = demoNotifications.find((n) => n.id === id);
  if (!notification) return undefined;

  notification.read = true;
  return { ...notification };
}

/** Mark every notification as read. */
export async function markAllAsRead(): Promise<void> {
  try {
    const res = await fetch('/api/notifications/mark-all-read', { method: 'POST' });
    if (res.ok) {
      for (const n of demoNotifications) {
        n.read = true;
      }
      return;
    }
  } catch {
    // Fallback
  }

  await delay(100);
  for (const n of demoNotifications) {
    n.read = true;
  }
}
