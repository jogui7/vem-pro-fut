type DatePickerConfig = {
  size: 'small' | 'medium';
  inputVariant: 'outlined';
  variant: 'dialog';
  fullWidth: boolean;
  format: string;
  cancelLabel: string;
  clearLabel: string;
  okLabel: string;
  ampm: boolean;
  InputLabelProps: {
    shrink: boolean;
  };
};

const datePickerConfig: DatePickerConfig = {
  size: 'small',
  variant: 'dialog',
  inputVariant: 'outlined',
  fullWidth: true,
  format: 'LL, HH:mm[h]',
  cancelLabel: 'Cancelar',
  clearLabel: 'Limpar',
  okLabel: 'OK',
  ampm: false,
  InputLabelProps: {
    shrink: true,
  },
};
export default datePickerConfig;
