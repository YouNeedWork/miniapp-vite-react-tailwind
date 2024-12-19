export interface EarnState {
  // Twitter state
  isTwitterBound: boolean;
  needsRGas: boolean;

  // Actions
  handleVoteAction: (level: number) => Promise<void>;
  handleTwitterAction: () => Promise<void>;
}