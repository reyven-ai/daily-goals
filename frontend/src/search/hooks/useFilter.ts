import { useCallback, useEffect, useState } from 'react';
import useFolderActions from '@/folder/hooks/useFolder';
import { useNavigate } from 'react-router-dom';
import { useJournalContext } from '@/journal/hooks/useJournalContext';
import { isSameDay } from 'date-fns';
import { FilterJournal } from '../types/filter';

export function useFilter({ isActive, journals, folders, setIsModalOpen }: FilterJournal & { isActive: boolean }) {
  const { handleSelectFolder, sortedFolders, loading, error } = useFolderActions();
  const [date, setDate] = useState<Date | null>(null);
  const [filteredJournalsByFolder, setFilteredJournalsByFolder] = useState({});
  const { selectedId, setSelectedId } = useJournalContext();
  const [isFolderListVisible, setIsFolderListVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isActive) {
      setDate(null);
      setFilteredJournalsByFolder({});
    }
  }, [isActive]);

  useEffect(() => {
    if (date) {
      filterJournalsByDate(date);
    }
  }, [date, sortedFolders]);

  const filterJournalsByDate = useCallback(
    (selectedDate: Date | null) => {
      if (!selectedDate) return;

      const journalsByFolder = {};
      sortedFolders.forEach((folder) => {
        const filteredJournalsInFolder = folder.journals?.filter((journal) =>
          isSameDay(new Date(journal.updatedAt), selectedDate)
        );
        if (filteredJournalsInFolder && filteredJournalsInFolder.length > 0) {
          journalsByFolder[folder.id] = filteredJournalsInFolder;
        }
      });

      if (JSON.stringify(journalsByFolder) !== JSON.stringify(filteredJournalsByFolder)) {
        setFilteredJournalsByFolder(journalsByFolder);
      }
    },
    [sortedFolders, filteredJournalsByFolder]
  );

  const handleJournalClick = useCallback(
    (journal) => {
      const folder = folders.find((folder) => folder.id === journal.folderId);
      if (folder) {
        handleSelectFolder(folder.id, folder.title);
      }
      setIsModalOpen(false);
      setSelectedId(journal.id);
      navigate(`/journals/${journal.id}`);
    },
    [folders, handleSelectFolder, setIsModalOpen, setSelectedId, navigate]
  );

  const toggleFolderList = useCallback(() => {
    setIsFolderListVisible((prev) => !prev);
  }, []);

  return {
    handleJournalClick,
    selectedId,
    setSelectedId,
    journals,
    toggleFolderList,
    isFolderListVisible,
    filteredJournalsByFolder,
    date,
    setDate,
    sortedFolders,
    loading,
    error,
  };
}
