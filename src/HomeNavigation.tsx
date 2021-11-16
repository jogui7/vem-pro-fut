import { Box } from '@material-ui/core';
import { Route, Redirect, Switch } from 'react-router-dom';
import AppWrap from './components/AppWrap/AppWrap';
import useMenuItems from './components/AppWrap/useMenuItems';

const HomeNavigation = () => {
  const menuItems = useMenuItems();
  return (
    <AppWrap menuItems={menuItems}>
      <Switch>
        <Route path="/feed" exact component={() => (<Box>aaaa</Box>)} />
        <Redirect to="/" />
      </Switch>
    </AppWrap>
  );
};

export default HomeNavigation;
