import React from "react";
import { Link } from "react-router-dom";
import useGetJournals from "../hooks/useJournal";
import { formatDateJournal } from "../utils/formatDate";
import { FaRegTrashCan } from "react-icons/fa6";
import { cn } from "@/components/lib/utils";

const JournalsList: React.FC = () => {
  const {
    loading,
    error,
    journals,
    groupedJournals,
    handleDeleteJournal,
    handleSelectJournal,
    selectedId,
  } = useGetJournals();

  if (loading) return <p>Loading journals...</p>;
  if (error) return <p>Error loading journals: {error.message}</p>;

  return (
    <div className="border-r border-[1px] w-[300px] h-[100vh] overflow-auto">
      <div className="flex border-b justify-between p-3">
        <p></p>
        <button
          className={cn(
            "pr-2",
            "text-[#7d7d7d]",
            "text-[19px]",
            !selectedId && "cursor-not-allowed opacity-50"
          )}
          onClick={handleDeleteJournal}
          disabled={!selectedId}
        >
          <FaRegTrashCan />
        </button>
      </div>
      {journals.length === 0 ? (
        <p className="text-center text-[15px] mt-[3rem] text-black text-opacity-65">
          No journals available
        </p>
      ) : (
        Object.entries(groupedJournals).map(([groupName, journals]) => (
          <div key={groupName}>
            <h2 className="text-[13px] border-b p-2 text-[#7d7d7d] text-opacity-100 font-semibold mt-3">
              {groupName}
            </h2>
            <ul>
              {journals.map((journal) => (
                <Link to={journal.id} className="block" key={journal.id}>
                  <li
                    className={cn(
                      "p-6",
                      "border-b",
                      selectedId === journal.id ? "bg-[#ececec]" : ""
                    )}
                    onClick={() => handleSelectJournal(journal.id)}
                  >
                    <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                      {journal.title}
                    </p>
                    <p className="text-[13px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {journal.content}
                    </p>
                    <p className="text-[13px] text-black text-opacity-65">
                      {formatDateJournal(journal.updatedAt)}
                    </p>
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
