import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-700/50", className)}
    />
  )
}

// Dashboard-specific skeleton components
export function DashboardSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-slate-700/50 rounded-lg animate-pulse mb-4"></div>
        <div className="h-4 w-96 bg-slate-700/50 rounded animate-pulse"></div>
      </div>

      {/* Quick Stats Row Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-slate-700/50 rounded animate-pulse"></div>
              </div>
              <div className="w-10 h-10 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Dashboard Grid Skeleton */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content Area Skeleton */}
        <div className="col-span-12 lg:col-span-8">
          <div className="grid gap-6">
            {/* Key Metrics Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-4 backdrop-blur-sm">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-5 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="h-8 w-20 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Referrals Skeleton */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
              <div className="p-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-slate-700/50 rounded animate-pulse"></div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="w-10 h-10 bg-slate-700/50 rounded-full animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                        <div className="h-3 w-48 bg-slate-700/50 rounded animate-pulse"></div>
                      </div>
                      <div className="h-6 w-16 bg-slate-700/50 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Distribution Skeleton */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm">
              <div className="p-4 border-b border-slate-700/50">
                <div className="h-6 w-40 bg-slate-700/50 rounded animate-pulse"></div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                        <div className="h-4 w-8 bg-slate-700/50 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Skeleton */}
        <div className="col-span-12 lg:col-span-4">
          <div className="grid gap-6">
            {/* System Status Skeleton */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm p-4">
              <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                    <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="h-3 w-3 bg-slate-700/50 rounded-full animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity Skeleton */}
            <div className="bg-slate-900/50 border border-slate-700/50 rounded-lg backdrop-blur-sm p-4">
              <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded border border-slate-700/50">
                    <div className="w-8 h-8 bg-slate-700/50 rounded-full animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Referrals table skeleton
export function ReferralsTableSkeleton() {
  return (
    <div className="w-full">
      {/* Header Section Skeleton */}
      <div className="mb-8">
        <div className="mb-6">
          <div className="h-8 w-48 bg-slate-700/50 rounded-lg animate-pulse"></div>
        </div>
        
        {/* Search and Filters Skeleton */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="h-10 bg-slate-700/50 rounded-xl animate-pulse"></div>
          </div>
          <div className="h-10 w-32 bg-slate-700/50 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Stats Bar Skeleton */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-slate-700/50 rounded animate-pulse"></div>
              </div>
              <div className="w-12 h-12 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Table Section Skeleton */}
      <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg">
        {/* Table Header Skeleton */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-8 w-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                ))}
              </div>
              <div className="h-8 w-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Table Body Skeleton */}
        <div className="w-full">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                {Array.from({ length: 10 }).map((_, i) => (
                  <th key={i} className="px-6 py-4 text-left">
                    <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {Array.from({ length: 8 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="animate-pulse">
                  {Array.from({ length: 10 }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {colIndex === 0 && (
                          <>
                            <div className="h-6 w-12 bg-slate-700/50 rounded-full"></div>
                            <div className="h-6 w-8 bg-slate-700/50 rounded-full"></div>
                          </>
                        )}
                        {colIndex === 1 && (
                          <div className="h-5 w-32 bg-slate-700/50 rounded"></div>
                        )}
                        {colIndex === 2 && (
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 bg-slate-700/50 rounded"></div>
                            <div className="h-4 w-20 bg-slate-700/50 rounded"></div>
                          </div>
                        )}
                        {colIndex === 3 && (
                          <div className="h-5 w-40 bg-slate-700/50 rounded"></div>
                        )}
                        {colIndex === 4 && (
                          <div className="h-5 w-32 bg-slate-700/50 rounded"></div>
                        )}
                        {colIndex >= 5 && colIndex <= 8 && (
                          <div className="h-5 w-5 bg-slate-700/50 rounded-full mx-auto"></div>
                        )}
                        {colIndex === 9 && (
                          <div className="h-8 w-8 bg-slate-700/50 rounded-lg mx-auto"></div>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Individual referral page skeleton
export function ReferralDetailSkeleton() {
  return (
    <div className="w-4/5 mx-auto px-6 py-6">
      {/* Patient Summary Skeleton */}
      <div className="mb-8">
        <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-700/50 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-3">
              <div className="h-8 w-48 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="text-center">
                    <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse mb-2"></div>
                    <div className="h-6 w-12 bg-slate-700/50 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column Skeleton */}
        <div className="space-y-6">
          {/* Financial Skeleton */}
          <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                  <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-slate-700/50 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Skeleton */}
          <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="h-6 w-20 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                  <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-16 bg-slate-700/50 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column Skeleton */}
        <div className="space-y-6">
          {/* Medications Skeleton */}
          <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="h-6 w-28 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="h-20 bg-slate-800/50 rounded border border-slate-700/50 animate-pulse"></div>
          </div>

          {/* Home Support Skeleton */}
          <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="h-6 w-28 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                  <div className="h-4 w-28 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-slate-700/50 rounded-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          {/* Diagnoses Skeleton */}
          <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Patient Documents Skeleton */}
          <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between pb-3">
              <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-10 bg-slate-800/50 rounded border border-slate-700/50 animate-pulse"></div>
              <div className="h-32 bg-slate-800/50 rounded border border-slate-700/50 animate-pulse"></div>
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-8 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
