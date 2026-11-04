import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ShoppingBag, Search, Filter } from 'lucide-react';
import { OrderTable } from '../components/orders/OrderTable';
import { OrderCard } from '../components/orders/OrderCard';
import { AddOrderModal } from '../components/orders/AddOrderModal';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { useApp } from '../context';
import type { Order } from '../types';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, addOrder } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleAddOrder = (newOrderData: Partial<Order>) => {
    addOrder(newOrderData);
  };

  const handleRequestRefund = (order: Order) => {
    // Navigate to refunds with pre-filled state
    navigate(
      `/app/refunds?action=new&merchant=${encodeURIComponent(
        order.merchant
      )}&ref=${encodeURIComponent(order.orderReference)}&amount=${order.amount}&reason=${encodeURIComponent(
        `Refund for ${order.items?.[0]?.name || 'order item'}`
      )}`
    );
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.merchant.toLowerCase().includes(q) ||
        o.orderReference.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Orders & Receipts Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Central repository of purchases eligible for return, exchange, or refund tracking.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          icon={<Plus className="w-4 h-4" />}
        >
          Import Order
        </Button>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search orders by retailer or reference number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 cursor-pointer"
          >
            <option value="all">All Orders</option>
            <option value="completed">Completed Purchases</option>
            <option value="refunded">Refunded</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Responsive View: Desktop Table, Mobile Cards */}
      {filteredOrders.length > 0 ? (
        <>
          <div className="hidden md:block">
            <OrderTable
              orders={filteredOrders}
              onViewDetails={(order) => setSelectedOrder(order)}
              onRequestRefund={handleRequestRefund}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={(ord) => setSelectedOrder(ord)}
                onRequestRefund={handleRequestRefund}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8">
          <EmptyState
            icon={<ShoppingBag className="w-12 h-12 text-slate-400" />}
            title="No orders found"
            description="Import order details or connect your PayPal sandbox account to automatically synchronize recent merchant transactions."
            action={{
              label: 'Import New Order',
              onClick: () => setIsAddModalOpen(true),
            }}
          />
        </div>
      )}

      {/* Add Order Modal */}
      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOrder}
      />

      {/* Order Detail / Receipt Modal */}
      {selectedOrder && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedOrder(null)}
          title={`Order Receipt — ${selectedOrder.orderReference}`}
          size="md"
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="text-xs text-slate-500">Retailer</p>
                <h4 className="font-bold text-slate-900 text-base">{selectedOrder.merchant}</h4>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Date</p>
                <p className="text-xs font-semibold text-slate-800">{selectedOrder.purchaseDate}</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Purchased Items
              </h5>
              <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-slate-800">{item.name}</span>
                      <span className="text-slate-600 block text-[11px]">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-slate-100">
              <span className="text-xs font-bold text-slate-700">Total Charged</span>
              <span className="text-xl font-black text-slate-900">
                ${selectedOrder.amount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button variant="outline" onClick={() => setSelectedOrder(null)}>
                Close
              </Button>
              {!selectedOrder.hasRefund && (
                <Button
                  variant="primary"
                  onClick={() => {
                    const ord = selectedOrder;
                    setSelectedOrder(null);
                    handleRequestRefund(ord);
                  }}
                >
                  Initiate Refund Tracking
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

