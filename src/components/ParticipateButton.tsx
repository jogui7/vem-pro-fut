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

const ParticipateButton = ({ postId }: { postId: string }) => {
  const { firestore } = useFirebase();
  const { state } = useApplicationContext();
  const [isParticipating, setIsParticipating] = useState(false);
  const [hover, setHover] = useState(false);
  const classes = useStyles();

  const getParticipating = useCallback(async () => {
    if (state?.user) {
      const participantsCol = collection(firestore, 'posts', postId, 'users');
      const participantsDoc = doc(participantsCol, state.user.id);
      const participantsDocSnap = await getDoc(participantsDoc);

      if (participantsDocSnap.exists()) {
        setIsParticipating(true);
      }
    }
  }, [state?.user]);

  useEffect(() => {
    getParticipating();
  }, [getParticipating]);

  const handleConnect = async (e: React.SyntheticEvent) => {
    prevent(e);
    if (state.user) {
      const participantsCol = collection(firestore, 'posts', postId, 'users');
      const participantsDoc = doc(participantsCol, state.user.id);

      await setDoc(participantsDoc, {
        ...state.user,
      });

      setIsParticipating(true);
    }
  };

  const handleDisconnect = async (e: React.SyntheticEvent) => {
    prevent(e);
    if (state.user) {
      const participantsCol = collection(firestore, 'posts', postId, 'users');
      const participantsDoc = doc(participantsCol, state.user.id);

      await deleteDoc(participantsDoc);

      setIsParticipating(false);
    }
  };

  if (isParticipating) {
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
        {hover ? 'cancelar' : 'confirmado'}
      </Button>
    );
  }

  return (
    <Button variant="outlined" color="primary" fullWidth onClick={handleConnect}>participar</Button>
  );
};

export default ParticipateButton;
