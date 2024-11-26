export function PrivacyPolicy() {
  return (
    <div className="prose max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      
      <h2>1. Data Collection</h2>
      <p>We collect the following information when you make a booking:</p>
      <ul>
        <li>Name</li>
        <li>Email address (optional)</li>
        <li>Phone number</li>
        <li>Vehicle details</li>
        <li>Service requirements</li>
      </ul>

      <h2>2. How We Use Your Data</h2>
      <p>Your data is used for:</p>
      <ul>
        <li>Processing your booking</li>
        <li>Contacting you about your service</li>
        <li>Maintaining service records</li>
        <li>Legal compliance</li>
      </ul>

      <h2>3. Data Retention</h2>
      <p>We retain your data for:</p>
      <ul>
        <li>Booking enquiries: 6 months</li>
        <li>Customer records: 7 years (legal requirement)</li>
        <li>Service history: 7 years</li>
      </ul>

      <h2>4. Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access your data</li>
        <li>Correct your data</li>
        <li>Export your data</li>
        <li>Request deletion</li>
        <li>Withdraw consent</li>
      </ul>

      <h2>5. Contact</h2>
      <p>For data protection queries:</p>
      <p>Email: info@ainslieparkgarage.com</p>
      <p>Phone: 0131 552 6695</p>
    </div>
  );
} 