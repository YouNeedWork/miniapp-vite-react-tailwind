import React from 'react';
import { useTranslation } from 'react-i18next';
import { TaskList } from '@/components/tasks';
import { VoteTasks } from './VoteTasks';
import { TwitterTask } from './TwitterTask';
import type { EarnState } from '../types';

interface EarnTasksProps {
  state: EarnState;
}

export const EarnTasks: React.FC<EarnTasksProps> = ({ state }) => {
  const { t } = useTranslation();

  return (
    <div className="px-4 space-y-6">
      <TaskList
        title={t('earn.availableTasks.title')}
        description={t('earn.availableTasks.description')}
      >
        <VoteTasks onVoteAction={state.handleVoteAction} />
        <TwitterTask
          isTwitterBound={state.isTwitterBound}
          onTwitterAction={state.handleTwitterAction}
          needsRGas={state.needsRGas}
        />
      </TaskList>
    </div>
  );
};