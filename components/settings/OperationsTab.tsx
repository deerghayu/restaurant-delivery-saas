import { Clock, Calendar } from 'lucide-react';

interface BusinessHours {
  open: string;
  close: string;
  closed: boolean;
}

interface OperationsTabProps {
  formData: {
    average_prep_time: number;
    business_hours: {
      monday: BusinessHours;
      tuesday: BusinessHours;
      wednesday: BusinessHours;
      thursday: BusinessHours;
      friday: BusinessHours;
      saturday: BusinessHours;
      sunday: BusinessHours;
    };
  };
  updateFormData: (field: string, value: any) => void;
  updateBusinessHours: (day: string, field: string, value: any) => void;
}

export default function OperationsTab({ formData, updateFormData, updateBusinessHours }: OperationsTabProps) {
  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Clock className="w-5 h-5 text-green-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-900">Operations & Hours</h3>
            <p className="text-sm text-green-700 mt-1">
              Configure your business hours and operational settings.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Average Prep Time (minutes) *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-2.5 h-4 w-4 text-orange-500" />
              <input
                type="number"
                min="5"
                max="120"
                value={formData.average_prep_time}
                onChange={(e) => updateFormData('average_prep_time', parseInt(e.target.value) || 15)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Used to calculate estimated ready times for orders
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <span>Business Hours</span>
          </h3>
          
          <div className="space-y-3">
            {Object.entries(formData.business_hours).map(([day, hours]: [string, any]) => (
              <div key={day} className="flex items-center space-x-4 py-2">
                <div className="w-20">
                  <span className="text-sm font-medium text-gray-700 capitalize">{day}</span>
                </div>
                
                <div className="flex items-center space-x-3 flex-1">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={!hours.closed}
                      onChange={(e) => updateBusinessHours(day, 'closed', !e.target.checked)}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <span className="text-sm">Open</span>
                  </label>
                  
                  {!hours.closed ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateBusinessHours(day, 'open', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <span className="text-gray-500 text-sm">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateBusinessHours(day, 'close', e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>
                  ) : (
                    <span className="text-gray-500 text-sm">Closed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}