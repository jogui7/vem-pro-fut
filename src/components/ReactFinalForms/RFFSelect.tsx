import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import Select, { SelectProps } from '../FormInputs/Select';
import Field from './Field';

type RFFSelectProps = SelectProps & {
  name: string;
  defaultValue?: any;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  showEmpty?: boolean;
  emptyLabel?: string;
};

const RFFSelect = ({ defaultValue, name, ...other }: RFFSelectProps) => (
  <Field defaultValue={defaultValue} name={name}>
    {({
      input,
      meta,
      ...props
    }: FieldRenderProps<string, HTMLInputElement | HTMLTextAreaElement>) => (
      <Select
        {...input}
        {...props}
        {...other}
        error={meta.error && meta.touched}
        value={input.value}
        onChange={input.onChange}
        onBlur={input.onBlur}
        helperText={meta.touched && meta.error}
      />
    )}
  </Field>
);

RFFSelect.defaultProps = {
  defaultValue: null,
  disabled: false,
  error: false,
  helperText: '',
  variant: 'outlined',
  showEmpty: false,
  emptyLabel: 'selecione',
};

export default RFFSelect;
