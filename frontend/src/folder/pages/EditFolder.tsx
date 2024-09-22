import { BsThreeDots } from 'react-icons/bs';
import useFolderActions from '../hooks/useFolder';
import { useFolderContext } from '../hooks/useFolderContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CgMoreAlt } from 'react-icons/cg';

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
    <div className="flex justify-between items-center border-b py-[5.5px] px-2">
      {isEditing ? (
        <Input ref={inputRef} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} variant="fTitle" />
      ) : (
        <h1 className="text-[18px] font-bold">{selectedFolderTitle}</h1>
      )}

      <div className="relative" ref={optionsRef}>
        {isEditing ? (
          newTitle.trim() === selectedFolderTitle ? (
            <Button onClick={handleCancelClick} variant="ghost" size="sm">
              Cancel
            </Button>
          ) : (
            <Button onClick={handleSaveClick} variant="ghost" size="sm">
              Save
            </Button>
          )
        ) : (
          <Button onClick={toggleOptions} variant="icon">
            <CgMoreAlt />
          </Button>
        )}

        {showOptions && !isEditing && (
          <div className="absolute right-0 my-2 w-[130px] bg-white border rounded shadow-md">
            <Button onClick={handleEditClick} variant="custom" size="lg">
              Edit
            </Button>
            <hr className="w-[90%] m-auto" />
            <Button onClick={handleDeleteClick} variant="destructive" size="lg">
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
