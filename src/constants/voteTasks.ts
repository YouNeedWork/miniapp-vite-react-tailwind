export const VOTE_TASKS = [
  {
    level: 0,
    requiredVotes: 10000,
    reward: 100,
  },
  {
    level: 1,
    requiredVotes: 100000,
    reward: 1000,
  },
  {
    level: 2,
    requiredVotes: 1000000,
    reward: 10000,
  },
  {
    level: 3,
    requiredVotes: 10000000,
    reward: 100000,
  },
  {
    level: 4,
    requiredVotes: 100000000,
    reward: 1000000,
  },
  {
    level: 5,
    requiredVotes: 1000000000,
    reward: 10000000,
  },
] as const;

export const getVoteTask = (vote: number) => {
  return VOTE_TASKS.find((task) => task.requiredVotes <= vote) || VOTE_TASKS[0];
};