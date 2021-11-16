import React from 'react';
import { FieldRenderProps } from 'react-final-form';
import CheckBox from '../FormInputs/CheckBox';
import Field from './Field';

type RFFCheckboxProps = {
  name: string;
  disabled?: boolean;
  label: string;
  color?: 'primary' | 'secondary';
  defaultValue?: boolean;
};

const RFFCheckbox = ({
  name, color, disabled, label, defaultValue,
}: RFFCheckboxProps) => (
  <Field name={name} type="checkbox" defaultValue={defaultValue}>
    {({ input, meta, ...props }: FieldRenderProps<string, HTMLButtonElement>) => (
      <CheckBox
        {...input}
        {...props}
        color={color || 'primary'}
        label={label}
        disabled={disabled}
        onChange={input.onChange}
        checked={input.checked === true}
        helperText={meta.touched && meta.error}
        error={meta.touched && !!meta.error}
      />
    )}
  </Field>
);

RFFCheckbox.defaultProps = {
  disabled: false,
  color: 'primary',
  defaultValue: false,
};

export default RFFCheckbox;
