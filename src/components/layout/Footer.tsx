export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Ainslie Park Garage. All rights reserved.
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Website created by{' '}
            <a 
              href="https://nexeos.co.uk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#ef1c25] hover:underline"
            >
              NEXEOS
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}