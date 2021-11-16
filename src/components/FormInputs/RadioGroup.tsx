import React from 'react';
import Radio from '@material-ui/core/Radio';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { FormControlLabel, Grid } from '@material-ui/core';

export type RadioGroupProps = {
  color: 'primary' | 'secondary';
  column?: boolean;
  error: boolean;
  helperText?: string;
  items: Array<{ label: string; value: string; disabled?: boolean }>;
  label: string;
  name: string;
  defaultValue?: any;
  value: string;
  onChange: any;
  radioLabelPlacement: 'start' | 'end' | 'bottom' | 'top';
};

const RadioGroup = ({
  color,
  column,
  defaultValue,
  error,
  helperText,
  items,
  label,
  name,
  radioLabelPlacement,
  value,
  onChange,
}: RadioGroupProps) => (
  <FormControl error={error} component="fieldset" fullWidth>
    <FormLabel color={color} component="legend">
      {label}
    </FormLabel>
    <MuiRadioGroup
      row={!column}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      name={name}
    >
      <Grid container>
        {items.map((item) => (
          <Grid item xs sm="auto">
            <FormControlLabel
              key={item.value}
              value={item.value}
              control={<Radio color={color} />}
              label={item.label}
              labelPlacement={radioLabelPlacement}
              disabled={item.disabled}
            />
          </Grid>
        ))}
      </Grid>
    </MuiRadioGroup>
    <FormHelperText>{helperText}</FormHelperText>
  </FormControl>
);

RadioGroup.defaultProps = {
  error: false,
  color: 'primary',
  radioLabelPlacement: 'end',
  column: false,
  name: '',
};

export default RadioGroup;
