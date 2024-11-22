import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookingDetailsModal } from '@/components/admin/BookingDetailsModal'
import { StatusUpdateModal } from '@/components/admin/StatusUpdateModal'
import { BookingWithRelations } from '@/types/booking'
import { supabase } from '@/lib/supabase'
import { MoreVertical, Plus } from 'lucide-react'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Link } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getStatusColor } from '@/utils/booking'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { exportToCSV, formatBookingForExport } from '@/utils/export'
import { toast } from 'sonner'

export default function AdminBookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<BookingWithRelations | null>(null)
  const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const queryClient = useQueryClient()

  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookings:', error)
        throw error
      }
      
      return data
    },
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 0, // Consider data always stale
    refetchOnWindowFocus: true,
    retry: 3
  })

  const cancelBooking = useMutation({
    mutationFn: async (bookingId: string) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'CANCELLED' })
        .eq('id', bookingId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] })
    },
  })

  const handleExport = () => {
    if (bookings && bookings.length > 0) {
      try {
        const formattedData = bookings.map(booking => formatBookingForExport(booking));
        exportToCSV(formattedData, 'apg_bookings');
        toast.success('Bookings exported successfully');
      } catch (error) {
        console.error('Export error:', error);
        toast.error('Failed to export bookings');
      }
    } else {
      toast.error('No bookings to export');
    }
  };

  const getStatusBackgroundColor = useCallback((status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-50'
      case 'CONFIRMED':
        return 'bg-blue-50'
      case 'IN_PROGRESS':
        return 'bg-purple-50'
      case 'COMPLETED':
        return 'bg-green-50'
      case 'CANCELLED':
        return 'bg-red-50'
      default:
        return 'bg-gray-50'
    }
  }, [])

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Bookings List Section */}
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Bookings</CardTitle>
              <div className="flex space-x-2">
                <Button asChild variant="default">
                  <Link to="/admin/bookings/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Booking
                  </Link>
                </Button>
                <Button onClick={handleExport}>
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings?.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-4 rounded-lg border ${
                      getStatusBackgroundColor(booking.status)
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="font-medium">{booking.customer_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {booking.service_type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {booking.vehicle_make} {booking.vehicle_model}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-sm font-medium">
                          Appointment: {format(new Date(booking.preferred_date), 'PPP p')}
                        </p>
                        <p className="text-xs text-gray-500">
                          Booked: {format(new Date(booking.created_at), 'PP')}
                        </p>
                        <p className={`text-sm font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.toLowerCase()}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedBooking(booking)
                              setIsUpdateStatusOpen(true)
                            }}
                          >
                            Update Status
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => {
                              if (confirm('Are you sure you want to cancel this booking?')) {
                                cancelBooking.mutate(booking.id)
                              }
                            }}
                          >
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modals */}
        <BookingDetailsModal
          booking={selectedBooking}
          open={!!selectedBooking && !isUpdateStatusOpen}
          onClose={() => setSelectedBooking(null)}
        />
        <StatusUpdateModal
          booking={selectedBooking}
          open={isUpdateStatusOpen}
          onClose={() => {
            setIsUpdateStatusOpen(false)
            setSelectedBooking(null)
          }}
        />
      </AdminDashboardLayout>
    </AdminGuard>
  )
} 