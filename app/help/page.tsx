import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { MessageCircle, Book, Zap, Users, DollarSign, Shield, Clock, Phone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center & FAQ - ZoomDishes Support',
  description: 'Find answers to frequently asked questions about ZoomDishes delivery management platform. Get help with setup, pricing, features, and more.',
  openGraph: {
    title: 'Help Center & FAQ - ZoomDishes Support',
    description: 'Find answers to frequently asked questions about ZoomDishes delivery management platform. Get help with setup, pricing, features, and more.',
  },
};

const faqCategories = [
  {
    icon: <Zap className="w-6 h-6 text-orange-500" />,
    title: 'Getting Started',
    faqs: [
      {
        question: 'What is ZoomDishes?',
        answer: 'ZoomDishes is a delivery management platform for restaurants that allows them to use their own drivers and provide branded, real-time tracking to their customers. We help Australian restaurants take control of their delivery experience.',
      },
      {
        question: 'How long does it take to set up?',
        answer: 'You can be up and running in as little as 5 minutes. Our onboarding process is simple and requires no technical expertise. Just sign up, add your restaurant details, and start creating orders.',
      },
      {
        question: 'Do I need my own drivers?',
        answer: 'Yes, ZoomDishes is designed for restaurants that have their own delivery drivers. We provide the software to manage and track your deliveries, but you maintain control over your delivery team.',
      },
    ],
  },
  {
    icon: <DollarSign className="w-6 h-6 text-green-500" />,
    title: 'Pricing & Billing',
    faqs: [
      {
        question: 'How much does it cost?',
        answer: 'We have a simple, flat-rate pricing of $49 per month. This includes unlimited deliveries and support for up to 3 drivers. There are no per-delivery fees or hidden charges.',
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes, we offer a 14-day free trial with no credit card required. You can explore all the features of ZoomDishes and see if it\'s the right fit for your restaurant.',
      },
      {
        question: 'Can I cancel anytime?',
        answer: 'Absolutely! There are no long-term contracts. You can cancel your subscription at any time, and you\'ll continue to have access until the end of your billing period.',
      },
    ],
  },
  {
    icon: <Users className="w-6 h-6 text-blue-500" />,
    title: 'Features & Functionality',
    faqs: [
      {
        question: 'What features are included?',
        answer: 'ZoomDishes includes real-time order tracking, driver management, branded customer tracking pages, SMS/email notifications, order management dashboard, analytics, and 24/7 customer support.',
      },
      {
        question: 'How many drivers can I have?',
        answer: 'Our standard plan supports up to 3 drivers. If you need more drivers, please contact us and we can discuss custom pricing options.',
      },
      {
        question: 'Can I customize the tracking pages?',
        answer: 'Yes! Your tracking pages will be branded with your restaurant\'s colors and logo. Customers will see your brand throughout the entire delivery experience.',
      },
    ],
  },
  {
    icon: <Shield className="w-6 h-6 text-purple-500" />,
    title: 'Technical Support',
    faqs: [
      {
        question: 'What if I need help?',
        answer: 'Our Australian-based support team is here to help! You can reach us via email at support@zoomdishes.com or through the chat feature in your dashboard.',
      },
      {
        question: 'Do you provide training?',
        answer: 'Yes, we provide comprehensive onboarding and training materials. Our setup wizard guides you through everything, and our support team is available for additional help.',
      },
      {
        question: 'What devices does it work on?',
        answer: 'ZoomDishes works on any device with a web browser. Your drivers can use the mobile-optimized interface on their smartphones, and you can manage everything from your computer or tablet.',
      },
    ],
  },
];

const HelpPage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Help <span className="gradient-text">Center</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions and get the support you need to succeed 
            with ZoomDishes.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link 
              href="/docs/setup-guide" 
              className="bg-gray-50 hover:bg-white hover:shadow-lg rounded-xl p-8 text-center transition-all duration-300"
            >
              <Book className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Setup Guide</h3>
              <p className="text-gray-600">Step-by-step guide to get started</p>
            </Link>
            
            <Link 
              href="/contact" 
              className="bg-gray-50 hover:bg-white hover:shadow-lg rounded-xl p-8 text-center transition-all duration-300"
            >
              <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-gray-600">Get help from our Australian team</p>
            </Link>
            
            <Link 
              href="/pricing" 
              className="bg-gray-50 hover:bg-white hover:shadow-lg rounded-xl p-8 text-center transition-all duration-300"
            >
              <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">View Pricing</h3>
              <p className="text-gray-600">Simple, transparent pricing</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about ZoomDishes</p>
          </div>
          
          <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center mb-8">
                  {category.icon}
                  <h3 className="text-2xl font-bold text-gray-900 ml-3">{category.title}</h3>
                </div>
                
                <div className="grid lg:grid-cols-1 gap-6">
                  {category.faqs.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-white rounded-xl p-8 shadow-sm">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h4>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our Australian support team is here to help you succeed. Get in touch and 
              we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <a 
                href="mailto:support@zoomdishes.com"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
              >
                Email Us Direct
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HelpPage;
