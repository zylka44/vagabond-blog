import styles from './TopMenu.module.scss';
import _ from 'lodash';
import MenuItem, { TopMenuItemType } from './MenuItem/MenuItem';
import logo from '../../../assets/icons/logo.svg';
import logoVagabond from '../../../assets/icons/logoVagabond.svg';
import classNames from 'classnames';

interface Props {
  middleItems?: TopMenuItemType[];
  rightItems?: TopMenuItemType[];
  logoOnClick?: () => void;
}

function TopMenu({ middleItems, rightItems, logoOnClick }: Props) {
  return (
    <div className={styles.container}>
      <div className={classNames(styles.logo, { [styles.clickable]: !_.isNil(logoOnClick) })} onClick={logoOnClick}>
        <img src={logoVagabond} alt={'logo vagabond'} />
      </div>
      <div className={styles.middleMenu}>
        {!_.isNil(middleItems) && middleItems.map((middleItem) => <MenuItem key={middleItem.key} item={middleItem} />)}
      </div>
      <div className={styles.rightMenu}>
        {!_.isNil(rightItems) && rightItems.map((rightItem) => <MenuItem key={rightItem.key} item={rightItem} />)}
      </div>
    </div>
  );
}

export default TopMenu;
