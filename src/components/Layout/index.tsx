import React from 'react';
import { BottomNavigation } from '../BottomNavigation';
import { Inviter } from '../Inviter';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Inviter />
      <main className="pb-[75px]">
        {children}
      </main>
      <BottomNavigation />
    </div>
  );
};