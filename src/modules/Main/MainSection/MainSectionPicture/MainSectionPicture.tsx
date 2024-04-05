import styles from './MainSectionPicture.module.scss';
import _ from 'lodash';
import Image from '../../../../shared/components/Image/Image';
import { Article } from '../../../../shared/models/article.model';
import classNames from 'classnames';

interface Props {
  article: Article;
  url: string;
  hoveredUrl: string;
  alt: string;
  className: string;
  thisIsHovered: boolean;
  isSomeHovered: boolean;
  onPictureClick: () => void;
  onPictureHover: () => void;
}

function MainSectionPicture({
  article,
  url,
  hoveredUrl,
  alt,
  className,
  thisIsHovered,
  isSomeHovered,
  onPictureClick,
  onPictureHover,
}: Props) {
  const description = article.chunks?.find((chunk) => chunk.type === 'paragraph')?.text || '';
  const labelBackgroundClassName = isSomeHovered
    ? thisIsHovered
      ? 'labelBackgroundHovered'
      : 'labelBackgroundOtherHovered'
    : 'labelBackgroundNotHovered';

  return (
    <div key={article.id} className={styles.container} onClick={onPictureClick} onMouseEnter={onPictureHover}>
      <div
        className={classNames(
          styles.mainPicture,
          { [styles.mainHovered]: isSomeHovered },
          { [styles.mainNotHovered]: !isSomeHovered }
        )}
      >
        <Image src={url} alt={alt} />
      </div>
      <div
        className={classNames(
          styles.coverPicture,
          styles[className],
          { [styles.coverHovered]: isSomeHovered },
          { [styles.coverNotHovered]: !isSomeHovered }
        )}
      >
        <Image src={hoveredUrl} alt={''} />
      </div>
      <div
        className={classNames(
          styles.pictureLabelContainer,
          { [styles.labelContainerHovered]: thisIsHovered },
          { [styles.labelContainerNotHovered]: !thisIsHovered }
        )}
      >
        <div className={classNames(styles.pictureLabelBackground, styles[labelBackgroundClassName])}>
          <div className={styles.pictureLabel}>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.date}>{article.date}</div>
            <div
              className={classNames(
                styles.description,
                { [styles.descriptionHovered]: thisIsHovered },
                { [styles.descriptionNotHovered]: !thisIsHovered }
              )}
            >
              {description}
            </div>
            <div className={styles.showMore}>więcej</div>
          </div>
          <div className={classNames(styles.pictureLabelFramework, styles[labelBackgroundClassName])}></div>
        </div>
      </div>
    </div>
  );
}

export default MainSectionPicture;
