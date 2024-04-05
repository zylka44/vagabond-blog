import styles from './MenuItem.module.scss';
import _ from 'lodash';
import { IconType, iconUrl } from '../../../consts/IconsTypes';

export type TopMenuItemType = { key: string; label?: string; iconType?: IconType; onClick?: () => void };

interface Props {
  item: TopMenuItemType;
}

function MenuItem({ item }: Props) {
  return (
    <div className={styles.container} onClick={item.onClick}>
      {!_.isNil(item.iconType) && <img src={iconUrl[item.iconType]} alt={`${item.iconType} icon`} />}
      {!_.isNil(item.label) && <span className={styles.itemLabel}>{item.label}</span>}
    </div>
  );
}

export default MenuItem;
