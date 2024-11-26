import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { PrivacyPolicy } from '@/components/PrivacyPolicy';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    preferredDate: '',
    notes: '',
    dataConsent: false,
    marketingConsent: false,
  });
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);

  // Function to format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Get today's date
  const today = formatDate(new Date());

  // Function to check if a date is a weekend
  const isWeekend = (date: string) => {
    const d = new Date(date);
    return d.getDay() === 0 || d.getDay() === 6; // 0 is Sunday, 6 is Saturday
  };

  // Handle date change with weekend validation
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!isWeekend(selectedDate)) {
      setFormData({ ...formData, preferredDate: selectedDate });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!formData.name || !formData.phone || !formData.vehicleMake || 
          !formData.vehicleModel || !formData.vehicleYear || !formData.serviceType) {
        throw new Error('Please fill in all required fields');
      }

      // Create minimal booking data
      const bookingData = {
        customer_name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim(),
        vehicle_make: formData.vehicleMake.trim(),
        vehicle_model: formData.vehicleModel.trim(),
        vehicle_year: parseInt(formData.vehicleYear),
        service_type: formData.serviceType,
        preferred_date: new Date(formData.preferredDate).toISOString(),
        notes: formData.notes.trim() || '',
        status: 'PENDING',
        converted_to_customer: false
      };

      console.log('Submitting booking:', bookingData);

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Booking created:', data);

      toast.success('Booking submitted successfully');
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicleMake: '',
        vehicleModel: '',
        vehicleYear: '',
        serviceType: '',
        preferredDate: '',
        notes: '',
        dataConsent: false,
        marketingConsent: false,
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Book a Service">
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="vehicleMake" className="block text-sm font-medium text-gray-700">
              Vehicle Make *
            </label>
            <input
              type="text"
              id="vehicleMake"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.vehicleMake}
              onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="vehicleModel" className="block text-sm font-medium text-gray-700">
              Vehicle Model *
            </label>
            <input
              type="text"
              id="vehicleModel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.vehicleModel}
              onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="vehicleYear" className="block text-sm font-medium text-gray-700">
              Vehicle Year *
            </label>
            <input
              type="number"
              id="vehicleYear"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.vehicleYear}
              onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
              Service Type *
            </label>
            <select
              id="serviceType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
            >
              <option value="">Select a service</option>
              <option value="MOT Test">MOT Test</option>
              <option value="Service">Service</option>
              <option value="Repair">Repair</option>
              <option value="Diagnostic">Diagnostic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">
              Preferred Date
            </label>
            <input
              type="date"
              id="preferredDate"
              min={today}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.preferredDate}
              onChange={handleDateChange}
              onKeyDown={(e) => e.preventDefault()}
              onClick={(e) => {
                const input = e.target as HTMLInputElement;
                input.showPicker();
              }}
            />
            <p className="mt-1 text-sm text-gray-500">
              Note: Weekends are not available for bookings
            </p>
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
              Additional Information
            </label>
            <textarea
              id="notes"
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="dataConsent"
                required
                className="mt-1"
                checked={formData.dataConsent}
                onChange={(e) => setFormData({ ...formData, dataConsent: e.target.checked })}
              />
              <label htmlFor="dataConsent" className="ml-2 text-sm text-gray-600">
                I consent to my data being processed as described in the{' '}
                <button
                  type="button"
                  className="text-[#ef1c25] hover:underline"
                  onClick={() => setIsPolicyOpen(true)}
                >
                  privacy policy
                </button>
                . *
              </label>
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                id="marketingConsent"
                className="mt-1"
                checked={formData.marketingConsent}
                onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
              />
              <label htmlFor="marketingConsent" className="ml-2 text-sm text-gray-600">
                I would like to receive service reminders and updates (optional)
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="destructive"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Enquiry'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal 
        isOpen={isPolicyOpen} 
        onClose={() => setIsPolicyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicy />
      </Modal>
    </>
  );
} 