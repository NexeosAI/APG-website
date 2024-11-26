export function PrivacyPolicy() {
  return (
    <div className="prose max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Data Collection</h2>
          <p className="mb-2">We collect the following information when you make a booking:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Name</li>
            <li>Email address (optional)</li>
            <li>Phone number</li>
            <li>Vehicle details</li>
            <li>Service requirements</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">2. How We Use Your Data</h2>
          <p className="mb-2">Your data is used for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processing your booking</li>
            <li>Contacting you about your service</li>
            <li>Maintaining service records</li>
            <li>Legal compliance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">3. Data Retention</h2>
          <p className="mb-2">We retain your data for:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Booking enquiries: 6 months</li>
            <li>Customer records: 7 years (legal requirement)</li>
            <li>Service history: 7 years</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">4. Your Rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access your data</li>
            <li>Correct your data</li>
            <li>Export your data</li>
            <li>Request deletion</li>
            <li>Withdraw consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">5. Contact</h2>
          <p className="mb-1">For data protection queries:</p>
          <div className="space-y-1 text-gray-600">
            <p>Email: <a href="mailto:info@ainslieparkgarage.com" className="text-[#ef1c25] hover:underline">info@ainslieparkgarage.com</a></p>
            <p>Phone: <a href="tel:01315526695" className="text-[#ef1c25] hover:underline">0131 552 6695</a></p>
          </div>
        </section>
      </div>
    </div>
  );
} 