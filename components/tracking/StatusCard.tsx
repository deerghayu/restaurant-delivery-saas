import { Truck, Phone, Star, MapPin } from 'lucide-react';
import { Card } from '@/components/ui';

interface Driver {
  name: string;
  phone: string;
  avatar: string;
  rating: number;
}

interface StatusCardProps {
  status: string;
  estimatedDelivery: Date;
  driver: Driver;
  deliveryAddress: string;
  getTimeUntil: (date: Date) => string;
}

export default function StatusCard({ 
  status, 
  estimatedDelivery, 
  driver, 
  deliveryAddress,
  getTimeUntil 
}: StatusCardProps) {
  return (
    <Card className="shadow-lg border-orange-200 hover:border-orange-300 transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Truck className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              On Its Way!
            </h2>
            <p className="text-gray-600">
              Your order is out for delivery
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-green-600">
            {getTimeUntil(estimatedDelivery)}
          </div>
          <div className="text-sm text-gray-500">Estimated arrival</div>
        </div>
      </div>

      {/* Driver Info */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{driver.avatar}</span>
          <div>
            <div className="font-semibold text-gray-900">
              {driver.name} is delivering your order
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{driver.rating} rating</span>
            </div>
          </div>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition-colors">
          <Phone className="w-5 h-5" />
        </button>
      </div>

      {/* Delivery Address */}
      <div className="mt-4 flex items-start space-x-3">
        <MapPin className="w-5 h-5 text-red-500 mt-1" />
        <div>
          <div className="font-medium text-gray-900">
            Delivering to:
          </div>
          <div className="text-gray-600">{deliveryAddress}</div>
        </div>
      </div>
    </Card>
  );
}