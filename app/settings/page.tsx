"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import DelightfulLoading from '@/components/DelightfulLoading';
import Link from 'next/link';
import {
  SettingsTabNavigation,
  ProfileTab,
  BrandingTab,
  MenuTab,
  OperationsTab,
  DeliveryTab,
  SubscriptionTab,
  ProfileCompletionCard,
  SaveButton
} from '@/components/settings';

const businessHoursTemplate = {
  monday: { open: '09:00', close: '22:00', closed: false },
  tuesday: { open: '09:00', close: '22:00', closed: false },
  wednesday: { open: '09:00', close: '22:00', closed: false },
  thursday: { open: '09:00', close: '22:00', closed: false },
  friday: { open: '09:00', close: '22:00', closed: false },
  saturday: { open: '09:00', close: '22:00', closed: false },
  sunday: { open: '09:00', close: '22:00', closed: false }
};

export default function SettingsPage() {
  const { restaurant, user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [celebrateCompletion, setCelebrateCompletion] = useState(false);
  const [profileCompleteness, setProfileCompleteness] = useState(0);

  // Form data state
  const [formData, setFormData] = useState({
    // Profile
    name: '',
    email: '',
    phone: '',
    street_address: '',
    suburb: '',
    state: 'NSW',
    postcode: '',
    
    // Branding
    logo_url: '',
    primary_color: '#ea580c',
    
    // Menu
    menu_items: [],
    
    // Operations
    business_hours: businessHoursTemplate,
    average_prep_time: 15,
    
    // Delivery & Pricing
    delivery_radius: 10,
    minimum_order: 25.00,
    delivery_fee: 5.00,
    
    // Subscription (read-only)
    subscription_plan: 'trial',
    subscription_status: 'active',
    trial_ends_at: '',
    is_active: true
  });

  // Calculate profile completeness
  const calculateCompleteness = (data: any) => {
    const requiredFields = [
      'name', 'email', 'phone', 'street_address', 'suburb', 'state', 'postcode',
      'average_prep_time', 'delivery_radius', 'minimum_order', 'delivery_fee'
    ];
    
    const completed = requiredFields.filter(field => {
      const value = data[field];
      return value !== null && value !== undefined && value !== '';
    }).length;
    
    const bonusFields = ['logo_url', 'primary_color'];
    const bonusCompleted = bonusFields.filter(field => data[field] && data[field] !== '').length;
    
    return Math.round(((completed / requiredFields.length) * 85) + ((bonusCompleted / bonusFields.length) * 15));
  };

  // Load restaurant data
  useEffect(() => {
    if (restaurant) {
      const newFormData = {
        name: restaurant.name || '',
        email: restaurant.email || '',
        phone: restaurant.phone || '',
        street_address: restaurant.street_address || '',
        suburb: restaurant.suburb || '',
        state: restaurant.state || 'NSW',
        postcode: restaurant.postcode || '',
        logo_url: restaurant.logo_url || '',
        primary_color: restaurant.primary_color || '#ea580c',
        menu_items: restaurant.menu_items || [],
        business_hours: restaurant.business_hours || businessHoursTemplate,
        average_prep_time: restaurant.average_prep_time || 15,
        delivery_radius: restaurant.delivery_radius || 10,
        minimum_order: restaurant.minimum_order || 25.00,
        delivery_fee: restaurant.delivery_fee || 5.00,
        subscription_plan: restaurant.subscription_plan || 'trial',
        subscription_status: restaurant.subscription_status || 'active',
        trial_ends_at: restaurant.trial_ends_at || '',
        is_active: restaurant.is_active ?? true
      };
      
      setFormData(newFormData);
      const completeness = calculateCompleteness(newFormData);
      setProfileCompleteness(completeness);
      
      // Celebrate when profile reaches high completeness
      if (completeness >= 90 && completeness > profileCompleteness) {
        setCelebrateCompletion(true);
        setTimeout(() => setCelebrateCompletion(false), 4000);
      }
    }
  }, [restaurant]);

  // Auto-clear messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const updateFormData = (field: string, value: any) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    setHasChanges(true);
    
    // Update completeness in real-time
    const newCompleteness = calculateCompleteness(newFormData);
    if (newCompleteness > profileCompleteness && newCompleteness >= 90) {
      setCelebrateCompletion(true);
      setTimeout(() => setCelebrateCompletion(false), 4000);
    }
    setProfileCompleteness(newCompleteness);
  };

  const updateBusinessHours = (day: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      business_hours: {
        ...prev.business_hours,
        [day]: {
          ...prev.business_hours[day as keyof typeof prev.business_hours],
          [field]: value
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    if (!restaurant?.id) return;

    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase
        .from('restaurants')
        .update({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          street_address: formData.street_address,
          suburb: formData.suburb,
          state: formData.state,
          postcode: formData.postcode,
          logo_url: formData.logo_url || null,
          primary_color: formData.primary_color,
          menu_items: formData.menu_items,
          business_hours: formData.business_hours,
          average_prep_time: formData.average_prep_time,
          delivery_radius: formData.delivery_radius,
          minimum_order: formData.minimum_order,
          delivery_fee: formData.delivery_fee,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurant.id);

      if (error) throw error;

      setMessage({ type: 'success', text: 'Settings saved successfully! 🎉' });
      setHasChanges(false);
      
      // Trigger completion celebration if profile is now complete
      const newCompleteness = calculateCompleteness(formData);
      if (newCompleteness >= 90 && newCompleteness > profileCompleteness) {
        setCelebrateCompletion(true);
        setTimeout(() => setCelebrateCompletion(false), 4000);
      }
      setProfileCompleteness(newCompleteness);
      
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to save settings' });
    } finally {
      setLoading(false);
    }
  };

  if (!restaurant) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
          <DelightfulLoading 
            message="Loading your restaurant settings..."
            submessage="Getting everything ready for you to customize!"
            size="lg"
          />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-8">

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                    <span>Restaurant Settings</span>
                  </h1>
                  <p className="text-gray-600 mt-1">Configure your restaurant profile and preferences</p>
                </div>
              </div>
              
              <ProfileCompletionCard profileCompleteness={profileCompleteness} />
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
              message.type === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              {message.type === 'success' ? 
                <CheckCircle className="w-5 h-5 text-green-500" /> : 
                <AlertCircle className="w-5 h-5 text-red-500" />
              }
              <p className={message.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                {message.text}
              </p>
            </div>
          )}

          {/* Celebration Animation */}
          {celebrateCompletion && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-white rounded-lg shadow-2xl p-8 text-center animate-bounce">
                <Sparkles className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Complete! 🎉</h2>
                <p className="text-gray-600">Your restaurant is ready to start taking orders!</p>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <SettingsTabNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-8">
                {activeTab === 'profile' && (
                  <ProfileTab 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {activeTab === 'branding' && (
                  <BrandingTab 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {activeTab === 'menu' && (
                  <MenuTab 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {activeTab === 'operations' && (
                  <OperationsTab 
                    formData={formData} 
                    updateFormData={updateFormData} 
                    updateBusinessHours={updateBusinessHours}
                  />
                )}
                {activeTab === 'delivery' && (
                  <DeliveryTab 
                    formData={formData} 
                    updateFormData={updateFormData} 
                  />
                )}
                {activeTab === 'subscription' && (
                  <SubscriptionTab 
                    formData={formData} 
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <SaveButton 
          hasChanges={hasChanges} 
          loading={loading} 
          onSave={handleSave} 
        />
      </div>
    </ProtectedRoute>
  );
}