import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useMenuItemsStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuColorActive: {
      color: theme.palette.primary.main,
      fontWeight: theme.typography.fontWeightBold,
    },
    menuItemButton: {
      borderRadius: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(0.5),
      },
    },
    icon: {
      fontSize: '1.5rem',
      minWidth: theme.spacing(5),
    },
    generalMenu: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    rootMenu: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    menuText: {
      fontWeight: theme.typography.fontWeightBold,
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.typography.pxToRem(17),
      },
    },
    bold: {
      fontWeight: theme.typography.fontWeightBold,
    },
    userMenuPaper: {
      transition: theme.transitions.create(['border-radius'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.short,
      }),
      backgroundColor: theme.palette.background.default,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    userMenuPaperOpened: {
      borderRadius: theme.spacing(3.5),
    },
    userMenuPaperClosed: {
      borderRadius: theme.spacing(3.5),
    },

    userMenuItemButton: {
      borderRadius: theme.spacing(3),
      paddingLeft: theme.spacing(1),
    },
    userMenuText: {
      color: theme.palette.text.primary,
    },
    profile: {
      width: theme.spacing(12),
    },
    timeLink: {
      display: 'flex',
      alignItems: 'center',

      '&:hover': {
        color: theme.palette.primary.main,

        '& .timeIcon': {
          opacity: 1,
        },
      },

      '& .timeIcon': {
        opacity: 0,
        fontSize: 16,
        transition: theme.transitions.create(['opacity'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.short,
        }),
      },
    },
  }));

export default useMenuItemsStyles;
