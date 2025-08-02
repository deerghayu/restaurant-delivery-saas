import React from 'react';
import { CheckCircle, Clock, AlertCircle, Car, Zap, Eye, EyeOff } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'pending';

interface StatusBadgeProps {
  status: string;
  variant?: BadgeVariant;
  icon?: LucideIcon;
  showIcon?: boolean;
  className?: string;
}

// Status mappings from your constants
const statusConfig: Record<string, { variant: BadgeVariant; icon: LucideIcon; label?: string }> = {
  // Order statuses
  'pending': { variant: 'warning', icon: Clock, label: 'Pending' },
  'confirmed': { variant: 'info', icon: CheckCircle, label: 'Confirmed' },
  'preparing': { variant: 'warning', icon: Zap, label: 'Preparing' },
  'ready': { variant: 'success', icon: CheckCircle, label: 'Ready' },
  'picked_up': { variant: 'info', icon: Car, label: 'Picked Up' },
  'delivering': { variant: 'info', icon: Car, label: 'Delivering' },
  'delivered': { variant: 'success', icon: CheckCircle, label: 'Delivered' },
  'cancelled': { variant: 'error', icon: AlertCircle, label: 'Cancelled' },
  
  // Driver statuses
  'available': { variant: 'success', icon: CheckCircle, label: 'Available' },
  'busy': { variant: 'warning', icon: Clock, label: 'Busy' },
  'offline': { variant: 'error', icon: EyeOff, label: 'Offline' },
  
  // Generic statuses
  'active': { variant: 'success', icon: Eye, label: 'Active' },
  'inactive': { variant: 'error', icon: EyeOff, label: 'Inactive' },
  'processing': { variant: 'warning', icon: Clock, label: 'Processing' }
};

const variantClasses = {
  default: 'bg-gray-100 text-gray-800 border-gray-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  error: 'bg-red-100 text-red-800 border-red-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  pending: 'bg-orange-100 text-orange-800 border-orange-200'
};

export default function StatusBadge({
  status,
  variant,
  icon: CustomIcon,
  showIcon = true,
  className = ''
}: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || { variant: 'default' as BadgeVariant, icon: AlertCircle };
  const finalVariant = variant || config.variant;
  const IconComponent = CustomIcon || config.icon;
  const label = config.label || status.charAt(0).toUpperCase() + status.slice(1);
  
  const classes = `
    inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border
    ${variantClasses[finalVariant]}
    ${className}
  `.trim();

  return (
    <span className={classes}>
      {showIcon && IconComponent && (
        <IconComponent className="w-3 h-3 mr-1" />
      )}
      <span className="capitalize">{label}</span>
    </span>
  );
}