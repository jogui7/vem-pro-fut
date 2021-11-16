/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { makeStyles } from '@material-ui/core';
import React, { ReactNode, SyntheticEvent } from 'react';
import classNames from 'classnames';

const useMediaActionStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.action.active,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

type MediaActionButtonType = {
  children: ReactNode;
  onClick?: (evt: SyntheticEvent) => void;
  className?: string;
};

const MediaActionButton = ({ children, className, onClick }: MediaActionButtonType) => {
  const classes = useMediaActionStyles();
  const handleClick = (event: SyntheticEvent) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <div className={classNames(classes.button, className || 'ActionButton')} onClick={handleClick}>
      {children}
    </div>
  );
};

MediaActionButton.defaultProps = {
  onClick: null,
  className: null,
};

export default MediaActionButton;
