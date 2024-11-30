export const parseNumericId = (id: string): number | null => {
  return !isNaN(Number(id)) ? Number(id) : null;
};
