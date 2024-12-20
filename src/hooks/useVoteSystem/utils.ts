import { VoteInfo } from "@/hooks/queries/useVoteLevel";
import { VoteTask, VoteSystemState } from "./types";
import { VOTE_TASKS } from "@/constants/voteTasks";

export const calculateVoteSystemState = (
  voteInfo: VoteInfo | null,
  completedTaskIds: number[]
): VoteSystemState => {
  if (!voteInfo) {
    return {
      currentLevel: 0,
      nextLevelVotes: VOTE_TASKS[0].requiredVotes,
      completedTasks: [],
      pendingTasks: [],
      canClaimReward: false,
    };
  }

  const { votes } = voteInfo;
  const tasks: VoteTask[] = [];

  // Create tasks for all available levels
  for (const task of VOTE_TASKS) {
    const isCompleted = votes >= task.requiredVotes;
    const taskId = 11000 + task.level; // Contract task ID
    const isClaimed = completedTaskIds.includes(taskId);

    tasks.push({
      level: task.level,
      requiredVotes: task.requiredVotes,
      reward: task.reward,
      claimed: isClaimed,
      completed: isCompleted,
    });
  }

  // Split tasks into completed and pending
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  // Check if any completed tasks can be claimed
  const canClaimReward = completedTasks.some((task) => !task.claimed);

  return {
    currentLevel: voteInfo.level,
    nextLevelVotes: voteInfo.nextLevelVotes,
    completedTasks,
    pendingTasks,
    canClaimReward,
  };
};

export const getVoteTaskId = (level: number): number => 11000 + level;
