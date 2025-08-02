import { AlertCircle } from 'lucide-react';

interface ErrorStateProps {
  error?: string;
  onRetry?: () => void;
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200 text-center">
        <div className="text-6xl mb-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {error || 'Order Not Found'}
        </h1>
        <p className="text-gray-600 mb-4">
          {error === 'Order not found' 
            ? 'Please check your order ID and try again.'
            : 'There was an issue loading your order details.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors mr-4"
          >
            Try Again
          </button>
        )}
        <a
          href="/"
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}