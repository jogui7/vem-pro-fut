import React, { ChangeEvent } from 'react';

type PickImageProps = {
  children: React.ReactNode;
  accept?: string;
  multiple?: boolean;
  onChange: (file: File[]) => void;
  id: string;
  disabled?: boolean;
};

export default function PickMedia({
  children,
  accept,
  multiple,
  onChange,
  id,
  ...props
}: PickImageProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    onChange(files ? Array.from(files) : []);
    // eslint-disable-next-line no-param-reassign
    event.target.value = '';
  };
  return (
    <div>
      <input
        accept={accept}
        style={{ display: 'none' }}
        id={id}
        multiple={multiple}
        onChange={handleChange}
        type="file"
        {...props}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}

PickMedia.defaultProps = {
  accept: 'image/*,video/*',
  multiple: false,
  disabled: false,
};
