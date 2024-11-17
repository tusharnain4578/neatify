import React, { ReactElement, useEffect, useState } from 'react';
import { useBreadcrumb } from '../contexts/BreadcrumbProvider';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ProjectFormModal from '../components/ProjectFormModal';

const Projects: React.FC = (): ReactElement => {
  const { setBreadcrumb } = useBreadcrumb();
  const [projectFormOpen, setProjectFormOpen] = useState<boolean>(false);

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
              <h1 className="text-base font-semibold text-gray-900">Users</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                title, email and role.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <Button
                title="Add project"
                onClick={() => setProjectFormOpen(true)}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
      <ProjectFormModal open={projectFormOpen} setOpen={setProjectFormOpen} />
    </>
  );
};

export default Projects;
