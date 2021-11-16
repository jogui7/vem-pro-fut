import { createStyles, Theme } from '@material-ui/core/styles';
import { drawerWidth, drawerWidthMobile } from '../../Theme';

const ApplicationStyles = (theme: Theme) =>
  createStyles({
    appBar: {
      background: theme.palette.common.white,
      width: '100%',
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      '& > div': {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
          padding: 0,
        },
      },
    },
    toolsLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    appBarShift: {
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },

    drawerPaper: {
      position: 'relative',
      height: '100%',
      width: drawerWidth,
      borderRadius: 0,
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.complex,
      }),
      [theme.breakpoints.down('xs')]: {
        width: drawerWidthMobile,
      },
    },
    drawerInner: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: drawerWidth,
      [theme.breakpoints.down('xs')]: {
        width: drawerWidthMobile,
      },
    },
    menus: {
      flex: 1,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(4),
      ...theme.mixins.toolbar,
      [theme.breakpoints.down('xs')]: {
        maxHeight: theme.spacing(11),
        marginBottom: theme.spacing(3),
      },
    },
    drawerLogo: {
      width: 126,
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(20),

        marginTop: theme.spacing(3),
      },
    },
    fullHeight: {
      height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    },
    menuColor: {
      color: theme.palette.text.secondary,
    },
    icon: {
      fontSize: '1.5rem',
    },
    searchInput: {
      alignItems: 'flex-end',
      '& .MuiOutlinedInput-root': {
        borderRadius: theme.spacing(3),
        backgroundColor: theme.palette.background.default,
        width: 'fit-content',
        [theme.breakpoints.down('xs')]: {
          width: '100%',
          height: theme.spacing(4.5),
        },
      },
      '& fieldset': {
        border: 'none',
      },
      '& input': {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(16),
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.typography.body2.fontSize,
        },
      },

      '& input:focus': {
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(30),
        },
      },
    },

    actions: {
      color: theme.palette.action.active,
    },
  });

export default ApplicationStyles;
