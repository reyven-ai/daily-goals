import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateJournal } from "../hooks/useJournal";

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
      const textarea = document.getElementById(
        "journalContent"
      ) as HTMLTextAreaElement;
      if (textarea) {
        textarea.focus();
      }
    }
  };

  return (
    <div className="w-[1200px]">
      <div className="pt-[1rem]">
        <div>
          <Input
            id="journalTitle"
            type="text"
            value={title}
            onChange={handleTitleChange}
            onKeyDown={handleKeyPress}
            className="border-none focus:outline-none focus:border-none font-bold text-[20px] mb-1 w-full"
          />
        </div>
        <div>
          <Textarea
            id="journalContent"
            value={content}
            onChange={handleContentChange}
            className="border-none w-full h-[100vh]"
          />
        </div>
      </div>
    </div>
  );
};

export default JournalDetails;
