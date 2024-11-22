import { AdminGuard } from '@/components/auth/AdminGuard'
import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout'
import { ManualBookingForm } from '@/components/admin/ManualBookingForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function NewBookingPage() {
  return (
    <AdminGuard>
      <AdminDashboardLayout>
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <ManualBookingForm />
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    </AdminGuard>
  )
} 