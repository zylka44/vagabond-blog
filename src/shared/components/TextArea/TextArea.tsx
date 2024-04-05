import { ChangeEvent } from 'react';
import styles from './TextArea.module.scss';
import classNames from 'classnames';

interface Props {
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: () => void;
  placeholder?: string;
  maxLength?: number;
  noBorder?: boolean;
  uppercase?: boolean;
  autoFocus?: boolean;
}

function TextArea({
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  noBorder,
  uppercase,
  autoFocus = true,
}: Props) {
  return (
    <textarea
      className={classNames(styles.textarea, { [styles.noBorder]: noBorder }, { [styles.uppercase]: uppercase })}
      name={name}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      autoFocus={autoFocus}
    />
  );
}

export default TextArea;
