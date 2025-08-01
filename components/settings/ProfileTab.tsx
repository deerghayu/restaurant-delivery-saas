import { Store, Phone, Mail, MapPin } from 'lucide-react';

const australianStates = [
  { value: 'NSW', label: 'New South Wales' },
  { value: 'VIC', label: 'Victoria' },
  { value: 'QLD', label: 'Queensland' },
  { value: 'WA', label: 'Western Australia' },
  { value: 'SA', label: 'South Australia' },
  { value: 'TAS', label: 'Tasmania' },
  { value: 'ACT', label: 'Australian Capital Territory' },
  { value: 'NT', label: 'Northern Territory' }
];

interface ProfileTabProps {
  formData: {
    name: string;
    phone: string;
    email: string;
    street_address: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  updateFormData: (field: string, value: any) => void;
}

export default function ProfileTab({ formData, updateFormData }: ProfileTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Store className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Restaurant Profile</h3>
            <p className="text-sm text-blue-700 mt-1">
              This information appears on your restaurant profile and order confirmations.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Restaurant Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Your Awesome Restaurant"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-green-500" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="(02) 9876 5432"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="owner@restaurant.com"
              required
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-red-500" />
          <span>Restaurant Address</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <input
              type="text"
              value={formData.street_address}
              onChange={(e) => updateFormData('street_address', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              placeholder="123 Collins Street"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Suburb *
              </label>
              <input
                type="text"
                value={formData.suburb}
                onChange={(e) => updateFormData('suburb', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Melbourne"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select
                value={formData.state}
                onChange={(e) => updateFormData('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              >
                {australianStates.map(state => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode *
              </label>
              <input
                type="text"
                value={formData.postcode}
                onChange={(e) => updateFormData('postcode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="3000"
                maxLength={4}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}