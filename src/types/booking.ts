export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
}

export interface TimeSlot {
  id: string
  service_id: string
  start_time: string
  end_time: string
  is_available: boolean
}

export interface Vehicle {
  id: string
  user_id: string
  make: string
  model: string
  year: number
  registration: string
  created_at: string
}

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
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

export type BookingWithRelations = Booking;

export interface DataTableColumn<T> {
  accessorKey?: string
  id?: string
  header: string
  cell?: ({ row }: { row: { original: T } }) => React.ReactNode
} 