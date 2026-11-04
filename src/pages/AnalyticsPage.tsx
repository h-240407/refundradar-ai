import React, { useState } from 'react';
import {
  BarChart3,
  Clock,
  CheckCircle,
  DollarSign,
  Download,
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { MonthlyTrendsChart } from '../components/analytics/MonthlyTrendsChart';
import { StatusDistributionChart } from '../components/analytics/StatusDistributionChart';
import { MerchantBreakdownChart } from '../components/analytics/MerchantBreakdownChart';
import { SuccessRateChart } from '../components/analytics/SuccessRateChart';
import { Button } from '../components/ui/Button';
import { useApp } from '../context';
import {
  demoAnalyticsData,
  demoMonthlyTrends,
  demoMerchantBreakdown,
  demoStatusDistribution,
} from '../data/mockData';

export const AnalyticsPage: React.FC = () => {
  const { refunds, stats } = useApp();
  const [sortField, setSortField] = useState<'totalAmount' | 'totalRefunds' | 'averageTime'>('totalAmount');

  const sortedMerchants = [...demoMerchantBreakdown].sort((a, b) => b[sortField] - a[sortField]);

  const handleExportCSV = () => {
    const headers = [
      'Refund ID',
      'Merchant',
      'Order Reference',
      'Purchase Date',
      'Request Date',
      'Refund Amount ($)',
      'Currency',
      'Status',
      'Last Updated',
      'PayPal Transaction ID',
    ];

    const rows = refunds.map((r) => [
      r.id,
      `"${r.merchant.replace(/"/g, '""')}"`,
      `"${r.orderReference}"`,
      r.purchaseDate,
      r.requestDate,
      r.refundAmount.toFixed(2),
      r.currency,
      r.status,
      r.lastUpdated,
      r.paypalTransactionId || 'N/A',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `refundradar_analytics_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Financial & Recovery Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Data insights on merchant performance, average turnaround speeds, and payout metrics.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          icon={<Download className="w-4 h-4" />}
          onClick={handleExportCSV}
        >
          Export Report (.CSV)
        </Button>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Claims Tracked"
          value={refunds.length}
          icon={<BarChart3 className="w-5 h-5" />}
          subtitle="All-time requests"
          variant="brand"
        />
        <StatCard
          title="Overall Success Rate"
          value={`${demoAnalyticsData.successRate}%`}
          icon={<CheckCircle className="w-5 h-5" />}
          trend="+3.5% this quarter"
          trendDirection="up"
          variant="emerald"
        />
        <StatCard
          title="Total Dollars Tracked"
          value={`$${stats.totalRefundAmount.toFixed(2)}`}
          icon={<DollarSign className="w-5 h-5" />}
          subtitle={`${stats.completedRefunds} claims completed`}
          variant="amber"
        />
        <StatCard
          title="Avg. Turnaround"
          value={`${demoAnalyticsData.averageRefundTime} Days`}
          icon={<Clock className="w-5 h-5" />}
          subtitle="From request to bank deposit"
          variant="default"
        />
      </div>

      {/* 2x2 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-w-0">
          <MonthlyTrendsChart data={demoMonthlyTrends} />
        </div>
        <div className="min-w-0">
          <StatusDistributionChart data={demoStatusDistribution} />
        </div>
        <div className="min-w-0">
          <MerchantBreakdownChart data={demoMerchantBreakdown} />
        </div>
        <div className="min-w-0">
          <SuccessRateChart data={demoMonthlyTrends} />
        </div>
      </div>

      {/* Merchant Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Retailer Performance Scorecard
            </h3>
            <p className="text-xs text-slate-500">
              Comparative benchmark of turnaround speed and resolution rate by merchant
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600 font-medium">Sort by:</span>
            <button
              onClick={() => setSortField('totalAmount')}
              className={`px-2.5 py-1 rounded-lg border ${
                sortField === 'totalAmount'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              Amount
            </button>
            <button
              onClick={() => setSortField('averageTime')}
              className={`px-2.5 py-1 rounded-lg border ${
                sortField === 'averageTime'
                  ? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              Speed
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Merchant</th>
                <th className="py-3 px-4">Refund Requests</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Average Turnaround</th>
                <th className="py-3 px-4 text-right">Success Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {sortedMerchants.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">{m.merchant}</td>
                  <td className="py-3 px-4 font-medium">{m.totalRefunds}</td>
                  <td className="py-3 px-4 font-black text-slate-900">
                    ${m.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-600">
                    {m.averageTime} days
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`font-bold px-2 py-0.5 rounded-full ${
                        m.successRate >= 90
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {m.successRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

