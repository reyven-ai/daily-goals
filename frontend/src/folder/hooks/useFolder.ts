import {
  useCreateFolderMutation,
  useGetFoldersQuery,
  useRemoveFolderMutation,
  useUpdateFolderMutation,
} from '@/graphql/generated';
import { useEffect, useState, useRef, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError } from '@/utils/errorHandler';
import { useInputFocus } from '@/utils/inputFocus';
import { useFolderContext } from './useFolderContext';

const useFolderActions = () => {
  const { selectedFolderId, setSelectedFolderId, setSelectedFolderTitle, selectedFolderTitle } = useFolderContext();
  const { inputRef, focusInput } = useInputFocus();
  const { error, data, refetch } = useGetFoldersQuery();
  const [createFolder] = useCreateFolderMutation();
  const [updateFolder] = useUpdateFolderMutation();
  const [deleteFolder] = useRemoveFolderMutation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [newTitle, setNewTitle] = useState(selectedFolderTitle || '');

  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      focusInput();
    }
  }, [isModalOpen, focusInput]);

  useEffect(() => {
    if (!selectedFolderId && data?.getFolders?.length) {
      const newestFolder = getSortedFolders(data.getFolders)[0];
      if (newestFolder) {
        selectFolder(newestFolder.id, newestFolder.title);
        navigate('/journals');
      }
    }
  }, [data, selectedFolderId, navigate]);

  useEffect(() => {
    setNewTitle(selectedFolderTitle || '');
  }, [selectedFolderTitle]);

  useEffect(() => {
    if (isEditing) focusInput();
  }, [isEditing, focusInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getSortedFolders = (folders: any[]) =>
    [...folders].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  const selectFolder = (id: string, title: string) => {
    setSelectedFolderId(id);
    setSelectedFolderTitle(title);
  };

  const handleCreateNewFolder = async (folderName: string) => {
    setLoading(true);
    try {
      const response = await createFolder({ variables: { title: folderName } });
      const newFolder = response.data?.createFolder;

      if (newFolder) {
        selectFolder(newFolder.id, newFolder.title);
        await refetch();
        navigate(`/journals/`);
      }
    } catch (err) {
      handleError(err, 'Error creating folder:');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFolder = async (folderId: string, title: string) => {
    try {
      await updateFolder({ variables: { id: folderId, title } });
      refetch();
    } catch (err) {
      handleError(err, 'Error updating folder title:');
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder({ variables: { id: folderId } });

      const { data: refetchedData } = await refetch();
      const sortedFolders = refetchedData?.getFolders || [];

      const currentFolderIndex = sortedFolders.findIndex((folder) => folder.id === folderId);

      let nextFolder = null;
      if (currentFolderIndex !== -1) {
        nextFolder = sortedFolders[currentFolderIndex + 1] || sortedFolders[currentFolderIndex - 1];
      }

      if (nextFolder) {
        setSelectedFolderId(nextFolder.id);
        navigate(`/journals/${nextFolder.id}`);
      } else {
        setSelectedFolderId(null);
        navigate('/journals');
      }
    } catch (err) {
      handleError(err, 'Error deleting folder:');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (folderName.trim()) {
      await handleCreateNewFolder(folderName);
      setFolderName('');
      setIsModalOpen(false);
    } else {
      alert("Folder name can't be empty");
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    openModal();
    focusInput();
  };

  return {
    loading,
    error,
    newTitle,
    setNewTitle,
    isEditing,
    showOptions,
    inputRef,
    optionsRef,
    isModalOpen,
    folderName,
    sortedFolders: getSortedFolders(data?.getFolders || []),
    selectedFolderId,
    selectedFolderTitle,
    openModal: () => setIsModalOpen(true),
    closeModal: () => setIsModalOpen(false),
    toggleOptions: () => setShowOptions((prev) => !prev),
    handleCreateNewFolder,
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value),
    handleSubmit,
    handleUpdateFolder,
    handleDeleteFolder,
    handleSelectFolder: selectFolder,
    handleEditClick: () => setIsEditing(true),
    handleSaveClick: () => {
      if (selectedFolderId && newTitle.trim()) {
        handleUpdateFolder(selectedFolderId, newTitle.trim());
        setSelectedFolderTitle(newTitle.trim());
        setIsEditing(false);
        setShowOptions(false);
      }
    },
    handleCancelClick: () => {
      setNewTitle(selectedFolderTitle || '');
      setIsEditing(false);
      setShowOptions(false);
    },
    handleDeleteClick: () => {
      if (selectedFolderId && window.confirm('Are you sure you want to delete this folder?')) {
        handleDeleteFolder(selectedFolderId);
        setShowOptions(false);
      }
    },
    handleClick,
  };
};

export default useFolderActions;
