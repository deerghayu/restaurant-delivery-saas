"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import ProtectedRoute from '@/components/ProtectedRoute';
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
  Store,
  Palette,
  Settings as SettingsIcon,
  DollarSign,
  Crown,
  Upload,
  Clock,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Truck,
  Target,
  Globe,
  CreditCard,
  Users,
  Shield,
  Star,
  Award,
  Heart,
  Zap,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import DelightfulLoading from '@/components/DelightfulLoading';
import Link from 'next/link';

const australianStates = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' }
];

const businessHoursTemplate = {
  monday: { open: '09:00', close: '22:00', closed: false },
  tuesday: { open: '09:00', close: '22:00', closed: false },
  wednesday: { open: '09:00', close: '22:00', closed: false },
  thursday: { open: '09:00', close: '22:00', closed: false },
  friday: { open: '09:00', close: '22:00', closed: false },
  saturday: { open: '09:00', close: '22:00', closed: false },
  sunday: { open: '09:00', close: '22:00', closed: false }
};

const settingsTabs = [
  {
    id: 'profile',
    name: 'Restaurant Profile',
    icon: Store,
    description: 'Basic information and contact details'
  },
  {
    id: 'branding',
    name: 'Branding & Theme',
    icon: Palette,
    description: 'Logo, colors, and visual identity'
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: SettingsIcon,
    description: 'Business hours and operational settings'
  },
  {
    id: 'delivery',
    name: 'Pricing & Delivery',
    icon: DollarSign,
    description: 'Delivery fees, minimum orders, and service area'
  },
  {
    id: 'subscription',
    name: 'Subscription',
    icon: Crown,
    description: 'Plan details and billing information'
  }
];

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
          business_hours: formData.business_hours,
          average_prep_time: formData.average_prep_time,
          delivery_radius: formData.delivery_radius,
          minimum_order: formData.minimum_order,
          delivery_fee: formData.delivery_fee,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurant.id)
        .select()
        .single();

      if (error) throw error;

      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      setHasChanges(false);
      
      // Refresh the restaurant data in context
      window.location.reload();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update settings' });
    } finally {
      setLoading(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Store className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Restaurant Profile</h3>
            <p className="text-sm text-blue-700 mt-1">
              This information appears on your restaurant profile and order confirmations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Mario's Italian Kitchen"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="(02) 9876 5432"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="owner@restaurant.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span>Restaurant Address</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.street_address}
              onChange={(e) => updateFormData('street_address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="123 Collins Street"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suburb *
              </label>
              <input
                type="text"
                value={formData.suburb}
                onChange={(e) => updateFormData('suburb', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Melbourne"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => updateFormData('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                {australianStates.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode *
              </label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => updateFormData('postcode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="3000"
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBrandingTab = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Palette className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-purple-900">Branding & Theme</h3>
            <p className="text-sm text-purple-700 mt-1">
              Customize your restaurant's visual identity and brand colors.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {formData.logo_url ? (
                <div className="space-y-4">
                  <img 
                    src={formData.logo_url} 
                    alt="Restaurant logo"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                    onClick={() => updateFormData('logo_url', '')}
                  >
                    Remove logo
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Logo upload coming soon
                    </p>
                    <p className="text-xs text-gray-500">
                      For now, add a direct image URL below
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3">
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) => updateFormData('logo_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Brand Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.primary_color}
                onChange={(e) => updateFormData('primary_color', e.target.value)}
                className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={(e) => updateFormData('primary_color', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This color appears in your dashboard header and customer-facing pages
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Preview</h3>
          <div 
            className="border rounded-lg p-4 text-white"
            style={{ backgroundColor: formData.primary_color }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                {formData.logo_url ? (
                  <img 
                    src={formData.logo_url} 
                    alt="Logo preview"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🍕</span>
                )}
              </div>
              <div>
                <h4 className="font-bold">{formData.name || 'Your Restaurant'}</h4>
                <p className="text-sm opacity-90">{formData.suburb}, {formData.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperationsTab = () => (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-900">Operations & Hours</h3>
            <p className="text-sm text-green-700 mt-1">
              Configure your business hours and operational settings.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Prep Time (minutes) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="number"
                min="5"
                max="120"
                value={formData.average_prep_time}
                onChange={(e) => updateFormData('average_prep_time', parseInt(e.target.value) || 15)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used to calculate estimated ready times for orders
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span>Business Hours</span>
          </h3>
          
          <div className="space-y-3">
            {Object.entries(formData.business_hours).map(([day, hours]: [string, any]) => (
              <div key={day} className="flex items-center space-x-4 py-2">
                <div className="w-20">
                  <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                </div>
                
                <div className="flex items-center space-x-3 flex-1">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!hours.closed}
                      onChange={(e) => updateBusinessHours(day, 'closed', !e.target.checked)}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">Open</span>
                  </label>
                  
                  {!hours.closed ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <span className="text-gray-500 text-sm">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeliveryTab = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Truck className="w-5 h-5 text-orange-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-orange-900">Pricing & Delivery</h3>
            <p className="text-sm text-orange-700 mt-1">
              Configure your delivery fees, minimum orders, and service area.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4" />
            <span>Minimum Order (AUD) *</span>
          </label>
          <input
            type="number"
            min="0"
            step="0.50"
            value={formData.minimum_order}
            onChange={(e) => updateFormData('minimum_order', parseFloat(e.target.value) || 25)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Minimum order amount before delivery
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Truck className="w-4 h-4" />
            <span>Delivery Fee (AUD) *</span>
          </label>
          <input
            type="number"
            min="0"
            step="0.50"
            value={formData.delivery_fee}
            onChange={(e) => updateFormData('delivery_fee', parseFloat(e.target.value) || 5)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Flat delivery fee for all orders
          </p>
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Target className="w-4 h-4" />
            <span>Delivery Radius (km) *</span>
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={formData.delivery_radius}
            onChange={(e) => updateFormData('delivery_radius', parseInt(e.target.value) || 10)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Maximum delivery distance from your location
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Delivery Area Preview</h4>
        <p className="text-sm text-gray-600">
          You'll deliver within {formData.delivery_radius}km of {formData.street_address}, {formData.suburb}, {formData.state} {formData.postcode}
        </p>
        <div className="mt-3 text-sm">
          <strong>Pricing Summary:</strong>
          <ul className="list-disc list-inside space-y-1 text-gray-600 mt-1">
            <li>Minimum order: ${formData.minimum_order.toFixed(2)}</li>
            <li>Delivery fee: ${formData.delivery_fee.toFixed(2)}</li>
            <li>Example total: ${(formData.minimum_order + formData.delivery_fee).toFixed(2)}</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderSubscriptionTab = () => {
    const trialDaysLeft = formData.trial_ends_at ? 
      Math.max(0, Math.ceil((new Date(formData.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

    return (
      <div className="space-y-6">
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Crown className="w-5 h-5 text-indigo-500 mt-0.5" />
            <div>
              <h3 className="font-medium text-indigo-900">Subscription & Billing</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Manage your subscription plan and billing information.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">Current Plan</h4>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  formData.subscription_plan === 'trial' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : formData.subscription_plan === 'pro'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {formData.subscription_plan.charAt(0).toUpperCase() + formData.subscription_plan.slice(1)}
                </span>
              </div>

              {formData.subscription_plan === 'trial' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800">
                        {trialDaysLeft > 0 ? `${trialDaysLeft} days left in trial` : 'Trial expired'}
                      </p>
                      <p className="text-sm text-yellow-700">
                        Upgrade to continue using all features
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    formData.subscription_status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formData.subscription_status.charAt(0).toUpperCase() + formData.subscription_status.slice(1)}
                  </span>
                </div>
                
                {formData.trial_ends_at && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {formData.subscription_plan === 'trial' ? 'Trial ends:' : 'Next billing:'}
                    </span>
                    <span className="font-medium">
                      {new Date(formData.trial_ends_at).toLocaleDateString('en-AU')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Account Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Account Active</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    formData.is_active ? 'bg-green-400' : 'bg-red-400'
                  }`}></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Restaurant Owner</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Available Plans</h4>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">Starter Plan</h5>
                    <span className="text-lg font-bold">$29/month</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Up to 100 orders/month</li>
                    <li>• Basic reporting</li>
                    <li>• Email support</li>
                  </ul>
                </div>

                <div className="border-2 border-orange-500 rounded-lg p-4 relative">
                  <div className="absolute -top-2 left-4 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                    Recommended
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">Pro Plan</h5>
                    <span className="text-lg font-bold">$79/month</span>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Unlimited orders</li>
                    <li>• Advanced analytics</li>
                    <li>• Driver management</li>
                    <li>• Priority support</li>
                    <li>• Custom branding</li>
                  </ul>
                </div>
              </div>

              <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
          {/* Profile Completion Celebration */}
          {celebrateCompletion && (
            <div className="mb-6 animate-slideUp">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-xl shadow-lg animate-celebration relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 transform -skew-x-12 animate-shimmer"></div>
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center animate-bounce">
                    <Award size={32} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 flex items-center space-x-2">
                      <span>🎉 Outstanding Progress!</span>
                      <Sparkles size={24} className="animate-pulse" />
                    </h3>
                    <p className="text-purple-100 font-medium text-lg">
                      Your restaurant profile is {profileCompleteness}% complete! You're building something amazing! 
                    </p>
                  </div>
                  <div className="text-6xl animate-gentle-bounce">🌟</div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Header with Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  <ArrowLeft className="w-6 h-6 text-gray-600" />
                </Link>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 flex items-center space-x-3">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                      <SettingsIcon className="w-8 h-8 text-white" />
                    </div>
                    <span>Your Restaurant Journey</span>
                  </h1>
                  <p className="text-gray-600 text-lg mt-2">Crafting the perfect experience for your customers ✨</p>
                </div>
              </div>
              
              {/* Profile Completeness Indicator */}
              <div className="text-right">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                      <TrendingUp size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Profile Strength</p>
                      <p className="text-2xl font-bold text-gray-900">{profileCompleteness}%</p>
                    </div>
                  </div>
                  <div className="w-32 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        profileCompleteness >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-600' :
                        profileCompleteness >= 70 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                        profileCompleteness >= 50 ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${profileCompleteness}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {profileCompleteness >= 90 ? 'Exceptional! 🌟' :
                     profileCompleteness >= 70 ? 'Looking great! 👍' :
                     profileCompleteness >= 50 ? 'Good progress! 📈' :
                     'Let\'s build this! 🚀'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Encouraging Progress Message */}
            {profileCompleteness < 100 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <Heart size={20} className="text-blue-500 animate-heartbeat" />
                  <div>
                    <p className="font-medium text-blue-900">
                      {profileCompleteness >= 90 ? 'Almost there! Your restaurant profile is nearly perfect!' :
                       profileCompleteness >= 70 ? 'You\'re doing amazing! Just a few more details to make it shine!' :
                       profileCompleteness >= 50 ? 'Great momentum! Keep adding those important details!' :
                       'Every great restaurant starts here! Let\'s build your perfect profile together!'}
                    </p>
                    <p className="text-blue-700 text-sm mt-1">
                      Complete profiles get more customer trust and better search visibility! 📈
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Enhanced Save Button */}
          {hasChanges && (
            <div className="fixed bottom-8 right-8 z-50">
              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-3 disabled:opacity-50 animate-gentle-bounce"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="text-lg">Saving Your Magic...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span className="text-lg">💾 Save My Progress</span>
                    <Zap size={20} className="animate-pulse" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Enhanced Message with Celebration */}
          {message && (
            <div className={`mb-6 animate-slideUp ${
              message.type === 'success' ? 
                'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg animate-celebration' : 
                'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg'
            } rounded-xl p-6`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center ${
                  message.type === 'success' ? 'animate-bounce' : ''
                }`}>
                  {message.type === 'success' ? 
                    <CheckCircle size={24} className="text-white" /> : 
                    <AlertCircle size={24} className="text-white" />
                  }
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">
                    {message.type === 'success' ? '🎉 Amazing Work!' : '⚠️ Hold On!'}
                  </h3>
                  <p className={`font-medium ${
                    message.type === 'success' ? 'text-green-100' : 'text-red-100'
                  }`}>
                    {message.type === 'success' ? 
                      `${message.text} Your restaurant is getting better every day! 🌟` : 
                      message.text}
                  </p>
                </div>
                {message.type === 'success' && (
                  <div className="text-4xl animate-gentle-bounce">⭐</div>
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Settings Navigation */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="font-semibold text-gray-900">Settings</h2>
                </div>
                <nav className="space-y-1">
                  {settingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-4 py-3 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                          activeTab === tab.id ? 'bg-orange-50 border-r-2 border-orange-500 text-orange-700' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <div>
                          <div className="font-medium">{tab.name}</div>
                          <div className="text-xs text-gray-500">{tab.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {activeTab === 'profile' && renderProfileTab()}
                {activeTab === 'branding' && renderBrandingTab()}
                {activeTab === 'operations' && renderOperationsTab()}
                {activeTab === 'delivery' && renderDeliveryTab()}
                {activeTab === 'subscription' && renderSubscriptionTab()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}