import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Task } from './types';

interface TaskItemProps {
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { t } = useTranslation();
  
  return (
    <div className="p-2.5 bg-[#fdeeba] rounded-[20px] border border-black flex items-center gap-2.5">
      <div className="h-[47px] flex items-start gap-[15px]">
        <div className="w-[47px] h-[47px] relative">
          <div className={cn(
            "w-[47px] h-[47px] absolute left-0 top-0 rounded-full shadow border border-black",
            task.iconBgColor
          )} />
          <img
            className="w-[34px] h-[34px] absolute left-[7px] top-[7px] rounded-[11px]"
            src={task.icon}
            alt={task.title}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-0.5">
        <div className="text-black text-base font-bold leading-tight">
          {task.title}
        </div>
        {task.description && (
          <div className="text-black text-[10px] leading-[13px]">
            {task.description}
          </div>
        )}
        <div className="flex items-center gap-[5px]">
          <img className="w-[19px] h-[19px]" src="/imgs/g_icon.png" alt="Gold" />
          <div className="text-center text-[#999de4] text-sm font-medium">
            +{task.reward}
          </div>
        </div>
      </div>

      <Button
        variant={task.completed ? "secondary" : "primary"}
        size="sm"
        rounded="full"
        className="px-[46px]"
        disabled={task.completed && !task.buttonText}
        onClick={task.onAction}
      >
        {task.buttonText || (task.completed ? t('common.buttons.done') : t('common.buttons.go'))}
      </Button>
    </div>
  );
};