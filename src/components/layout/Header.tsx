import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { Menu, Wrench } from 'lucide-react';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-black text-white z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 text-lg sm:text-xl font-bold">
          <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-[#ef1c25]" />
          <span className="hidden xs:inline">Ainslie Park Garage</span>
          <span className="xs:hidden">APG</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <NavigationMenu>
            <ul className="flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm lg:text-base text-white hover:text-[#ef1c25] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <Button variant="destructive" size="sm" className="text-sm lg:text-base">
                  <a href="tel:+441315526695">0131 552 6695</a>
                </Button>
              </li>
            </ul>
          </NavigationMenu>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10">
              <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black w-[280px] sm:w-[350px]">
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-white hover:text-[#ef1c25] transition-colors text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button variant="destructive" className="mt-4 w-full">
                <a href="tel:+441315526695">0131 552 6695</a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}