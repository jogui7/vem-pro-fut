import { KeyboardDatePicker, KeyboardDatePickerProps, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core';
import classnames from 'classnames';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';

const useStyles = makeStyles(() => ({
  root: {
    '& > .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0,
    },
  },
  dialog: {
    '& .MuiDialogActions-spacing > :first-child': {
      color: '#97999B !important',
    },
  },
}));

const DatePicker = ({ className, ...props }: KeyboardDatePickerProps) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="pt-br">
      <KeyboardDatePicker
        {...props}
        DialogProps={{ className: classes.dialog }}
        className={classnames(classes.root, className)}
      />
    </MuiPickersUtilsProvider>
  );
};
export default DatePicker;
