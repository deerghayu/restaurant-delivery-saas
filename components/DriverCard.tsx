import React, { memo } from 'react';
import { Phone, Mail, Car, Edit3, Trash2, Eye, EyeOff, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Driver } from '@/types/database';
import { DRIVER_STATUS_CONFIG } from '@/lib/constants';

interface DriverCardProps {
  driver: Driver;
  onEdit: (driver: Driver) => void;
  onDelete: (driverId: string) => void;
  onToggleStatus: (driver: Driver) => void;
}

const DriverCard = memo(({ driver, onEdit, onDelete, onToggleStatus }: DriverCardProps) => {
  const statusConfig = DRIVER_STATUS_CONFIG[driver.status as keyof typeof DRIVER_STATUS_CONFIG];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle size={16} />;
      case 'busy': return <Clock size={16} />;
      case 'delivering': return <Car size={16} />;
      case 'offline': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0">
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
          <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center space-x-1 ${statusConfig?.color}`}>
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
              onClick={() => onToggleStatus(driver)}
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
              onClick={() => onEdit(driver)}
              className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
              title="Edit driver"
            >
              <Edit3 size={16} />
            </button>
            
            {/* Delete */}
            <button
              onClick={() => onDelete(driver.id)}
              className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
              title="Remove driver"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

DriverCard.displayName = 'DriverCard';

export default DriverCard;