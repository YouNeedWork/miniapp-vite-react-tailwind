export interface Task {
  id: string;
  title: string;
  description?: string;
  icon: string;
  iconBgColor: string;
  reward: number;
  completed: boolean;
  buttonText?: string;
  onAction: () => void;
}

export const TASK_COLORS = {
  blue: 'bg-[#afe1fa]',
  red: 'bg-[#db433e]',
  green: 'bg-[#90ba57]',
  yellow: 'bg-[#edad4b]',
  pink: 'bg-[#e1a8d9]',
} as const;