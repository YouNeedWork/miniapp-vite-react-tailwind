import React, { Suspense } from 'react';

const LazyLoader = ({ children, fallback = <div>Loading...</div> }) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};

export default LazyLoader;
