// eslint-disable-next-line import/prefer-default-export
export const formatCompleteName = (name?: string, surname?: string) =>
  (name && surname && `${name} ${surname}`) || name || '';
