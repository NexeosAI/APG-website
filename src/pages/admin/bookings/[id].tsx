import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Booking, BookingStatus } from '@/types/database';

export function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking:', error);
        toast.error('Failed to load booking details');
      }
    };

    fetchBooking();
  }, [id]);

  const updateBookingStatus = async (status: BookingStatus) => {
    setIsLoading(true);
    try {
      const updates: Partial<Booking> = { status };
      
      if (status === 'COMPLETED') {
        updates.completed_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      setBooking(prev => prev ? { ...prev, ...updates } : null);
      toast.success(`Booking status updated to ${status}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update booking status');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConvertToCustomer = async () => {
    if (!booking) return;
    
    setIsLoading(true);
    try {
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', booking.email)
        .single();

      if (existingCustomer) {
        toast.error('Customer already exists');
        return;
      }

      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: booking.customer_name,
          email: booking.email,
          phone: booking.phone,
          first_booking_date: booking.created_at,
          last_booking_date: booking.created_at,
          total_bookings: 1
        })
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

      setBooking(prev => prev ? { 
        ...prev, 
        customer_id: customer.id,
        converted_to_customer: true 
      } : null);

      toast.success('Successfully converted to customer');
    } catch (error) {
      console.error('Error converting to customer:', error);
      toast.error('Failed to convert to customer');
    } finally {
      setIsLoading(false);
    }
  };

  if (!booking) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="space-y-6">
        {/* Booking Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Customer Details</h3>
            <p>Name: {booking.customer_name}</p>
            <p>Email: {booking.email}</p>
            <p>Phone: {booking.phone}</p>
          </div>
          <div>
            <h3 className="font-semibold">Vehicle Details</h3>
            <p>Make: {booking.vehicle_make}</p>
            <p>Model: {booking.vehicle_model}</p>
            <p>Year: {booking.vehicle_year}</p>
          </div>
        </div>

        {/* Current Status */}
        <div>
          <h3 className="font-semibold">Current Status</h3>
          <p className="text-lg">{booking.status}</p>
        </div>

        {/* Status Management */}
        <div className="flex gap-4">
          {booking.status === 'PENDING' && (
            <Button
              onClick={() => updateBookingStatus('CONFIRMED')}
              disabled={isLoading}
            >
              Confirm Booking
            </Button>
          )}
          
          {booking.status === 'CONFIRMED' && (
            <Button
              onClick={() => updateBookingStatus('IN_PROGRESS')}
              disabled={isLoading}
            >
              Start Work
            </Button>
          )}

          {booking.status === 'IN_PROGRESS' && (
            <Button
              onClick={() => updateBookingStatus('COMPLETED')}
              disabled={isLoading}
            >
              Complete Job
            </Button>
          )}
        </div>

        {/* Customer Conversion - Separate section */}
        {booking.status === 'COMPLETED' && !booking.converted_to_customer && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-semibold mb-4">Customer Conversion</h3>
            <Button
              onClick={handleConvertToCustomer}
              disabled={isLoading}
              variant="destructive"
              className="w-full sm:w-auto"
            >
              Convert to Customer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
} 