import { 
  Store, 
  Palette, 
  Settings as SettingsIcon, 
  DollarSign, 
  Crown,
  UtensilsCrossed
} from 'lucide-react';

export const settingsTabs = [
  {
    id: 'profile',
    name: 'Restaurant Profile',
    icon: Store,
    description: 'Basic information and contact details'
  },
  {
    id: 'branding',
    name: 'Branding & Theme',
    icon: Palette,
    description: 'Logo, colors, and visual identity'
  },
  {
    id: 'menu',
    name: 'Menu Management',
    icon: UtensilsCrossed,
    description: 'Manage your menu items and categories'
  },
  {
    id: 'operations',
    name: 'Operations',
    icon: SettingsIcon,
    description: 'Business hours and operational settings'
  },
  {
    id: 'delivery',
    name: 'Pricing & Delivery',
    icon: DollarSign,
    description: 'Delivery fees, minimum orders, and service area'
  },
  {
    id: 'subscription',
    name: 'Subscription',
    icon: Crown,
    description: 'Plan details and billing information'
  }
];

interface SettingsTabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function SettingsTabNavigation({ activeTab, onTabChange }: SettingsTabNavigationProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900"></h2>
        <p className="text-sm text-gray-600 mt-1">Manage your restaurant configuration</p>
      </div>
      <div className="p-2">
        <nav className="space-y-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`w-full text-left flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-orange-50 text-orange-700 border border-orange-200'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  activeTab === tab.id ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs text-gray-500">{tab.description}</div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}