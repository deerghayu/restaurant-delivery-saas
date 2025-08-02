import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FormSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

export default function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select an option...',
  required = false,
  disabled = false,
  error,
  helperText
}: FormSelectProps) {
  const hasError = !!error;
  
  const selectClasses = `
    w-full px-3 py-2 border rounded-lg transition-colors duration-200
    focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none
    disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
    appearance-none cursor-pointer
    ${hasError 
      ? 'border-red-300 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500' 
      : 'border-gray-300 bg-white text-gray-900'
    }
  `.trim();

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          disabled={disabled}
          className={selectClasses}
          style={{ 
            color: hasError ? '#991b1b' : '#1f2937', 
            backgroundColor: hasError ? '#fef2f2' : '#ffffff' 
          }}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value} 
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
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