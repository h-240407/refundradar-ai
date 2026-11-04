import { Router } from 'express';
import { store } from '../data/store.js';
import type { Refund, RefundStatus, Notification } from '../types/index.js';

export const refundRouter = Router();

// GET /api/refunds - list refunds with optional filtering
refundRouter.get('/', (req, res) => {
  const { status, merchant, search } = req.query;
  let results = store.getRefunds();

  if (status && status !== 'all') {
    results = results.filter((r) => r.status === status);
  }

  if (merchant) {
    results = results.filter((r) =>
      r.merchant.toLowerCase().includes(String(merchant).toLowerCase())
    );
  }

  if (search) {
    const q = String(search).toLowerCase();
    results = results.filter(
      (r) =>
        r.merchant.toLowerCase().includes(q) ||
        r.orderReference.toLowerCase().includes(q) ||
        r.reason?.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results,
  });
});

// GET /api/refunds/stats - dashboard level stats
refundRouter.get('/stats', (_req, res) => {
  const stats = store.getStats();
  res.json({
    success: true,
    data: stats,
  });
});

// GET /api/refunds/:id - single refund
refundRouter.get('/:id', (req, res) => {
  const refund = store.getRefundById(req.params.id);
  if (!refund) {
    res.status(404).json({ success: false, message: 'Refund not found' });
    return;
  }
  res.json({ success: true, data: refund });
});

// POST /api/refunds - create a new refund
refundRouter.post('/', (req, res) => {
  const body = req.body;
  const nowStr = new Date().toISOString().split('T')[0];

  if (!body.merchant || !body.refundAmount) {
    res.status(400).json({ success: false, message: 'Merchant and refundAmount are required' });
    return;
  }

  const newRefund: Refund = {
    id: `ref_${Date.now()}`,
    orderId: body.orderId || `ord_${Date.now()}`,
    orderReference: body.orderReference || 'REF-CUSTOM',
    merchant: body.merchant,
    merchantLogo: body.merchantLogo,
    purchaseDate: body.purchaseDate || nowStr,
    refundAmount: Number(body.refundAmount),
    originalAmount: Number(body.originalAmount || body.refundAmount),
    currency: body.currency || 'USD',
    requestDate: body.requestDate || nowStr,
    status: body.status || 'requested',
    lastUpdated: nowStr,
    reason: body.reason || 'User submitted refund claim',
    notes: body.notes,
    paypalTransactionId: body.paypalTransactionId,
    estimatedCompletionDate: body.estimatedCompletionDate,
    timeline: body.timeline || [
      {
        status: body.status || 'requested',
        date: nowStr,
        description: body.reason || 'Refund journey initiated.',
      },
    ],
  };

  const created = store.createRefund(newRefund);

  // Add auto notification
  const notif: Notification = {
    id: `notif_${Date.now()}`,
    type: 'refund_update',
    title: `Refund Filed: ${created.merchant}`,
    message: `A new refund claim for $${created.refundAmount.toFixed(2)} is being tracked.`,
    timestamp: new Date().toISOString(),
    read: false,
    refundId: created.id,
    actionUrl: `/app/refunds/${created.id}`,
  };
  store.addNotification(notif);

  res.status(201).json({ success: true, data: created });
});

// PATCH /api/refunds/:id/status - update status
refundRouter.patch('/:id/status', (req, res) => {
  const { status, note } = req.body as { status: RefundStatus; note?: string };
  if (!status) {
    res.status(400).json({ success: false, message: 'Status is required' });
    return;
  }

  const updated = store.updateRefundStatus(req.params.id, status, note);
  if (!updated) {
    res.status(404).json({ success: false, message: 'Refund not found' });
    return;
  }

  res.json({ success: true, data: updated });
});

// POST /api/refunds/:id/notes - append note
refundRouter.post('/:id/notes', (req, res) => {
  const { note } = req.body as { note: string };
  if (!note || !note.trim()) {
    res.status(400).json({ success: false, message: 'Note text is required' });
    return;
  }

  const updated = store.addRefundNote(req.params.id, note.trim());
  if (!updated) {
    res.status(404).json({ success: false, message: 'Refund not found' });
    return;
  }

  res.json({ success: true, data: updated });
});
