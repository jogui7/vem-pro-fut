import { Timestamp } from 'firebase/firestore';
import { User } from '../context/types';

export type Post = {
  id: string;
  ownerId: string;
  ownerName: string;
  description: string;
  address: string;
  date: Timestamp ;
};

export type PostDetails = {
  users: User[];
} & Post;
