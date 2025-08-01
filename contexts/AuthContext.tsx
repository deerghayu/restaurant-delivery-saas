"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Restaurant } from '@/types/database';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, restaurantName: string) => Promise<{ data: any; error: any }>;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<void>;
  restaurant: Restaurant | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

  useEffect(() => {
    let mounted = true;
    
    // Set a timeout fallback to prevent infinite loading
    const loadingTimeout = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 2000);
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      // Fetch restaurant data in background after setting loading to false
      if (session?.user) {
        fetchRestaurant(session.user.id);
      }
      
      if (mounted) {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    }).catch(error => {
      console.error('Error getting initial session:', error);
      if (mounted) {
        setLoading(false);
        clearTimeout(loadingTimeout);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchRestaurant(session.user.id);
      } else {
        setRestaurant(null);
      }
      
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const fetchRestaurant = async (userId: string) => {
    try {
      // First: Check if user owns a restaurant directly via owner_id
      const { data: ownedRestaurant, error: ownerError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', userId)
        .single();

      if (ownedRestaurant && !ownerError) {
        setRestaurant(ownedRestaurant);
        return;
      }

      // Fallback: check if user has staff access via restaurant_users
      // First get the restaurant_id
      const { data: restaurantUser, error: userError } = await supabase
        .from('restaurant_users')
        .select('restaurant_id, role')
        .eq('user_id', userId)
        .single();

      if (restaurantUser && !userError) {
        // Then fetch the restaurant details separately
        const { data: restaurant, error: restaurantError } = await supabase
          .from('restaurants')
          .select('*')
          .eq('id', restaurantUser.restaurant_id)
          .single();

        if (restaurant && !restaurantError) {
          setRestaurant(restaurant);
          return;
        }
      }

      setRestaurant(null);
    } catch (error) {
      console.error('Error in fetchRestaurant:', error);
      setRestaurant(null);
    }
  };

  const signUp = async (email: string, password: string, restaurantName: string) => {
    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return { data: null, error: authError };
      }

      if (authData.user && authData.session) {
        // Ensure user is authenticated before proceeding
        await supabase.auth.setSession(authData.session);
        
        // Create restaurant record with direct owner relationship
        const { data: restaurantData, error: restaurantError } = await supabase
          .from('restaurants')
          .insert([
            {
              name: restaurantName,
              email: email,
              owner_id: authData.user.id,
              // Required fields with sensible defaults
              phone: '', // To be filled in restaurant settings
              street_address: '', // To be filled in restaurant settings
              suburb: '', // To be filled in restaurant settings
              state: 'NSW', // Default Australian state
              postcode: '2000', // Default Sydney postcode
            }
          ])
          .select()
          .single();

        if (restaurantError) {
          return { data: null, error: restaurantError };
        }

        // Get current session to ensure we have the right user ID
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id || authData.user.id;

        // Link user to restaurant
        const { error: linkError } = await supabase
          .from('restaurant_users')
          .insert([
            {
              restaurant_id: restaurantData.id,
              user_id: userId,
              role: 'owner'
            }
          ]);

        if (linkError) {
          return { data: null, error: linkError };
        }

        return { data: { user: authData.user, restaurant: restaurantData }, error: null };
      }

      return { data: authData, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    restaurant,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}