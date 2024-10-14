import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCreateJournalMutation,
  useGetJournalQuery,
  useGetJournalsQuery,
  useRemoveJournalMutation,
  useUpdateJournalMutation,
} from '@/graphql/generated';
import { categorizeJournals } from '@/utils/formatDate';
import { useFolderContext } from '@/folder/hooks/useFolderContext';
import { useJournalContext } from './useJournalContext';

const handleError = (error: unknown, message: string): void => {
  console.error(message, error);
};

export function useCreateJournal() {
  const { selectedFolderId } = useFolderContext();
  const { refetch } = useGetJournalsQuery();
  const [createJournal] = useCreateJournalMutation();
  const navigate = useNavigate();
  const [journalId, setJournalId] = useState<string | null>(null);

  const handleCreateNewJournal = async (): Promise<void> => {
    if (!selectedFolderId) {
      console.error('No folder selected');
      return;
    }

    try {
      const response = await createJournal({
        variables: {
          folderId: selectedFolderId,
          title: 'Untitled',
          content: 'What’s on my mind...',
        },
      });

      const newJournalId = response.data?.createJournal?.id;
      if (newJournalId) {
        setJournalId(newJournalId);
        refetch();
        navigate(`/journals/${newJournalId}`);
      }
    } catch (err) {
      console.error('Error creating journal:', err);
    }
  };

  return {
    journalId,
    handleCreateNewJournal,
  };
}

export function useUpdateJournal() {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useGetJournalQuery({
    variables: { id: id || '' },
  });

  const [updateJournal] = useUpdateJournalMutation();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [initialLoaded, setInitialLoaded] = useState<boolean>(false);

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (id && data?.getJournal) {
      setTitle(data.getJournal.title);
      setContent(data.getJournal.content ?? '');
      setInitialLoaded(true);
    } else if (!id) {
      setTitle('Untitled');
      setContent('');
      setInitialLoaded(true);
    }
  }, [id, data]);

  const saveJournal = useCallback(
    async (newTitle: string, newContent: string): Promise<void> => {
      if (!id || !initialLoaded) return;

      if (newTitle === title && newContent === content) {
        return;
      }

      setIsSaving(true);
      try {
        await updateJournal({
          variables: { id, title: newTitle, content: newContent },
        });
      } catch (err) {
        handleError(err, 'Error saving journal:');
      } finally {
        setIsSaving(false);
      }
    },
    [id, title, content, initialLoaded, updateJournal]
  );

  const debounceSaveJournal = useCallback(
    (newTitle: string, newContent: string) => {
      if (debounceTimer) clearTimeout(debounceTimer);

      const timer = setTimeout(() => {
        saveJournal(newTitle, newContent);
      }, 3000);

      setDebounceTimer(timer);
    },
    [debounceTimer, saveJournal]
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    debounceSaveJournal(newTitle, content);
  };

  const handleContentChange = (newContent: string): void => {
    setContent(newContent);
    debounceSaveJournal(title, newContent);
  };

  return {
    title,
    content,
    isSaving,
    handleTitleChange,
    handleContentChange,
    loading,
    error,
  };
}

export default function useGetJournals() {
  const { selectedFolderId } = useFolderContext();
  const { loading, error, data, refetch } = useGetJournalsQuery();
  const navigate = useNavigate();
  const { selectedId, setSelectedId } = useJournalContext();
  const [removeJournal] = useRemoveJournalMutation();

  const [prevJournalCount, setPrevJournalCount] = useState<number>(0);
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);

  useEffect(() => {
    const currentJournalCount =
      data?.getJournals?.filter((journal) => journal.folderId === selectedFolderId)?.length || 0;

    if (selectedFolderId && !selectedId) {
      setShouldNavigate(true);
    }

    if (currentJournalCount > prevJournalCount) setShouldNavigate(true);

    setPrevJournalCount(currentJournalCount);
  }, [data, prevJournalCount, selectedFolderId, selectedId]);

  useEffect(() => {
    if (!loading && shouldNavigate && data?.getJournals && data.getJournals.length > 0) {
      const filteredJournals = data.getJournals.filter((journal) => journal.folderId === selectedFolderId);
      const sortedJournals = [...filteredJournals].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      const firstJournal = sortedJournals[0];

      if (firstJournal && (!selectedId || selectedId === '')) {
        setSelectedId(firstJournal.id);
        navigate(`/journals/${firstJournal.id}`);
        setShouldNavigate(false);
      }
    }
  }, [loading, shouldNavigate, data, selectedId, navigate, selectedFolderId]);

  const handleDeleteJournal = async (): Promise<void> => {
    if (!selectedId) return;
    try {
      await removeJournal({ variables: { id: selectedId } });
      const { data: refetchedData } = await refetch();
      const journals = refetchedData?.getJournals.filter((journal) => journal.folderId === selectedFolderId) || [];
      const sortedJournals = [...journals].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      const nextJournal = sortedJournals[0];
      if (nextJournal) {
        setSelectedId(nextJournal.id);
        navigate(`/journals/${nextJournal.id}`);
      } else {
        setSelectedId(null);
        navigate('/journals');
      }
    } catch (err) {
      handleError(err, 'Error deleting journal:');
    }
  };

  const handleSelectJournal = (journalId: string): void => {
    setSelectedId(journalId);
    navigate(`/journals/${journalId}`);
  };

  const journals = data?.getJournals
    ? [...data.getJournals]
        .filter((journal) => journal.folderId === selectedFolderId)
        .sort((a, b) => {
          const updatedAtDiff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
          if (updatedAtDiff !== 0) return updatedAtDiff;

          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        })
    : [];

  const groupedJournals = categorizeJournals(journals);

  const filteredGroupedJournals = selectedFolderId
    ? Object.fromEntries(
        Object.entries(groupedJournals).filter(([_, journals]) =>
          journals.some((journal) => journal.folderId === selectedFolderId)
        )
      )
    : groupedJournals;

  return {
    journals,
    groupedJournals,
    filteredGroupedJournals,
    loading,
    error,
    selectedId,
    handleDeleteJournal,
    handleSelectJournal,
  };
}
