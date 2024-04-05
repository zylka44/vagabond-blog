import Icon from '../Icon/Icon';
import styles from './CheckBox.module.scss';

interface Props {
  label: string;
  onChange: () => void;
  selected?: boolean;
}

function CheckBox({ label, onChange, selected }: Props) {
  return (
    <span className={styles.container} onClick={onChange}>
      <div className={styles.box}>{selected && <Icon type={'close'} size={'s'} />}</div>
      <div>{label}</div>
    </span>
  );
}

export default CheckBox;
