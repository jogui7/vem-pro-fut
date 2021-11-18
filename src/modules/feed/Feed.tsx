import {
  Box, Grid, makeStyles,
} from '@material-ui/core';
import {
  collection, query, getDocs, where,
} from 'firebase/firestore';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import useRootStyles from '../../components/useRootStyles';
import useConnections from '../../hooks/useConnections';
import useFirebase from '../../hooks/useFirebase';
import PostCard from './PostCard';

const useStyles = makeStyles((theme) => ({
  grid: {
    maxWidth: theme.spacing(125),
  },
}));

const Feed = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const classes = useRootStyles();
  const feedClasses = useStyles();
  const { firestore } = useFirebase();
  const connections = useConnections();

  const connectionIds = useMemo(() =>
    connections.map(connection => connection.userId),
  [connections]);

  const fetchPosts = useCallback(async () => {
    if (connectionIds.length > 0) {
      const usersCol = collection(firestore, 'posts');
      const exploreQuery = query(usersCol, where('ownerId', 'in', connectionIds));
      const exploreSnap = await getDocs(exploreQuery);

      const data = exploreSnap.docs.map(doc => doc.data());

      setPosts(data);
    }
  }, [connectionIds]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <Box className={classes.root}>
      <Grid container spacing={2} alignItems="stretch" className={feedClasses.grid}>
        {posts.map((post: any) => (
          <Grid item xs={12} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed;
