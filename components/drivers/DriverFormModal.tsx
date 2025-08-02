import { useState } from 'react';
import { Users, Phone, Mail, Car } from 'lucide-react';
import { Driver } from '@/types/database';
import { VEHICLE_TYPES } from '@/lib/constants';
import { BaseModal, FormField, FormSelect, Button } from '@/components/ui';

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
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={editingDriver ? 'Update Driver' : 'Add New Driver'}
      subtitle={editingDriver ? 'Update driver information' : 'Add a new team member'}
      icon={<Users className="w-6 h-6 text-white" />}
      maxWidth="md"
    >
      <form onSubmit={onSubmit} className="p-6 space-y-5">
          <FormField
            label="Driver Name"
            type="text"
            value={formData.name}
            onChange={(value) => onFormDataChange('name', value)}
            placeholder="John Smith"
            required
            disabled={loading}
          />
          
          <FormField
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(value) => {
              // Only allow numeric input and limit to 10 digits
              const cleanValue = value.replace(/\D/g, '').slice(0, 10);
              onFormDataChange('phone', cleanValue);
            }}
            placeholder="0412345678"
            pattern="[0-9]{10}"
            title="Please enter exactly 10 digits"
            minLength={10}
            maxLength={10}
            icon={Phone}
            iconColor="text-green-500"
            helperText="Enter 10 digits only (e.g., 0412345678)"
            required
            disabled={loading}
          />
          
          <FormField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => onFormDataChange('email', value)}
            placeholder="john@example.com"
            icon={Mail}
            iconColor="text-blue-500"
            disabled={loading}
          />
          
          <FormSelect
            label="Vehicle Type"
            value={formData.vehicle_type}
            onChange={(value) => onFormDataChange('vehicle_type', value)}
            options={VEHICLE_TYPES.map(type => ({
              value: type.value,
              label: `${type.emoji} ${type.label}`
            }))}
            helperText="Avatar will be automatically assigned based on vehicle type"
            disabled={loading}
          />
          
          <FormField
            label="License Plate"
            type="text"
            value={formData.license_plate}
            onChange={(value) => onFormDataChange('license_plate', value)}
            placeholder="ABC123"
            icon={Car}
            iconColor="text-orange-500"
            disabled={loading}
          />
          
          <div className="flex space-x-4 pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              loadingText="Saving..."
              disabled={loading}
              fullWidth
            >
              {editingDriver ? 'Update Driver' : 'Add Driver'}
            </Button>
          </div>
        </form>
      </BaseModal>
    );
}