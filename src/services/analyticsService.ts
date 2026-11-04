// ============================================================
// RefundRadar AI — Analytics Service
// ============================================================
// TODO: Replace with actual API calls when backend is ready

import type { AnalyticsData, MonthlyTrend, MerchantBreakdown } from '../types';
import { demoAnalytics, DEMO_MODE } from '../data/mockData';

const delay = (ms = 500) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface DateRange {
  from?: string;
  to?: string;
}

/** Get the full analytics payload. */
export async function getAnalyticsData(_dateRange?: DateRange): Promise<AnalyticsData> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay();
  return { ...demoAnalytics };
}

/** Get monthly trend data. */
export async function getMonthlyTrends(): Promise<MonthlyTrend[]> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(300);
  return [...demoAnalytics.monthlyTrends];
}

/** Get merchant-level refund breakdown. */
export async function getMerchantBreakdown(): Promise<MerchantBreakdown[]> {
  if (!DEMO_MODE) {
    throw new Error('Backend not connected');
  }

  await delay(300);
  return [...demoAnalytics.merchantBreakdown];
}
