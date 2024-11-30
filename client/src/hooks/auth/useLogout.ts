import { useDispatch } from 'react-redux';
import api from '../../redux/api';
import { logout as logoutActionCreater } from '../../redux/slices/authSlice';
import { handleApiError } from '../../utils/apiHandlers';
import { useNotification } from '../../contexts/NotificationContext';

interface UseLogoutReturn {
  logoutHandler: () => Promise<void>;
  isLoading: boolean;
}

const useLogout = (): UseLogoutReturn => {
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const [logout, { isLoading }] = api.useLogoutMutation();

  const logoutHandler = async (): Promise<void> => {
    try {
      const res = await logout().unwrap();
      dispatch(logoutActionCreater());
      res?.message && showNotification(res.message);
    } catch (error) {
      handleApiError(error, showNotification);
    }
  };

  return { logoutHandler, isLoading };
};

export default useLogout;
