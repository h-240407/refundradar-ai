// ============================================================
// RefundRadar AI — TypeScript Type Definitions
// ============================================================

// ---- Refund Types ----

export type RefundStatus =
  | 'requested'
  | 'processing'
  | 'approved'
  | 'issued'
  | 'completed'
  | 'delayed'
  | 'action_required';

export interface RefundTimeline {
  status: RefundStatus;
  date: string;
  description: string;
}

export interface Refund {
  id: string;
  orderId: string;
  orderReference: string;
  merchant: string;
  merchantLogo?: string;
  purchaseDate: string;
  refundAmount: number;
  originalAmount: number;
  currency: string;
  requestDate: string;
  status: RefundStatus;
  lastUpdated: string;
  timeline: RefundTimeline[];
  reason?: string;
  notes?: string;
  paypalTransactionId?: string;
  estimatedCompletionDate?: string;
}

// ---- Order Types ----

export interface Order {
  id: string;
  orderReference: string;
  merchant: string;
  merchantLogo?: string;
  purchaseDate: string;
  amount: number;
  currency: string;
  items: OrderItem[];
  status: OrderStatus;
  paypalTransactionId?: string;
  receiptUrl?: string;
  hasRefund: boolean;
  refundId?: string;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'completed' | 'pending' | 'cancelled' | 'refunded' | 'partially_refunded';

// ---- Notification Types ----

export type NotificationType = 'refund_update' | 'reminder' | 'alert' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  refundId?: string;
}

// ---- Analytics Types ----

export interface AnalyticsData {
  totalRefunds: number;
  totalRefundAmount: number;
  pendingAmount: number;
  completedAmount: number;
  successRate: number;
  averageRefundTime: number; // in days
  monthlyTrends: MonthlyTrend[];
  merchantBreakdown: MerchantBreakdown[];
  statusDistribution: StatusDistribution[];
}

export interface MonthlyTrend {
  month: string;
  refunds: number;
  amount: number;
  completed: number;
}

export interface MerchantBreakdown {
  merchant: string;
  totalRefunds: number;
  totalAmount: number;
  averageTime: number;
  successRate: number;
}

export interface StatusDistribution {
  status: RefundStatus;
  count: number;
  percentage: number;
}

// ---- User Types ----

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  paypalConnected: boolean;
  notificationPreferences: NotificationPreferences;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  refundUpdates: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

// ---- AI Assistant Types ----

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  relatedRefundId?: string;
}

export interface AssistantSuggestion {
  id: string;
  text: string;
  icon?: string;
}

// ---- Dashboard Types ----

export interface DashboardStats {
  totalRefundAmount: number;
  pendingRefunds: number;
  completedRefunds: number;
  actionRequired: number;
  currency: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'tip' | 'warning' | 'info' | 'success';
  actionText?: string;
  actionUrl?: string;
}

// ---- Settings Types ----

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  currency: string;
  timezone: string;
  notifications: NotificationPreferences;
}

// ---- PayPal Integration Types (Prepared for Backend) ----

export interface PayPalConnection {
  connected: boolean;
  sandboxMode: boolean;
  email?: string;
  lastSync?: string;
}

export interface PayPalTransaction {
  transactionId: string;
  orderId: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  merchant: string;
}

