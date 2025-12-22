import { Outlet, useLocation, Link } from 'react-router-dom';
import { useState } from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const routeTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/expenses': 'Expenses',
  '/categories': 'Categories',
  '/analytics': 'Analytics',
};

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const currentPage = routeTitles[location.pathname] || 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar - shows icons when collapsed */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } transition-all duration-300 ease-in-out shrink-0`}
      >
        <AppSidebar isCollapsed={!sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-background flex items-center gap-4 px-6 shrink-0 z-10">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="h-9 w-9 shrink-0"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
          
          <div className="flex items-center gap-2 text-sm">
            <Link to="/dashboard" className="font-semibold hover:underline">
              Expense Tracker
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{currentPage}</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto max-w-7xl w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
