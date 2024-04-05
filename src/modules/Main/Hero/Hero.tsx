import styles from './Hero.module.scss';
import logoVagabond from '../../../assets/icons/logoVagabondPurple.svg';

function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <div className={styles.titleContainer}>
          <img src={logoVagabond} alt={'logo vagabond'} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
