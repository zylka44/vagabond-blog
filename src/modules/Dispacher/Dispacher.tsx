import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getArticlesAction } from '../../app/features/articles.slice';
import { setCresentialsFromLocalStorageAction } from '../../app/features/session.slice';
import { RootState } from '../../app/store';

export interface Props {
  children: React.ReactNode;
}

const Dispatcher = ({ children }: Props) => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector((state: RootState) => state.loading);

  useEffect(() => {
    dispatch(setCresentialsFromLocalStorageAction());
    dispatch(getArticlesAction());
  }, []);
  return <>{isLoading ? <div>is loading...</div> : children}</>;
};

export default Dispatcher;
