import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormControl, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { IoSearch } from 'react-icons/io5';
import useSearch from '../hooks/useSearch';
import { ByFolder } from './filter/ByFolder';
import { ByDate } from './filter/ByDate';
import { ByNewest } from './filter/ByNewest';
import { ByOldest } from './filter/ByOldest';
import useFolderActions from '@/folder/hooks/useFolder';

import { CgNotes } from 'react-icons/cg';
import { FilterJournalList } from './filter/SearchResult';
import { Link } from 'react-router-dom';

export default function Search() {
  const { form, inputRef, handleSelectFolder, sortedFolders } = useFolderActions();
  const {
    searchQuery,
    combinedResults,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    onSubmit,
    activeFilter,
    handleFilterClick,
    handleInputChange,
    inputValue,
    setActiveFilter,
  } = useSearch();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger className="mt-2" asChild>
        <Button className="border px-2" variant="aBtn" size="sm">
          <span className="text-[18px] mr-[6px]">
            <IoSearch />
          </span>
          Find your journals...
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white h-[700px] w-[700px] overflow-scroll max-w-full px-0 rounded-lg shadow-md">
        <div className="">
          <Form {...form}>
            <form className="top-0 left-0 mb-6" onSubmit={onSubmit}>
              <FormField
                name="folderName"
                render={({ field }) => (
                  <div className="flex items-center gap-[7px] pb-2">
                    <span className="absolute text-secondary left-3 text-[18px] mr-[6px]">
                      <IoSearch />
                    </span>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        ref={inputRef}
                        placeholder="Find your journals"
                        value={inputValue}
                        onClick={() => handleFilterClick('search')}
                        onChange={handleInputChange}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') {
                            onSubmit(event);
                          }
                        }}
                        variant="search"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                )}
              />
            </form>
            <DialogTitle></DialogTitle>
          </Form>
          <ul className=" flex gap-[10px] items-center justify-center py-2">
            <li>
              <ByFolder
                isActive={activeFilter === 'folder'}
                onClick={() => handleFilterClick('folder')}
                setIsModalOpen={setIsModalOpen}
              />
            </li>
            <li>
              <ByDate
                isActive={activeFilter === 'date'}
                onClick={() => handleFilterClick('date')}
                setIsModalOpen={setIsModalOpen}
              />
            </li>
            <li>
              <ByNewest
                isActive={activeFilter === 'newest'}
                onClick={() => handleFilterClick('newest')}
                setIsModalOpen={setIsModalOpen}
              />
            </li>
            <li>
              <ByOldest
                isActive={activeFilter === 'oldest'}
                onClick={() => handleFilterClick('oldest')}
                setIsModalOpen={setIsModalOpen}
              />
            </li>
            <li className="flex items-center border-l h-[25px]">
              <Button
                className="bg-popover-foreground flex ml-[10px] items-center gap-[6px] text-[12px] border text-primary font-normal py-1.5 px-3 rounded-[22px] h-auto"
                onClick={() => setActiveFilter(null)}
              >
                Clear Filter
              </Button>
            </li>
          </ul>
          {isLoading && <p className="text-center">Loading...</p>}
          <ul className="flex flex-col w-[650px] gap-[10px] mx-auto">
            {searchQuery && combinedResults.length > 0 ? (
              <>
                {combinedResults.some((item) => item.type === 'folder') && (
                  <div>
                    <p className="text-[13px] pl-2 font-normal font-semibold text-primary mb-4">Folders</p>

                    <ul>
                      {combinedResults
                        .filter((item) => item.type === 'folder')
                        .map((folder) => (
                          <li key={folder.id} className="cursor-pointer my-2">
                            <Link
                              to="/journals/"
                              onClick={() => {
                                handleSelectFolder(folder.id, folder.title);
                                setIsModalOpen(false);
                              }}
                            >
                              <div className="flex flex-col">
                                <span className="flex items-center gap-[7px] text-[16px] font-semibold text-secondary pl-2">
                                  <CgNotes />
                                  {folder.title}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                {combinedResults.some((item) => item.type === 'journal') &&
                  combinedResults
                    .filter((item) => item.type === 'journal')
                    .map((journal) => (
                      <div key={journal.id}>
                        <p className="text-[13px] pl-2 font-normal font-semibold text-primary mt-2 mb-2">Journals</p>

                        <FilterJournalList
                          journals={combinedResults.filter((item) => item.type === 'journal')}
                          folders={sortedFolders}
                          setIsModalOpen={setIsModalOpen}
                        />
                      </div>
                    ))}
              </>
            ) : (
              searchQuery && <p className="text-primary mt-3 text-sm text-center">No results found for your search.</p>
            )}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
