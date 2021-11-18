import {
  Box, Grid, makeStyles,
} from '@material-ui/core';
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import {
  collection, query, getDocs, where, Timestamp,
} from 'firebase/firestore';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import useRootStyles from '../../components/useRootStyles';
import useConnections from '../../hooks/useConnections';
import useFirebase from '../../hooks/useFirebase';
import { useApplicationContext } from '../context/ApplicationContext';
import AddPostModal from './AddPostModal';
import { Post } from './feed.types';
import PostCard from './PostCard';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: theme.spacing(125),
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(6),
    right: theme.spacing(6),
    zIndex: 1000,
    [theme.breakpoints.down('xs')]: {
      right: theme.spacing(2.5),
      bottom: theme.spacing(1.5),
    },
  },
}));

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [open, setOpen] = useState(false);
  const classes = useRootStyles();
  const feedClasses = useStyles();
  const { firestore } = useFirebase();
  const connections = useConnections();
  const { state } = useApplicationContext();

  const connectionIds = useMemo(() =>
    connections.map(connection => connection.userId),
  [connections]);

  const fetchPosts = useCallback(async () => {
    if (connectionIds.length > 0) {
      const postsCol = collection(firestore, 'posts');
      const exploreQuery = query(
        postsCol,
        where('ownerId', 'in', [...connectionIds, state?.user?.id]),
        where('date', '>', Timestamp.now()),
      );
      const exploreSnap = await getDocs(exploreQuery);

      const data = exploreSnap.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Post[];

      setPosts(data);
    }
  }, [connectionIds]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <>
      <Box className={classes.root}>
        <Grid container spacing={2} alignItems="stretch" className={feedClasses.grid}>
          {posts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <SpeedDial
        ariaLabel="adicionar publicação"
        icon={<SpeedDialIcon />}
        open={false}
        className={feedClasses.speedDial}
        onClick={() => setOpen(true)}
      />
      <AddPostModal open={open} handleClose={() => setOpen(false)} reload={fetchPosts} />
    </>
  );
};

export default Feed;
