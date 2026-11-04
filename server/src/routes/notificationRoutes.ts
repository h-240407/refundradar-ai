import { Router } from 'express';
import { store } from '../data/store.js';

export const notificationRouter = Router();

// GET /api/notifications
notificationRouter.get('/', (_req, res) => {
  const notifications = store.getNotifications();
  res.json({
    success: true,
    count: notifications.length,
    unreadCount: notifications.filter((n) => !n.read).length,
    data: notifications,
  });
});

// PATCH /api/notifications/:id/read
notificationRouter.patch('/:id/read', (req, res) => {
  const ok = store.markNotificationRead(req.params.id);
  if (!ok) {
    res.status(404).json({ success: false, message: 'Notification not found' });
    return;
  }
  res.json({ success: true, message: 'Notification marked as read' });
});

// POST /api/notifications/mark-all-read
notificationRouter.post('/mark-all-read', (_req, res) => {
  store.markAllNotificationsRead();
  res.json({ success: true, message: 'All notifications marked as read' });
});

