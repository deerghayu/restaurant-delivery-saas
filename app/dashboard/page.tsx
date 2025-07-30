"use client";
import { useState } from "react";
import RestaurantDashboardHeader from "@/components/RestaurantDashboardHeader";
import OrderStatusBoard from "@/components/OrderStatusBoard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [newOrder, setNewOrder] = useState<any | null>(null);

  const handleNewOrder = (order: any) => {
    setNewOrder(order);
    // Clear the new order after a short delay to allow the component to process it
    setTimeout(() => setNewOrder(null), 1000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <RestaurantDashboardHeader onNewOrder={handleNewOrder} />
        <OrderStatusBoard newOrder={newOrder} />
      </div>
    </ProtectedRoute>
  );
}
