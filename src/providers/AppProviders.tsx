import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TelegramProvider } from './TelegramProvider';
import RoochDappProvider from './RoochProvider';
import { BackgroundMusicProvider } from '@/contexts/BackgroundMusicContext';
import { Toaster } from 'react-hot-toast';


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
          <BackgroundMusicProvider>
            {children}

            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                  borderRadius: '10px',
                  padding: '16px',
                },
                success: {
                  iconTheme: {
                    primary: '#67d488',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#e04936',
                    secondary: '#fff',
                  },
                },
              }}
            />

          </BackgroundMusicProvider>
        </RoochDappProvider>
      </TelegramProvider>
    </QueryClientProvider>
  );
};