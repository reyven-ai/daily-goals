import { Input } from '@/components/ui/input';
import FolderModal from '../Modal/CreateFolderModal';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import useFolderActions from '../hooks/useFolder';

export default function CreateFolder() {
  const { loading, handleClick, inputRef, closeModal, isModalOpen, handleSubmit, handleInputChange, folderName } =
    useFolderActions();

  return (
    <div>
      <button
        className="flex items-center px-4 mb-3 mt-2  flex items-center gap-[10px] text-[#7d7d7d] text-[14px] hover:text-[#000]"
        onClick={handleClick}
      >
        <span className="text-[18px] mr-[4px]">
          <AiOutlinePlus />
        </span>
        New Personal Journal
      </button>
      {isModalOpen && (
        <FolderModal onClose={closeModal}>
          <div className="w-[400px] my-2">
            <div className="border-b py-4 px-4 flex items-center justify-between">
              <h3>New Journal</h3>
              <button className="text-[24px]" onClick={closeModal}>
                <MdClose />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-4 py-5">
              <div className="flex flex-col gap-[5px]">
                <label className="pl-1 text-[15px]" htmlFor="">
                  Journal Name
                </label>
                <Input ref={inputRef} type="text" value={folderName} onChange={handleInputChange} disabled={loading} />
                <button className="bg-[#000] text-[#fff] h-[45px] mt-4 rounded-[8px]" type="submit" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Journal'}
                </button>
              </div>
            </form>
          </div>
        </FolderModal>
      )}
    </div>
  );
}
