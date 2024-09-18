export interface FolderContextType {
  selectedFolderId: string | null;
  setSelectedFolderId: (folderId: string | null) => void;
  selectedFolderTitle: string | null;
  setSelectedFolderTitle: (folderTitle: string | null) => void;
}
