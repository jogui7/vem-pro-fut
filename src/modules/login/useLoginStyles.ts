import { makeStyles } from '@material-ui/core';

const useLoginStyles = makeStyles(theme => ({
  root: {
    maxWidth: theme.spacing(40),
  },
  background: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.primary.main,
    backgroundImage: 'url(/images/vpf-bg.png)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
    maxWidth: '320px',
    width: '100%',
  },
  redirectLink: {
    textDecoration: 'underline',
    color: '#fff',
  },
}));

export default useLoginStyles;
