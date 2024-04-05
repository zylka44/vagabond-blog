import styles from './LoginModal.module.scss';
import Modal from '../Modal';
import Input from '../../Input/Input';
import { useEffect, useState } from 'react';
import Button from '../../Button/Button';
import { useDispatch } from 'react-redux';
import { validateCredentialAction } from '../../../../app/features/session.slice';
import { useSession } from '../../../../app/hooks/useSession';
import { useModals } from '../../../../app/hooks/useModals';
import { useHistory } from 'react-router-dom';

function LoginModal() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSession();
  const { closeModal } = useModals();
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn) {
      isLoggedIn && closeModal();
      history.push(`/edit`);
    }
  }, [isLoggedIn]);

  const validatePassword = (password: string) => {
    dispatch(validateCredentialAction({ password }));
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onOKButtonClick = () => {
    validatePassword(password);
  };

  return (
    <div className={styles.mainContainer}>
      <Modal onCloseClick={closeModal} fullpage>
        <div className={styles.container}>
          <Input
            type={'password'}
            name="password"
            value={password}
            placeholder="hasło"
            width="540px"
            onChange={onInputChange}
          />
          <div className={styles.button}>
            <Button text="OK" type={'color'} onClick={onOKButtonClick} />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
