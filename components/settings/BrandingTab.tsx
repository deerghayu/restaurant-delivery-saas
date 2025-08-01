import { Palette, Upload } from 'lucide-react';

interface BrandingTabProps {
  formData: {
    name: string;
    suburb: string;
    state: string;
    logo_url: string;
    primary_color: string;
  };
  updateFormData: (field: string, value: any) => void;
}

export default function BrandingTab({ formData, updateFormData }: BrandingTabProps) {
  return (
    <div className="space-y-8">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <Palette className="w-5 h-5 text-purple-500 mt-0.5" />
          <div>
            <h3 className="font-medium text-purple-900">Branding & Theme</h3>
            <p className="text-sm text-purple-700 mt-1">
              Customize your restaurant's visual identity and brand colors.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Restaurant Logo
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {formData.logo_url ? (
                <div className="space-y-4">
                  <img 
                    src={formData.logo_url} 
                    alt="Restaurant logo"
                    className="w-24 h-24 object-cover rounded-full mx-auto"
                  />
                  <button
                    type="button"
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                    onClick={() => updateFormData('logo_url', '')}
                  >
                    Remove logo
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Logo upload coming soon
                    </p>
                    <p className="text-xs text-gray-500">
                      For now, add a direct image URL below
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <input
                type="url"
                value={formData.logo_url}
                onChange={(e) => updateFormData('logo_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Primary Brand Color
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="color"
                value={formData.primary_color}
                onChange={(e) => updateFormData('primary_color', e.target.value)}
                className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
              />
              <div>
                <input
                  type="text"
                  value={formData.primary_color}
                  onChange={(e) => updateFormData('primary_color', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 font-mono text-sm"
                  pattern="^#[0-9A-Fa-f]{6}$"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This color appears in your dashboard header and customer-facing pages
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Preview</h3>
          <div 
            className="border rounded-lg p-4 text-white"
            style={{ backgroundColor: formData.primary_color }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                {formData.logo_url ? (
                  <img 
                    src={formData.logo_url} 
                    alt="Logo preview"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl">🍕</span>
                )}
              </div>
              <div>
                <h4 className="font-bold">{formData.name || 'Your Restaurant'}</h4>
                <p className="text-sm opacity-90">{formData.suburb}, {formData.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}