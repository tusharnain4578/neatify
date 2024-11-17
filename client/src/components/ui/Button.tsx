import React, { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import spinner icon

interface ButtonPropInterface
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  fullWidth?: boolean;
  showSpinner?: boolean;
  spinnerTitle?: string;
}

const Button: React.FC<ButtonPropInterface> = ({
  title,
  fullWidth,
  showSpinner,
  spinnerTitle,
  ...rest
}: ButtonPropInterface): ReactElement => {
  return (
    <button
      {...rest}
      className={`${fullWidth ? 'w-full' : ''} inline-flex justify-center items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {showSpinner && (
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          className="w-4 h-4 text-white animate-spin mr-1"
        />
      )}
      {showSpinner && spinnerTitle ? spinnerTitle : title}
    </button>
  );
};

export default Button;
