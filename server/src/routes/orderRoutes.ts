import { Router } from 'express';
import { store } from '../data/store.js';
import type { Order } from '../types/index.js';

export const orderRouter = Router();

// GET /api/orders
orderRouter.get('/', (req, res) => {
  const { status, search } = req.query;
  let results = store.getOrders();

  if (status && status !== 'all') {
    results = results.filter((o) => o.status === status);
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (o) =>
        o.merchant.toLowerCase().includes(q) ||
        o.orderReference.toLowerCase().includes(q) ||
        o.items.some((item) => item.name.toLowerCase().includes(q))
    );
  }

  res.json({ success: true, count: results.length, data: results });
});

// GET /api/orders/:id
orderRouter.get('/:id', (req, res) => {
  const order = store.getOrderById(req.params.id);
  if (!order) {
    res.status(404).json({ success: false, message: 'Order not found' });
    return;
  }
  res.json({ success: true, data: order });
});

// POST /api/orders
orderRouter.post('/', (req, res) => {
  const body = req.body;
  const nowStr = new Date().toISOString().split('T')[0];

  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    orderReference: body.orderReference || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
    merchant: body.merchant || 'Retail Merchant',
    merchantLogo: body.merchantLogo,
    purchaseDate: body.purchaseDate || nowStr,
    amount: Number(body.amount) || 0,
    currency: body.currency || 'USD',
    status: body.status || 'completed',
    hasRefund: false,
    paypalTransactionId: body.paypalTransactionId,
    items: body.items && body.items.length > 0 ? body.items : [
      { name: 'General Item', quantity: 1, price: Number(body.amount) || 0 },
    ],
  };

  const created = store.createOrder(newOrder);
  res.status(201).json({ success: true, data: created });
});

