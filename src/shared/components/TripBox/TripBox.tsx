import { Article } from '../../models/article.model';
import Image from '../Image/Image';
import styles from './TripBox.module.scss';

interface Props {
  article: Article;
  onTripClick: (id: string) => void;
}

function TripBox({ article, onTripClick }: Props) {
  const onTripBoxClick = () => onTripClick(article.id);
  return (
    <div className={styles.container} onClick={onTripBoxClick}>
      <div className={styles.picture}>
        <Image src={article.mainPictureUrl || ''} alt={article.title} />
      </div>
      <div className={styles.title}>
        <div className={styles.titleBox}>
          <div className={styles.label}>{article?.title}</div>
          <div className={styles.date}>{article?.date}</div>
        </div>
      </div>
    </div>
  );
}

export default TripBox;
