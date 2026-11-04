// ============================================================
// RefundRadar AI — Assistant Service
// ============================================================
// TODO: Replace with actual AI/LLM backend when ready

import type { ChatMessage, AssistantSuggestion } from '../types';
import { demoSuggestions, demoRefunds } from '../data/mockData';
import { API_BASE } from './apiConfig';

const delay = (ms = 600) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---- Pattern-matched demo responses ----

interface ResponsePattern {
  patterns: string[];
  response: string;
}

const responsePatterns: ResponsePattern[] = [
  {
    patterns: ['where is my refund', 'track refund', 'refund status', 'check refund', 'find refund'],
    response:
      `Here's a quick overview of your active refunds:\n\n` +
      `• **Nike** ($189.95) — Currently *processing*. Nike is reviewing your request; expect an update within 3-5 business days.\n` +
      `• **Apple** ($499.99) — *Delayed*. The return shipment is held up in transit. I recommend contacting Apple Support directly for an expedited resolution.\n` +
      `• **Best Buy** ($329.99) — *Action required*. You need to print and ship the return label before November 7.\n` +
      `• **Amazon** ($59.99) — Just *requested*. Amazon typically processes these within 5-7 days.\n\n` +
      `Would you like details on any of these?`,
  },
  {
    patterns: ['processing', 'what does processing mean', 'processing status'],
    response:
      `Great question! When a refund shows **"Processing"**, it means the merchant has received your request and is reviewing it. Here's what typically happens:\n\n` +
      `1. The merchant verifies your order and reason for the return.\n` +
      `2. They may check warehouse or delivery records.\n` +
      `3. Once confirmed, the refund moves to **Approved**.\n\n` +
      `Processing usually takes **3-7 business days**, depending on the merchant. Your Nike refund has been processing for about 4 days — that's still within the normal window. Sit tight! 😊`,
  },
  {
    patterns: ['delayed', 'why is my refund delayed', 'taking so long', 'slow refund'],
    response:
      `Refund delays can happen for a few reasons:\n\n` +
      `• **Return shipping delays** — The item hasn't reached the merchant's warehouse yet.\n` +
      `• **Merchant review backlog** — High volume periods (holidays, sales events) slow things down.\n` +
      `• **Payment processor hold** — PayPal or bank processing can add 1-3 business days.\n` +
      `• **Missing information** — The merchant may need additional details from you.\n\n` +
      `Your Apple refund ($499.99) is currently delayed due to a return shipment hold. I'd suggest reaching out to Apple Support at **1-800-275-2273** or through their online chat for a status update.`,
  },
  {
    patterns: ['contact merchant', 'reach out', 'customer service', 'support number', 'how to contact'],
    response:
      `Here are the customer support channels for your recent merchants:\n\n` +
      `• **Amazon** — [amazon.com/contact-us](https://amazon.com) or call 1-888-280-4331\n` +
      `• **Apple** — [support.apple.com](https://support.apple.com) or call 1-800-275-2273\n` +
      `• **Nike** — [nike.com/help](https://nike.com/help) or call 1-800-806-6453\n` +
      `• **Best Buy** — [bestbuy.com/support](https://bestbuy.com) or call 1-888-237-8289\n` +
      `• **Target** — [target.com/contact-us](https://target.com) or call 1-800-591-3869\n\n` +
      `When you contact them, have your order reference number ready. Would you like me to copy one for you?`,
  },
  {
    patterns: ['summary', 'show summary', 'refund summary', 'overview', 'dashboard'],
    response:
      `Here's your refund summary at a glance:\n\n` +
      `💰 **Total refund value**: $1,564.37 across 9 refunds\n` +
      `✅ **Completed**: 3 refunds ($374.98)\n` +
      `⏳ **In progress**: 4 refunds ($614.43)\n` +
      `⚠️ **Needs attention**: 2 refunds (1 delayed, 1 action required)\n` +
      `📊 **Success rate**: 88.9%\n` +
      `⏱️ **Avg. processing time**: 6.2 days\n\n` +
      `Your October was the busiest month with 5 refund requests. Want to dive deeper into any of these numbers?`,
  },
  {
    patterns: ['action required', 'what action', 'what do i need to do', 'pending action'],
    response:
      `You have **1 refund** that needs your immediate action:\n\n` +
      `📦 **Best Buy** (Order BBY-2026-42910) — $329.99\n` +
      `They need you to **print the prepaid return label** and ship the Samsung Galaxy Buds back. The deadline is **November 7, 2026**.\n\n` +
      `If you miss this window, the refund request may be cancelled. Would you like me to take you to that refund's detail page?`,
  },
  {
    patterns: ['how long', 'refund time', 'how many days', 'when will i get', 'estimated time'],
    response:
      `Refund timelines vary by merchant, but here's what I've seen from your history:\n\n` +
      `• **Amazon**: ~7-8 days (fastest in your history)\n` +
      `• **Spotify**: ~3 days (subscription refunds are quick)\n` +
      `• **Airbnb**: ~7 days\n` +
      `• **Apple**: ~10-14 days (currently delayed for you)\n` +
      `• **Nike**: ~7-10 days (currently processing)\n\n` +
      `On average, your refunds take about **6.2 days** to complete — that's faster than the industry average of 10 days! 🎉`,
  },
  {
    patterns: ['speed up', 'faster', 'tips', 'expedite', 'quicker'],
    response:
      `Here are some tips to speed up your refunds:\n\n` +
      `1. **Provide photos** — Attach images of damaged/wrong items when filing. This can cut processing time by 40%.\n` +
      `2. **Ship returns ASAP** — Don't wait on return labels. The sooner the merchant receives the item, the faster the refund.\n` +
      `3. **Use merchant chat** — Online chat support often resolves issues faster than email.\n` +
      `4. **Check for instant refunds** — Amazon and some merchants offer instant refunds on return initiation.\n` +
      `5. **Keep PayPal connected** — PayPal refunds process 1-2 days faster than credit card refunds.\n\n` +
      `Your PayPal is already connected — that's a great start! 👍`,
  },
];

