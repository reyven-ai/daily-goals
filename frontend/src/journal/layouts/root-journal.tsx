import { Outlet } from 'react-router-dom';
import JournalsList from '../pages/JournalList';

import useGetJournals, { useCreateJournal } from '../hooks/useJournal';
import { IoCreateOutline } from 'react-icons/io5';
import { FaRegTrashCan } from 'react-icons/fa6';
import { cn } from '@/components/lib/utils';
import { Button } from '@/components/ui/button';

export default function RootJournal() {
  const { handleCreateNewJournal } = useCreateJournal();
  const { handleDeleteJournal, selectedId } = useGetJournals();

  return (
    <>
      <div className="flex">
        <div className="flex">
          <JournalsList />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-[15px] justify-between w-[1200px] border-b">
            <div className="flex justify-between p-1.5">
              <Button onClick={handleCreateNewJournal} variant="icon">
                <IoCreateOutline strokeWidth={10} />
              </Button>
            </div>
            <div className="pt-1.5">
              <Button
                className={cn(
                  'text-secondary',
                  'bg-transparent hover:bg-secondary-foreground mx-2 py-0.5 px-4',
                  'text-[19px]',
                  !selectedId && 'cursor-not-allowed opacity-50'
                )}
                onClick={handleDeleteJournal}
                disabled={!selectedId}
              >
                <FaRegTrashCan />
              </Button>
            </div>
          </div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
