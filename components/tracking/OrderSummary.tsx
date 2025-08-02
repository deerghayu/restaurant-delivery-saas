import { Phone, Star } from 'lucide-react';
import { Button, Card } from '@/components/ui';

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
      <Card className="shadow-lg border-orange-200 hover:border-orange-300 transition-colors duration-300">
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
      </Card>

      {/* Contact Card */}
      <Card className="shadow-lg border-orange-200 hover:border-orange-300 transition-colors duration-300">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Need Help?
        </h3>
        <div className="space-y-3">
          <Button variant="primary" size="md" icon={Phone} className="w-full">
            Call Restaurant
          </Button>
          <Button variant="ghost" size="md" className="w-full">
            Report an Issue
          </Button>
        </div>
      </Card>

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