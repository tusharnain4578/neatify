import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const useUser = (): IUser | null => {
  return useSelector((state: RootState) => state?.auth?.user);
};

export default useUser;
