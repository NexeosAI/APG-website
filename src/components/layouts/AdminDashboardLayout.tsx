import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BarChart3, Calendar, Users, Settings, Plus, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Logged out successfully');
      navigate('/auth/signin');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/admin', icon: Home, label: 'Dashboard' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/admin/customers', icon: Users, label: 'Customers' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="flex items-center space-x-2">
              <img 
                src="/logo/APG-logo.svg" 
                alt="APG Logo" 
                className="h-8 w-auto"
              />
              <h1 className="text-xl font-bold hidden sm:block">Admin Dashboard</h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/" target="_blank">View Website</Link>
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm fixed left-0 h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 p-2 rounded transition-colors ${
                  isActiveRoute(item.path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            {isActiveRoute('/admin/bookings') && (
              <Link
                to="/admin/bookings/new"
                className="flex items-center space-x-2 p-2 rounded ml-4 text-blue-600 hover:bg-blue-50"
              >
                <Plus size={20} />
                <span>New Booking</span>
              </Link>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6 w-[calc(100%-16rem)]">
          {children}
        </main>
      </div>
    </div>
  );
} 