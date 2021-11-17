import {
  collection, deleteDoc, doc, getDoc, setDoc,
} from 'firebase/firestore';
import { Button, makeStyles } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { red } from '@material-ui/core/colors';
import { useApplicationContext } from '../modules/context/ApplicationContext';
import useFirebase from '../hooks/useFirebase';
import { prevent } from '../utils/utils';

const useStyles = makeStyles(() => ({
  button: {
    '&:hover': {
      backgroundColor: red[500],
    },
  },
}));

const ConnectionButton = ({ userId }: { userId: string }) => {
  const { firestore } = useFirebase();
  const { state } = useApplicationContext();
  const [hasConnection, setHasConnection] = useState(false);
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  const getConnection = useCallback(async () => {
    if (state?.user) {
      const connection = collection(firestore, 'users', 'connections', userId);
      const connectionDoc = doc(connection, state.user.id);
      const connectionDocSnap = await getDoc(connectionDoc);

      if (connectionDocSnap.exists()) {
        setHasConnection(true);
      }
    }
  }, [setHasConnection, state?.user]);

  useEffect(() => {
    getConnection();
  }, [getConnection]);

  const handleConnect = async (e: React.SyntheticEvent) => {
    prevent(e);
    const connection = collection(firestore, 'users', 'connections', userId);
    const connectionDoc = doc(connection, state?.user?.id);

    await setDoc(connectionDoc, {
      userId,
    });

    setHasConnection(true);
  };

  const handleDisconnect = async (e: React.SyntheticEvent) => {
    prevent(e);
    const connection = collection(firestore, 'users', 'connections', userId);
    const connectionDoc = doc(connection, state?.user?.id);

    await deleteDoc(connectionDoc);

    setHasConnection(false);
  };

  if (hasConnection) {
    return (
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleDisconnect}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        className={classes.button}
      >
        {hover ? 'desconectar' : 'conectado'}
      </Button>
    );
  }

  return (
    <Button variant="outlined" color="primary" fullWidth onClick={handleConnect}>conectar</Button>
  );
};

export default ConnectionButton;
