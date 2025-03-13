export const formatSortCode = (sortcode: number) => {
  const str = sortcode.toString().padStart(6, '0');
  return `${str.slice(0, 2)}-${str.slice(2, 4)}-${str.slice(4, 6)}`;
};
