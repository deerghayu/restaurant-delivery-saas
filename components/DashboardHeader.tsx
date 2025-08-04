"use client";
import React, { useState, useEffect } from "react";
import { 
  Bell, 
  Plus, 
  Users, 
  Clock, 
  TrendingUp, 
  Settings, 
  LogOut, 
  User,
  ChevronDown,
  Activity,
  MapPin,
  Timer
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import {
  Button,
  Card,
  CardContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator
} from "@/components/ui";
import { getBrandColor, getRestaurantDisplayName } from "@/utils/restaurant";

interface DashboardHeaderProps {
  onNewOrder?: () => void;
}

const DashboardHeader = ({ onNewOrder }: DashboardHeaderProps) => {
  const { user, restaurant, signOut } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [mounted, setMounted] = useState(false);
  
  const [todayStats, setTodayStats] = useState({
    ordersCompleted: 23,
    activeDrivers: 3,
    avgDeliveryTime: 34,
    onTimeRate: 89,
    revenue: 1247.50
  });

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const getPerformanceStatus = () => {
    if (todayStats.onTimeRate >= 90) return { status: "excellent", color: "success" };
    if (todayStats.onTimeRate >= 85) return { status: "good", color: "info" };
    if (todayStats.onTimeRate >= 70) return { status: "fair", color: "warning" };
    return { status: "needs attention", color: "destructive" };
  };

  const getTimeBasedGreeting = () => {
    if (!mounted) return "Hello";
    const hour = currentTime.getHours();
    if (hour < 11) return "Good morning";
    if (hour < 17) return "Good afternoon";
    if (hour < 22) return "Good evening";
    return "Working late";
  };

  const formatDateTime = () => {
    if (!mounted) return { date: "Loading...", time: "Loading..." };
    return {
      date: currentTime.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "short",
      }),
      time: currentTime.toLocaleTimeString("en-AU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    };
  };

  const { date, time } = formatDateTime();
  const performance = getPerformanceStatus();
  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="border-b bg-gradient-to-r from-orange-500 to-red-500 text-white">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section: Restaurant Info */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 border-2 border-white/20">
              {restaurant?.logo_url ? (
                <AvatarImage src={restaurant.logo_url} alt={restaurant?.name} />
              ) : (
                <AvatarFallback className="bg-white text-brand text-lg font-bold">
                  🍕
                </AvatarFallback>
              )}
            </Avatar>
            
            <div>
              <h1 className="text-xl font-bold">
                {getRestaurantDisplayName(restaurant)}
              </h1>
              <p className="text-brand-subtle text-sm">
                {getTimeBasedGreeting()}, {user?.email?.split('@')[0] || 'User'}! • {date}
              </p>
            </div>
          </div>

          {/* Center Section: Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-4 bg-white/10 rounded-lg px-4 py-2">
              <div className="text-center">
                <div className="text-lg font-bold">{todayStats.ordersCompleted}</div>
                <div className="text-xs text-brand-subtle">Orders</div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-lg font-bold">{todayStats.activeDrivers}</div>
                <div className="text-xs text-brand-subtle">Drivers</div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-lg font-bold">${todayStats.revenue}</div>
                <div className="text-xs text-brand-subtle">Revenue</div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-white/20" />
              <div className="text-center">
                <div className="text-lg font-bold">{todayStats.onTimeRate}%</div>
                <div className="text-xs text-brand-subtle">On-time</div>
              </div>
            </div>
          </div>

          {/* Right Section: Actions & User Menu */}
          <div className="flex items-center space-x-3">
            {/* Performance Status */}
            <Badge 
              variant={performance.color === "success" ? "success" : 
                       performance.color === "warning" ? "warning" : 
                       performance.color === "destructive" ? "destructive" : "info"}
              className="hidden md:inline-flex"
            >
              <Activity className="w-3 h-3 mr-1" />
              {performance.status}
            </Badge>

            {/* Online Status */}
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`} />
              <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 border-0">
                2
              </Badge>
            </Button>

            {/* New Order Button */}
            <Button 
              onClick={onNewOrder}
              className="bg-white text-brand hover:bg-brand-light"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Order
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-white/20 text-white text-sm">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">{restaurant?.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/drivers" className="cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    Drivers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Performance Message Bar */}
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">
                {performance.status === "excellent" && "🌟 Outstanding performance! Your customers are delighted today!"}
                {performance.status === "good" && "🎉 Great work! Keep up the excellent service!"}
                {performance.status === "fair" && "👍 Steady progress! Let's aim for even better results!"}
                {performance.status === "needs attention" && "💪 Room for improvement - your team's got this!"}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Timer className="h-3 w-3" />
                <span>{todayStats.avgDeliveryTime}min avg</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;