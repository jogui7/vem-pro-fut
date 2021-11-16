import React from 'react';
import { Typography } from '@material-ui/core';
import { KeyboardDatePicker as MuiKeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers';

const KeyboardDatePicker = (props: KeyboardDatePickerProps) => (
  <MuiKeyboardDatePicker
    {...props}
    cancelLabel={<Typography style={{ fontWeight: 600 }} variant="body2" color="textSecondary">cancelar</Typography>}
  />
);

export default KeyboardDatePicker;
