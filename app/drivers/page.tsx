"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Driver } from "@/types/database";
import { getRestaurantId } from "@/utils/restaurant";
import { VEHICLE_TYPES, APP_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/lib/constants";
import { 
  ArrowLeft, 
  Plus, 
  Users, 
  Phone, 
  Mail, 
  Car, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

// Driver interface is now imported from types/database.ts

export default function DriversPage() {
  const { restaurant } = useAuth();
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewDriverForm, setShowNewDriverForm] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New driver form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    avatar_emoji: '🚗',
    vehicle_type: 'car',
    license_plate: ''
  });

  // Using constants from lib/constants.ts

  const getVehicleEmoji = (vehicleType: string) => {
    const vehicle = VEHICLE_TYPES.find(v => v.value === vehicleType);
    return vehicle?.emoji || '🚗';
  };

  // Fetch drivers
  const fetchDrivers = async () => {
    if (!restaurant) {
      setLoading(false);
      return;
    }

    const restaurantId = getRestaurantId(restaurant);
    if (!restaurantId) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('drivers')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching drivers:', error);
        setLoading(false);
        return;
      }

      setDrivers(data || []);
    } catch (error) {
      console.error('Error in fetchDrivers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, [restaurant]);

  // Auto-clear messages
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), APP_CONFIG.MESSAGE_AUTO_CLEAR_DELAY);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      avatar_emoji: '🚗',
      vehicle_type: 'car',
      license_plate: ''
    });
    setShowNewDriverForm(false);
    setEditingDriver(null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const restaurantId = getRestaurantId(restaurant);
    if (!restaurantId) {
      setMessage({ type: 'error', text: 'Restaurant ID not found. Please refresh and try again.' });
      return;
    }

    try {
      // Get current session for Authorization header
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setMessage({ type: 'error', text: 'Authentication required. Please sign in again.' });
        return;
      }

      if (editingDriver) {
        // Update existing driver via API
        const response = await fetch('/api/drivers', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            id: editingDriver.id,
            restaurant_id: restaurantId,
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            avatar_emoji: getVehicleEmoji(formData.vehicle_type),
            vehicle_type: formData.vehicle_type,
            license_plate: formData.license_plate || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Update driver error:', errorData);
          throw new Error(errorData.error || 'Failed to update driver');
        }

        setMessage({ type: 'success', text: SUCCESS_MESSAGES.DRIVER_UPDATED });
      } else {
        // Create new driver via API
        const response = await fetch('/api/drivers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            restaurant_id: restaurantId,
            name: formData.name,
            phone: formData.phone,
            email: formData.email || null,
            avatar_emoji: getVehicleEmoji(formData.vehicle_type),
            vehicle_type: formData.vehicle_type,
            license_plate: formData.license_plate || null,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Create driver error:', errorData);
          throw new Error(errorData.error || 'Failed to create driver');
        }

        setMessage({ type: 'success', text: SUCCESS_MESSAGES.DRIVER_CREATED });
      }

      resetForm();
      fetchDrivers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleEdit = (driver: Driver) => {
    setFormData({
      name: driver.name,
      phone: driver.phone,
      email: driver.email || '',
      avatar_emoji: driver.avatar_emoji,
      vehicle_type: driver.vehicle_type,
      license_plate: driver.license_plate || ''
    });
    setEditingDriver(driver);
    setShowNewDriverForm(true);
  };

  const handleDelete = async (driverId: string) => {
    if (!confirm('Are you sure you want to remove this driver?')) return;

    try {
      const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', driverId);

      if (error) throw error;
      
      setMessage({ type: 'success', text: SUCCESS_MESSAGES.DRIVER_DELETED });
      fetchDrivers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const toggleDriverStatus = async (driver: Driver) => {
    const newStatus = driver.status === 'available' ? 'offline' : 'available';
    
    try {
      const { error } = await supabase
        .from('drivers')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', driver.id);

      if (error) throw error;
      fetchDrivers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'delivering': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'offline': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle size={16} />;
      case 'busy': return <Clock size={16} />;
      case 'delivering': return <Car size={16} />;
      case 'offline': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading drivers...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
                  <Users className="w-8 h-8 text-orange-500" />
                  <span>Your Delivery Family</span>
                </h1>
                <p className="text-gray-600">The heroes who bring joy to your customers' doorsteps 🚗✨</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewDriverForm(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Welcome New Hero</span>
            </button>
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

          {/* Delivery Family Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-blue-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-600">Family Members</p>
                  <p className="text-3xl font-bold text-gray-900">{drivers.length}</p>
                  <p className="text-xs text-blue-500">Total heroes on your team</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-sm p-6 border border-green-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">Ready to Serve</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'available').length}
                  </p>
                  <p className="text-xs text-green-500">Heroes awaiting orders</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl shadow-sm p-6 border border-purple-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Car className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-600">Making Magic</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'delivering').length}
                  </p>
                  <p className="text-xs text-purple-500">Currently spreading joy</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Resting Heroes</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'offline').length}
                  </p>
                  <p className="text-xs text-gray-500">Taking a well-deserved break</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Heroes List */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <span>🌟</span>
                    <span>Your Delivery Heroes</span>
                  </h2>
                  <p className="text-gray-600 mt-1">The amazing people who make your restaurant shine</p>
                </div>
                {drivers.length > 0 && (
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Total Heroes</p>
                    <p className="text-2xl font-bold text-orange-600">{drivers.length}</p>
                  </div>
                )}
              </div>
            </div>
            
            {drivers.length === 0 ? (
              <div className="p-16 text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to build your delivery family?</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Great restaurants are built by amazing people. Let's welcome your first delivery hero to the family! 🚀
                </p>
                <button
                  onClick={() => setShowNewDriverForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  🎉 Welcome Your First Hero
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <div key={driver.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                          {driver.avatar_emoji}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Phone className="w-4 h-4" />
                              <span>{driver.phone}</span>
                            </div>
                            {driver.email && (
                              <div className="flex items-center space-x-1">
                                <Mail className="w-4 h-4" />
                                <span>{driver.email}</span>
                              </div>
                            )}
                            <div className="flex items-center space-x-1">
                              <Car className="w-4 h-4" />
                              <span className="capitalize">{driver.vehicle_type}</span>
                              {driver.license_plate && <span>• {driver.license_plate}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        {/* Status Badge */}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${getStatusColor(driver.status)}`}>
                          {getStatusIcon(driver.status)}
                          <span className="capitalize">{driver.status}</span>
                        </span>
                        
                        {/* Performance */}
                        <div className="text-right text-sm">
                          <p className="font-medium text-gray-900">{driver.total_deliveries} deliveries</p>
                          <p className="text-gray-600">⭐ {driver.average_rating.toFixed(1)} rating</p>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {/* Status Toggle */}
                          <button
                            onClick={() => toggleDriverStatus(driver)}
                            className={`p-2 rounded-lg transition-colors ${
                              driver.status === 'available' 
                                ? 'bg-gray-100 hover:bg-gray-200 text-gray-600' 
                                : 'bg-green-100 hover:bg-green-200 text-green-600'
                            }`}
                            title={driver.status === 'available' ? 'Set offline' : 'Set available'}
                          >
                            {driver.status === 'available' ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                          
                          {/* Edit */}
                          <button
                            onClick={() => handleEdit(driver)}
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                            title="Edit driver"
                          >
                            <Edit3 size={16} />
                          </button>
                          
                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(driver.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                            title="Remove driver"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* New/Edit Driver Modal */}
        {showNewDriverForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="bg-orange-500 text-white px-6 py-4 rounded-t-lg">
                <h2 className="text-xl font-bold">
                  {editingDriver ? 'Edit Driver' : 'Add New Driver'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                    style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                    placeholder="John Smith"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                    style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                    placeholder="0412 345 678"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                    style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={formData.vehicle_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, vehicle_type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
                    style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                  >
                    {VEHICLE_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.emoji} {type.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">Avatar will be automatically assigned based on vehicle type</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Plate
                  </label>
                  <input
                    type="text"
                    value={formData.license_plate}
                    onChange={(e) => setFormData(prev => ({ ...prev, license_plate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                    style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                    placeholder="ABC123"
                  />
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    {editingDriver ? 'Update Driver' : 'Add Driver'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}