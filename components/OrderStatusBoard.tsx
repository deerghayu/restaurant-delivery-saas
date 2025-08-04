"use client";
import React, { useState, useEffect } from "react";
import {
  Clock,
  User,
  MapPin,
  Phone,
  Car,
  CheckCircle,
  Timer,
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
  Package,
  Truck,
  ChefHat
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Avatar,
  AvatarFallback,
  Separator
} from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: string[];
  total_amount: number;
  status: string;
  created_at: string;
  estimated_delivery: string;
  driver_id?: string;
  driver_name?: string;
  special_instructions?: string;
}

interface OrderStatusBoardProps {
  newOrder?: any | null;
  onNewOrderClick?: () => void;
}

const OrderStatusBoard = ({ newOrder, onNewOrderClick }: OrderStatusBoardProps) => {
  const { restaurant } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "ORD-001",
        customer_name: "Sarah Johnson",
        customer_phone: "+61 412 345 678",
        customer_address: "123 Collins St, Melbourne VIC 3000",
        items: ["Margherita Pizza", "Caesar Salad", "Garlic Bread"],
        total_amount: 47.50,
        status: "confirmed",
        created_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        estimated_delivery: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
        special_instructions: "Extra cheese please"
      },
      {
        id: "ORD-002",
        customer_name: "Mike Chen",
        customer_phone: "+61 423 456 789",
        customer_address: "456 Flinders St, Melbourne VIC 3000",
        items: ["Pepperoni Pizza", "Coke"],
        total_amount: 32.00,
        status: "preparing",
        created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        estimated_delivery: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      },
      {
        id: "ORD-003",
        customer_name: "Emma Wilson",
        customer_phone: "+61 434 567 890",
        customer_address: "789 Bourke St, Melbourne VIC 3000",
        items: ["Hawaiian Pizza", "Chocolate Cake"],
        total_amount: 39.90,
        status: "ready",
        created_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        estimated_delivery: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        driver_id: "DRV-001",
        driver_name: "Tony Rodriguez"
      },
      {
        id: "ORD-004",
        customer_name: "David Kim",
        customer_phone: "+61 445 678 901",
        customer_address: "321 Spencer St, Melbourne VIC 3000",
        items: ["Meat Lovers Pizza", "Wings", "Sprite"],
        total_amount: 55.80,
        status: "delivering",
        created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        estimated_delivery: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        driver_id: "DRV-002",
        driver_name: "Lisa Park"
      }
    ];

    setOrders(mockOrders);
    setLoading(false);

    // Add new order if provided
    if (newOrder) {
      setOrders(prev => [newOrder, ...prev]);
    }
  }, [newOrder]);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "confirmed": return "info";
      case "preparing": return "warning";
      case "ready": return "success";
      case "delivering": return "orange";
      case "delivered": return "success";
      case "cancelled": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed": return <CheckCircle className="w-4 h-4" />;
      case "preparing": return <ChefHat className="w-4 h-4" />;
      case "ready": return <Package className="w-4 h-4" />;
      case "delivering": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const groupedOrders = {
    confirmed: filteredOrders.filter(o => o.status === "confirmed"),
    preparing: filteredOrders.filter(o => o.status === "preparing"),
    ready: filteredOrders.filter(o => o.status === "ready"),
    delivering: filteredOrders.filter(o => o.status === "delivering"),
  };

  const OrderCard = ({ order }: { order: Order }) => {
    const timeAgo = new Date(Date.now() - new Date(order.created_at).getTime()).getMinutes();
    
    return (
      <Card className="mb-4 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Badge variant={getStatusVariant(order.status)} className="flex items-center space-x-1">
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </Badge>
              <span className="font-medium text-sm">{order.id}</span>
              <span className="text-muted-foreground text-xs">{timeAgo}m ago</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {order.status === "confirmed" && (
                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "preparing")}>
                    Start Preparing
                  </DropdownMenuItem>
                )}
                {order.status === "preparing" && (
                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "ready")}>
                    Mark Ready
                  </DropdownMenuItem>
                )}
                {order.status === "ready" && (
                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivering")}>
                    Out for Delivery
                  </DropdownMenuItem>
                )}
                {order.status === "delivering" && (
                  <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                    Mark Delivered
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{order.customer_name}</span>
              </div>
              <span className="font-bold text-green-600">${order.total_amount.toFixed(2)}</span>
            </div>

            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
              <span className="text-sm text-muted-foreground">{order.customer_address}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{order.customer_phone}</span>
            </div>

            <div className="border-t pt-2 mt-2">
              <div className="text-sm">
                <strong>Items:</strong> {order.items.join(", ")}
              </div>
              {order.special_instructions && (
                <div className="text-sm text-brand mt-1">
                  <strong>Note:</strong> {order.special_instructions}
                </div>
              )}
            </div>

            {order.driver_name && (
              <div className="flex items-center space-x-2 bg-blue-50 p-2 rounded">
                <Car className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Driver: {order.driver_name}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your restaurant orders in real-time
          </p>
        </div>
        <Button onClick={onNewOrderClick} className="btn-brand">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivering">Delivering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Order Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Confirmed Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
              Confirmed ({groupedOrders.confirmed.length})
            </h2>
          </div>
          <div className="space-y-3">
            {groupedOrders.confirmed.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            {groupedOrders.confirmed.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No confirmed orders
              </div>
            )}
          </div>
        </div>

        {/* Preparing Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center">
              <ChefHat className="w-4 h-4 mr-2 text-yellow-500" />
              Preparing ({groupedOrders.preparing.length})
            </h2>
          </div>
          <div className="space-y-3">
            {groupedOrders.preparing.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            {groupedOrders.preparing.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders in preparation
              </div>
            )}
          </div>
        </div>

        {/* Ready Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center">
              <Package className="w-4 h-4 mr-2 text-green-500" />
              Ready ({groupedOrders.ready.length})
            </h2>
          </div>
          <div className="space-y-3">
            {groupedOrders.ready.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            {groupedOrders.ready.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders ready
              </div>
            )}
          </div>
        </div>

        {/* Delivering Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center">
              <Truck className="w-4 h-4 mr-2 text-brand" />
              Delivering ({groupedOrders.delivering.length})
            </h2>
          </div>
          <div className="space-y-3">
            {groupedOrders.delivering.map(order => (
              <OrderCard key={order.id} order={order} />
            ))}
            {groupedOrders.delivering.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders out for delivery
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusBoard;