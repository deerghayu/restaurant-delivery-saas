"use client";
import React, { useState, useEffect } from "react";
import { Bell, Plus, Users, Clock, TrendingUp, MapPin, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import NewOrderModal from "./NewOrderModal";

interface RestaurantDashboardHeaderProps {
  onNewOrder?: (order: any) => void;
}

const RestaurantDashboardHeader = ({ onNewOrder }: RestaurantDashboardHeaderProps) => {
  const { user, restaurant, signOut } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [todayStats, setTodayStats] = useState({
    ordersCompleted: 23,
    activeDrivers: 3,
    avgDeliveryTime: 34,
    onTimeRate: 89,
  });

  // Fix hydration issue by only rendering time after component mounts
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Emotional messaging based on performance
  const getPerformanceMessage = () => {
    if (todayStats.onTimeRate >= 85) {
      return {
        text: "Excellent delivery performance today! 🎉",
        mood: "celebrating",
      };
    } else if (todayStats.onTimeRate >= 70) {
      return { text: "Good delivery pace today 👍", mood: "steady" };
    } else {
      return {
        text: "Let's optimize delivery times today 💪",
        mood: "improving",
      };
    }
  };

  const performanceMessage = getPerformanceMessage();

  // Dynamic greeting based on time
  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 11) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 22) return "Good evening";
    return "Working late";
  };

  // Format date consistently for server/client
  const formatDate = (date: Date) => {
    if (!mounted) return "Loading...";
    return date.toLocaleDateString("en-AU", {
      weekday: "long",
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (date: Date) => {
    if (!mounted) return "Loading...";
    return date.toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Restaurant Branding & Greeting */}
          <div className="flex items-center space-x-4">
            {/* Restaurant Logo */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              <span className="text-2xl">🍕</span>
            </div>

            {/* Greeting & Restaurant Name */}
            <div>
              <h1 className="text-2xl font-bold">{restaurant?.name || 'Restaurant Dashboard'}</h1>
              <p className="text-orange-100 text-sm">
                {getTimeBasedGreeting()}, {user?.email?.split('@')[0] || 'User'}!
                <span className="ml-2 text-xs opacity-75">
                  {formatDate(currentTime)}
                </span>
              </p>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center space-x-3">
            {/* New Order Button */}
            <button 
              onClick={() => setShowNewOrderModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>New Order</span>
            </button>

            {/* Notifications */}
            <div className="relative">
              <button className="bg-blue-500 hover:bg-blue-400 p-3 rounded-lg transition-colors duration-200">
                <Bell size={20} />
              </button>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">2</span>
              </div>
            </div>

            {/* Online Status Toggle */}
            <div className="flex items-center space-x-2 bg-orange-600 bg-opacity-70 px-3 py-2 rounded-lg">
              <div
                className={`w-3 h-3 rounded-full ${
                  isOnline ? "bg-green-400" : "bg-gray-400"
                } animate-pulse`}
              ></div>
              <span className="text-sm font-medium">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="bg-orange-600 bg-opacity-70 hover:bg-opacity-90 p-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
              >
                <User size={20} />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">{user?.email}</p>
                    <p className="text-xs text-gray-500">{restaurant?.name}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      signOut();
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats Bar */}
      <div className="bg-red-600 bg-opacity-40 px-6 py-3 border-t border-orange-300 border-opacity-30">
        <div className="flex items-center justify-between">
          {/* Performance Message */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                performanceMessage.mood === "celebrating"
                  ? "bg-green-400"
                  : performanceMessage.mood === "steady"
                  ? "bg-yellow-400"
                  : "bg-orange-400"
              } animate-pulse`}
            ></div>
            <span className="text-orange-100 text-sm font-medium">
              {performanceMessage.text}
            </span>
          </div>

          {/* Today's Key Metrics */}
          <div className="flex items-center space-x-6">
            {/* Orders Completed */}
            <div className="flex items-center space-x-2 text-orange-100">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-sm">
                <span className="font-bold text-white">
                  {todayStats.ordersCompleted}
                </span>{" "}
                orders today
              </span>
            </div>

            {/* Active Drivers */}
            <div className="flex items-center space-x-2 text-orange-100">
              <Users size={16} className="text-orange-200" />
              <span className="text-sm">
                <span className="font-bold text-white">
                  {todayStats.activeDrivers}
                </span>{" "}
                drivers active
              </span>
            </div>

            {/* Average Delivery Time */}
            <div className="flex items-center space-x-2 text-orange-100">
              <Clock size={16} className="text-yellow-300" />
              <span className="text-sm">
                <span className="font-bold text-white">
                  {todayStats.avgDeliveryTime}min
                </span>{" "}
                avg delivery
              </span>
            </div>

            {/* On-Time Rate */}
            <div className="flex items-center space-x-2 text-orange-100">
              <MapPin size={16} className="text-green-300" />
              <span className="text-sm">
                <span className="font-bold text-white">
                  {todayStats.onTimeRate}%
                </span>{" "}
                on-time
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Status Overview */}
      <div className="bg-red-700 bg-opacity-30 px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          {/* Left: Current Status */}
          <div className="flex items-center space-x-4 text-orange-200">
            <span>
              📋 <strong className="text-white">4</strong> pending orders
            </span>
            <span>
              🚗 <strong className="text-white">6</strong> out for delivery
            </span>
            <span>
              ⏰ Next delivery in{" "}
              <strong className="text-white">8 minutes</strong>
            </span>
          </div>

          {/* Right: Time */}
          <div className="text-orange-200 flex items-center space-x-1">
            <Clock size={14} className="text-orange-300" />
            <span className="font-mono">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        onOrderCreated={(order) => {
          onNewOrder?.(order);
          setShowNewOrderModal(false);
        }}
      />
    </div>
  );
};

export default RestaurantDashboardHeader;
