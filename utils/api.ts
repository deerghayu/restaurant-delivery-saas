import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create standardized API responses
 */
export const createApiResponse = <T>(
  data?: T,
  error?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> => {
  if (error) {
    return NextResponse.json({ error }, { status });
  }
  return NextResponse.json({ data }, { status });
};

/**
 * Extract and validate authorization token from request
 */
export const extractAuthToken = (request: NextRequest): string | null => {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.replace('Bearer ', '');
};

/**
 * Create authenticated Supabase clients for API routes
 */
export const createApiSupabaseClients = () => {
  // Service role client for database operations (bypasses RLS)
  const serviceSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Anon client for token verification
  const anonSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return { serviceSupabase, anonSupabase };
};

/**
 * Verify user authentication and get user data
 */
export const verifyApiAuthentication = async (
  token: string
): Promise<{ user: User | null; error: string | null }> => {
  const { anonSupabase } = createApiSupabaseClients();
  
  try {
    const { data: { user }, error } = await anonSupabase.auth.getUser(token);
    
    if (error || !user) {
      return { user: null, error: 'Invalid or expired token' };
    }
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'Authentication failed' };
  }
};

/**
 * Verify user owns a restaurant
 */
export const verifyRestaurantOwnership = async (
  userId: string,
  restaurantId: string
): Promise<{ authorized: boolean; error: string | null }> => {
  const { serviceSupabase } = createApiSupabaseClients();
  
  try {
    // Check direct ownership via owner_id
    const { data: restaurant, error: ownerError } = await serviceSupabase
      .from('restaurants')
      .select('id, name, owner_id')
      .eq('id', restaurantId)
      .eq('owner_id', userId)
      .single();

    if (restaurant && !ownerError) {
      return { authorized: true, error: null };
    }

    // Fallback: check staff access via restaurant_users
    const { data: staffAccess, error: staffError } = await serviceSupabase
      .from('restaurant_users')
      .select('role')
      .eq('user_id', userId)
      .eq('restaurant_id', restaurantId)
      .single();

    if (staffAccess && !staffError) {
      return { authorized: true, error: null };
    }

    return { 
      authorized: false, 
      error: 'Access denied - You do not own this restaurant and are not authorized staff' 
    };
  } catch (error) {
    return { authorized: false, error: 'Failed to verify restaurant ownership' };
  }
};

/**
 * Standard API route authentication and authorization wrapper
 */
export const withApiAuth = async (
  request: NextRequest,
  restaurantId?: string
): Promise<{
  user: User | null;
  authorized: boolean;
  error: string | null;
  serviceSupabase: ReturnType<typeof createClient>;
}> => {
  const { serviceSupabase } = createApiSupabaseClients();

  // Extract token
  const token = extractAuthToken(request);
  if (!token) {
    return {
      user: null,
      authorized: false,
      error: 'Missing or invalid authorization header',
      serviceSupabase
    };
  }

  // Verify authentication
  const { user, error: authError } = await verifyApiAuthentication(token);
  if (authError || !user) {
    return {
      user: null,
      authorized: false,
      error: authError || 'Authentication failed',
      serviceSupabase
    };
  }

  // Verify restaurant ownership if restaurantId provided
  if (restaurantId) {
    const { authorized, error: ownershipError } = await verifyRestaurantOwnership(
      user.id,
      restaurantId
    );
    
    if (!authorized) {
      return {
        user,
        authorized: false,
        error: ownershipError || 'Access denied',
        serviceSupabase
      };
    }
  }

  return {
    user,
    authorized: true,
    error: null,
    serviceSupabase
  };
};