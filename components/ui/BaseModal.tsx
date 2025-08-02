import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '6xl';
  showCloseButton?: boolean;
}

export default function BaseModal({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidth = 'md',
  showCloseButton = true
}: BaseModalProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '6xl': 'max-w-6xl'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-2xl ${maxWidthClasses[maxWidth]} w-full max-h-[90vh] flex flex-col`}>
        {/* Header */}
        <div className="bg-orange-500 text-white px-6 py-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {icon && (
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  {icon}
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold">{title}</h2>
                {subtitle && (
                  <p className="text-orange-100 text-sm">{subtitle}</p>
                )}
              </div>
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-white hover:text-orange-200 transition-colors"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}