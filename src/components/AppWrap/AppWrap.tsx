import {
  AppBar, Divider, Drawer, Grid, List, Toolbar, Tooltip,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../Logo';
import { MenuItemModel } from './appWrap.types';
import styles from './AppWrapStyles';
import MenuItems from './MenuItems';

const useStyles = makeStyles(styles);

type AppWrapProps = {
  children: React.ReactNode;
  menuItems: MenuItemModel[];
};

const AppWrap = ({ children, menuItems }: AppWrapProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const location = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  const updateDimensions = useCallback(() => {
    if (window.innerWidth < theme.breakpoints.values.md) {
      setOpen(false);
    }
  }, [theme.breakpoints.values.md]);

  // const handleMenuItemClick = (label: any) => {
  //   if (label) setOpen(true);
  // };

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions]);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <>
      <AppBar
        id="measures--app-bar"
        elevation={0}
        className={classNames(classes.appBar, open && classes.appBarShift)}
        color="inherit"
        position="fixed"
      >
        <Toolbar disableGutters>
          <Grid container spacing={1} alignItems="center" wrap="nowrap">
            <Grid item xs="auto" className={classNames(classes.toolsLeft)}>
              <Tooltip
                title={open ? 'Retrair menu' : 'Expandir menu'}
                aria-label={open ? 'Retrair menu' : 'Expandir menu'}
              >
                <IconButton aria-label="open drawer" onClick={toggleMenu}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            {/* <Grid item xs>
              <Grid container spacing={1} alignItems="center" wrap="nowrap">
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    justify="flex-end"
                    spacing={1}
                    wrap="nowrap"
                  >
                    <Grid item xs>
                      <SearchProduct classes={classes as ClassNameMap<'searchInput'>} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid> */}
          </Grid>
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer onClose={() => setOpen(false)} open={open} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <div className={classes.drawerLogo}>
              <Logo primary />
            </div>
          </div>
          <List disablePadding className={classes.menus}>
            <MenuItems
              items={menuItems}
            />
          </List>
        </div>
      </Drawer>

      <main ref={mainRef} key={location.pathname} className={classes.fullHeight}>
        {children}
      </main>
    </>
  );
};

export default AppWrap;
