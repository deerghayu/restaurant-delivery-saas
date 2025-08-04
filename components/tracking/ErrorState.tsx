import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui';

interface ErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen brand-gradient-bg flex items-center justify-center">
      <div className="bg-card rounded-xl shadow-lg p-8 border border-border text-center">
        <div className="text-6xl mb-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-card-foreground mb-2">
          {error || 'Order Not Found'}
        </h1>
        <p className="text-muted-foreground mb-4">
          {error === 'Order not found' 
            ? 'Please check your order ID and try again.'
            : 'There was an issue loading your order details.'}
        </p>
        <div className="space-x-4">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Try Again
            </Button>
          )}
          <Link href="/">
            <Button variant="secondary">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}