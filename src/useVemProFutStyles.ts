import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { vemProFutGreen, titleHeight, vemProFutGrayBackground } from './Theme';

export const upperTitleSize = 10;

const usevemProFutStyles = makeStyles(
  (theme: Theme) =>
    createStyles({
      clickable: {
        cursor: 'pointer',
      },
      primary: {
        color: theme.palette.primary.main,
      },
      secondary: {
        color: theme.palette.secondary.main,
      },
      tertiary: {
        color: vemProFutGreen,
      },
      noPaddingX: {
        paddingRight: 0,
        paddingLeft: 0,
      },
      noPaddingY: {
        paddingBottom: 0,
        paddingTop: 0,
      },
      appWrapFullContent: {
        marginLeft: theme.spacing(-3),
        marginRight: theme.spacing(-3),
        marginTop: theme.spacing(-3),
      },
      upperTitle: {
        fontSize: upperTitleSize,
        color: theme.palette.grey[600],
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontWeight: 300,
      },
      noTextTransform: {
        textTransform: 'none',
        '& .MuiButtonBase-root': {
          textTransform: 'none',
        },
      },
      lowercase: {
        textTransform: 'lowercase',
      },
      uppercase: {
        textTransform: 'uppercase',
      },
      capitalize: {
        textTransform: 'capitalize',
      },
      lightText: {
        fontWeight: 200,
      },
      regularText: {
        fontWeight: 400,
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
      tab: {
        paddingLeft: 0,
        paddingRight: 0,
        marginRight: theme.spacing(2),
        justifyContent: 'flex-start',
        lineHeight: 1.65,
        minHeight: 48,
        minWidth: 35,
      },
      tabCentered: {
        lineHeight: 1.65,
        minHeight: theme.spacing(6),
        minWidth: theme.spacing(13),
      },
      tabWrapper: {
        width: 'auto',
      },
      tabSelected: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,

        '& .MuiTypography-root': {
          fontWeight: `${theme.typography.fontWeightBold} !important`,
        },
      },
      tabLabel: {
        display: 'flex',
        alignItems: 'center',
      },
      tabPaddings: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(2),
      },
      tag: {
        borderRadius: theme.spacing(2),
        fontSize: theme.typography.caption.fontSize,
        height: theme.spacing(3),
        paddingInline: theme.spacing(0.5),
      },
      tagMargins: {
        marginBottom: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
      },
      tagOpacity: {
        opacity: 0.8,
        transition: 'opacity 0.5s ease',
        '&:hover': {
          opacity: 1,
        },
      },
      tableContainerOptimezedToMargin: {
        '& .MuiTableRow-root': {
          height: theme.spacing(7),
          '& .MuiTableCell-root:first-child': {
            paddingLeft: theme.spacing(1),
          },
          '& .MuiTableCell-root:last-child': {
            paddingRight: theme.spacing(1),
          },
        },
      },
      addButtonMargin: {
        marginBottom: theme.spacing(12),
      },
      tableContainer: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        '& .MuiTableRow-root': {
          height: theme.spacing(6),
          '& .MuiTableCell-root:first-child': {
            paddingLeft: theme.spacing(1),
          },
          '& .MuiTableCell-root:last-child': {
            paddingRight: theme.spacing(1),
          },
        },
      },
      tableRow: {
        '& .tableRowHoverAction': {
          transition: theme.transitions.create(['opacity'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.short,
          }),
          opacity: 0,
        },

        '&:hover': {
          '& .tableRowHoverAction': {
            opacity: 1,
          },
        },
      },
      tableRowHoverAction: {},

      tableTextAction: {
        '&:hover': {
          textDecoration: 'underline',
          textDecorationColor: theme.palette.text.secondary,
        },
        cursor: 'pointer',
      },
      tableCellAction: {
        padding: 0,
      },
      prependItem: {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      },
      appendItem: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        marginLeft: -1,
      },
      buttonGroupedToInput: {
        height: theme.spacing(5),
      },
      connectedBadge: {
        backgroundColor: vemProFutGreen,
        height: theme.spacing(1.5),
      },
      titleContainer: {
        height: titleHeight,
      },
      graySection: {
        backgroundColor: vemProFutGrayBackground,
      },
      verticalFlip: {
        transform: 'scaleY(-1)',
      },
      checkboxLabel: {
        margin: 0,
        lineHeight: 1,
      },
      tabSelectSize: {
        width: theme.spacing(5),
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
      dashedBorder: {
        border: '2px dashed',
        borderColor: theme.palette.primary.main,
      },
      subAppBar: {
        borderTop: `1px solid ${theme.palette.grey[300]}`,
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        marginTop: theme.spacing(7),
        zIndex: 1000,
        [theme.breakpoints.only('sm')]: {
          marginTop: theme.spacing(8),
        },
      },
    }),
  { classNamePrefix: 'vemProFut' },
);

export default usevemProFutStyles;
