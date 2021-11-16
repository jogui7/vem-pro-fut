import { FocusEvent } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { FieldRenderProps } from 'react-final-form';
import Field from './Field';

export type RFFTextFieldProps = TextFieldProps & {
  name: string;
  label: string;
  fullWidth: boolean;
  placeholder?: string;
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

const RFFTextField = ({
  fullWidth,
  label,
  name,
  ...others
}: RFFTextFieldProps) => (
  <Field name={name}>
    {({
      input,
      meta,
      ...props
    }: FieldRenderProps<string, HTMLInputElement | HTMLTextAreaElement>) => (
      <TextField
        {...input}
        {...props}
        {...others}
        fullWidth={fullWidth}
        label={label}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        onBlur={event => handleOnBlur(event, [input.onBlur, others.onBlur])}
      />
    )}
  </Field>
);

RFFTextField.defaultProps = {
  fullWidth: false,
  endAdornment: 'disabled',
  label: '',
};

export default RFFTextField;
