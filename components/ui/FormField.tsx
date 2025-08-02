import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'url';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  icon?: LucideIcon;
  iconColor?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  title?: string;
}

export default function FormField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  helperText,
  icon: Icon,
  iconColor = 'text-gray-400',
  autoComplete,
  maxLength,
  minLength,
  pattern,
  title
}: FormFieldProps) {
  const hasError = !!error;
  
  const inputClasses = `
    w-full py-2 border rounded-lg transition-colors duration-200
    focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    ${Icon ? 'pl-10 pr-3' : 'px-3'}
    ${hasError 
      ? 'border-red-300 bg-red-50 text-red-900 placeholder-red-400 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
    }
  `.trim();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <Icon className={`absolute left-3 top-2.5 h-4 w-4 ${iconColor} pointer-events-none`} />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          title={title}
          className={inputClasses}
          style={{ color: hasError ? '#991b1b' : '#1f2937', backgroundColor: hasError ? '#fef2f2' : '#ffffff' }}
        />
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}