"use client";
import React, { useState } from 'react';
import { X, MapPin, Phone, Mail, Clock, DollarSign, User, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: any;
  onOrderUpdated: (updatedOrder: any) => void;
}

const statusConfig = {
  pending: { 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
    icon: Clock, 
    nextStatus: 'confirmed',
    nextLabel: 'Confirm Order'
  },
  confirmed: { 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    icon: CheckCircle,
    nextStatus: 'preparing', 
    nextLabel: 'Start Preparing'
  },
  preparing: { 
    color: 'bg-orange-100 text-orange-800 border-orange-200', 
    icon: Clock,
    nextStatus: 'ready',
    nextLabel: 'Mark Ready'
  },
  ready: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: CheckCircle,
    nextStatus: 'assigned',
    nextLabel: 'Assign Driver'
  },
  assigned: { 
    color: 'bg-purple-100 text-purple-800 border-purple-200', 
    icon: User,
    nextStatus: 'picked_up',
    nextLabel: 'Mark Picked Up'
  },
  picked_up: { 
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200', 
    icon: MapPin,
    nextStatus: 'out_for_delivery',
    nextLabel: 'Out for Delivery'
  },
  out_for_delivery: { 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    icon: MapPin,
    nextStatus: 'delivered',
    nextLabel: 'Mark Delivered'
  },
  delivered: { 
    color: 'bg-green-100 text-green-800 border-green-200', 
    icon: CheckCircle,
    nextStatus: null,
    nextLabel: null
  },
  cancelled: { 
    color: 'bg-red-100 text-red-800 border-red-200', 
    icon: X,
    nextStatus: null,
    nextLabel: null
  }
};

const priorityConfig = {
  low: { color: 'bg-gray-100 text-gray-800', label: 'Low' },
  normal: { color: 'bg-blue-100 text-blue-800', label: 'Normal' },
  high: { color: 'bg-orange-100 text-orange-800', label: 'High' },
  urgent: { color: 'bg-red-100 text-red-800', label: 'Urgent' }
};

