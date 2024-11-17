import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactElement } from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CustomTextareaProps<T extends FieldValues> {
  name: Path<T>;
  title?: string;
  error?: string;
  formRegister?: UseFormRegister<T>;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

type TextareaProps<T extends FieldValues> = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size' | 'name'
> &
  CustomTextareaProps<T>;

const Textarea = <T extends FieldValues>({
  name,
  title,
  error,
  formRegister,
  id,
  size = 'md',
  className,
  ...rest
}: TextareaProps<T>): ReactElement => {
  const elementId = id || `inp_id_${name}`;
  const registerProps = formRegister ? formRegister(name) : {};

  // Mapping the size prop to Tailwind class names
  const sizeClasses = {
    sm: 'py-1 text-sm',
    md: 'py-1.5 text-sm',
    lg: 'py-2 text-base',
    xl: 'py-3 text-lg',
    '2xl': 'py-4 text-xl',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
    xl: 'text-lg',
    '2xl': 'text-xl',
  };

  const placeholderSizeClasses = {
    sm: 'placeholder:text-xs',
    md: 'placeholder:text-sm',
    lg: 'placeholder:text-base',
    xl: 'placeholder:text-lg',
    '2xl': 'placeholder:text-xl',
  };

  return (
    <div>
      {title && (
        <label
          htmlFor={elementId}
          className={`block font-medium text-gray-900 ${labelSizeClasses[size]}`}
        >
          {title}
          {rest.required && (
            <span className="text-red-600 ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <textarea
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
        <p id={`input-error-${name}`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Textarea;
