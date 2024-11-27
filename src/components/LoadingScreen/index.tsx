import React from 'react';
import { theme } from '../../styles/utils';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex fixed inset-0 justify-center items-center bg-white">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-[#6db3e1] border-r-[#e2a9d7] border-b-[#edad4b] border-l-[#67d488] rounded-full animate-spin mb-4" />
        <p className={`text-lg font-bold text-gray-600`}>
          Loading Game Assets...
        </p>
      </div>
    </div>
  );
};