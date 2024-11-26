import type { Booking } from './database';

export interface BookingWithRelations extends Omit<Booking, 'converted_to_customer'> {
  converted_to_customer: boolean;
  customer_id?: string;
} 