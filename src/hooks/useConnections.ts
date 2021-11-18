import {
  collection, getDocs,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { useApplicationContext } from '../modules/context/ApplicationContext';
import useFirebase from './useFirebase';

export type Connection = {
  userId: string;
};

const useConnections = () => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const { firestore } = useFirebase();
  const { state } = useApplicationContext();

  const fetchConnections = useCallback(async () => {
    if (state?.user) {
      const connectionsCol = collection(firestore, 'users', state.user.id, 'connections');
      const connectionsSnap = await getDocs(connectionsCol);

      const data = connectionsSnap.docs.map(doc => doc.data()) as Connection[];

      setConnections(data);
    }
  }, [state?.user]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  return connections;
};

export default useConnections;
