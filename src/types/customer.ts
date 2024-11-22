export interface CustomerProfile {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Customer = CustomerProfile; 