import Action from '../../../../../shared/components/Action/Action';
import styles from './TitleView.module.scss';

interface Props {
  title: string;
  onArticlePublishClick: (event: React.MouseEvent<HTMLElement>) => void;
  date?: string;
  mainPictureUrl?: string;
  published?: boolean;
}

function TitleView({ title, date, published, onArticlePublishClick }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title.toUpperCase()}</div>
      <div className={styles.date}>{date}</div>
      <div className={styles.published}>
        <Action type={published ? 'eye' : 'eyeCrossed'} onClick={onArticlePublishClick} size="s" />
      </div>
    </div>
  );
}

export default TitleView;
