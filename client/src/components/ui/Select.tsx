import React, { ReactElement } from 'react';
import { Props as ReactSelectProps } from 'react-select';
import * as ReactSelect from 'react-select';
import { FieldValues, Path } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

interface CustomSelectProps<T extends FieldValues> {
  name: Path<T>;
  options?: SelectOption[];
  title?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

type SelectProps<T extends FieldValues> = Omit<
  ReactSelectProps,
  'size' | 'name' | 'options'
> &
  CustomSelectProps<T>;

const Select = <T extends FieldValues>({
  name,
  title,
  error,
  id,
  options,
  size = 'md',
  className,
  placeholder = 'Select an option',
  ...rest
}: SelectProps<T>): ReactElement => {
  const elementId = id || `select_id_${name}`;

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Custom styles for React Select
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderRadius: '0.375rem', // rounded-md
      borderColor: error ? '#dc2626' : '#d1d5db', // Tailwind red-600 or gray-300
      padding: '0 0.5rem',
      minHeight: '2.5rem', // Ensure compact height
      boxShadow: 'none',
      fontSize:
        size === 'lg' ? '1rem' : size === 'sm' ? '0.875rem' : '0.9375rem',
      fontWeight: '500', // Adjust font weight here
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#9ca3af', // Tailwind gray-400
      fontSize:
        size === 'lg' ? '1rem' : size === 'sm' ? '0.875rem' : '0.9375rem',
      fontWeight: '500',
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '0.375rem', // rounded-md
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // shadow-sm
      zIndex: 20,
    }),
    menuList: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#374151', // Tailwind gray-900
      fontSize:
        size === 'lg' ? '1rem' : size === 'sm' ? '0.875rem' : '0.9375rem',
      fontWeight: '500',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize:
        size === 'lg' ? '1rem' : size === 'sm' ? '0.875rem' : '0.9375rem', // Consistent font size
      fontWeight: '500',
      color: state.isSelected ? '#ffffff' : '#374151', // Tailwind gray-900
      backgroundColor: state.isSelected ? '#4f46e5' : 'transparent', // Indigo-600 for selected
      ':hover': {
        backgroundColor: '#e5e7eb', // Light gray for hover
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: '0.25rem',
    }),
    indicatorsContainer: (provided: any) => ({
      ...provided,
      padding: '0',
    }),
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
      <div className="relative mt-2">
        <ReactSelect.default
          id={elementId}
          {...rest}
          options={options?.map((x) => ({ label: x.label, value: x.id }))}
          styles={customStyles}
          classNamePrefix="custom-select"
          placeholder={placeholder}
          className={`block w-full rounded-md shadow-sm ring-1 ring-inset ${
            error
              ? 'ring-red-600 text-red-600 focus:ring-red-600'
              : 'ring-gray-300 focus:ring-indigo-600'
          } ${className}`}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              aria-hidden="true"
              className="text-red-500"
            />
          </div>
        )}
      </div>
      {error && (
        <p id={`select-error-${name}`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
