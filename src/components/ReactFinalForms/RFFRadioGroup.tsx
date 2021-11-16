import RadioGroup from '../FormInputs/RadioGroup';
import Field from './Field';

type RFFRadioGroupProps = {
  name: string;
  label: string;
  items: Array<{ label: string; value: string; disabled?: boolean }>;
};

const RFFRadioGroup = ({ name, label, items }: RFFRadioGroupProps) => (
  <Field name={name}>
    {({ input, meta, ...props }: any) => (
      <RadioGroup
        {...props}
        {...input}
        items={items}
        label={label}
        name={input.name}
        value={input.value?.toString()}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        onChange={(event: any) => input.onChange(event.target.value)}
      />
    )}
  </Field>
);

export default RFFRadioGroup;
