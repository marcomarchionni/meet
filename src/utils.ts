export const formatDate = (isoDate: string | null | undefined) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'full',
    timeStyle: 'full',
  }).format(date);
};

export const onlyUnique = (
  value: string | undefined,
  index: number,
  arr: (string | undefined)[],
) => {
  if (arr && value) {
    return arr.indexOf(value) === index;
  }
  return false;
};
