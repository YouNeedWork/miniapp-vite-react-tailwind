export const VOTE_TASKS = [
  {
    level: 0,
    requiredVotes: 10_000,
    reward: 10_000_000 / 1e6,
  },
  {
    level: 1,
    requiredVotes: 100_000,
    reward: 100_000_000 / 1e6,
  },
  {
    level: 2,
    requiredVotes: 10_000_000,
    reward: 10_000_000_000 / 1e6,
  },
  {
    level: 3,
    requiredVotes: 100_000_000,
    reward: 100_000_000_000 / 1e6,
  },
  {
    level: 4,
    requiredVotes: 1_000_000_000,
    reward: 1_000_000_000_000 / 1e6,
  },
  {
    level: 5,
    requiredVotes: 10_000_000_000,
    reward: 10_000_000_000_000 / 1e6,
  },
] as const;

export const getVoteTask = (vote: number) => {
  return VOTE_TASKS.find((task) => task.requiredVotes <= vote) || VOTE_TASKS[0];
};
