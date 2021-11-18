import {
  Avatar, Box, Button, Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import ConnectionButton from '../../components/ConnectionButton';
import useRootStyles from '../../components/useRootStyles';
import useFirebase from '../../hooks/useFirebase';
import useVemProFutStyles from '../../useVemProFutStyles';
import { useApplicationContext } from '../context/ApplicationContext';
import { User } from '../context/types';
import EditProfile from './EditProfile';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: theme.spacing(100),
    width: '100%',
    borderRadius: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const classes = useRootStyles();
  const profileClasses = useStyles();
  const vemProFutClasses = useVemProFutStyles();
  const { id } = useParams<{ id?: string }>();

  const { state } = useApplicationContext();
  const { firestore } = useFirebase();
  const [user, setUser] = useState<User>();

  const toggleEdit = () => setEditMode(!editMode);

  const getUser = useCallback(async () => {
    if (state?.user) {
      const users = collection(firestore, 'users');
      const userDoc = doc(users, id || state.user.id);
      const userDocSnap = await getDoc(userDoc);

      if (userDocSnap.exists()) {
        const data = userDocSnap.data() as User;
        setUser(data);
      }
    }
  }, [state?.user, id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (id === state.user?.id) {
    return <Redirect to="/perfil" />;
  }

  return (
    <Box className={classes.root}>
      <Paper elevation={0} className={classNames(vemProFutClasses.container, profileClasses.paper)}>
        {editMode && !id
          ? (
            <EditProfile toggleEdit={toggleEdit} initialValues={user} getUser={getUser} />
          )
          : (
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs="auto">
                    <Avatar alt="Foto de perfil" className={profileClasses.avatar} src={user?.avatar} />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h5">{user?.name}</Typography>
                    <Typography>{user?.city}, {user?.state}</Typography>
                  </Grid>
                  {!id && (
                    <Grid item xs="auto">
                      <Button
                        startIcon={<EditIcon />}
                        variant="text"
                        color="primary"
                        size="medium"
                        onClick={toggleEdit}
                      >
                        editar perfil
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="h6">sobre</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {user?.about}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {id && (
                <Grid item xs={12}>
                  <Grid container spacing={1} justifyContent="flex-end">
                    <Grid item xs={12} sm={3}>
                      <ConnectionButton userId={id} />
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
      </Paper>
    </Box>
  );
};

export default Profile;
