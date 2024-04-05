import { ChangeEvent } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';

interface Props {
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  width?: string;
  noBorder?: boolean;
  uppercase?: boolean;
  autoFocus?: boolean;
  autocomplete?: string;
  type?: 'text' | 'password';
}

function Input({
  name,
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  width,
  noBorder,
  uppercase,
  autoFocus = true,
  autocomplete = 'off',
  type = 'text',
}: Props) {
  return (
    <input
      className={classNames(styles.input, { [styles.noBorder]: noBorder }, { [styles.uppercase]: uppercase })}
      autoFocus={autoFocus}
      name={name}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      placeholder={placeholder}
      type={type}
      style={{ width }}
      autoComplete={autocomplete}
    />
  );
}

export default Input;
