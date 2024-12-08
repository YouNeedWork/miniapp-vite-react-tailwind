import React, { useCallback, useEffect, useMemo } from 'react';
import { TaskList } from './components/TaskList';
import { TASK_COLORS } from "./components/TaskList/types";
import type { Task } from "./components/TaskList/types";
import { useBalances } from "@/hooks/queries/useBalances";
import { TWITTER_BINDING_QUERY_KEY, useTwitterBinding } from "@/hooks/queries/useTwitterBinding";
import { useVoteLevel } from "@/hooks/queries/useVoteLevel";
import { useTwitterClaim } from "@/hooks/useTwitterClaim";
import { useVoteClaim } from "@/hooks/useVoteClaim";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";
import { getVoteTask } from "@/constants/voteTasks";
import { useQuery } from '@tanstack/react-query';
import { Args, RoochClient } from '@roochnetwork/rooch-sdk';
import { ROOCH_APP } from '@/constants/config';

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

export default function EarnView() {

  const { RgasBalance } = useBalances();
  const address = useCurrentAddress();
  const client = new RoochClient({ url: 'https://test-seed.rooch.network/' });

  // Twitter 相关状态
  const {
    data: twitterId,
    refetch: refetchTwitter,
  } = useQuery({
    queryKey: ["twitterBinding"],
    queryFn: async () => {
      const result = await client.executeViewFunction({
        address: ROOCH_APP,
        module: "twitter_account",
        function: "resolve_author_id_by_address",
        args: [Args.address(address!)],
        typeArgs: [],
      });
      console.log(result);
      return result.return_values?.[0]?.decoded_value || null;
    },
    enabled: !!address
  });

  const { claimTwitterReward } = useTwitterClaim();

  // 投票相关状态
  const {
    data: vote = 0,
    refetch: refetchVote
  } = useVoteLevel();
  const { claimVoteReward } = useVoteClaim();

  // 处理 Twitter 任务
  const handleTwitterAction = useCallback(async () => {
    try {
      if (!address) return;

      const twitterData = await refetchTwitter();

      if (twitterData?.data) {
        await claimTwitterReward();
        await refetchTwitter();
      } else {
        window.open("https://twitter.com/goldminer_game", "_blank");
      }
    } catch (error) {
      console.error('Twitter action failed:', error);
    }
  }, [address, claimTwitterReward, refetchTwitter]);

  // 处理投票任务
  const handleVoteAction = useCallback(async () => {
    try {
      if (!address) return;

      const voteData = await refetchVote();
      if (voteData?.data && Number(voteData.data) > 0) {
        await claimVoteReward(Number(voteData.data));
        await refetchVote();
      } else {
        window.open("https://grow.rooch.network/project/goldminer", "_blank");
      }
    } catch (error) {
      console.error('Vote action failed:', error);
    }
  }, [address, claimVoteReward, refetchVote]);

  // 创建任务列表
  const tasks = useMemo(() => {
    const currentVoteTask = getVoteTask(Number(vote) || 0);
    const voteLevel = currentVoteTask.level;

    

    return [
      createTask(
        "6",
        `Vote Level ${voteLevel} (${currentVoteTask.requiredVotes.toLocaleString()} votes)`,
        "/imgs/task_5.png",
        TASK_COLORS.pink,
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
        10000,
        !!twitterId,
        twitterId ? "Claim" : "Go",
        handleTwitterAction
      ),
    ];
  }, [
    address,
    vote,
    twitterId,
    handleVoteAction,
    handleTwitterAction
  ]);

  const completedTasks = useMemo(() =>
    tasks.filter(task => task.completed),
    [tasks]
  );

  const pendingTasks = useMemo(() => {
    const uncompletedTasks = tasks.filter(task => !task.completed);
    const needsRGas = parseFloat(RgasBalance) === 0;

    return needsRGas
      ? uncompletedTasks.sort((a, b) => (a.id === "3" ? -1 : b.id === "3" ? 1 : 0))
      : uncompletedTasks;
  }, [tasks, RgasBalance]);

  if (!address) {
    return <div>Please connect your wallet</div>;
  }

  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat pt-[60px] bg-cover"
      style={{ backgroundImage: "url('/imgs/earnBg.png')" }}
    >
      <img className="w-full" src="/imgs/earn_title.png" alt="Earn Title" />

      <div className="px-[10px] w-full pb-[85px]">
        <Header />

        {false ? (
          <div>Loading tasks...</div>
        ) : (
          <TasksSection
            pendingTasks={pendingTasks}
            completedTasks={completedTasks}
          />
        )}
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