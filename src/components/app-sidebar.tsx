import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { getUserInitials } from '@/lib/sessionStorage';
import {
  LayoutDashboard,
  Wallet,
  Tags,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Expenses',
    url: '/expenses',
    icon: Wallet,
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: Tags,
  },
  {
    title: 'Analytics',
    url: '/analytics',
    icon: BarChart3,
  },
];

interface AppSidebarProps {
  isCollapsed: boolean;
}

export function AppSidebar({ isCollapsed }: AppSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { mutate: logout, isPending } = useLogout();

  const userInitials = user ? getUserInitials(user.email) : 'U';

  return (
    <TooltipProvider>
      <div className="h-screen flex flex-col bg-sidebar border-r">
        {/* Header */}
        <div className="border-b p-3">
          <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''} mb-3`}>
            <Avatar className={isCollapsed ? 'h-8 w-8' : 'h-10 w-10'}>
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-sm">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold truncate max-w-[140px]">
                  {user?.email || 'User'}
                </span>
                <span className="text-xs text-muted-foreground">Expense Tracker</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Input
              type="search"
              placeholder="Search..."
              className="w-full h-9"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Navigation
              </p>
            )}
            {menuItems.map((item) => {
              const isActive = location.pathname === item.url;
              const button = (
                <button
                  key={item.title}
                  onClick={() => navigate(item.url)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium">{item.title}</span>}
                </button>
              );

              if (isCollapsed) {
                return (
                  <Tooltip key={item.title} delayDuration={0}>
                    <TooltipTrigger asChild>{button}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return button;
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-3">
          {isCollapsed ? (
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => logout()}
                  disabled={isPending}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Logout</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={() => logout()}
              disabled={isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              {isPending ? 'Logging out...' : 'Logout'}
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
