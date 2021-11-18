import { Timestamp } from 'firebase/firestore';
import moment from 'moment';

/* eslint-disable import/prefer-default-export */
export const prevent = (evt: React.SyntheticEvent) => {
  evt.preventDefault();
  evt.stopPropagation();
};

export const formatDateToString = (firebaseDate: Timestamp) => {
  const date = firebaseDate.toDate();
  return moment(date).format('LL, HH:mm[h]');
};
