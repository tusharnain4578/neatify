import React, { ReactElement, useEffect } from 'react';
import { useBreadcrumb } from '../contexts/BreadcrumbProvider';

const dashboard: React.FC = (): ReactElement => {
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb({
      title: 'Dashboard',
      pages: [],
    });
  }, []);

  return <div>Dashboard</div>;
};

export default dashboard;
