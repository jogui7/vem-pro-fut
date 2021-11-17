import React, {
  createContext, useCallback, useContext, useEffect, useReducer,
} from 'react';
import { collection, doc, getDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import {
  Actions, ActionType, ApplicationContextProps, ApplicationContextState, User,
} from './types';
import useFirebase from '../../hooks/useFirebase';
import { setUser } from './Actions';

const initialState: ApplicationContextState = {
  user: undefined,
};

export const ApplicationContext = createContext<ApplicationContextProps>({
  state: initialState,
  dispatch: () => {},
});

export const reducer = (
  state: ApplicationContextState,
  action: ActionType,
): ApplicationContextState => {
  switch (action.type) {
    case Actions.SET_USER: {
      return {
        ...state,
        user: action.payload?.user,
      };
    }
    default:
      // eslint-disable-next-line no-console
      console.error('Action in application context was not defined');
      return state;
  }
};

type ApplicationContextProviderProps = {
  children: React.ReactNode;
};

export const ApplicationContextProvider = ({ children }: ApplicationContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { auth, firestore } = useFirebase();
  const history = useHistory();

  const handleLogout = useCallback(async () => {
    await signOut(auth);
    history.push('/login');
  }, [signOut, history]);

  const initContext = useCallback(async () => {
    if (!auth.currentUser?.uid) {
      return;
    }

    const users = collection(firestore, 'users');
    const userDoc = doc(users, auth.currentUser.uid);
    const userDocSnap = await getDoc(userDoc);

    if (userDocSnap.exists()) {
      const user = userDocSnap.data() as User;
      dispatch(setUser({ ...user, id: auth.currentUser.uid }));
    } else {
      handleLogout();
    }
  }, [auth, handleLogout]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        initContext();
      } else {
        handleLogout();
      }
    });
    return () => unsubscribe();
  }, [initContext, auth, onAuthStateChanged, handleLogout]);

  const props = {
    state,
    dispatch,
  };

  return <ApplicationContext.Provider value={props}>{children}</ApplicationContext.Provider>;
};

export const useApplicationContext = () => useContext<ApplicationContextProps>(ApplicationContext);
