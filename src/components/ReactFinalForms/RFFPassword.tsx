import { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { VisibilityOff, Visibility } from '@material-ui/icons';

import { TextFieldProps } from '@material-ui/core';
import RFFTextField from './RFFTextField';

type RFFPasswordProps = {
  name?: string;
  label: string;
} & Omit<TextFieldProps, 'type'>;

const RFFPassword = ({ name, label, ...rest }: RFFPasswordProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RFFTextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      name={name || 'password'}
      {...rest}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={e => e.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

RFFPassword.defaultProps = {
  name: 'password',
};

export default RFFPassword;
