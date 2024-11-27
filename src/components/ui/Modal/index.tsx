import React from 'react';
import { Modal as AntModal } from 'antd';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { modalStyles } from './styles';

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  width = 360,
  className,
}) => {
  return (
    <AntModal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={width}
      className={cn('game-modal', className)}
      modalRender={(node) => (
        <div className={modalStyles.base}>
          <div className={modalStyles.header}>
            <h3 className={modalStyles.title}>{title}</h3>
            <button onClick={onClose} className={modalStyles.closeButton}>
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className={modalStyles.content}>
            {children}
          </div>
        </div>
      )}
    />
  );
};