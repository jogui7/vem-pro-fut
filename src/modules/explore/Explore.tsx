import { Box, Grid, makeStyles } from '@material-ui/core';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import useRootStyles from '../../components/useRootStyles';
import useFirebase from '../../hooks/useFirebase';
import { useApplicationContext } from '../context/ApplicationContext';
import { User } from '../context/types';
import ExploreCard from './ExploreCard';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: theme.spacing(150),
  },
}));

const Explore = () => {
  const [users, setUsers] = useState<User[]>([]);
  const classes = useRootStyles();
  const exploreClasses = useStyles();
  const { firestore } = useFirebase();
  const { state } = useApplicationContext();

  const fetchUsers = useCallback(async () => {
    if (state?.user) {
      const usersCol = collection(firestore, 'users');
      const exploreQuery = query(usersCol, where('city', '==', state.user.city), where('__name__', '!=', state.user.id));
      const exploreSnap = await getDocs(exploreQuery);

      const data = exploreSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as User[];
      setUsers(data);
    }
  }, [state?.user]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} alignItems="stretch" className={exploreClasses.grid}>
        {users.map((user: User) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={user.id}>
            <ExploreCard
              user={user}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
