import { useContext } from 'react';
import { FolderContext } from '../context/FolderContext';
import { FolderContextType } from '../types/folderContext';

export const useFolderContext = (): FolderContextType => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error('useFolderContext must be used within a FolderProvider');
  }
  return context;
};
