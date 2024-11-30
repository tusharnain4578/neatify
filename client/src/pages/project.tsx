import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import api from '../redux/api';
import Error404 from '../pages/errors/error404';
import { parseNumericId } from '../utils/helper';

const Project: React.FC = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  const projectId = id ? parseNumericId(id) : null;

  if (projectId === null) {
    return <Error404 />;
  }

  const { data, isLoading } = api.useGetProjectByIdQuery({ id: projectId });
  const project = data?.data;

  if (isLoading) return <div>Loading ...</div>;

  if (!project) return <Error404 />;

  return <div>{project.title}</div>;
};

export default Project;
