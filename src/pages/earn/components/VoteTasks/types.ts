export interface VoteTask {
  level: number;
  requiredVotes: number;
  reward: number;
  claimed: boolean;
}

export interface VoteTasksState {
  currentLevel: number;
  completedTasks: VoteTask[];
  pendingTasks: VoteTask[];
  isLoading: boolean;
}