import { parseText } from '../../../../utils/chnksUtils';
import { getLocationUrl } from '../../../../utils/locationUtils';
import Action from '../../../Action/Action';
import Image from '../../../Image/Image';
import styles from './PictureView.module.scss';
import _ from 'lodash';

interface Props {
  url: string;
  description?: string;
  location?: string;
}

function PictureView({ url, description, location }: Props) {
  const locationUrl = !_.isNil(location) ? getLocationUrl(location) : '';
  return (
    <div className={styles.container}>
      <div className={styles.picture}>
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
}

export default PictureView;
