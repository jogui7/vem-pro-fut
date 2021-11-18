import { Timestamp } from 'firebase/firestore';

export type Post = {
  ownerId: string;
  ownerName: string;
  description: string;
  address: string;
  date: Timestamp ;
};
