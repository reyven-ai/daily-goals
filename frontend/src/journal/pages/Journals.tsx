import React from "react";
import { Link } from "react-router-dom";
import remove from "../../assets/trash.svg";
import useGetJournals from "../hooks/useJournal";
import { formatDate } from "../utils/formatDate";

const JournalsList: React.FC = () => {
  const {
    loading,
    error,
    data,
    handleDeleteJournal,
    handleSelectJournal,
    selectedId,
  } = useGetJournals();

  if (loading) return <p>Loading journals...</p>;
  if (error) return <p>Error loading journals: {error.message}</p>;

  const journals = data?.getJournals
    ? [...data.getJournals].sort((a, b) => {
        const updatedAtDiff =
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (updatedAtDiff !== 0) return updatedAtDiff;

        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
    : [];

  return (
    <div className="border-r border-[1px] w-[300px] h-[100vh] overflow-auto">
      <div className="flex border-b justify-between p-2">
        <p></p>
        <button
          className={`pr-3 ${
            !selectedId ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleDeleteJournal}
          disabled={!selectedId}
        >
          <img src={remove} alt="Delete Journal" />
        </button>
      </div>
      {journals.length === 0 ? (
        <p className="text-center text-[15px] mt-[3rem] text-black text-opacity-65">
          No journals available
        </p>
      ) : (
        <ul>
          {journals.map((journal) => (
            <Link to={journal.id} className="block">
              <li
                key={journal.id}
                className={`p-6 border-b ${
                  selectedId === journal.id ? "bg-[#ececec]" : ""
                }`}
                onClick={() => handleSelectJournal(journal.id)}
              >
                <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                  {journal.title}
                </p>
                <p className="text-[13px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {journal.content}
                </p>
                <p className="text-[13px] text-black text-opacity-65">
                  {formatDate(journal.updatedAt)}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JournalsList;
