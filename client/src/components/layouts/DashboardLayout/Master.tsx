import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SidebarProvider } from '../../../contexts/SidebarContext';
import Breadcrumbs from '../../ui/Breadcrumbs';
import { BreadcrumbProvider } from '../../../contexts/BreadcrumbProvider';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <BreadcrumbProvider>
        <Sidebar />
        <div>
          <div className="lg:pl-72">
            <Navbar />
            <main className="py-5">
              <div className="px-4 sm:px-6 lg:px-8">
                <Breadcrumbs />
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </BreadcrumbProvider>
    </SidebarProvider>
  );
}
