import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:scale-105',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300',
  success: 'bg-green-500 hover:bg-green-600 text-white shadow-md',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-md',
  warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md',
  info: 'bg-blue-500 hover:bg-blue-600 text-white shadow-md',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-transparent hover:border-gray-300'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  xl: 'px-8 py-4 text-lg'
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Loading...',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  
  const baseClasses = `
    inline-flex items-center justify-center space-x-2 
    font-semibold rounded-lg transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `.trim();
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim();

  const renderIcon = () => {
    if (loading) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }
    if (Icon) {
      return <Icon className="w-4 h-4" />;
    }
    return null;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </>
      );
    }

    if (Icon && iconPosition === 'left') {
      return (
        <>
          <Icon className="w-4 h-4" />
          <span>{children}</span>
        </>
      );
    }

    if (Icon && iconPosition === 'right') {
      return (
        <>
          <span>{children}</span>
          <Icon className="w-4 h-4" />
        </>
      );
    }

    return <span>{children}</span>;
  };

  return (
    <button
      className={classes}
      disabled={isDisabled}
      {...props}
    >
      {renderContent()}
    </button>
  );
}