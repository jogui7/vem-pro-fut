import React from 'react';
import MaskedInput, { Mask } from 'react-text-mask';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const CustomTextMask = ({ inputRef, mask, ...props }: InputBaseComponentProps) => (
  <MaskedInput
    {...props}
    ref={(ref) => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={mask}
  />
);

export type MaskedFieldProps = TextFieldProps & {
  mask: Mask | ((value: string) => Mask);
  label: string;
  fullWidth?: boolean;
  variant?: 'filled' | 'outlined' | 'standard';
};

const MaskedField = ({
  fullWidth,
  mask,
  label,
  inputProps,
  InputProps,
  ...props
}: MaskedFieldProps) => (
  <TextField
    fullWidth={fullWidth}
    label={label}
    inputProps={{ mask, ...inputProps }}
    // eslint-disable-next-line react/jsx-no-duplicate-props
    InputProps={{
      endAdornment: InputProps?.endAdornment,
      inputComponent: CustomTextMask,
    }}
    {...props}
  />
);

MaskedField.defaultProps = {
  fullWidth: false,
  variant: 'outlined',
};

export default MaskedField;
