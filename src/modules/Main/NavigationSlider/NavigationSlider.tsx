import { Link } from 'react-scroll';
import styles from './NavigationSlider.module.scss';
import { useState } from 'react';
import classNames from 'classnames';

const NAV_ITEMS = ['start', 'hiking', 'bike', 'faraway'];

function NavigationSlider() {
  const [activeNavItem, setActiveNavItem] = useState<string>('start');

  const setActive = (activeId: string) => {
    setActiveNavItem(activeId);
  };

  const getIndicatorPosition = () => {
    const activeIndex = NAV_ITEMS.findIndex((navItem) => navItem === activeNavItem);
    const indicatorPosition = activeIndex * 45;
    return indicatorPosition.toString() + 'px';
  };

  return (
    <div className={styles.container}>
      <div className={styles.navItems}>
        {NAV_ITEMS.map((navItem, index) => (
          <Link
            key={navItem}
            to={navItem}
            spy={true}
            smooth={true}
            offset={-100}
            duration={300}
            onSetActive={() => setActive(navItem)}
            className={classNames(styles.navItem, { [styles.active]: activeNavItem === navItem })}
          >
            <span>{index === 0 ? 'Start' : `0${index}`}</span>
          </Link>
        ))}
      </div>
      <div className={styles.slider}>
        <div className={styles.track}></div>
        <div className={styles.indicator} style={{ transform: `translateY(${getIndicatorPosition()})` }}></div>
      </div>
    </div>
  );
}

export default NavigationSlider;
