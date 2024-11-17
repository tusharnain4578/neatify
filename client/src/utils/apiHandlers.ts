import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

export const handleApiError = (err: any, setError?: UseFormSetError<any>) => {
  if (err.status === 500) {
    toast.error('Something went wrong!');
  } else {
    const data = err.data;
    toast.error(data?.message);
    if (data?.errors && setError) {
      Object.keys(data.errors).forEach((key: string) => {
        setError(key, {
          type: 'manual',
          message: data.errors[key],
        });
      });
    }
  }
};
