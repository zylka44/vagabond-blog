import { useModals } from '../../app/hooks/useModals';
import ConfirmModal from '../../shared/components/Modals/ConfirmModal/ConfirmModal';
import LoginModal from '../../shared/components/Modals/LoginModal/LoginModal';
import MapModal from '../../shared/components/Modals/MapModal/MapModal';
import SearchModal from '../../shared/components/Modals/SearchModal/SearchModal';
import styles from './Modals.module.scss';
import _ from 'lodash';

function Modals() {
  const { modalType } = useModals();
  return (
    <div className={styles.container}>
      {modalType === 'map' && <MapModal />}
      {modalType === 'search' && <SearchModal />}
      {modalType === 'login' && <LoginModal />}
      {modalType === 'confirm' && <ConfirmModal />}
    </div>
  );
}

export default Modals;
