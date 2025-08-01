"use client";
import { useState } from "react";
import RestaurantDashboardHeader from "@/components/RestaurantDashboardHeader";
import OrderStatusBoard from "@/components/OrderStatusBoard";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Dashboard() {
  const [newOrder, setNewOrder] = useState<any | null>(null);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const handleNewOrder = (order: any) => {
    setNewOrder(order);
    setShowNewOrderModal(false);
    // Clear the new order after a short delay to allow the component to process it
    setTimeout(() => setNewOrder(null), 1000);
  };

  const handleNewOrderClick = () => {
    setShowNewOrderModal(true);
  };

  return (
    <ProtectedRoute>
      <div className="bg-gradient-to-br from-orange-50 to-red-50 min-h-screen custom-scrollbar">
        <RestaurantDashboardHeader 
          onNewOrder={handleNewOrder} 
          showNewOrderModal={showNewOrderModal}
          setShowNewOrderModal={setShowNewOrderModal}
        />
        <OrderStatusBoard 
          newOrder={newOrder} 
          onNewOrderClick={handleNewOrderClick}
        />
      </div>
    </ProtectedRoute>
  );
}
