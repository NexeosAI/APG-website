import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AdminDashboardLayout } from '@/components/layouts/AdminDashboardLayout'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  Trash2, 
  LayoutGrid, 
  LayoutList,
  UserPlus,
  Search as SearchIcon,
  Eye
} from 'lucide-react'
import { AdminGuard } from '@/components/auth/AdminGuard'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const { data: customers, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching customers:', error)
        throw error
      }
      return data
    },
  })

  const deleteCustomer = useMutation({
    mutationFn: async (customerId: string) => {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
      toast.success('Customer deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete customer')
    },
  })

  const filteredCustomers = customers?.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) {
    return (
      <AdminDashboardLayout>
        <LoadingSpinner />
      </AdminDashboardLayout>
    )
  }

  const ListViewItem = ({ customer }: { customer: { id: string; name: string; email?: string; phone: string } }) => (
    <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-sm border border-gray-100 hover:border-gray-200 transition-colors w-full">
      <div className="flex items-center flex-grow">
        <div className="w-full">
          <p className="font-medium text-lg">{customer.name}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
            <a href={`mailto:${customer.email}`} className="flex items-center hover:text-blue-600 transition-colors">
              <Mail className="h-4 w-4 mr-1 text-gray-400" />
              {customer.email}
            </a>
            <a href={`tel:${customer.phone}`} className="flex items-center hover:text-blue-600 transition-colors">
              <Phone className="h-4 w-4 mr-1 text-gray-400" />
              {customer.phone}
            </a>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3 flex-shrink-0">
        <Button variant="outline" className="flex items-center gap-2 bg-white w-32" asChild>
          <Link to={`/admin/customers/${customer.id}`}>
            <Eye className="h-4 w-4 stroke-2" />
            View Details
          </Link>
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="text-red-600 hover:text-white hover:bg-red-600 border-red-200 bg-white w-10 h-10 flex-shrink-0"
          onClick={() => setCustomerToDelete(customer.id)}
        >
          <Trash2 className="h-4 w-4 stroke-2" />
        </Button>
      </div>
    </div>
  )

  return (
    <AdminGuard>
      <AdminDashboardLayout>
        <div className="p-8 w-full">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold">Customers</h1>
              <p className="text-gray-500 mt-2">Manage your customer database</p>
            </div>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2" asChild>
              <Link to="/admin/customers/new">
                <UserPlus className="h-5 w-5 stroke-2" />
                Add Customer
              </Link>
            </Button>
          </div>

          <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm w-full">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-blue-600 stroke-2" />
              </div>
              <Input
                placeholder="Search customers..."
                className="pl-10 border-gray-200 bg-white focus:ring-blue-500 focus:border-blue-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2 ml-4">
              <Button
                variant="outline"
                size="icon"
                className={`border-gray-200 bg-white w-10 h-10 flex-shrink-0 ${viewMode === 'list' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-600'}`}
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-4 w-4 stroke-2" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`border-gray-200 bg-white w-10 h-10 flex-shrink-0 ${viewMode === 'grid' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-gray-600'}`}
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4 stroke-2" />
              </Button>
            </div>
          </div>

          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 w-full"
              : "flex flex-col gap-4 w-full"
          }>
            {filteredCustomers?.map((customer) => (
              <ListViewItem key={customer.id} customer={customer} />
            ))}
          </div>
        </div>

        <AlertDialog open={!!customerToDelete} onOpenChange={() => setCustomerToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Customer</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the customer's data
                and remove their records from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 hover:bg-red-700 text-white gap-2"
                onClick={() => {
                  if (customerToDelete) {
                    deleteCustomer.mutate(customerToDelete)
                    setCustomerToDelete(null)
                  }
                }}
              >
                <Trash2 className="h-4 w-4 stroke-2" />
                Delete Customer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </AdminDashboardLayout>
    </AdminGuard>
  )
} 