import { Journal } from '@/graphql/generated';

export const formatDateJournal = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const categorizeJournals = (journals: Journal[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const groups: { [key: string]: Journal[] } = {
    Today: [],
    Yesterday: [],
    'Previous 7 Days': [],
    'Previous 30 Days': [],
    Older: [],
  };

  journals.forEach((journal) => {
    const createdAt = new Date(journal.createdAt);
    const updatedAt = new Date(journal.updatedAt);
    const relevantDate = updatedAt > createdAt ? updatedAt : createdAt;

    if (relevantDate.toDateString() === today.toDateString()) {
      groups.Today.push(journal);
    } else if (relevantDate.toDateString() === yesterday.toDateString()) {
      groups.Yesterday.push(journal);
    } else if (relevantDate > sevenDaysAgo && relevantDate < today) {
      groups['Previous 7 Days'].push(journal);
    } else if (relevantDate > thirtyDaysAgo && relevantDate < today) {
      groups['Previous 30 Days'].push(journal);
    } else {
      groups.Older.push(journal);
    }
  });

  return Object.fromEntries(Object.entries(groups).filter(([_, journals]) => journals.length > 0));
};
