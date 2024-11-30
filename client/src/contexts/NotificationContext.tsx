import {
  createContext,
  useContext,
  useState,
  useRef,
  ReactNode,
  ReactElement,
} from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'; // Added additional icons
import { XMarkIcon } from '@heroicons/react/20/solid';

// Define a notification type
type Notification = {
  id: string;
  message: string;
  description?: string;
  type: 'success' | 'error' | 'warning'; // type added
  isVisible: boolean;
  duration: number; // Added duration property
};

type NotificationContextType = {
  showNotification: (message: string, options?: NotificationOptions) => void;
  clearAllNotifications: () => void; // Function to clear all notifications
};

export type NotificationOptions = {
  description?: string;
  type?: 'success' | 'error' | 'warning'; // Default to 'success'
  duration?: number; // Duration in seconds
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timers = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const showNotification = (
    message: string,
    options: NotificationOptions = {}
  ) => {
    const id = Math.random().toString(36).slice(2, 11); // Generate a unique ID

    const { description = '', type = 'success', duration = 5 } = options; // Default duration to 5 seconds

    setNotifications((prev) => {
      if (prev.length >= 3) {
        // Allow overlap by letting the notification briefly stay before clearing
        const rest = prev.slice(0, 2); // Keep the last two notifications
        return [
          { id, message, description, type, isVisible: false, duration },
          ...rest,
        ];
      }
      return [
        { id, message, description, type, isVisible: false, duration },
        ...prev,
      ];
    });

    // Add a small delay to show the notification (trigger enter transition)
    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === id ? { ...notif, isVisible: true } : notif
        )
      );
    }, 50); // This delay ensures the component has time to mount before the transition

    // Auto-hide the notification after the specified duration (in milliseconds)
    timers.current[id] = setTimeout(() => {
      removeNotification(id);
    }, duration * 1000); // Convert duration to milliseconds
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isVisible: false } : notif
      )
    );

    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  };

  const clearAllNotifications = () => {
    // Clear all notifications and timers
    setNotifications([]);
    Object.keys(timers.current).forEach((id) => {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    });
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, clearAllNotifications }}
    >
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-60" // Increased z-index
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {notifications.map((notification) => {
            // Determine icon based on type
            let Icon;
            switch (notification.type) {
              case 'error':
                Icon = XCircleIcon;
                break;
              case 'warning':
                Icon = ExclamationCircleIcon;
                break;
              default:
                Icon = CheckCircleIcon; // Default to success icon
            }

            return (
              <Transition
                key={notification.id}
                show={notification.isVisible} // Control visibility individually
                as="div"
                enter="transition-opacity duration-300 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5"
              >
                <div className="p-4">
                  <div className="flex items-start">
                    <div className="shrink-0">
                      <Icon
                        aria-hidden="true"
                        className={`h-6 w-6 ${notification.type === 'success' ? 'text-green-400' : notification.type === 'error' ? 'text-red-400' : 'text-yellow-400'}`}
                      />
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      {notification.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.description}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex shrink-0">
                      <button
                        type="button"
                        onClick={() => removeNotification(notification.id)}
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Transition>
            );
          })}
        </div>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
