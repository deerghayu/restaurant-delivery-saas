"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  Button,
  Card, 
  CardContent,
  Input,
  Badge,
  Separator
} from '@/components/ui';
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
  CheckCircle,
  Timer,
  TrendingUp
} from "lucide-react";

const LandingPageModern = () => {
  const [email, setEmail] = useState("");

  const features = [
    {
      icon: <Smartphone className="w-8 h-8 text-orange-500" />,
      title: "Branded Tracking Experience",
      description: "Your customers see YOUR brand, not ours. Custom tracking pages at yourrestaurant.com/track",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-500" />,
      title: "Predictable Pricing",
      description: "Fixed monthly plans starting at $49. No per-delivery fees or hidden charges.",
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "5-Minute Setup",
      description: "No engineers needed. Simple walkthrough gets you delivering in minutes.",
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: "Perfect for Small Teams",
      description: "Built for restaurants with 1-3 drivers. Everything you need, nothing you don't.",
    },
    {
      icon: <MapPin className="w-8 h-8 text-red-500" />,
      title: "Real-Time Tracking",
      description: "Your customers know exactly where their food is, reducing calls and complaints.",
    },
    {
      icon: <Shield className="w-8 h-8 text-teal-500" />,
      title: "Australian Made",
      description: "Built by Aussies, for Aussies. Local support and understanding of your market.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      restaurant: "Mitchell's Pizzeria, Melbourne",
      text: "Finally, a delivery solution that doesn't cost a fortune! Our customers love the branded tracking.",
      avatar: "👩",
      rating: 5
    },
    {
      name: "Tony Ricci",
      restaurant: "Tony's Italian Kitchen, Sydney",
      text: "Set up in 10 minutes and saved hundreds on delivery fees. Our drivers love the simple app.",
      avatar: "👨",
      rating: 5
    },
    {
      name: "Lisa Chen",
      restaurant: "Golden Dragon, Brisbane",
      text: "Professional tracking pages that match our brand. Customers think we're much bigger than we are!",
      avatar: "👩",
      rating: 5
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Navigation */}
      <header className="bg-card/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/favicon.ico" 
                alt="ZoomDishes Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-brand-gradient">
                ZOOMDISHES
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/auth">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button className="btn-brand">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="bg-orange-50 text-orange-600 border-orange-200">
                <span className="mr-2">🇦🇺</span>
                Made in Australia
              </Badge>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Your Restaurant.{" "}
                  <span className="text-brand-gradient block">
                    Your Delivery.
                  </span>
                  <span className="text-brand-gradient">
                    Your Brand.
                  </span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Stop paying hefty commissions to delivery giants. ZoomDishes gives small Australian restaurants 
                  everything they need to run their own delivery service with professional branded tracking.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth?mode=signup">
                  <Button size="lg" className="btn-brand">
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" size="lg">
                    <Truck className="w-5 h-5 mr-2" />
                    <span>View Demo</span>
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold">4.9/5</span> rating
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold">500+</span> happy restaurants
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold">5 min</span> setup
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="shadow-2xl border-0 bg-card backdrop-blur-sm">
                <div className="section-brand rounded-t-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Mario's Pizza</h3>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Live Tracking
                    </Badge>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-2">
                      <Truck className="w-5 h-5" />
                      <span className="font-semibold">Order #1234 - En Route</span>
                    </div>
                    <p className="text-sm opacity-90 mb-3">Your pizza is 8 minutes away!</p>
                    <div className="bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 font-medium">Order Confirmed</span>
                    </div>
                    <span className="text-green-600 text-sm">2:15 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-800 font-medium">Pizza in Oven</span>
                    </div>
                    <span className="text-green-600 text-sm">2:25 PM</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-orange-500" />
                      <span className="text-orange-600 font-medium">Out for Delivery</span>
                    </div>
                    <span className="text-orange-500 text-sm">2:40 PM</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Everything You Need to{" "}
              <span className="text-brand-gradient">
                Own Your Delivery
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built specifically for small Australian restaurants who want to take control 
              of their delivery experience without enterprise complexity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 section-brand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Loved by Restaurant Owners Across Australia
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              See what other small restaurant owners are saying about ZoomDishes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-2xl border-0 bg-card backdrop-blur-sm">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.restaurant}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-t">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className="text-4xl font-bold text-foreground">
            Ready to Take Control of Your Delivery?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join hundreds of Australian restaurants already saving money and building their brand with ZoomDishes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Link href="/auth?mode=signup">
              <Button size="lg" className="btn-brand whitespace-nowrap">
                Start Free Trial
              </Button>
            </Link>
          </div>

          <p className="text-muted-foreground text-sm">
            14-day free trial • No credit card required • Setup in 5 minutes
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-muted-foreground py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="/favicon.ico" 
                  alt="ZoomDishes Logo" 
                  className="w-8 h-8"
                />
                <span className="text-xl font-bold text-foreground">ZOOMDISHES</span>
              </div>
              <p className="text-sm">
                Empowering Australian restaurants to own their delivery experience.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-2 text-sm">
                <Link href="/#features" className="block hover:text-primary transition-colors">
                  Features
                </Link>
                <Link href="/pricing" className="block hover:text-primary transition-colors">
                  Pricing
                </Link>
                <Link href="/dashboard" className="block hover:text-primary transition-colors">
                  Demo
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/help" className="block hover:text-primary transition-colors">
                  Help Center
                </Link>
                <Link href="/contact" className="block hover:text-primary transition-colors">
                  Contact Us
                </Link>
                <Link href="/docs/setup-guide" className="block hover:text-primary transition-colors">
                  Setup Guide
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2 text-sm">
                <Link href="/about" className="block hover:text-primary transition-colors">
                  About
                </Link>
                <Link href="/privacy" className="block hover:text-primary transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="block hover:text-primary transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>

          <Separator className="my-8" />
          <div className="text-center text-sm">
            <p>&copy; 2025 ZoomDishes. Made with <span className="text-red-500">❤️</span> in Australia.</p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPageModern;