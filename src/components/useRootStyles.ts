import { makeStyles, Theme } from '@material-ui/core';

const useRootStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3),
    height: '100%',
    paddingTop: theme.spacing(15),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
      paddingTop: theme.spacing(8),
    },
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default useRootStyles;
