import { Button } from '@/components/ui/button';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    details: ['86 Pilton Drive', 'Edinburgh, EH5 2HF'],
  },
  {
    icon: Phone,
    title: 'Phone',
    details: ['0131 552 6695', 'Emergency: 07300 218316'],
  },
  {
    icon: Clock,
    title: 'Opening Hours',
    details: ['Monday - Friday: 8am - 6pm', 'Saturday: 9am - 4pm'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@ainslieparkgarage.com'],
  },
];

interface ContactProps {
  onBookingClick: () => void;
}

export function Contact({ onBookingClick }: ContactProps) {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Contact Us</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Get in touch with our team for bookings, quotes, or any inquiries
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {contactInfo.map((info) => (
            <div
              key={info.title}
              className="text-center p-4 sm:p-6 border-2 rounded-lg hover:border-[#ef1c25] transition-colors"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ef1c25] rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">{info.title}</h3>
              {info.details.map((detail, index) => (
                <p key={index} className="text-sm sm:text-base text-gray-600">
                  {detail}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12 sm:mt-16 text-center">
          <Button 
            variant="destructive" 
            size="lg" 
            onClick={onBookingClick}
          >
            Book a Service
          </Button>
        </div>
      </div>
    </section>
  );
}