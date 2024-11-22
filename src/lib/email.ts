import { BookingWithRelations } from '@/types/booking'
import { format } from 'date-fns'

const SENDGRID_API_KEY = process.env.NEXT_PUBLIC_SENDGRID_API_KEY
const FROM_EMAIL = 'noreply@ainsliepark.com'

export async function sendEmail(to: string, subject: string, html: string) {
  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SENDGRID_API_KEY}`,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: FROM_EMAIL },
      subject,
      content: [{ type: 'text/html', value: html }],
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to send email')
  }
}

export async function sendBookingConfirmation(booking: BookingWithRelations) {
  const subject = 'Booking Confirmation - Ainslie Park Garage'
  const html = `
    <h1>Booking Confirmation</h1>
    <p>Dear ${booking.customer_name},</p>
    <p>Your booking has been confirmed for the following service:</p>
    <ul>
      <li>Service: ${booking.service_type}</li>
      <li>Date: ${format(new Date(booking.preferred_date), 'PPP p')}</li>
      <li>Vehicle: ${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})</li>
    </ul>
    <p>Thank you for choosing Ainslie Park Garage.</p>
  `
  return sendEmail(booking.email, subject, html)
}

export async function sendBookingReminder(booking: BookingWithRelations) {
  const subject = 'Booking Reminder - Ainslie Park Garage'
  const html = `
    <h1>Booking Reminder</h1>
    <p>Dear ${booking.customer_name},</p>
    <p>This is a reminder of your upcoming service:</p>
    <ul>
      <li>Service: ${booking.service_type}</li>
      <li>Date: ${format(new Date(booking.preferred_date), 'PPP p')}</li>
      <li>Vehicle: ${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})</li>
    </ul>
    <p>We look forward to seeing you.</p>
  `
  return sendEmail(booking.email, subject, html)
}

export async function sendStatusUpdate(booking: BookingWithRelations) {
  const subject = 'Booking Status Update - Ainslie Park Garage'
  const html = `
    <h1>Booking Status Update</h1>
    <p>Dear ${booking.customer_name},</p>
    <p>The status of your booking has been updated to: ${booking.status.toLowerCase()}</p>
    <ul>
      <li>Service: ${booking.service_type}</li>
      <li>Date: ${format(new Date(booking.preferred_date), 'PPP p')}</li>
      <li>Vehicle: ${booking.vehicle_make} ${booking.vehicle_model} (${booking.vehicle_year})</li>
    </ul>
    <p>Thank you for choosing Ainslie Park Garage.</p>
  `
  return sendEmail(booking.email, subject, html)
} 