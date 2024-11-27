import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TelegramProvider } from './TelegramProvider';
import RoochDappProvider from './RoochProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <RoochDappProvider>
          {children}
        </RoochDappProvider>
      </TelegramProvider>
    </QueryClientProvider>
  );
};