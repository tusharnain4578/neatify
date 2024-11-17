import React, { ReactElement, useEffect, useState } from 'react';
import { useBreadcrumb } from '../contexts/BreadcrumbProvider';
import Card from '../components/ui/Card';
import Table from '../components/ui/Table';
import InviteMemberFormModal from '../components/InviteMemberFormModal';
import Button from '../components/ui/Button';

const Team: React.FC = (): ReactElement => {
  const { setBreadcrumb } = useBreadcrumb();
  const [memberInviteFormOpen, setMemberInviteFormOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setBreadcrumb({
      title: 'Team',
      pages: [{ name: 'Team', to: '/dashboard/team', current: true }],
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
                title="Invite member"
                onClick={() => setMemberInviteFormOpen(true)}
              />
            </div>
          </div>
          <Table />
        </Card.Body>
      </Card>
      <InviteMemberFormModal
        open={memberInviteFormOpen}
        setOpen={setMemberInviteFormOpen}
      />
    </>
  );
};

export default Team;
