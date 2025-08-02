import { Palette, Upload, Link } from 'lucide-react';
import { FormField, SectionHeader } from '@/components/ui';

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
      <SectionHeader
        title="Branding & Theme"
        description="Customize your restaurant's visual identity and brand colors."
        icon={Palette}
        variant="purple"
        className="p-6"
      />

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
              <FormField
                label="Logo URL"
                type="url"
                value={formData.logo_url}
                onChange={(value) => updateFormData('logo_url', value)}
                placeholder="https://example.com/logo.png"
                icon={Link}
                iconColor="text-blue-500"
                helperText="Enter a direct link to your logo image"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-4">
              <div>
                <label className="form-label">
                  <Palette className="w-4 h-4 inline mr-1 text-purple-500" />
                  Primary Brand Color
                </label>
                <input
                  type="color"
                  value={formData.primary_color}
                  onChange={(e) => updateFormData('primary_color', e.target.value)}
                  className="w-16 h-12 border border-gray-300 rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex-1">
                <FormField
                  label="Hex Code"
                  type="text"
                  value={formData.primary_color}
                  onChange={(value) => updateFormData('primary_color', value)}
                  placeholder="#FF6B35"
                  pattern="^#[0-9A-Fa-f]{6}$"
                  title="Please enter a valid hex color code"
                  helperText="This color appears in your dashboard header and customer-facing pages"
                />
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