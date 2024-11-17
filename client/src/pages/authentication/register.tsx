import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import React, { ReactElement, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import api from '../../redux/api';
import { toast } from 'react-toastify';
import { UserRegisterResponse } from '../../@types/api';
import { handleApiError } from '../../utils/apiHandlers';

interface Inputs {
  name: string;
  email: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<Inputs> = yup.object().shape({
  name: yup.string().max(100).required('Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const Register: React.FC = (): ReactElement => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const [authRegister, { isLoading }] = api.useRegisterMutation();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      const res: UserRegisterResponse = await authRegister(data).unwrap();
      if (res.success) {
        toast.success(res.message);
        setIsSubmitted(true);
        navigate('/login', { state: { email: data.email } });
      }
    } catch (err: unknown) {
      handleApiError(err, setError);
    }
  };

  return (
    <div className="flex min-h-screen flex-1">
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="h-10 w-auto"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Create new account
            </h2>
            <p className="mt-2 text-sm/6 text-gray-500">
              Already a member?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>

          <div className="mt-10">
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  name="name"
                  title="Full Name"
                  placeholder="Enter name"
                  formRegister={register}
                  defaultValue="Tushar"
                  error={errors.name?.message}
                  disabled={isLoading || isSubmitted}
                />

                <Input
                  name="email"
                  title="Email Address"
                  placeholder="Enter email address"
                  formRegister={register}
                  defaultValue="naintushar@hotmail.com"
                  error={errors.email?.message}
                  disabled={isLoading || isSubmitted}
                />

                <Input
                  type="password"
                  name="password"
                  title="Password"
                  placeholder="Enter password"
                  defaultValue="aaaaaaaa"
                  formRegister={register}
                  error={errors.password?.message}
                  disabled={isLoading || isSubmitted}
                />

                <div>
                  <Button
                    title="Sign in"
                    disabled={isLoading || isSubmitted}
                    showSpinner={isLoading}
                    spinnerTitle="Processing"
                    fullWidth
                    submit
                  />
                </div>
              </form>
            </div>

            <div className="mt-10">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm/6 font-medium">
                  <span className="bg-white px-6 text-gray-900">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                      fill="#34A853"
                    />
                  </svg>
                  <span className="text-sm/6 font-semibold">Google</span>
                </a>

                <a
                  href="#"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="size-5 fill-[#24292F]"
                  >
                    <path d="M10 0C4.477 0 0 4.484 0 10s4.477 10 10 10 10-4.484 10-10S15.523 0 10 0zM9.3 14.8l-1.5-1.5 4-4H7V8h6.8l-4-4L9.3 2.2 16 9.9 9.3 14.8z" />
                  </svg>
                  <span className="text-sm/6 font-semibold">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
