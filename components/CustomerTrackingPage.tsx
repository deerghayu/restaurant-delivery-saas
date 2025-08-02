"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import DelightfulLoading from "@/components/DelightfulLoading";
import {
  OrderHeader,
  StatusCard,
  OrderTimeline,
  OrderSummary,
  ErrorState,
  OrderNotFoundState
} from './tracking';

interface OrderData {
  id: string;
  restaurantName: string;
  restaurantLogo: string;
  customerName: string;
  status: string;
  estimatedDelivery: Date;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  driver: {
    name: string;
    phone: string;
    avatar: string;
    rating: number;
  };
  deliveryAddress: string;
  timeline: Array<{
    status: string;
    time: Date;
    completed: boolean;
    description: string;
  }>;
}

const CustomerTrackingPage = ({ orderId }: { orderId?: string }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate timeline based on order status
  const generateTimeline = (status: string, createdAt: string) => {
    const orderTime = new Date(createdAt);
    const timeline = [
      {
        status: "Order Confirmed",
        time: orderTime,
        completed: true,
        description: "Your order has been received and confirmed",
      },
    ];

    if (status !== 'pending') {
      timeline.push({
        status: "In Kitchen",
        time: new Date(orderTime.getTime() + 10 * 60000), // 10 mins after order
        completed: true,
        description: "Our chefs are preparing your delicious meal",
      });
    }

    if (status === 'out_for_delivery' || status === 'delivered') {
      timeline.push({
        status: "Out for Delivery",
        time: new Date(orderTime.getTime() + 25 * 60000), // 25 mins after order
        completed: true,
        description: "Your order is on its way",
      });
    }

    timeline.push({
      status: "Delivered",
      time: new Date(Date.now() + 15 * 60000), // 15 mins from now
      completed: status === 'delivered',
      description: "Enjoy your meal!",
    });

    return timeline;
  };

  // Fetch order data from Supabase
  const fetchOrderData = async () => {
    if (!orderId) return;

    try {
      // Fetch order details with restaurant info
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .select(`
          *,
          restaurants(name),
          order_tracking(*)
        `)
        .eq('id', orderId)
        .single();

      if (orderError) {
        console.error('Error fetching order:', orderError);
        setError('Order not found');
        setLoading(false);
        return;
      }

      if (!order) {
        setError('Order not found');
        setLoading(false);
        return;
      }

      // Transform the data for display
      const transformedData: OrderData = {
        id: order.id,
        restaurantName: order.restaurants?.name || 'Restaurant',
        restaurantLogo: "🍕",
        customerName: order.customer_name,
        status: order.status,
        estimatedDelivery: new Date(Date.now() + 15 * 60000), // 15 minutes from now (mock)
        items: order.items.split(', ').map((item: string) => {
          const [quantity, ...nameParts] = item.split('x ');
          return {
            name: nameParts.join('x ').trim(),
            quantity: parseInt(quantity) || 1,
            price: 0 // We don't store individual prices, so use 0
          };
        }),
        total: order.total_amount,
        driver: {
          name: "James", // Mock data
          phone: "0467 234 567",
          avatar: "👨",
          rating: 4.9,
        },
        deliveryAddress: order.customer_address,
        timeline: generateTimeline(order.status, order.created_at),
      };

      setOrderData(transformedData);
    } catch (error) {
      console.error('Error in fetchOrderData:', error);
      setError('Failed to load order details');
    } finally {
      setLoading(false);
    }
  };

  // Safety check for orderId
  if (!orderId) {
    return <OrderNotFoundState />;
  }

  // Fix hydration issue by only rendering time after component mounts
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch order data on component mount
  useEffect(() => {
    fetchOrderData();
  }, [orderId]);

  // These functions now check if component is mounted before calculating time
  const getTimeUntil = (date: Date) => {
    if (!mounted) return "Loading..."; // ← Prevents hydration mismatch
    const minutes = Math.floor(
      (date.getTime() - currentTime.getTime()) / 60000
    );
    if (minutes < 0) return "Any moment now!";
    if (minutes < 1) return "Arriving now!";
    if (minutes === 1) return "1 minute away";
    return `${minutes} minutes away`;
  };

  const getTimeAgo = (date: Date) => {
    if (!mounted) return "Loading..."; // ← Prevents hydration mismatch
    const minutes = Math.floor(
      (currentTime.getTime() - date.getTime()) / 60000
    );
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 minute ago";
    return `${minutes} minutes ago`;
  };

  // Loading state
  if (loading) {
    return (
      <DelightfulLoading 
        type="delivering"
        message="Loading order details..."
        submessage="Getting the latest updates on your delivery"
        size="lg"
      />
    );
  }

  // Error state
  if (error || !orderData) {
    return (
      <ErrorState 
        error={error || undefined} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <OrderHeader 
        restaurantName={orderData.restaurantName}
        restaurantLogo={orderData.restaurantLogo}
        orderId={orderId}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            <StatusCard 
              status={orderData.status}
              estimatedDelivery={orderData.estimatedDelivery}
              driver={orderData.driver}
              deliveryAddress={orderData.deliveryAddress}
              getTimeUntil={getTimeUntil}
            />
            
            <OrderTimeline 
              timeline={orderData.timeline}
              getTimeAgo={getTimeAgo}
              getTimeUntil={getTimeUntil}
            />
          </div>

          {/* Order Summary */}
          <OrderSummary 
            items={orderData.items}
            total={orderData.total}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerTrackingPage;