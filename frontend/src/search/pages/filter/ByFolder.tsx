import { Filter } from '@/search/types/filter';
import { JournalListFilter } from './JournalListFIlter';
import { CgNotes } from 'react-icons/cg';

export function ByFolder(props: Filter & { setIsModalOpen: (open: boolean) => void }) {
  return (
    <div>
      <JournalListFilter
        {...props}
        label="Journals"
        icon={<CgNotes className="text-[15.5px]" />}
        categoryOrder={['All']}
        emptyMessage="No journals available."
        positionLeft="-36px"
      />
    </div>
  );
}
