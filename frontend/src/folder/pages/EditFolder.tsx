import { BsThreeDots } from 'react-icons/bs';
import useFolderActions from '../hooks/useFolder';
import { useFolderContext } from '../hooks/useFolderContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function EditFolder() {
  const {
    newTitle,
    setNewTitle,
    isEditing,
    handleEditClick,
    showOptions,
    handleCancelClick,
    handleSaveClick,
    toggleOptions,
    optionsRef,
    inputRef,
    handleDeleteClick,
  } = useFolderActions();
  const { selectedFolderTitle } = useFolderContext();

  return (
    <div className="flex h-[44px] justify-between items-center border-b py-2 px-2">
      {isEditing ? (
        <Input
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="text-[18px] font-bold border-none focus:outline-none focus:border-none px-0 py-0"
        />
      ) : (
        <h1 className="text-[18px] font-bold">{selectedFolderTitle}</h1>
      )}

      <div className="relative" ref={optionsRef}>
        {isEditing ? (
          newTitle.trim() === selectedFolderTitle ? (
            <Button
              onClick={handleCancelClick}
              className="bg-transparent text-[14px] text-gray-500 font-normal hover:bg-transparent"
            >
              Cancel
            </Button>
          ) : (
            <Button
              onClick={handleSaveClick}
              className="bg-transparent text-[14px] text-[#000] font-normal hover:bg-transparent"
            >
              Save
            </Button>
          )
        ) : (
          <Button onClick={toggleOptions} className="bg-transparent text-[18px] text-[#7d7d7d] hover:bg-transparent">
            <BsThreeDots />
          </Button>
        )}

        {showOptions && !isEditing && (
          <div className="absolute right-0 mt-2 w-[120px] bg-white border rounded shadow-md">
            <Button
              onClick={handleEditClick}
              className="bg-transparent text-[#000] block w-full text-left px-4 py-2 hover:bg-gray-100 text-[15px] font-normal hover:bg-[#ececec]"
            >
              Edit
            </Button>
            <Button
              onClick={handleDeleteClick}
              className="bg-transparent block w-full text-left px-4 py-2 hover:bg-gray-100 text-[15px] text-red-500 font-normal hover:bg-[#ececec]"
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
