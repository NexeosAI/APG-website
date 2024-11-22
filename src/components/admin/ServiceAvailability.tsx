import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { TimeSlot } from '@/types/booking'
import { supabase } from '@/lib/supabase'
import { format, addHours, setHours, setMinutes } from 'date-fns'

interface TimeSlotGroup {
  [date: string]: TimeSlot[]
}

export function ServiceAvailability() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const queryClient = useQueryClient()

  const { data: timeSlots } = useQuery({
    queryKey: ['timeSlots', selectedDate],
    queryFn: async () => {
      if (!selectedDate) return {}

      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .gte('start_time', format(selectedDate, 'yyyy-MM-dd'))
        .lte('start_time', format(selectedDate, 'yyyy-MM-dd 23:59:59'))
        .order('start_time')

      if (error) throw error

      // Group slots by date
      return (data || []).reduce<TimeSlotGroup>((acc, slot) => {
        const date = format(new Date(slot.start_time), 'yyyy-MM-dd')
        acc[date] = [...(acc[date] || []), slot]
        return acc
      }, {})
    },
    enabled: !!selectedDate
  })

  const generateSlots = useMutation({
    mutationFn: async (date: Date) => {
      const slots = []
      let startTime = setMinutes(setHours(date, 9), 0) // Start at 9 AM
      const endTime = setMinutes(setHours(date, 17), 0) // End at 5 PM

      while (startTime < endTime) {
        slots.push({
          start_time: startTime.toISOString(),
          end_time: addHours(startTime, 1).toISOString(),
          is_available: true
        })
        startTime = addHours(startTime, 1)
      }

      const { error } = await supabase
        .from('time_slots')
        .insert(slots)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    }
  })

  const toggleSlotAvailability = useMutation({
    mutationFn: async ({ id, isAvailable }: { id: string; isAvailable: boolean }) => {
      const { error } = await supabase
        .from('time_slots')
        .update({ is_available: isAvailable })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    }
  })

  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
        />
        {selectedDate && (
          <Button
            onClick={() => generateSlots.mutate(selectedDate)}
            disabled={generateSlots.isPending}
            className="mt-4"
          >
            Generate Slots
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {selectedDate && timeSlots?.[format(selectedDate, 'yyyy-MM-dd')]?.map((slot) => (
          <div
            key={slot.id}
            className="flex items-center justify-between p-4 border rounded-md"
          >
            <span>
              {format(new Date(slot.start_time), 'HH:mm')} -{' '}
              {format(new Date(slot.end_time), 'HH:mm')}
            </span>
            <Button
              variant={slot.is_available ? 'default' : 'outline'}
              onClick={() => toggleSlotAvailability.mutate({
                id: slot.id,
                isAvailable: !slot.is_available
              })}
            >
              {slot.is_available ? 'Available' : 'Unavailable'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
} 