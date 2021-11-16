import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { InputAdornment, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  addornment: {
    cursor: 'pointer',
    color: theme.palette.action.disabled,
    '&:hover': {
      color: theme.palette.action.active,
    },
  },
}));

type ClearInputAdornmentProps = {
  onClear: (event: any) => void;
};

const ClearInputAdornment = ({ onClear }: ClearInputAdornmentProps) => {
  const classes = useStyles();
  return (
    <InputAdornment position="end" onClick={onClear} className={classes.addornment}>
      <ClearIcon fontSize="small" color="inherit" />
    </InputAdornment>
  );
};

export default ClearInputAdornment;
