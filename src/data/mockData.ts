// ============================================================
// RefundRadar AI — Demo / Mock Data
// ============================================================
// This file contains realistic demo data for development and
// preview purposes. Replace with live API data in production.

import type {
  Refund,
  Order,
  Notification,
  AnalyticsData,
  User,
  AIInsight,
  ChatMessage,
  AssistantSuggestion,
  DashboardStats,
} from '../types';

/** Toggle this to false once a real backend is wired up. */
export const DEMO_MODE = true;

// ---- Demo Refunds ----

export const demoRefunds: Refund[] = [
  {
    id: 'ref_001',
    orderId: 'ord_001',
    orderReference: 'AMZ-2026-90421',
    merchant: 'Amazon',
    purchaseDate: '2026-09-12',
    refundAmount: 149.99,
    originalAmount: 149.99,
    currency: 'USD',
    requestDate: '2026-09-18',
    status: 'completed',
    lastUpdated: '2026-09-26',
    reason: 'Product arrived damaged — cracked screen protector on laptop sleeve.',
    timeline: [
      { status: 'requested', date: '2026-09-18', description: 'Refund request submitted for damaged item.' },
      { status: 'processing', date: '2026-09-19', description: 'Amazon is reviewing your return request.' },
      { status: 'approved', date: '2026-09-21', description: 'Refund approved. Return label sent to your email.' },
      { status: 'issued', date: '2026-09-24', description: 'Refund issued to your PayPal account.' },
      { status: 'completed', date: '2026-09-26', description: 'Refund of $149.99 deposited successfully.' },
    ],
    paypalTransactionId: 'PP-TXN-98234A',
    estimatedCompletionDate: '2026-09-27',
  },
  {
    id: 'ref_002',
    orderId: 'ord_002',
    orderReference: 'NKE-2026-33012',
    merchant: 'Nike',
    purchaseDate: '2026-09-28',
    refundAmount: 189.95,
    originalAmount: 189.95,
    currency: 'USD',
    requestDate: '2026-10-05',
    status: 'processing',
    lastUpdated: '2026-10-11',
    reason: 'Wrong size delivered — ordered US 10, received US 8.',
    timeline: [
      { status: 'requested', date: '2026-10-05', description: 'Refund request submitted for incorrect size.' },
      { status: 'processing', date: '2026-10-07', description: 'Nike is reviewing your request. Awaiting warehouse confirmation.' },
    ],
    paypalTransactionId: 'PP-TXN-44512B',
    estimatedCompletionDate: '2026-10-20',
  },
  {
    id: 'ref_003',
    orderId: 'ord_003',
    orderReference: 'APL-2026-81200',
    merchant: 'Apple',
    purchaseDate: '2026-10-01',
    refundAmount: 499.99,
    originalAmount: 499.99,
    currency: 'USD',
    requestDate: '2026-10-08',
    status: 'delayed',
    lastUpdated: '2026-10-18',
    reason: 'Defective AirPods Max — left ear cup audio cutting out intermittently.',
    notes: 'Apple support escalated to specialist team. Awaiting diagnostic results.',
    timeline: [
      { status: 'requested', date: '2026-10-08', description: 'Refund request submitted for defective product.' },
      { status: 'processing', date: '2026-10-10', description: 'Apple is reviewing your request.' },
      { status: 'approved', date: '2026-10-13', description: 'Refund approved pending device return.' },
      { status: 'delayed', date: '2026-10-18', description: 'Return shipment delayed in transit. New ETA provided.' },
    ],
    paypalTransactionId: 'PP-TXN-77832C',
    estimatedCompletionDate: '2026-10-30',
  },
  {
    id: 'ref_004',
    orderId: 'ord_004',
    orderReference: 'SPT-2026-10044',
    merchant: 'Spotify',
    purchaseDate: '2026-10-01',
    refundAmount: 9.99,
    originalAmount: 9.99,
    currency: 'USD',
    requestDate: '2026-10-12',
    status: 'completed',
    lastUpdated: '2026-10-15',
    reason: 'Duplicate subscription charge — billed twice for October.',
    timeline: [
      { status: 'requested', date: '2026-10-12', description: 'Refund request submitted for duplicate charge.' },
      { status: 'approved', date: '2026-10-13', description: 'Spotify confirmed the duplicate billing.' },
      { status: 'issued', date: '2026-10-14', description: 'Refund issued to original payment method.' },
      { status: 'completed', date: '2026-10-15', description: 'Refund of $9.99 completed.' },
    ],
    paypalTransactionId: 'PP-TXN-11209D',
  },
  {
    id: 'ref_005',
    orderId: 'ord_005',
    orderReference: 'UBE-2026-55783',
    merchant: 'Uber Eats',
    purchaseDate: '2026-10-15',
    refundAmount: 34.50,
    originalAmount: 42.50,
    currency: 'USD',
    requestDate: '2026-10-16',
    status: 'approved',
    lastUpdated: '2026-10-19',
    reason: 'Missing items in delivery — 2 out of 5 items not included.',
    timeline: [
      { status: 'requested', date: '2026-10-16', description: 'Refund request submitted for missing items.' },
      { status: 'processing', date: '2026-10-17', description: 'Uber Eats is verifying your claim with the restaurant.' },
      { status: 'approved', date: '2026-10-19', description: 'Partial refund of $34.50 approved for missing items.' },
    ],
    paypalTransactionId: 'PP-TXN-66821E',
    estimatedCompletionDate: '2026-10-24',
  },
  {
    id: 'ref_006',
    orderId: 'ord_006',
    orderReference: 'BBY-2026-42910',
    merchant: 'Best Buy',
    purchaseDate: '2026-10-03',
    refundAmount: 329.99,
    originalAmount: 329.99,
    currency: 'USD',
    requestDate: '2026-10-20',
    status: 'action_required',
    lastUpdated: '2026-10-24',
    reason: 'Received wrong model — ordered Samsung Galaxy Buds2 Pro, got Buds2.',
    notes: 'Best Buy requires the original item be returned before processing. Print the prepaid return label.',
    timeline: [
      { status: 'requested', date: '2026-10-20', description: 'Refund request submitted for incorrect product.' },
      { status: 'processing', date: '2026-10-22', description: 'Best Buy confirmed the fulfillment error.' },
      { status: 'action_required', date: '2026-10-24', description: 'Please print the return label and ship the item back within 14 days.' },
    ],
    paypalTransactionId: 'PP-TXN-33018F',
    estimatedCompletionDate: '2026-11-08',
  },
  {
    id: 'ref_007',
    orderId: 'ord_007',
    orderReference: 'TGT-2026-71582',
    merchant: 'Target',
    purchaseDate: '2026-10-10',
    refundAmount: 74.97,
    originalAmount: 74.97,
    currency: 'USD',
    requestDate: '2026-10-22',
    status: 'issued',
    lastUpdated: '2026-10-28',
    reason: 'Items did not match product description — color was significantly different.',
    timeline: [
      { status: 'requested', date: '2026-10-22', description: 'Refund request submitted for mismatched product.' },
      { status: 'processing', date: '2026-10-23', description: 'Target reviewing your return request.' },
      { status: 'approved', date: '2026-10-25', description: 'Return approved — drop off at any Target store.' },
      { status: 'issued', date: '2026-10-28', description: 'Refund of $74.97 issued. Pending PayPal processing.' },
    ],
    paypalTransactionId: 'PP-TXN-88402G',
    estimatedCompletionDate: '2026-11-01',
  },
  {
    id: 'ref_008',
    orderId: 'ord_008',
    orderReference: 'ABB-2026-91340',
    merchant: 'Airbnb',
    purchaseDate: '2026-09-20',
    refundAmount: 215.00,
    originalAmount: 430.00,
    currency: 'USD',
    requestDate: '2026-09-25',
    status: 'completed',
    lastUpdated: '2026-10-02',
    reason: 'Host cancelled reservation 48 hours before check-in.',
    timeline: [
      { status: 'requested', date: '2026-09-25', description: 'Refund request submitted due to host cancellation.' },
      { status: 'approved', date: '2026-09-26', description: 'Airbnb confirmed host-side cancellation. 50% refund approved per policy.' },
      { status: 'issued', date: '2026-09-29', description: 'Refund of $215.00 issued to PayPal.' },
      { status: 'completed', date: '2026-10-02', description: 'Refund deposited successfully.' },
    ],
    paypalTransactionId: 'PP-TXN-22091H',
  },
  {
    id: 'ref_009',
    orderId: 'ord_009',
    orderReference: 'AMZ-2026-60218',
    merchant: 'Amazon',
    purchaseDate: '2026-10-25',
    refundAmount: 59.99,
    originalAmount: 59.99,
    currency: 'USD',
    requestDate: '2026-11-01',
    status: 'requested',
    lastUpdated: '2026-11-01',
    reason: 'Package marked delivered but never received.',
    timeline: [
      { status: 'requested', date: '2026-11-01', description: 'Refund request submitted for undelivered package.' },
    ],
    paypalTransactionId: 'PP-TXN-55127I',
    estimatedCompletionDate: '2026-11-12',
  },
];

