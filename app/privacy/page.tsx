import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { Shield, Eye, Lock, UserCheck, FileText, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy - ZoomDishes | Your Data Protection & Privacy Rights',
  description: 'Read ZoomDishes privacy policy. Learn how we protect your restaurant data and respect your privacy in compliance with Australian privacy laws.',
  openGraph: {
    title: 'Privacy Policy - ZoomDishes | Your Data Protection & Privacy Rights',
    description: 'Read ZoomDishes privacy policy. Learn how we protect your restaurant data and respect your privacy in compliance with Australian privacy laws.',
  },
};

const PrivacyPage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 text-orange-600 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="mt-8 flex items-center justify-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Last updated: August 2, 2025
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="bg-orange-50 rounded-xl p-8 mb-12 border border-orange-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="w-6 h-6 text-orange-600 mr-3" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed">
                At ZoomDishes, we respect your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when 
                you use our delivery management platform at <strong>zoomdishes.com</strong> and related services.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <FileText className="w-8 h-8 text-blue-600 mr-3" />
                1. Information We Collect
              </h2>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
                  <p className="text-gray-700 mb-3">When you register for ZoomDishes, we collect:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Restaurant name and business details</li>
                    <li>Contact information (name, email, phone number)</li>
                    <li>Business address and location data</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Data</h3>
                  <p className="text-gray-700 mb-3">We automatically collect information about how you use our service:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Order and delivery data</li>
                    <li>Driver and customer interactions</li>
                    <li>Platform usage analytics</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* How We Use Information */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <UserCheck className="w-8 h-8 text-green-600 mr-3" />
                2. How We Use Your Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Delivery</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Process and manage your orders</li>
                    <li>Facilitate delivery tracking</li>
                    <li>Provide customer support</li>
                    <li>Send service notifications</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Business Operations</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Process payments and billing</li>
                    <li>Improve our platform</li>
                    <li>Analytics and reporting</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data Protection */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <Lock className="w-8 h-8 text-purple-600 mr-3" />
                3. Data Protection & Security
              </h2>
              
              <div className="bg-purple-50 rounded-lg p-8 border border-purple-200">
                <p className="text-gray-700 mb-4">
                  We implement industry-standard security measures to protect your information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Secure data storage with encryption</li>
                    <li>Regular security audits and updates</li>
                  </ul>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Limited access controls</li>
                    <li>Australian data center hosting</li>
                    <li>Compliance with privacy regulations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Information Sharing */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Information Sharing</h2>
              
              <div className="bg-red-50 rounded-lg p-6 border border-red-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">We DO NOT sell your data</h3>
                <p className="text-gray-700 mb-4">
                  ZoomDishes does not sell, trade, or rent your personal information to third parties. 
                  We may share limited information only in these circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements</li>
                  <li>With trusted service providers (payment processors, hosting)</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </div>
            </div>

            {/* Your Rights */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Your Privacy Rights</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Access & Control</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Access your personal data</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and data</li>
                    <li>Export your data</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Australian Privacy</h3>
                  <p className="text-gray-700">
                    Under the Australian Privacy Act 1988, you have additional rights to 
                    access and correct your personal information. Contact us to exercise these rights.
                  </p>
                </div>
              </div>
            </div>

            {/* Cookies & Tracking */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. Cookies & Tracking</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to improve your experience:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li><strong>Essential cookies:</strong> Required for platform functionality</li>
                  <li><strong>Analytics cookies:</strong> Help us understand usage patterns</li>
                  <li><strong>Preference cookies:</strong> Remember your settings</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookies through your browser settings, but some features may not work properly if disabled.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Data Retention</h2>
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                <p className="text-gray-700">
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. When you close your account, we will delete your 
                  personal data within 30 days, except where required by law to retain certain information.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="text-orange-100 mb-6">
                If you have any questions about this Privacy Policy or how we handle your data, 
                please don't hesitate to contact us.
              </p>
              <div className="space-y-2">
                <p><strong>Email:</strong> privacy@zoomdishes.com</p>
                <p><strong>Address:</strong> 123 Fake Street, Sydney, NSW 2000, Australia</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPage;
