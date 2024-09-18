import { BsThreeDots } from 'react-icons/bs';
import useFolderActions from '../hooks/useFolder';
import { useFolderContext } from '../hooks/useFolderContext';

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
    <div className="flex justify-between items-center border-b py-2 px-2">
      {isEditing ? (
        <input
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="text-[18px] font-bold focus:outline-none"
        />
      ) : (
        <h1 className="text-[18px] font-bold">{selectedFolderTitle}</h1>
      )}

      <div className="relative" ref={optionsRef}>
        {isEditing ? (
          newTitle.trim() === selectedFolderTitle ? (
            <button onClick={handleCancelClick} className="text-[14px] text-gray-500">
              Cancel
            </button>
          ) : (
            <button onClick={handleSaveClick} className="text-[14px]">
              Save
            </button>
          )
        ) : (
          <button onClick={toggleOptions} className="text-[18px] h-[15px] pt-[3px] text-[#7d7d7d] ">
            <BsThreeDots />
          </button>
        )}

        {showOptions && !isEditing && (
          <div className="absolute right-0 mt-2 w-[120px] bg-white border rounded shadow-md">
            <button
              onClick={handleEditClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[15px]"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-[15px] text-red-500"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
