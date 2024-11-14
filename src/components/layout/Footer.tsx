import { Wrench } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-[#ef1c25]" />
              <span className="text-lg sm:text-xl font-bold">Ainslie Park Garage</span>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Your trusted auto repair service in Edinburgh since 1975.
            </p>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm sm:text-base text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-sm sm:text-base text-gray-400">Car Servicing</li>
              <li className="text-sm sm:text-base text-gray-400">MOT Testing</li>
              <li className="text-sm sm:text-base text-gray-400">Repairs</li>
              <li className="text-sm sm:text-base text-gray-400">Diagnostics</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-sm sm:text-base text-gray-400">86 Pilton Drive</li>
              <li className="text-sm sm:text-base text-gray-400">Edinburgh, EH5 2HF</li>
              <li>
                <a href="tel:+441315526695" className="text-sm sm:text-base text-[#ef1c25]">
                  0131 552 6695
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-gray-400">
            &copy; {new Date().getFullYear()} Ainslie Park Garage. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}