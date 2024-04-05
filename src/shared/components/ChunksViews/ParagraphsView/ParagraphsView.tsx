import { ParagraphType, Picture } from '../../../models/article.model';
import PictureView from '../PicturesView/PictureView/PictureView';
import styles from './ParagraphsView.module.scss';
import ParagraphView from './ParagraphView/ParagraphView';

interface Props {
  type: ParagraphType;
  text: string;
  pictures: Picture[];
}

function ParagraphsView({ type, text, pictures }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.paragraphs}>
        {type === 'paragraph' && <ParagraphView text={text} />}
        {type === 'paragraph-picture' && (
          <div className={styles.paragraphPicture}>
            <div className={styles.paragraphView}>
              <ParagraphView text={text} />
            </div>
            <div className={styles.pictureView}>
              <PictureView
                url={pictures[0]?.url}
                description={pictures[0]?.description}
                location={pictures[0]?.location}
              />
            </div>
          </div>
        )}
        {type === 'picture-paragraph' && (
          <div className={styles.paragraphPicture}>
            <div className={styles.pictureView}>
              <PictureView
                url={pictures[0]?.url}
                description={pictures[0]?.description}
                location={pictures[0]?.location}
              />
            </div>
            <div className={styles.paragraphView}>
              <ParagraphView text={text} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ParagraphsView;
