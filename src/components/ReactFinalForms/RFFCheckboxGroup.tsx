import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import { useField } from 'react-final-form';
import RFFCheckbox from './RFFCheckbox';

type RFFCheckboxGroupProps = {
  color?: 'primary' | 'secondary';
  label: string;
  name: string;
  items: Array<{ label: string; value: string; disabled?: boolean }>;
  fullWidth?: boolean;
};

const formatError = (error: any) => {
  if (!error) {
    return error;
  }

  if (typeof error === 'string') {
    return error;
  }

  return Object.values(error).join('. ');
};

const RFFCheckboxGroup = ({
  label, name, items, color, fullWidth,
}: RFFCheckboxGroupProps) => {
  const field = useField(name);
  return (
    <FormControl
      fullWidth={fullWidth}
      error={field?.meta.touched && field?.meta.error}
      component="fieldset"
    >
      <FormLabel>{label}</FormLabel>
      <FormGroup row>
        {items.map((item: any) => (
          <RFFCheckbox
            key={item.value}
            label={item.label}
            color={color || 'primary'}
            name={`${name}.${item.value}`}
            disabled={item.disabled}
          />
        ))}
      </FormGroup>
      {field?.meta.touched && field?.meta.error && (
        <FormHelperText>{formatError(field?.meta.error)}</FormHelperText>
      )}
    </FormControl>
  );
};

RFFCheckboxGroup.defaultProps = {
  color: 'primary',
  fullWidth: false,
};

export default RFFCheckboxGroup;
