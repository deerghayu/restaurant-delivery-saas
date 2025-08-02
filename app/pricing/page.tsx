import { Metadata } from 'next';
import Link from 'next/link';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - ZoomDishes',
  description: 'Simple, predictable pricing for your restaurant.',
};

const PricingPage = () => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Predictable Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No hidden fees. No per-delivery charges. Just one flat monthly rate.
          </p>
        </div>

        <div className="max-w-md mx-auto bg-orange-50 rounded-2xl shadow-lg p-8 border-2 border-orange-500">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
            Pro Plan
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Everything you need to get started.
          </p>
          <p className="text-center text-5xl font-bold text-gray-900 mb-6">
            $49<span className="text-xl font-medium text-gray-500">/mo</span>
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              <span>Unlimited Deliveries</span>
            </li>
            <li className="flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              <span>Up to 3 Drivers</span>
            </li>
            <li className="flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              <span>Branded Tracking Pages</span>
            </li>
            <li className="flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              <span>Real-time Driver Tracking</span>
            </li>
            <li className="flex items-center">
              <Check className="w-6 h-6 text-green-500 mr-3" />
              <span>Email & SMS Notifications</span>
            </li>
          </ul>
          <Link
            href="/auth?mode=signup"
            className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors"
          >
            Start Your 14-Day Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
