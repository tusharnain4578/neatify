import { useDispatch } from 'react-redux';
import api from '../../redux/api';
import { logout, setUser } from '../../redux/slices/authSlice';
import { handleApiError } from '../../utils/apiHandlers';

interface UseAuthReturn {
  validate: () => void;
  isLoading: boolean;
}

const useAuth = (): UseAuthReturn => {
  const [check, { isLoading }] = api.useAuthCheckMutation();
  const dispatch = useDispatch();

  const validate = async () => {
    try {
      const res = await check().unwrap();
      if (res.data?.user) {
        dispatch(setUser(res.data.user));
      }
    } catch (error: any) {
      if (error?.status === 401) {
        // unauthenticated
        dispatch(logout());
      } else {
        handleApiError(error);
      }
    }
  };

  return { validate, isLoading };
};

export default useAuth;
