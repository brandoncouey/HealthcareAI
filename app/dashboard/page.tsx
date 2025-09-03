"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  BarChart3,
  Bell,
  CircleOff,
  Command,
  Cpu,
  Database,
  Download,
  FileText,
  Globe,
  HardDrive,
  Heart,
  Home,
  LineChart,
  Lock,
  LogOut,
  type LucideIcon,
  MessageSquare,
  Mic,
  Moon,
  PieChart,
  Plus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sun,
  Terminal,
  TrendingUp,
  Users,
  UserPlus,
  Wifi,
  Zap,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Progress } from "@/app/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Slider } from "@/app/components/ui/slider"
import { Switch } from "@/app/components/ui/switch"
import { Label } from "@/app/components/ui/label"
import Image from "next/image"
import DashboardNavbar from "@/app/components/dashboard-navbar"
import { DashboardSkeleton } from "@/app/components/ui/skeleton"

// Utility functions
const formatTime = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

interface DashboardStats {
  totalPatients: number
  totalReferrals: number
  activeReferrals: number
  totalServices: number
  totalPayers: number
  recentReferrals: Array<{
    id: string
    patientName: string
    primaryDiagnosis: string
    ntaScore: string
    createdAt: Date
    services: Array<{ label: string; present: boolean }>
  }>
  serviceDistribution: Array<{ service: string; count: number }>
  payerDistribution: Array<{ payer: string; count: number }>
  referralTrends: Array<{ month: string; count: number }>
}

interface Patient {
  id: string
  firstName: string
  lastName: string
  age: number
  primaryDiagnosis: string
  ntaScore: string
  services: string
  emergencyContact: string
  city: string
  state: string
}

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTime, setCurrentTime] = useState<Date | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    // Set initial time on client side to avoid hydration mismatch
    if (!currentTime) {
      setCurrentTime(new Date())
    }
    
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [currentTime])

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, patientsResponse] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/patients')
        ])

        if (statsResponse.ok) {
          const statsData = await statsResponse.json()
          setStats(statsData)
        }

        if (patientsResponse.ok) {
          const patientsData = await patientsResponse.json()
          setPatients(patientsData)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient =>
    `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-slate-100 relative overflow-hidden`}
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-cyan-400/30 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 right-1/2 w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{animationDelay: '2.5s'}}></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Moving light rays */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-slate-800 z-50">
          <DashboardSkeleton />
        </div>
      )}

      <div className="relative z-10">
      <DashboardNavbar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        theme={theme}
        onThemeToggle={toggleTheme}
        organizationName="Exponential Healthcare Solutions"
      />

        {/* Main Content */}
        <div className="container mx-auto p-4">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <QuickStat label="Total Patients" value={stats?.totalPatients || 0} icon={Users} />
            <QuickStat label="Active Referrals" value={stats?.activeReferrals || 0} icon={FileText} />
            <QuickStat label="Total Services" value={stats?.totalServices || 0} icon={Database} />
            <QuickStat label="Total Payers" value={stats?.totalPayers || 0} icon={Shield} />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-12 gap-6">
            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-8">
              <div className="grid gap-6">
                {/* Key Metrics */}
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
                      {stats?.recentReferrals.map((referral) => (
                        <ReferralItem key={referral.id} referral={referral} />
                      ))}
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
                      {stats?.serviceDistribution.map((service, index) => (
                        <ServiceUtilizationItem key={index} service={service} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <div className="grid gap-6">
                {/* System time */}
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                      <div className="text-center">
                        <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                        <div className="text-3xl font-mono text-cyan-400 mb-1">{currentTime ? formatTime(currentTime) : '--:--:--'}</div>
                        <div className="text-sm text-slate-400">{currentTime ? formatDate(currentTime) : '-- -- --'}</div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Patients</div>
                          <div className="text-sm font-mono text-slate-200">{stats?.totalPatients || 0}</div>
                        </div>
                        <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                          <div className="text-xs text-slate-500 mb-1">Referrals</div>
                          <div className="text-sm font-mono text-slate-200">{stats?.totalReferrals || 0}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                    <CardTitle className="text-slate-100 text-base">Patient Search</CardTitle>
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
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// Component for quick stats
function QuickStat({ label, value, icon: Icon }: { label: string; value: number; icon: LucideIcon }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 hover:border-slate-600/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group cursor-pointer">
      <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">{label}</div>
      <div className="flex items-center space-x-2">
        <Icon className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300" />
        <span className="text-lg font-semibold text-slate-200 group-hover:text-cyan-100 transition-colors duration-300">{value}</span>
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
  icon: LucideIcon
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
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-amber-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 rotate-180 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`dashboard-metric-card border ${getColor()} hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 group cursor-pointer`}>
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
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
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

