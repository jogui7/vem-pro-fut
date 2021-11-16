import { blue, grey } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const defaultTheme = createTheme();

export const drawerWidth = 230;
export const drawerWidthMobile = 267;
export const titleHeight = 58;

export const vemProFutGrayPrimary = '#424242';
export const vemProFutGraySecondary = '#97999B';
export const vemProFutGrayBackground = '#F2F2F2';

export const vemProFutGreen = '#074233';

export default createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
    fontWeightBold: 600,
  },
  palette: {
    secondary: {
      main: '#3366FF',
      light: blue[500],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    primary: {
      main: vemProFutGreen,
      light: '#045c46',
      dark: '#052e24',
      contrastText: '#ffffff',
    },
    grey,
    text: {
      primary: vemProFutGrayPrimary,
      secondary: vemProFutGraySecondary,
    },
    action: {
      active: vemProFutGraySecondary,
    },
    background: {
      default: vemProFutGrayBackground,
    },
  },
  shape: {
    borderRadius: defaultTheme.spacing(0.5),
  },
  overrides: {
    MuiCircularProgress: {
      circle: {
        strokeLinecap: 'round',
      },
    },

    MuiLinearProgress: {
      bar: {
        strokeLinecap: 'round',
      },
    },

    MuiFormHelperText: {
      contained: { marginLeft: 0 },
    },

    MuiButton: {
      root: {
        borderRadius: defaultTheme.spacing(4),
        textTransform: 'lowercase',
        color: vemProFutGraySecondary,
        borderColor: vemProFutGraySecondary,
        boxShadow: 'none !important',
        '&:hover': {
          boxShadow: 'none !important',
        },
      },
    },
    MuiButtonBase: {
      root: {
        textTransform: 'lowercase',
        color: vemProFutGraySecondary,
        borderColor: vemProFutGraySecondary,
      },
    },
    MuiDialogActions: {
      root: { padding: defaultTheme.spacing(3) },
    },
    MuiFormLabel: {
      root: {
        textTransform: 'lowercase',
      },
    },
    MuiTableRow: {
      root: {
        '&:last-child td': {
          borderBottom: 0,
        },
      },
    },
    MuiTableCell: {
      stickyHeader: {
        backgroundColor: defaultTheme.palette.common.white,
        textTransform: 'lowercase',
      },
      head: {
        fontSize: defaultTheme.typography.body2.fontSize,
        color: vemProFutGraySecondary,
        textTransform: 'lowercase',
      },
      body: {
        '& a': {
          textDecoration: 'none',
          color: vemProFutGrayPrimary,
        },
        '&:hover a': {
          textDecoration: 'none',
          cursor: 'pointer',
          color: vemProFutGreen,
        },
        '&:active a': {
          textDecoration: 'none',
        },
      },
      sizeSmall: {
        paddingTop: defaultTheme.spacing(0.5),
        paddingBottom: defaultTheme.spacing(0.5),
        paddingLeft: defaultTheme.spacing(1.5),
        paddingRight: defaultTheme.spacing(1.5),
      },
    },
    MuiFormControlLabel: {
      root: {
        textTransform: 'lowercase',
      },
    },
    MuiTableContainer: {
      root: {
        width: 'auto',
      },
    },
    MuiTab: {
      root: {
        textTransform: 'lowercase',
        fontSize: '1rem',
      },
    },
  },
});
