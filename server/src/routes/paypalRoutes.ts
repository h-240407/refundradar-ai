import { Router } from 'express';
import { paypalService } from '../services/paypalService.js';

export const paypalRouter = Router();

// GET /api/paypal/status - check sandbox credentials and status
paypalRouter.get('/status', async (_req, res) => {
  try {
    const status = await paypalService.getConnectionStatus();
    res.json({ success: true, data: status });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message });
  }
});

// POST /api/paypal/sync - trigger manual sync with PayPal sandbox
paypalRouter.post('/sync', async (_req, res) => {
  try {
    const result = await paypalService.syncSandboxTransactions();
    res.json({ success: true, data: result });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message });
  }
});

// POST /api/paypal/webhook - receive developer sandbox webhooks
paypalRouter.post('/webhook', async (req, res) => {
  try {
    const result = await paypalService.handleWebhook(req.body);
    res.json({ success: true, data: result });
  } catch (err: any) {
    console.error('[PayPal Webhook] Error:', err);
    res.status(500).json({ success: false, error: err?.message });
  }
});

