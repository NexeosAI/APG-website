import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useBookingStore } from '@/stores/bookingStore'
import { supabase } from '@/lib/supabase'
import { Service } from '@/types/booking'

export const ServiceSelection = () => {
  const setSelectedService = useBookingStore((state) => state.setSelectedService)

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
      if (error) throw error
      return data as Service[]
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {services?.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
            <CardDescription>£{service.price}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{service.description}</p>
            <p>Duration: {service.duration} minutes</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setSelectedService(service)}>
              Book Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 