import { create } from 'zustand'
import { Service, TimeSlot, Vehicle } from '../types/booking'

interface BookingStore {
  selectedService: Service | null
  selectedSlot: TimeSlot | null
  selectedVehicle: Vehicle | null
  setSelectedService: (service: Service | null) => void
  setSelectedSlot: (slot: TimeSlot | null) => void
  setSelectedVehicle: (vehicle: Vehicle | null) => void
  resetBooking: () => void
}

export const useBookingStore = create<BookingStore>((set) => ({
  selectedService: null,
  selectedSlot: null,
  selectedVehicle: null,
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedSlot: (slot) => set({ selectedSlot: slot }),
  setSelectedVehicle: (vehicle) => set({ selectedVehicle: vehicle }),
  resetBooking: () => set({ 
    selectedService: null, 
    selectedSlot: null, 
    selectedVehicle: null 
  })
})) 