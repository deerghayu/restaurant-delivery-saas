import { Phone, Mail, Car, Edit3, Trash2, Eye, EyeOff, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Driver } from '@/types/database';
import { Card } from '@/components/ui';

interface DriverListProps {
  drivers: Driver[];
  onEdit: (driver: Driver) => void;
  onDelete: (driver: Driver) => void;
  onToggleStatus: (driver: Driver) => void;
  onAddNew: () => void;
}

export default function DriverList({ 
  drivers, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onAddNew 
}: DriverListProps) {
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
      case 'busy': return <AlertCircle size={16} />;
      case 'delivering': return <Car size={16} />;
      case 'offline': return <AlertCircle size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <Card className="shadow-sm border-gray-100">
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
          <button
            onClick={onAddNew}
            className="btn-primary shadow-md"
          >
            Add Your First Driver
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {drivers.map((driver) => (
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
                    
                    <button
                      onClick={() => onEdit(driver)}
                      className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                      title="Edit driver"
                    >
                      <Edit3 size={16} />
                    </button>
                    
                    <button
                      onClick={() => onDelete(driver)}
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
    </Card>
  );
}