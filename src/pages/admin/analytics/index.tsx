import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { BookingStatus } from '@/types/booking'

export default function AnalyticsPage() {
  // Fetch all bookings for analytics
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['analytics-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookings:', error)
        throw error
      }

      console.log('Fetched bookings for analytics:', data) // Debug log
      return data
    },
    refetchInterval: 5000,
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: 3
  })

  // Calculate statistics
  const totalBookings = bookings?.length || 0
  const thisMonthBookings = bookings?.filter(booking => {
    const bookingDate = new Date(booking.created_at)
    const now = new Date()
    return bookingDate.getMonth() === now.getMonth() && 
           bookingDate.getFullYear() === now.getFullYear()
  }).length || 0
  const pendingBookings = bookings?.filter(booking => 
    booking.status === 'PENDING'
  ).length || 0
  const completedBookings = bookings?.filter(booking => 
    booking.status === 'COMPLETED'
  ).length || 0

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <LoadingSpinner />
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminGuard>
      <AdminDashboardLayout>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
          
          {/* Statistics Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{totalBookings}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{thisMonthBookings}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pending Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-yellow-600">{pendingBookings}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-green-600">{completedBookings}</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings?.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{booking.customer_name}</p>
                      <p className="text-sm text-gray-500">{booking.service_type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {new Date(booking.created_at).toLocaleDateString()}
                      </p>
                      <p className={`text-sm font-medium ${getStatusColor(booking.status as BookingStatus)}`}>
                        {booking.status.toLowerCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    </AdminGuard>
  )
}

function getStatusColor(status: BookingStatus): string {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-600'
    case 'CONFIRMED':
      return 'text-blue-600'
    case 'IN_PROGRESS':
      return 'text-purple-600'
    case 'COMPLETED':
      return 'text-green-600'
    case 'CANCELLED':
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
} 