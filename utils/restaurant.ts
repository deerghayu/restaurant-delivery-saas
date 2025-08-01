import { Restaurant } from '@/types/database';

/**
 * Get restaurant ID from restaurant object, handling different field name possibilities
 */
export const getRestaurantId = (restaurant: Restaurant | any): string | null => {
  if (!restaurant) return null;
  return restaurant.id || restaurant.restaurant_id || restaurant.restaurantId || null;
};

/**
 * Format restaurant address for display
 */
export const formatRestaurantAddress = (restaurant: Restaurant): string => {
  const parts = [
    restaurant.street_address,
    restaurant.suburb,
    restaurant.state,
    restaurant.postcode
  ].filter(Boolean);
  
  return parts.join(', ');
};

/**
 * Get restaurant display name with fallback
 */
export const getRestaurantDisplayName = (restaurant: Restaurant | null): string => {
  return restaurant?.name || 'Restaurant Dashboard';
};

/**
 * Check if restaurant has complete address information
 */
export const hasCompleteAddress = (restaurant: Restaurant): boolean => {
  return !!(
    restaurant.street_address?.trim() &&
    restaurant.suburb?.trim() &&
    restaurant.state?.trim() &&
    restaurant.postcode?.trim()
  );
};

/**
 * Get brand color with fallback
 */
export const getBrandColor = (restaurant: Restaurant | null): string => {
  return restaurant?.primary_color || '#ea580c';
};

/**
 * Check if restaurant profile is complete
 */
export const isRestaurantProfileComplete = (restaurant: Restaurant): boolean => {
  return !!(
    restaurant.name?.trim() &&
    restaurant.phone?.trim() &&
    hasCompleteAddress(restaurant) &&
    restaurant.average_prep_time > 0 &&
    restaurant.delivery_radius > 0
  );
};