export default function EnhancedOrderModal({ 
  isOpen, 
  onClose, 
  order, 
  onOrderUpdated 
}: OrderDetailsModalProps) {
  const { restaurant } = useAuth();
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedDriverId, setSelectedDriverId] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Load available drivers when modal opens
  React.useEffect(() => {
    if (isOpen && order?.status === 'ready') {
      loadDrivers();
    }
  }, [isOpen, order?.status]);

  const loadDrivers = async () => {
    if (!restaurant?.id) return;

    try {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .eq('is_active', true)
        .in('status', ['available']);

      if (error) throw error;
      setDrivers(data || []);
    } catch (error) {
      console.error('Error loading drivers:', error);
    }
  };

  const updateOrderStatus = async (newStatus: string, driverId?: string) => {
    if (!order) return;

    setLoading(true);
    try {
      const now = new Date().toISOString();
      const updates: any = {
        status: newStatus,
        updated_at: now
      };

      // Set timestamp fields based on status
      switch (newStatus) {
        case 'confirmed':
          updates.confirmed_at = now;
          break;
        case 'ready':
          updates.ready_at = now;
          break;
        case 'assigned':
          updates.assigned_at = now;
          if (driverId) {
            updates.driver_id = driverId;
          }
          break;
        case 'picked_up':
          updates.picked_up_at = now;
          break;
        case 'delivered':
          updates.delivered_at = now;
          break;
      }

      // Update order
      const { data: updatedOrder, error: orderError } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', order.id)
        .select()
        .single();

      if (orderError) throw orderError;

      // Create tracking record
      const { error: trackingError } = await supabase
        .from('order_tracking')
        .insert([{
          order_id: order.id,
          status: newStatus,
          notes: notes || `Order ${newStatus.replace('_', ' ')}`
        }]);

      if (trackingError) {
        console.error('Error creating tracking record:', trackingError);
      }

      // Update driver status if assigned
      if (newStatus === 'assigned' && driverId) {
        await supabase
          .from('drivers')
          .update({ status: 'busy' })
          .eq('id', driverId);
      }

      onOrderUpdated(updatedOrder);
      setNotes('');
      setSelectedDriverId('');
    } catch (error: any) {
      console.error('Error updating order:', error);
      alert('Failed to update order: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return 'Not set';
    return new Date(timestamp).toLocaleString('en-AU', {
      timeZone: 'Australia/Sydney',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit'
    });
  };

  const getTimeSince = (timestamp: string) => {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ${diffMins % 60}m ago`;
  };

  if (!isOpen || !order) return null;

  const currentStatusConfig = statusConfig[order.status as keyof typeof statusConfig];
  const currentPriorityConfig = priorityConfig[order.priority as keyof typeof priorityConfig];
  const StatusIcon = currentStatusConfig?.icon || Clock;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-orange-500 text-white px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Order #{order.order_number}</h2>
              <p className="text-orange-100">
                Placed {getTimeSince(order.created_at)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-orange-200 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Order Details */}
            <div className="space-y-6">
              {/* Status & Priority */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border flex items-center space-x-1 ${currentStatusConfig?.color}`}>
                      <StatusIcon size={16} />
                      <span className="capitalize">{order.status.replace('_', ' ')}</span>
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${currentPriorityConfig?.color}`}>
                      {currentPriorityConfig?.label}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    ${order.total_amount?.toFixed(2)}
                  </span>
                </div>

                {/* Status Timeline */}
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-gray-600">Confirmed:</span>
                      <span className="ml-2">{formatTime(order.confirmed_at)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Ready:</span>
                      <span className="ml-2">{formatTime(order.ready_at)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Assigned:</span>
                      <span className="ml-2">{formatTime(order.assigned_at)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Delivered:</span>
                      <span className="ml-2">{formatTime(order.delivered_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <User size={18} className="text-blue-500" />
                  <span>Customer Details</span>
                </h3>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <User size={16} className="text-gray-400" />
                    <span>{order.customer_name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{order.customer_phone}</span>
                  </div>
                  {order.customer_email && (
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span>{order.customer_email}</span>
                    </div>
                  )}
                  <div className="flex items-start space-x-2">
                    <MapPin size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <div>{order.delivery_address}</div>
                      {(order.delivery_suburb || order.delivery_postcode) && (
                        <div className="text-sm text-gray-600">
                          {order.delivery_suburb} {order.delivery_postcode}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {order.delivery_notes && (
                  <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm"><strong>Delivery Notes:</strong> {order.delivery_notes}</p>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                <div className="space-y-2">
                  {order.items?.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600 ml-2">x{item.quantity}</span>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${order.subtotal?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>${order.delivery_fee?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-1">
                      <span>Total:</span>
                      <span>${order.total_amount?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {order.special_instructions && (
                  <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm"><strong>Special Instructions:</strong> {order.special_instructions}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Actions */}
            <div className="space-y-6">
              {/* Status Actions */}
              {currentStatusConfig?.nextStatus && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
                  
                  {/* Driver Selection for Ready Orders */}
                  {order.status === 'ready' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Driver
                      </label>
                      <select
                        value={selectedDriverId}
                        onChange={(e) => setSelectedDriverId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">Choose a driver...</option>
                        {drivers.map((driver) => (
                          <option key={driver.id} value={driver.id}>
                            {driver.name} ({driver.vehicle_type}) - {driver.phone}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                      rows={2}
                      placeholder="Add any notes about this status update..."
                    />
                  </div>

                  <button
                    onClick={() => updateOrderStatus(
                      currentStatusConfig.nextStatus!,
                      selectedDriverId || undefined
                    )}
                    disabled={loading || (order.status === 'ready' && !selectedDriverId)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <span>{currentStatusConfig.nextLabel}</span>
                    )}
                  </button>
                </div>
              )}

              {/* Cancel Order */}
              {!['delivered', 'cancelled'].includes(order.status) && (
                <div className="border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center space-x-2">
                    <AlertTriangle size={18} />
                    <span>Cancel Order</span>
                  </h3>
                  <p className="text-sm text-red-700 mb-3">
                    This action cannot be undone. The customer will need to be notified separately.
                  </p>
                  <button
                    onClick={() => updateOrderStatus('cancelled')}
                    disabled={loading}
                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    Cancel Order
                  </button>
                </div>
              )}

              {/* Order History */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Estimated Times</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ready At:</span>
                    <span>{formatTime(order.estimated_ready_at)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery At:</span>
                    <span>{formatTime(order.estimated_delivery_at)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Payment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Method:</span>
                    <span className="capitalize">{order.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.payment_status === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.payment_status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}