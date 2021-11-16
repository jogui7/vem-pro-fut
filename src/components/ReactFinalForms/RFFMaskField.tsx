import React, { FocusEvent } from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import { Field } from 'react-final-form';
import MaskedField from '../FormInputs/MaskedField';

export type RFFMaskFieldProps = TextFieldProps & {
  name: string;
  label: string;
  fullWidth: boolean;
  placeholder?: string;
  mask: (string | RegExp)[] | ((value: string) => (string | RegExp)[]);
};

const handleOnBlur = (
  event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  callbacks: (Function | undefined)[],
) => {
  for (let index = 0; index < callbacks.length; index += 1) {
    const callback = callbacks[index];
    if (callback) {
      callback(event);
    }
  }
};

const RFFMaskField = ({
  fullWidth, label, name, ...others
}: RFFMaskFieldProps) => (
  <Field name={name}>
    {({ input, meta, ...props }) => (
      <MaskedField
        {...input}
        {...props}
        {...others}
        fullWidth={fullWidth}
        label={label}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        onBlur={(event) => handleOnBlur(event, [input.onBlur, others.onBlur])}
      />
    )}
  </Field>
);

RFFMaskField.defaultProps = {
  fullWidth: false,
  endAdornment: 'disabled',
  label: '',
};

export default RFFMaskField;
