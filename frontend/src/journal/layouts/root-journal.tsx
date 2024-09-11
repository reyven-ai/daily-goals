import React from 'react';
import { Outlet } from 'react-router-dom';
import JournalsList from '../pages/Journals';

import { useCreateJournal } from '../hooks/useJournal';
import { IoCreateOutline } from 'react-icons/io5';

export default function RootJournal() {
  const { handleCreateNewJournal } = useCreateJournal();
  return (
    <>
      <div className="flex">
        <div className="flex">
          <JournalsList />
        </div>
        <div className="flex flex-col">
          <div className="w-[1200px] flex border-b justify-between p-1.5">
            <button onClick={handleCreateNewJournal} className="pl-4 p-1 text-[#7d7d7d] text-[24px]">
              <IoCreateOutline strokeWidth={10} />
            </button>
          </div>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
