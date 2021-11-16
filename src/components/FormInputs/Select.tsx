import React from 'react';
import MuiSelect, { SelectProps as MuiSelectProps } from '@material-ui/core/Select';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import InputLabel, { InputLabelProps } from '@material-ui/core/InputLabel';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

export type SelectProps = MuiSelectProps & {
  disabled: boolean;
  helperText: string;
  error: boolean;
  fullWidth: boolean;
  label: string;
  showEmpty?: boolean;
  emptyLabel?: string;
  items?: Array<{ value: string | number | string[]; label: string }>;
  inputLabelProps?: InputLabelProps;
  formControlProps?: FormControlProps;
  menuItemProps?: MenuItemProps;
};

const Select = ({
  children,
  disabled,
  helperText,
  error,
  fullWidth,
  label,
  items,
  formControlProps,
  variant,
  onBlur,
  inputLabelProps,
  showEmpty,
  emptyLabel = 'selecione',
  menuItemProps,
  ...props
}: SelectProps) => (
  <FormControl
    {...formControlProps}
    error={error}
    fullWidth={fullWidth}
    variant={variant}
    disabled={disabled}
  >
    <InputLabel {...inputLabelProps}>{label}</InputLabel>
    <MuiSelect
      fullWidth={fullWidth}
      variant={variant}
      label={label}
      onBlur={onBlur}
      disabled={disabled}
      {...props}
    >
      {showEmpty && (
        <MenuItem value="" {...menuItemProps}>
          {emptyLabel}
        </MenuItem>
      )}
      {children
        || items?.map((item) => (
          <MenuItem value={item.value} {...menuItemProps}>
            {item.label}
          </MenuItem>
        ))}
    </MuiSelect>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

Select.defaultProps = {
  showEmpty: false,
  emptyLabel: 'selecione',
  disabled: false,
  helperText: '',
  label: '',
  items: [],
  fullWidth: false,
  error: false,
  menuItemProps: undefined,
};

export default Select;
