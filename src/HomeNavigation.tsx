import { Box } from '@material-ui/core';
import { Route, Redirect, Switch } from 'react-router-dom';
import AppWrap from './components/AppWrap/AppWrap';
import LoadingPage from './components/AppWrap/LoadingPage';
import useMenuItems from './components/AppWrap/useMenuItems';
import { ApplicationContextProvider, useApplicationContext } from './modules/context/ApplicationContext';
import Explore from './modules/explore/Explore';
import Profile from './modules/profile/Profile';

const Home = () => {
  const menuItems = useMenuItems();

  const { state } = useApplicationContext();

  if (!state?.user) return <LoadingPage />;

  return (
    <AppWrap menuItems={menuItems}>
      <Switch>
        <Route path="/" exact component={() => (<Box>aaaa</Box>)} />
        <Route path="/perfil" exact component={Profile} />
        <Route path="/perfil/:id" component={Profile} />
        <Route path="/explorar" component={Explore} />
        <Redirect to="/" />
      </Switch>
    </AppWrap>
  );
};

const HomeNavigation = () => (
  <ApplicationContextProvider>
    <Home />
  </ApplicationContextProvider>
);

export default HomeNavigation;
