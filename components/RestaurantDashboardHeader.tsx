"use client";
import React, { useState, useEffect } from "react";
import { Bell, Plus, Users, Clock, TrendingUp, MapPin, LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import NewOrderModal from "./NewOrderModal";
import { getBrandColor, getRestaurantDisplayName } from "@/utils/restaurant";

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

  // Enhanced emotional messaging based on performance and context
  const getPerformanceMessage = () => {
    const hour = currentTime.getHours();
    const isLunchRush = hour >= 11 && hour <= 14;
    const isDinnerRush = hour >= 17 && hour <= 21;
    
    if (todayStats.onTimeRate >= 90) {
      return {
        text: "🌟 Outstanding! Your customers are absolutely delighted today!",
        mood: "celebrating",
        bgColor: "bg-gradient-to-r from-green-400 to-emerald-500",
        textColor: "text-white"
      };
    } else if (todayStats.onTimeRate >= 85) {
      return {
        text: `🎉 Fantastic work! ${todayStats.ordersCompleted} happy customers served today!`,
        mood: "celebrating",
        bgColor: "bg-gradient-to-r from-green-300 to-green-400",
        textColor: "text-white"
      };
    } else if (todayStats.onTimeRate >= 70) {
      const rushMessage = isLunchRush ? "Great lunch rush handling!" : isDinnerRush ? "Dinner service looking good!" : "Steady rhythm today!";
      return { 
        text: `👍 ${rushMessage} Your kitchen crew is doing well!`, 
        mood: "steady",
        bgColor: "bg-gradient-to-r from-blue-400 to-blue-500",
        textColor: "text-white"
      };
    } else {
      const encouragement = todayStats.ordersCompleted > 10 ? "Busy day - let's fine-tune the flow!" : "Every great restaurant has room to grow!";
      return {
        text: `💪 ${encouragement} Your team's got this!`,
        mood: "improving",
        bgColor: "bg-gradient-to-r from-orange-400 to-amber-500",
        textColor: "text-white"
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

  const brandColor = getBrandColor(restaurant);

  return (
    <div 
      className="text-white shadow-lg"
      style={{ 
        background: `linear-gradient(to right, ${brandColor}, ${brandColor}dd)` 
      }}
    >
      {/* Main Header */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Restaurant Branding & Greeting */}
          <div className="flex items-center space-x-4">
            {/* Restaurant Logo */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
              {restaurant?.logo_url ? (
                <img 
                  src={restaurant.logo_url} 
                  alt={`${restaurant.name} logo`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <span className="text-2xl">🍕</span>
              )}
            </div>

            {/* Greeting & Restaurant Name */}
            <div>
              <h1 className="text-2xl font-bold">{getRestaurantDisplayName(restaurant)}</h1>
              <p className="text-orange-100 text-sm">
                {getTimeBasedGreeting()}, {user?.email?.split('@')[0] || 'User'}!
                <span className="ml-2 text-xs opacity-75">
                  {formatDate(currentTime)} • {restaurant?.suburb}, {restaurant?.state}
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
                  <Link
                    href="/drivers"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Users size={16} />
                    <span>Drivers</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </Link>
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

      {/* Enhanced Performance Stats Bar with Emotional Design */}
      <div className={`${performanceMessage.bgColor} px-6 py-4 border-t border-white border-opacity-20 relative overflow-hidden`}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
        </div>
        
        <div className="flex items-center justify-between relative z-10">
          {/* Enhanced Performance Message */}
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full bg-white animate-pulse shadow-lg`}></div>
            <div className="flex flex-col">
              <span className={`${performanceMessage.textColor} text-base font-semibold leading-tight`}>
                {performanceMessage.text}
              </span>
              <span className={`${performanceMessage.textColor} opacity-90 text-xs mt-0.5`}>
                Keep up the amazing hospitality! 🏆
              </span>
            </div>
          </div>

          {/* Today's Emotional Metrics */}
          <div className="flex items-center space-x-8">
            {/* Happy Customers */}
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <TrendingUp size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">
                  {todayStats.ordersCompleted}
                </span>
                <span className="text-xs opacity-90">
                  happy customers
                </span>
              </div>
            </div>

            {/* Delivery Family */}
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Users size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">
                  {todayStats.activeDrivers}
                </span>
                <span className="text-xs opacity-90">
                  delivery heroes
                </span>
              </div>
            </div>

            {/* Kitchen Efficiency */}
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Clock size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">
                  {todayStats.avgDeliveryTime}min
                </span>
                <span className="text-xs opacity-90">
                  kitchen magic
                </span>
              </div>
            </div>

            {/* Excellence Rate */}
            <div className="flex items-center space-x-2 text-white">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <MapPin size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none">
                  {todayStats.onTimeRate}%
                </span>
                <span className="text-xs opacity-90">
                  excellence rate
                </span>
              </div>
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
