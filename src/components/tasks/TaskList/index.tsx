import React from 'react';
import type { Task } from '../types';

interface TaskListProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const TaskList: React.FC<TaskListProps> = ({ 
  title, 
  description, 
  children 
}) => {
  return (
    <div className="w-full px-[20px] min-h-[200px] p-2.5 bg-white rounded-[20px] shadow border border-black">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-black">{title}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      
      <div className="space-y-2.5">
        {children}
      </div>
    </div>
  );
};