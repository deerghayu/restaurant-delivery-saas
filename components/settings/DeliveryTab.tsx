import { DollarSign, Truck, Target } from 'lucide-react';
import { FormField, SectionHeader } from '@/components/ui';

interface DeliveryTabProps {
  formData: {
    minimum_order: number;
    delivery_fee: number;
    delivery_radius: number;
  };
  updateFormData: (field: string, value: any) => void;
}

export default function DeliveryTab({ formData, updateFormData }: DeliveryTabProps) {
  return (
    <div className="space-y-10">
      <SectionHeader
        title="Pricing & Delivery"
        description="Configure your delivery fees, minimum orders, and service area."
        icon={Truck}
        variant="orange"
        className="p-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FormField
          label="Minimum Order (AUD)"
          type="number"
          value={formData.minimum_order.toString()}
          onChange={(value) => updateFormData('minimum_order', parseFloat(value) || 25)}
          placeholder="25.00"
          icon={DollarSign}
          iconColor="text-green-500"
          helperText="Minimum order amount before delivery"
          pattern="[0-9]+\.?[0-9]*"
          required
        />

        <FormField
          label="Delivery Fee (AUD)"
          type="number"
          value={formData.delivery_fee.toString()}
          onChange={(value) => updateFormData('delivery_fee', parseFloat(value) || 5)}
          placeholder="5.00"
          icon={Truck}
          iconColor="text-orange-500"
          helperText="Flat delivery fee for all orders"
          pattern="[0-9]+\.?[0-9]*"
          required
        />

        <FormField
          label="Delivery Radius (km)"
          type="number"
          value={formData.delivery_radius.toString()}
          onChange={(value) => updateFormData('delivery_radius', parseInt(value) || 10)}
          placeholder="10"
          icon={Target}
          iconColor="text-blue-500"
          helperText="Maximum delivery distance from your restaurant"
          pattern="[0-9]+"
          required
        />
      </div>
    </div>
  );
}