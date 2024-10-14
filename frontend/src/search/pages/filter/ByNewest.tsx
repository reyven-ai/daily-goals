import { Filter } from '@/search/types/filter';
import { IoFolderOutline } from 'react-icons/io5';
import { JournalListFilter } from './JournalListFIlter';

export function ByNewest(props: Filter & { setIsModalOpen: (open: boolean) => void }) {
  return (
    <div>
      <JournalListFilter
        {...props}
        label="Newest"
        icon={<IoFolderOutline className="text-[17px]" />}
        categoryOrder={['Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days']}
        emptyMessage="No recent journals available."
        positionLeft="-288.5px"
      />
    </div>
  );
}
