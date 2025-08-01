import { Users, CheckCircle, Car, AlertCircle } from 'lucide-react';
import { Driver } from '@/types/database';

interface DriverStatsCardsProps {
  drivers: Driver[];
}

export default function DriverStatsCards({ drivers }: DriverStatsCardsProps) {
  return (
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
  );
}