import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import { Checkbox, CheckboxProps, FormControl } from '@material-ui/core';
import FormHelperText from '@material-ui/core/FormHelperText';

export type CheckBoxProps = {
  color: 'primary' | 'secondary';
  checked: boolean;
  disabled: boolean;
  error: boolean;
  helperText?: string;
  label?: string;
  onChange: (event: React.ChangeEvent<{}>, checked: boolean) => void;
} & CheckboxProps;

const CheckBox = ({
  color,
  checked,
  disabled,
  error,
  helperText,
  label,
  onChange,
  ...props
}: CheckBoxProps) => (
  <FormControl error={error} component="fieldset">
    <FormGroup>
      <FormControlLabel
        disabled={disabled}
        control={<Checkbox color={color} checked={checked} disabled={disabled} {...props} />}
        label={label}
        onChange={onChange}
      />
    </FormGroup>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

CheckBox.defaultProps = {
  disabled: false,
  error: false,
};

export default CheckBox;
