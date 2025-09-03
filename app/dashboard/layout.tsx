import { Suspense } from 'react'
import './dashboard.css'
import { DashboardSkeleton } from '@/app/components/ui/skeleton'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="dashboard min-h-screen">
      <Suspense fallback={<DashboardSkeleton />}>
        {children}
      </Suspense>
    </div>
  )
}
