import { FC } from 'react';
import ReactDOM from 'react-dom';
import { ModalProps } from '../types/modal';

const FolderModal: FC<ModalProps> = ({ onClose, children }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 bg-black bg-opacity-75"
          onClick={onClose}
        >
          <div className="bg-white rounded-lg shadow-md z-30" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>,
        document.getElementById('overlays') as Element
      )}
    </>
  );
};

export default FolderModal;
