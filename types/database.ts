// Database types for the restaurant delivery SaaS
export interface Restaurant {
  id: string;
  created_at: string;
  updated_at: string;
  
  // Basic Info
  name: string;
  email: string;
  phone: string;
  
  // Address (Australian format)
  street_address: string;
  suburb: string;
  state: string;
  postcode: string;
  
  // Branding & Customization
  logo_url: string | null;
  primary_color: string;
  menu_items: any | null; // JSONB
  business_hours: any | null; // JSONB
  
  // Business Settings
  average_prep_time: number;
  delivery_radius: number;
  minimum_order: number;
  delivery_fee: number;
  
  // Subscription & Status
  subscription_plan: string;
  subscription_status: string;
  trial_ends_at: string;
  is_active: boolean;
  
  // Owner relationship
  owner_id: string;
}

export interface Driver {
  id: string;
  restaurant_id: string;
  name: string;
  phone: string;
  email: string | null;
  avatar_emoji: string;
  status: 'offline' | 'available' | 'busy' | 'delivering';
  is_active: boolean;
  total_deliveries: number;
  average_rating: number;
  total_rating_count: number;
  vehicle_type: string;
  license_plate: string | null;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  restaurant_id: string;
  driver_id: string | null;
  
  // Order Identification
  order_number: string;
  
  // Customer Information
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  
  // Delivery Address
  delivery_address: string;
  delivery_suburb: string | null;
  delivery_postcode: string | null;
  delivery_notes: string | null;
  
  // Order Details
  items: any; // JSONB
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  
  // Special Instructions
  special_instructions: string | null;
  
  // Order Status & Timing
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'assigned' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  
  // Timestamps
  confirmed_at: string | null;
  ready_at: string | null;
  assigned_at: string | null;
  picked_up_at: string | null;
  delivered_at: string | null;
  
  // Estimated Times
  estimated_ready_at: string | null;
  estimated_delivery_at: string | null;
  
  // Payment
  payment_method: 'cash' | 'card' | 'online';
  payment_status: 'pending' | 'paid' | 'refunded';
  
  // Customer Feedback
  customer_rating: number | null;
  customer_feedback: string | null;
}

export interface RestaurantUser {
  id: string;
  restaurant_id: string;
  user_id: string;
  role: 'owner' | 'manager' | 'staff';
  created_at: string;
  updated_at: string;
}

export interface OrderTracking {
  id: string;
  created_at: string;
  order_id: string;
  status: string;
  notes: string | null;
  created_by: string | null;
  latitude: number | null;
  longitude: number | null;
}