import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';
import { VoteLevel } from '@/components/VoteLevel';
import { TaskList } from './components/TaskList';
import { Header } from './components/Header';
import { TASK_COLORS } from "./components/TaskList/types";
import { useBalances } from "@/hooks/queries/useBalances";
import { useTwitterBinding } from "@/hooks/queries/useTwitterBinding";
import { useVoteLevel } from "@/hooks/queries/useVoteLevel";
import { useTwitterClaim } from "@/hooks/useTwitterClaim";
import { useVoteClaim } from "@/hooks/useVoteClaim";
import { getVoteTask } from "@/constants/voteTasks";
import { useTaskCompletion } from '@/hooks/queries/useTaskCompletion';
import toast from "react-hot-toast";

const TWITTER_TASK_ID = 10001;

export default function EarnView() {
  const { t } = useTranslation();
  const { RgasBalance } = useBalances();
  const address = useCurrentAddress();
  const { data: twitterId, refetch: refetchTwitter } = useTwitterBinding();
  const { data: vote = 0, refetch: refetchVote } = useVoteLevel();
  const { claimTwitterReward } = useTwitterClaim();
  const { claimVoteReward } = useVoteClaim();
  const { data: twitterTaskClaimed = false } = useTaskCompletion(TWITTER_TASK_ID);

  if (!address) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium text-gray-600">{t('common.wallet.connect')}</p>
      </div>
    );
  }

  // Handle Twitter task
  const handleTwitterAction = useCallback(async () => {
    if (!address) {
      toast.error(t('common.wallet.connect'));
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
      toast.error(t('earn.tasks.twitter.error'));
    }
  }, [address, twitterId, claimTwitterReward, refetchTwitter, t]);

  // Handle vote task
  const handleVoteAction = useCallback(async () => {
    if (!address) {
      toast.error(t('common.wallet.connect'));
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
      toast.error(t('earn.tasks.vote.error'));
    }
  }, [address, vote, claimVoteReward, refetchVote, t]);

  // Create task list
  const tasks = React.useMemo(() => {
    if (!vote) return [];
    console.log("vote", vote);
    const currentVoteTask = getVoteTask(Number(vote ? vote.votes : 0));
    //console.log("currentVoteTask", currentVoteTask);
    const voteLevel = vote.level;
    const hasValidTwitterId = twitterId && typeof twitterId !== 'object';

    let tasks = [
      /*
      {
        id: "vote",
        title: t('earn.tasks.vote.title', {
          level: voteLevel,
          votes: currentVoteTask.requiredVotes.toLocaleString()
        }),
        description: t('earn.tasks.vote.description'),
        icon: "/imgs/task_1.png",
        iconBgColor: TASK_COLORS.green,
        reward: currentVoteTask.reward,
        completed: voteLevel > 0,
        buttonText: voteLevel > 0 ? t('earn.buttons.claim') : t('earn.buttons.go'),
        onAction: handleVoteAction
      },
      */
      {
        id: "twitter",
        title: t('earn.tasks.twitter.title'),
        description: t('earn.tasks.twitter.description'),
        icon: "/imgs/task_3.png",
        iconBgColor: TASK_COLORS.green,
        reward: 100000,
        completed: hasValidTwitterId,
        buttonText: hasValidTwitterId
          ? !twitterTaskClaimed
            ? t('earn.buttons.claim')
            : t('earn.buttons.done')
          : t('earn.buttons.go'),
        onAction: handleTwitterAction
      }
    ];

    for (let i = 0; i < voteLevel; i++) {
      tasks.push({
        id: `vote_${i + 1}`,
        title: t('earn.tasks.vote.title', {
          level: i + 1,
          votes: 100000000
        }),
        description: t('earn.tasks.vote.description'),
        icon: "/imgs/task_1.png",
        iconBgColor: TASK_COLORS.green,
        reward: 100000,
        completed: true,
        buttonText: t('earn.buttons.go'),
        onAction: handleVoteAction
      });
    }


    console.log("tasks", tasks);

    return tasks;
  }, [vote, twitterId, handleVoteAction, handleTwitterAction, twitterTaskClaimed, t]);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);


  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat pt-[60px] bg-cover"
      style={{ backgroundImage: "url('/imgs/earnBg.png')" }}
    >
      <img className="w-full" src="/imgs/earn_title.png" alt={t('earn.title')} />

      <div className="px-[10px] w-full pb-[85px]">
        <Header />

        <div className="mb-6">
          <VoteLevel />
        </div>

        <div className="space-y-6">
          {pendingTasks.length > 0 && (
            <TaskList
              title={t('earn.availableTasks.title')}
              description={t('earn.availableTasks.description')}
              tasks={pendingTasks}
            />
          )}

          {completedTasks.length > 0 && (
            <TaskList
              title={t('earn.completedTasks.title')}
              description={t('earn.completedTasks.description')}
              tasks={completedTasks}
            />
          )}
        </div>
      </div>
    </div>
  );
}