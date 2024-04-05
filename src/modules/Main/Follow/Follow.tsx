import { iconUrl } from '../../../shared/consts/IconsTypes';
import styles from './Follow.module.scss';

interface Props {}

function Follow({}: Props) {
  const redirect = () => {
    window.open('https://www.instagram.com/zaneta_e_r/', '_blank');
  };

  return (
    <div className={styles.container} onClick={redirect}>
      <div className={styles.label}>Obserwuj</div>
      <div className={styles.icon}>
        <img src={iconUrl['instagram']} alt={`instagram icon`} />
      </div>
    </div>
  );
}

export default Follow;
