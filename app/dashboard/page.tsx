"use client"

import { useAuth } from '@/app/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar'
import { Input } from '@/app/components/ui/input'
import { 
  Users, 
  FileText, 
  Database, 
  PieChart, 
  UserPlus, 
  Download, 
  BarChart3,
  Search,
  Building2,
  Activity,
  Shield
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef, useMemo } from 'react'
import DashboardNavbar from '@/app/components/dashboard-navbar'

// Helper functions
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Types
interface DashboardStats {
  totalPatients: number
  activeReferrals: number
  totalServices: number
  recentReferrals: Array<{
    id: string
    patientName: string
    primaryDiagnosis: string
    ntaScore: number
    createdAt: string
    services: Array<{ service: string; present: boolean }>
  }>
  serviceDistribution: Array<{ service: string; count: number }>
}

interface Patient {
  id: string
  firstName: string
  lastName: string
  age: number
  city: string
  state: string
  ntaScore: number
}

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function Dashboard() {
  const { user, authenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  
  // All hooks must be called before any conditional logic
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string | undefined>(undefined)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Filter patients based on search term - must be called before any conditional logic
  const filteredPatients = useMemo(() => {
    if (!searchTerm) return patients
    return patients.filter(patient => 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.state.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [patients, searchTerm])
  
  // Toggle theme - must be called before any conditional logic
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  
  // All useEffect hooks must also be called before any conditional logic
  // Redirect to login if not authenticated
  useEffect(() => {
    // Only redirect if we're not loading and definitely not authenticated
    if (!authLoading && !authenticated && !user) {
      router.push('/login')
    }
  }, [authLoading, authenticated, user, router])

  // Set organization ID when user data becomes available
  useEffect(() => {
    if (user?.primaryOrganization?.id || user?.organizations?.[0]?.id) {
      setCurrentOrganizationId(user.primaryOrganization?.id || user?.organizations?.[0]?.id)
    }
  }, [user])

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true)
        
        if (currentOrganizationId) {
          // Organization-specific data
          const [statsResponse, patientsResponse] = await Promise.all([
            fetch(`/api/dashboard/stats?organizationId=${currentOrganizationId}`),
            fetch(`/api/dashboard/patients?organizationId=${currentOrganizationId}`)
          ])

          if (statsResponse.ok) {
            const statsData = await statsResponse.json()
            setStats(statsData)
          }

          if (patientsResponse.ok) {
            const patientsData = await patientsResponse.json()
            setPatients(patientsData)
          }
        } else {
          // No organization selected - clear data and show loading
          setStats(null)
          setPatients([])
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Only fetch data if we have an organization ID
    if (currentOrganizationId) {
      fetchDashboardData()
    }
  }, [currentOrganizationId])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * (canvas?.width || 0)
        this.y = Math.random() * (canvas?.height || 0)
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (canvas) {
          if (this.x > canvas.width) this.x = 0
          if (this.x < 0) this.x = canvas.width
          if (this.y > canvas.height) this.y = 0
          if (this.y < 0) this.y = canvas.height
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])



  // Handle organization change
  const handleOrganizationChange = (organizationId: string) => {
    setCurrentOrganizationId(organizationId)
  }

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading authentication...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardNavbar 
        theme={theme}
        onThemeToggle={toggleTheme}
        user={user}
      />
      
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none opacity-30"
        style={{ zIndex: -1 }}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-slate-300 text-lg">
                Welcome back, {user?.name || 'User'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 bg-slate-800/50 border-slate-700/50 text-slate-200 placeholder:text-slate-400 focus:border-cyan-500/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid gap-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard
                  title="Total Patients"
                  value={stats?.totalPatients || 0}
                  icon={Users}
                  trend="up"
                  color="cyan"
                  detail="Active in system"
                />
                <MetricCard
                  title="Active Referrals"
                  value={stats?.activeReferrals || 0}
                  icon={FileText}
                  trend="stable"
                  color="green"
                  detail="Last 30 days"
                />
                <MetricCard
                  title="Total Services"
                  value={stats?.totalServices || 0}
                  icon={Database}
                  trend="up"
                  color="purple"
                  detail="Available services"
                />
              </div>

              {/* Recent Referrals */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-cyan-500/10">
                <CardHeader className="border-b border-slate-700/50 pb-3 group-hover:border-slate-600/50 transition-colors duration-300">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center group-hover:text-cyan-100 transition-colors duration-300">
                      <FileText className="mr-2 h-5 w-5 text-cyan-500 group-hover:scale-110 transition-transform duration-300" />
                      Recent Referrals
                    </CardTitle>
                    <Button variant="outline" size="sm" className="border-slate-700/50 text-slate-400 hover:text-slate-100 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {stats?.recentReferrals?.map((referral) => (
                      <ReferralItem key={referral.id} referral={referral} />
                    )) || (
                      <div className="text-sm text-slate-500 text-center py-4">
                        No recent referrals
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Service Distribution */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300 group hover:shadow-2xl hover:shadow-green-500/10">
                <CardHeader className="border-b border-slate-700/50 pb-3 group-hover:border-slate-600/50 transition-colors duration-300">
                  <CardTitle className="text-slate-100 flex items-center group-hover:text-green-100 transition-colors duration-300">
                    <PieChart className="mr-2 h-5 w-5 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    Service Utilization
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {stats?.serviceDistribution?.map((service, index) => (
                      <ServiceUtilizationItem key={index} service={service} />
                    )) || (
                      <div className="text-sm text-slate-500 text-center py-4">
                        No service data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="grid gap-6">
              {/* Quick Actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={UserPlus} label="Add Patient" />
                    <ActionButton icon={FileText} label="New Referral" />
                    <ActionButton icon={Download} label="Export Data" />
                    <ActionButton icon={BarChart3} label="Reports" />
                  </div>
                </CardContent>
              </Card>

              {/* Patient Search Results */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Newest Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredPatients.slice(0, 5).map((patient) => (
                      <PatientSearchResult key={patient.id} patient={patient} />
                    ))}
                    {filteredPatients.length === 0 && searchTerm && (
                      <div className="text-sm text-slate-500 text-center py-4">
                        No patients found matching "{searchTerm}"
                      </div>
                    )}
                    {filteredPatients.length === 0 && !searchTerm && (
                      <div className="text-sm text-slate-500 text-center py-4">
                        No patients available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for quick stats
function QuickStat({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group cursor-pointer">
      <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{label}</div>
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-lg font-semibold text-slate-200 group-hover:text-cyan-100 transition-all duration-300">{value}</span>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
}: {
  title: string
  value: number
  icon: any
  trend: "up" | "down" | "stable"
  color: string
  detail: string
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      default:
        return "from-slate-500 to-slate-600 border-slate-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <Activity className="h-4 w-4 text-green-400" />
      case "down":
        return <Activity className="h-4 w-4 text-red-400 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-slate-400" />
    }
  }

  return (
    <div className="relative p-4 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:from-slate-800/70 hover:to-slate-900/70 hover:border-slate-600/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 group cursor-pointer overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500 group-hover:scale-110 transition-transform duration-300`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300 group-hover:from-cyan-100 group-hover:to-cyan-300 transition-all duration-300">
        {value}
      </div>
      <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center group-hover:scale-110 transition-transform duration-300">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500 group-hover:opacity-30 transition-opacity duration-300"></div>
    </div>
  )
}

// Component for referral items
function ReferralItem({ referral }: { referral: DashboardStats['recentReferrals'][0] }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group cursor-pointer">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10 group-hover:scale-110 transition-transform duration-300">
          <AvatarFallback className="bg-slate-700 text-cyan-500 group-hover:bg-slate-600 transition-colors duration-300">
            {referral.patientName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-slate-200 group-hover:text-cyan-100 transition-colors duration-300">{referral.patientName}</div>
          <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{referral.primaryDiagnosis}</div>
          <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
            NTA Score: {referral.ntaScore} • {formatDate(referral.createdAt)}
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
          {referral.services.filter(s => s.present).length} services
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs group-hover:bg-green-500/20 group-hover:border-green-400/50 transition-all duration-300">
          Active
        </Badge>
      </div>
    </div>
  )
}

// Component for service utilization items
function ServiceUtilizationItem({ service }: { service: { service: string; count: number } }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 hover:scale-[1.02] transition-all duration-300 group cursor-pointer">
      <div className="text-sm text-slate-300 group-hover:text-cyan-100 transition-colors duration-300">{service.service}</div>
      <div className="flex items-center space-x-2">
        <div className="w-20 bg-slate-800 rounded-full h-2 group-hover:bg-slate-700 transition-colors duration-300">
          <div
            className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:from-cyan-500 group-hover:to-blue-500 transition-all duration-300"
            style={{ width: `${Math.min((service.count / 10) * 100, 100)}%` }}
          ></div>
        </div>
        <span className="text-sm font-medium text-slate-200 group-hover:text-cyan-100 transition-colors duration-300">{service.count}</span>
      </div>
    </div>
  )
}

// Component for action buttons
function ActionButton({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <Button
      variant="outline"
      className="action-button"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Component for patient search results
function PatientSearchResult({ patient }: { patient: Patient }) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer hover:scale-105 transition-transform duration-200">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-slate-700 text-cyan-500 text-xs">
          {patient.firstName[0]}{patient.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-slate-200 truncate">
          {patient.firstName} {patient.lastName}
        </div>
        <div className="text-xs text-slate-400 truncate">
          {patient.age} yrs • {patient.city}, {patient.state}
        </div>
      </div>
      <Badge variant="outline" className="bg-slate-800/50 text-slate-300 border-slate-600/50 text-xs">
        {patient.ntaScore}
      </Badge>
    </div>
  )
}

