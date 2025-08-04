import React from 'react';
import { Loader2, Heart, Star, Zap } from 'lucide-react';

interface DelightfulLoadingProps {
  message?: string;
  submessage?: string;
  type?: 'default' | 'cooking' | 'delivering' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

const DelightfulLoading: React.FC<DelightfulLoadingProps> = ({
  message,
  submessage,
  type = 'default',
  size = 'md'
}) => {
  const getLoadingContent = () => {
    switch (type) {
      case 'cooking':
        return {
          emoji: '👨‍🍳',
          defaultMessage: 'Preparing something delicious...',
          defaultSubmessage: 'Your kitchen magic is happening!',
          color: 'text-primary',
          bgColor: 'bg-orange-50'
        };
      case 'delivering':
        return {
          emoji: '🚗',
          defaultMessage: 'Your delivery heroes are on the move...',
          defaultSubmessage: 'Spreading joy, one order at a time!',
          color: 'text-primary',
          bgColor: 'bg-card'
        };
      case 'success':
        return {
          emoji: '🎉',
          defaultMessage: 'Amazing work!',
          defaultSubmessage: 'Your customers are going to love this!',
          color: 'text-accent-foreground',
          bgColor: 'bg-accent'
        };
      default:
        return {
          emoji: '✨',
          defaultMessage: 'Creating something wonderful...',
          defaultSubmessage: 'Just a moment while we work our magic!',
          color: 'text-secondary-foreground',
          bgColor: 'bg-secondary'
        };
    }
  };

  const content = getLoadingContent();
  
  const sizeClasses = {
    sm: {
      container: 'p-8',
      emoji: 'text-4xl',
      spinner: 'w-6 h-6',
      title: 'text-lg',
      subtitle: 'text-sm'
    },
    md: {
      container: 'p-12',
      emoji: 'text-6xl',
      spinner: 'w-8 h-8',
      title: 'text-xl',
      subtitle: 'text-base'
    },
    lg: {
      container: 'p-16',
      emoji: 'text-8xl',
      spinner: 'w-12 h-12',
      title: 'text-2xl',
      subtitle: 'text-lg'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`${content.bgColor} rounded-xl border border-gray-100 ${currentSize.container}`}>
      <div className="text-center">
        {/* Animated Emoji */}
        <div className="mb-6 animate-bounce">
          <span className={`${currentSize.emoji} filter drop-shadow-lg`}>
            {content.emoji}
          </span>
        </div>
        
        {/* Spinner with decorative elements */}
        <div className="relative mb-6">
          <div className="flex items-center justify-center space-x-3">
            {/* Main spinner */}
            <Loader2 className={`${currentSize.spinner} ${content.color} animate-spin`} />
            
            {/* Decorative sparkles */}
            <div className="absolute -top-2 -left-2">
              <Star className="w-3 h-3 text-primary animate-pulse [animation-delay:0.5s]" />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Heart className="w-3 h-3 text-primary animate-pulse [animation-delay:1s]" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Zap className="w-3 h-3 text-primary animate-pulse [animation-delay:1.5s]" />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-2">
          <h3 className={`${currentSize.title} font-bold text-foreground`}>
            {message || content.defaultMessage}
          </h3>
          <p className={`${currentSize.subtitle} text-muted-foreground font-medium`}>
            {submessage || content.defaultSubmessage}
          </p>
        </div>

        {/* Progress bar animation */}
        <div className="mt-6 w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${content.color.replace('text-', 'from-')} to-transparent rounded-full animate-pulse w-3/5`}
          />
        </div>
      </div>
    </div>
  );
};

export default DelightfulLoading;