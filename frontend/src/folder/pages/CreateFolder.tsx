import { Input } from '@/components/ui/input';
import FolderModal from '../Modal/CreateFolderModal';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdClose } from 'react-icons/md';
import useFolderActions from '../hooks/useFolder';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function CreateFolder() {
  const { loading, handleClick, closeModal, isModalOpen, handleSubmit, form, inputRef } = useFolderActions();

  return (
    <div>
      <Button
        className="w-full justify-start text-left items-center bg-transparent px-4 mb-3 mt-2 flex gap-[10px] text-[#7d7d7d] text-[14px] font-normal hover:bg-[#ececec] hover:text-[#000]"
        onClick={handleClick}
      >
        <span className="text-[18px] mr-[4px]">
          <AiOutlinePlus />
        </span>
        New Personal Journal
      </Button>
      {isModalOpen && (
        <FolderModal onClose={closeModal}>
          <div className="w-[400px] my-2">
            <div className="border-b py-2 px-4 flex items-center justify-between">
              <h3>New Journal</h3>
              <Button
                className="bg-transparent text-[#000] py-2 px-2 text-[24px] hover:bg-[#ececec] rounded-[50%]"
                onClick={closeModal}
              >
                <MdClose />
              </Button>
            </div>
            <Form {...form}>
              <form className="px-4 py-5 space-y-4" onSubmit={handleSubmit}>
                <FormField
                  control={form.control}
                  name="folderName"
                  render={({ field }) => (
                    <div className="flex flex-col gap-[7px] pb-2">
                      <FormLabel className="pl-1 text-[15px]">Journal Name</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" ref={inputRef} disabled={loading} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  )}
                />
                <Button
                  className="w-full bg-[#000] text-[#fff] text-[15px] h-[45px] mt-4 rounded-[8px]"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Journal'}
                </Button>
              </form>
            </Form>
          </div>
        </FolderModal>
      )}
    </div>
  );
}
