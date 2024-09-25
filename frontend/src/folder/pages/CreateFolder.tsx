import { Input } from '@/components/ui/input';
import { AiOutlinePlus } from 'react-icons/ai';
import useFolderActions from '../hooks/useFolder';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CreateFolder() {
  const { loading, handleSubmit, form, inputRef } = useFolderActions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="aBtn">
          <span className="text-[18px] mr-[4px]">
            <AiOutlinePlus />
          </span>
          New Personal Journal
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white px-0 rounded-lg shadow-md w-[400px]">
        <div>
          <DialogHeader className=" border-b px-4 pb-3.5 text-left">
            <DialogTitle>Create New Journal</DialogTitle>
          </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}
