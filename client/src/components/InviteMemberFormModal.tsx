import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import Modal from './ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Input from './ui/Input';

interface IMemberInviteFormModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MemberInviteFormModal: React.FC<IMemberInviteFormModalProps> = ({
  open,
  setOpen,
}: IMemberInviteFormModalProps): ReactElement => {
  return (
    <>
      <Modal size="md" open={open} setOpen={setOpen}>
        <Modal.Header>
          <h3 className="text-lg text-white">
            <FontAwesomeIcon icon={faUserPlus} className="text-base mr-3" />
            Invite member
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Input
            title="Email Address"
            type="email"
            name="email"
            size="xl"
            placeholder="Enter email address"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MemberInviteFormModal;
