import {
  Box, Card, Grid, makeStyles, Theme, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ParticipateButton from '../../components/ParticipateButton';
import useFirebase from '../../hooks/useFirebase';
import useVemProFutStyles from '../../useVemProFutStyles';
import { formatDateToString } from '../../utils/utils';
import { Post } from './feed.types';

type PostCardProps = {
  post: Post;
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: `${theme.spacing(1)}px !important`,
    height: '100%',
  },
  iframe: {
    aspectRatio: '1.45',
    border: 'none',
  },
}));

const PostCard = ({
  post,
}: PostCardProps) => {
  const classes = useStyles();
  const vemProFutClasses = useVemProFutStyles();
  const { app } = useFirebase();

  return (
    <Card className={classes.card} elevation={0}>
      <Grid container>
        <Grid item xs={8}>
          <iframe
            className={classes.iframe}
            title="aaa"
            width="100%"
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=${app.options.apiKey}&q=${post.address}`}
          />
        </Grid>
        <Grid item xs={4}>
          <Link to="/post/aaaaa" className={vemProFutClasses.linkDisguised}>
            <Box p={3} height="100%" display="flex" flexDirection="column" justifyContent="space-between">
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
                  <Typography style={{ overflow: 'hidden' }}>
                    {post.description}
                  </Typography>
                </Grid>
              </Grid>
              <ParticipateButton userId="aaaa" />
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PostCard;
