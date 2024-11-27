import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image } from '../Image';
import { createStyles, cx, theme } from '../../styles/utils';
import { NAV_ITEMS } from './config';

const styles = createStyles({
  container: `
    fixed bottom-0 left-0 right-0 
    w-full h-[${theme.layout.navigation.height}]
    bg-[${theme.colors.primary.blue}]
    rounded-tl-[${theme.layout.navigation.borderRadius}]
    rounded-tr-[${theme.layout.navigation.borderRadius}]
    border border-[${theme.colors.border.black}]
  `,
  navWrapper: `
    flex gap-1 justify-around py-4
  `,
  navItem: (isActive: boolean) => cx(
    'flex flex-col justify-center items-center',
    'border-t rounded-[5px] shadow border-[3px]',
    'border-black transition-all duration-300 ease-in-out',
    isActive ? theme.components.bottomNav.tab.active : theme.components.bottomNav.tab.inactive
  ),
  navIcon: (isActive: boolean) => cx(
    'origin-top-left',
    isActive ? theme.components.bottomNav.icon.active : theme.components.bottomNav.icon.inactive
  ),
  navLabel: `
    text-[13px] font-[${theme.typography.fontWeight.black}] 
    font-[${theme.typography.fontFamily.poppins}] 
    text-[${theme.colors.text.white}]
  `
});

export const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navWrapper}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.path}
              onClick={() => handleTabClick(item.path)}
              className={styles.navItem(isActive)}
            >
              <Image
                alt={item.label}
                className={styles.navIcon(isActive)}
                src={item.icon}
              />
              <div className={styles.navLabel}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};