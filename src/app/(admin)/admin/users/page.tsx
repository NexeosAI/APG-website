import { AdminManagement } from '@/components/AdminManagement';

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin User Management</h1>
      <AdminManagement />
    </div>
  );
} 