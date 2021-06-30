export const formatNumbers = (num: number): string => {
  const numFormat = new Intl.NumberFormat();
  return numFormat.format(num);
};

export const formatIsoLanguage = (code: string): string => {
  const languageNames = new (Intl as any).DisplayNames(['en'], {
    type: 'language',
  });

  return languageNames.of(code);
};
