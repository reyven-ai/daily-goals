import { cn } from '@/components/lib/utils';
import { useFilter } from '@/search/hooks/useFilter';
import { FilterJournal } from '@/search/types/filter';
import { formatDateJournal } from '@/utils/formatDate';
import { stripHtmlTags } from '@/utils/stripHtmlTags';
import { CgNotes } from 'react-icons/cg';

export function FilterJournalList({ journals, folders, setIsModalOpen }: FilterJournal) {
  const { handleJournalClick, selectedId } = useFilter({
    journals,
    folders,
    setIsModalOpen,
  });

  return (
    <ul className="mb-4 mt-2">
      {journals.map((journal) => (
        <li key={journal.id}>
          <div
            onClick={() => handleJournalClick(journal)}
            className={cn(
              'px-2 flex justify-between items-center rounded-[6px] text-[14px] cursor-pointer',
              selectedId === journal.id ? 'bg-popover-foreground text-primary' : '',
              'hover:bg-popover-foreground hover:text-primary'
            )}
          >
            <div className="flex flex-col border-b pt-2 w-[650px]">
              <span className="flex items-center gap-[7px] text-[16px] font-semibold text-secondary">
                <CgNotes />
                {journal.title}
              </span>
              <span className="text-secondary pl-6 text-ellipsis overflow-hidden whitespace-nowrap">
                {stripHtmlTags(journal.content)}
              </span>
              <div className="flex gap-[5px]">
                <span className="text-[12px] font-semibold pl-6 pt-1 pb-2">{formatDateJournal(journal.updatedAt)}</span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
