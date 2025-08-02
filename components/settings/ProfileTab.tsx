import { Store, Phone, Mail, MapPin } from 'lucide-react';
import { FormField, FormSelect, SectionHeader } from '@/components/ui';

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
      <SectionHeader
        title="Restaurant Profile"
        description="This information appears on your restaurant profile and order confirmations."
        icon={Store}
        variant="blue"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Restaurant Name"
          type="text"
          value={formData.name}
          onChange={(value) => updateFormData('name', value)}
          placeholder="Your Awesome Restaurant"
          icon={Store}
          iconColor="text-orange-500"
          required
        />

        <FormField
          label="Phone Number"
          type="tel"
          value={formData.phone}
          onChange={(value) => updateFormData('phone', value)}
          placeholder="(02) 9876 5432"
          icon={Phone}
          iconColor="text-green-500"
          required
        />

        <FormField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(value) => updateFormData('email', value)}
          placeholder="owner@restaurant.com"
          icon={Mail}
          iconColor="text-blue-500"
          autoComplete="email"
          required
        />
      </div>

      <div className="border-t pt-6">
        <SectionHeader
          title="Restaurant Address"
          icon={MapPin}
          variant="red"
          className="mb-6"
        />

        <div className="space-y-4">
          <FormField
            label="Street Address"
            type="text"
            value={formData.street_address}
            onChange={(value) => updateFormData('street_address', value)}
            placeholder="123 Collins Street"
            icon={MapPin}
            iconColor="text-red-500"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              label="Suburb"
              type="text"
              value={formData.suburb}
              onChange={(value) => updateFormData('suburb', value)}
              placeholder="Melbourne"
              required
            />

            <FormSelect
              label="State"
              value={formData.state}
              onChange={(value) => updateFormData('state', value)}
              options={australianStates}
              required
            />

            <FormField
              label="Postcode"
              type="text"
              value={formData.postcode}
              onChange={(value) => updateFormData('postcode', value)}
              placeholder="3000"
              maxLength={4}
              pattern="[0-9]{4}"
              title="Please enter a 4-digit postcode"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}