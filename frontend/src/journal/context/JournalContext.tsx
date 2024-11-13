import { JournalContextType } from '@/journal/types/journals';
import { createContext, useMemo, useState } from 'react';

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const contextValue = useMemo(
    () => ({
      selectedId,
      setSelectedId,
    }),
    [selectedId, setSelectedId]
  );

  return <JournalContext.Provider value={contextValue}>{children}</JournalContext.Provider>;
};