const fallbackResponse =
  `I appreciate the question! While I'm still learning, here are a few things I can help you with right now:\n\n` +
  `• **Track your refunds** — Ask "Where is my refund?"\n` +
  `• **Understand statuses** — Ask "What does processing mean?"\n` +
  `• **Get merchant contacts** — Ask "How do I contact a merchant?"\n` +
  `• **View your summary** — Ask "Show my refund summary"\n\n` +
  `Is there anything specific about your refunds I can help with?`;

function findResponse(message: string): string {
  const normalised = message.toLowerCase().trim();

  for (const { patterns, response } of responsePatterns) {
    if (patterns.some((p) => normalised.includes(p))) {
      return response;
    }
  }

  // Check if the message mentions a specific merchant
  const mentionedMerchant = demoRefunds.find((r) =>
    normalised.includes(r.merchant.toLowerCase()),
  );

  if (mentionedMerchant) {
    return (
      `Here's the latest on your **${mentionedMerchant.merchant}** refund:\n\n` +
      `• **Order**: ${mentionedMerchant.orderReference}\n` +
      `• **Amount**: $${mentionedMerchant.refundAmount.toFixed(2)}\n` +
      `• **Status**: ${mentionedMerchant.status.replace('_', ' ')}\n` +
      `• **Last Updated**: ${mentionedMerchant.lastUpdated}\n` +
      (mentionedMerchant.estimatedCompletionDate
        ? `• **Estimated Completion**: ${mentionedMerchant.estimatedCompletionDate}\n`
        : '') +
      `\nWould you like more details or help with this refund?`
    );
  }

  return fallbackResponse;
}

/** Send a user message and receive a contextual assistant response. */
export async function sendMessage(message: string): Promise<ChatMessage> {
  // 1. Attempt live backend AI endpoint
  try {
    const res = await fetch(`${API_BASE}/api/assistant/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return {
          id: data.data.id || `msg_${Date.now()}`,
          role: 'assistant',
          content: data.data.content,
          timestamp: new Date().toISOString(),
        };
      }
    }
  } catch {
    // Backend offline or unreachable — fallback to local pattern matching
  }

  // 2. Local Fallback Pattern Matching
  await delay(400);
  const responseContent = findResponse(message);

  const response: ChatMessage = {
    id: `msg_${Date.now()}`,
    role: 'assistant',
    content: responseContent,
    timestamp: new Date().toISOString(),
  };

  return response;
}

/** Get the list of quick suggestion chips. */
export async function getSuggestions(): Promise<AssistantSuggestion[]> {
  await delay(200);
  return [...demoSuggestions];
}

export const assistantService = {
  sendMessage,
  getSuggestions,
};

export default assistantService;
