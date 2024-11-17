import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import Modal from './ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Input from './ui/Input';
import Textarea from './ui/Textarea';

interface IProjectFormModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ProjectFormModal: React.FC<IProjectFormModalProps> = ({
  open,
  setOpen,
}: IProjectFormModalProps): ReactElement => {
  return (
    <>
      <Modal size="lg" open={open} setOpen={setOpen}>
        <Modal.Header>
          <h3 className="text-lg text-white">
            <FontAwesomeIcon icon={faFolderPlus} className="text-base mr-3" />
            Add Project
          </h3>
        </Modal.Header>
        <Modal.Body>
          <Input
            title="Project Title"
            name="title"
            placeholder="Enter project title"
            className="mb-5"
            required
          />
          <Textarea
            title="Project Description"
            name="description"
            rows={5}
            placeholder="Enter description for project"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectFormModal;
