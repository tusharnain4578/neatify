import {
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import React, { ReactElement, useState } from 'react';
import { useSidebar } from '../../../contexts/SidebarContext';
import useLogout from '../../../hooks/auth/useLogout';
import useUser from '../../../hooks/auth/useUser';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = (): ReactElement => {
  const { setOpen } = useSidebar();
  const { logoutHandler, isLoading } = useLogout();

  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const user = useUser();

  const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#', onClick: () => setShowLogoutModal(true) },
  ];

  const handleLogout = async () => {
    await logoutHandler();
  };

  return (
    <>
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>

        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <form action="#" method="GET" className="relative flex flex-1">
            <label htmlFor="search-field" className="sr-only">
              Search
            </label>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            />
            <input
              id="search-field"
              name="search"
              type="search"
              placeholder="Search..."
              className="block size-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            />
          </form>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
            />

            {/* Profile dropdown */}
            <Menu as="div" className="relative">
              <MenuButton className="-m-1.5 flex items-center p-1.5">
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-50"
                />
                <span className="hidden lg:flex lg:items-center">
                  <span
                    aria-hidden="true"
                    className="ml-4 text-sm/6 font-semibold text-gray-900"
                  >
                    {user?.name}
                  </span>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="ml-2 size-5 text-gray-400"
                  />
                </span>
              </MenuButton>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {userNavigation.map((item) => (
                  <MenuItem key={item.name}>
                    <a
                      href={item.href}
                      onClick={item?.onClick}
                      className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
                    >
                      {item.name}
                    </a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      {showLogoutModal && (
        <Modal
          open={showLogoutModal}
          setOpen={setShowLogoutModal}
          allowClose={!isLoading}
          size="sm"
        >
          <div className="text-center">
            {/* Check Icon */}
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                aria-hidden="true"
                className="size-6 text-green-600"
              />
            </div>

            {/* Modal Header */}
            <div className="mt-3 sm:mt-5">
              <DialogTitle
                as="h3"
                className="text-base font-semibold text-gray-900"
              >
                Ready to log out?
              </DialogTitle>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  You're about to sign out of your account.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-5 sm:mt-6">
              <Button
                onClick={handleLogout}
                title="Log out"
                disabled={isLoading}
                showSpinner={isLoading}
                spinnerTitle="Logging out"
                fullWidth
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
