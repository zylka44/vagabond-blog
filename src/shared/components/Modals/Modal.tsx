import styles from './Modal.module.scss';
import _ from 'lodash';
import Action from '../Action/Action';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode;
  onCloseClick?: () => void;
  fullpage?: boolean;
}

function Modal({ children, onCloseClick, fullpage }: Props) {
  return (
    <div className={classNames(styles.container, { [styles.fullpage]: fullpage })}>
      {children}
      {!_.isNil(onCloseClick) && (
        <div className={styles.close}>
          <Action type="close" onClick={onCloseClick} size="s" />
        </div>
      )}
    </div>
  );
}

export default Modal;
