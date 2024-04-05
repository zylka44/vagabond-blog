import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { ModalConfig, ModalType } from '../../shared/models/article.model';
import { closeModalAction, setModalConfigAction, setModalTypeAction } from '../features/modals.slice';
import _ from 'lodash';

export function useModals() {
  const dispatch = useDispatch();
  const modalType: ModalType | null = useSelector((state: RootState) => state.modals.modalType);
  const modalConfig: ModalConfig | null = useSelector((state: RootState) => state.modals.modalConfig);

  const openModal = (modalType: ModalType, config?: {}) => {
    !_.isNil(config) && dispatch(setModalConfigAction(config));
    dispatch(setModalTypeAction(modalType));
  };

  const closeModal = () => {
    dispatch(closeModalAction());
  };

  return { modalType, modalConfig, openModal, closeModal };
}
