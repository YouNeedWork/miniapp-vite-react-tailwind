import React, { useCallback } from 'react';
import { TaskList } from './components/TaskList';
import { TASK_COLORS } from "./components/TaskList/types";
import type { Task } from "./components/TaskList/types";
import { useBalances } from "@/hooks/queries/useBalances";
import { useTwitterBinding } from "@/hooks/queries/useTwitterBinding";
import { useVoteLevel } from "@/hooks/queries/useVoteLevel";
import { useTwitterClaim } from "@/hooks/useTwitterClaim";
import { useVoteClaim } from "@/hooks/useVoteClaim";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { getVoteTask } from "@/constants/voteTasks";
import toast from "react-hot-toast";
import { useTaskCompletion } from '@/hooks/queries/useTaskCompletion';

const createTask = (
  id: string,
  title: string,
  icon: string,
  iconBgColor: string,
  reward: number,
  completed: boolean,
  buttonText: string,
  onAction: () => Promise<void>
): Task => ({
  id,
  title,
  icon,
  iconBgColor,
  reward,
  completed,
  buttonText,
  onAction,
});

const TWITTER_TASK_ID = 10001;

export default function EarnView() {
  const { RgasBalance } = useBalances();
  const address = useCurrentAddress();
  const { data: twitterId, refetch: refetchTwitter } = useTwitterBinding();
  const { data: vote = 0, refetch: refetchVote } = useVoteLevel();
  const { claimTwitterReward } = useTwitterClaim();
  const { claimVoteReward } = useVoteClaim();

  const { data: twitterTaskClaimed = false } = useTaskCompletion(TWITTER_TASK_ID);

  // Handle Twitter task
  const handleTwitterAction = useCallback(async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (twitterTaskClaimed) {
      return;
    }

    try {
      if (twitterId && typeof twitterId !== 'object') {
        await claimTwitterReward();
      } else {
        window.open("https://test-portal.rooch.network/settings", "_blank");
      }
      await refetchTwitter();
    } catch (error) {
      console.error('Twitter action failed:', error);
      toast.error("Failed to process Twitter action");
    }
  }, [address, twitterId, claimTwitterReward, refetchTwitter]);

  // Handle vote task
  const handleVoteAction = useCallback(async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      if (Number(vote) > 0) {
        await claimVoteReward(Number(vote));
      } else {
        window.open("https://grow.rooch.network/project/goldminer", "_blank");
      }
      await refetchVote();
    } catch (error) {
      console.error('Vote action failed:', error);
      toast.error("Failed to process vote action");
    }
  }, [address, vote, claimVoteReward, refetchVote]);

  // Create task list
  const tasks = React.useMemo(() => {
    const currentVoteTask = getVoteTask(Number(vote) || 0);
    const voteLevel = currentVoteTask.level;
    const hasValidTwitterId = twitterId && typeof twitterId !== 'object';

    return [
      createTask(
        "6",
        `Vote Level ${voteLevel} (${currentVoteTask.requiredVotes.toLocaleString()} votes)`,
        "/imgs/task_1.png",
        TASK_COLORS.green,
        currentVoteTask.reward,
        voteLevel > 0,
        voteLevel > 0 ? "Claim" : "Go",
        handleVoteAction
      ),
      createTask(
        "7",
        "Bind Twitter Account",
        "/imgs/task_3.png",
        TASK_COLORS.green,
        100000,
        hasValidTwitterId,
        hasValidTwitterId ? !twitterTaskClaimed ? "Claim" : "Done" : "GO",
        handleTwitterAction
      ),
    ];
  }, [vote, twitterId, handleVoteAction, handleTwitterAction, twitterTaskClaimed]);

  const completedTasks = React.useMemo(() =>
    tasks.filter(task => task.completed),
    [tasks]
  );

  const pendingTasks = React.useMemo(() => {
    const uncompletedTasks = tasks.filter(task => !task.completed);
    const needsRGas = parseFloat(RgasBalance) === 0;

    return needsRGas
      ? uncompletedTasks.sort((a, b) => (a.id === "3" ? -1 : b.id === "3" ? 1 : 0))
      : uncompletedTasks;
  }, [tasks, RgasBalance]);

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">Please connect your wallet</p>
      </div>
    );
  }

  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat pt-[60px] bg-cover"
      style={{ backgroundImage: "url('/imgs/earnBg.png')" }}
    >
      <img className="w-full" src="/imgs/earn_title.png" alt="Earn Title" />

      <div className="px-[10px] w-full pb-[85px]">
        <Header />

        <TasksSection
          pendingTasks={pendingTasks}
          completedTasks={completedTasks}
        />
      </div>
    </div>
  );
}

const Header = () => (
  <div className="flex items-center justify-center mt-[-20px] mb-6">
    <img
      className="w-[153px] h-[130px] origin-top-left"
      src="/imgs/earnHeader.png"
      alt="Earn Header"
    />
    <div className="flex flex-col">
      <div className="w-[184px] text-white text-lg font-black font-['Poppins'] leading-normal">
        Complete the Task, Earn Rewards!
      </div>
      <div className="text-black text-xs font-bold font-['Poppins']">
        Daily Task - Daily reward
      </div>
    </div>
  </div>
);

const TasksSection = ({ pendingTasks, completedTasks }: { pendingTasks: Task[], completedTasks: Task[] }) => (
  <div className="space-y-6">
    {pendingTasks.length > 0 && (
      <TaskList
        title="Available Tasks"
        description="Complete these tasks to earn rewards"
        tasks={pendingTasks}
      />
    )}

    {completedTasks.length > 0 && (
      <TaskList
        title="Completed Tasks"
        description="You've already earned these rewards"
        tasks={completedTasks}
      />
    )}
  </div>
);