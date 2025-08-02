import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import Link from 'next/link';
import { Play, UserPlus, Palette, Truck, CheckCircle, Clock, Smartphone, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Setup Guide - ZoomDishes | Get Started in 5 Minutes',
  description: 'Complete step-by-step setup guide for ZoomDishes. Get your restaurant delivery system up and running in just 5 minutes with our easy onboarding process.',
  openGraph: {
    title: 'Setup Guide - ZoomDishes | Get Started in 5 Minutes',
    description: 'Complete step-by-step setup guide for ZoomDishes. Get your restaurant delivery system up and running in just 5 minutes with our easy onboarding process.',
  },
};

const setupSteps = [
  {
    icon: UserPlus,
    title: 'Create Your Account',
    duration: '1 minute',
    description: 'Sign up for your free 14-day trial with basic restaurant information.',
    details: [
      'Restaurant name and location',
      'Contact information',
      'Business type and size',
      'No credit card required'
    ]
  },
  {
    icon: Truck,
    title: 'Add Your Drivers',
    duration: '2 minutes',
    description: 'Add your delivery drivers to start managing deliveries.',
    details: [
      'Driver name and contact info',
      'Vehicle type and license plate',
      'Choose fun avatar emojis',
      'Set driver availability'
    ]
  },
  {
    icon: Palette,
    title: 'Customize Your Branding',
    duration: '1 minute',
    description: 'Make tracking pages match your restaurant brand.',
    details: [
      'Upload your restaurant logo',
      'Choose brand colors',
      'Customize tracking page design',
      'Set customer notification preferences'
    ]
  },
  {
    icon: Play,
    title: 'Start Creating Orders',
    duration: '1 minute',
    description: 'Create your first delivery order and see the magic happen.',
    details: [
      'Add customer details',
      'Assign to available driver',
      'Customer gets branded tracking link',
      'Real-time delivery updates'
    ]
  }
];

const features = [
  {
    icon: Smartphone,
    title: 'Mobile Driver App',
    description: 'Your drivers get a dedicated mobile app for order management'
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track performance, delivery times, and customer satisfaction'
  },
  {
    icon: CheckCircle,
    title: 'Automated Notifications',
    description: 'Customers receive SMS and email updates automatically'
  }
];

const SetupGuidePage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Clock className="w-4 h-4 mr-2" />
            Setup takes only 5 minutes
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Setup <span className="gradient-text">Guide</span>
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Welcome to ZoomDishes! Follow these simple steps to get your restaurant 
            set up and ready to own your delivery experience.
          </p>
          <Link 
            href="/auth?mode=signup"
            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Four Simple Steps to Success
            </h2>
            <p className="text-xl text-gray-600">
              Get up and running in minutes, not hours
            </p>
          </div>

          <div className="space-y-12">
            {setupSteps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl text-white">
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Step {index + 1}: {step.title}
                    </h3>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {step.duration}
                    </span>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6">
                    {step.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What You Get After Setup
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage deliveries like a pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-sm text-center">
                <feature.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pro Tips for Success
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-orange-50 rounded-xl p-8 border border-orange-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🚀 Start Small, Scale Fast</h3>
              <p className="text-gray-700">
                Begin with 1-2 drivers to test the system, then add more as you see the value. 
                Most restaurants are fully operational within their first week.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-8 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">📱 Train Your Drivers</h3>
              <p className="text-gray-700">
                Show your drivers how to use the mobile app. The interface is intuitive, 
                but a quick 5-minute walkthrough ensures smooth operations from day one.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">🎨 Brand Everything</h3>
              <p className="text-gray-700">
                Upload your logo and set your colors during setup. Customers love seeing 
                consistent branding throughout their delivery experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of Australian restaurants already using ZoomDishes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth?mode=signup" 
              className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              Get Help with Setup
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SetupGuidePage;