// ---- Demo Orders ----

export const demoOrders: Order[] = [
  {
    id: 'ord_001',
    orderReference: 'AMZ-2026-90421',
    merchant: 'Amazon',
    purchaseDate: '2026-09-12',
    amount: 149.99,
    currency: 'USD',
    items: [
      { name: 'Laptop Sleeve — 15" Neoprene', quantity: 1, price: 29.99 },
      { name: 'USB-C Hub 7-in-1', quantity: 1, price: 49.99 },
      { name: 'Wireless Mouse', quantity: 1, price: 34.99 },
      { name: 'Screen Cleaning Kit', quantity: 1, price: 12.99 },
      { name: 'Webcam Cover (3-pack)', quantity: 1, price: 22.03 },
    ],
    status: 'refunded',
    paypalTransactionId: 'PP-TXN-98234A',
    hasRefund: true,
    refundId: 'ref_001',
  },
  {
    id: 'ord_002',
    orderReference: 'NKE-2026-33012',
    merchant: 'Nike',
    purchaseDate: '2026-09-28',
    amount: 189.95,
    currency: 'USD',
    items: [
      { name: 'Air Max 90 — White/Black', quantity: 1, price: 139.95 },
      { name: 'Dri-FIT Running Socks (3-pack)', quantity: 1, price: 24.00 },
      { name: 'Shoe Cleaning Wipes', quantity: 1, price: 26.00 },
    ],
    status: 'partially_refunded',
    paypalTransactionId: 'PP-TXN-44512B',
    hasRefund: true,
    refundId: 'ref_002',
  },
  {
    id: 'ord_003',
    orderReference: 'APL-2026-81200',
    merchant: 'Apple',
    purchaseDate: '2026-10-01',
    amount: 499.99,
    currency: 'USD',
    items: [{ name: 'AirPods Max — Space Gray', quantity: 1, price: 499.99 }],
    status: 'refunded',
    paypalTransactionId: 'PP-TXN-77832C',
    hasRefund: true,
    refundId: 'ref_003',
  },
  {
    id: 'ord_004',
    orderReference: 'SPT-2026-10044',
    merchant: 'Spotify',
    purchaseDate: '2026-10-01',
    amount: 9.99,
    currency: 'USD',
    items: [{ name: 'Spotify Premium — Monthly', quantity: 1, price: 9.99 }],
    status: 'refunded',
    paypalTransactionId: 'PP-TXN-11209D',
    hasRefund: true,
    refundId: 'ref_004',
  },
  {
    id: 'ord_005',
    orderReference: 'UBE-2026-55783',
    merchant: 'Uber Eats',
    purchaseDate: '2026-10-15',
    amount: 42.50,
    currency: 'USD',
    items: [
      { name: 'Pad Thai', quantity: 1, price: 14.50 },
      { name: 'Spring Rolls (4 pcs)', quantity: 1, price: 8.00 },
      { name: 'Green Curry', quantity: 1, price: 13.00 },
      { name: 'Mango Sticky Rice', quantity: 1, price: 7.00 },
    ],
    status: 'partially_refunded',
    paypalTransactionId: 'PP-TXN-66821E',
    hasRefund: true,
    refundId: 'ref_005',
  },
  {
    id: 'ord_006',
    orderReference: 'BBY-2026-42910',
    merchant: 'Best Buy',
    purchaseDate: '2026-10-03',
    amount: 329.99,
    currency: 'USD',
    items: [{ name: 'Samsung Galaxy Buds2 Pro', quantity: 1, price: 329.99 }],
    status: 'pending',
    paypalTransactionId: 'PP-TXN-33018F',
    hasRefund: true,
    refundId: 'ref_006',
  },
  {
    id: 'ord_007',
    orderReference: 'TGT-2026-71582',
    merchant: 'Target',
    purchaseDate: '2026-10-10',
    amount: 74.97,
    currency: 'USD',
    items: [
      { name: 'Throw Pillow — Sage Green', quantity: 2, price: 24.99 },
      { name: 'Scented Candle — Vanilla Oak', quantity: 1, price: 14.99 },
      { name: 'Ceramic Planter — Small', quantity: 1, price: 10.00 },
    ],
    status: 'refunded',
    paypalTransactionId: 'PP-TXN-88402G',
    hasRefund: true,
    refundId: 'ref_007',
  },
  {
    id: 'ord_008',
    orderReference: 'ABB-2026-91340',
    merchant: 'Airbnb',
    purchaseDate: '2026-09-20',
    amount: 430.00,
    currency: 'USD',
    items: [{ name: 'Airbnb Stay — Downtown Loft (2 nights)', quantity: 1, price: 430.00 }],
    status: 'cancelled',
    paypalTransactionId: 'PP-TXN-22091H',
    hasRefund: true,
    refundId: 'ref_008',
  },
  {
    id: 'ord_009',
    orderReference: 'AMZ-2026-60218',
    merchant: 'Amazon',
    purchaseDate: '2026-10-25',
    amount: 59.99,
    currency: 'USD',
    items: [{ name: 'Anker Portable Charger 20 000 mAh', quantity: 1, price: 59.99 }],
    status: 'completed',
    paypalTransactionId: 'PP-TXN-55127I',
    hasRefund: true,
    refundId: 'ref_009',
  },
  {
    id: 'ord_010',
    orderReference: 'AMZ-2026-77410',
    merchant: 'Amazon',
    purchaseDate: '2026-10-30',
    amount: 24.99,
    currency: 'USD',
    items: [{ name: 'Kindle Paperwhite Case', quantity: 1, price: 24.99 }],
    status: 'completed',
    hasRefund: false,
  },
  {
    id: 'ord_011',
    orderReference: 'TGT-2026-82310',
    merchant: 'Target',
    purchaseDate: '2026-11-01',
    amount: 63.47,
    currency: 'USD',
    items: [
      { name: 'Hand Soap (3-pack)', quantity: 1, price: 11.97 },
      { name: 'Dish Towels — Striped (set of 4)', quantity: 1, price: 16.00 },
      { name: 'Stainless Steel Water Bottle', quantity: 1, price: 19.99 },
      { name: 'LED Desk Lamp', quantity: 1, price: 15.51 },
    ],
    status: 'completed',
    hasRefund: false,
  },
  {
    id: 'ord_012',
    orderReference: 'NKE-2026-40881',
    merchant: 'Nike',
    purchaseDate: '2026-10-20',
    amount: 85.00,
    currency: 'USD',
    items: [
      { name: 'Dri-FIT Running Shorts', quantity: 1, price: 45.00 },
      { name: 'Training T-Shirt', quantity: 1, price: 40.00 },
    ],
    status: 'completed',
    hasRefund: false,
  },
];

