import { BookingWithRelations } from '@/types/booking'
import { Customer } from '@/types/customer'
import { GenericRecord } from '@/types/common'
import { format } from 'date-fns'

export function exportToCSV<T extends GenericRecord>(data: T[], filename: string) {
  if (data.length === 0) return

  const headers = Object.keys(data[0]).join(',')
  const rows = data.map(item => Object.values(item).join(','))
  const csv = [headers, ...rows].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`
  link.click()
}

export function formatBookingForExport(booking: BookingWithRelations) {
  return {
    'Customer Name': booking.customer_name,
    'Email': booking.email,
    'Phone': booking.phone,
    'Vehicle': `${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})`,
    'Service Type': booking.service_type,
    'Preferred Date': new Date(booking.preferred_date).toLocaleString(),
    'Status': booking.status,
    'Notes': booking.notes || '',
    'Created At': new Date(booking.created_at).toLocaleString(),
  };
}

export function formatCustomerForExport(customer: Customer) {
  return {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    joined: format(new Date(customer.created_at), 'PPP'),
    address: customer.address || 'N/A',
    notes: customer.notes || 'N/A',
  }
} 