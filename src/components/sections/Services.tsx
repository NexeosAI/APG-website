import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Car,
  Wrench,
  ClipboardCheck,
  Battery,
  Gauge,
  AlertTriangle,
} from 'lucide-react';

const services = [
  {
    title: 'Car Servicing',
    description: 'Comprehensive vehicle maintenance and servicing to keep your car running smoothly.',
    icon: Car,
  },
  {
    title: 'MOT Testing',
    description: 'Official MOT testing station with highly experienced testers.',
    icon: ClipboardCheck,
  },
  {
    title: 'Repairs',
    description: 'Expert diagnostic and repair services for all makes and models.',
    icon: Wrench,
  },
  {
    title: 'Batteries',
    description: 'Supply and fit quality batteries with free battery health checks.',
    icon: Battery,
  },
  {
    title: 'Diagnostics',
    description: 'State-of-the-art diagnostic equipment to identify any issues.',
    icon: Gauge,
  },
  {
    title: 'Breakdown',
    description: '24/7 emergency breakdown service in Edinburgh and surrounding areas.',
    icon: AlertTriangle,
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Our Services</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive auto repair services delivered by experienced professionals
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service) => (
            <Card key={service.title} className="border-2 hover:border-[#ef1c25] transition-colors">
              <CardHeader className="space-y-2 sm:space-y-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ef1c25] rounded-lg flex items-center justify-center">
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm sm:text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}