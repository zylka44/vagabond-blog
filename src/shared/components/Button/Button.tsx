import classNames from 'classnames';
import { IconType, iconUrl } from '../../consts/IconsTypes';
import styles from './Button.module.scss';
import _ from 'lodash';

interface Props {
  text: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  size?: 's' | 'm';
  type?: 'basic' | 'basicDarker' | 'color' | 'transparent' | 'transparentColor';
  iconType?: IconType;
}

function Button({ text, onClick, size = 'm', type = 'basic', iconType }: Props) {
  return (
    <button className={classNames(styles.button, styles[size], styles[type])} onClick={onClick}>
      {text}
      {!_.isNil(iconType) && <img src={iconUrl[iconType]} alt={`${iconType} icon`} className={styles.icon} />}
    </button>
  );
}

export default Button;
