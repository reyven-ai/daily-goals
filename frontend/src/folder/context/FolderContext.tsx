import React, { createContext, useState, ReactNode, useMemo } from 'react';
import { FolderContextType } from '../types/folderContext';

export const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [selectedFolderTitle, setSelectedFolderTitle] = useState<string | null>(null);

  const contextValue = useMemo(
    () => ({
      selectedFolderId,
      setSelectedFolderId,
      selectedFolderTitle,
      setSelectedFolderTitle,
    }),
    [selectedFolderId, setSelectedFolderId, selectedFolderTitle, setSelectedFolderTitle]
  );

  return <FolderContext.Provider value={contextValue}>{children}</FolderContext.Provider>;
};
