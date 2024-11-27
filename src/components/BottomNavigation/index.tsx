import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from '../Image';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from './config';

const styles = {
  container: [
    'fixed bottom-0 left-0 right-0 w-full',
    'h-[65px] sm:h-[75px]',
    'bg-gradient-to-r from-[#6db3e1] via-[#e2a9d7] to-[#6db3e1]',
    'rounded-t-[20px] border-t-2 border-black',
    'shadow-lg z-50',
    'backdrop-blur-sm'
  ].join(' '),
  
  navWrapper: 'flex justify-around items-center h-full px-2',
  
  navItem: (isActive: boolean) => cn(
    'relative flex flex-col items-center justify-center',
    'w-[70px] h-[55px] rounded-xl',
    'transition-all duration-300 ease-in-out',
    'cursor-pointer transform hover:-translate-y-1 active:translate-y-0',
    'hover:scale-105 active:scale-95',
    isActive ? [
      'bg-gradient-to-b from-[#e04936] to-[#c43d2b]',
      'shadow-lg'
    ].join(' ') : [
      'bg-gradient-to-b from-[#afe1fa] to-[#6db3e1]',
      'hover:from-[#9ad3f0] hover:to-[#5ca4d2]'
    ].join(' '),
    'border-2 border-black'
  ),
  
  navIcon: (isActive: boolean) => cn(
    'w-6 h-6',
    'transition-transform duration-300 ease-out',
    isActive && 'scale-110 -translate-y-1'
  ),
  
  navLabel: cn(
    'text-xs font-bold text-white mt-1',
    'transition-opacity duration-300',
    'text-shadow-sm'
  ),
  
  activeIndicator: [
    'absolute -top-1 left-1/2',
    'w-1 h-1 bg-white rounded-full',
    'transform -translate-x-1/2',
    'transition-all duration-300',
    'shadow-glow'
  ].join(' ')
};

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className={styles.container}>
      <div className={styles.navWrapper}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              className={styles.navItem(isActive)}
              onClick={() => navigate(item.path)}
            >
              {isActive && <div className={styles.activeIndicator} />}
              <Image
                alt={item.label}
                src={item.icon}
                className={styles.navIcon(isActive)}
              />
              <span className={styles.navLabel}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};