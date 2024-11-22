import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function ManualBookingForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    preferredDate: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create the booking directly without creating separate vehicle/service records
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_name: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          vehicle_make: formData.vehicleMake,
          vehicle_model: formData.vehicleModel,
          vehicle_year: parseInt(formData.vehicleYear),
          service_type: formData.serviceType,
          preferred_date: new Date(formData.preferredDate).toISOString(),
          notes: formData.notes,
          status: 'PENDING'
        });

      if (bookingError) {
        console.error('Booking Error:', bookingError);
        throw bookingError;
      }

      toast.success('Booking created successfully');
      navigate('/admin/bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking. Please check the console for details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleMake">Vehicle Make</Label>
          <Input
            id="vehicleMake"
            value={formData.vehicleMake}
            onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleModel">Vehicle Model</Label>
          <Input
            id="vehicleModel"
            value={formData.vehicleModel}
            onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleYear">Vehicle Year</Label>
          <Input
            id="vehicleYear"
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.vehicleYear}
            onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type</Label>
          <Select 
            onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MOT">MOT Test</SelectItem>
              <SelectItem value="SERVICE">Service</SelectItem>
              <SelectItem value="REPAIR">Repair</SelectItem>
              <SelectItem value="DIAGNOSTIC">Diagnostic</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredDate">Preferred Date</Label>
          <Input
            id="preferredDate"
            type="datetime-local"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Booking...' : 'Create Booking'}
      </Button>
    </form>
  );
} 