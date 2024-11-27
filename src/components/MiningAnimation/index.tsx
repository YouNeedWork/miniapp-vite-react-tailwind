import React from 'react';
import { cn } from '@/lib/utils';
import './styles.css';

interface MiningAnimationProps {
  isActive: boolean;
  className?: string;
}

export const MiningAnimation: React.FC<MiningAnimationProps> = ({ isActive, className }) => {
  return (
    <div className={cn('mining-animation-container', isActive && 'active', className)}>
      <div className="mining-sparkles" />
      <div className="mining-dust" />
    </div>
  );
};