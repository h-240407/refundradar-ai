import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import type { Refund, RefundStatus } from '../../types';

interface AddRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (refund: Partial<Refund>) => void;
  initialData?: Partial<Refund>;
}

export const AddRefundModal: React.FC<AddRefundModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [merchant, setMerchant] = useState('');
  const [orderReference, setOrderReference] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('2026-10-24');
  const [refundAmount, setRefundAmount] = useState('');
  const [originalAmount, setOriginalAmount] = useState('');
  const [status, setStatus] = useState<RefundStatus>('requested');
  const [reason, setReason] = useState('');
  const [paypalTransactionId, setPaypalTransactionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setMerchant(initialData.merchant || '');
        setOrderReference(initialData.orderReference || '');
        setPurchaseDate(initialData.purchaseDate || '2026-10-24');
        setRefundAmount(initialData.refundAmount ? String(initialData.refundAmount) : '');
        setOriginalAmount(initialData.originalAmount ? String(initialData.originalAmount) : '');
        setStatus(initialData.status || 'requested');
        setReason(initialData.reason || '');
        setPaypalTransactionId(initialData.paypalTransactionId || '');
      } else {
        setMerchant('');
        setOrderReference('');
        setPurchaseDate('2026-10-24');
        setRefundAmount('');
        setOriginalAmount('');
        setStatus('requested');
        setReason('');
        setPaypalTransactionId('');
      }
      setError('');
    }
  }, [isOpen, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant || !orderReference || !refundAmount) {
      setError('Please provide Merchant, Order Reference, and Refund Amount.');
      return;
    }

    const amountNum = parseFloat(refundAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please provide a valid refund amount.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSubmit({
        merchant,
        orderReference,
        purchaseDate,
        refundAmount: amountNum,
        originalAmount: originalAmount ? parseFloat(originalAmount) : amountNum,
        status,
        reason,
        paypalTransactionId: paypalTransactionId || undefined,
        requestDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        currency: 'USD',
        timeline: [
          {
            status: 'requested',
            date: new Date().toISOString().split('T')[0],
            description: reason || 'Refund request registered in RefundRadar AI.',
          },
        ],
      });
      setLoading(false);
      onClose();
      // Reset form
      setMerchant('');
      setOrderReference('');
      setRefundAmount('');
      setOriginalAmount('');
      setReason('');
      setPaypalTransactionId('');
      setError('');
    }, 400);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Track New Refund Journey" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Merchant Name"
            placeholder="e.g. Amazon, Nike, Apple"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            required
          />

          <Input
            label="Order Reference / ID"
            placeholder="e.g. AMZ-98214"
            value={orderReference}
            onChange={(e) => setOrderReference(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Refund Amount ($)"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={refundAmount}
            onChange={(e) => setRefundAmount(e.target.value)}
            required
          />

          <Input
            label="Original Purchase Amount ($)"
            type="number"
            step="0.01"
            placeholder="Optional"
            value={originalAmount}
            onChange={(e) => setOriginalAmount(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Purchase Date"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />

          <Select
            label="Initial Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as RefundStatus)}
            options={[
              { label: 'Requested', value: 'requested' },
              { label: 'Processing', value: 'processing' },
              { label: 'Approved', value: 'approved' },
              { label: 'Issued', value: 'issued' },
              { label: 'Completed', value: 'completed' },
              { label: 'Delayed', value: 'delayed' },
              { label: 'Action Required', value: 'action_required' },
            ]}
          />
        </div>

        <Input
          label="PayPal Transaction ID (Optional)"
          placeholder="e.g. PP-TXN-10294"
          value={paypalTransactionId}
          onChange={(e) => setPaypalTransactionId(e.target.value)}
          helperText="Associates this entry with PayPal Sandbox reconciliation."
        />

        <Textarea
          label="Reason for Refund / Notes"
          placeholder="e.g. Defective item returned on Oct 25, awaiting merchant warehouse inspection."
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={loading}>
            Save to Tracker
          </Button>
        </div>
      </form>
    </Modal>
  );
};

