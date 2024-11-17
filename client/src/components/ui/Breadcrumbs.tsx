import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import React, { ReactElement } from 'react';
import { useBreadcrumb } from '../../contexts/BreadcrumbProvider';
import { Link } from 'react-router-dom';

const Breadcrumbs: React.FC = (): ReactElement => {
  const { breadcrumb } = useBreadcrumb();

  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-5 space-y-2 md:space-y-0">
      {/* Breadcrumb Title */}
      {breadcrumb.title && (
        <span className="text-xl font-bold text-gray-700">
          {breadcrumb.title}
        </span>
      )}

      {/* Navigation */}
      <nav aria-label="Breadcrumb" className="flex">
        <ol role="list" className="flex items-center space-x-2">
          {breadcrumb.pages.length === 0 ? (
            <li>
              <div className="flex items-center">
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-gray-500 flex items-center"
                >
                  <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    Dashboard
                  </span>
                </Link>
              </div>
            </li>
          ) : (
            <>
              <li>
                <div className="flex items-center">
                  <Link
                    to="/dashboard"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                  </Link>
                </div>
              </li>
              {breadcrumb.pages.map((page) => (
                <li key={page.name}>
                  <div className="flex items-center">
                    <ChevronRightIcon
                      aria-hidden="true"
                      className="size-5 shrink-0 text-gray-400"
                    />
                    <Link
                      to={page.to}
                      aria-current={page.current ? 'page' : undefined}
                      className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {page.name}
                    </Link>
                  </div>
                </li>
              ))}
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
