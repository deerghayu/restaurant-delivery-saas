import RestaurantDashboardHeader from "@/components/RestaurantDashboardHeader";
import OrderStatusBoard from "@/components/OrderStatusBoard";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <RestaurantDashboardHeader />
      <OrderStatusBoard />
    </div>
  );
}
