import {
  LayoutDashboard,
  Wallet,
  Tags,
  BarChart3,
  LogOut,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { getUserInitials } from '@/lib/sessionStorage';

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

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
  };

  const userInitials = user ? getUserInitials(user.email) : 'U';

  return (
    <Sidebar className="border-r bg-gray-50">
      <SidebarHeader className="border-b bg-white px-6 py-5">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white font-bold text-lg">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 truncate max-w-[160px]">
              {user?.email || 'User'}
            </span>
            <span className="text-xs text-gray-500">Expense Tracker</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      isActive={isActive}
                      className={`
                        w-full px-3 py-2.5 rounded-lg transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-white p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-medium transition-colors"
          onClick={handleLogout}
          disabled={isPending}
        >
          <LogOut className="mr-2 h-5 w-5" />
          {isPending ? 'Logging out...' : 'Logout'}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
