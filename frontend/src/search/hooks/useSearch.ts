import { useState, useEffect } from 'react';
import { useSearchFoldersQuery, useSearchJournalsQuery } from '@/graphql/generated';
import { FilterType } from '../types/filter';

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [, setIsSearching] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);

  const {
    data: folderData,
    loading: folderLoading,
    error: folderError,
  } = useSearchFoldersQuery({
    variables: { searchQuery },
    skip: !searchQuery,
  });

  const {
    data: journalData,
    loading: journalLoading,
    error: journalError,
  } = useSearchJournalsQuery({
    variables: { searchQuery },
    skip: !searchQuery,
  });

  const isLoading = folderLoading || journalLoading;
  const error = folderError || journalError;

  useEffect(() => {
    if (inputValue) {
      const debounceSearch = setTimeout(() => {
        setSearchQuery(inputValue);
        setIsSearching(true);
      }, 500);

      return () => clearTimeout(debounceSearch);
    }
  }, [inputValue]);

  const folderResults = folderData?.searchFolders || [];
  const journalResults = journalData?.searchJournals || [];

  const combinedResults = folderResults.map((folder) => {
    const matchingJournals = journalResults.filter((journal) => journal.folderId === folder.id);
    return {
      ...folder,
      type: 'folder',
      journals: matchingJournals,
    };
  });

  const individualJournals = journalResults.map((journal) => ({
    ...journal,
    type: 'journal',
  }));

  const finalCombinedResults = [
    ...combinedResults.filter(
      (folder) => folder.journals.length > 0 || folder.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    ...individualJournals,
  ];

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
    setSearchQuery('');
    setInputValue('');
    setIsSearching(false);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (activeFilter) {
      setActiveFilter(null);
    }

    setSearchQuery(inputValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const folders = combinedResults.filter((item) => item.type === 'folder');
  const journals = combinedResults.filter((item) => item.type === 'journal');

  return {
    folders,
    journals,
    searchQuery,
    setSearchQuery,
    combinedResults: finalCombinedResults,
    isLoading,
    error,
    handleFilterClick,
    onSubmit,
    handleInputChange,
    setIsModalOpen,
    isModalOpen,
    activeFilter,
    setActiveFilter,
    inputValue,
  };
};

export default useSearch;
