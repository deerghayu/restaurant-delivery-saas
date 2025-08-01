import { 
  getRestaurantId, 
  formatRestaurantAddress, 
  getBrandColor, 
  hasCompleteAddress,
  isRestaurantProfileComplete 
} from '@/utils/restaurant';
import { Restaurant } from '@/types/database';

// Mock restaurant data
const mockRestaurant: Restaurant = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  created_at: '2023-01-01T00:00:00Z',
  updated_at: '2023-01-01T00:00:00Z',
  name: 'Test Restaurant',
  email: 'test@restaurant.com',
  phone: '0412345678',
  street_address: '123 Test Street',
  suburb: 'Testville',
  state: 'NSW',
  postcode: '2000',
  logo_url: null,
  primary_color: '#ea580c',
  business_hours: null,
  average_prep_time: 15,
  delivery_radius: 10,
  minimum_order: 25,
  delivery_fee: 5,
  subscription_plan: 'basic',
  subscription_status: 'active',
  trial_ends_at: '2023-12-31T00:00:00Z',
  is_active: true,
  owner_id: '456e7890-e89b-12d3-a456-426614174000'
};

describe('Restaurant Utils', () => {
  describe('getRestaurantId', () => {
    it('should return id when restaurant has id field', () => {
      expect(getRestaurantId(mockRestaurant)).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should return restaurant_id when restaurant has restaurant_id field', () => {
      const restaurantWithAltId = { restaurant_id: 'alt-id', name: 'Test' };
      expect(getRestaurantId(restaurantWithAltId)).toBe('alt-id');
    });

    it('should return null when restaurant is null or undefined', () => {
      expect(getRestaurantId(null)).toBe(null);
      expect(getRestaurantId(undefined)).toBe(null);
    });

    it('should return null when restaurant has no id fields', () => {
      const restaurantWithoutId = { name: 'Test' };
      expect(getRestaurantId(restaurantWithoutId)).toBe(null);
    });
  });

  describe('formatRestaurantAddress', () => {
    it('should format complete address correctly', () => {
      const expected = '123 Test Street, Testville, NSW, 2000';
      expect(formatRestaurantAddress(mockRestaurant)).toBe(expected);
    });

    it('should handle missing address parts', () => {
      const incompleteRestaurant = {
        ...mockRestaurant,
        street_address: '',
        suburb: 'Testville'
      };
      expect(formatRestaurantAddress(incompleteRestaurant)).toBe('Testville, NSW, 2000');
    });
  });

  describe('getBrandColor', () => {
    it('should return restaurant primary color', () => {
      expect(getBrandColor(mockRestaurant)).toBe('#ea580c');
    });

    it('should return default color when restaurant is null', () => {
      expect(getBrandColor(null)).toBe('#ea580c');
    });

    it('should return default color when primary_color is not set', () => {
      const restaurantWithoutColor = { ...mockRestaurant, primary_color: '' };
      expect(getBrandColor(restaurantWithoutColor)).toBe('#ea580c');
    });
  });

  describe('hasCompleteAddress', () => {
    it('should return true for complete address', () => {
      expect(hasCompleteAddress(mockRestaurant)).toBe(true);
    });

    it('should return false for incomplete address', () => {
      const incompleteRestaurant = { ...mockRestaurant, street_address: '' };
      expect(hasCompleteAddress(incompleteRestaurant)).toBe(false);
    });
  });

  describe('isRestaurantProfileComplete', () => {
    it('should return true for complete profile', () => {
      expect(isRestaurantProfileComplete(mockRestaurant)).toBe(true);
    });

    it('should return false for incomplete profile', () => {
      const incompleteRestaurant = { ...mockRestaurant, name: '' };
      expect(isRestaurantProfileComplete(incompleteRestaurant)).toBe(false);
    });

    it('should return false when business settings are missing', () => {
      const incompleteRestaurant = { ...mockRestaurant, average_prep_time: 0 };
      expect(isRestaurantProfileComplete(incompleteRestaurant)).toBe(false);
    });
  });
});