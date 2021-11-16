import { Grid, IconButton, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import * as R from 'ramda';
import { useMemo, useState } from 'react';
import useVemProFutStyles from '../../useVemProFutStyles';

type Value = string | number | any;

const defaultValueToPrimitiveTransformer = (value: Value) => value;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    unselected: {
      color: theme.palette.action.active,
    },
    selected: {
      color: theme.palette.primary.main,
      backgroundColor: `${theme.palette.common.white} !important`,
    },
    clickable: {
      cursor: 'pointer',
    },
    paper: {
      boxShadow: theme.shadows[1],
    },
    menu: {},
  }));

export type DropDownMenuItem = {
  label: string;
  value: Value;
};

export type DropDownMenuProps = {
  options: DropDownMenuItem[];
  valueToPrimitiveTransformer?: (value: Value) => string;
  value?: Value;
  disabled?: boolean;
  onChange?: (item: DropDownMenuItem) => void;
};

const DropDownMenu = ({
  options,
  value,
  disabled,
  valueToPrimitiveTransformer,
  onChange,
}: DropDownMenuProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const vemProFutStyles = useVemProFutStyles();

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (option: any) => {
    (onChange || R.always)(option.value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const valueToPrimitive = (valueToConvert: Value) => {
    const toString = valueToPrimitiveTransformer || defaultValueToPrimitiveTransformer;
    return toString(valueToConvert);
  };

  const selectedOption = useMemo(() => {
    const selected = options.find(
      (item: DropDownMenuItem) =>
        valueToPrimitive(item.value) === valueToPrimitive(value),
    );

    return selected;
  }, [value, options]);

  if (disabled) {
    return (
      <Typography gutterBottom>
        {selectedOption?.label ?? 'selecione'}
      </Typography>
    );
  }
  return (
    <div>
      <Grid
        container
        alignItems="center"
        onClick={handleClickListItem}
        className={classes.clickable}
      >
        <Grid item xs>
          <Typography className={vemProFutStyles.lightText} gutterBottom>
            {selectedOption?.label ?? 'selecione'}
          </Typography>
        </Grid>

        <Grid item xs="auto">
          <IconButton size="small">
            <ExpandMoreRoundedIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        classes={{ paper: classes.paper }}
        onClose={handleClose}
      >
        {options.map(option => (
          <MenuItem
            classes={{ selected: classes.selected, root: classes.unselected }}
            style={{ width: anchorEl?.offsetWidth }}
            key={valueToPrimitive(option.value)}
            selected={
              valueToPrimitive(option.value) === valueToPrimitive(value)
            }
            onClick={() => handleMenuItemClick(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropDownMenu;
