import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Plus, Receipt } from 'lucide-react';
import { RefundCard } from '../components/refunds/RefundCard';
import { RefundFilters } from '../components/refunds/RefundFilters';
import { AddRefundModal } from '../components/refunds/AddRefundModal';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useApp } from '../context';
import type { Refund } from '../types';

export const RefundTrackerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { refunds, addRefund } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [initialData, setInitialData] = useState<Partial<Refund> | undefined>(undefined);

  // Read filter params from URL
  const searchQuery = searchParams.get('search') || '';
  const statusFilter = searchParams.get('status') || 'all';
  const sortBy = searchParams.get('sort') || 'latest';

  // Automatically open modal if ?action=new is in URL, populating any parameters
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      const merchant = searchParams.get('merchant') || '';
      const orderRef = searchParams.get('ref') || '';
      const amountStr = searchParams.get('amount') || '';
      const reason = searchParams.get('reason') || '';

      setInitialData({
        merchant,
        orderReference: orderRef,
        refundAmount: amountStr ? parseFloat(amountStr) : undefined,
        originalAmount: amountStr ? parseFloat(amountStr) : undefined,
        reason,
      });

      setIsAddModalOpen(true);

      // Clean action from query parameters to prevent re-opening on reload
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('action');
      nextParams.delete('merchant');
      nextParams.delete('ref');
      nextParams.delete('amount');
      nextParams.delete('reason');
      setSearchParams(nextParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleSearchChange = (query: string) => {
    const next = new URLSearchParams(searchParams);
    if (query) {
      next.set('search', query);
    } else {
      next.delete('search');
    }
    setSearchParams(next);
  };

  const handleStatusChange = (status: string) => {
    const next = new URLSearchParams(searchParams);
    if (status && status !== 'all') {
      next.set('status', status);
    } else {
      next.delete('status');
    }
    setSearchParams(next);
  };

  const handleSortChange = (sort: string) => {
    const next = new URLSearchParams(searchParams);
    next.set('sort', sort);
    setSearchParams(next);
  };

  const handleAddRefund = (newRefundData: Partial<Refund>) => {
    addRefund(newRefundData);
    setInitialData(undefined);
  };

  // Filter and sort refunds
  const filteredRefunds = useMemo(() => {
    return refunds
      .filter((r) => {
        // Status filter
        if (statusFilter !== 'all' && r.status !== statusFilter) {
          return false;
        }
        // Search filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchMerchant = r.merchant.toLowerCase().includes(q);
          const matchRef = r.orderReference.toLowerCase().includes(q);
          const matchReason = r.reason?.toLowerCase().includes(q) || false;
          return matchMerchant || matchRef || matchReason;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'oldest') {
          return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime();
        }
        if (sortBy === 'amount-high') {
          return b.refundAmount - a.refundAmount;
        }
        if (sortBy === 'amount-low') {
          return a.refundAmount - b.refundAmount;
        }
        // default: latest
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime();
      });
  }, [refunds, statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Refund Tracker Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Monitor, filter, and drill into all active and settled reimbursement requests.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Refund
        </Button>
      </div>

      {/* Filters Toolbar */}
      <RefundFilters
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        totalCount={filteredRefunds.length}
      />

      {/* Refund Cards Grid */}
      {filteredRefunds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRefunds.map((refund) => (
            <RefundCard key={refund.id} refund={refund} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
          <EmptyState
            icon={<Receipt className="w-12 h-12 text-slate-400" />}
            title="No refunds match your criteria"
            description="Try changing your status filter, clearing your search keywords, or manually adding a new refund journey."
            action={{
              label: 'Add New Refund',
              onClick: () => setIsAddModalOpen(true),
            }}
          />
        </div>
      )}

      {/* Add Refund Modal Dialog */}
      <AddRefundModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setInitialData(undefined);
        }}
        onSubmit={handleAddRefund}
        initialData={initialData}
      />
    </div>
  );
};

