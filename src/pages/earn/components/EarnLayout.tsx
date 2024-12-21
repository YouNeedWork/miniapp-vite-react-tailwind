import React from 'react';

interface EarnLayoutProps {
  children: React.ReactNode;
}

export const EarnLayout: React.FC<EarnLayoutProps> = ({ children }) => {
  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat bg-cover pt-[60px] pb-[80px]"
      style={{ backgroundImage: "url('/imgs/earnBg.png')" }}
    >
      {children}
    </div>
  );
};