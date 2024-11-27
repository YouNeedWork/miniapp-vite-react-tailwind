import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Inviter: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const startParam = searchParams.get('start_param');
    
    if (startParam) {
      const [inviter, code] = startParam.split('|');
      
      if (code && inviter) {
        localStorage.setItem('code', code);
        localStorage.setItem('inviter', inviter);
      } else {
        localStorage.setItem('inviter', startParam);
      }
    }
  }, [searchParams]);

  return null;
};