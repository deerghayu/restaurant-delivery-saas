"use client";
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Store, Mail, Lock } from 'lucide-react';
import { FormField, StatusMessage, Button, Card } from '@/components/ui';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onToggleMode: () => void;
  onSuccess?: () => void;
}

export default function AuthForm({ mode, onToggleMode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        if (!restaurantName.trim()) {
          setError('Restaurant name is required');
          setLoading(false);
          return;
        }

        const { data, error } = await signUp(email, password, restaurantName);
        if (error) {
          setError(error.message);
        } else {
          // Skip email confirmation for MVP - re-enable for production
          // if (data?.user && !data.user.email_confirmed_at) {
          //   setError('Please check your email and click the confirmation link before signing in.');
          // } else {
            onSuccess?.();
          // }
        }
      } else {
        const { data, error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          onSuccess?.();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card shadow="xl" padding="xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl">🚚</span>
            <span className="text-2xl font-bold gradient-text">ZOOMDISHES</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'login' ? 'Welcome Back' : 'Start Your Free Trial'}
          </h2>
          <p className="text-gray-600 mt-2">
            {mode === 'login' ? 'Sign in to your restaurant dashboard' : 'Join hundreds of Australian restaurants'}
          </p>
        </div>

        {error && (
          <div className="mb-6">
            <StatusMessage type="error">
              {error}
            </StatusMessage>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <FormField
              label="Restaurant Name"
              type="text"
              value={restaurantName}
              onChange={setRestaurantName}
              placeholder="Mario's Pizza"
              icon={Store}
              iconColor="text-orange-500"
              required
            />
          )}

          <FormField
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="owner@mariopizza.com"
            icon={Mail}
            iconColor="text-blue-500"
            autoComplete="email"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none transition-colors duration-200"
                placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                required
                minLength={mode === 'signup' ? 6 : undefined}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <FormField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm your password"
              icon={Lock}
              iconColor="text-gray-500"
              autoComplete="new-password"
              required
            />
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            loadingText={mode === 'login' ? 'Signing In...' : 'Creating Account...'}
            fullWidth
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={onToggleMode}
              className="text-orange-600 hover:text-orange-700 font-medium"
            >
              {mode === 'login' ? 'Start Free Trial' : 'Sign In'}
            </button>
          </p>
        </div>

        {mode === 'signup' && (
          <p className="mt-6 text-center text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
            14-day free trial, no credit card required.
          </p>
        )}
      </Card>
    </div>
  );
}