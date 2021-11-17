import {
  Box, CircularProgress, Grid, makeStyles, Theme, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.common.white,
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
  },
  progressPrimary: {
    color: theme.palette.common.white,
  },
}));

const LoadingPage = () => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid item xs="auto">
            <Box paddingBottom={4}>
              <CircularProgress size={60} classes={{ colorPrimary: classes.progressPrimary }} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">carregando ...</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoadingPage;
