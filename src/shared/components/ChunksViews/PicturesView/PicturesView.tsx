import { Picture, PictureType } from '../../../models/article.model';
import PictureDoubleView from './PictureDoubleView/PictureDoubleView';
import styles from './PicturesView.module.scss';
import PictureView from './PictureView/PictureView';

interface Props {
  type: PictureType;
  pictures: Picture[];
}

function PicturesView({ type, pictures }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.pictures}>
        {type === 'picture' && (
          <PictureView url={pictures[0].url} description={pictures[0].description} location={pictures[0].location} />
        )}
        {type === 'picture-double' && <PictureDoubleView pictures={pictures} />}
      </div>
    </div>
  );
}

export default PicturesView;
