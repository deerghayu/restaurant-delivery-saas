"use client";
import React, { useState, useEffect } from "react";
import { MapPin, Clock, Phone, Star, Truck, CheckCircle } from "lucide-react";

const CustomerTrackingPage = ({ orderId }: { orderId?: string }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mounted, setMounted] = useState(false); // ← This fixes hydration

  // Safety check for orderId
  if (!orderId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            Please check your order ID and try again.
          </p>
          <a
            href="/"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  // Mock order data - would come from API
  const orderData = {
    id: orderId,
    restaurantName: "Mario's Pizza",
    restaurantLogo: "🍕",
    customerName: "Sarah Johnson",
    status: "out_for_delivery",
    estimatedDelivery: new Date(Date.now() + 8 * 60000), // 8 minutes from now
    items: [
      { name: "Margherita Pizza (Large)", quantity: 2, price: 32.0 },
      { name: "Garlic Bread", quantity: 1, price: 8.5 },
      { name: "Coca Cola", quantity: 2, price: 6.0 },
    ],
    total: 46.5,
    driver: {
      name: "James",
      phone: "0467 234 567",
      avatar: "👨",
      rating: 4.9,
    },
    deliveryAddress: "45 Collins St, Melbourne VIC 3000",
    timeline: [
      {
        status: "Order Confirmed",
        time: new Date(Date.now() - 35 * 60000),
        completed: true,
        description: "Your order has been received and is being prepared",
      },
      {
        status: "In Kitchen",
        time: new Date(Date.now() - 25 * 60000),
        completed: true,
        description: "Our chefs are preparing your delicious meal",
      },
      {
        status: "Out for Delivery",
        time: new Date(Date.now() - 8 * 60000),
        completed: true,
        description: "Your order is on its way with James",
      },
      {
        status: "Delivered",
        time: new Date(Date.now() + 8 * 60000),
        completed: false,
        description: "Enjoy your meal!",
      },
    ],
  };

  // Fix hydration issue by only rendering time after component mounts
  useEffect(() => {
    setMounted(true); // ← This sets mounted to true after hydration
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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

  // Safe function to get order display ID
  const getOrderDisplayId = (id: string) => {
    return id && id.length >= 4 ? id.slice(-4) : id || "N/A";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <span className="text-3xl">{orderData.restaurantLogo}</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{orderData.restaurantName}</h1>
              <p className="text-orange-100">
                Order #{getOrderDisplayId(orderId)} • Track Your Delivery
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Truck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      On Its Way!
                    </h2>
                    <p className="text-gray-600">
                      Your order is out for delivery
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600">
                    {getTimeUntil(orderData.estimatedDelivery)}
                  </div>
                  <div className="text-sm text-gray-500">Estimated arrival</div>
                </div>
              </div>

              {/* Driver Info */}
              <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{orderData.driver.avatar}</span>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {orderData.driver.name} is delivering your order
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{orderData.driver.rating} rating</span>
                    </div>
                  </div>
                </div>
                <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
              </div>

              {/* Delivery Address */}
              <div className="mt-4 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <div className="font-medium text-gray-900">
                    Delivering to:
                  </div>
                  <div className="text-gray-600">
                    {orderData.deliveryAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Order Timeline
              </h3>
              <div className="space-y-4">
                {orderData.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Clock className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4
                          className={`font-semibold ${
                            step.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.status}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {step.completed
                            ? getTimeAgo(step.time)
                            : getTimeUntil(step.time)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                {orderData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.quantity}x {item.name}
                      </div>
                    </div>
                    <div className="font-semibold text-gray-900">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ${orderData.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-5 h-5" />
                  <span>Call Restaurant</span>
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors">
                  Report an Issue
                </button>
              </div>
            </div>

            {/* Rate Experience */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-bold mb-2">
                How was your experience?
              </h3>
              <p className="text-orange-100 text-sm mb-4">
                Help us improve by rating your delivery
              </p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="text-yellow-300 hover:text-yellow-100 transition-colors"
                  >
                    <Star className="w-8 h-8" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTrackingPage;
