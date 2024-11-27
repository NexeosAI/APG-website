import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface AdminUser {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'service_manager';
}

export function AdminManagement() {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<AdminUser['role']>('admin');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const { data: adminRoles, error: rolesError } = await supabase
        .from('admin_roles')
        .select(`
          id,
          role,
          users:id (
            email
          )
        `);

      if (rolesError) throw rolesError;

      setAdmins(adminRoles.map(admin => ({
        id: admin.id,
        email: admin.users[0].email,
        role: admin.role
      })));
    } catch (error) {
      console.error('Error fetching admins:', error);
      toast.error('Failed to load admin users');
    }
  };

  const addAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create user in Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newAdminEmail,
        email_confirm: true,
        user_metadata: { role: newAdminRole }
      });

      if (authError) throw authError;

      // 2. Add role to admin_roles table
      const { error: roleError } = await supabase
        .from('admin_roles')
        .insert([
          {
            id: authData.user.id,
            role: newAdminRole
          }
        ]);

      if (roleError) throw roleError;

      toast.success('Admin user added successfully');
      setNewAdminEmail('');
      fetchAdmins();
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error('Failed to add admin user');
    } finally {
      setLoading(false);
    }
  };

  const removeAdmin = async (adminId: string) => {
    try {
      // Remove from auth and admin_roles (cascade delete will handle the role)
      const { error } = await supabase.auth.admin.deleteUser(adminId);
      if (error) throw error;

      toast.success('Admin removed successfully');
      fetchAdmins();
    } catch (error) {
      console.error('Error removing admin:', error);
      toast.error('Failed to remove admin');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Add New Admin</h2>
        <form onSubmit={addAdmin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              value={newAdminRole}
              onChange={(e) => setNewAdminRole(e.target.value as AdminUser['role'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
            >
              <option value="admin">Admin</option>
              <option value="service_manager">Service Manager</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          <Button
            type="submit"
            variant="destructive"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Admin'}
          </Button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Current Admins</h2>
        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <p className="font-medium">{admin.email}</p>
                <p className="text-sm text-gray-500">{admin.role}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => removeAdmin(admin.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 