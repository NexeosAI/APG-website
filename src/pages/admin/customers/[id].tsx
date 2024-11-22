import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AdminGuard } from '@/components/auth/AdminGuard'
import type { CustomerProfile } from '@/types/customer'
import { format } from 'date-fns'

export default function CustomerDetailsPage() {
  const { id } = useParams()

  const { data: customer, isLoading } = useQuery({
    queryKey: ['customer', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data as CustomerProfile
    },
  })

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <LoadingSpinner />
      </AdminDashboardLayout>
    )
  }

  if (!customer) {
    return (
      <AdminDashboardLayout>
        <div className="p-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-gray-500">Customer not found</p>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminGuard>
      <AdminDashboardLayout>
        <div className="p-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-500">Name</h3>
                  <p className="text-lg">{customer.name}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Email</h3>
                  <p className="text-lg">{customer.email}</p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Phone</h3>
                  <p className="text-lg">{customer.phone}</p>
                </div>
                {customer.address && (
                  <div>
                    <h3 className="font-medium text-gray-500">Address</h3>
                    <p className="text-lg">{customer.address}</p>
                  </div>
                )}
                {customer.notes && (
                  <div>
                    <h3 className="font-medium text-gray-500">Notes</h3>
                    <p className="text-lg whitespace-pre-wrap">{customer.notes}</p>
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-500">Customer Since</h3>
                  <p className="text-lg">{format(new Date(customer.created_at), 'PPP')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    </AdminGuard>
  )
} 