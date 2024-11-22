import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css'

interface HeroProps {
  onBookingClick: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  return (
    <div className="w-full">
      <section 
        id="home" 
        className="relative w-full min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center pt-16 sm:pt-20 bg-gradient-to-br from-black to-neutral-900 text-white"
      >
        <div
          className={`absolute inset-0 z-0 opacity-20 w-full h-full ${styles.backgroundImage}`}
        />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Edinburgh's Most Trusted
            <span className="block text-[#ef1c25] mt-2">Auto Repair Service</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto text-gray-300">
            Professional car servicing, MOT testing, and repairs in the heart of Edinburgh
            since 1975.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button 
              size="lg" 
              variant="destructive" 
              className="text-base sm:text-lg w-full sm:w-auto"
              onClick={onBookingClick}
            >
              Book a Service
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base sm:text-lg w-full sm:w-auto">
              <a href="tel:+441315526695">Call Us Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}