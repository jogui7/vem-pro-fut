import {
  Box, Card, Grid, makeStyles, Theme, Tooltip, Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import ConnectionButton from '../../components/ConnectionButton';
import useVemProFutStyles from '../../useVemProFutStyles';
import { User } from '../context/types';

type ExploreCardProps = {
  user: User;
};

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: `${theme.spacing(1)}px !important`,
    height: '100%',
  },
  media: {
    aspectRatio: '1.5',
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const getDescription = (city?: string, state?: string) => {
  if (city && state) {
    return `${city}, ${state}`;
  }
  return '';
};

const ExploreCard = ({
  user,
}: ExploreCardProps) => {
  const classes = useStyles();
  const vemProFutClasses = useVemProFutStyles();

  const location = getDescription(user?.city, user.state);

  return (
    <Card className={classes.card} elevation={0}>
      <Link to={`/perfil/${user.id}`} className={vemProFutClasses.linkDisguised}>
        <Grid container alignItems="center">
          <Grid item xs={12}>
            <img src={user.avatar} alt="avatar" className={classes.media} />
          </Grid>
          <Grid item xs={12}>
            <Box p={3 / 2}>
              <Grid justify="space-between" wrap="nowrap" container alignItems="center">
                <Grid item xs={6} sm={7}>
                  <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                    <Grid item xs={8} md={9} lg={10}>
                      <Tooltip
                        title={user.name}
                        aria-label={user.name}
                        className={vemProFutClasses.boldText}
                      >
                        <Typography>
                          {user.name}
                        </Typography>
                      </Tooltip>
                      <Tooltip
                        title={location}
                        aria-label={location}
                      >
                        <Typography>
                          {location}
                        </Typography>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <ConnectionButton userId={user.id} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Link>
    </Card>
  );
};

export default ExploreCard;