// ---- Demo Notifications ----

export const demoNotifications: Notification[] = [
  {
    id: 'ntf_001',
    type: 'refund_update',
    title: 'Refund Completed',
    message: 'Your Amazon refund of $149.99 has been deposited to your PayPal account.',
    timestamp: '2026-09-26T14:22:00Z',
    read: true,
    actionUrl: '/refunds/ref_001',
    refundId: 'ref_001',
  },
  {
    id: 'ntf_002',
    type: 'refund_update',
    title: 'Refund Processing',
    message: "Your Nike refund is being reviewed. We'll notify you when there's an update.",
    timestamp: '2026-10-07T09:15:00Z',
    read: true,
    actionUrl: '/refunds/ref_002',
    refundId: 'ref_002',
  },
  {
    id: 'ntf_003',
    type: 'alert',
    title: 'Refund Delayed',
    message: 'Your Apple refund has been delayed due to a shipping hold. New estimated date: Oct 30.',
    timestamp: '2026-10-18T11:30:00Z',
    read: false,
    actionUrl: '/refunds/ref_003',
    refundId: 'ref_003',
  },
  {
    id: 'ntf_004',
    type: 'refund_update',
    title: 'Spotify Refund Completed',
    message: 'Your duplicate-charge refund of $9.99 from Spotify is complete.',
    timestamp: '2026-10-15T16:45:00Z',
    read: true,
    refundId: 'ref_004',
  },
  {
    id: 'ntf_005',
    type: 'alert',
    title: 'Action Required — Best Buy',
    message: 'Best Buy needs you to return the incorrect item. Print your prepaid label before Nov 7.',
    timestamp: '2026-10-24T08:00:00Z',
    read: false,
    actionUrl: '/refunds/ref_006',
    refundId: 'ref_006',
  },
  {
    id: 'ntf_006',
    type: 'reminder',
    title: 'Return Deadline Approaching',
    message: "You have 14 days left to return the item to Best Buy. Don't miss the window!",
    timestamp: '2026-10-26T10:00:00Z',
    read: false,
    actionUrl: '/refunds/ref_006',
    refundId: 'ref_006',
  },
  {
    id: 'ntf_007',
    type: 'info',
    title: 'Weekly Refund Summary',
    message: 'This week: 2 refunds completed ($224.99 total), 1 new request submitted, 1 action required.',
    timestamp: '2026-10-27T08:00:00Z',
    read: false,
  },
  {
    id: 'ntf_008',
    type: 'refund_update',
    title: 'Target Refund Issued',
    message: 'Target has issued your refund of $74.97. It should arrive in your PayPal within 2-3 business days.',
    timestamp: '2026-10-28T13:10:00Z',
    read: false,
    actionUrl: '/refunds/ref_007',
    refundId: 'ref_007',
  },
  {
    id: 'ntf_009',
    type: 'info',
    title: 'Tip: Speed Up Refunds',
    message: 'Did you know? Providing photos of damaged items can reduce refund processing time by up to 40%.',
    timestamp: '2026-10-29T09:00:00Z',
    read: true,
  },
  {
    id: 'ntf_010',
    type: 'refund_update',
    title: 'New Refund Submitted',
    message: 'Your refund request for Amazon order AMZ-2026-60218 ($59.99) has been submitted.',
    timestamp: '2026-11-01T10:05:00Z',
    read: false,
    actionUrl: '/refunds/ref_009',
    refundId: 'ref_009',
  },
];

