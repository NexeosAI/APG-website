import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/stores/bookingStore'
import { supabase } from '@/lib/supabase'
import { TimeSlot } from '@/types/booking'
import { useState } from 'react'

export const TimeSlotSelection = () => {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const { selectedService, setSelectedSlot } = useBookingStore()

  const { data: timeSlots } = useQuery({
    queryKey: ['timeSlots', selectedService?.id, selectedDate],
    queryFn: async () => {
      if (!selectedDate || !selectedService) return []
      
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('service_id', selectedService.id)
        .eq('is_available', true)
        .gte('start_time', format(selectedDate, 'yyyy-MM-dd'))
        .lte('start_time', format(selectedDate, 'yyyy-MM-dd 23:59:59'))
        .order('start_time')

      if (error) throw error
      return data as TimeSlot[]
    },
    enabled: !!selectedDate && !!selectedService
  })

  return (
    <div className="space-y-6">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
        className="rounded-md border"
        disabled={(date) => {
          const now = new Date()
          return date < now || date > new Date(now.setMonth(now.getMonth() + 2))
        }}
      />
      
      {selectedDate && (
        <div className="grid grid-cols-4 gap-2">
          {timeSlots?.map((slot) => (
            <Button
              key={slot.id}
              variant="outline"
              onClick={() => setSelectedSlot(slot)}
            >
              {format(new Date(slot.start_time), 'HH:mm')}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
} 