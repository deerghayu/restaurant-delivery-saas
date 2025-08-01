import { z } from 'zod';

// Driver validation schema
export const createDriverSchema = z.object({
  restaurant_id: z.string().uuid('Invalid restaurant ID'),
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
  email: z.string()
    .email('Invalid email format')
    .optional()
    .or(z.literal('')),
  avatar_emoji: z.string()
    .min(1, 'Avatar emoji is required')
    .max(10, 'Avatar emoji too long'),
  vehicle_type: z.enum(['car', 'bike', 'scooter', 'motorcycle', 'van'], {
    errorMap: () => ({ message: 'Invalid vehicle type' })
  }),
  license_plate: z.string()
    .max(10, 'License plate must be less than 10 characters')
    .regex(/^[A-Z0-9\s-]*$/, 'License plate can only contain letters, numbers, spaces, and hyphens')
    .optional()
    .or(z.literal(''))
});

export const updateDriverSchema = createDriverSchema.extend({
  id: z.string().uuid('Invalid driver ID')
});

// Restaurant validation schema
export const restaurantProfileSchema = z.object({
  name: z.string()
    .min(2, 'Restaurant name must be at least 2 characters')
    .max(100, 'Restaurant name must be less than 100 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
  street_address: z.string()
    .min(5, 'Street address must be at least 5 characters')
    .max(200, 'Street address too long'),
  suburb: z.string()
    .min(2, 'Suburb must be at least 2 characters')
    .max(50, 'Suburb too long'),
  state: z.enum(['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'], {
    errorMap: () => ({ message: 'Invalid Australian state' })
  }),
  postcode: z.string()
    .length(4, 'Australian postcode must be 4 digits')
    .regex(/^\d{4}$/, 'Postcode must contain only digits'),
  primary_color: z.string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color format'),
  average_prep_time: z.number()
    .min(5, 'Prep time must be at least 5 minutes')
    .max(120, 'Prep time must be less than 120 minutes'),
  delivery_radius: z.number()
    .min(1, 'Delivery radius must be at least 1 km')
    .max(50, 'Delivery radius must be less than 50 km'),
  minimum_order: z.number()
    .min(0, 'Minimum order cannot be negative')
    .max(200, 'Minimum order too high'),
  delivery_fee: z.number()
    .min(0, 'Delivery fee cannot be negative')
    .max(50, 'Delivery fee too high')
});

// Order validation schema
export const createOrderSchema = z.object({
  restaurant_id: z.string().uuid('Invalid restaurant ID'),
  customer_name: z.string()
    .min(2, 'Customer name must be at least 2 characters')
    .max(50, 'Customer name too long'),
  customer_phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format'),
  customer_email: z.string()
    .email('Invalid email format')
    .optional()
    .or(z.literal('')),
  delivery_address: z.string()
    .min(10, 'Delivery address must be at least 10 characters')
    .max(300, 'Delivery address too long'),
  special_instructions: z.string()
    .max(500, 'Special instructions too long')
    .optional()
    .or(z.literal('')),
  items: z.array(z.object({
    name: z.string().min(1, 'Item name required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    price: z.number().min(0, 'Price cannot be negative')
  })).min(1, 'At least one item is required')
});

// Helper function to validate and return errors
export const validateData = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);
  
  if (!result.success) {
    const errors = result.error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }));
    return { success: false, errors, data: null };
  }
  
  return { success: true, errors: null, data: result.data };
};