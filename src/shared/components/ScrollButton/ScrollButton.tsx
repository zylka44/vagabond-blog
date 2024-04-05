import { useState } from 'react';
import styles from './ScrollButton.module.scss';
import { animateScroll as scroll } from 'react-scroll';
import Action from '../Action/Action';

function ScrollButton() {
  const [activeArea, setActiveArea] = useState<'top' | 'bottom'>('top');

  const handleScrollToTopAndBottom = () => {
    activeArea === 'top' ? scroll.scrollToBottom() : scroll.scrollToTop();
    setActiveArea(activeArea === 'top' ? 'bottom' : 'top');
  };

  return (
    <div className={styles.container}>
      <Action type={activeArea === 'top' ? 'down' : 'up'} onClick={handleScrollToTopAndBottom} size="s" />
    </div>
  );
}

export default ScrollButton;
