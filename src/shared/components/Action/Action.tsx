import styles from './Action.module.scss';
import _ from 'lodash';
import { IconType, iconUrl } from '../../consts/IconsTypes';
import classNames from 'classnames';

interface Props {
  type: IconType;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  size?: 'xs' | 's' | 'm' | 'l';
  externalLink?: string;
}

function Action({ type, onClick, size = 'm', externalLink }: Props) {
  return !_.isEmpty(externalLink) ? (
    <a href={externalLink} target="_blank">
      <img
        src={iconUrl[type]}
        alt={`${type} icon`}
        className={classNames(styles.action, styles[size], styles.active)}
      />
    </a>
  ) : (
    <img
      src={iconUrl[type]}
      alt={`${type} icon`}
      className={classNames(styles.action, styles[size], { [styles.active]: !_.isNil(onClick) })}
      onClick={onClick}
    />
  );
}

export default Action;
