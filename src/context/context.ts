import { createContext } from 'react';
import type {
  Refund,
  RefundStatus,
  Order,
  Notification,
  User,
  DashboardStats,
} from '../types';

export interface AppSettings {
  paypalConnected: boolean;
  sandboxMode: boolean;
  clientId: string;
  emailAlerts: boolean;
  pushAlerts: boolean;
  statusChanges: boolean;
  digest: boolean;
  currency: string;
  timezone: string;
}

export interface AppContextType {
  refunds: Refund[];
  orders: Order[];
  notifications: Notification[];
  user: User;
  settings: AppSettings;
  stats: DashboardStats;
  unreadCount: number;
  addRefund: (data: Partial<Refund>) => Refund;
  updateRefundStatus: (id: string, status: RefundStatus, note?: string) => void;
  addRefundNote: (id: string, note: string) => void;
  addOrder: (data: Partial<Order>) => Order;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  updateUser: (data: Partial<User>) => void;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  syncPayPalSandbox: () => Promise<void>;
  resetData: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

