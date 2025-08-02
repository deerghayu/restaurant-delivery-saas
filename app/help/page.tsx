import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { MessageCircle, Book, Zap, Users, DollarSign, Shield, Clock, Phone, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui';

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
    icon: Zap,
    title: 'Getting Started',
    description: 'Everything you need to know to get started with ZoomDishes',
    bgColor: 'from-orange-50 to-red-50',
    borderColor: 'border-orange-200',
    iconBg: 'from-orange-500 to-red-500',
    faqs: [
      {
        question: 'What is ZoomDishes?',
        answer: 'ZoomDishes is a delivery management platform for restaurants that allows them to use their own drivers and provide branded, real-time tracking to their customers.',
        details: [
          'Use your own delivery drivers',
          'Branded real-time tracking for customers',
          'Complete order management system',
          'Built specifically for Australian restaurants'
        ]
      },
      {
        question: 'How long does it take to set up?',
        answer: 'You can be up and running in as little as 5 minutes with our simple onboarding process.',
        details: [
          'No technical expertise required',
          'Step-by-step setup wizard',
          'Instant activation after signup',
          'Start creating orders immediately'
        ]
      },
      {
        question: 'Do I need my own drivers?',
        answer: 'Yes, ZoomDishes is designed for restaurants that have their own delivery drivers.',
        details: [
          'Maintain control over your delivery team',
          'No third-party driver dependencies',
          'Keep your customer relationships',
          'Full control over delivery quality'
        ]
      },
    ],
  },
  {
    icon: DollarSign,
    title: 'Pricing & Billing',
    description: 'Simple, transparent pricing with no hidden fees',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    iconBg: 'from-green-500 to-emerald-500',
    faqs: [
      {
        question: 'How much does it cost?',
        answer: 'We have a simple, flat-rate pricing of $49 per month with no per-delivery fees or hidden charges.',
        details: [
          'Unlimited deliveries included',
          'Support for up to 3 drivers',
          'All features included',
          'No setup or cancellation fees'
        ]
      },
      {
        question: 'Is there a free trial?',
        answer: 'Yes, we offer a 14-day free trial with no credit card required.',
        details: [
          'Full access to all features',
          'No credit card required',
          'Cancel anytime during trial',
          'Australian-based support included'
        ]
      },
      {
        question: 'Can I cancel anytime?',
        answer: 'Absolutely! There are no long-term contracts and you can cancel your subscription at any time.',
        details: [
          'No cancellation fees',
          'Continue access until billing period ends',
          'Export your data anytime',
          'Reactivate whenever you want'
        ]
      },
    ],
  },
  {
    icon: Users,
    title: 'Features & Functionality',
    description: 'Comprehensive tools to manage your delivery operations',
    bgColor: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    iconBg: 'from-blue-500 to-indigo-500',
    faqs: [
      {
        question: 'What features are included?',
        answer: 'ZoomDishes includes everything you need to manage deliveries professionally.',
        details: [
          'Real-time order tracking',
          'Driver management dashboard',
          'Branded customer tracking pages',
          'SMS and email notifications',
          'Analytics and reporting',
          '24/7 customer support'
        ]
      },
      {
        question: 'How many drivers can I have?',
        answer: 'Our standard plan supports up to 3 drivers, with custom options available for larger teams.',
        details: [
          'Up to 3 drivers included',
          'Individual driver profiles',
          'Performance tracking per driver',
          'Custom pricing for more drivers'
        ]
      },
      {
        question: 'Can I customize the tracking pages?',
        answer: 'Yes! Your tracking pages will be fully branded with your restaurant\'s identity.',
        details: [
          'Upload your restaurant logo',
          'Custom brand colors',
          'Personalized messaging',
          'Consistent brand experience'
        ]
      },
    ],
  },
  {
    icon: Shield,
    title: 'Technical Support',
    description: 'Get help when you need it from our Australian team',
    bgColor: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    iconBg: 'from-purple-500 to-violet-500',
    faqs: [
      {
        question: 'What if I need help?',
        answer: 'Our Australian-based support team is here to help you succeed with ZoomDishes.',
        details: [
          'Email support: support@zoomdishes.com',
          'In-dashboard chat support',
          'Response within 24 hours',
          'Local Australian team'
        ]
      },
      {
        question: 'Do you provide training?',
        answer: 'Yes, we provide comprehensive onboarding and training materials for you and your team.',
        details: [
          'Setup wizard walkthrough',
          'Driver training materials',
          'Video tutorials available',
          'One-on-one support calls'
        ]
      },
      {
        question: 'What devices does it work on?',
        answer: 'ZoomDishes works on any device with a web browser - no apps to download.',
        details: [
          'Web-based platform',
          'Mobile-optimized interface',
          'Works on smartphones and tablets',
          'No app downloads required'
        ]
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
            <Link href="/docs/setup-guide">
              <Card className="bg-gray-50 hover:bg-white hover:shadow-lg text-center transition-all duration-300 border-orange-200 hover:border-orange-300 cursor-pointer">
                <Book className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Setup Guide</h3>
                <p className="text-gray-600">Step-by-step guide to get started</p>
              </Card>
            </Link>
            
            <Link href="/contact">
              <Card className="bg-gray-50 hover:bg-white hover:shadow-lg text-center transition-all duration-300 border-orange-200 hover:border-orange-300 cursor-pointer">
                <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contact Support</h3>
                <p className="text-gray-600">Get help from our Australian team</p>
              </Card>
            </Link>
            
            <Link href="/pricing">
              <Card className="bg-gray-50 hover:bg-white hover:shadow-lg text-center transition-all duration-300 border-orange-200 hover:border-orange-300 cursor-pointer">
                <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">View Pricing</h3>
                <p className="text-gray-600">Simple, transparent pricing</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about ZoomDishes</p>
          </div>
          
          <div className="space-y-20">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className={`bg-gradient-to-br ${category.bgColor} rounded-2xl p-8 border ${category.borderColor}`}>
                <div className="flex items-center gap-6 mb-12">
                  <div className={`flex items-center justify-center w-20 h-20 bg-gradient-to-br ${category.iconBg} rounded-2xl text-white`}>
                    <category.icon className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900">{category.title}</h3>
                    <p className="text-lg text-gray-700 mt-2">{category.description}</p>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {category.faqs.map((faq, faqIndex) => (
                    <div key={faqIndex} className="bg-white rounded-xl p-8 shadow-sm">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">{faq.question}</h4>
                      <p className="text-lg text-gray-700 mb-6 leading-relaxed">{faq.answer}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        {faq.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl opacity-90 mb-8">
              Our Australian support team is here to help you succeed. Get in touch and 
              we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                Contact Support
              </Link>
              <a 
                href="mailto:support@zoomdishes.com"
                className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
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
