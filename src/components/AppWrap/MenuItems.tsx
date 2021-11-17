import {
  Avatar, Box, Collapse, Grid, Tooltip, Typography,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import classnames from 'classnames';
import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useFirebase from '../../hooks/useFirebase';
import { formatCompleteName } from '../../utils/formatters';
import { MenuItemModel } from './appWrap.types';
import useMenuItemsStyles from './menuItemsStyles';
import { useApplicationContext } from '../../modules/context/ApplicationContext';

type MenuItemsProps = {
  items: MenuItemModel[];
};

const MenuItems = ({ items }: MenuItemsProps) => {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const classes = useMenuItemsStyles();
  const { auth } = useFirebase();
  const { state } = useApplicationContext();
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    await signOut(auth);
    history.push('/login');
  };

  const renderListItem = (item: any) => {
    const active = `/${location.pathname.split('/')[1]}` === item.pathname.split('?')[0]
      || location.pathname === item.pathname;

    const activeColor = classes.menuColorActive;

    return (
      <React.Fragment key={item.label}>
        <ListItem
          style={{ paddingLeft: 28 }}
          button
          classes={{ button: classes.menuItemButton }}
          component={Link}
          to={item.pathname}
        >
          <ListItemIcon classes={{ root: classnames(classes.icon, active ? activeColor : '') }}>
            <item.icon />
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            classes={{ primary: classnames(active ? activeColor : '', classes.menuText) }}
          />
        </ListItem>
      </React.Fragment>
    );
  };

  return (
    <>
      <div className={classes.rootMenu}>
        <div className={classes.generalMenu}>
          <List component="nav" style={{ width: '100%' }} dense>
            {items.map(renderListItem)}
          </List>
        </div>
        <div>
          <Box p={2}>
            <Paper
              className={classnames(
                classes.userMenuPaper,
                userMenuOpened ? classes.userMenuPaperOpened : classes.userMenuPaperClosed,
              )}
              elevation={0}
            >
              <Box p={1} pb={1}>
                <Grid
                  container
                  alignItems="center"
                  spacing={1}
                  style={{ cursor: 'pointer' }}
                  wrap="nowrap"
                  onClick={() => setUserMenuOpened(!userMenuOpened)}
                >
                  <Grid item xs="auto">
                    <Avatar alt="profile" src={state.user?.avatar}>
                      {state?.user?.name && state.user.name[0]}
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Grid container alignItems="center">
                      <Grid item xs={12}>
                        <Tooltip
                          className={classnames(classes.bold, classes.profile)}
                          title={formatCompleteName(state.user?.name)}
                          titaria-label={formatCompleteName(state.user?.name)}
                        >
                          <Typography>{formatCompleteName(state.user?.name)}</Typography>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Collapse timeout="auto" in={userMenuOpened}>
                  <List component="nav" dense>
                    <ListItem
                      button
                      color="primary"
                      classes={{ button: classes.userMenuItemButton }}
                      onClick={handleLogout}
                    >
                      <ListItemIcon classes={{ root: classes.icon }}>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText classes={{ root: classes.userMenuText }} primary="sair" />
                    </ListItem>
                  </List>
                </Collapse>
              </Box>
            </Paper>
          </Box>
        </div>
      </div>
    </>
  );
};

export default MenuItems;
