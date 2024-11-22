import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { useBookingStore } from '@/stores/bookingStore'

interface VehicleFormProps {
  onComplete: () => void
}

export const VehicleForm = ({ onComplete }: VehicleFormProps) => {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    registration: ''
  })
  const setSelectedVehicle = useBookingStore(state => state.setSelectedVehicle)
  const userId = 'current-user-id' // Replace with actual user ID from auth

  const createVehicle = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .insert({
          ...formData,
          year: parseInt(formData.year),
          user_id: userId
        })
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: (data) => {
      setSelectedVehicle(data)
      onComplete()
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createVehicle.mutate()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="make">Make</Label>
        <Input
          id="make"
          value={formData.make}
          onChange={e => setFormData(prev => ({ ...prev, make: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          value={formData.model}
          onChange={e => setFormData(prev => ({ ...prev, model: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          value={formData.year}
          onChange={e => setFormData(prev => ({ ...prev, year: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="registration">Registration</Label>
        <Input
          id="registration"
          value={formData.registration}
          onChange={e => setFormData(prev => ({ ...prev, registration: e.target.value }))}
          required
        />
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onComplete}>
          Cancel
        </Button>
        <Button type="submit" disabled={createVehicle.isPending}>
          Add Vehicle
        </Button>
      </div>
    </form>
  )
} 