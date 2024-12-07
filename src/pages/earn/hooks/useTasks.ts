import { useState, useCallback } from 'react';
import { TASK_COLORS } from '../components/TaskList/types';
import type { Task } from '../components/TaskList/types';
import { useBalances } from '@/hooks/queries/useBalances';
import { API_BASE_URL } from '@/constants/config';
import { useCurrentAddress } from '@roochnetwork/rooch-sdk-kit';

export const useTasks = () => {
  const { RgasBalance } = useBalances();
  const address = useCurrentAddress();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Choose your Region',
      icon: '/imgs/task_1.png',
      iconBgColor: TASK_COLORS.blue,
      reward: 1000,
      completed: false,
      onAction: () => {/* TODO: Implement region selection */}
    },
    {
      id: '2',
      title: 'Community',
      description: 'Join our TG channel',
      icon: '/imgs/task_2.png',
      iconBgColor: TASK_COLORS.red,
      reward: 1000,
      completed: true,
      onAction: () => {/* TODO: Implement TG join */}
    },
    {
      id: '3',
      title: 'Retweet',
      description: 'Follow @goldminer On X',
      icon: '/imgs/task_3.png',
      iconBgColor: TASK_COLORS.green,
      reward: 3000,
      completed: false,
      onAction: async () => {
        if (!address) return;
        
        try {
          // First, get the Twitter auth URL
          const response = await fetch(`${API_BASE_URL}/auth/twitter/url?address=${address.toStr()}`);
          const { url } = await response.json();
          
          // Open Twitter auth in a new window
          window.open(url, '_blank');
          
          // Poll for completion
          const checkInterval = setInterval(async () => {
            try {
              const statusResponse = await fetch(`${API_BASE_URL}/tasks/twitter/status?address=${address.toStr()}`);
              const { completed } = await statusResponse.json();
              
              if (completed) {
                clearInterval(checkInterval);
                // Update task status
                setTasks(prev => prev.map(task => 
                  task.id === '3' ? { ...task, completed: true } : task
                ));
                
                // Claim RGas reward
                await fetch(`${API_BASE_URL}/tasks/twitter/claim`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
                  },
                  body: JSON.stringify({ address: address.toStr() })
                });
              }
            } catch (error) {
              console.error('Error checking Twitter task status:', error);
              clearInterval(checkInterval);
            }
          }, 5000); // Check every 5 seconds
          
          // Clear interval after 5 minutes
          setTimeout(() => clearInterval(checkInterval), 300000);
        } catch (error) {
          console.error('Error starting Twitter task:', error);
        }
      }
    },
    {
      id: '4',
      title: 'Referral',
      description: 'Invite 3 friends',
      icon: '/imgs/task_4.png',
      iconBgColor: TASK_COLORS.yellow,
      reward: 5000,
      completed: false,
      onAction: () => {/* TODO: Implement referral */}
    },
    {
      id: '5',
      title: 'Goldminer Youtube',
      icon: '/imgs/task_5.png',
      iconBgColor: TASK_COLORS.pink,
      reward: 10000,
      completed: false,
      onAction: () => {/* TODO: Implement YouTube task */}
    }
  ]);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  // Check if user needs RGas
  const needsRGas = parseFloat(RgasBalance) === 0;

  // If user needs RGas and Twitter task isn't completed, show it first
  const sortedPendingTasks = needsRGas 
    ? pendingTasks.sort((a, b) => (a.id === '3' ? -1 : b.id === '3' ? 1 : 0))
    : pendingTasks;

  return {
    completedTasks,
    pendingTasks: sortedPendingTasks
  };
};