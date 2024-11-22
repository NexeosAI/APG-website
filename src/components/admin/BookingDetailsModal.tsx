import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { format } from 'date-fns'
import { BookingWithRelations } from '@/types/booking'

interface BookingDetailsModalProps {
  booking: BookingWithRelations | null
  open: boolean
  onClose: () => void
}

export function BookingDetailsModal({ booking, open, onClose }: BookingDetailsModalProps) {
  if (!booking) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Customer</h3>
            <p>{booking.customer_name}</p>
            <p>{booking.email}</p>
            <p>{booking.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Service</h3>
            <p>{booking.service_type}</p>
          </div>
          <div>
            <h3 className="font-semibold">Vehicle</h3>
            <p>
              {booking.vehicle_make} {booking.vehicle_model} ({booking.vehicle_year})
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Date</h3>
            <p>{format(new Date(booking.preferred_date), 'PPP p')}</p>
          </div>
          {booking.notes && (
            <div>
              <h3 className="font-semibold">Notes</h3>
              <p>{booking.notes}</p>
            </div>
          )}
          <div>
            <h3 className="font-semibold">Status</h3>
            <p className="capitalize">{booking.status.toLowerCase()}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 