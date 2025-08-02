import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { Check, X, DollarSign, Users, Zap, Shield, Star, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing - ZoomDishes | Simple, Transparent Pricing for Australian Restaurants',
  description: 'Simple, predictable pricing starting at $49/month. No hidden fees, no per-delivery charges. 14-day free trial for Australian restaurants.',
  openGraph: {
    title: 'Pricing - ZoomDishes | Simple, Transparent Pricing for Australian Restaurants',
    description: 'Simple, predictable pricing starting at $49/month. No hidden fees, no per-delivery charges. 14-day free trial for Australian restaurants.',
  },
};

const features = [
  { name: 'Unlimited Deliveries', included: true },
  { name: 'Up to 3 Drivers', included: true },
  { name: 'Branded Tracking Pages', included: true },
  { name: 'Real-time Driver Tracking', included: true },
  { name: 'Customer SMS/Email Notifications', included: true },
  { name: 'Order Management Dashboard', included: true },
  { name: 'Driver Mobile App', included: true },
  { name: 'Analytics & Reporting', included: true },
  { name: 'Australian Support Team', included: true },
  { name: 'Setup & Training', included: true },
];

const comparisonData = [
  {
    service: 'Traditional Delivery Apps',
    commission: '20-30%',
    monthlyFee: '$0',
    totalCostPer100Orders: '$600-$900',
    ownership: 'Platform owns customers',
  },
  {
    service: 'ZoomDishes',
    commission: '0%',
    monthlyFee: '$49',
    totalCostPer100Orders: '$49',
    ownership: 'You own your customers',
  },
];

const PricingPage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            No hidden fees. No per-delivery charges. No commission fees. 
            Just one flat monthly rate that lets you keep more of your profits.
          </p>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-2xl p-8 border-2 border-orange-500 relative overflow-hidden">
              {/* Popular badge */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-bl-xl font-semibold text-sm">
                Most Popular
              </div>
              
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Pro Plan</h2>
                <p className="text-gray-600 mb-6">Everything you need to own your delivery</p>
                
                <div className="mb-6">
                  <div className="text-6xl font-bold text-gray-900 mb-2">
                    $49
                    <span className="text-xl font-medium text-gray-500">/month</span>
                  </div>
                  <p className="text-green-600 font-semibold">14-day free trial</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature.name}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/auth?mode=signup"
                className="w-full block text-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free Trial
              </Link>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                No credit card required • Cancel anytime • Australian support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              See How Much You'll Save
            </h2>
            <p className="text-xl text-gray-600">
              Stop losing profits to commission fees
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Service</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Commission</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Monthly Fee</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Cost per 100 Orders*</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Customer Ownership</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr key={index} className={index === 1 ? 'bg-orange-50 border-l-4 border-orange-500' : ''}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{item.service}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={index === 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                        {item.commission}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">{item.monthlyFee}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={index === 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>
                        {item.totalCostPer100Orders}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm">{item.ownership}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            *Based on average order value of $30 AUD
          </p>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ZoomDishes?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Keep More Profit</h3>
              <p className="text-gray-600">No commission fees mean you keep 100% of your delivery revenue</p>
            </div>
            
            <div className="text-center p-6">
              <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Own Your Customers</h3>
              <p className="text-gray-600">Build direct relationships without platform interference</p>
            </div>
            
            <div className="text-center p-6">
              <Zap className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Setup</h3>
              <p className="text-gray-600">Get started in 5 minutes with our simple onboarding</p>
            </div>
            
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Australian Support</h3>
              <p className="text-gray-600">Local team that understands your market and challenges</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pricing Questions</h2>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is there really no setup fee?</h3>
              <p className="text-gray-700">Absolutely! There are no setup fees, no onboarding costs, and no hidden charges. You just pay the monthly subscription and that's it.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What happens after my free trial?</h3>
              <p className="text-gray-700">After your 14-day free trial, you'll be charged $49/month. You can cancel anytime during or after your trial with no penalties.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I add more drivers?</h3>
              <p className="text-gray-700">Our standard plan includes up to 3 drivers. If you need more, contact us for custom pricing options that scale with your business.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do you offer refunds?</h3>
              <p className="text-gray-700">Yes, we offer a 30-day money-back guarantee. If you're not satisfied, we'll refund your first month's payment, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Keep More of Your Profits?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of Australian restaurants saving thousands every month.
          </p>
          <Link 
            href="/auth?mode=signup" 
            className="inline-flex items-center bg-white text-orange-600 px-12 py-4 rounded-xl font-bold text-xl hover:bg-gray-100 transition-colors"
          >
            Start Free Trial - No Credit Card Required
          </Link>
        </div>
      </section>
    </PageLayout>
  );
};

export default PricingPage;
