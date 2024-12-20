import React from 'react';
import { Actions } from './Actions';

interface MintActionsProps {
  mine: () => Promise<boolean>;
  claim: () => Promise<boolean>;
  hunger: string;
  onOpenBackpack: () => void;
  onOpenShop: () => void;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export const MintActions: React.FC<MintActionsProps> = (props) => {
  return <Actions {...props} />;
};