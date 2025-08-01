import { Phone, Star } from 'lucide-react';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  total: number;
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Order Summary
        </h3>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center"
            >
              <div>
                <div className="font-medium text-gray-900">
                  {item.quantity}x {item.name}
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Need Help?
        </h3>
        <div className="space-y-3">
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
            <Phone className="w-5 h-5" />
            <span>Call Restaurant</span>
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-semibold transition-colors">
            Report an Issue
          </button>
        </div>
      </div>

      {/* Rate Experience */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-bold mb-2">
          How was your experience?
        </h3>
        <p className="text-orange-100 text-sm mb-4">
          Help us improve by rating your delivery
        </p>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              className="text-yellow-300 hover:text-yellow-100 transition-colors"
            >
              <Star className="w-8 h-8" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}