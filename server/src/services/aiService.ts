import { GoogleGenerativeAI } from '@google/generative-ai';
import { store } from '../data/store.js';

const SYSTEM_INSTRUCTION = `You are RefundRadar AI Copilot, an intelligent consumer fintech assistant built for the PayPal AI Hackathon 2026.
Your primary mission is to help everyday consumers navigate confusing return policies, merchant delays, bank hold periods, and PayPal dispute escalations.

Guidelines:
1. Explain financial jargon (e.g. "Processing", "Settlement Batch", "Return Hold", "Chargeback") into clear, friendly, and actionable English.
2. When answering, refer to the user's active refunds and orders provided in the context when relevant.
3. Be reassuring, concise, and structured with bullet points.
4. If a return is delayed or requires customer action (e.g. shipping a prepaid label), provide exact step-by-step guidance and merchant customer support contacts.
5. Emphasize PayPal buyer protection timeline windows (up to 180 days to dispute if the seller fails to refund).`;

// Fallback rule engine when no Gemini key is provided
interface FallbackPattern {
  patterns: string[];
  response: () => string;
}

const fallbackPatterns: FallbackPattern[] = [
  {
    patterns: ['where is my refund', 'track refund', 'refund status', 'check refund', 'status'],
    response: () => {
      const refunds = store.getRefunds();
      let res = "Here is a live summary of your active refund pipeline:\n\n";
      refunds.slice(0, 4).forEach((r) => {
        res += `• **${r.merchant}** ($${r.refundAmount.toFixed(2)}) — Status: *${r.status.replace('_', ' ')}*. Order Ref: ${r.orderReference}\n`;
      });
      res += "\nWould you like more details on any specific refund or return shipment?";
      return res;
    },
  },
  {
    patterns: ['processing', 'what does processing mean'],
    response: () =>
      `When a refund status shows **"Processing"**, it means the merchant has accepted your return request and is verifying the returned merchandise in their fulfillment center.\n\n` +
      `• Typically takes **3–7 business days**.\n` +
      `• Once verified, funds are released to your original payment method (PayPal or bank).\n` +
      `• PayPal refunds typically reflect 1–2 days faster than traditional bank debit card reversals.`,
  },
  {
    patterns: ['delayed', 'why is my refund delayed', 'taking so long'],
    response: () => {
      const delayed = store.getRefunds().filter((r) => r.status === 'delayed');
      if (delayed.length > 0) {
        return (
          `You have **${delayed.length} refund** flagged as delayed:\n\n` +
          delayed
            .map(
              (r) =>
                `• **${r.merchant}** ($${r.refundAmount.toFixed(2)}): ${
                  r.reason || 'Transit or merchant inspection hold'
                }. Est. Completion: ${r.estimatedCompletionDate || 'Pending'}`
            )
            .join('\n') +
          `\n\nI recommend contacting the merchant's support desk or monitoring PayPal Resolution Center if the delay exceeds 14 days.`
        );
      }
      return "None of your current tracked refunds are flagged as delayed! Everything in your pipeline is moving normally.";
    },
  },
  {
    patterns: ['action required', 'what action', 'pending action'],
    response: () => {
      const action = store.getRefunds().filter((r) => r.status === 'action_required');
      if (action.length > 0) {
        return (
          `You have **${action.length} refund** requiring your immediate attention:\n\n` +
          action
            .map(
              (r) =>
                `• **${r.merchant}** ($${r.refundAmount.toFixed(2)}): Please drop off your packaged item with the prepaid return label before the merchant deadline.`
            )
            .join('\n')
        );
      }
      return "Great news — you have zero pending actions required on your active refunds!";
    },
  },
];

export class AIService {
  private genAI: GoogleGenerativeAI | null = null;
  private hasKey: boolean = false;

  constructor() {
    const key = process.env.GEMINI_API_KEY;
    if (key && key.trim() && key !== 'your_gemini_api_key_here') {
      try {
        this.genAI = new GoogleGenerativeAI(key.trim());
        this.hasKey = true;
      } catch (err) {
        console.warn('[AIService] Failed to initialize GoogleGenerativeAI client', err);
      }
    }
  }

  async generateResponse(userMessage: string): Promise<{
    content: string;
    model: string;
    source: 'gemini' | 'rule_engine';
  }> {
    const query = userMessage.trim();

    // 1. If Gemini is available, call it with rich context
    if (this.hasKey && this.genAI) {
      try {
        const refunds = store.getRefunds();
        const orders = store.getOrders();
        const stats = store.getStats();

        const context = `Active Consumer Claims Context:
Total Pipeline Amount: $${stats.totalRefundAmount.toFixed(2)} across ${refunds.length} claims.
Pending Claims: ${stats.pendingRefunds}, Completed: ${stats.completedRefunds}, Action Required: ${stats.actionRequired}.

Active Refunds Data:
${JSON.stringify(refunds, null, 2)}

Orders Data:
${JSON.stringify(orders.slice(0, 5), null, 2)}

User Question: ${query}`;

        const model = this.genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          systemInstruction: SYSTEM_INSTRUCTION,
        });

        const result = await model.generateContent(context);
        const response = await result.response;
        const text = response.text();

        if (text && text.trim()) {
          return {
            content: text.trim(),
            model: 'gemini-1.5-flash',
            source: 'gemini',
          };
        }
      } catch (err) {
        console.error('[AIService] Gemini API error, falling back to local intelligence', err);
      }
    }

    // 2. Local Fallback Pattern Matcher
    const normalized = query.toLowerCase();
    for (const item of fallbackPatterns) {
      if (item.patterns.some((p) => normalized.includes(p))) {
        return {
          content: item.response(),
          model: 'refundradar-rule-engine-v1',
          source: 'rule_engine',
        };
      }
    }

    // Check if user asked about a specific merchant
    const matchedMerchant = store.getRefunds().find((r) =>
      normalized.includes(r.merchant.toLowerCase())
    );
    if (matchedMerchant) {
      return {
        content:
          `Here is the latest status for your **${matchedMerchant.merchant}** refund:\n\n` +
          `• **Order Reference**: ${matchedMerchant.orderReference}\n` +
          `• **Amount**: $${matchedMerchant.refundAmount.toFixed(2)}\n` +
          `• **Status**: ${matchedMerchant.status.replace('_', ' ').toUpperCase()}\n` +
          `• **Timeline**: ${matchedMerchant.timeline.length} progress events recorded\n` +
          (matchedMerchant.estimatedCompletionDate
            ? `• **Est. Completion**: ${matchedMerchant.estimatedCompletionDate}\n`
            : '') +
          `\nLet me know if you would like me to draft an inquiry email or verify PayPal dispute windows for this merchant.`,
        model: 'refundradar-rule-engine-v1',
        source: 'rule_engine',
      };
    }

    // Generic helpful response
    return {
      content:
        `I am your **RefundRadar AI Copilot**. I can help you with:\n\n` +
        `• **Track claim updates** — Ask *"Where is my refund?"* or name a merchant (e.g. *"What's happening with Apple?"*)\n` +
        `• **Understand status stages** — Ask *"What does processing mean?"*\n` +
        `• **Resolve issues** — Ask *"Why is my refund delayed?"* or *"What actions do I need to take?"*\n` +
        `• **PayPal dispute guidance** — Inquire about dispute windows and transaction reconciliation.\n\n` +
        `How can I assist your financial recovery today?`,
      model: 'refundradar-rule-engine-v1',
      source: 'rule_engine',
    };
  }
}

export const aiService = new AIService();
