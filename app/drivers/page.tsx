"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Driver } from "@/types/database";
import { getRestaurantId } from "@/utils/restaurant";
import { VEHICLE_TYPES, APP_CONFIG, SUCCESS_MESSAGES, ERROR_MESSAGES } from "@/lib/constants";
import DelightfulLoading from "@/components/DelightfulLoading";
import DriverFormModal from "@/components/drivers/DriverFormModal";
import { StatusMessage, Button } from '@/components/ui';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState<Driver | null>(null);
  const [formLoading, setFormLoading] = useState(false);

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

  // Handle form data changes for DriverFormModal
  const handleFormDataChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
    setFormLoading(true);
    
    const restaurantId = getRestaurantId(restaurant);
    if (!restaurantId) {
      setMessage({ type: 'error', text: 'Restaurant ID not found. Please refresh and try again.' });
      setFormLoading(false);
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
    } finally {
      setFormLoading(false);
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

  const handleDeleteClick = (driver: Driver) => {
    setDriverToDelete(driver);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!driverToDelete) return;

    try {
      const { error } = await supabase
        .from('drivers')
        .delete()
        .eq('id', driverToDelete.id);

      if (error) throw error;
      
      setMessage({ type: 'success', text: SUCCESS_MESSAGES.DRIVER_DELETED });
      fetchDrivers();
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setShowDeleteModal(false);
      setDriverToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDriverToDelete(null);
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
          <DelightfulLoading 
            type="delivering"
            message="Loading your delivery family..."
            submessage="Getting ready to meet your amazing team!"
            size="lg"
          />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Link 
                href="/dashboard" 
                className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <Users className="w-7 h-7 text-orange-500" />
                  <span>Delivery Team</span>
                </h1>
                <p className="text-gray-600 mt-1">Manage your delivery drivers and their performance</p>
              </div>
            </div>
            <Button
              onClick={() => setShowNewDriverForm(true)}
              variant="primary"
              size="md"
              icon={Plus}
              className="shadow-md hover:shadow-lg"
            >
              Add New Driver
            </Button>
          </div>

          {/* Message */}
          {message && (
            <StatusMessage 
              type={message.type} 
              className="mb-6"
            >
              {message.text}
            </StatusMessage>
          )}

          {/* Driver Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-sm p-4 border border-blue-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{drivers.length}</p>
                  <p className="text-sm text-blue-600 font-medium">Total Drivers</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-sm p-4 border border-green-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'available').length}
                  </p>
                  <p className="text-sm text-green-600 font-medium">Available Now</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg shadow-sm p-4 border border-purple-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'delivering').length}
                  </p>
                  <p className="text-sm text-purple-600 font-medium">Out for Delivery</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-400 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {drivers.filter(d => d.status === 'offline').length}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">Offline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Drivers List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Your Delivery Team ({drivers.length})</h2>
              <p className="text-gray-600 text-sm mt-1">Manage your drivers and track their performance</p>
            </div>
            
            {drivers.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">No drivers yet</h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">Add your first driver to start managing deliveries and grow your delivery operations</p>
                <Button
                  onClick={() => setShowNewDriverForm(true)}
                  variant="primary"
                  size="md"
                  className="shadow-md"
                >
                  Add Your First Driver
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {drivers.map((driver, index) => (
                  <div 
                    key={driver.id} 
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center text-xl">
                            {driver.avatar_emoji}
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                            driver.status === 'available' ? 'bg-green-400' :
                            driver.status === 'delivering' ? 'bg-blue-400' :
                            driver.status === 'busy' ? 'bg-yellow-400' : 'bg-gray-400'
                          }`}></div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-base font-semibold text-gray-900">{driver.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(driver.status)}`}>
                              {getStatusIcon(driver.status)}
                              <span className="ml-1 capitalize">{driver.status}</span>
                            </span>
                          </div>
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
                              {driver.license_plate && <span className="text-gray-500">• {driver.license_plate}</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {/* Performance Stats */}
                        <div className="text-right">
                          <div className="flex items-center space-x-3 mb-1">
                            <div className="text-center">
                              <p className="text-lg font-bold text-green-600">{driver.total_deliveries}</p>
                              <p className="text-xs text-gray-500">Deliveries</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-bold text-orange-600 flex items-center">
                                <span className="text-yellow-400 mr-1">⭐</span>
                                {driver.average_rating.toFixed(1)}
                              </p>
                              <p className="text-xs text-gray-500">Rating</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => toggleDriverStatus(driver)}
                            variant={driver.status === 'available' ? 'ghost' : 'success'}
                            size="sm"
                            icon={driver.status === 'available' ? EyeOff : Eye}
                            title={driver.status === 'available' ? 'Set offline' : 'Set available'}
                            className="p-2"
                          >
                            {driver.status === 'available' ? 'Set offline' : 'Set available'}
                          </Button>
                          
                          <Button
                            onClick={() => handleEdit(driver)}
                            variant="ghost"
                            size="sm"
                            icon={Edit3}
                            title="Edit driver"
                            className="p-2 text-blue-600 hover:bg-blue-100"
                          >
                            Edit
                          </Button>
                          
                          <Button
                            onClick={() => handleDeleteClick(driver)}
                            variant="ghost"
                            size="sm"
                            icon={Trash2}
                            title="Remove driver"
                            className="p-2 text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </Button>
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
        <DriverFormModal
          isOpen={showNewDriverForm}
          editingDriver={editingDriver}
          formData={formData}
          onFormDataChange={handleFormDataChange}
          onSubmit={handleSubmit}
          onClose={resetForm}
          loading={formLoading}
        />

        {/* Delete Driver Confirmation Modal */}
        {showDeleteModal && driverToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="bg-red-500 text-white px-6 py-4 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Remove Driver</h2>
                    <p className="text-red-100 text-sm">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                    {driverToDelete.avatar_emoji}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{driverToDelete.name}</h3>
                    <p className="text-gray-600 text-sm">{driverToDelete.phone}</p>
                    <p className="text-gray-500 text-xs">
                      {driverToDelete.total_deliveries} deliveries • ⭐ {driverToDelete.average_rating.toFixed(1)} rating
                    </p>
                  </div>
                </div>
                
                <StatusMessage type="warning" className="mb-6">
                  <div>
                    <p className="font-medium text-sm">Are you sure you want to remove this driver?</p>
                    <p className="text-sm mt-1">
                      This will permanently remove <strong>{driverToDelete.name}</strong> from your delivery team. 
                      All their delivery history will be preserved, but they won't be able to receive new orders.
                    </p>
                  </div>
                </StatusMessage>
                
                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={handleDeleteCancel}
                    variant="ghost"
                    size="lg"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDeleteConfirm}
                    variant="danger"
                    size="lg"
                    icon={Trash2}
                    className="flex-1"
                  >
                    Remove Driver
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}