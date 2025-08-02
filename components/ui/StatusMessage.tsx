import React, { ReactNode } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

type MessageType = 'success' | 'error' | 'warning' | 'info';

interface StatusMessageProps {
  type: MessageType;
  children: ReactNode;
  title?: string;
  onClose?: () => void;
  icon?: LucideIcon;
  className?: string;
}

const messageConfig = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-500',
    titleColor: 'text-green-900',
    textColor: 'text-green-700'
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500',
    titleColor: 'text-red-900',
    textColor: 'text-red-700'
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-700'
  },
  info: {
    icon: Info,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-900',
    textColor: 'text-blue-700'
  }
};

export default function StatusMessage({
  type,
  children,
  title,
  onClose,
  icon: CustomIcon,
  className = ''
}: StatusMessageProps) {
  const config = messageConfig[type];
  const IconComponent = CustomIcon || config.icon;

  return (
    <div 
      className={`
        ${config.bgColor} ${config.borderColor} 
        border rounded-lg p-4 flex items-start space-x-3 
        ${className}
      `.trim()}
    >
      <IconComponent className={`w-5 h-5 ${config.iconColor} mt-0.5 flex-shrink-0`} />
      
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className={`font-medium ${config.titleColor} mb-1`}>
            {title}
          </h4>
        )}
        <div className={`text-sm ${config.textColor}`}>
          {children}
        </div>
      </div>
      
      {onClose && (
        <button
          onClick={onClose}
          className={`${config.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
          aria-label="Close message"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}