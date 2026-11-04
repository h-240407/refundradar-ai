import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { refundRouter } from './routes/refundRoutes.js';
import { orderRouter } from './routes/orderRoutes.js';
import { notificationRouter } from './routes/notificationRoutes.js';
import { assistantRouter } from './routes/assistantRoutes.js';
import { paypalRouter } from './routes/paypalRoutes.js';
import { store } from './data/store.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/refunds', refundRouter);
app.use('/api/orders', orderRouter);
app.use('/api/notifications', notificationRouter);
app.use('/api/assistant', assistantRouter);
app.use('/api/paypal', paypalRouter);

// Health & Diagnostic Endpoint
app.get('/api/health', (_req, res) => {
  const stats = store.getStats();
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'RefundRadar AI Backend',
    version: '1.0.0',
    paypal: {
      mode: process.env.PAYPAL_MODE || 'sandbox',
      configured: !!process.env.PAYPAL_CLIENT_ID,
    },
    ai: {
      provider: 'Google Gemini',
      geminiKeyConfigured: !!(
        process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
      ),
    },
    database: {
      claimsCount: store.getRefunds().length,
      ordersCount: store.getOrders().length,
      notificationsCount: store.getNotifications().length,
      totalPipelineValue: stats.totalRefundAmount,
    },
  });
});

// Reset endpoint
app.post('/api/reset', (_req, res) => {
  store.reset();
  res.json({ success: true, message: 'Database reset to default seed records' });
});

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 RefundRadar AI Backend Server Running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`💳 PayPal Mode: ${process.env.PAYPAL_MODE || 'sandbox'}`);
  console.log(`🧠 AI Engine: Google Gemini API (${process.env.GEMINI_API_KEY ? 'Configured' : 'Simulated / Rule-engine Mode'})`);
  console.log(`======================================================\n`);
});

