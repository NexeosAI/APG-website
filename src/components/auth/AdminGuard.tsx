import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

interface AdminGuardProps {
  children: React.ReactNode
}

export function AdminGuard({ children }: AdminGuardProps) {
  const navigate = useNavigate()
  const { session, isLoading } = useSession()
  const isAdmin = session?.user?.user_metadata?.role === 'ADMIN'

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/')
    }
  }, [isLoading, isAdmin, navigate])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
} 