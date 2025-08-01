import { NextRequest, NextResponse } from 'next/server';
import { withApiAuth, createApiResponse } from '@/utils/api';
import { createDriverSchema, updateDriverSchema, validateData } from '@/lib/validations';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '@/lib/constants';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input data
    const validation = validateData(createDriverSchema, body);
    
    if (!validation.success) {
      const errorMessages = validation.errors?.map(e => e.message).join(', ') || 'Unknown validation error';
      return createApiResponse(null, `Validation failed: ${errorMessages}`, 400);
    }

    const validatedData = validation.data!;

    // Authenticate and authorize user
    const { user, authorized, error: authError, serviceSupabase } = await withApiAuth(
      request, 
      validatedData.restaurant_id
    );

    if (!authorized || authError) {
      return createApiResponse(null, authError || ERROR_MESSAGES.UNAUTHORIZED, 401);
    }

    // Create the driver
    const { data: driver, error: insertError } = await serviceSupabase
      .from('drivers')
      .insert([{
        restaurant_id: validatedData.restaurant_id,
        name: validatedData.name,
        phone: validatedData.phone,
        email: validatedData.email || null,
        avatar_emoji: validatedData.avatar_emoji,
        vehicle_type: validatedData.vehicle_type,
        license_plate: validatedData.license_plate || null,
        status: 'offline',
        is_active: true,
        total_deliveries: 0,
        average_rating: 0,
        total_rating_count: 0
      }])
      .select()
      .single();

    if (insertError) {
      console.error('Driver insert error:', insertError);
      return createApiResponse(null, insertError.message, 400);
    }

    return createApiResponse(driver, SUCCESS_MESSAGES.DRIVER_CREATED);
  } catch (error: any) {
    console.error('API route error:', error);
    return createApiResponse(null, 'Internal server error', 500);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      id,
      restaurant_id, 
      name, 
      phone, 
      email, 
      avatar_emoji, 
      vehicle_type, 
      license_plate 
    } = body;

    // Authenticate and authorize user
    const { user, authorized, error: authError, serviceSupabase } = await withApiAuth(
      request, 
      restaurant_id
    );

    if (!authorized || authError) {
      return createApiResponse(null, authError || 'Unauthorized', 401);
    }

    // Update the driver
    const { data: driver, error: updateError } = await serviceSupabase
      .from('drivers')
      .update({
        name,
        phone,
        email: email || null,
        avatar_emoji,
        vehicle_type,
        license_plate: license_plate || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('restaurant_id', restaurant_id)
      .select()
      .single();

    if (updateError) {
      console.error('Driver update error:', updateError);
      return createApiResponse(null, updateError.message, 400);
    }

    return createApiResponse(driver);
  } catch (error: any) {
    console.error('API route error:', error);
    return createApiResponse(null, 'Internal server error', 500);
  }
}