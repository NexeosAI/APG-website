import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import type { BookingWithRelations } from '@/types/booking'
import type { BookingStatus } from '@/types/database'

interface StatusUpdateModalProps {
  booking: BookingWithRelations | null
  open: boolean
  onClose: () => void
}

export function StatusUpdateModal({ booking, open, onClose }: StatusUpdateModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [localBooking, setLocalBooking] = useState(booking)
  const queryClient = useQueryClient()

  useEffect(() => {
    setLocalBooking(booking)
  }, [booking])

  const updateStatus = async (status: BookingStatus) => {
    if (!booking) {
      console.error('No booking provided');
      return;
    }
    setIsLoading(true);

    try {
      const updates = {
        status: status
      };

      console.log('Sending update:', updates);

      const { data, error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', booking.id)
        .select('*')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      setLocalBooking(data);
      
      await queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      
      toast.success(`Status updated to ${status}`);

      if (status !== 'COMPLETED') {
        onClose();
      }
    } catch (error) {
      console.error('Detailed error:', error);
      toast.error('Failed to update status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToCustomer = async () => {
    if (!booking) return;
    setIsLoading(true);

    try {
      const { data: existingCustomers, error: checkError } = await supabase
        .from('customers')
        .select('id')
        .eq('email', booking.email);

      if (checkError) throw checkError;

      if (existingCustomers && existingCustomers.length > 0) {
        toast.error('Customer already exists');
        return;
      }

      const customerData = {
        name: booking.customer_name,
        email: booking.email || null,
        phone: booking.phone,
        total_bookings: 1,
        total_spent: 0,
        first_booking_date: booking.created_at,
        last_booking_date: booking.created_at
      };

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert([customerData])
        .select()
        .single();

      if (customerError) throw customerError;

      const { error: bookingError } = await supabase
        .from('bookings')
        .update({
          customer_id: customer.id,
          converted_to_customer: true
        })
        .eq('id', booking.id);

      if (bookingError) throw bookingError;

      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
      
      toast.success('Successfully converted to customer');
      onClose();
    } catch (error) {
      console.error('Detailed conversion error:', error);
      toast.error('Failed to convert to customer');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Update Booking Status"
    >
      <div className="space-y-4 pt-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h3 className="font-medium text-sm text-gray-700">
              Current Status: {localBooking?.status}
            </h3>
            
            <Button
              onClick={() => updateStatus('PENDING')}
              disabled={isLoading || localBooking?.status === 'PENDING'}
              variant={localBooking?.status === 'PENDING' ? 'outline' : 'default'}
              className="w-full"
            >
              Set as Pending
            </Button>

            <Button
              onClick={() => updateStatus('CONFIRMED')}
              disabled={isLoading || localBooking?.status === 'CONFIRMED'}
              variant={localBooking?.status === 'CONFIRMED' ? 'outline' : 'default'}
              className="w-full"
            >
              Confirm Booking
            </Button>

            <Button
              onClick={() => updateStatus('IN_PROGRESS')}
              disabled={isLoading || localBooking?.status === 'IN_PROGRESS'}
              variant={localBooking?.status === 'IN_PROGRESS' ? 'outline' : 'default'}
              className="w-full"
            >
              Start Work
            </Button>

            <Button
              onClick={() => updateStatus('COMPLETED')}
              disabled={isLoading || localBooking?.status === 'COMPLETED'}
              variant={localBooking?.status === 'COMPLETED' ? 'outline' : 'default'}
              className="w-full"
            >
              Complete Job
            </Button>

            <Button
              onClick={() => updateStatus('CANCELLED')}
              disabled={isLoading || localBooking?.status === 'CANCELLED'}
              variant={localBooking?.status === 'CANCELLED' ? 'outline' : 'destructive'}
              className="w-full"
            >
              Cancel Booking
            </Button>

            {localBooking?.status === 'COMPLETED' && !localBooking.converted_to_customer && (
              <Button
                onClick={handleConvertToCustomer}
                disabled={isLoading}
                variant="destructive"
                className="w-full mt-4"
              >
                Convert to Customer
              </Button>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Close
          </Button>
        </div>
      </div>
    </Modal>
  )
} 