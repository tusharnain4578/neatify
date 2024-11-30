import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Modal from './ui/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFloppyDisk,
  faFolderPlus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Input from './ui/Input';
import * as yup from 'yup';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../redux/api';
import { handleApiError } from '../utils/apiHandlers';
import { useNotification } from '../contexts/NotificationContext';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import Select from './ui/Select';

interface Inputs {
  title: string;
  description?: string;
  type: number;
  status: number;
}

interface InputsWithId extends Inputs {
  id: number;
}

interface IProjectFormModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  project?: IProject;
}

const validationSchema: yup.ObjectSchema<Inputs> = yup.object().shape({
  title: yup.string().max(200).required('Title is required'),
  description: yup.string().optional(),
  type: yup.number().required('Project type is required.'),
  status: yup.number().required('Status is required'),
});

const ProjectFormModal: React.FC<IProjectFormModalProps> = ({
  open,
  setOpen,
  project,
}: IProjectFormModalProps): ReactElement => {
  const [selectedStatus, setSelectedStatus] = useState<
    SelectOption | undefined
  >(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const { showNotification } = useNotification();

  const { data: projectTypesData, isLoading: projectTypesDataLoading } =
    api.useGetProjectTypesQuery();
  const { data: projectStatusesData, isLoading: projectStatusesDataLoading } =
    api.useGetProjectStatusesQuery();

  const [createProject, { isLoading: createProjectLoading }] =
    api.useCreateProjectMutation();
  const [updateProject, { isLoading: updateProjectLoading }] =
    api.useUpdateProjectMutation();

  const projectTypes = projectTypesData?.data ?? null;
  const projectStatuses = projectStatusesData?.data ?? null;

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      if (project) {
        const postData: InputsWithId = { ...data, id: project.id };
        const res = await updateProject(postData).unwrap();
        showNotification(res.message);
      } else {
        const res = await createProject(data).unwrap();
        showNotification(res.message);
      }
      setOpen(false);
    } catch (err: unknown) {
      handleApiError(err, showNotification, setError);
    }
  };

  useEffect(() => {
    selectedStatus && setValue('status', selectedStatus.id);
  }, [selectedStatus, setValue]);

  useEffect(() => {
    project && projectStatuses && setSelectedStatus(project?.status);
  }, [projectStatuses, project]);

  useEffect(() => {
    project && projectTypes && setValue('type', project.type.id);
  }, [projectTypes, project]);

  const loading = projectTypesDataLoading || projectStatusesDataLoading;

  const submitProjectLoading = createProjectLoading || updateProjectLoading;

  return (
    <>
      <Modal size="lg" open={open} setOpen={setOpen}>
        <Modal.Header>
          <h3 className="text-lg text-white">
            <FontAwesomeIcon icon={faFolderPlus} className="text-base mr-3" />
            {project ? 'Update' : 'Add'} Project
          </h3>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <></>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Select
                name="type"
                title="Project type"
                options={projectTypes ?? []}
                isSearchable={false}
                onChange={(x) =>
                  setValue('type', (x as ReactSelectedOption).value)
                }
                defaultValue={() =>
                  project
                    ? { label: project.type.label, value: project.type.id }
                    : undefined
                }
                error={errors.type?.message}
                required
              />
              <Input
                title="Project Title"
                name="title"
                placeholder="Enter project title"
                formRegister={register}
                error={errors.title?.message}
                disabled={submitProjectLoading}
                defaultValue={project?.title}
                required
              />
              <Textarea
                title="Project Description"
                name="description"
                rows={5}
                placeholder="Enter description for project"
                formRegister={register}
                defaultValue={project?.description}
                error={errors.description?.message}
                disabled={submitProjectLoading}
              />
              <fieldset className="mt-5">
                <legend className="text-sm/6 mb-1 font-semibold text-gray-900">
                  Select project status
                </legend>
                <RadioGroup
                  defaultValue={project?.status.id}
                  className="grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4"
                >
                  {projectStatuses?.map((status) => (
                    <Radio
                      key={status.id}
                      value={status.id}
                      aria-label={status.label}
                      defaultChecked={selectedStatus?.id === status.id}
                      onClick={() => setSelectedStatus(status)}
                      // aria-description={`${status.description}`}
                      className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-indigo-600 data-[focus]:ring-2 data-[focus]:ring-indigo-600"
                    >
                      <span className="flex flex-1">
                        <span className="flex flex-col">
                          <span className="block text-sm font-medium text-gray-900">
                            {status.label}
                          </span>
                          <span className="mt-1 flex items-center text-sm text-gray-500">
                            {/* {status.description} */}
                          </span>
                        </span>
                      </span>
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="size-5 text-indigo-600 [.group:not([data-checked])_&]:invisible"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-600"
                      />
                    </Radio>
                  ))}
                </RadioGroup>
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}{' '}
              </fieldset>
              <div className="text-end">
                <Button
                  title={project ? 'Save Changes' : 'Create'}
                  icon={project ? faFloppyDisk : faPlus}
                  className="mt-5"
                  type="submit"
                  disabled={submitProjectLoading}
                />
              </div>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectFormModal;
