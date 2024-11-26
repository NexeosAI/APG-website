export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  service_type: string;
  preferred_date: string;
  notes: string;
  status: BookingStatus;
  converted_to_customer?: boolean;
  customer_id?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  data_consent: boolean;
  data_consent_date: string;
  marketing_consent?: boolean;
  marketing_consent_date?: string;
  data_retention_date: string;
  privacy_policy_version: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  total_bookings: number;
  total_spent: number;
  first_booking_date: string;
  last_booking_date: string;
  created_at: string;
  updated_at: string;
  data_consent: boolean;
  data_consent_date: string;
  marketing_consent: boolean;
  marketing_consent_date: string;
  data_retention_date: string;
  privacy_policy_version: string;
  last_export_date?: string;
  data_deletion_requested?: boolean;
  data_deletion_date?: string;
} 