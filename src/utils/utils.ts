/* eslint-disable import/prefer-default-export */
export const prevent = (evt: React.SyntheticEvent) => {
  evt.preventDefault();
  evt.stopPropagation();
};
