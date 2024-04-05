import styles from './MapModal.module.scss';
import Modal from '../Modal';
import Map from '../../Map/Map';
import { useModals } from '../../../../app/hooks/useModals';
import { useHistory } from 'react-router-dom';
import { useArticles } from '../../../../app/hooks/useArticles';

function MapModal() {
  const history = useHistory();
  const { publishedArticles } = useArticles();
  const { closeModal } = useModals();

  const goToArticle = (articleId: string) => {
    closeModal();
    history.push(`/article/${articleId}`);
  };

  const onCloseClick = () => {
    closeModal();
  };

  return (
    <Modal onCloseClick={onCloseClick} fullpage>
      <div className={styles.container}>
        <Map articles={publishedArticles} onPinClick={goToArticle} />
      </div>
    </Modal>
  );
}

export default MapModal;
