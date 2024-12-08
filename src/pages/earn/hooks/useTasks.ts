import { useState, useCallback } from "react";
import { TASK_COLORS } from "../components/TaskList/types";
import type { Task } from "../components/TaskList/types";
import { useBalances } from "@/hooks/queries/useBalances";
import { API_BASE_URL } from "@/constants/config";
import { useCurrentAddress } from "@roochnetwork/rooch-sdk-kit";

export const useTasks = () => {
  const { RgasBalance } = useBalances();
  const address = useCurrentAddress();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "6",
      title: "Vote Goldminer",
      icon: "/imgs/task_5.png",
      iconBgColor: TASK_COLORS.pink,
      reward: 10000,
      completed: false,
      onAction: () => {
        window.open("https://grow.rooch.network/project/goldminer", "_blank");
      },
    },
    {
      id: "7",
      title: "Bind Twitter Account",
      icon: "/imgs/task_3.png",
      iconBgColor: TASK_COLORS.green,
      reward: 10000,
      completed: false,
      onAction: () => {
        // TODO: Implement vote task
        window.open("https://grow.rooch.network/project/goldminer", "_blank");
      },
    },
  ]);

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  // Check if user needs RGas
  const needsRGas = parseFloat(RgasBalance) === 0;

  // If user needs RGas and Twitter task isn't completed, show it first
  const sortedPendingTasks = needsRGas
    ? pendingTasks.sort((a, b) => (a.id === "3" ? -1 : b.id === "3" ? 1 : 0))
    : pendingTasks;

  return {
    completedTasks,
    pendingTasks: sortedPendingTasks,
  };
};
