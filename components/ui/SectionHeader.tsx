import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

type HeaderVariant = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'indigo' | 'yellow' | 'gray';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  variant?: HeaderVariant;
  children?: ReactNode;
  className?: string;
}

const variantClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-900',
    descColor: 'text-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    iconColor: 'text-green-600',
    titleColor: 'text-green-900',
    descColor: 'text-green-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    iconColor: 'text-orange-600',
    titleColor: 'text-orange-900',
    descColor: 'text-orange-700'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    iconColor: 'text-red-600',
    titleColor: 'text-red-900',
    descColor: 'text-red-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    iconColor: 'text-purple-600',
    titleColor: 'text-purple-900',
    descColor: 'text-purple-700'
  },
  indigo: {
    bg: 'bg-indigo-50',
    border: 'border-indigo-200',
    iconColor: 'text-indigo-600',
    titleColor: 'text-indigo-900',
    descColor: 'text-indigo-700'
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    iconColor: 'text-yellow-600',
    titleColor: 'text-yellow-900',
    descColor: 'text-yellow-700'
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    iconColor: 'text-gray-600',
    titleColor: 'text-gray-900',
    descColor: 'text-gray-700'
  }
};

export default function SectionHeader({
  title,
  description,
  icon: Icon,
  variant = 'orange',
  children,
  className = ''
}: SectionHeaderProps) {
  const colors = variantClasses[variant];
  
  return (
    <div className={`${colors.bg} ${colors.border} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {Icon && (
            <Icon className={`w-5 h-5 ${colors.iconColor} mt-0.5 flex-shrink-0`} />
          )}
          <div className="flex-1">
            <h3 className={`font-medium ${colors.titleColor}`}>
              {title}
            </h3>
            {description && (
              <p className={`text-sm ${colors.descColor} mt-1`}>
                {description}
              </p>
            )}
          </div>
        </div>
        {children && (
          <div className="flex-shrink-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}