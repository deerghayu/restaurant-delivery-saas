import React, { ReactNode } from 'react';

type CardVariant = 'default' | 'bordered' | 'shadow' | 'elevated';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type CardShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  shadow?: CardShadow;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  default: 'bg-white rounded-xl',
  bordered: 'bg-white rounded-xl border border-gray-200',
  shadow: 'bg-white rounded-xl shadow-md',
  elevated: 'bg-white rounded-xl shadow-lg border border-orange-200'
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};

const shadowClasses = {
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl'
};

export default function Card({
  children,
  variant = 'default',
  padding = 'lg',
  shadow,
  hover = false,
  className = '',
  onClick
}: CardProps) {
  const isInteractive = !!onClick;
  
  const hoverClasses = hover || isInteractive 
    ? 'hover:shadow-lg hover:border-orange-300 transition-all duration-200 transform hover:-translate-y-1' 
    : '';
  
  const cursorClasses = isInteractive ? 'cursor-pointer' : '';
  
  const shadowClass = shadow ? shadowClasses[shadow] : '';
  
  const classes = `
    ${variantClasses[variant]}
    ${paddingClasses[padding]}
    ${shadowClass}
    ${hoverClasses}
    ${cursorClasses}
    ${className}
  `.trim();

  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
}