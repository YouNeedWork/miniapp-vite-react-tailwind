export interface MintState {
  // Balances
  goldBalance: string;
  rgasBalance: string;
  hunger: number;
  
  // Loading states
  isMining: boolean;
  isCreating: boolean;
  isStarting: boolean;
  
  // Modal states
  showSessionKeyModal: boolean;
  showWelcome: boolean;
  isBackpackOpen: boolean;
  isShopOpen: boolean;
  
  // Flags
  hasGas: boolean;
  shouldShowDailyCheckIn: boolean;
  
  // Actions
  handleMining: () => Promise<void>;
  handleStart: () => Promise<void>;
  handleRefresh: () => void;
  handleCreateSessionKey: () => Promise<void>;
  
  // Setters
  setShowSessionKeyModal: (show: boolean) => void;
  setShowWelcome: (show: boolean) => void;
  setIsBackpackOpen: (open: boolean) => void;
  setIsShopOpen: (open: boolean) => void;
}