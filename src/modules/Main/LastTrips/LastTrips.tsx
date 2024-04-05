import Icon from '../../../shared/components/Action/Action';
import { Article } from '../../../shared/models/article.model';
import TripBox from '../../../shared/components/TripBox/TripBox';
import styles from './LastTrips.module.scss';
import _ from 'lodash';

interface Props {
  publishedArticles: Article[];
  onSearchClick: () => void;
  goToArticle: (articleId: string) => void;
}

function LastTrips({ publishedArticles, onSearchClick, goToArticle }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.lastTrips}>
        {_.slice(publishedArticles, 0, 3).map((article) => (
          <TripBox key={article.id} article={article} onTripClick={goToArticle} />
        ))}
      </div>
      <div className={styles.search}>
        <Icon type="search" onClick={onSearchClick} size="s" />
      </div>
    </div>
  );
}

export default LastTrips;
