import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { BookingStatus, BookingWithRelations } from '@/types/booking'
import { supabase } from '@/lib/supabase'

interface StatusUpdateModalProps {
  booking: BookingWithRelations | null
  open: boolean
  onClose: () => void
}

const STATUS_OPTIONS: BookingStatus[] = [
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
]

export function StatusUpdateModal({ booking, open, onClose }: StatusUpdateModalProps) {
  const [status, setStatus] = useState<BookingStatus | ''>('')
  const queryClient = useQueryClient()

  const updateStatus = useMutation({
    mutationFn: async ({ bookingId, newStatus }: { bookingId: string; newStatus: BookingStatus }) => {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] })
      onClose()
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (booking && status) {
      updateStatus.mutate({ bookingId: booking.id, newStatus: status })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Booking Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as BookingStatus)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option.toLowerCase().replace('_', ' ')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!status || updateStatus.isPending}
            >
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 