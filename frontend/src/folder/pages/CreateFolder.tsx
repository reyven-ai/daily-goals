import { Input } from '@/components/ui/input';
import FolderModal from '../Modal/CreateFolderModal';
import { AiOutlinePlus } from 'react-icons/ai';
import useFolderActions from '../hooks/useFolder';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

export default function CreateFolder() {
  const { loading, handleClick, closeModal, isModalOpen, handleSubmit, form, inputRef } = useFolderActions();

  return (
    <div>
      <Button variant="aBtn" onClick={handleClick}>
        <span className="text-[18px] mr-[4px]">
          <AiOutlinePlus />
        </span>
        New Personal Journal
      </Button>

      {isModalOpen && (
        <FolderModal onClose={closeModal}>
          <div className="w-[400px] my-2">
            <Form {...form}>
              <form className="px-4 py-4 space-y-4" onSubmit={handleSubmit}>
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
                <Button variant="cBtn" size="lg" type="submit" disabled={loading}>
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
