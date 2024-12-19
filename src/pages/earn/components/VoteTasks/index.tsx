import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskItem } from '@/components/tasks';
import { TASK_COLORS } from '@/components/tasks/types';
import { useVoteSystem } from '@/hooks/useVoteSystem';

interface VoteTasksProps {
  onVoteAction: (level: number) => Promise<void>;
}

export const VoteTasks: React.FC<VoteTasksProps> = ({ onVoteAction }) => {
  const { t } = useTranslation();
  const { completedTasks, pendingTasks, isLoading } = useVoteSystem();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-xl" />
        ))}
      </div>
    );
  }

  const getButtonText = (task: any) => {
    if (!task.completed) return t('common.buttons.go');
    return task.claimed ? t('common.buttons.done') : t('earn.buttons.claim');
  };

  const createVoteTask = (task: any) => ({
    id: `vote_${task.level}`,
    title: t('earn.tasks.vote.title', {
      level: task.level,
      votes: task.requiredVotes.toLocaleString()
    }),
    description: t('earn.tasks.vote.description'),
    icon: "/imgs/task_1.png",
    iconBgColor: TASK_COLORS.green,
    reward: task.reward,
    completed: task.completed,
    buttonText: getButtonText(task),
    onAction: () => onVoteAction(task.level)
  });

  // Sort tasks by level
  const sortedCompletedTasks = [...completedTasks].sort((a, b) => a.level - b.level);
  const sortedPendingTasks = [...pendingTasks].sort((a, b) => a.level - b.level);

  // Get the next available task
  const nextTask = sortedPendingTasks[0];

  return (
    <div className="space-y-4">
      {/* Show completed tasks */}
      {sortedCompletedTasks.map(task => (
        <TaskItem
          key={`completed_${task.level}`}
          task={createVoteTask(task)}
        />
      ))}
      
      {/* Show only the next available task */}
      {nextTask && (
        <TaskItem
          key={`pending_${nextTask.level}`}
          task={createVoteTask(nextTask)}
        />
      )}
    </div>
  );
};