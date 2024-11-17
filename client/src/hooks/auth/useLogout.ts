import { useDispatch } from 'react-redux';
import api from '../../redux/api';
import { logout as logoutActionCreater } from '../../redux/slices/authSlice';
import { handleApiError } from '../../utils/apiHandlers';
import { toast } from 'react-toastify';

interface UseLogoutReturn {
  logoutHandler: () => Promise<void>;
  isLoading: boolean;
}

const useLogout = (): UseLogoutReturn => {
  const dispatch = useDispatch();

  const [logout, { isLoading }] = api.useLogoutMutation();

  const logoutHandler = async (): Promise<void> => {
    try {
      const res = await logout().unwrap();
      dispatch(logoutActionCreater());
      res?.message && toast.success(res.message);
    } catch (error) {
      handleApiError(error);
    }
  };

  return { logoutHandler, isLoading };
};

export default useLogout;
