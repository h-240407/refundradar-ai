import { Router } from 'express';
import { aiService } from '../services/aiService.js';

export const assistantRouter = Router();

// POST /api/assistant/chat
assistantRouter.post('/chat', async (req, res) => {
  const { message } = req.body as { message?: string };

  if (!message || !message.trim()) {
    res.status(400).json({ success: false, message: 'Message text is required' });
    return;
  }

  try {
    const aiResult = await aiService.generateResponse(message.trim());
    res.json({
      success: true,
      data: {
        id: `msg_${Date.now()}`,
        role: 'assistant',
        content: aiResult.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: aiResult.model,
        source: aiResult.source,
      },
    });
  } catch (err: any) {
    console.error('[Assistant Route] Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to process assistant prompt',
      error: err?.message,
    });
  }
});

