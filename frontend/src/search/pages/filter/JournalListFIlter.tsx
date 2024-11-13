import { cn } from '@/components/lib/utils';
import { Button } from '@/components/ui/button';
import useFolderActions from '@/folder/hooks/useFolder';
import { categorizeJournals } from '@/utils/formatDate';
import { IoIosArrowDown } from 'react-icons/io';
import { FilterJournalList } from './SearchResult';

export function JournalListFilter({
  isActive,
  onClick,
  setIsModalOpen,
  label,
  icon,
  categoryOrder,
  emptyMessage,
  positionLeft = '-500px',
  customWidth = '665px',
}) {
  const { sortedFolders, loading, error } = useFolderActions();

  return (
    <div className="relative">
      <Button
        onClick={onClick}
        className={cn(
          'flex items-center gap-[6px] text-[12px] bg-transparent border text-primary font-normal py-1.5 px-3 rounded-[22px] h-auto hover:bg-primary hover:text-[#fff]',
          isActive ? 'bg-primary text-[#fff]' : ''
        )}
      >
        <span className="text-[19px] font-bold">{icon}</span>
        {label}
        <span className="text-[13px] ml-[2px] mt-[3px]">
          <IoIosArrowDown />
        </span>
      </Button>

      {loading ? (
        <p>Loading folders...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div
          className="absolute mt-3 text-ellipsis overflow-hidden whitespace-nowrap"
          style={{ left: positionLeft, width: customWidth }}
        >
          {isActive && (
            <>
              {sortedFolders.map((folder) => {
                const categorizedJournals = categorizeJournals(folder.journals || []);

                if (categoryOrder.includes('All')) {
                  const allJournals = folder.journals || [];
                  if (allJournals.length === 0) return null;

                  return (
                    <div key={folder.id} className="mb-4">
                      <span className="text-sm mb-4 font-bold text-primary">{folder.title}</span>
                      <FilterJournalList
                        journals={allJournals}
                        folders={sortedFolders}
                        setIsModalOpen={setIsModalOpen}
                      />
                    </div>
                  );
                }

                const hasJournals = categoryOrder.some((category) => categorizedJournals[category]?.length > 0);
                if (!hasJournals) return null;

                return (
                  <div key={folder.id} className="mb-4">
                    <span className="text-sm mb-4 font-bold text-primary">{folder.title}</span>
                    {categoryOrder.map((category) => {
                      const journalsInCategory = categorizedJournals[category] || [];

                      if (journalsInCategory.length === 0) return null;

                      return (
                        <div key={category}>
                          <h3 className="text-[13px] font-medium pt-2 text-gray-500">{category}</h3>
                          <FilterJournalList
                            journals={journalsInCategory}
                            folders={sortedFolders}
                            setIsModalOpen={setIsModalOpen}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {sortedFolders.every((folder) => {
                const categorizedJournals = categorizeJournals(folder.journals || []);
                return categoryOrder.every((category) => categorizedJournals[category]?.length === 0);
              }) && <p className="text-primary mt-3 text-sm text-center">{emptyMessage}</p>}
            </>
          )}
        </div>
      )}
    </div>
  );
}
