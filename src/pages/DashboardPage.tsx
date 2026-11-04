import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { RefundChart } from '../components/dashboard/RefundChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { AIInsightsPanel } from '../components/dashboard/AIInsightsPanel';
import { Button } from '../components/ui/Button';
import { useApp } from '../context';
import {
  demoMonthlyTrends,
  demoAIInsights,
} from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { refunds, stats, settings, syncPayPalSandbox } = useApp();
  const [syncing, setSyncing] = useState(false);
  const [showSandboxBanner, setShowSandboxBanner] = useState(true);

  const handleSync = async () => {
    setSyncing(true);
    await syncPayPalSandbox();
    setSyncing(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: PayPal Sandbox Simulation Ready */}
      {showSandboxBanner && settings.paypalConnected && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg shadow-blue-950/10">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">
                  PayPal Developer Sandbox Active
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Ready
                </span>
              </div>
              <p className="text-xs text-blue-200/80 mt-0.5">
                Simulating verified PayPal merchant webhook feeds & dispute resolution lifecycles.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSync}
              loading={syncing}
              icon={<RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
            >
              Sync Sandbox
            </Button>
            <button
              onClick={() => setShowSandboxBanner(false)}
              className="text-xs text-blue-300/80 hover:text-white px-2 py-1"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Page Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Financial Recovery Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time pipeline of requested, processing, and recovered consumer refunds.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/app/orders')}
          >
            Import Order
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/app/refunds?action=new')}
            icon={<Plus className="w-4 h-4" />}
          >
            Track New Refund
          </Button>
        </div>
      </div>

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Pipeline Amount"
          value={`$${stats.totalRefundAmount.toFixed(2)}`}
          icon={<DollarSign className="w-5 h-5" />}
          trend="+18.4% vs last month"
          trendDirection="up"
          variant="brand"
          onClick={() => navigate('/app/refunds')}
        />
        <StatCard
          title="Pending In-Flight"
          value={stats.pendingRefunds}
          icon={<Clock className="w-5 h-5" />}
          subtitle="Avg turnaround 4.2 days"
          variant="amber"
          onClick={() => navigate('/app/refunds?status=processing')}
        />
        <StatCard
          title="Completed Refunds"
          value={stats.completedRefunds}
          icon={<CheckCircle className="w-5 h-5" />}
          trend="92% success rate"
          trendDirection="up"
          variant="emerald"
          onClick={() => navigate('/app/refunds?status=completed')}
        />
        <StatCard
          title="Action Required"
          value={stats.actionRequired}
          icon={<AlertTriangle className="w-5 h-5" />}
          subtitle="Merchant inquiries stalled"
          variant="rose"
          onClick={() => navigate('/app/refunds?status=action_required')}
        />
      </div>

      {/* Main Charts & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0">
          <RefundChart data={demoMonthlyTrends} />
        </div>
        <div className="min-w-0">
          <RecentActivity refunds={refunds} limit={5} />
        </div>
      </div>

      {/* AI Intelligence Insights Section */}
      <AIInsightsPanel insights={demoAIInsights} />
    </div>
  );
};

