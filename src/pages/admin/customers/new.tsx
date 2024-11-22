import { AdminGuard } from '@/components/auth/AdminGuard';
import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout';
import { CustomerForm } from '@/components/admin/CustomerForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewCustomerPage() {
  return (
    <AdminGuard>
      <AdminDashboardLayout>
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Customer</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerForm />
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    </AdminGuard>
  );
} 