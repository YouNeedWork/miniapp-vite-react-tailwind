import React, { Suspense } from 'react';
import { useImagePreload } from './hooks/useImagePreload';
import { LoadingScreen } from './components/LoadingScreen';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AppProviders } from './providers';
import CustomRouter from "@/route"


export default function App() {
  const imagesLoaded = useImagePreload();

  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <AppProviders>
          <CustomRouter />
        </AppProviders>
      </Suspense>
    </ErrorBoundary>
  );
}