// ---- Demo Analytics ----

export const demoAnalytics: AnalyticsData = {
  totalRefunds: 9,
  totalRefundAmount: 1564.37,
  pendingAmount: 614.43,
  completedAmount: 374.98,
  successRate: 88.9,
  averageRefundTime: 6.2,
  monthlyTrends: [
    { month: 'Jun 2026', refunds: 2, amount: 85.00, completed: 2 },
    { month: 'Jul 2026', refunds: 3, amount: 210.50, completed: 2 },
    { month: 'Aug 2026', refunds: 1, amount: 45.00, completed: 1 },
    { month: 'Sep 2026', refunds: 3, amount: 514.98, completed: 2 },
    { month: 'Oct 2026', refunds: 5, amount: 939.40, completed: 2 },
    { month: 'Nov 2026', refunds: 1, amount: 59.99, completed: 0 },
  ],
  merchantBreakdown: [
    { merchant: 'Apple', totalRefunds: 1, totalAmount: 499.99, averageTime: 12, successRate: 100 },
    { merchant: 'Best Buy', totalRefunds: 1, totalAmount: 329.99, averageTime: 0, successRate: 0 },
    { merchant: 'Amazon', totalRefunds: 2, totalAmount: 209.98, averageTime: 7, successRate: 100 },
    { merchant: 'Airbnb', totalRefunds: 1, totalAmount: 215.00, averageTime: 7, successRate: 100 },
    { merchant: 'Nike', totalRefunds: 1, totalAmount: 189.95, averageTime: 0, successRate: 0 },
  ],
  statusDistribution: [
    { status: 'completed', count: 3, percentage: 33.3 },
    { status: 'processing', count: 1, percentage: 11.1 },
    { status: 'approved', count: 1, percentage: 11.1 },
    { status: 'issued', count: 1, percentage: 11.1 },
    { status: 'delayed', count: 1, percentage: 11.1 },
    { status: 'action_required', count: 1, percentage: 11.1 },
    { status: 'requested', count: 1, percentage: 11.1 },
  ],
};

