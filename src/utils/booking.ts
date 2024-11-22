import { BookingStatus } from '@/types/booking'

export function getStatusColor(status: BookingStatus): string {
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
      return ''
  }
} 