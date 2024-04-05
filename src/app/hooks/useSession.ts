import { useSelector } from 'react-redux';
import { RootState } from '../store';

export function useSession() {
  const isLoggedIn: boolean = useSelector((state: RootState) => state.session.isLoggedIn);

  return { isLoggedIn };
}