export const demoAnalyticsData = demoAnalytics;
export const demoMonthlyTrends = demoAnalytics.monthlyTrends;
export const demoMerchantBreakdown = demoAnalytics.merchantBreakdown;
export const demoStatusDistribution = demoAnalytics.statusDistribution;

// ---- Demo User ----

export const demoUser: User = {
  id: 'usr_001',
  name: 'Alex Morgan',
  email: 'alex.morgan@email.com',
  joinedDate: '2026-06-15',
  paypalConnected: true,
  notificationPreferences: {
    emailNotifications: true,
    pushNotifications: true,
    refundUpdates: true,
    weeklyDigest: true,
    marketingEmails: false,
  },
};

// ---- Demo AI Insights ----

export const demoInsights: AIInsight[] = [
  {
    id: 'ins_001',
    title: 'High-value refund delayed',
    description:
      'Your Apple refund ($499.99) has been in a delayed state for 8 days. Consider contacting Apple Support directly to expedite the return process.',
    type: 'warning',
    actionText: 'View Refund',
    actionUrl: '/refunds/ref_003',
  },
  {
    id: 'ins_002',
    title: 'Action needed for Best Buy return',
    description:
      'Best Buy requires you to ship the item back within 14 days. The deadline is November 7 — print your label soon to avoid forfeiting the refund.',
    type: 'warning',
    actionText: 'Take Action',
    actionUrl: '/refunds/ref_006',
  },
  {
    id: 'ins_003',
    title: 'Amazon refunds are fast',
    description:
      'Your Amazon refunds are completed in an average of 8 days, which is 30% faster than the platform average. Keep requesting through PayPal for the quickest turnaround.',
    type: 'success',
  },
  {
    id: 'ins_004',
    title: 'Duplicate charges detected',
    description:
      'We noticed recurring charges from Spotify. Your October duplicate was refunded — keep an eye on your November statement to make sure it doesn\'t happen again.',
    type: 'tip',
    actionText: 'View Orders',
    actionUrl: '/orders',
  },
  {
    id: 'ins_005',
    title: 'Monthly refund activity up',
    description:
      "You've submitted 5 refund requests in October, up from 3 in September. This is within normal range, but if you're seeing patterns with a specific merchant, we can help investigate.",
    type: 'info',
  },
];

