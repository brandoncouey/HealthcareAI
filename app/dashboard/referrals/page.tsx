"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Clock,
  Info,
  CheckCircle,
  AlertCircle,
  Filter,
  Plus,
  MoreHorizontal,
  FileText,
  X,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent } from "@/app/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"
import DashboardNavbar from "@/app/components/dashboard-navbar"
import { StatusBadge } from "@/app/components/ui/status-badge"
import { ReferralsTableSkeleton } from "@/app/components/ui/skeleton"
import { useAuth } from "@/app/hooks/useAuth"

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs with movement */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '4s' }}></div>
      
      {/* Many small floating particles with different movement patterns */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-x"
          style={{
            left: `${(i * 7.3) % 100}%`,
            top: `${(i * 11.7) % 100}%`,
            animationDelay: `${(i * 0.8) % 5}s`,
            animationDuration: `${3 + (i * 0.3) % 4}s`
          }}
        />
      ))}
      
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`y-${i}`}
          className="absolute w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-float-y"
          style={{
            left: `${(i * 9.1) % 100}%`,
            top: `${(i * 13.2) % 100}%`,
            animationDelay: `${(i * 0.9) % 4}s`,
            animationDuration: `${4 + (i * 0.4) % 3}s`
          }}
        />
      ))}
      
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={`diag-${i}`}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float-diagonal"
          style={{
            left: `${(i * 8.7) % 100}%`,
            top: `${(i * 12.4) % 100}%`,
            animationDelay: `${(i * 0.7) % 6}s`,
            animationDuration: `${5 + (i * 0.5) % 4}s`
          }}
        />
      ))}
      
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`circ-${i}`}
          className="absolute w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-float-circular"
          style={{
            left: `${(i * 10.3) % 100}%`,
            top: `${(i * 14.8) % 100}%`,
            animationDelay: `${(i * 0.6) % 3}s`,
            animationDuration: `${3 + (i * 0.2) % 2}s`
          }}
        />
      ))}
      
      {/* Additional colored particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={`yellow-${i}`}
          className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-float-slow"
          style={{
            left: `${(i * 11.2) % 100}%`,
            top: `${(i * 16.1) % 100}%`,
            animationDelay: `${(i * 0.8) % 4}s`,
            animationDuration: `${6 + (i * 0.3) % 3}s`
          }}
        />
      ))}
      
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`orange-${i}`}
          className="absolute w-1.5 h-1.5 bg-orange-400/20 rounded-full animate-float-medium"
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 17.3) % 100}%`,
            animationDelay: `${(i * 0.7) % 5}s`,
            animationDuration: `${4 + (i * 0.4) % 3}s`
          }}
        />
      ))}
      
      {/* Floating lines with movement */}
      <div className="absolute top-1/3 left-10 w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-float-y"></div>
      <div className="absolute bottom-1/3 right-16 w-px h-16 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-float-x" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Dark animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black opacity-50"></div>
    </div>
  )
}

