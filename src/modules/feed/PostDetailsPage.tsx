import {
  Avatar,
  Box, Button, Grid, makeStyles, Paper, Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import classNames from 'classnames';
import {
  collection, deleteDoc, doc, getDoc, getDocs,
} from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import ParticipateButton from '../../components/ParticipateButton';
import useRootStyles from '../../components/useRootStyles';
import useFirebase from '../../hooks/useFirebase';
import useVemProFutStyles from '../../useVemProFutStyles';
import { formatDateToString } from '../../utils/utils';
import { useApplicationContext } from '../context/ApplicationContext';
import { User } from '../context/types';
import { PostDetails } from './feed.types';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: theme.spacing(125),
    maxHeight: '100%',
    width: '100%',
    borderRadius: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  iframe: {
    aspectRatio: '1.45',
    border: 'none',
  },
  excludeButton: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: red[500],
    },
    color: theme.palette.common.white,
  },
}));

const PostDetailsPage = () => {
  const classes = useRootStyles();
  const postDetailClasses = useStyles();
  const vemProFutClasses = useVemProFutStyles();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { state } = useApplicationContext();
  const { firestore, app } = useFirebase();
  const [post, setPost] = useState<PostDetails>();

  const getPost = useCallback(async () => {
    if (state?.user) {
      const postCol = collection(firestore, 'posts');
      const postDoc = doc(postCol, id);
      const postDocSnap = await getDoc(postDoc);

      if (postDocSnap.exists()) {
        const postData = postDocSnap.data() as PostDetails;

        const postUsersCol = collection(firestore, 'posts', id, 'users');
        const postUsersSnap = await getDocs(postUsersCol);

        const postUsersData = postUsersSnap.docs.map(userDoc => userDoc.data()) as User[];

        setPost({ ...postData, id, users: postUsersData });
      }
    }
  }, [state?.user, id]);

  const handleDelete = async () => {
    if (state?.user) {
      const postCol = collection(firestore, 'posts');
      const postDoc = doc(postCol, id);
      await deleteDoc(postDoc);

      history.push('/');
    }
  };

  useEffect(() => {
    getPost();
  }, [getPost]);

  if (!post) return null;

  return (
    <Box className={classes.root}>
      <Paper
        elevation={0}
        className={classNames(vemProFutClasses.container, postDetailClasses.paper)}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" className={vemProFutClasses.boldText}>
                  {post.ownerName}
                </Typography>
                <Typography>
                  {formatDateToString(post.date)}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <iframe
                  className={postDetailClasses.iframe}
                  title="aaa"
                  width="100%"
                  allowFullScreen
                  src={`https://www.google.com/maps/embed/v1/place?key=${app.options.apiKey}&q=${post.address}`}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" className={vemProFutClasses.boldText}>descrição</Typography>
                <Typography style={{ overflow: 'hidden' }}>
                  {post.description}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {post.ownerId !== state?.user?.id ? (
                  <ParticipateButton postId={post.id} />
                ) : (
                  <Button
                    variant="contained"
                    className={postDetailClasses.excludeButton}
                    onClick={handleDelete}
                  >
                    excluir partida
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" className={vemProFutClasses.boldText}>confirmados</Typography>
                <Box
                  height="100%"
                  className={vemProFutClasses.scrolledContainer}
                >
                  {post.users.map(user => (
                    <Link to={`/perfil/${user.id}`} className={vemProFutClasses.linkDisguised}>
                      <Box display="flex" alignItems="center" py={1}>
                        <Avatar src={user.avatar} />
                        <Typography style={{ marginLeft: 8 }}>{user.name}</Typography>
                      </Box>
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default PostDetailsPage;
