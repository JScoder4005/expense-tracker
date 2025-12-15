import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { ThemeToggle } from './ThemeToggle';

export function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Fixed width */}
      <AppSidebar />
      
      {/* Main Content - Takes remaining space */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-background px-6 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
          <ThemeToggle />
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
