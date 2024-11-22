import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home, BarChart3, Calendar, Users, Settings, Plus } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <img 
              src="/images/apg-logo.png" 
              alt="APG Logo" 
              className="h-8"
            />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" asChild>
            <Link to="/">Back to Website</Link>
          </Button>
        </div>
      </header>

      {/* Sidebar and Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-2">
            <Link to="/admin" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/analytics" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
            <Link to="/admin/bookings" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <Calendar size={20} />
              <span>Bookings</span>
            </Link>
            <Link to="/admin/bookings/new" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded ml-4 text-blue-600">
              <Plus size={20} />
              <span>New Booking</span>
            </Link>
            <Link to="/admin/customers" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <Users size={20} />
              <span>Customers</span>
            </Link>
            <Link to="/admin/settings" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
              <Settings size={20} />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
} 