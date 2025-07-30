"use client";
import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const OrderStatusBoard = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Mock order data - in real app, this comes from API
  const [orders, setOrders] = useState({
    pending: [
      {
        id: "ORD_12346",
        customerName: "Sarah Johnson",
        customerPhone: "0412 345 678",
        customerAddress: "45 Collins St, Melbourne",
        items: ["2x Margherita Pizza", "1x Garlic Bread", "2x Coke"],
        total: 42.5,
        orderTime: new Date(Date.now() - 8 * 60000), // 8 minutes ago
        estimatedReady: new Date(Date.now() + 7 * 60000), // 7 minutes from now
        priority: "normal",
        specialInstructions: "Extra cheese, no onions",
      },
      {
        id: "ORD_12347",
        customerName: "Mike Chen",
        customerPhone: "0423 456 789",
        customerAddress: "123 Swanston St, Melbourne",
        items: ["1x Supreme Pizza", "1x Caesar Salad"],
        total: 38.9,
        orderTime: new Date(Date.now() - 3 * 60000), // 3 minutes ago
        estimatedReady: new Date(Date.now() + 12 * 60000), // 12 minutes from now
        priority: "high",
        specialInstructions: "Call when arriving - apartment building",
      },
    ],
    assigned: [
      {
        id: "ORD_12345",
        customerName: "David Wilson",
        customerPhone: "0434 567 890",
        customerAddress: "789 Chapel St, Melbourne",
        items: ["1x Hawaiian Pizza", "1x Chicken Wings"],
        total: 35.8,
        orderTime: new Date(Date.now() - 25 * 60000), // 25 minutes ago
        driver: { name: "Emma", phone: "0445 123 456", avatar: "👩" },
        status: "preparing",
        estimatedPickup: new Date(Date.now() + 3 * 60000), // 3 minutes from now
        estimatedDelivery: new Date(Date.now() + 18 * 60000), // 18 minutes from now
      },
    ],
    outForDelivery: [
      {
        id: "ORD_12344",
        customerName: "Lisa Brown",
        customerPhone: "0456 789 012",
        customerAddress: "321 Flinders St, Melbourne",
        items: ["2x Pepperoni Pizza", "1x Garlic Bread"],
        total: 48.7,
        orderTime: new Date(Date.now() - 45 * 60000), // 45 minutes ago
        driver: { name: "James", phone: "0467 234 567", avatar: "👨" },
        status: "picked_up",
        estimatedDelivery: new Date(Date.now() + 8 * 60000), // 8 minutes from now
        actualPickupTime: new Date(Date.now() - 12 * 60000), // picked up 12 minutes ago
      },
      {
        id: "ORD_12343",
        customerName: "Tom Anderson",
        customerPhone: "0478 901 234",
        customerAddress: "456 Bourke St, Melbourne",
        items: ["1x Meat Lovers Pizza"],
        total: 24.9,
        orderTime: new Date(Date.now() - 35 * 60000), // 35 minutes ago
        driver: { name: "Sophie", phone: "0489 345 678", avatar: "👩" },
        status: "picked_up",
        estimatedDelivery: new Date(Date.now() + 12 * 60000), // 12 minutes from now
        actualPickupTime: new Date(Date.now() - 8 * 60000), // picked up 8 minutes ago
      },
    ],
  });

  // Available drivers for assignment
  const availableDrivers = [
    {
      id: "emma",
      name: "Emma",
      avatar: "👩",
      phone: "0445 123 456",
      status: "available",
    },
    {
      id: "james",
      name: "James",
      avatar: "👨",
      phone: "0467 234 567",
      status: "busy",
    },
    {
      id: "sophie",
      name: "Sophie",
      avatar: "👩",
      phone: "0489 345 678",
      status: "busy",
    },
    {
      id: "alex",
      name: "Alex",
      avatar: "👨",
      phone: "0491 567 890",
      status: "available",
    },
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Calculate time ago
  const getTimeAgo = (date) => {
    const minutes = Math.floor((currentTime - date) / 60000);
    if (minutes < 1) return "Just now";
    if (minutes === 1) return "1 min ago";
    return `${minutes} mins ago`;
  };

  // Calculate time until
  const getTimeUntil = (date) => {
    const minutes = Math.floor((date - currentTime) / 60000);
    if (minutes < 0) return "Overdue";
    if (minutes < 1) return "Now";
    if (minutes === 1) return "1 min";
    return `${minutes} mins`;
  };

  // Get priority styling
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-4 border-red-500 bg-red-50";
      case "normal":
        return "border-l-4 border-blue-500 bg-blue-50";
      default:
        return "border-l-4 border-gray-300 bg-gray-50";
    }
  };

  // Assign driver to order
  const assignDriver = (orderId, driverId) => {
    const driver = availableDrivers.find((d) => d.id === driverId);
    if (!driver || driver.status === "busy") return;

    // Move order from pending to assigned
    setOrders((prev) => {
      const orderToMove = prev.pending.find((o) => o.id === orderId);
      if (!orderToMove) return prev;

      return {
        ...prev,
        pending: prev.pending.filter((o) => o.id !== orderId),
        assigned: [
          ...prev.assigned,
          {
            ...orderToMove,
            driver: driver,
            status: "preparing",
            estimatedPickup: new Date(Date.now() + 10 * 60000),
            estimatedDelivery: new Date(Date.now() + 25 * 60000),
          },
        ],
      };
    });
  };

  const OrderCard = ({ order, status, onAssignDriver }) => {
    const isPending = status === "pending";
    const isAssigned = status === "assigned";
    const isOutForDelivery = status === "outForDelivery";

    return (
      <div
        className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer ${
          selectedOrder?.id === order.id
            ? "border-orange-400 shadow-lg ring-2 ring-orange-200"
            : "border-gray-200"
        } ${isPending ? getPriorityStyle(order.priority) : ""}`}
        onClick={() => setSelectedOrder(order)}
      >
        {/* Order Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-gray-800">
                #{order.id.slice(-4)}
              </span>
              {order.priority === "high" && (
                <AlertCircle size={16} className="text-red-500" />
              )}
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600 flex items-center">
                <DollarSign size={14} />
                {order.total.toFixed(2)}
              </div>
              <div className="text-xs text-gray-700 font-medium">
                {getTimeAgo(order.orderTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-2">
            <User size={16} className="text-blue-500" />
            <span className="font-semibold text-gray-800 text-base">
              {order.customerName}
            </span>
            <button
              className="ml-auto p-1 hover:bg-gray-100 rounded"
              title="Call customer"
            >
              <Phone size={14} className="text-green-500" />
            </button>
          </div>
          <div className="flex items-start space-x-2">
            <MapPin size={16} className="text-red-500 mt-0.5" />
            <span className="text-sm text-gray-800 leading-relaxed font-medium">
              {order.customerAddress}
            </span>
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
                <span className="font-medium">
                  Ready in:{" "}
                  <strong className="text-orange-600">
                    {getTimeUntil(order.estimatedReady)}
                  </strong>
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Choose your driver:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableDrivers
                    .filter((d) => d.status === "available")
                    .map((driver) => (
                      <button
                        key={driver.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAssignDriver(order.id, driver.id);
                        }}
                        className="flex items-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 border border-blue-600 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md text-white"
                      >
                        <span className="text-xl">{driver.avatar}</span>
                        <span className="text-sm font-semibold">
                          {driver.name}
                        </span>
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
              <span className="font-semibold text-gray-800 text-base">
                Driver: {order.driver.name}
              </span>
              <button
                className="ml-auto p-1 hover:bg-gray-100 rounded"
                title="Call driver"
              >
                <Phone size={14} className="text-green-500" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Pickup:</span>
                <span className="font-semibold text-orange-600">
                  {getTimeUntil(order.estimatedPickup)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Delivery:</span>
                <span className="font-semibold text-blue-600">
                  {getTimeUntil(order.estimatedDelivery)}
                </span>
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
              <span className="font-semibold text-gray-800 text-base">
                En route: {order.driver.name}
              </span>
              <button
                className="ml-auto p-1 hover:bg-gray-100 rounded"
                title="Call driver"
              >
                <Phone size={14} className="text-green-500" />
              </button>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Picked up:</span>
                <span className="font-semibold text-blue-600">
                  {getTimeAgo(order.actualPickupTime)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">ETA:</span>
                <span className="font-semibold text-green-600">
                  {getTimeUntil(order.estimatedDelivery)}
                </span>
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

  return (
    <div className="flex-1 p-6 bg-gradient-to-br from-orange-100 to-red-100 min-h-screen">
      {/* Board Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
          <span className="text-3xl">🍕</span>
          <span>Your Delivery Hub</span>
        </h2>
        <p className="text-gray-800 font-medium">
          Keep every order flowing smoothly from kitchen to happy customers
        </p>
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
            {orders.pending.map((order) => (
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
            {orders.assigned.map((order) => (
              <OrderCard key={order.id} order={order} status="assigned" />
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
            {orders.outForDelivery.map((order) => (
              <OrderCard key={order.id} order={order} status="outForDelivery" />
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
