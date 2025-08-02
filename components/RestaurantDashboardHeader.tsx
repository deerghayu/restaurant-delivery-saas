"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bell, Plus, Users, Clock, TrendingUp, MapPin, LogOut, User, Settings } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import NewOrderModal from "./NewOrderModal";
import { getBrandColor, getRestaurantDisplayName } from "@/utils/restaurant";

interface RestaurantDashboardHeaderProps {
  onNewOrder?: (order: any) => void;
  showNewOrderModal?: boolean;
  setShowNewOrderModal?: (show: boolean) => void;
}

const RestaurantDashboardHeader = ({ 
  onNewOrder, 
  showNewOrderModal: externalShowModal, 
  setShowNewOrderModal: externalSetShowModal 
}: RestaurantDashboardHeaderProps) => {
  const { user, restaurant, signOut } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [internalShowModal, setInternalShowModal] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Use external state if provided, otherwise use internal state
  const showNewOrderModal = externalShowModal !== undefined ? externalShowModal : internalShowModal;
  const setShowNewOrderModal = externalSetShowModal || setInternalShowModal;
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

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      className="text-white shadow-lg relative"
      style={{ 
        background: `linear-gradient(135deg, #dc2626 0%, #ea580c 100%)` 
      }}
    >

      <div className="px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Left: Restaurant Branding & Greeting */}
          <div className="flex items-center space-x-4">
            {/* Restaurant Logo */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              {restaurant?.logo_url ? (
                <img 
                  src={restaurant.logo_url} 
                  alt={`${restaurant.name} logo`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <span className="text-xl">🍕</span>
              )}
            </div>

            {/* Restaurant Info & Performance Message */}
            <div>
              <h1 className="text-2xl font-bold mb-1">{getRestaurantDisplayName(restaurant)}</h1>
              <p className="text-orange-100 text-sm">
                {getTimeBasedGreeting()}, {user?.email?.split('@')[0] || 'User'}! • {formatDate(currentTime)}
              </p>
            </div>
          </div>

          {/* Right: Quick Actions & Stats */}
          <div className="flex items-center space-x-6">
            {/* Compact Stats */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{todayStats.ordersCompleted}</div>
                <div className="text-xs opacity-80">orders today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todayStats.activeDrivers}</div>
                <div className="text-xs opacity-80">active drivers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todayStats.avgDeliveryTime}min</div>
                <div className="text-xs opacity-80">avg prep time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{todayStats.onTimeRate}%</div>
                <div className="text-xs opacity-80">on-time rate</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg">
                  <Bell size={18} />
                </button>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">2</span>
                </div>
              </div>

              {/* Online Status */}
              <div className="flex items-center space-x-2 bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`}></div>
                <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
              </div>

              {/* User Menu */}
              <div className="relative z-[99999]" ref={userMenuRef}>
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg"
                >
                  <User size={18} />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-[99999]">
                    <div className="px-4 py-3 border-b border-gray-200">
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
