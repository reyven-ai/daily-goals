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
      <div className="mt-2">
        <ul>
          {sortedFolders.map((folder) => (
            <li key={folder.id}>
              <Link
                to="/journals/"
                onClick={() => handleSelectFolder(folder.id, folder.title)}
                className={cn(
                  'w-[230px] py-2 px-4 my-1 flex justify-between items-center text-[14px] hover:bg-[#ececec] hover:text-[#000]',
                  selectedFolderId === folder.id ? 'bg-[#ececec] text-[#000]' : 'text-[#7d7d7d]'
                )}
              >
                <div className="flex gap-[16px] items-center">
                  <span className="text-[18px]">
                    <IoJournalOutline />
                  </span>
                  <span>{folder.title}</span>
                </div>
                <span className="text-sm text-gray-500">{folder.journals?.length || 0}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderList;
