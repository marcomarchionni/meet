export const formatDate = (isoDate: string | null | undefined) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'full',
  }).format(date);
};
