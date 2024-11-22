import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Services } from '@/components/sections/Services';
import { About } from '@/components/sections/About';
import { Contact } from '@/components/sections/Contact';
import { Reviews } from '@/components/sections/Reviews';
import { BookingForm } from '@/components/BookingForm';
import SignInPage from '@/pages/auth/signin';
import AdminBookingsPage from '@/pages/admin/bookings';
import NewBookingPage from '@/pages/admin/bookings/new';
import AdminCustomersPage from '@/pages/admin/customers';
import AdminAnalyticsPage from '@/pages/admin/analytics';
import AdminSettingsPage from '@/pages/admin/settings';
import NewCustomerPage from '@/pages/admin/customers/new';
import CustomerDetailsPage from '@/pages/admin/customers/[id]';
import { Toaster } from 'sonner';

function MainLayout() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      <main className="flex-grow">
        <Hero onBookingClick={() => setIsBookingModalOpen(true)} />
        <Services />
        <About />
        <Reviews />
        <Contact onBookingClick={() => setIsBookingModalOpen(true)} />
      </main>
      <Footer />
      <BookingForm 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
}

function App() {
  console.log('App rendering');

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/auth/signin" element={<SignInPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin">
            <Route index element={<Navigate to="/admin/bookings" replace />} />
            <Route path="bookings" element={<AdminBookingsPage />} />
            <Route path="bookings/new" element={<NewBookingPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="customers/new" element={<NewCustomerPage />} />
            <Route path="customers/:id" element={<CustomerDetailsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="/" element={<MainLayout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;