export const demoAIInsights = demoInsights;

// ---- Demo Chat Messages ----

export const demoChatMessages: ChatMessage[] = [
  {
    id: 'msg_001',
    role: 'assistant',
    content:
      'Hi Alex! 👋 I\'m your RefundRadar assistant. I can help you track refunds, understand statuses, and navigate the process. What can I help you with today?',
    timestamp: '2026-11-03T08:00:00Z',
  },
  {
    id: 'msg_002',
    role: 'assistant',
    content:
      'Quick heads-up: you have **1 refund that needs your action** (Best Buy return label) and **1 delayed refund** (Apple). Want me to walk you through either?',
    timestamp: '2026-11-03T08:00:05Z',
  },
];

// ---- Demo Assistant Suggestions ----

export const demoSuggestions: AssistantSuggestion[] = [
  { id: 'sug_001', text: 'Where is my refund?', icon: 'search' },
  { id: 'sug_002', text: 'What does processing mean?', icon: 'help-circle' },
  { id: 'sug_003', text: 'Why is my refund delayed?', icon: 'clock' },
  { id: 'sug_004', text: 'How do I contact a merchant?', icon: 'message-circle' },
  { id: 'sug_005', text: 'Show my refund summary', icon: 'bar-chart' },
  { id: 'sug_006', text: 'What action is required?', icon: 'alert-triangle' },
  { id: 'sug_007', text: 'How long do refunds take?', icon: 'timer' },
  { id: 'sug_008', text: 'Tips to speed up refunds', icon: 'zap' },
];

export const demoAssistantSuggestions = demoSuggestions;

// ---- Dashboard Stats (computed from refund data) ----

export const demoDashboardStats: DashboardStats = {
  totalRefundAmount: demoRefunds.reduce((sum, r) => sum + r.refundAmount, 0),
  pendingRefunds: demoRefunds.filter((r) =>
    ['requested', 'processing', 'approved', 'issued'].includes(r.status),
  ).length,
  completedRefunds: demoRefunds.filter((r) => r.status === 'completed').length,
  actionRequired: demoRefunds.filter((r) =>
    ['action_required', 'delayed'].includes(r.status),
  ).length,
  currency: 'USD',
};
