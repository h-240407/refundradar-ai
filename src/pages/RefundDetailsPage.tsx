import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MessageSquare,
  ShieldCheck,
  Send,
  FileText,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { RefundTimeline } from '../components/refunds/RefundTimeline';
import { EmptyState } from '../components/ui/EmptyState';
import { useApp } from '../context';
import type { RefundStatus } from '../types';

export const RefundDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { refunds, updateRefundStatus, addRefundNote } = useApp();

  // Find refund by id
  const refund = refunds.find((r) => r.id === id);

  const [newNote, setNewNote] = useState('');
  const [localNotes, setLocalNotes] = useState<string[]>([
    'Customer service chat confirmed receipt of return package.',
    'Merchant claims processing batch is scheduled within 3 business days.',
  ]);

  if (!refund) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto py-12">
        <EmptyState
          title="Refund Not Found"
          description="The refund record you are looking for does not exist or may have been removed."
          action={{
            label: 'Back to Refund Tracker',
            onClick: () => navigate('/app/refunds'),
          }}
        />
      </div>
    );
  }

  const handleStatusChange = (newStatus: RefundStatus) => {
    updateRefundStatus(refund.id, newStatus, `Status updated to ${newStatus.replace('_', ' ')} manually.`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      addRefundNote(refund.id, newNote.trim());
      setLocalNotes([newNote.trim(), ...localNotes]);
      setNewNote('');
    }
  };

  // Combine custom notes with refund.notes if defined
  const displayedNotes = refund.notes
    ? [...refund.notes.split('\n').map((n) => n.replace(/^•\s*/, '')).filter(Boolean), ...localNotes]
    : localNotes;

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/app/refunds')}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="Back to refunds list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {refund.merchant} Refund
              </h1>
              <Badge status={refund.status} size="md" withDot />
            </div>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Order Ref: {refund.orderReference}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to={`/app/assistant?query=${encodeURIComponent(
              `What is happening with my ${refund.merchant} refund for $${refund.refundAmount}?`
            )}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Consult AI Copilot</span>
          </Link>

          {/* Quick status dropdown */}
          <div className="relative">
            <select
              value={refund.status}
              onChange={(e) => handleStatusChange(e.target.value as RefundStatus)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-xs focus:ring-2 focus:ring-blue-100 cursor-pointer"
            >
              <option value="requested">Set: Requested</option>
              <option value="processing">Set: Processing</option>
              <option value="approved">Set: Approved</option>
              <option value="issued">Set: Issued</option>
              <option value="completed">Set: Completed</option>
              <option value="delayed">Set: Delayed</option>
              <option value="action_required">Set: Action Required</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Financial Details & Merchant Meta */}
        <div className="space-y-6">
          {/* Financial Summary Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Financial Breakdown
            </h2>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-500">Refund Amount Due</span>
                <span className="text-2xl font-black text-blue-600">
                  ${refund.refundAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                <span>Original Order Total</span>
                <span className="font-semibold text-slate-900">
                  ${refund.originalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Currency</span>
                <span className="font-semibold text-slate-900">{refund.currency}</span>
              </div>
            </div>

            {/* PayPal Sandbox Status indicator */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-800 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>PayPal Transaction Mapped</span>
              </div>
              <p className="text-[11px] text-emerald-700">
                TxID: {refund.paypalTransactionId || 'PP-TXN-SANDBOX-LIVE'}
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 pt-2">
              <div className="flex justify-between">
                <span>Purchase Date</span>
                <span className="font-medium text-slate-800">{refund.purchaseDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Refund Initiated</span>
                <span className="font-medium text-slate-800">{refund.requestDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Activity</span>
                <span className="font-medium text-slate-800">{refund.lastUpdated}</span>
              </div>
              {refund.estimatedCompletionDate && (
                <div className="flex justify-between">
                  <span>Est. Settlement</span>
                  <span className="font-bold text-blue-600">
                    {refund.estimatedCompletionDate}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Stated Reason Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Return Reason</span>
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {refund.reason || 'No specific return reason provided by consumer.'}
            </p>
          </div>
        </div>

        {/* Right Column: Status Progression Timeline & Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Refund Progress Timeline Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Refund Journey Timeline
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Sequential event history and settlement checkpoints
                </p>
              </div>

              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                {refund.timeline.length} Events Logged
              </span>
            </div>

            <RefundTimeline timeline={refund.timeline} currentStatus={refund.status} />
          </div>

          {/* User Notes & Log Section */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Personal Notes & Diary</h2>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log merchant communications, phone calls, or ticket numbers..."
                className="flex-1 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-hidden"
              />
              <Button type="submit" variant="primary" size="md" icon={<Send className="w-3.5 h-3.5" />}>
                Add Note
              </Button>
            </form>

            <div className="space-y-2.5 mt-3">
              {displayedNotes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <p className="flex-1">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
