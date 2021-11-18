import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { vemProFutGreen } from './Theme';

export const upperTitleSize = 10;

const useVemProFutStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      primary: {
        color: theme.palette.primary.main,
      },
      secondary: {
        color: theme.palette.secondary.main,
      },
      tertiary: {
        color: vemProFutGreen,
      },
      boldText: {
        fontWeight: 600,
      },
      borderRadius: {
        borderRadius: theme.shape.borderRadius,
      },
      scrolledContainer: {
        overflow: 'visible',
        overflowY: 'auto',
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent',
        },
        '&:hover': {
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.grey[300],
          },
        },
      },
      container: {
        padding: theme.spacing(3),
      },
      link: {
        textDecoration: 'none',
        color: theme.palette.text.primary,
      },
      linkDisguised: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          color: theme.palette.text.primary,
        },
      },
    }),
  { classNamePrefix: 'vemProFut' },
);

export default useVemProFutStyles;
