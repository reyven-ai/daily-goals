import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { useUpdateJournal } from "../hooks/useJournal";
import { modules } from "../utils/textEditor";

const JournalDetails: React.FC = () => {
  const {
    loading,
    error,
    title,
    content,
    handleTitleChange,
    handleContentChange,
  } = useUpdateJournal();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading journal details: {error.message}</p>;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const quill = document.querySelector(".ql-editor") as HTMLElement;
      if (quill) {
        quill.focus();
      }
    }
  };

  return (
    <div className="w-[1200px]">
      <div className="">
        <div>
          <Input
            id="journalTitle"
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            className="border-none focus:outline-none focus:border-none font-bold text-[20px] mb-2 mt-2 w-full"
          />
        </div>
        <div>
          <ReactQuill
            id="journalContent"
            value={content}
            onChange={handleContentChange}
            modules={modules}
            className="border-none w-full h-[100vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default JournalDetails;
