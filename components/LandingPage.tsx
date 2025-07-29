"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Smartphone,
  DollarSign,
  Star,
  Users,
  MapPin,
  Clock,
  Shield,
  Zap,
  Heart,
} from "lucide-react";

const LandingPage = () => {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      title: "Branded Tracking Experience",
      description:
        "Your customers see YOUR brand, not ours. Custom tracking pages at yourrestaurant.com/track",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Predictable Pricing",
      description:
        "Fixed monthly plans starting at $49. No per-delivery fees or hidden charges.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "5-Minute Setup",
      description:
        "No engineers needed. Simple walkthrough gets you delivering in minutes.",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Perfect for Small Teams",
      description:
        "Built for restaurants with 1-3 drivers. Everything you need, nothing you don't.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-500" />,
      title: "Real-Time Tracking",
      description:
        "Your customers know exactly where their food is, reducing calls and complaints.",
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-500" />,
      title: "Australian Made",
      description:
        "Built by Aussies, for Aussies. Local support and understanding of your market.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      restaurant: "Mitchell's Pizzeria, Melbourne",
      text: "Finally, a delivery solution that doesn't cost a fortune! Our customers love the branded tracking.",
      avatar: "👩",
    },
    {
      name: "Tony Ricci",
      restaurant: "Tony's Italian Kitchen, Sydney",
      text: "Set up in 10 minutes and saved hundreds on delivery fees. Our drivers love the simple app.",
      avatar: "👨",
    },
    {
      name: "Lisa Chen",
      restaurant: "Golden Dragon, Brisbane",
      text: "Professional tracking pages that match our brand. Customers think we're much bigger than we are!",
      avatar: "👩",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚚</span>
              <span className="text-xl font-bold gradient-text">
                DeliveryMate
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-orange-600 font-medium transition-colors"
              >
                Demo Dashboard
              </Link>
              <button className="btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                  🇦🇺 Made in Australia
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Restaurant.
                <span className="gradient-text block">Your Delivery.</span>
                <span className="gradient-text">Your Brand.</span>
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Stop paying hefty commissions to delivery giants. DeliveryMate
                gives small Australian restaurants everything they need to run
                their own delivery service with professional branded tracking.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="btn-primary flex items-center justify-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <Link
                  href="/dashboard"
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <span>View Demo</span>
                  <Truck className="w-5 h-5" />
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span>rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="font-semibold">500+</span>
                  <span>happy restaurants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="font-semibold">5 min</span>
                  <span>setup time</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-up">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between text-white mb-4">
                    <h3 className="font-bold text-lg">Mario's Pizza</h3>
                    <span className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm">
                      Live Tracking
                    </span>
                  </div>
                  <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-5 h-5" />
                      <span className="font-semibold">
                        Order #1234 - En Route
                      </span>
                    </div>
                    <p className="text-sm opacity-90">
                      Your pizza is 8 minutes away!
                    </p>
                    <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-800 font-medium">
                      ✓ Order Confirmed
                    </span>
                    <span className="text-green-600 text-sm">2:15 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <span className="text-green-800 font-medium">
                      ✓ Pizza in Oven
                    </span>
                    <span className="text-green-600 text-sm">2:25 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <span className="text-orange-800 font-medium">
                      🚚 Out for Delivery
                    </span>
                    <span className="text-orange-600 text-sm">2:40 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="gradient-text"> Own Your Delivery</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for small Australian restaurants who want to
              take control of their delivery experience without the complexity
              of enterprise solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-8 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="mb-4 flex justify-center group-hover:animate-bounce-gentle">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by Restaurant Owners Across Australia
            </h2>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              See what other small restaurant owners are saying about
              DeliveryMate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{testimonial.avatar}</span>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.restaurant}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex text-yellow-500 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Take Control of Your Delivery?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of Australian restaurants already saving money and
            building their brand with DeliveryMate.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-6 py-3 rounded-lg text-gray-900 text-lg flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="btn-primary text-lg px-8">
              Start Free Trial
            </button>
          </div>

          <p className="text-gray-400 text-sm">
            14-day free trial • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🚚</span>
                <span className="text-xl font-bold text-white">
                  DeliveryMate
                </span>
              </div>
              <p className="text-sm">
                Empowering Australian restaurants to own their delivery
                experience.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Demo
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Setup Guide
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 DeliveryMate. Made with ❤️ in Australia.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
