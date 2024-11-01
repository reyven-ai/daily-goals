export interface Filter {
  isActive: boolean;
  onClick: () => void;
}

export enum FilterType {
  Search = 'search',
  Newest = 'newest',
  Oldest = 'oldest',
  Folder = 'folder',
  Date = 'date',
}

export interface FilterJournal {
  journals: any[];
  folders: any[];
  setIsModalOpen: (open: boolean) => void;
}
