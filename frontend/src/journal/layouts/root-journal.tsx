import { Outlet } from 'react-router-dom';
import JournalsList from '../pages/Journals';

import useGetJournals, { useCreateJournal } from '../hooks/useJournal';
import { IoCreateOutline } from 'react-icons/io5';
import { FaRegTrashCan } from 'react-icons/fa6';
import { cn } from '@/components/lib/utils';

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
          <div className=" px-4 flex items-center gap-[15px] justify-between w-[1200px] border-b">
            <div className="flex justify-between p-1.5">
              <button onClick={handleCreateNewJournal} className=" p-1 text-[#7d7d7d] text-[24px]">
                <IoCreateOutline strokeWidth={10} />
              </button>
            </div>
            <div className="pt-1.5">
              <button
                className={cn('pr-2', 'text-[#7d7d7d]', 'text-[19px]', !selectedId && 'cursor-not-allowed opacity-50')}
                onClick={handleDeleteJournal}
                disabled={!selectedId}
              >
                <FaRegTrashCan />
              </button>
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
