import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './font.css';
import HomeNavigation from './HomeNavigation';
import PrivateRoute from './lib/PrivateRoute';
import Login from './modules/login/Login';
import SignUp from './modules/signup/SignUp';
import theme from './Theme';

const styles = () => ({
  '@global': {
    color: theme.palette.text.primary,
    '*::-webkit-scrollbar': {
      width: '0.4em',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: 16,
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
      },
    },
    '*::-webkit-scrollbar:horizontal': {
      height: 5,
    },
    body: {
      backgroundColor: theme.palette.primary.main,
      backgroundImage: 'url(/images/vpf-bg.png)',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/cadastre-se" exact component={SignUp} />
        <PrivateRoute path="/" render={() => <HomeNavigation />} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default withStyles(styles)(App);
