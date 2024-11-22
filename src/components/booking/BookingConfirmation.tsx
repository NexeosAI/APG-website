import { useMutation } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/stores/bookingStore'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

export const BookingConfirmation = () => {
  const navigate = useNavigate()
  const { selectedService, selectedSlot, selectedVehicle, resetBooking } = useBookingStore()
  const userId = 'current-user-id' // Replace with actual user ID from auth

  const createBooking = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          user_id: userId,
          vehicle_id: selectedVehicle?.id,
          service_id: selectedService?.id,
          slot_id: selectedSlot?.id,
          status: 'PENDING',
          notes: '',
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      resetBooking()
      navigate('/dashboard/bookings')
    },
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Service</h3>
            <p>{selectedService?.name}</p>
            <p>£{selectedService?.price}</p>
          </div>
          <div>
            <h3 className="font-semibold">Time</h3>
            <p>{selectedSlot && format(new Date(selectedSlot.start_time), 'PPP p')}</p>
          </div>
          <div>
            <h3 className="font-semibold">Vehicle</h3>
            <p>{selectedVehicle?.make} {selectedVehicle?.model}</p>
            <p>{selectedVehicle?.registration}</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={resetBooking}>
          Cancel
        </Button>
        <Button 
          onClick={() => createBooking.mutate()}
          disabled={createBooking.isPending}
        >
          Confirm Booking
        </Button>
      </div>
    </div>
  )
} 