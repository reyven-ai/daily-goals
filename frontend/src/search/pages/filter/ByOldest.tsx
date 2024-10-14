import { Filter } from '@/search/types/filter';
import { JournalListFilter } from './JournalListFIlter';
import { AiOutlineFolderOpen } from 'react-icons/ai';

export function ByOldest(props: Filter & { setIsModalOpen: (open: boolean) => void }) {
  return (
    <JournalListFilter
      {...props}
      label="Oldest"
      icon={<AiOutlineFolderOpen />}
      categoryOrder={['Older']}
      emptyMessage="No old journals available."
      positionLeft="-413px"
    />
  );
}
