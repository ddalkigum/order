export const getTodayFormatYYYYMMDD = (): string => {
  return new Date().toISOString().split('T')[0];
};
