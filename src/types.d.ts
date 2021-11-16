import { MenuItemProps as New } from '@material-ui/core/MenuItem';

declare module '@material-ui/core/MenuItem' {
  export type MenuItemProps = New;
}
