import { Suspense } from 'react'
import './dashboard.css'
import { DashboardSkeleton } from '@/app/components/ui/skeleton'
import ProtectedRoute from '@/app/components/protected-route'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="dashboard min-h-screen">
        <Suspense fallback={<DashboardSkeleton />}>
          {children}
        </Suspense>
      </div>
    </ProtectedRoute>
  )
}
