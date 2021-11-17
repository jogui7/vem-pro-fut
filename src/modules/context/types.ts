import React from 'react';

export enum Actions {
  SET_USER = 'context/user',
}

export type User = {
  id: string;
  name: string;
  email: string;
  city: string;
  state: string;
  about?: string;
  avatar?: string;
};

export type ActionType = {
  type: Actions;
  payload?: Partial<ApplicationContextState>;
};

export type ApplicationContextState = {
  user?: User;
};

export type ApplicationContextDispatch = React.Dispatch<ActionType>;

export type ApplicationContextProps = {
  state: ApplicationContextState;
  dispatch: ApplicationContextDispatch;
};
