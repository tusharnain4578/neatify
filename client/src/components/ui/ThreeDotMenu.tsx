import React, { ReactElement } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

interface IMenu {
  title: React.ReactNode;
}

interface ThreeDotMenuPropsInterface {
  menu: IMenu[];
}

const ThreeDotMenu: React.FC<ThreeDotMenuPropsInterface> = ({
  menu,
}: ThreeDotMenuPropsInterface): ReactElement => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="flex items-center rounded-full bg-gray-100 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {menu.map((item) => (
            <MenuItem>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
              >
                {item.title}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
};

export default ThreeDotMenu;
