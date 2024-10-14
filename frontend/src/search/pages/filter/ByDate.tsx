import * as React from 'react';
import { format } from 'date-fns';
import { cn } from '@/components/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { FilterJournalList } from './SearchResult';
import { useFilter } from '@/search/hooks/useFilter';
import { Filter } from '@/search/types/filter';

export function ByDate({ isActive, onClick, setIsModalOpen }: Filter & { setIsModalOpen: (open: boolean) => void }) {
  const { date, setDate, sortedFolders, loading, error, filteredJournalsByFolder } = useFilter({
    isActive,
    setIsModalOpen,
  });

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            onClick={onClick}
            variant={'outline'}
            className={cn(
              'flex items-center text-[12px] bg-transparent border text-primary font-normal py-1.5 px-3 rounded-[22px] h-auto hover:bg-primary hover:text-[#fff]',
              isActive ? 'bg-primary text-white' : ''
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 text-primary">
          <Calendar
            className="text-primary"
            mode="single"
            selected={date ?? undefined}
            onSelect={(day: Date | undefined) => setDate(day ?? null)} // Handl
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div className="absolute mt-3 left-[-150px] w-[650px] text-ellipsis overflow-hidden whitespace-nowrap">
        {loading ? (
          <p>Loading journals...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : isActive && date ? (
          Object.keys(filteredJournalsByFolder).length > 0 ? (
            <>
              {sortedFolders.map((folder) => {
                const folderJournals = filteredJournalsByFolder[folder.id];

                if (!folderJournals || folderJournals.length === 0) {
                  return null;
                }

                return (
                  <div className="m-auto" key={folder.id}>
                    <span className="text-sm font-bold text-primary pl-2">{folder.title}</span>

                    <FilterJournalList
                      journals={folderJournals}
                      folders={sortedFolders}
                      setIsModalOpen={setIsModalOpen}
                    />
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-primary mt-3 text-sm text-center">No journals found for the selected date.</p>
          )
        ) : null}
      </div>
    </div>
  );
}
