import React from 'react';
import { Field } from 'react-final-form';
import DropDownMenu, { DropDownMenuProps } from '../FormInputs/DropDownMenu';

type RFFDropDownMenuProps = {
  name: string;
} & DropDownMenuProps;

const RFFDropDownMenu = ({ name, ...rest }: RFFDropDownMenuProps) => (
  <Field name={name}>
    {({ input }) => <DropDownMenu {...rest} onChange={input.onChange} value={input.value} />}
  </Field>
);

export default RFFDropDownMenu;
