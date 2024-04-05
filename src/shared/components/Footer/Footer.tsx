import styles from './Footer.module.scss';
import Image from '../Image/Image';

const meUrl = '';

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.picture}>
        <Image src={meUrl} alt="me" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>O mnie</div>
        <div className={styles.description}>
          Mam na imię Żaneta. Lubię wędrować i podróżować. Zamieszczam tutaj informacje i zdjęcia z miejsc, w których
          byłam.
        </div>
      </div>
    </div>
  );
}

export default Footer;
