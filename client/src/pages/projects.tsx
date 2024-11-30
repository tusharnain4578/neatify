import React, { ReactElement, useEffect, useState } from 'react';
import { useBreadcrumb } from '../contexts/BreadcrumbProvider';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProjectFormModal from '../components/ProjectFormModal';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  CodeBracketIcon,
  EllipsisVerticalIcon,
  FlagIcon,
  StarIcon,
} from '@heroicons/react/20/solid';
import api from '../redux/api';

const Projects: React.FC = (): ReactElement => {
  const { setBreadcrumb } = useBreadcrumb();
  const [projectFormOpen, setProjectFormOpen] = useState<boolean>(false);

  const { data, isLoading, isError } = api.useGetProjectsQuery();

  const projects: IProject[] = data?.data?.data ?? [];

  useEffect(() => {
    setBreadcrumb({
      title: 'Dashboard',
      pages: [{ name: 'Projects', to: '/dashboard/projects', current: true }],
    });
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <div className="sm:flex sm:items-center mb-8">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold text-gray-900">
                Projects
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                Manage and track all your projects in one place.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Button
                title="Add project"
                onClick={() => setProjectFormOpen(true)}
              />
            </div>
          </div>

          {/* Loading or Error state */}
          {isLoading && <p>Loading projects...</p>}
          {isError && <p>Failed to load projects.</p>}

          {/* Project cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project: IProject) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Conditionally render the ProjectFormModal */}
      {projectFormOpen && (
        <ProjectFormModal open={projectFormOpen} setOpen={setProjectFormOpen} />
      )}
    </>
  );
};

const ProjectCard: React.FC<{ project: IProject }> = ({
  project,
}): ReactElement => {
  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <div className="flex space-x-3">
        <div className="shrink-0">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-10 rounded-full"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">
            <a href="#" className="hover:underline">
              {project.title}
            </a>
          </p>
          <p className="text-sm text-gray-500">
            <a href="#" className="hover:underline">
              {project.type.label}
            </a>
          </p>
        </div>
        <div className="flex shrink-0 self-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    <StarIcon
                      aria-hidden="true"
                      className="mr-3 size-5 text-gray-400"
                    />
                    <span>Add to favorites</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    <CodeBracketIcon
                      aria-hidden="true"
                      className="mr-3 size-5 text-gray-400"
                    />
                    <span>Embed</span>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    <FlagIcon
                      aria-hidden="true"
                      className="mr-3 size-5 text-gray-400"
                    />
                    <span>Report content</span>
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Projects;
