import { FC } from 'react';
import { ModalProps } from '../types/modal';
import { Dialog, DialogContent, DialogOverlay, DialogClose } from '@radix-ui/react-dialog';
import { MdClose } from 'react-icons/md';
import { Button } from '@/components/ui/button';

const FolderModal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black bg-opacity-75 z-20" />

      <DialogContent
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-30"
        onClick={onClose}
      >
        <div className="relative bg-white rounded-lg shadow-md" onClick={(e) => e.stopPropagation()}>
          <DialogClose asChild>
            <div className="border-b py-2.5 px-5 flex items-center justify-between">
              <h3>New Journal</h3>
              <Button
                className="bg-transparent text-primary py-2 px-3 text-[24px] hover:bg-secondary-foreground rounded-[4px]"
                aria-label="Close"
                onClick={onClose}
              >
                <MdClose />
              </Button>
            </div>
          </DialogClose>

          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FolderModal;
