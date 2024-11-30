import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  name: Path<T>;
  title?: string;
  error?: string;
  formRegister?: UseFormRegister<T>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

type InputProps<T extends FieldValues> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'name'
> &
  CustomInputProps<T>;

const Input = <T extends FieldValues>({
  name,
  title,
  error,
  formRegister,
  id,
  size = 'md',
  className,
  ...rest
}: InputProps<T>): ReactElement => {
  const elementId = id || `inp_id_${name}`;
  const registerProps = formRegister ? formRegister(name) : {};

  // Mapping the size prop to Tailwind class names
  const sizeClasses = {
    sm: 'py-2 text-sm',
    md: 'py-2 text-base',
    lg: 'py-3 text-lg',
    xl: 'py-3.5 text-xl',
    '2xl': 'py-4.5 text-2xl',
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  };

  const placeholderSizeClasses = {
    sm: 'placeholder:text-sm',
    md: 'placeholder:text-base',
    lg: 'placeholder:text-lg',
    xl: 'placeholder:text-xl',
    '2xl': 'placeholder:text-2xl',
  };

  return (
    <div>
      {title && (
        <label
          htmlFor={elementId}
          className={`mt-5 block font-medium text-gray-900 ${labelSizeClasses[size]}`}
        >
          {title}
          {rest.required && (
            <span className="text-red-600 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div
        className={`relative ${title ? 'mt-2' : 'mt-5'} rounded-md shadow-sm`}
      >
        <input
          id={elementId}
          {...registerProps}
          {...rest}
          className={`block w-full rounded-md border-0 shadow-sm ring-1 ring-inset ${
            error
              ? 'ring-2 ring-red-600 text-red-600 focus:ring-red-600'
              : 'ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-600'
          } ${sizeClasses[size]} sm:text-sm/6 ${placeholderSizeClasses[size]} ${className}`}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              aria-hidden="true"
              className="size-4 text-red-500"
            />
          </div>
        )}
      </div>
      {error && (
        <p id={`input-error-${name}`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
