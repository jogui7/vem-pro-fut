import { always } from 'ramda';
import CheckIcon from '@material-ui/icons/Check';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import React, { useEffect } from 'react';
import { green, red } from '@material-ui/core/colors';
import classnames from 'classnames';
import { CircularProgress, makeStyles } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  startAddornment: {
    marginRight: theme.spacing(1),
  },
  successButton: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: green[500],
    },
    color: theme.palette.common.white,
  },
  errorButton: {
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[500],
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: red[500],
    },
    color: theme.palette.common.white,
  },
}));

export type ButtonStatusVariant = 'normal' | 'loading' | 'success' | 'error';

type ButtonWithFeedbackProps = {
  loadingLabel?: string;
  successLabel?: string;
  errorLabel?: string;
  status?: ButtonStatusVariant;
  onStatusShowed?: (lastStatus: ButtonStatusVariant) => void;
} & ButtonProps;

const ButtonWithFeedback = (props: ButtonWithFeedbackProps) => {
  const classes = useStyles();
  const {
    children,
    loadingLabel = 'Aguarde...',
    successLabel = 'Sucesso',
    errorLabel = 'Erro!',
    status = 'normal',
    onStatusShowed = always,
    ...rest
  } = props;

  useEffect(() => {
    if (status === 'normal') {
      return;
    }

    const handleStatusChanged = () => {
      onStatusShowed(status);
    };

    const statusChangeTimeout = setTimeout(handleStatusChanged, 2000);
    // eslint-disable-next-line consistent-return
    return () => clearTimeout(statusChangeTimeout);
  }, [status, onStatusShowed]);

  return {
    normal: (
      <Button {...rest} className={classnames(classes.button, rest.className)}>
        {children}
      </Button>
    ),
    loading: (
      <Button
        {...rest}
        startIcon={<CircularProgress size={16} className={classes.startAddornment} />}
        disabled
        className={classnames(classes.button, rest.className)}
      >
        {loadingLabel}
      </Button>
    ),
    success: (
      <Button
        {...rest}
        startIcon={<CheckIcon className={classes.startAddornment} />}
        className={classnames(classes.successButton, classes.button, rest.className)}
      >
        {successLabel || children}
      </Button>
    ),
    error: (
      <Button
        {...rest}
        startIcon={<InfoOutlinedIcon className={classes.startAddornment} />}
        className={classnames(classes.errorButton, classes.button, rest.className)}
      >
        {errorLabel || children}
      </Button>
    ),
  }[status];
};

ButtonWithFeedback.defaultProps = {
  loadingLabel: 'Aguarde...',
  successLabel: 'Sucesso',
  errorLabel: 'Erro!',
  status: 'normal',
  onStatusShowed: always,
};

export default ButtonWithFeedback;
