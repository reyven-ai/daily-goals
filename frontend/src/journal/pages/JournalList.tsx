import React from 'react';
import { Link } from 'react-router-dom';
import useGetJournals from '../hooks/useJournal';
import { cn } from '@/components/lib/utils';
import { formatDateJournal } from '@/utils/formatDate';
import { stripHtmlTags } from '@/utils/stripHtmlTags';
import EditFolder from '@/folder/pages/EditFolder';
import { useJournalContext } from '../hooks/useJournalContext';

const JournalsList: React.FC = () => {
  const { loading, filteredGroupedJournals, handleSelectJournal } = useGetJournals();
  const { selectedId, setSelectedId } = useJournalContext();

  if (loading) return <p>Loading journals...</p>;

  return (
    <div className="border-r border-[1px] w-[300px] h-[100vh] overflow-auto">
      <EditFolder />
      {Object.keys(filteredGroupedJournals).length === 0 ? (
        <p className="text-center text-[15px] mt-[3rem] text-primary text-opacity-65">No journals yet</p>
      ) : (
        Object.entries(filteredGroupedJournals).map(([groupName, journals]) => (
          <div key={groupName}>
            <h2 className="text-[13px] border-b p-2 text-secondary text-opacity-100 font-semibold mt-3">{groupName}</h2>
            <ul>
              {journals.map((journal) => (
                <Link to={journal.id} className="block" key={journal.id}>
                  <li
                    className={cn('p-6', 'border-b', selectedId === journal.id ? 'bg-popover-foreground' : '')}
                    onClick={() => {
                      handleSelectJournal(journal.id);
                      setSelectedId(journal.id);
                    }}
                  >
                    <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">{journal.title}</p>
                    <p className="text-[13px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {stripHtmlTags(journal.content)}
                    </p>
                    <p className="text-[13px] text-secondary">{formatDateJournal(journal.updatedAt)}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default JournalsList;
