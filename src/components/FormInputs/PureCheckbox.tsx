import { Checkbox, CheckboxProps } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

type Props = {
  label: string;
} & Partial<CheckboxProps>;

export default function PureCheckbox({ label, ...props }: Props) {
  return <FormControlLabel control={<Checkbox {...props} color="primary" />} label={label} />;
}
