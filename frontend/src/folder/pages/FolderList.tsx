import React from 'react';
import { IoJournalOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { cn } from '@/components/lib/utils';
import useFolderActions from '../hooks/useFolder';

const FolderList: React.FC = () => {
  const { selectedFolderId, handleSelectFolder, sortedFolders, loading, error } = useFolderActions();

  if (loading) return <p>Loading folders...</p>;
  if (error) return <p>Error loading folders: {error.message}</p>;

  return (
    <div className="flex">
      <div className="mt-4 w-[230px]">
        <ul>
          {sortedFolders.map((folder) => (
            <li key={folder.id}>
              <Link
                to="/journals/"
                onClick={() => handleSelectFolder(folder.id, folder.title)}
                className={cn(
                  'py-2 px-2 my-1 flex justify-between items-center rounded-[6px] text-[14px] hover:bg-popover-foreground hover:text-primary',
                  selectedFolderId === folder.id ? 'bg-popover-foreground text-primary' : 'text-secondary'
                )}
              >
                <div className="flex gap-[16px] items-center">
                  <span className="text-[18px]">
                    <IoJournalOutline />
                  </span>
                  <span className="w-[130px] text-ellipsis overflow-hidden whitespace-nowrap">{folder.title}</span>
                </div>
                <span className="text-sm">{folder.journals?.length || 0}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderList;
