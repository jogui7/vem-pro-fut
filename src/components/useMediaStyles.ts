import { makeStyles } from '@material-ui/core/styles';

export const imageAspectioRatio = 0.791;
export const myNetworkCardAspectRatio = 1.8;

export const buildMediaActionStyles = () => ({
  '& .ActionButton': {
    zIndex: 999,
    transition: 'opacity 0.2s ease-out',
  },
  '&:hover': {
    '& .ActionButton': {
      opacity: 1,
    },
  },
});

const useMediaStyles = makeStyles((theme) => ({
  cardMedia: {
    height: 0,
  },
  root: {
    position: 'relative',
    ...buildMediaActionStyles(),
    [theme.breakpoints.up('sm')]: {
      '& .ActionButton': {
        opacity: 0,
      },
    },
  },

  mediaControlsTop: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageOrVideoCover: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    'aspect-ratio': imageAspectioRatio,
  },
  imageOrVideoContain: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    'aspect-ratio': 1,
  },
}));

export default useMediaStyles;
