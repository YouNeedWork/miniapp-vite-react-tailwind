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


  console.log('isTwitterBound', isTwitterBound);
  console.log('isTwitterClaimed', isTwitterClaimed);

  const task = {
    id: 'twitter',
    title: t('earn.tasks.twitter.title'),
    description: t('earn.tasks.twitter.description'),
    icon: '/imgs/task_3.png',
    iconBgColor: TASK_COLORS.blue,
    reward: 10000,
    completed: isTwitterBound,
    buttonText: isTwitterBound ? isTwitterClaimed ? "" : t('earn.buttons.claim') : t("earn.buttons.go"),
    onAction: onTwitterAction
  };

  return <TaskItem task={task} />;
};