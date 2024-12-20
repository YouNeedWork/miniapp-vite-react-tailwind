import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskItem } from '@/components/tasks';
import { TASK_COLORS } from '@/components/tasks/types';
import { useTaskCompletion } from '@/hooks/queries/useTaskCompletion';

interface TwitterTaskProps {
  isTwitterBound: boolean;
  onTwitterAction: () => Promise<void>;
  needsRGas: boolean;
}

export const TwitterTask: React.FC<TwitterTaskProps> = ({
  isTwitterBound,
  onTwitterAction,
  needsRGas
}) => {
  const { t } = useTranslation();
  const { data: isTwitterClaimed } = useTaskCompletion(10001);

  const task = {
    id: 'twitter',
    title: t('earn.tasks.twitter.title'),
    description: t('earn.tasks.twitter.description'),
    icon: '/imgs/task_3.png',
    iconBgColor: TASK_COLORS.blue,
    reward: 10000,
    completed: isTwitterBound,
    buttonText: isTwitterClaimed ? "" : t('common.buttons.claim'),
    onAction: onTwitterAction
  };

  return <TaskItem task={task} />;
};