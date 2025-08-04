// App Configuration
export const APP_CONFIG = {
  // Timeouts (in milliseconds)
  SESSION_TIMEOUT: 2000,
  MESSAGE_AUTO_CLEAR_DELAY: 3000,
  DEBOUNCE_DELAY: 300,
  
  // Pagination
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  
  // File Upload
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  
  // Business Rules
  MIN_PREP_TIME: 5,
  MAX_PREP_TIME: 120,
  MIN_DELIVERY_RADIUS: 1,
  MAX_DELIVERY_RADIUS: 50,
  MIN_ORDER_VALUE: 0,
  MAX_ORDER_VALUE: 1000,
  
  // UI
  TOAST_DURATION: 4000,
  LOADING_SKELETON_ITEMS: 3,
} as const;

// Australian States
export const AUSTRALIAN_STATES = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' }
] as const;

// Vehicle Types
export const VEHICLE_TYPES = [
  { value: 'car', label: 'Car', emoji: '🚗' },
  { value: 'bike', label: 'Bike', emoji: '🚲' },
  { value: 'scooter', label: 'Scooter', emoji: '🛵' },
  { value: 'motorcycle', label: 'Motorcycle', emoji: '🏍️' },
  { value: 'van', label: 'Van', emoji: '🚐' }
] as const;

// Order Status Configuration
export const ORDER_STATUS_CONFIG = {
  pending: { 
    color: 'bg-muted text-muted-foreground border-border', 
    label: 'Pending',
    nextStatus: 'confirmed'
  },
  confirmed: { 
    color: 'bg-accent text-accent-foreground border-border', 
    label: 'Confirmed',
    nextStatus: 'preparing'
  },
  preparing: { 
    color: 'bg-primary/10 text-primary border-border', 
    label: 'Preparing',
    nextStatus: 'ready'
  },
  ready: { 
    color: 'bg-accent text-accent-foreground border-border', 
    label: 'Ready',
    nextStatus: 'assigned'
  },
  assigned: { 
    color: 'bg-secondary text-secondary-foreground border-border', 
    label: 'Assigned',
    nextStatus: 'picked_up'
  },
  picked_up: { 
    color: 'bg-primary text-primary-foreground border-border', 
    label: 'Picked Up',
    nextStatus: 'out_for_delivery'
  },
  out_for_delivery: { 
    color: 'bg-primary text-primary-foreground border-border', 
    label: 'Out for Delivery',
    nextStatus: 'delivered'
  },
  delivered: { 
    color: 'bg-accent text-accent-foreground border-border', 
    label: 'Delivered',
    nextStatus: null
  },
  cancelled: { 
    color: 'bg-destructive text-destructive-foreground border-border', 
    label: 'Cancelled',
    nextStatus: null
  }
} as const;

// Driver Status Configuration
export const DRIVER_STATUS_CONFIG = {
  offline: { 
    color: 'bg-muted text-muted-foreground border-border', 
    label: 'Offline' 
  },
  available: { 
    color: 'bg-accent text-accent-foreground border-border', 
    label: 'Available' 
  },
  busy: { 
    color: 'bg-secondary text-secondary-foreground border-border', 
    label: 'Busy' 
  },
  delivering: { 
    color: 'bg-primary text-primary-foreground border-border', 
    label: 'Delivering' 
  }
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // Authentication
  UNAUTHORIZED: 'You are not authorized to perform this action',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again',
  INVALID_CREDENTIALS: 'Invalid email or password',
  
  // Validation
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  
  // Network
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  
  // Business Logic
  RESTAURANT_NOT_FOUND: 'Restaurant not found',
  DRIVER_NOT_FOUND: 'Driver not found',
  ORDER_NOT_FOUND: 'Order not found',
  INSUFFICIENT_PERMISSIONS: 'You do not have permission to perform this action'
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DRIVER_CREATED: 'Driver added successfully!',
  DRIVER_UPDATED: 'Driver updated successfully!',
  DRIVER_DELETED: 'Driver removed successfully!',
  ORDER_CREATED: 'Order created successfully!',
  ORDER_UPDATED: 'Order updated successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  SETTINGS_SAVED: 'Settings saved successfully!'
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  DRIVERS: '/api/drivers',
  ORDERS: '/api/orders',
  RESTAURANTS: '/api/restaurants',
  SETTINGS: '/api/settings'
} as const;