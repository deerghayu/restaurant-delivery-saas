"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardHeader from "@/components/DashboardHeader";
import OrderStatusBoard from "@/components/OrderStatusBoard";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  Button,
  Input,
  Label,
  Textarea
} from "@/components/ui";

// Modern New Order Form Component
const NewOrderForm = ({ onOrderCreated, onCancel }: { 
  onOrderCreated: (order: any) => void;
  onCancel: () => void;
}) => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [items, setItems] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newOrder = {
      id: `ORD-${Date.now()}`,
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      items: items.split(',').map(item => item.trim()),
      total_amount: parseFloat(totalAmount),
      status: "confirmed",
      created_at: new Date().toISOString(),
      estimated_delivery: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      special_instructions: specialInstructions || undefined
    };

    onOrderCreated(newOrder);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer-name">Customer Name</Label>
          <Input
            id="customer-name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="customer-phone">Phone</Label>
          <Input
            id="customer-phone"
            type="tel"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customer-address">Delivery Address</Label>
        <Input
          id="customer-address"
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="items">Items (comma separated)</Label>
        <Input
          id="items"
          type="text"
          value={items}
          onChange={(e) => setItems(e.target.value)}
          placeholder="e.g. Margherita Pizza, Garlic Bread, Coke"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="total-amount">Total Amount ($)</Label>
        <Input
          id="total-amount"
          type="number"
          step="0.01"
          value={totalAmount}
          onChange={(e) => setTotalAmount(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="special-instructions">Special Instructions (optional)</Label>
        <Textarea
          id="special-instructions"
          value={specialInstructions}
          onChange={(e) => setSpecialInstructions(e.target.value)}
          placeholder="Any special requests or notes..."
          rows={3}
        />
      </div>

      <div className="flex space-x-3 pt-4">
        <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
          Create Order
        </Button>
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

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
      <div className="min-h-screen bg-orange-50">
        <DashboardHeader onNewOrder={handleNewOrderClick} />
        <OrderStatusBoard 
          newOrder={newOrder} 
          onNewOrderClick={handleNewOrderClick}
        />

        {/* New Order Modal */}
        <Dialog open={showNewOrderModal} onOpenChange={setShowNewOrderModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Order</DialogTitle>
              <DialogDescription>
                Add a new order to your restaurant's queue
              </DialogDescription>
            </DialogHeader>
            <NewOrderForm
              onOrderCreated={handleNewOrder}
              onCancel={() => setShowNewOrderModal(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
