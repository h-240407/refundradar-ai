import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Refund, Order, Notification, DashboardStats, RefundStatus } from '../types/index.js';
import { initialRefunds, initialOrders, initialNotifications } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.resolve(__dirname, '../../data/db.json');

interface DatabaseSchema {
  refunds: Refund[];
  orders: Order[];
  notifications: Notification[];
}

class Store {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('[Store] Could not load db.json, using defaults.', err);
    }

    const defaultData: DatabaseSchema = {
      refunds: [...initialRefunds],
      orders: [...initialOrders],
      notifications: [...initialNotifications],
    };
    this.persist(defaultData);
    return defaultData;
  }

  private persist(dataToSave: DatabaseSchema = this.data) {
    try {
      const dir = path.dirname(DB_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_PATH, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Store] Failed to write db.json', err);
    }
  }

  // Refunds
  getRefunds(): Refund[] {
    return this.data.refunds;
  }

  getRefundById(id: string): Refund | undefined {
    return this.data.refunds.find((r) => r.id === id);
  }

  createRefund(newRefund: Refund): Refund {
    this.data.refunds.unshift(newRefund);

    // If order reference matches, update order
    if (newRefund.orderReference) {
      const order = this.data.orders.find(
        (o) => o.orderReference.toLowerCase() === newRefund.orderReference.toLowerCase()
      );
      if (order) {
        order.hasRefund = true;
        order.refundId = newRefund.id;
      }
    }

    this.persist();
    return newRefund;
  }

  updateRefundStatus(id: string, newStatus: RefundStatus, note?: string): Refund | undefined {
    const refund = this.data.refunds.find((r) => r.id === id);
    if (!refund) return undefined;

    const nowStr = new Date().toISOString().split('T')[0];
    refund.status = newStatus;
    refund.lastUpdated = nowStr;
    refund.timeline.push({
      status: newStatus,
      date: nowStr,
      description: note || `Status updated to ${newStatus.replace('_', ' ')}.`,
    });

    this.persist();
    return refund;
  }

  addRefundNote(id: string, note: string): Refund | undefined {
    const refund = this.data.refunds.find((r) => r.id === id);
    if (!refund) return undefined;

    refund.notes = refund.notes ? `${refund.notes}\n• ${note}` : `• ${note}`;
    refund.lastUpdated = new Date().toISOString().split('T')[0];
    this.persist();
    return refund;
  }

  // Orders
  getOrders(): Order[] {
    return this.data.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id);
  }

  createOrder(order: Order): Order {
    this.data.orders.unshift(order);
    this.persist();
    return order;
  }

  // Notifications
  getNotifications(): Notification[] {
    return this.data.notifications;
  }

  addNotification(notif: Notification): Notification {
    this.data.notifications.unshift(notif);
    this.persist();
    return notif;
  }

  markNotificationRead(id: string): boolean {
    const notif = this.data.notifications.find((n) => n.id === id);
    if (!notif) return false;
    notif.read = true;
    this.persist();
    return true;
  }

  markAllNotificationsRead(): void {
    this.data.notifications.forEach((n) => {
      n.read = true;
    });
    this.persist();
  }

  // Stats
  getStats(): DashboardStats {
    const totalRefundAmount = this.data.refunds.reduce((sum, r) => sum + (r.refundAmount || 0), 0);
    const pendingRefunds = this.data.refunds.filter((r) =>
      ['requested', 'processing', 'approved', 'issued'].includes(r.status)
    ).length;
    const completedRefunds = this.data.refunds.filter((r) => r.status === 'completed').length;
    const actionRequired = this.data.refunds.filter((r) =>
      ['action_required', 'delayed'].includes(r.status)
    ).length;

    return {
      totalRefundAmount,
      pendingRefunds,
      completedRefunds,
      actionRequired,
      currency: 'USD',
    };
  }

  reset(): void {
    this.data = {
      refunds: [...initialRefunds],
      orders: [...initialOrders],
      notifications: [...initialNotifications],
    };
    this.persist();
  }
}

export const store = new Store();

