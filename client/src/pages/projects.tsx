import React, { ReactElement, useEffect, useState } from 'react';
import { useBreadcrumb } from '../contexts/BreadcrumbProvider';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProjectFormModal from '../components/ProjectFormModal';
import api from '../redux/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faShareAlt,
  faStar,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Projects: React.FC = (): ReactElement => {
  const { setBreadcrumb } = useBreadcrumb();

  const [projectFormOpen, setProjectFormOpen] = useState<boolean>(false);

  const [editProject, setEditProject] = useState<IProject | undefined>(
    undefined
  );

  const { data, isLoading, isError } = api.useGetProjectsQuery();

  const projects: IProject[] = data?.data?.data ?? [];

  useEffect(() => {
    setBreadcrumb({
      title: 'Dashboard',
      pages: [{ name: 'Projects', to: '/dashboard/projects', current: true }],
    });
  }, []);

  const openProjectModal = (project?: IProject): void => {
    setEditProject(project);
    setProjectFormOpen(true);
  };

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
              <Button title="Add project" onClick={() => openProjectModal()} />
            </div>
          </div>

          {/* Loading or Error state */}
          {isLoading && <p>Loading projects...</p>}
          {isError && <p>Failed to load projects.</p>}

          {/* Project cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projects.map((project: IProject) => (
              <ProjectCard
                key={project.id}
                project={project}
                openProjectModal={openProjectModal}
              />
            ))}
          </div>
        </Card.Body>
      </Card>

      {/* Conditionally render the ProjectFormModal */}
      {projectFormOpen && (
        <ProjectFormModal
          project={editProject}
          open={projectFormOpen}
          setOpen={setProjectFormOpen}
        />
      )}
    </>
  );
};

const ProjectCard: React.FC<{
  project: IProject;
  openProjectModal: (project?: IProject) => void;
}> = ({ project, openProjectModal }): ReactElement => {
  return (
    <>
      <div className="w-full mx-auto bg-white rounded-lg border border-gray-300 shadow-sm hover:bg-gray-50 transition-colors duration-200">
        <Link to={`/dashboard/project/${project.id}`}>
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {project.title}
            </h2>
            <p className="text-gray-600">{project.type.label}</p>
          </div>
        </Link>

        <div className="p-6">
          <div className="flex space-x-4">
            <button
              className="text-gray-600 hover:text-gray-800"
              onClick={() => openProjectModal(project)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faShareAlt} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faStar} />
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <FontAwesomeIcon icon={faInfoCircle} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
