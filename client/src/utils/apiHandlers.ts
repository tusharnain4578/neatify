import { UseFormSetError } from 'react-hook-form';
import { NotificationOptions } from '../contexts/NotificationContext';

export const handleApiError = (
  err: any,
  showNotification?: (message: string, options?: NotificationOptions) => void,
  setError?: UseFormSetError<any>
) => {
  const data = err.data;

  if (err.status === 500) {
    showNotification &&
      showNotification('Something went wrong.', {
        type: 'error',
      });
  } else if (err.status === 422) {
    if (data?.errors && setError) {
      Object.keys(data.errors).forEach((key: string) => {
        setError(key, {
          type: 'manual',
          message: data.errors[key],
        });
      });
    }
  } else {
    showNotification &&
      showNotification(data.message, {
        description: data?.description,
        type: 'error',
      });
  }
};
