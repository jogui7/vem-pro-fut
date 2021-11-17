/* eslint-disable import/prefer-default-export */
import {
  Actions, User,
} from './types';

export const setUser = (user: User) => ({
  type: Actions.SET_USER,
  payload: { user },
});
