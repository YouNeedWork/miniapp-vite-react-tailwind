import toast from 'react-hot-toast';

export const copyToClipboard = async (text: string, successMessage?: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    if (successMessage) {
      toast.success(successMessage);
    }
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    toast.error('Failed to copy to clipboard');
    return false;
  }
};