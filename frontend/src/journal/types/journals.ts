export interface Journals {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface JournalContextType {
  selectedId: string | null;
  setSelectedId: (id: string) => void;
}
