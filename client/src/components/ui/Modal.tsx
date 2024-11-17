import React, {
  ReactElement,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  closeOnOutsideClick?: boolean;
  allowClose?: boolean;
  showCloseIcon?: boolean;
  withCloseButton?: boolean;
}

interface IModalHeaderProps {
  children: React.ReactNode;
  bg?: string;
}

interface ModalContextType {
  setOpen: Dispatch<SetStateAction<boolean>> | undefined;
  withCloseButton: boolean;
}
const ModalContext = createContext<ModalContextType | undefined>(undefined);

const Modal: React.FC<IModalProps> & {
  Header: React.FC<IModalHeaderProps>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
} = ({
  open,
  setOpen,
  children,
  size = 'sm',
  closeOnOutsideClick = true,
  allowClose = true,
  withCloseButton = true,
}: IModalProps): ReactElement => {
  const sizeClass = {
    sm: 'max-w-[400px]',
    md: 'max-w-[700px]',
    lg: 'max-w-[1000px]',
  }[size];

  const hasHeader = React.Children.toArray(children).some(
    (child) => (child as ReactElement).type === Modal.Header
  );

  return (
    <ModalContext.Provider value={{ setOpen, withCloseButton }}>
      <Dialog
        open={open}
        onClose={() => closeOnOutsideClick && allowClose && setOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop
          transition
          className={`fixed inset-0 bg-gray-900/75 bg-opacity-40 backdrop-blur-sm transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in`}
        />

        <div className="fixed inset-0 z-10 w-full h-full flex items-center justify-center overflow-auto">
          <div className="flex items-center justify-center w-full h-full p-4">
            <DialogPanel
              transition
              className={`relative transform overflow-hidden rounded-lg bg-white p-4 pt-5 pb-6 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full w-full ${sizeClass}`}
            >
              {withCloseButton && (
                <div className="absolute top-0 right-0 mr-2 mt-1 p-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <span className="sr-only">Close</span>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </div>
              )}
              <div
                className={`modal-body ${hasHeader ? 'pt-14' : 'pt-4'} overflow-auto max-h-[70vh]`}
              >
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </ModalContext.Provider>
  );
};

const ModalHeader: React.FC<IModalHeaderProps> = ({
  children,
  bg = 'border-gray-200 bg-gray-800',
}: IModalHeaderProps) => {
  const context = useContext(ModalContext);

  if (!context || !context.setOpen) {
    throw new Error('ModalHeader must be used within a Modal');
  }

  const { setOpen, withCloseButton } = context;

  return (
    <div
      className={`modal-header fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b  rounded-t-lg ${bg}`}
    >
      {children}
      {withCloseButton && setOpen && (
        <button
          onClick={() => setOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <span className="sr-only">Close</span>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );
};

const ModalBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="modal-body p-1 overflow-auto">{children}</div>
);

const ModalFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="modal-footer p-4 border-t border-gray-200 bg-gray-100 rounded-b-lg text-right">
    {children}
  </div>
);

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
