import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Service } from '@/types/booking'
import { supabase } from '@/lib/supabase'
import { ServiceAvailabilityManager } from '@/components/admin/ServiceAvailabilityManager'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function SettingsPage() {
  const queryClient = useQueryClient()
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  })

  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('name')
      if (error) throw error
      return data as Service[]
    },
  })

  const createService = useMutation({
    mutationFn: async (serviceData: Omit<Service, 'id'>) => {
      const { error } = await supabase
        .from('services')
        .insert(serviceData)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] })
      setNewService({ name: '', description: '', duration: '', price: '' })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createService.mutate({
      name: newService.name,
      description: newService.description,
      duration: parseInt(newService.duration),
      price: parseFloat(newService.price),
    })
  }

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <LoadingSpinner />
      </AdminDashboardLayout>
    )
  }

  return (
    <AdminGuard>
      <AdminDashboardLayout>
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Settings</h1>

          <Card>
            <CardHeader>
              <CardTitle>Services Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Service Name</Label>
                  <Input
                    id="name"
                    value={newService.name}
                    onChange={(e) => setNewService(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newService.description}
                    onChange={(e) => setNewService(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newService.duration}
                    onChange={(e) => setNewService(prev => ({ ...prev, duration: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (£)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={newService.price}
                    onChange={(e) => setNewService(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" disabled={createService.isPending}>
                  Add Service
                </Button>
              </form>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Existing Services</h3>
                {services?.map((service) => (
                  <Card key={service.id}>
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <h4 className="font-semibold">{service.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {service.duration} mins - £{service.price}
                        </p>
                      </div>
                      <Button variant="outline">Edit</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <ServiceAvailabilityManager />
        </div>
      </AdminDashboardLayout>
    </AdminGuard>
  )
} 