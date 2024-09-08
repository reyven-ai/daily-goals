import React from "react";
import { Outlet } from "react-router-dom";
import JournalsList from "../pages/Journals";

import create from "../../assets/create.svg";
import { useCreateJournal } from "../hooks/useJournal";

export default function RootJournal() {
  const { handleCreateNewJournal } = useCreateJournal();
  return (
    <>
      <div className="flex">
        <div className="flex">
          <JournalsList />
        </div>
        <div className="flex flex-col">
          <div className="w-[1200px] flex border-b justify-between p-2">
            <button onClick={handleCreateNewJournal} className="pl-2">
              <img src={create} alt="Create New Journal" />
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
