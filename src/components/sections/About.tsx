import { Shield, Clock, ThumbsUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Trusted Expertise',
    description: 'Over 45 years of experience serving Edinburgh drivers',
  },
  {
    icon: Clock,
    title: 'Quick Turnaround',
    description: 'Efficient service without compromising on quality',
  },
  {
    icon: ThumbsUp,
    title: 'Customer Satisfaction',
    description: 'Highly rated by our loyal customers',
  },
];

export function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Your Trusted Local Garage in Edinburgh
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Since 2014, Ainslie Park Garage has been providing top-quality auto repair
              services to Edinburgh residents. Our team of skilled mechanics combines
              years of experience with the latest diagnostic technology to deliver
              exceptional results.
            </p>
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#ef1c25] rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <img
              src="/images/mechanic-working.jpg"
              alt="Mechanic working on a car"
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}