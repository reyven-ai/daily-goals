import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateJournalMutation,
  useGetJournalQuery,
  useGetJournalsQuery,
  useRemoveJournalMutation,
  useUpdateJournalMutation,
} from "@/graphql/generated";
import { categorizeJournals } from "../utils/formatDate";

const handleError = (error: unknown, message: string): void => {
  console.error(message, error);
};

export function useCreateJournal() {
  const { refetch } = useGetJournalsQuery();
  const [createJournal] = useCreateJournalMutation();
  const navigate = useNavigate();

  const [journalId, setJournalId] = useState<string | null>(null);

  const handleCreateNewJournal = async (): Promise<void> => {
    try {
      const response = await createJournal({
        variables: { title: "Untitled", content: "What’s on my mind" },
      });

      const newJournalId = response.data?.createJournal?.id;
      if (newJournalId) {
        setJournalId(newJournalId);
        refetch();
        navigate(`/journals/${newJournalId}`);
      }
    } catch (err) {
      handleError(err, "Error creating journal:");
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
    variables: { id: id || "" },
  });

  const [updateJournal] = useUpdateJournalMutation();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    if (data?.getJournal) {
      setTitle(data.getJournal.title);
      setContent(data.getJournal.content ?? "");
    }
  }, [data]);

  const saveJournal = useCallback(
    async (newTitle: string, newContent: string): Promise<void> => {
      if (!id) return;
      setIsSaving(true);
      try {
        await updateJournal({
          variables: { id, title: newTitle, content: newContent },
        });
      } catch (err) {
        handleError(err, "Error saving journal:");
      } finally {
        setIsSaving(false);
      }
    },
    [id, updateJournal]
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

  const handleContentChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const newContent = e.target.value;
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
  const { loading, error, data, refetch } = useGetJournalsQuery();
  const { id: selectedIdFromParams } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(
    selectedIdFromParams || null
  );
  const [removeJournal] = useRemoveJournalMutation();

  const [prevJournalCount, setPrevJournalCount] = useState<number>(0);
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(false);

  useEffect(() => {
    const currentJournalCount = data?.getJournals?.length || 0;
    if (currentJournalCount > prevJournalCount) setShouldNavigate(true);
    setPrevJournalCount(currentJournalCount);
  }, [data, prevJournalCount]);

  useEffect(() => {
    if (shouldNavigate && data?.getJournals && data.getJournals.length > 0) {
      const sortedJournals = [...data.getJournals].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      const newestJournal = sortedJournals[0];
      if (newestJournal && newestJournal.id !== selectedId) {
        setSelectedId(newestJournal.id);
        navigate(`/journals/${newestJournal.id}`);
        setShouldNavigate(false);
      }
    }
  }, [shouldNavigate, data, selectedId, navigate]);

  const handleDeleteJournal = async (): Promise<void> => {
    if (!selectedId) return;
    try {
      await removeJournal({ variables: { id: selectedId } });
      const { data: refetchedData } = await refetch();
      const journals = refetchedData?.getJournals || [];
      const sortedJournals = [...journals].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      const nextJournal = sortedJournals[0];
      if (nextJournal) {
        setSelectedId(nextJournal.id);
        navigate(`/journals/${nextJournal.id}`);
      } else {
        setSelectedId(null);
        navigate("/journals");
      }
    } catch (err) {
      handleError(err, "Error deleting journal:");
    }
  };

  const handleSelectJournal = (journalId: string): void => {
    setSelectedId(journalId);
    navigate(`/journals/${journalId}`);
  };

  const journals = data?.getJournals
    ? [...data.getJournals].sort((a, b) => {
        const updatedAtDiff =
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (updatedAtDiff !== 0) return updatedAtDiff;

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
    : [];

  const groupedJournals = categorizeJournals(journals);

  return {
    journals,
    groupedJournals,
    loading,
    error,
    selectedId,
    handleDeleteJournal,
    handleSelectJournal,
  };
}
