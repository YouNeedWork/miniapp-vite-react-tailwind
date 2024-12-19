import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskItem } from '@/components/tasks';
import { TASK_COLORS } from '@/components/tasks/types';

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

  const task = {
    id: 'twitter',
    title: t('earn.tasks.twitter.title'),
    description: t('earn.tasks.twitter.description'),
    icon: '/imgs/task_3.png',
    iconBgColor: TASK_COLORS.blue,
    reward: needsRGas ? 3 : 1000,
    completed: isTwitterBound,
    onAction: onTwitterAction
  };

  return <TaskItem task={task} />;
};