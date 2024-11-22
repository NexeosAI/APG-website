import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TimeSlot } from '@/types/booking'
import { supabase } from '@/lib/supabase'
import { format, addHours, setHours, setMinutes } from 'date-fns'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export function ServiceAvailabilityManager() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const queryClient = useQueryClient()

  const { data: timeSlots, isLoading } = useQuery({
    queryKey: ['timeSlots', format(selectedDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('date', format(selectedDate, 'yyyy-MM-dd'))
        .order('start_time')

      if (error) throw error
      return data as TimeSlot[]
    },
  })

  const generateSlots = useMutation({
    mutationFn: async (date: Date) => {
      const slots = []
      let startTime = setMinutes(setHours(date, 9), 0) // Start at 9 AM
      const endTime = setMinutes(setHours(date, 17), 0) // End at 5 PM

      while (startTime < endTime) {
        slots.push({
          date: format(date, 'yyyy-MM-dd'),
          start_time: startTime.toISOString(),
          end_time: addHours(startTime, 1).toISOString(),
          is_available: true,
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
    },
  })

  const toggleAvailability = useMutation({
    mutationFn: async ({ id, isAvailable }: { id: string; isAvailable: boolean }) => {
      const { error } = await supabase
        .from('time_slots')
        .update({ is_available: isAvailable })
        .eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeSlots'] })
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md border"
            />
            <Button
              onClick={() => generateSlots.mutate(selectedDate)}
              disabled={generateSlots.isPending}
              className="mt-4 w-full"
            >
              Generate Time Slots
            </Button>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Time Slots</h3>
            {isLoading ? (
              <LoadingSpinner />
            ) : timeSlots?.length === 0 ? (
              <p className="text-muted-foreground">No time slots available for this date.</p>
            ) : (
              <div className="grid gap-2">
                {timeSlots?.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span>
                      {format(new Date(slot.start_time), 'h:mm a')} -{' '}
                      {format(new Date(slot.end_time), 'h:mm a')}
                    </span>
                    <Button
                      variant={slot.is_available ? 'default' : 'outline'}
                      onClick={() =>
                        toggleAvailability.mutate({
                          id: slot.id,
                          isAvailable: !slot.is_available,
                        })
                      }
                      disabled={toggleAvailability.isPending}
                    >
                      {slot.is_available ? 'Available' : 'Unavailable'}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 