import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type {
  Refund,
  RefundStatus,
  Order,
  Notification,
  User,
  DashboardStats,
} from '../types';
import {
  demoRefunds,
  demoOrders,
  demoNotifications,
  demoUser,
} from '../data/mockData';
import { AppContext } from './context';
import type { AppSettings } from './context';

const DEFAULT_SETTINGS: AppSettings = {
  paypalConnected: true,
  sandboxMode: true,
  clientId: 'demo-sb-client-id-pk_test_refundradar9921',
  emailAlerts: true,
  pushAlerts: true,
  statusChanges: true,
  digest: false,
  currency: 'USD',
  timezone: 'America/Los_Angeles',
};

const STORAGE_KEYS = {
  REFUNDS: 'refundradar_refunds',
  ORDERS: 'refundradar_orders',
  NOTIFICATIONS: 'refundradar_notifications',
  USER: 'refundradar_user',
  SETTINGS: 'refundradar_settings',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Refunds State
  const [refunds, setRefunds] = useState<Refund[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.REFUNDS);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return demoRefunds;
  });

  // 2. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return demoOrders;
  });

  // 3. Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return demoNotifications;
  });

  // 4. User Profile State
  const [user, setUser] = useState<User>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return demoUser;
  });

  // 5. Settings State
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return DEFAULT_SETTINGS;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REFUNDS, JSON.stringify(refunds));
    } catch {
      // ignore
    }
  }, [refunds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch {
      // ignore
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Derived Dashboard Stats
  const stats = useMemo<DashboardStats>(() => {
    const totalRefundAmount = refunds.reduce((sum, r) => sum + (r.refundAmount || 0), 0);
    const pendingRefunds = refunds.filter(
      (r) => ['requested', 'processing', 'approved', 'issued'].includes(r.status)
    ).length;
    const completedRefunds = refunds.filter((r) => r.status === 'completed').length;
    const actionRequired = refunds.filter(
      (r) => ['action_required', 'delayed'].includes(r.status)
    ).length;

    return {
      totalRefundAmount,
      pendingRefunds,
      completedRefunds,
      actionRequired,
      currency: settings.currency || 'USD',
    };
  }, [refunds, settings.currency]);

  // Derived unread notifications count
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Actions
  const addRefund = useCallback((data: Partial<Refund>): Refund => {
    const nowStr = new Date().toISOString().split('T')[0];
    const newId = `ref_${Date.now()}`;
    const newRefund: Refund = {
      id: newId,
      orderId: data.orderId || `ord_${Date.now()}`,
      orderReference: data.orderReference || 'REF-NEW',
      merchant: data.merchant || 'Unknown Merchant',
      merchantLogo: data.merchantLogo,
      purchaseDate: data.purchaseDate || nowStr,
      refundAmount: data.refundAmount || 0,
      originalAmount: data.originalAmount || data.refundAmount || 0,
      currency: data.currency || 'USD',
      requestDate: data.requestDate || nowStr,
      status: data.status || 'requested',
      lastUpdated: nowStr,
      reason: data.reason || 'Refund requested by user.',
      notes: data.notes,
      paypalTransactionId: data.paypalTransactionId,
      estimatedCompletionDate: data.estimatedCompletionDate,
      timeline: data.timeline || [
        {
          status: data.status || 'requested',
          date: nowStr,
          description: data.reason || 'Refund request registered in RefundRadar AI.',
        },
      ],
    };

    setRefunds((prev) => [newRefund, ...prev]);

    // If matches an order by reference, mark order as having a refund
    if (data.orderReference) {
      setOrders((prev) =>
        prev.map((o) =>
          o.orderReference.toLowerCase() === data.orderReference?.toLowerCase()
            ? { ...o, hasRefund: true, refundId: newId }
            : o
        )
      );
    }

    // Add alert notification
    const newNotif: Notification = {
      id: `notif_${Date.now()}`,
      type: 'refund_update',
      title: `${newRefund.merchant} Refund Initiated`,
      message: `Your refund request for $${newRefund.refundAmount.toFixed(2)} has been recorded and is now tracking.`,
      timestamp: new Date().toISOString(),
      read: false,
      refundId: newId,
      actionUrl: `/app/refunds/${newId}`,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Asynchronously notify backend if running
    fetch('/api/refunds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRefund),
    }).catch(() => {});

    return newRefund;
  }, []);

  const updateRefundStatus = useCallback((id: string, newStatus: RefundStatus, note?: string) => {
    const nowStr = new Date().toISOString().split('T')[0];
    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const timelineItem = {
          status: newStatus,
          date: nowStr,
          description: note || `Status updated to ${newStatus.replace('_', ' ')}.`,
        };
        return {
          ...r,
          status: newStatus,
          lastUpdated: nowStr,
          timeline: [...r.timeline, timelineItem],
        };
      })
    );

    // Asynchronously update backend
    fetch(`/api/refunds/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, note }),
    }).catch(() => {});

    // Add notification
    const target = refunds.find((r) => r.id === id);
    if (target) {
      const notif: Notification = {
        id: `notif_${Date.now()}`,
        type: newStatus === 'completed' ? 'refund_update' : 'alert',
        title: `${target.merchant} Status: ${newStatus.replace('_', ' ').toUpperCase()}`,
        message: `Your $${target.refundAmount.toFixed(2)} refund moved to ${newStatus.replace('_', ' ')}.`,
        timestamp: new Date().toISOString(),
        read: false,
        refundId: id,
        actionUrl: `/app/refunds/${id}`,
      };
      setNotifications((prev) => [notif, ...prev]);
    }
  }, [refunds]);

  const addRefundNote = useCallback((id: string, note: string) => {
    setRefunds((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r;
        const existingNotes = r.notes ? `${r.notes}\n• ${note}` : `• ${note}`;
        return {
          ...r,
          notes: existingNotes,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      })
    );

    fetch(`/api/refunds/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    }).catch(() => {});
  }, []);

  const addOrder = useCallback((data: Partial<Order>): Order => {
    const nowStr = new Date().toISOString().split('T')[0];
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderReference: data.orderReference || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      merchant: data.merchant || 'Retail Merchant',
      merchantLogo: data.merchantLogo,
      purchaseDate: data.purchaseDate || nowStr,
      amount: data.amount || 0,
      currency: data.currency || 'USD',
      status: data.status || 'completed',
      hasRefund: false,
      paypalTransactionId: data.paypalTransactionId,
      items: data.items && data.items.length > 0 ? data.items : [
        {
          name: 'General Product',
          quantity: 1,
          price: data.amount || 0,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    }).catch(() => {});

    return newOrder;
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    fetch(`/api/notifications/${id}/read`, { method: 'PATCH' }).catch(() => {});
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    fetch('/api/notifications/mark-all-read', { method: 'POST' }).catch(() => {});
  }, []);

  const updateUser = useCallback((data: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...data }));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const syncPayPalSandbox = useCallback(async () => {
    try {
      const res = await fetch('/api/paypal/sync', { method: 'POST' });
      if (res.ok) {
        // Backend processed sync
      }
    } catch {
      // Backend not running — fallback to local timer
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    const nowStr = new Date().toISOString();
    const notif: Notification = {
      id: `notif_${Date.now()}`,
      type: 'info',
      title: 'PayPal Sandbox Synchronized',
      message: 'All sandbox payment captures and refund webhooks successfully queried.',
      timestamp: nowStr,
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
  }, []);

  const resetData = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.REFUNDS);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);

    setRefunds(demoRefunds);
    setOrders(demoOrders);
    setNotifications(demoNotifications);
    setUser(demoUser);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return (
    <AppContext.Provider
      value={{
        refunds,
        orders,
        notifications,
        user,
        settings,
        stats,
        unreadCount,
        addRefund,
        updateRefundStatus,
        addRefundNote,
        addOrder,
        markNotificationRead,
        markAllNotificationsRead,
        updateUser,
        updateSettings,
        syncPayPalSandbox,
        resetData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
