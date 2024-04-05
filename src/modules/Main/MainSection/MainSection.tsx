import Button from '../../../shared/components/Button/Button';
import styles from './MainSection.module.scss';
import { Section } from '../../../shared/consts/Sections';
import { Article } from '../../../shared/models/article.model';
import { useEffect, useState } from 'react';
import MainSectionPicture from './MainSectionPicture/MainSectionPicture';
import { useDispatch } from 'react-redux';
import { getArticleByIdAction } from '../../../app/features/articles.slice';

interface Props extends Section {
  index: number;
  lastArticles: Article[];
  onLastTripClick: (articleId: string) => void;
  onMoreTripsClick: () => void;
}

function MainSection({
  index,
  tripKind,
  title,
  subtitle,
  description,
  lastArticles,
  onLastTripClick,
  onMoreTripsClick,
}: Props) {
  const dispatch = useDispatch();
  const [hoveredArticleUrl, setHoveredArticleUrl] = useState<string>('');
  const [isSomeHovered, setIsSomeHovered] = useState<boolean>(false);
  const [hoveredId, setHoveredId] = useState<string>('');

  useEffect(() => {
    lastArticles.forEach((article) => dispatch(getArticleByIdAction(article.id)));
  }, []);

  const onPicturesHover = () => {
    setIsSomeHovered(true);
  };

  const onPicturesLeave = () => {
    setHoveredId('');
    setIsSomeHovered(false);
  };

  const onMouseEnter = (url: string, articleId: string) => {
    setHoveredArticleUrl(url);
    setHoveredId(articleId);
  };

  return (
    <div id={tripKind} className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.number}>{`0${(index + 1).toString()}`}</div>
        <div className={styles.content}>
          <div className={styles.title} onClick={onMoreTripsClick}>
            <div className={styles.titleLine}></div>
            <div className={styles.titleLabel}>{title}</div>
          </div>
          <div className={styles.subtitle} onClick={onMoreTripsClick}>
            {subtitle}
          </div>
          <div className={styles.description}>{description}</div>
          <Button
            text={'więcej'}
            size="s"
            type={'transparentColor'}
            iconType={'rightArrowPink'}
            onClick={onMoreTripsClick}
          />
        </div>
      </div>
      <div className={styles.pictures} onMouseEnter={onPicturesHover} onMouseLeave={onPicturesLeave}>
        {lastArticles.map((article, index) => {
          return (
            <MainSectionPicture
              key={article.id}
              article={article}
              className={isSomeHovered ? `pic${index}` : ''}
              url={article?.mainPictureUrl || ''}
              hoveredUrl={hoveredArticleUrl}
              alt={article?.title || ''}
              thisIsHovered={hoveredId === article.id}
              isSomeHovered={isSomeHovered}
              onPictureClick={() => onLastTripClick(article?.id || '')}
              onPictureHover={() => onMouseEnter(article?.mainPictureUrl || '', article.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MainSection;
