import styles from './Icon.module.scss';
import { IconType, iconUrl } from '../../consts/IconsTypes';
import classNames from 'classnames';

interface Props {
  type: IconType;
  size?: 'xs' | 's' | 'm' | 'l';
}

function Icon({ type, size = 'm' }: Props) {
  return <img src={iconUrl[type]} alt={`${type} icon`} className={classNames(styles.icon, styles[size])} />;
}

export default Icon;
