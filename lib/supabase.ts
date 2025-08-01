import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          // Basic Info
          name: string
          email: string
          phone: string
          // Address (Australian format)
          street_address: string
          suburb: string
          state: string
          postcode: string
          // Branding & Customization
          logo_url: string | null
          primary_color: string
          business_hours: any | null // JSONB
          // Business Settings
          average_prep_time: number
          delivery_radius: number
          minimum_order: number
          delivery_fee: number
          // Subscription & Status
          subscription_plan: string
          subscription_status: string
          trial_ends_at: string
          is_active: boolean
          // Owner relationship (to be added)
          owner_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          // Basic Info
          name: string
          email: string
          phone: string
          // Address (Australian format)
          street_address: string
          suburb: string
          state: string
          postcode: string
          // Branding & Customization
          logo_url?: string | null
          primary_color?: string
          business_hours?: any | null // JSONB
          // Business Settings
          average_prep_time?: number
          delivery_radius?: number
          minimum_order?: number
          delivery_fee?: number
          // Subscription & Status
          subscription_plan?: string
          subscription_status?: string
          trial_ends_at?: string
          is_active?: boolean
          // Owner relationship
          owner_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          // Basic Info
          name?: string
          email?: string
          phone?: string
          // Address (Australian format)
          street_address?: string
          suburb?: string
          state?: string
          postcode?: string
          // Branding & Customization
          logo_url?: string | null
          primary_color?: string
          business_hours?: any | null // JSONB
          // Business Settings
          average_prep_time?: number
          delivery_radius?: number
          minimum_order?: number
          delivery_fee?: number
          // Subscription & Status
          subscription_plan?: string
          subscription_status?: string
          trial_ends_at?: string
          is_active?: boolean
          // Owner relationship
          owner_id?: string
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          restaurant_id: string
          driver_id: string | null
          // Order Identification
          order_number: string
          // Customer Information
          customer_name: string
          customer_phone: string
          customer_email: string | null
          // Delivery Address
          delivery_address: string
          delivery_suburb: string | null
          delivery_postcode: string | null
          delivery_notes: string | null
          // Order Details
          items: any // JSONB
          subtotal: number
          delivery_fee: number
          total_amount: number
          // Special Instructions
          special_instructions: string | null
          // Order Status & Timing
          status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'assigned' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled'
          priority: 'low' | 'normal' | 'high' | 'urgent'
          // Timestamps
          confirmed_at: string | null
          ready_at: string | null
          assigned_at: string | null
          picked_up_at: string | null
          delivered_at: string | null
          // Estimated Times
          estimated_ready_at: string | null
          estimated_delivery_at: string | null
          // Payment
          payment_method: 'cash' | 'card' | 'online'
          payment_status: 'pending' | 'paid' | 'refunded'
          // Customer Feedback
          customer_rating: number | null
          customer_feedback: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          restaurant_id: string
          driver_id?: string | null
          // Order Identification
          order_number: string
          // Customer Information
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          // Delivery Address
          delivery_address: string
          delivery_suburb?: string | null
          delivery_postcode?: string | null
          delivery_notes?: string | null
          // Order Details
          items: any // JSONB
          subtotal: number
          delivery_fee: number
          total_amount: number
          // Special Instructions
          special_instructions?: string | null
          // Order Status & Timing
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'assigned' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled'
          priority?: 'low' | 'normal' | 'high' | 'urgent'
          // Timestamps
          confirmed_at?: string | null
          ready_at?: string | null
          assigned_at?: string | null
          picked_up_at?: string | null
          delivered_at?: string | null
          // Estimated Times
          estimated_ready_at?: string | null
          estimated_delivery_at?: string | null
          // Payment
          payment_method?: 'cash' | 'card' | 'online'
          payment_status?: 'pending' | 'paid' | 'refunded'
          // Customer Feedback
          customer_rating?: number | null
          customer_feedback?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          restaurant_id?: string
          driver_id?: string | null
          // Order Identification
          order_number?: string
          // Customer Information
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          // Delivery Address
          delivery_address?: string
          delivery_suburb?: string | null
          delivery_postcode?: string | null
          delivery_notes?: string | null
          // Order Details
          items?: any // JSONB
          subtotal?: number
          delivery_fee?: number
          total_amount?: number
          // Special Instructions
          special_instructions?: string | null
          // Order Status & Timing
          status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'assigned' | 'picked_up' | 'out_for_delivery' | 'delivered' | 'cancelled'
          priority?: 'low' | 'normal' | 'high' | 'urgent'
          // Timestamps
          confirmed_at?: string | null
          ready_at?: string | null
          assigned_at?: string | null
          picked_up_at?: string | null
          delivered_at?: string | null
          // Estimated Times
          estimated_ready_at?: string | null
          estimated_delivery_at?: string | null
          // Payment
          payment_method?: 'cash' | 'card' | 'online'
          payment_status?: 'pending' | 'paid' | 'refunded'
          // Customer Feedback
          customer_rating?: number | null
          customer_feedback?: string | null
        }
      }
      order_tracking: {
        Row: {
          id: string
          created_at: string
          order_id: string
          status: string
          notes: string | null
          created_by: string | null // UUID reference to auth.users(id)
          // Location tracking (future feature)
          latitude: number | null
          longitude: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          order_id: string
          status: string
          notes?: string | null
          created_by?: string | null
          // Location tracking (future feature)
          latitude?: number | null
          longitude?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          order_id?: string
          status?: string
          notes?: string | null
          created_by?: string | null
          // Location tracking (future feature)
          latitude?: number | null
          longitude?: number | null
        }
      }
      drivers: {
        Row: {
          id: string
          restaurant_id: string
          name: string
          phone: string
          email: string | null
          avatar_emoji: string
          status: 'offline' | 'available' | 'busy' | 'delivering'
          is_active: boolean
          total_deliveries: number
          average_rating: number
          total_rating_count: number
          vehicle_type: string
          license_plate: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          name: string
          phone: string
          email?: string | null
          avatar_emoji?: string
          status?: 'offline' | 'available' | 'busy' | 'delivering'
          is_active?: boolean
          total_deliveries?: number
          average_rating?: number
          total_rating_count?: number
          vehicle_type?: string
          license_plate?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          name?: string
          phone?: string
          email?: string | null
          avatar_emoji?: string
          status?: 'offline' | 'available' | 'busy' | 'delivering'
          is_active?: boolean
          total_deliveries?: number
          average_rating?: number
          total_rating_count?: number
          vehicle_type?: string
          license_plate?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      restaurant_users: {
        Row: {
          id: string
          restaurant_id: string
          user_id: string
          role: 'owner' | 'manager' | 'staff'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          restaurant_id: string
          user_id: string
          role?: 'owner' | 'manager' | 'staff'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string
          user_id?: string
          role?: 'owner' | 'manager' | 'staff'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}