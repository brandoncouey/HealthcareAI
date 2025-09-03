"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"
import DashboardNavbar from "@/app/components/dashboard-navbar"
import { useAuth } from "@/app/hooks/useAuth"
import { 
  BarChart3, 
  Users, 
  FileText, 
  TrendingUp, 
  Calendar,
  Activity,
  PieChart,
  LineChart,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield
} from "lucide-react"
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
)

interface AnalyticsData {
  referralStats: {
    total: number
    byStatus: { status: string; count: number }[]
    byMonth: { month: string; count: number }[]
    byService: { service: string; count: number }[]
    byPayer: { payer: string; count: number }[]
    completionRate: number
    avgProcessingTime: number
    volumeTrend: { period: string; count: number }[]
    dailyVolume: { date: string; count: number }[]
    weeklyVolume: { week: string; count: number }[]
    referralSources: { source: string; count: number }[]
    turnaroundTime: { range: string; count: number }[]
  }
  patientStats: {
    total: number
    byAge: { age: string; count: number }[]
    byStatus: { status: string; count: number }[]
    byDiagnosis: { diagnosis: string; count: number }[]
    monthlyGrowth: { month: string; count: number }[]
  }
  organizationStats: {
    totalOrganizations: number
    activeReferrals: number
    totalServices: number
    totalPayers: number
  }
}

