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
  Navigation
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface OrderStatusBoardProps {
  newOrder?: any | null;
}

const OrderStatusBoard = ({ newOrder }: OrderStatusBoardProps) => {
  const { restaurant } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
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
          customerName: order.customer_name,
          customerPhone: order.customer_phone,
          customerAddress: order.customer_address,
          items: order.items.split(', '),
          total: order.total_amount,
          orderTime: new Date(order.created_at),
          estimatedReady: new Date(new Date(order.created_at).getTime() + 15 * 60000),
          priority: 'normal',
          specialInstructions: null
        };

        if (order.status === 'pending') {
          transformedOrders.pending.push(transformedOrder);
        } else if (order.status === 'confirmed' || order.status === 'preparing') {
          transformedOrders.assigned.push({
            ...transformedOrder,
            driver: { name: 'Emma', phone: '0445 123 456', avatar: '👩' },
            status: 'preparing',
            estimatedPickup: new Date(Date.now() + 10 * 60000),
            estimatedDelivery: new Date(Date.now() + 25 * 60000)
          });
        } else if (order.status === 'out_for_delivery') {
          transformedOrders.outForDelivery.push({
            ...transformedOrder,
            driver: { name: 'James', phone: '0467 234 567', avatar: '👨' },
            status: 'picked_up',
            estimatedDelivery: new Date(Date.now() + 15 * 60000),
            actualPickupTime: new Date(Date.now() - 10 * 60000)
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

  // Assign driver to order
  const assignDriver = async (orderId: string, driverId: string) => {
    const driver = availableDrivers.find(d => d.id === driverId);
    if (!driver || driver.status === 'busy') return;

    try {
      // Update order status in Supabase
      const { error } = await supabase
        .from('orders')
        .update({ status: 'confirmed' })
        .eq('id', orderId);

      if (error) {
        console.error('Error assigning driver:', error);
        return;
      }

      // Update local state
      setOrders(prev => {
        const orderToMove = prev.pending.find(o => o.id === orderId);
        if (!orderToMove) return prev;

        return {
          ...prev,
          pending: prev.pending.filter(o => o.id !== orderId),
          assigned: [...prev.assigned, {
            ...orderToMove,
            driver: driver,
            status: 'preparing',
            estimatedPickup: new Date(Date.now() + 10 * 60000),
            estimatedDelivery: new Date(Date.now() + 25 * 60000)
          }]
        };
      });
    } catch (error) {
      console.error('Error in assignDriver:', error);
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
          selectedOrder?.id === order.id ? 'border-orange-400 shadow-lg ring-2 ring-orange-200' : 'border-gray-200'
        } ${isPending ? getPriorityStyle(order.priority) : ''}`}
        onClick={() => setSelectedOrder(order)}
      >
        {/* Order Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800">#{order.id.slice(-4)}</span>
              {order.priority === 'high' && (
                <AlertCircle size={16} className="text-red-500" />
              )}
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600 flex items-center">
                <DollarSign size={14} />
                {order.total.toFixed(2)}
              </div>
              <div className="text-xs text-gray-700 font-medium">{getTimeAgo(order.orderTime)}</div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <User size={16} className="text-blue-500" />
            <span className="font-semibold text-gray-800 text-base">{order.customerName}</span>
            <button 
              className="ml-auto p-1 hover:bg-gray-100 rounded"
              title="Call customer"
            >
              <Phone size={14} className="text-green-500" />
            </button>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin size={16} className="text-red-500 mt-0.5" />
            <span className="text-sm text-gray-800 leading-relaxed font-medium">{order.customerAddress}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4 border-b border-gray-200">
          <div className="space-y-1">
            {order.items.map((item, index) => (
              <div key={index} className="text-sm text-gray-800 font-medium">
                • {item}
              </div>
            ))}
          </div>
          {order.specialInstructions && (
            <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-900 font-medium">
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
            <div className="space-y-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 mb-1">Choose your driver:</label>
              <div className="grid grid-cols-2 gap-2">
                {availableDrivers.filter(d => d.status === 'available').map(driver => (
                  <button
                    key={driver.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssignDriver(order.id, driver.id);
                    }}
                    className="flex items-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 border border-blue-600 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-white"
                  >
                    <span className="text-xl">{driver.avatar}</span>
                    <span className="text-sm font-semibold">{driver.name}</span>
                  </button>
                ))}
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
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Ready for Pickup
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
              <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-orange-100 to-red-100 min-h-screen">
      {/* Board Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
          <span className="text-3xl">🍕</span>
          <span>Your Delivery Hub</span>
        </h2>
        <p className="text-gray-800 font-medium">Keep every order flowing smoothly from kitchen to happy customers</p>
      </div>

      {/* Order Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Orders */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-sm border border-blue-200">
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center space-x-2 text-lg">
                <Clock size={18} />
                <span>Pending Orders</span>
              </h3>
              <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                {orders.pending.length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {orders.pending.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                status="pending"
                onAssignDriver={assignDriver}
              />
            ))}
            {orders.pending.length === 0 && (
              <div className="text-center text-blue-600 py-8">
                <Clock size={32} className="mx-auto mb-2 text-blue-400" />
                <p className="font-medium">No pending orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Assigned Orders */}
        <div className="bg-gradient-to-b from-orange-50 to-orange-100 rounded-lg shadow-sm border border-orange-200">
          <div className="bg-orange-600 text-white px-4 py-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center space-x-2 text-lg">
                <Car size={18} />
                <span>Assigned</span>
              </h3>
              <span className="bg-orange-500 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                {orders.assigned.length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {orders.assigned.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                status="assigned"
              />
            ))}
            {orders.assigned.length === 0 && (
              <div className="text-center text-orange-600 py-8">
                <Car size={32} className="mx-auto mb-2 text-orange-400" />
                <p className="font-medium">No assigned orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Out for Delivery */}
        <div className="bg-gradient-to-b from-green-50 to-green-100 rounded-lg shadow-sm border border-green-200">
          <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg">
            <div className="flex items-center justify-between">
              <h3 className="font-bold flex items-center space-x-2 text-lg">
                <Navigation size={18} />
                <span>Out for Delivery</span>
              </h3>
              <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                {orders.outForDelivery.length}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {orders.outForDelivery.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                status="outForDelivery"
              />
            ))}
            {orders.outForDelivery.length === 0 && (
              <div className="text-center text-green-600 py-8">
                <Navigation size={32} className="mx-auto mb-2 text-green-400" />
                <p className="font-medium">No deliveries in progress</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusBoard;