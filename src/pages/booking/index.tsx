import { useState, useEffect } from 'react'
import { ServiceSelection } from '@/components/booking/ServiceSelection'
import { TimeSlotSelection } from '@/components/booking/TimeSlotSelection'
import { VehicleSelection } from '@/components/booking/VehicleSelection'
import { BookingConfirmation } from '@/components/booking/BookingConfirmation'
import { useBookingStore } from '@/stores/bookingStore'

type BookingStep = 'service' | 'time' | 'vehicle' | 'confirmation'

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState<BookingStep>('service')
  const { selectedService, selectedSlot, selectedVehicle } = useBookingStore()

  // Auto-advance to next step when selections are made
  useEffect(() => {
    if (selectedService && currentStep === 'service') {
      setCurrentStep('time')
    } else if (selectedSlot && currentStep === 'time') {
      setCurrentStep('vehicle')
    } else if (selectedVehicle && currentStep === 'vehicle') {
      setCurrentStep('confirmation')
    }
  }, [selectedService, selectedSlot, selectedVehicle, currentStep])

  const renderStep = () => {
    switch (currentStep) {
      case 'service':
        return <ServiceSelection />
      case 'time':
        return selectedService ? <TimeSlotSelection /> : null
      case 'vehicle':
        return selectedSlot ? <VehicleSelection /> : null
      case 'confirmation':
        return selectedVehicle ? <BookingConfirmation /> : null
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Book a Service</h1>
      {renderStep()}
    </div>
  )
} 