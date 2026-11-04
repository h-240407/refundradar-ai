import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Plus, Trash2 } from 'lucide-react';
import type { Order, OrderItem } from '../../types';

interface AddOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (order: Partial<Order>) => void;
}

export const AddOrderModal: React.FC<AddOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [merchant, setMerchant] = useState('');
  const [orderReference, setOrderReference] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('2026-10-25');
  const [amount, setAmount] = useState('');
  const [paypalTransactionId, setPaypalTransactionId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([
    { name: '', quantity: 1, price: 0 },
  ]);
  const [error, setError] = useState('');

  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchant || !orderReference || !amount) {
      setError('Please provide Merchant, Order ID, and Total Amount.');
      return;
    }

    const totalAmount = parseFloat(amount);
    if (isNaN(totalAmount) || totalAmount <= 0) {
      setError('Please provide a valid numeric total amount.');
      return;
    }

    onSubmit({
      merchant,
      orderReference,
      purchaseDate,
      amount: totalAmount,
      currency: 'USD',
      status: 'completed',
      hasRefund: false,
      paypalTransactionId: paypalTransactionId || undefined,
      items: items.filter((item) => item.name.trim() !== ''),
    });

    onClose();
    setMerchant('');
    setOrderReference('');
    setAmount('');
    setPaypalTransactionId('');
    setItems([{ name: '', quantity: 1, price: 0 }]);
    setError('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Import Order or Receipt" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Merchant / Retailer"
            placeholder="e.g. Best Buy, Nike"
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            required
          />

          <Input
            label="Order Reference"
            placeholder="e.g. BB-98014-CA"
            value={orderReference}
            onChange={(e) => setOrderReference(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Total Purchase Amount ($)"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <Input
            label="Purchase Date"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>

        <Input
          label="PayPal Transaction ID (Optional)"
          placeholder="e.g. PP-SANDBOX-TX-4402"
          value={paypalTransactionId}
          onChange={(e) => setPaypalTransactionId(e.target.value)}
          helperText="Optional link to PayPal Developer Sandbox."
        />

        {/* Purchased Items List */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Order Line Items
            </span>
            <button
              type="button"
              onClick={handleAddItem}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Item</span>
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Item name (e.g. Running Shoes)"
                  value={item.name}
                  onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                  className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(idx, 'quantity', parseInt(e.target.value) || 1)
                  }
                  className="w-16 text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Order
          </Button>
        </div>
      </form>
    </Modal>
  );
};

