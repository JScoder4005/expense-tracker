import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';

export function MainLayout() {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <SidebarInset className="flex-1">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-white px-6">
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
        </header>
        <div className="flex-1 p-6 bg-white">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
