import styles from './ConfirmModal.module.scss';
import Modal from '../Modal';
import { useModals } from '../../../../app/hooks/useModals';
import Button from '../../Button/Button';
import { ConfirmModalConfig } from '../../../models/article.model';

function ConfirmModal() {
  const { closeModal, modalConfig } = useModals();
  const { text, onConfirm } = modalConfig as ConfirmModalConfig;

  const onCloseClick = () => {
    closeModal();
  };

  const onConfirmClick = () => {
    closeModal();
    onConfirm();
  };

  return (
    <div className={styles.mainContainer}>
      <Modal onCloseClick={onCloseClick}>
        <div className={styles.container}>
          <div className={styles.text}>{text}</div>
          <div className={styles.buttons}>
            <Button text="Usuń" size={'s'} type={'color'} onClick={onConfirmClick} />
            <Button text="Anuluj" size={'s'} type={'basicDarker'} onClick={closeModal} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
