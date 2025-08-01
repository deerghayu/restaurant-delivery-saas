'use client'
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  User, 
  MapPin, 
  Phone, 
  Car, 
  CheckCircle, 
  AlertCircle, 
  Timer,
  DollarSign,
  Navigation,
  Heart,
  Star,
  Zap,
  Coffee,
  Award,
  Plus
} from 'lucide-react';
import DelightfulLoading from './DelightfulLoading';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface OrderStatusBoardProps {
  newOrder?: any | null;
  onNewOrderClick?: () => void;
}

const OrderStatusBoard = ({ newOrder, onNewOrderClick }: OrderStatusBoardProps) => {
  const { restaurant } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [celebratingOrder, setCelebratingOrder] = useState<string | null>(null);
  const [recentAction, setRecentAction] = useState<{orderId: string, action: string, message: string} | null>(null);
  const [orders, setOrders] = useState({
    pending: [] as any[],
    assigned: [] as any[],
    outForDelivery: [] as any[]
  });

  // Available drivers for assignment
  const availableDrivers = [
    { id: 'emma', name: 'Emma', avatar: '👩', phone: '0445 123 456', status: 'available' },
    { id: 'james', name: 'James', avatar: '👨', phone: '0467 234 567', status: 'busy' },
    { id: 'sophie', name: 'Sophie', avatar: '👩', phone: '0489 345 678', status: 'busy' },
    { id: 'alex', name: 'Alex', avatar: '👨', phone: '0491 567 890', status: 'available' }
  ];

  // Fetch orders from Supabase
  const fetchOrders = async () => {
    if (!restaurant) return;

    try {
      const { data: ordersData, error } = await supabase
        .from('orders')
        .select('*')
        .eq('restaurant_id', restaurant.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error);
        return;
      }

      // Transform and categorize orders
      const transformedOrders = {
        pending: [] as any[],
        assigned: [] as any[],
        outForDelivery: [] as any[]
      };

      ordersData?.forEach(order => {
        const transformedOrder = {
          id: order.id,
          orderNumber: order.order_number,
          customerName: order.customer_name,
          customerPhone: order.customer_phone,
          customerAddress: order.delivery_address,
          items: Array.isArray(order.items) ? order.items : [],
          subtotal: order.subtotal,
          deliveryFee: order.delivery_fee,
          total: order.total_amount,
          orderTime: new Date(order.created_at),
          estimatedReady: order.estimated_ready_at ? new Date(order.estimated_ready_at) : new Date(new Date(order.created_at).getTime() + 15 * 60000),
          priority: order.priority || 'normal',
          specialInstructions: order.special_instructions,
          status: order.status
        };

        if (order.status === 'pending') {
          transformedOrders.pending.push(transformedOrder);
        } else if (order.status === 'confirmed' || order.status === 'preparing' || order.status === 'ready') {
          transformedOrders.assigned.push({
            ...transformedOrder,
            driver: { name: 'Emma', phone: '0445 123 456', avatar: '👩' },
            status: order.status,
            estimatedPickup: new Date(Date.now() + 10 * 60000),
            estimatedDelivery: new Date(Date.now() + 25 * 60000)
          });
        } else if (order.status === 'picked_up' || order.status === 'out_for_delivery') {
          transformedOrders.outForDelivery.push({
            ...transformedOrder,
            driver: { name: 'James', phone: '0467 234 567', avatar: '👨' },
            status: order.status,
            estimatedDelivery: new Date(Date.now() + 15 * 60000),
            actualPickupTime: order.picked_up_at ? new Date(order.picked_up_at) : new Date(Date.now() - 10 * 60000)
          });
        }
      });

      setOrders(transformedOrders);
    } catch (error) {
      console.error('Error in fetchOrders:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Initial fetch and setup realtime subscription
  useEffect(() => {
    if (restaurant) {
      fetchOrders();

      // Set up realtime subscription for order updates
      const subscription = supabase
        .channel('orders')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'orders',
            filter: `restaurant_id=eq.${restaurant.id}`
          }, 
          (payload) => {
            console.log('Order change received:', payload);
            fetchOrders(); // Refetch orders when changes occur
          }
        )
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [restaurant]);

  // Handle new orders from parent component
  useEffect(() => {
    if (newOrder) {
      setOrders(prev => ({
        ...prev,
        pending: [newOrder, ...prev.pending]
      }));
    }
  }, [newOrder]);

  // Calculate time ago
  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((currentTime.getTime() - date.getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 min ago';
    return `${minutes} mins ago`;
  };

  // Calculate time until
  const getTimeUntil = (date: Date) => {
    const minutes = Math.floor((date.getTime() - currentTime.getTime()) / 60000);
    if (minutes < 0) return 'Overdue';
    if (minutes < 1) return 'Now';
    if (minutes === 1) return '1 min';
    return `${minutes} mins`;
  };

  // Get priority styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'normal':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return 'border-l-4 border-gray-300 bg-gray-50';
    }
  };

  // Enhanced update order status with celebrations
  const updateOrderStatus = async (orderId: string, newStatus: string, notes?: string) => {
    // Trigger celebration effect
    setCelebratingOrder(orderId);
    
    // Set action feedback
    const actionMessages = {
      'confirmed': 'Order confirmed and being prepared',
      'ready': 'Order ready for pickup',
      'picked_up': 'Order picked up by driver',
      'delivered': 'Order delivered successfully'
    };
    
    setRecentAction({
      orderId,
      action: newStatus,
      message: actionMessages[newStatus] || `Order ${newStatus.replace('_', ' ')}!`
    });
    
    try {
      const updateData: any = { 
        status: newStatus,
        updated_at: new Date().toISOString()
      };

      // Set timestamps based on status
      if (newStatus === 'confirmed') {
        updateData.confirmed_at = new Date().toISOString();
      } else if (newStatus === 'ready') {
        updateData.ready_at = new Date().toISOString();
      } else if (newStatus === 'picked_up') {
        updateData.picked_up_at = new Date().toISOString();
      } else if (newStatus === 'delivered') {
        updateData.delivered_at = new Date().toISOString();
      }

      // Update order status in Supabase
      const { error: orderError } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (orderError) {
        console.error('Error updating order status:', orderError);
        return;
      }

      // Add tracking record
      const { error: trackingError } = await supabase
        .from('order_tracking')
        .insert([
          {
            order_id: orderId,
            status: newStatus,
            notes: notes || `Order ${newStatus.replace('_', ' ')}`
          }
        ]);

      if (trackingError) {
        console.error('Error adding tracking record:', trackingError);
      }

      // Refresh orders
      fetchOrders();
      
      // Clear celebration after animation
      setTimeout(() => {
        setCelebratingOrder(null);
        setRecentAction(null);
      }, 3000);
    } catch (error) {
      console.error('Error in updateOrderStatus:', error);
      setCelebratingOrder(null);
      setRecentAction(null);
    }
  };

  // Assign driver to order
  const assignDriver = async (orderId: string, driverId: string) => {
    const driver = availableDrivers.find(d => d.id === driverId);
    if (!driver || driver.status === 'busy') return;

    try {
      // Update order with driver assignment
      const { error } = await supabase
        .from('orders')
        .update({ 
          status: 'confirmed',
          assigned_at: new Date().toISOString(),
          confirmed_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      if (error) {
        console.error('Error assigning driver:', error);
        return;
      }

      // Add tracking record
      await supabase
        .from('order_tracking')
        .insert([
          {
            order_id: orderId,
            status: 'confirmed',
            notes: `Assigned to ${driver.name}`
          }
        ]);

      // Refresh orders
      fetchOrders();
    } catch (error) {
      console.error('Error in assignDriver:', error);
    }
  };

  // Cancel order
  const cancelOrder = async (orderId: string, reason?: string) => {
    if (!confirm('Are you sure you want to cancel this order?')) return;

    try {
      await updateOrderStatus(orderId, 'cancelled', reason || 'Cancelled by restaurant');
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const OrderCard = ({ order, status, onAssignDriver }: { 
    order: any, 
    status: string, 
    onAssignDriver?: (orderId: string, driverId: string) => void 
  }) => {
    const isPending = status === 'pending';
    const isAssigned = status === 'assigned';
    const isOutForDelivery = status === 'outForDelivery';

    return (
      <div 
        className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer ${
          selectedOrder?.id === order.id ? 'border-orange-400 shadow-lg ring-1 ring-orange-200' : 'border-gray-200'
        } ${isPending ? getPriorityStyle(order.priority) : ''} ${
          celebratingOrder === order.id ? 'animate-celebration ring-2 ring-green-300 border-green-400' : ''
        }`}
        onClick={() => setSelectedOrder(order)}
      >
        {/* Compact Header */}
        <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800 text-sm">#{order.id.slice(-4)}</span>
              {order.priority === 'high' && (
                <AlertCircle size={14} className="text-red-500" />
              )}
              <span className="text-xs text-gray-500">{getTimeAgo(order.orderTime)}</span>
            </div>
            <div className="font-bold text-green-600 flex items-center text-sm">
              <DollarSign size={12} />
              {order.total.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Compact Customer & Items */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <User size={14} className="text-blue-500" />
              <span className="font-medium text-gray-800 text-sm">{order.customerName}</span>
            </div>
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              title="Call customer"
            >
              <Phone size={12} className="text-green-500" />
            </button>
          </div>
          
          <div className="flex items-start space-x-2 mb-2">
            <MapPin size={12} className="text-red-500 mt-0.5 flex-shrink-0" />
            <span className="text-xs text-gray-600 leading-relaxed">{order.customerAddress}</span>
          </div>

          <div className="space-y-1 mb-3">
            {order.items.slice(0, 2).map((item, index) => (
              <div key={index} className="text-xs text-gray-700">
                • {typeof item === 'object' ? `${item.quantity}x ${item.name}` : item}
              </div>
            ))}
            {order.items.length > 2 && (
              <div className="text-xs text-gray-500">
                + {order.items.length - 2} more items
              </div>
            )}
          </div>
          
          {order.specialInstructions && (
            <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 mb-3">
              📝 {order.specialInstructions}
            </div>
          )}
        </div>

        {/* Status-specific content */}
        {isPending && (
          <div className="p-4">
            <div className="mb-3">
              <div className="flex items-center space-x-2 text-sm text-gray-800">
                <Timer size={14} className="text-orange-500" />
                <span className="font-medium">Ready in: <strong className="text-orange-600">{getTimeUntil(order.estimatedReady)}</strong></span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, 'confirmed', 'Order confirmed and preparing');
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Confirm Order
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelOrder(order.id);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign driver:</label>
                <div className="relative">
                  <select 
                    onChange={(e) => {
                      if (e.target.value) {
                        assignDriver(order.id, e.target.value);
                      }
                    }}
                    defaultValue=""
                    className="w-full pl-4 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:border-gray-300 transition-all appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-400">👤 Select a driver</option>
                    {availableDrivers.filter(d => d.status === 'available').map(driver => (
                      <option key={driver.id} value={driver.id} className="text-gray-700">
                        {driver.avatar} {driver.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isAssigned && (
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Car size={16} className="text-orange-500" />
              <span className="font-semibold text-gray-800 text-base">Driver: {order.driver.name}</span>
              <button className="ml-auto p-1 hover:bg-gray-100 rounded" title="Call driver">
                <Phone size={14} className="text-green-500" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Pickup:</span>
                <span className="font-semibold text-orange-600">{getTimeUntil(order.estimatedPickup)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Delivery:</span>
                <span className="font-semibold text-blue-600">{getTimeUntil(order.estimatedDelivery)}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, 'ready', 'Order ready for pickup');
                  }}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors"
                >
                  Ready for Pickup
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateOrderStatus(order.id, 'picked_up', 'Order picked up by driver');
                  }}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Picked Up
                </button>
              </div>
            </div>
          </div>
        )}

        {isOutForDelivery && (
          <div className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Navigation size={16} className="text-green-500" />
              <span className="font-semibold text-gray-800 text-base">En route: {order.driver.name}</span>
              <button className="ml-auto p-1 hover:bg-gray-100 rounded" title="Call driver">
                <Phone size={14} className="text-green-500" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Picked up:</span>
                <span className="font-semibold text-blue-600">{getTimeAgo(order.actualPickupTime)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">ETA:</span>
                <span className="font-semibold text-green-600">{getTimeUntil(order.estimatedDelivery)}</span>
              </div>
            </div>
            <div className="mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  updateOrderStatus(order.id, 'delivered', 'Order delivered successfully');
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Mark as Delivered</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-orange-100 to-red-100 min-h-screen flex items-center justify-center">
        <DelightfulLoading 
          type="cooking"
          message="Preparing your delivery hub..."
          submessage="Getting ready to manage your orders like a pro!"
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-orange-100 to-red-100">
      {/* Success Banner */}
      {recentAction && (
        <div className="mb-6">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle size={20} className="text-white" />
              <p className="font-medium">{recentAction.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Order Management Container */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        {/* Header Section */}
        <div className="bg-orange-500 p-4 text-white">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-xl">🍕</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold">Order Management</h2>
                  <p className="text-orange-100 text-sm">Manage your orders efficiently</p>
                </div>
              </div>
              
              {/* New Order Button */}
              <button 
                onClick={onNewOrderClick}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>New Order</span>
              </button>
            </div>
            
            {/* Status Bar */}
            <div className="mt-3 pt-3 border-t border-white border-opacity-20">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4 text-orange-100">
                  <span>
                    <strong className="text-white">{orders.pending.length}</strong> pending
                  </span>
                  <span>
                    <strong className="text-white">{orders.outForDelivery.length}</strong> out for delivery
                  </span>
                  <span>Next delivery in <strong className="text-white">8 minutes</strong></span>
                </div>
                <div className="text-orange-100 flex items-center space-x-2">
                  <Clock size={14} />
                  <span>{currentTime.toLocaleTimeString('en-AU', {hour: '2-digit', minute: '2-digit'})}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Columns */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-200 transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-x-12 animate-shimmer"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Pending Orders</h3>
                  <p className="text-blue-100 text-xs font-medium">New orders awaiting confirmation</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-2xl font-bold">{orders.pending.length}</span>
                </div>
                {orders.pending.length > 0 && (
                  <div className="text-blue-100 text-xs mt-1 font-medium">
                    Action needed
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`p-4 space-y-4 ${orders.pending.length > 2 ? 'max-h-96 overflow-y-auto' : ''}`}>
            {orders.pending.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                status="pending"
                onAssignDriver={assignDriver}
              />
            ))}
            {orders.pending.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock size={32} className="text-blue-500" />
                </div>
                <h4 className="text-xl font-bold text-blue-700 mb-2">All caught up!</h4>
                <p className="text-blue-600 font-medium">No pending orders right now</p>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Orders */}
        <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-xl shadow-lg border border-orange-200 transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-4 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-x-12 animate-shimmer"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Car size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">In Progress</h3>
                  <p className="text-orange-100 text-xs font-medium">Orders being prepared</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-2xl font-bold">{orders.assigned.length}</span>
                </div>
                {orders.assigned.length > 0 && (
                  <div className="text-orange-100 text-xs mt-1 font-medium">
                    In kitchen
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`p-4 space-y-4 ${orders.assigned.length > 2 ? 'max-h-96 overflow-y-auto' : ''}`}>
            {orders.assigned.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                status="assigned"
              />
            ))}
            {orders.assigned.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car size={32} className="text-orange-500" />
                </div>
                <h4 className="text-xl font-bold text-orange-700 mb-2">Kitchen ready!</h4>
                <p className="text-orange-600 font-medium">No orders being prepared</p>
              </div>
            )}
          </div>
        </div>

        {/* Out for Delivery */}
        <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-xl shadow-lg border border-green-200 transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-x-12 animate-shimmer"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <Navigation size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Out for Delivery</h3>
                  <p className="text-green-100 text-xs font-medium">Orders being delivered</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-2xl font-bold">{orders.outForDelivery.length}</span>
                </div>
                {orders.outForDelivery.length > 0 && (
                  <div className="text-green-100 text-xs mt-1 font-medium">
                    En route
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={`p-4 space-y-4 ${orders.outForDelivery.length > 2 ? 'max-h-96 overflow-y-auto' : ''}`}>
            {orders.outForDelivery.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                status="outForDelivery"
              />
            ))}
            {orders.outForDelivery.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Navigation size={32} className="text-green-500" />
                </div>
                <h4 className="text-xl font-bold text-green-700 mb-2">All delivered!</h4>
                <p className="text-green-600 font-medium">No active deliveries</p>
              </div>
            )}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusBoard;