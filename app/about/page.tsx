import { Metadata } from 'next';
import PageLayout from '@/components/PageLayout';
import { Users, Heart, Zap, Shield, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About ZoomDishes - Australian Restaurant Delivery Platform',
  description: 'Learn about ZoomDishes, the Australian-built delivery management platform empowering local restaurants to own their delivery experience.',
  openGraph: {
    title: 'About ZoomDishes - Australian Restaurant Delivery Platform',
    description: 'Learn about ZoomDishes, the Australian-built delivery management platform empowering local restaurants to own their delivery experience.',
  },
};

const stats = [
  { label: 'Happy Restaurants', value: '500+', icon: Heart },
  { label: 'Cities Served', value: '50+', icon: MapPin },
  { label: 'Customer Rating', value: '4.9/5', icon: Star },
  { label: 'Setup Time', value: '5 min', icon: Zap },
];

const values = [
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: 'Restaurant First',
    description: 'Every decision we make puts restaurants and their success first.',
  },
  {
    icon: <Shield className="w-8 h-8 text-green-500" />,
    title: 'Transparent Pricing',
    description: 'No hidden fees, no surprises. Just honest, predictable pricing.',
  },
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: 'Local Support',
    description: 'Australian-based team that understands your market and challenges.',
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-500" />,
    title: 'Fast Innovation',
    description: 'We move quickly to build features that matter to your business.',
  },
];

const AboutPage = () => {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-6 inline-block">
              🇦🇺 Made in Australia, for Australia
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Built by Restaurant People,
              <span className="gradient-text block">For Restaurant People</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              ZoomDishes was born from the frustration of watching great Australian restaurants 
              lose their profits to delivery giants. We're here to change that story.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Founded in 2024, ZoomDishes emerged from a simple observation: Australian restaurants 
                  were losing their identity and profits to massive delivery platforms that treated them 
                  as just another vendor.
                </p>
                <p>
                  We saw small family restaurants—the heart of Australian communities—struggling with 
                  30% commission fees while having no control over their customer experience. That's 
                  when we knew something had to change.
                </p>
                <p>
                  Our founders, who've worked in both technology and hospitality, built ZoomDishes 
                  specifically for small Australian restaurants. We believe every restaurant should 
                  own their delivery experience, keep their profits, and build direct relationships 
                  with their customers.
                </p>
              </div>
            </div>
            <Card className="shadow-xl border-orange-200">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90">
                  To empower every Australian restaurant to own their delivery experience, 
                  keep more of their revenue, and build lasting relationships with their customers.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at ZoomDishes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 border border-orange-200 hover:border-orange-300">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of Australian restaurants taking control of their delivery experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth?mode=signup" 
              className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Free Trial
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-orange-600 transition-colors"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
