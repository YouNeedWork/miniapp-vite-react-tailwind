export type ApiErrorCode = 
  | 'RATE_LIMIT'
  | 'SEQUENCE_NUMBER'
  | 'INSUFFICIENT_GAS'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  originalError?: any;
}

export const createApiError = (code: ApiErrorCode, message: string, originalError?: any): ApiError => ({
  code,
  message,
  originalError
});

export const handleApiError = (error: any): ApiError => {
  // Rate limit errors
  if (error?.response?.status === 429) {
    return createApiError(
      'RATE_LIMIT',
      'Please slow down! Too many requests.',
      error
    );
  }

  // Sequence number errors
  if (error?.code === 1001 || error?.type === 'SequenceNuberTooOld') {
    return createApiError(
      'SEQUENCE_NUMBER',
      'Please slow down! Actions too frequent.',
      error
    );
  }

  // Gas errors
  if (error?.code === 1004 || error?.message?.includes('CantPayGasDeposit')) {
    return createApiError(
      'INSUFFICIENT_GAS',
      'Insufficient gas for operation',
      error
    );
  }

  // Network errors
  if (error?.message?.includes('network') || error?.message?.includes('connection')) {
    return createApiError(
      'NETWORK_ERROR',
      'Network connection error. Please try again.',
      error
    );
  }

  // Default error
  return createApiError(
    'UNKNOWN',
    error?.message || 'Operation failed. Please try again.',
    error
  );
};

export const displayApiError = (error: ApiError): string => {
  switch (error.code) {
    case 'RATE_LIMIT':
    case 'SEQUENCE_NUMBER':
      return 'Please slow down and try again in a few seconds.';
    case 'INSUFFICIENT_GAS':
      return 'Insufficient gas. Please ensure you have enough RGas.';
    case 'NETWORK_ERROR':
      return 'Network error. Please check your connection and try again.';
    default:
      return error.message;
  }
};