export default function ReferralsPage() {
  const { user, authenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState<{
    type: string
    title: string
    data: any
    referral: any
  } | null>(null)
  const [referrals, setReferrals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string | undefined>(undefined)
  const itemsPerPage = 4

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !authenticated) {
      window.location.href = '/login'
    }
  }, [authLoading, authenticated])

  // Set organization ID when user data becomes available
  useEffect(() => {
    if (user?.primaryOrganization?.id || user?.organizations?.[0]?.id) {
      setCurrentOrganizationId(user.primaryOrganization?.id || user.organizations?.[0]?.id)
    }
  }, [user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        if (currentOrganizationId) {
          // Organization-specific data
          const response = await fetch(`/api/dashboard/referrals?organizationId=${currentOrganizationId}`)
          
          if (response.ok) {
            const result = await response.json()
            setReferrals(result)
          } else {
            setError('Failed to fetch referrals')
            setReferrals([])
          }
        } else {
          // No organization selected - clear data
          setReferrals([])
        }
      } catch (err) {
        console.error('Error fetching referrals:', err)
        setError('Failed to fetch referrals')
        setReferrals([])
      } finally {
        setLoading(false)
      }
    }

    // Only fetch data if we have an organization ID
    if (currentOrganizationId) {
      fetchData()
    }
  }, [currentOrganizationId])

  // Filter referrals based on search term and status filter
  const filteredReferrals = referrals.filter(referral => {
    if (!referral || !referral.name || !referral.status) {
      return false
    }
    
    const matchesSearch = referral.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referringFacility.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.primaryPayor.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "ALL" || referral.status.includes(statusFilter)
    
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    // Sort by timePassed to show newest referrals first
    const timeOrder = { 'Today': 1, 'Yesterday': 2, '2 days ago': 3, '3 days ago': 4, '4 days ago': 5, '5 days ago': 6, '6 days ago': 7, '1 week ago': 8, '2 weeks ago': 9, '1 month ago': 10 }
    const aOrder = timeOrder[a.timePassed as keyof typeof timeOrder] || 999
    const bOrder = timeOrder[b.timePassed as keyof typeof timeOrder] || 999
    return aOrder - bOrder
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReferrals = filteredReferrals.slice(startIndex, endIndex)

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-semibold rounded-full"
    return <StatusBadge status={status} className={baseClasses} />
  }

  const getStatusIndicator = (status: string) => {
    if (status === "complete") {
      return (
        <div className="w-5 h-5 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center">
          <CheckCircle className="w-3 h-3 text-emerald-400" />
        </div>
      )
    } else {
      return (
        <div className="w-5 h-5 bg-amber-500/20 border border-amber-500/30 rounded-full flex items-center justify-center">
          <Info className="w-3 h-3 text-amber-400" />
        </div>
      )
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleOrganizationChange = (organizationId: string) => {
    setCurrentOrganizationId(organizationId)
    // Clear current data to show loading state
    setReferrals([])
    setCurrentPage(1)
  }

  const openModal = (type: string, referral: any) => {
    let title = ""
    let data: any = {}

    switch (type) {
      case "coverage":
        title = "Coverage Details"
        data = {
          status: referral.coverage,
          insurance: referral.primaryPayor,
          planType: referral.hmoPlanType || "N/A",
          medicareHmoProvider: referral.medicareHmoProvider || "N/A",
          notes: "Insurance coverage and plan details for this referral"
        }
        break
      case "clinical":
        title = "Clinical Information"
        data = {
          status: referral.clinical,
          primaryDiagnosis: referral.primaryDxText || "N/A",
          diagnosisCode: referral.primaryDxCode || "N/A",
          ntaScore: referral.ntaScore || "N/A",
          diagnoses: referral.diagnoses || [],
          services: referral.services || [],
          notes: "Clinical assessment and service requirements"
        }
        break
      case "homeSupport":
        title = "Home Support Details"
        data = {
          status: referral.homeSupport,
          livingSituation: referral.livesWith || "Not specified",
          emergencyContact: referral.ecName || "Not specified",
          emergencyPhone: referral.ecPhone || "Not specified",
          emergencyRelation: referral.ecRelation || "Not specified",
          notes: "Home environment and support system information"
        }
        break
      case "zipCode":
        title = "Location Information"
        data = {
          status: referral.zipCode,
          address: referral.address || "Not specified",
          city: referral.city || "Not specified",
          state: referral.state || "Not specified",
          zipCode: referral.postalCode || "Not specified",
          notes: "Patient location and service area details"
        }
        break
    }

    setModalData({ type, title, data, referral })
    setModalOpen(true)
  }

  // Don't render page if not authenticated
  if (!authenticated) {
    return null
  }

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 relative overflow-hidden`}>
      <FloatingParticles />
      
      {/* Single Loading Overlay - shows appropriate content based on loading phase */}
      {(authLoading || loading) && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-slate-800 z-50">
          {authLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
                <p className="text-xl text-slate-300">Checking authentication...</p>
              </div>
            </div>
          ) : (
            <div className="w-full px-6 py-6">
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

              {/* Table Section Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardContent className="p-0">
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
                        {Array.from({ length: 5 }).map((_, i) => (
                          <tr key={i} className="hover:bg-slate-800/30">
                            {Array.from({ length: 10 }).map((_, j) => (
                              <td key={j} className="px-6 py-4">
                                <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      <DashboardNavbar 
        user={user}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        theme={theme}
        onThemeToggle={toggleTheme}
        organizationName={user?.primaryOrganization?.name}
        currentOrganizationId={currentOrganizationId}
        onOrganizationChange={handleOrganizationChange}
      />
      
      <div className="w-full px-6 py-6">
                 {/* Header Section */}
         <div className="mb-8">
           <div className="mb-6">
             <div>
             </div>
           </div>
          
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Search new referrals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600/50 text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-slate-800/50 border-slate-600/50 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500/50 rounded-xl px-4">
                  <Filter className="w-4 h-4 mr-2" />
                  {statusFilter}
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 border-slate-600">
                <DropdownMenuItem onClick={() => setStatusFilter("ALL")} className="text-slate-200 hover:bg-slate-700">
                  Show All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("NEW")} className="text-slate-200 hover:bg-slate-700">
                  NEW
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("AM")} className="text-slate-200 hover:bg-slate-700">
                  AM
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("OP")} className="text-slate-200 hover:bg-slate-700">
                  OP
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Table Section */}
        <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-500/10">
          <CardContent className="p-0">
            {/* Table Header with Pagination */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50 group-hover:border-slate-600/50 transition-colors duration-300">
              <h2 className="text-lg font-semibold text-slate-200 group-hover:text-cyan-100 transition-colors duration-300">New Referrals</h2>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-400">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredReferrals.length)} of {filteredReferrals.length}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 disabled:opacity-50 rounded-lg"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      if (page === 1 || page === 2 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <Button
                            key={page}
                            variant={page === currentPage ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            className={page === currentPage 
                              ? "bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg" 
                              : "bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 rounded-lg"
                            }
                          >
                            {page}
                          </Button>
                        )
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-slate-400 px-2">...</span>
                      }
                      return null
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 disabled:opacity-50 rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="w-full">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Patient</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Time Passed</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Facility</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Insurance</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Coverage</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Clinical</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Support</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                                     {currentReferrals.map((referral) => (
                     <tr 
                       key={referral.id} 
                       className="hover:bg-slate-800/30 transition-colors duration-150 cursor-pointer"
                       onClick={() => router.push(`/dashboard/referrals/${referral.id}`)}
                     >
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {referral.status
                            .sort((a: string, b: string) => {
                              // Ensure NEW is always first, then AM, then OP
                              const order = { NEW: 1, AM: 2, OP: 3 };
                              return (order[a as keyof typeof order] || 4) - (order[b as keyof typeof order] || 4);
                            })
                            .map((status: string, index: number) => (
                              <div key={index}>
                                {getStatusBadge(status)}
                              </div>
                            ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-200">{referral.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm">{referral.timePassed}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-300 max-w-xs truncate" title={referral.referringFacility}>
                          {referral.referringFacility}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-300 max-w-xs text-sm leading-relaxed" title={referral.primaryPayor}>
                          {referral.primaryPayor}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal("coverage", referral)
                          }}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          {getStatusIndicator(referral.coverage)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal("clinical", referral)
                          }}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          {getStatusIndicator(referral.clinical)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal("homeSupport", referral)
                          }}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          {getStatusIndicator(referral.homeSupport)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            openModal("zipCode", referral)
                          }}
                          className="hover:scale-110 transition-transform duration-200"
                        >
                          {getStatusIndicator(referral.zipCode)}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-slate-800/50 rounded-lg">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-800 border-slate-600">
                            <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                              Edit Referral
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                              Process Referral
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                              Delete Referral
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

             {/* Detail Modal */}
       {modalOpen && modalData && (
         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
             {/* Modal Header */}
             <div className="flex items-center justify-between p-6 border-b border-slate-700/50 bg-slate-800/30">
               <div>
                 <h3 className="text-xl font-semibold text-slate-100">{modalData.title}</h3>
                 <p className="text-sm text-slate-400 mt-1">
                   {modalData.referral.name} • Referral #{modalData.referral.id}
                 </p>
               </div>
               <button
                 onClick={() => setModalOpen(false)}
                 className="p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
               >
                 <X className="h-5 w-5 text-slate-400" />
               </button>
             </div>

             {/* Modal Content */}
             <div className="p-6 overflow-y-auto max-h-[60vh] bg-slate-900/30">
               <div className="space-y-6">
                 {/* Status Overview */}
                 <div className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
                   <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse"></div>
                   <div>
                     <div className="text-sm text-slate-400 font-medium">Current Status</div>
                     <div className="text-lg font-semibold text-slate-200 capitalize">
                       {modalData.data.status}
                     </div>
                   </div>
                 </div>

                 {/* Data Fields */}
                 <div className="grid gap-4">
                   {Object.entries(modalData.data).map(([key, value]) => {
                     if (key === 'status' || key === 'notes') return null
                     if (Array.isArray(value) && value.length === 0) return null
                     
                     return (
                       <div key={key} className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
                         <div className="text-sm text-slate-400 font-medium capitalize mb-3 flex items-center gap-2">
                           <div className="w-2 h-2 bg-cyan-500/60 rounded-full"></div>
                           {key.replace(/([A-Z])/g, ' $1').trim()}
                         </div>
                         <div className="text-slate-200">
                           {Array.isArray(value) ? (
                             <div className="space-y-3">
                               {value.map((item, index) => {
                                                                  // Handle diagnosis objects specifically
                                  if (key === 'diagnoses' && typeof item === 'object' && item.code) {
                                    // Color code based on diagnosis code prefix
                                    const getCodeColor = (code: string) => {
                                      if (code.startsWith('I')) return 'bg-red-500/20 text-red-300 border-red-500/30' // Cardiovascular
                                      if (code.startsWith('E')) return 'bg-blue-500/20 text-blue-300 border-blue-500/30' // Endocrine
                                      if (code.startsWith('J')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' // Respiratory
                                      if (code.startsWith('N')) return 'bg-purple-500/20 text-purple-300 border-purple-500/30' // Genitourinary
                                      if (code.startsWith('L')) return 'bg-orange-500/20 text-orange-300 border-orange-500/30' // Skin
                                      if (code.startsWith('M')) return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' // Musculoskeletal
                                      if (code.startsWith('G')) return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' // Neurological
                                      if (code.startsWith('K')) return 'bg-pink-500/20 text-pink-300 border-pink-500/30' // Gastrointestinal
                                      if (code.startsWith('F')) return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' // Mental Health
                                      if (code.startsWith('Z')) return 'bg-slate-500/20 text-slate-300 border-slate-500/30' // Other/Post-procedural
                                      if (code.startsWith('S')) return 'bg-amber-500/20 text-amber-300 border-amber-500/30' // Trauma
                                      return 'bg-slate-700/50 text-slate-300 border-slate-600/50' // Default
                                    }
                                    
                                    return (
                                      <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200 hover:scale-105">
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-1 text-xs font-mono rounded border ${getCodeColor(item.code)}`}>
                                            {item.code}
                                          </span>
                                          <span className="text-sm text-slate-200">
                                            {item.display}
                                          </span>
                                        </div>
                                      </div>
                                    )
                                  }
                                 // Handle service objects
                                 if (key === 'services' && typeof item === 'object' && item.service) {
                                   return (
                                     <div key={index} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 hover:scale-105">
                                       <div className="font-medium text-sm text-slate-200">{item.service}</div>
                                       {item.detail && <div className="text-xs text-slate-400 mt-1">{item.detail}</div>}
                                       {item.notes && <div className="text-xs text-slate-500 mt-1 italic">{item.notes}</div>}
                                     </div>
                                   )
                                 }
                                 // Handle medication objects
                                 if (key === 'medications' && typeof item === 'object' && item.name) {
                                   return (
                                     <div key={index} className="flex items-center gap-2">
                                       <span className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200">
                                         {item.name}
                                       </span>
                                       {item.isHighCost && (
                                         <span className="px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-xs hover:bg-amber-500/30 transition-all duration-200">
                                           High Cost
                                         </span>
                                       )}
                                     </div>
                                   )
                                 }
                                 // Handle simple string/primitive values
                                 if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
                                   return (
                                     <span key={index} className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200">
                                       {String(item)}
                                     </span>
                                   )
                                 }
                                 // Fallback for other object types
                                 return (
                                   <span key={index} className="px-3 py-1 bg-slate-700/50 rounded-lg text-sm border border-slate-600/50">
                                     {JSON.stringify(item)}
                                   </span>
                                 )
                               })}
                             </div>
                           ) : (
                             <span className="text-base px-3 py-2 bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-200 inline-block">
                               {value as string}
                             </span>
                           )}
                         </div>
                       </div>
                     )
                   })}
                 </div>

                 {/* Notes Section */}
                 {modalData.data.notes && (
                   <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
                     <div className="text-sm text-slate-400 font-medium mb-3 flex items-center gap-2">
                       <div className="w-2 h-2 bg-cyan-500/60 rounded-full"></div>
                       Notes
                     </div>
                     <div className="text-slate-300 text-sm leading-relaxed p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                       {modalData.data.notes}
                     </div>
                   </div>
                 )}
               </div>
             </div>

             {/* Modal Footer */}
             <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-700/50 bg-slate-800/30">
               <Button
                 variant="outline"
                 onClick={() => setModalOpen(false)}
                 className="border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200"
               >
                 Close
               </Button>
               <Button className="bg-cyan-600 hover:bg-cyan-700 transition-all duration-200">
                 View Full Details
               </Button>
             </div>
           </div>
         </div>
       )}
    </div>
  )
}
