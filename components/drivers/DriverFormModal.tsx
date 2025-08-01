import { useState } from 'react';
import { Users, Phone, Mail } from 'lucide-react';
import { Driver } from '@/types/database';
import { VEHICLE_TYPES } from '@/lib/constants';

interface DriverFormModalProps {
  isOpen: boolean;
  editingDriver: Driver | null;
  formData: {
    name: string;
    phone: string;
    email: string;
    avatar_emoji: string;
    vehicle_type: string;
    license_plate: string;
  };
  onFormDataChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  loading?: boolean;
}

export default function DriverFormModal({
  isOpen,
  editingDriver,
  formData,
  onFormDataChange,
  onSubmit,
  onClose,
  loading = false
}: DriverFormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="bg-orange-500 text-white px-6 py-4 rounded-t-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {editingDriver ? 'Update Driver' : 'Add New Driver'}
              </h2>
              <p className="text-orange-100 text-sm">
                {editingDriver ? 'Update driver information' : 'Add a new team member'}
              </p>
            </div>
          </div>
        </div>
        
        <form onSubmit={onSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormDataChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
              style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
              placeholder="John Smith"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4 w-4 text-green-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => onFormDataChange('phone', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                placeholder="0412 345 678"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onFormDataChange('email', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
                style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
                placeholder="john@example.com"
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type
            </label>
            <select
              value={formData.vehicle_type}
              onChange={(e) => onFormDataChange('vehicle_type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white"
              style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
              disabled={loading}
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
              onChange={(e) => onFormDataChange('license_plate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 bg-white placeholder-gray-400"
              style={{ color: '#1f2937', backgroundColor: '#ffffff' }}
              placeholder="ABC123"
              disabled={loading}
            />
          </div>
          
          <div className="flex space-x-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Saving...</span>
                </>
              ) : (
                <span>{editingDriver ? 'Update Driver' : 'Add Driver'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}