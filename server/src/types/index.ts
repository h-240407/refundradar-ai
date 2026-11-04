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

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'completed' | 'pending' | 'cancelled' | 'refunded' | 'partially_refunded';

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

export interface DashboardStats {
  totalRefundAmount: number;
  pendingRefunds: number;
  completedRefunds: number;
  actionRequired: number;
  currency: string;
}

