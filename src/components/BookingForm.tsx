import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { sendEmail } from '@/lib/emailjs';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookingForm({ isOpen, onClose }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: '',
    service: '',
    preferredDate: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await sendEmail({
        to_email: 'info@ainslieparkgarage.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        vehicle: formData.vehicle,
        service: formData.service,
        preferred_date: formData.preferredDate,
        message: formData.message,
      });

      alert('Booking enquiry sent successfully!');
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        vehicle: '',
        service: '',
        preferredDate: '',
        message: '',
      });
    } catch {
      alert('Failed to send booking enquiry. Please try again or call us directly.');
    }
  };

  return (
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
          <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
            Vehicle Make/Model *
          </label>
          <input
            type="text"
            id="vehicle"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
            value={formData.vehicle}
            onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700">
            Service Required *
          </label>
          <select
            id="service"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          >
            <option value="">Select a service</option>
            <option value="MOT">MOT Test</option>
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Additional Information
          </label>
          <textarea
            id="message"
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef1c25] focus:ring-[#ef1c25] sm:text-sm"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
          >
            Send Enquiry
          </Button>
        </div>
      </form>
    </Modal>
  );
} 