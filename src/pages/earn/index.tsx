import React from 'react';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';

export default function EarnView() {
  const { completedTasks, pendingTasks } = useTasks();

  return (
    <div
      className="w-screen min-h-screen bg-center bg-no-repeat pt-[60px] bg-cover"
      style={{ backgroundImage: "url('/imgs/earnBg.png')" }}
    >
      <img className="w-full" src="/imgs/earn_title.png" alt="Earn Title" />
      
      <div className="px-[10px] w-full pb-[85px]">
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
      </div>
    </div>
  );
}