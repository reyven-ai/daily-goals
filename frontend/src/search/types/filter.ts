export interface Filter {
  isActive: boolean;
  onClick: () => void;
}

export interface FilterJournal {
  journals: any[];
  folders: any[];
  setIsModalOpen: (open: boolean) => void;
}
