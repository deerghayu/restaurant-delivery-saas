import { useState, useCallback } from 'react';
import { ERROR_MESSAGES } from '@/lib/constants';

export interface ErrorState {
  type: 'error' | 'success' | 'warning' | 'info';
  message: string;
}

export const useErrorHandler = () => {
  const [error, setError] = useState<ErrorState | null>(null);

  const handleError = useCallback((error: unknown, customMessage?: string) => {
    console.error('Error caught by error handler:', error);

    let message = customMessage || ERROR_MESSAGES.SERVER_ERROR;

    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    } else if (error && typeof error === 'object' && 'message' in error) {
      message = (error as any).message;
    }

    // Handle specific error types
    if (message.includes('401') || message.includes('unauthorized')) {
      message = ERROR_MESSAGES.UNAUTHORIZED;
    } else if (message.includes('network') || message.includes('fetch')) {
      message = ERROR_MESSAGES.NETWORK_ERROR;
    } else if (message.includes('validation')) {
      // Keep validation errors as is
    }

    setError({
      type: 'error',
      message
    });
  }, []);

  const handleSuccess = useCallback((message: string) => {
    setError({
      type: 'success',
      message
    });
  }, []);

  const handleWarning = useCallback((message: string) => {
    setError({
      type: 'warning',
      message
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    handleSuccess,
    handleWarning,
    clearError
  };
};