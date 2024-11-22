import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Contact', href: '#contact' },
];

interface HeaderProps {
  onBookingClick: () => void;
}

export function Header({ onBookingClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex-shrink-0 md:w-1/4">
              <a 
                href="#home" 
                className="flex items-center"
                onClick={(e) => handleNavClick(e, '#home')}
              >
                <img 
                  src="/logo/APG-logo.svg" 
                  alt="Ainslie Park Garage" 
                  className="h-16 w-auto"
                  onError={(e) => {
                    console.error('Logo failed to load:', e);
                    setLogoError(true);
                  }}
                />
                {logoError && <span className="text-red-500">Logo not found</span>}
              </a>
            </div>

            <div className="hidden md:flex md:flex-1 md:justify-center md:items-center">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex md:w-1/4 md:justify-end md:items-center md:space-x-4">
              <Button variant="destructive" className="hover:text-white">
                <a href="tel:+441315526695" className="text-white hover:text-white">Call Now</a>
              </Button>
              <Button 
                variant="outline" 
                onClick={onBookingClick}
              >
                Book a Service
              </Button>
            </div>

            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#ef1c25]"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-black block px-3 py-2 text-base font-medium"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button variant="destructive" className="w-full mt-4 hover:text-white">
                  <a href="tel:+441315526695" className="text-white hover:text-white">Call Now</a>
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}