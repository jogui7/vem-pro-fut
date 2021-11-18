import React from 'react';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FieldValidator } from 'final-form';
import { Field } from 'react-final-form';
import { DateTimePickerProps } from '@material-ui/pickers';
import DatePicker from '../FormInputs/DatePicker';

type RFFDatePickerProps = {
  name: string;
  validate?: FieldValidator<Date | string | null>;
  fullWidth?: boolean;
  value?: Date | null;
  onChange?: (date: MaterialUiPickersDate) => void;
  valueFormatter?: (date: MaterialUiPickersDate) => string | null;
  inputVariant?: 'standard' | 'outlined' | 'filled';
  variant?: 'dialog' | 'inline' | 'static';
} & DateTimePickerProps;

const RFFDatePicker = ({
  name, validate, valueFormatter, ...otherProps
}: RFFDatePickerProps) => (
  <Field name={name} validate={validate}>
    {({ input, meta, ...props }) => (
      <DatePicker
        {...input}
        {...props}
        {...otherProps}
        name={name}
        value={input.value || null}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        onChange={(date: MaterialUiPickersDate) => (
          input.onChange(valueFormatter ? valueFormatter(date) : date)
        )}
        onBlur={input.onBlur}
      />
    )}
  </Field>
);

RFFDatePicker.defaultProps = {
  inputVariant: 'outlined',
  variant: 'inline',
  fullWidth: false,
  value: null,
  onChange: () => {},
  valueFormatter: (date: MaterialUiPickersDate) => date,
  validate: () => {},
};

export default RFFDatePicker;
