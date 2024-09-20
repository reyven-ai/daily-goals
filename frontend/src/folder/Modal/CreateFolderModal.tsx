import { FC } from 'react';
import { ModalProps } from '../types/modal';
import { AlertDialog, AlertDialogContent } from '@radix-ui/react-alert-dialog';

const FolderModal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-20"
        onClick={onClose}
      >
        <div className="bg-white rounded-lg shadow-md z-30" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FolderModal;
