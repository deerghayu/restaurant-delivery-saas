import { DollarSign, Truck, Target } from 'lucide-react';

interface DeliveryTabProps {
  formData: {
    minimum_order: number;
    delivery_fee: number;
    delivery_radius: number;
  };
  updateFormData: (field: string, value: any) => void;
}

export default function DeliveryTab({ formData, updateFormData }: DeliveryTabProps) {
  return (
    <div className="space-y-10">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-8">
        <div className="flex items-start space-x-4">
          <Truck className="w-6 h-6 text-orange-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-orange-900 text-lg">Pricing & Delivery</h3>
            <p className="text-sm text-orange-700 mt-2">
              Configure your delivery fees, minimum orders, and service area.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            Maximum delivery distance from your restaurant
          </p>
        </div>
      </div>
    </div>
  );
}