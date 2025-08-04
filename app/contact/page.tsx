import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { Mail, MessageCircle, MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact ZoomDishes - Get Support & Talk to Our Australian Team',
  description: 'Get in touch with the ZoomDishes team. We provide local Australian support for restaurant owners using our delivery management platform.',
  openGraph: {
    title: 'Contact ZoomDishes - Get Support & Talk to Our Australian Team',
    description: 'Get in touch with the ZoomDishes team. We provide local Australian support for restaurant owners using our delivery management platform.',
  },
};

const contactMethods = [
  {
    icon: <Mail className="w-8 h-8 text-brand" />,
    title: 'General Inquiries',
    description: 'Questions about ZoomDishes or want to learn more?',
    contact: 'hello@zoomdishes.com',
    href: 'mailto:hello@zoomdishes.com',
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-blue-500" />,
    title: 'Customer Support',
    description: 'Need help with your account or technical issues?',
    contact: 'support@zoomdishes.com',
    href: 'mailto:support@zoomdishes.com',
  },
  {
    icon: <Phone className="w-8 h-8 text-green-500" />,
    title: 'Sales & Partnerships',
    description: 'Interested in partnerships or have sales questions?',
    contact: 'sales@zoomdishes.com',
    href: 'mailto:sales@zoomdishes.com',
  },
];

const officeInfo = [
  {
    icon: <MapPin className="w-6 h-6 text-brand" />,
    label: 'Address',
    value: '123 Fake Street, Sydney, NSW 2000, Australia',
  },
  {
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    label: 'Business Hours',
    value: 'Monday - Friday: 9:00 AM - 6:00 PM AEST',
  },
  {
    icon: <Phone className="w-6 h-6 text-green-500" />,
    label: 'Phone',
    value: '+61 2 9999 9999',
  },
];

function ContactPage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            We're here to help Australian restaurants succeed. Our local team is ready to 
            support you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
            <p className="text-xl text-gray-600">Choose the best way to reach our team</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:bg-white hover:shadow-lg transition-all duration-300 border border-brand-light hover:border-brand-light">
                <div className="flex justify-center mb-6">
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <p className="text-gray-600 mb-6">{method.description}</p>
                <a href={method.href}>
                  <Button variant="default" className="w-full">
                    {method.contact}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Visit Our Office</h2>
              <div className="space-y-6">
                {officeInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{info.label}</h3>
                      <p className="text-gray-600">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-brand-light rounded-xl border border-brand-light">
                <h3 className="font-bold text-brand-dark mb-2">🇦🇺 Local Australian Support</h3>
                <p className="text-brand-dark">
                  Our entire team is based in Australia. We understand the local market, 
                  regulations, and challenges that Australian restaurants face.
                </p>
              </div>
            </div>

            <Card className="shadow-xl border-brand-light">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact Form</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Mario's Pizza"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="owner@mariopizza.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                  >
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Sales Question</option>
                    <option>Partnership Opportunity</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-brand"
                    placeholder="Tell us how we can help..."
                  ></textarea>
                </div>
                <Button
                  type="submit"
                  variant="default"
                  className="w-full"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Link Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Looking for Quick Answers?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Check out our frequently asked questions for immediate help.
          </p>
          <Link href="/help">
            <Button variant="secondary" size="lg">
              Visit Help Center
            </Button>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

export default ContactPage;