export default function AnalyticsPage() {
  const { user, authenticated, loading: authLoading } = useAuth()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')
  const [currentOrganizationId, setCurrentOrganizationId] = useState<string | undefined>(undefined)
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Set organization ID when user data becomes available
  useEffect(() => {
    if (user?.primaryOrganization?.id || user?.organizations?.[0]?.id) {
      setCurrentOrganizationId(user.primaryOrganization?.id || user.organizations?.[0]?.id)
    }
  }, [user])

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/dashboard/analytics?timeRange=${timeRange}`)
        
        if (response.ok) {
          const data = await response.json()
          setAnalyticsData(data)
        } else {
          console.error('Failed to fetch analytics data')
        }
      } catch (error) {
        console.error('Error fetching analytics data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [timeRange])

  // Handle organization change
  const handleOrganizationChange = (organizationId: string) => {
    setCurrentOrganizationId(organizationId)
    setAnalyticsData(null)
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-300">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 relative overflow-hidden">
        <DashboardNavbar 
          user={user}
          searchTerm=""
          onSearchChange={() => {}}
          theme={theme}
          onThemeToggle={toggleTheme}
          currentOrganizationId={currentOrganizationId}
          onOrganizationChange={handleOrganizationChange}
        />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
            <p className="text-xl text-slate-300">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 relative overflow-hidden">
                    <DashboardNavbar 
        user={user}
        searchTerm=""
        onSearchChange={() => {}}
        theme={theme}
        onThemeToggle={toggleTheme}
        currentOrganizationId={currentOrganizationId}
        onOrganizationChange={handleOrganizationChange}
      />
      
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-100 mb-2">Referral Analytics Dashboard</h1>
              <p className="text-slate-400">Comprehensive insights into referral volume and performance</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600/50 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {analyticsData ? (
          <div className="space-y-8">
            {/* Key Referral Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Total Referrals</p>
                      <p className="text-2xl font-bold text-slate-200">{analyticsData.referralStats.total}</p>
                      <p className="text-xs text-slate-500 mt-1">This period</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Daily Average</p>
                      <p className="text-2xl font-bold text-slate-200">{Math.round(analyticsData.referralStats.total / 30)}</p>
                      <p className="text-xs text-slate-500 mt-1">Referrals per day</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Target className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Completion Rate</p>
                      <p className="text-2xl font-bold text-slate-200">{analyticsData.referralStats.completionRate}%</p>
                      <p className="text-xs text-slate-500 mt-1">Success rate</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-amber-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 hover:border-slate-600/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm font-medium">Avg Processing</p>
                      <p className="text-2xl font-bold text-slate-200">{analyticsData.referralStats.avgProcessingTime}d</p>
                      <p className="text-xs text-slate-500 mt-1">Turnaround time</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Volume Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Referral Volume */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-cyan-500" />
                    Referral Volume Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line
                      data={{
                        labels: analyticsData.referralStats.byMonth.map(item => item.month),
                        datasets: [{
                          label: 'Referral Volume',
                          data: analyticsData.referralStats.byMonth.map(item => item.count),
                          borderColor: 'rgba(6, 182, 212, 1)',
                          backgroundColor: 'rgba(6, 182, 212, 0.1)',
                          tension: 0.4,
                          fill: true,
                          pointBackgroundColor: 'rgba(6, 182, 212, 1)',
                          pointBorderColor: '#fff',
                          pointBorderWidth: 2,
                          pointRadius: 6,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: { color: '#cbd5e1' }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          },
                          x: {
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Referral Status Distribution */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center">
                    <PieChart className="mr-2 h-5 w-5 text-emerald-500" />
                    Referral Status Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Doughnut
                      data={{
                        labels: analyticsData.referralStats.byStatus.map(item => item.status),
                        datasets: [{
                          data: analyticsData.referralStats.byStatus.map(item => item.count),
                          backgroundColor: [
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(245, 158, 11, 0.8)',
                            'rgba(239, 68, 68, 0.8)',
                          ],
                          borderColor: [
                            'rgba(34, 197, 94, 1)',
                            'rgba(59, 130, 246, 1)',
                            'rgba(245, 158, 11, 1)',
                            'rgba(239, 68, 68, 1)',
                          ],
                          borderWidth: 2,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'bottom',
                            labels: { color: '#cbd5e1' }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Volume Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Volume Pattern */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-500" />
                    Daily Volume Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: analyticsData.referralStats.dailyVolume.map(item => item.date),
                        datasets: [{
                          label: 'Daily Referrals',
                          data: analyticsData.referralStats.dailyVolume.map(item => item.count),
                          backgroundColor: 'rgba(34, 197, 94, 0.8)',
                          borderColor: 'rgba(34, 197, 94, 1)',
                          borderWidth: 1,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: { color: '#cbd5e1' }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          },
                          x: {
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Service Volume */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-purple-500" />
                    Referral Volume by Service
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: analyticsData.referralStats.byService.map(item => item.service),
                        datasets: [{
                          label: 'Referral Volume',
                          data: analyticsData.referralStats.byService.map(item => item.count),
                          backgroundColor: 'rgba(147, 51, 234, 0.8)',
                          borderColor: 'rgba(147, 51, 234, 1)',
                          borderWidth: 1,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: { color: '#cbd5e1' }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          },
                          x: {
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Payer Volume */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-amber-500" />
                    Referral Volume by Payer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Bar
                      data={{
                        labels: analyticsData.referralStats.byPayer.map(item => item.payer),
                        datasets: [{
                          label: 'Referral Volume',
                          data: analyticsData.referralStats.byPayer.map(item => item.count),
                          backgroundColor: 'rgba(245, 158, 11, 0.8)',
                          borderColor: 'rgba(245, 158, 11, 1)',
                          borderWidth: 1,
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: { color: '#cbd5e1' }
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 163, 184, 0.1)' }
                          },
                          x: {
                            ticks: { color: '#cbd5e1' },
                            grid: { color: 'rgba(148, 158, 184, 0.1)' }
                          }
                        }
                      }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Referral Performance Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Volume Performance */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Volume Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Peak Day</span>
                      <span className="text-slate-200 font-semibold">Wednesday</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Avg Daily Volume</span>
                      <span className="text-slate-200 font-semibold">{Math.round(analyticsData.referralStats.total / 30)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Growth Rate</span>
                      <span className="text-emerald-400 font-semibold">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processing Efficiency */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Processing Efficiency</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Fast Track</span>
                      <span className="text-slate-200 font-semibold">24h</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Standard</span>
                      <span className="text-slate-200 font-semibold">3-5 days</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Complex Cases</span>
                      <span className="text-slate-200 font-semibold">7-10 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Volume Forecast */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-100 text-lg">Volume Forecast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Next Week</span>
                      <span className="text-slate-200 font-semibold">+8%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Next Month</span>
                      <span className="text-slate-200 font-semibold">+15%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300 text-sm">Quarter</span>
                      <span className="text-emerald-400 font-semibold">+22%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <BarChart3 className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-200 mb-2">No Analytics Data</h3>
            <p className="text-slate-400">Loading referral analytics...</p>
          </div>
        )}
      </div>
    </div>
  )
}
