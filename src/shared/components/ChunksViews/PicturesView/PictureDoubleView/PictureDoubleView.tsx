import styles from './PictureDoubleView.module.scss';
import _ from 'lodash';
import { Picture } from '../../../../models/article.model';
import Image from '../../../Image/Image';
import { parseText } from '../../../../utils/chnksUtils';
import Action from '../../../Action/Action';
import { getLocationUrl } from '../../../../utils/locationUtils';

interface Props {
  pictures: Picture[];
}

function PictureDoubleView({ pictures }: Props) {
  return (
    <div className={styles.container}>
      {pictures.map((picture) => {
        const { id, url, description, location } = picture;
        const locationUrl = !_.isNil(location) ? getLocationUrl(location) : '';
        return (
          <div key={id} className={styles.pictureD}>
            <div className={styles.image}>
              <Image src={url} alt={description || ''} />
            </div>
            {!_.isNil(description) && <div className={styles.description}>{parseText(description)}</div>}
            {!_.isEmpty(locationUrl) && (
              <div className={styles.location}>
                <Action type="location" externalLink={locationUrl} size="s" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PictureDoubleView;
