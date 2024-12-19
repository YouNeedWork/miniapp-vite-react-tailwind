import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';
import { checkRateLimit, RATE_LIMIT_CONFIG } from '@/utils/api/rateLimit';
import { handleApiError, displayApiError } from '@/utils/api/errors';
import toast from 'react-hot-toast';

export function useQueryWithRateLimit<TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const queryId = queryKey.join('-');
      
      if (!checkRateLimit(queryId, RATE_LIMIT_CONFIG.QUERY)) {
        throw new Error('Rate limit exceeded');
      }

      try {
        return await queryFn();
      } catch (error) {
        const apiError = handleApiError(error);
        toast.error(displayApiError(apiError));
        throw error;
      }
    },
    retry: (failureCount, error) => {
      // Don't retry rate limit errors
      if (error?.message?.includes('Rate limit')) {
        return false;
      }
      return failureCount < 3;
    },
    ...options
  });
}