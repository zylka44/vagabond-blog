import classNames from 'classnames';
import styles from './Pin.module.scss';

interface Props {
  coordinates: { top: string; left: string };
  label: string;
  isPinHovered: boolean;
  onPinClick: () => void;
  onPinOver: () => void;
}

function Pin({ coordinates, label, isPinHovered, onPinClick, onPinOver }: Props) {
  const top = `${coordinates.top}%`;
  const left = `${coordinates.left}%`;

  return (
    <div
      className={classNames(
        styles.container,
        { [styles.hovered]: isPinHovered },
        { [styles.notHovered]: !isPinHovered }
      )}
      style={{ top, left }}
      onClick={onPinClick}
      onMouseOver={onPinOver}
    >
      <div className={styles.photoContainer}>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}

export default Pin;
