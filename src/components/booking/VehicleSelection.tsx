import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useBookingStore } from '@/stores/bookingStore'
import { supabase } from '@/lib/supabase'
import { Vehicle } from '@/types/booking'
import { useState } from 'react'
import { VehicleForm } from './VehicleForm'

export const VehicleSelection = () => {
  const [showForm, setShowForm] = useState(false)
  const { setSelectedVehicle } = useBookingStore()
  const userId = 'current-user-id' // Replace with actual user ID from auth

  const { data: vehicles } = useQuery({
    queryKey: ['vehicles', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error
      return data as Vehicle[]
    }
  })

  if (showForm) {
    return <VehicleForm onComplete={() => setShowForm(false)} />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Select Vehicle</h2>
        <Button onClick={() => setShowForm(true)}>Add New Vehicle</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vehicles?.map((vehicle) => (
          <Card 
            key={vehicle.id}
            className="cursor-pointer hover:border-primary"
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <CardHeader>
              <CardTitle>{vehicle.make} {vehicle.model}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Year: {vehicle.year}</p>
              <p>Registration: {vehicle.registration}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 