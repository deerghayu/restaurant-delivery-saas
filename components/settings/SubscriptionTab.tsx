import { Crown, AlertCircle, Shield, Users, CheckCircle } from 'lucide-react';

interface SubscriptionTabProps {
  formData: {
    subscription_plan: string;
    subscription_status: string;
    trial_ends_at: string;
    is_active: boolean;
  };
}

export default function SubscriptionTab({ formData }: SubscriptionTabProps) {
  const trialDaysLeft = formData.trial_ends_at ? 
    Math.max(0, Math.ceil((new Date(formData.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;

  return (
    <div className="space-y-5">
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
        <div className="flex items-start space-x-3">
          <Crown className="w-5 h-5 text-indigo-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-indigo-900">Subscription & Billing</h3>
            <p className="text-sm text-indigo-700 mt-1">
              Manage your subscription plan and billing information.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">Current Plan</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                formData.subscription_plan === 'trial' 
                  ? 'bg-yellow-100 text-yellow-800'
                  : formData.subscription_plan === 'pro'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {formData.subscription_plan.charAt(0).toUpperCase() + formData.subscription_plan.slice(1)}
              </span>
            </div>

            {formData.subscription_plan === 'trial' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800 text-sm">
                      {trialDaysLeft > 0 ? `${trialDaysLeft} days left in trial` : 'Trial expired'}
                    </p>
                    <p className="text-xs text-yellow-700">
                      Upgrade to continue using all features
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${
                  formData.subscription_status === 'active' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.subscription_status.charAt(0).toUpperCase() + formData.subscription_status.slice(1)}
                </span>
              </div>
              
              {formData.trial_ends_at && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formData.subscription_plan === 'trial' ? 'Trial ends:' : 'Next billing:'}
                  </span>
                  <span className="font-medium">
                    {new Date(formData.trial_ends_at).toLocaleDateString('en-AU')}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Account Status</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">Account Active</span>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  formData.is_active ? 'bg-green-400' : 'bg-red-400'
                }`}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">Restaurant Owner</span>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Available Plans</h4>
            
            <div className="space-y-3">
              <div className="border border-gray-300 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm">Starter Plan</h5>
                  <span className="font-bold text-sm">$29/month</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Up to 100 orders/month</li>
                  <li>• Basic reporting</li>
                  <li>• Email support</li>
                </ul>
              </div>

              <div className="border-2 border-orange-500 rounded-lg p-3 relative">
                <div className="absolute -top-2 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  Recommended
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-sm">Pro Plan</h5>
                  <span className="font-bold text-sm">$79/month</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Unlimited orders</li>
                  <li>• Advanced analytics</li>
                  <li>• Driver management</li>
                  <li>• Priority support</li>
                  <li>• Custom branding</li>
                </ul>
              </div>
            </div>

            <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}