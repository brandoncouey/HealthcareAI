"use client"

import { useAuth } from '@/app/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  UserPlus, 
  Activity, 
  MapPin, 
  Phone, 
  Globe, 
  Calendar,
  Edit,
  Settings,
  BarChart3,
  FileText,
  Shield,
  Mail,
  Clock,
  TrendingUp,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardNavbar from '@/app/components/dashboard-navbar'

interface Organization {
  id: string
  name: string
  type: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  phone?: string
  website?: string
  createdAt: string
  updatedAt: string
  _count: {
    userOrganizations: number
    patients: number
    invitations: number
  }
  userOrganizations: Array<{
    id: string
    role: string
    isActive: boolean
    joinedAt: string
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }>
  patients: Array<{
    id: string
    firstName: string
    lastName: string
    age?: number
    city?: string
    state?: string
    createdAt: string
  }>
  referralCount: number
}

interface OrganizationStats {
  totalUsers: number
  totalPatients: number
  totalReferrals: number
  activeUsers: number
  recentActivity: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    user?: string
  }>
}

export default function OrganizationViewPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const organizationId = params.id as string
  
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [stats, setStats] = useState<OrganizationStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    if (!loading && (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN'))) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && (user.role === 'SUPERADMIN' || user.role === 'ADMIN')) {
      fetchOrganizationData()
    }
  }, [user, organizationId])

  const fetchOrganizationData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/admin/organizations/${organizationId}`)
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setOrganization(data.organization)
          setStats(data.stats)
        }
      }
    } catch (error) {
      console.error('Failed to fetch organization data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-300">Loading organization...</p>
        </div>
      </div>
    )
  }

  if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN')) {
    return null
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <DashboardNavbar 
          theme={theme}
          onThemeToggle={toggleTheme}
          user={user}
        />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <Building2 className="h-16 w-16 text-slate-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-300 mb-2">Organization Not Found</h2>
            <p className="text-slate-400 mb-6">The organization you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button 
              onClick={() => router.push('/dashboard/healthcare-cp')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Organizations
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getOrganizationTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'hospital':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'clinic':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'healthcare_system':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'OWNER':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'ADMIN':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'MEMBER':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'VIEWER':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardNavbar 
        theme={theme}
        onThemeToggle={toggleTheme}
        user={user}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/healthcare-cp')}
              className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div className="h-6 w-px bg-slate-600/50"></div>
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{organization.name}</h1>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge className={getOrganizationTypeColor(organization.type)}>
                    {organization.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-300">Created {formatDate(organization.createdAt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => router.push(`/dashboard/healthcare-cp/organizations/${organizationId}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Organization
            </Button>
            <Button 
              variant="outline"
              className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button 
              variant="outline"
              className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{organization._count.userOrganizations}</p>
                  <p className="text-slate-400 text-sm">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{organization._count.patients}</p>
                  <p className="text-slate-400 text-sm">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{organization.referralCount}</p>
                  <p className="text-slate-400 text-sm">Total Referrals</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{organization._count.invitations}</p>
                  <p className="text-slate-400 text-sm">Pending Invitations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="patients" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
              Patients
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-slate-700/50 data-[state=active]:text-white">
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Organization Details */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Building2 className="mr-2 h-5 w-5 text-blue-400" />
                    Organization Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-400">Type</p>
                      <p className="text-white font-medium">{organization.type.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Created</p>
                      <p className="text-white font-medium">{formatDate(organization.createdAt)}</p>
                    </div>
                  </div>
                  
                  {organization.address && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400 flex items-center">
                        <MapPin className="mr-1 h-4 w-4" />
                        Address
                      </p>
                      <p className="text-white">
                        {organization.address}
                        {organization.city && `, ${organization.city}`}
                        {organization.state && `, ${organization.state}`}
                        {organization.zipCode && ` ${organization.zipCode}`}
                      </p>
                    </div>
                  )}
                  
                  {organization.phone && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400 flex items-center">
                        <Phone className="mr-1 h-4 w-4" />
                        Phone
                      </p>
                      <p className="text-white">{organization.phone}</p>
                    </div>
                  )}
                  
                  {organization.website && (
                    <div className="space-y-2">
                      <p className="text-sm text-slate-400 flex items-center">
                        <Globe className="mr-1 h-4 w-4" />
                        Website
                      </p>
                      <a 
                        href={organization.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {organization.website}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5 text-green-400" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">{organization._count.userOrganizations}</p>
                      <p className="text-sm text-slate-400">Active Users</p>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">{organization._count.patients}</p>
                      <p className="text-sm text-slate-400">Total Patients</p>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">{organization.referralCount}</p>
                      <p className="text-sm text-slate-400">Referrals</p>
                    </div>
                    <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">{organization._count.invitations}</p>
                      <p className="text-sm text-slate-400">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Users className="mr-2 h-5 w-5 text-blue-400" />
                    Organization Users
                  </CardTitle>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organization.userOrganizations.map((userOrg) => (
                    <div key={userOrg.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {userOrg.user.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{userOrg.user.name}</p>
                          <p className="text-slate-400 text-sm">{userOrg.user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getRoleColor(userOrg.role)}>
                          {userOrg.role}
                        </Badge>
                        <Badge variant={userOrg.isActive ? "default" : "secondary"}>
                          {userOrg.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <span className="text-slate-400 text-sm">
                          Joined {formatDate(userOrg.joinedAt)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Patients Tab */}
          <TabsContent value="patients" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="mr-2 h-5 w-5 text-green-400" />
                  Organization Patients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {organization.patients.slice(0, 10).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {patient.firstName[0]}{patient.lastName[0]}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{patient.firstName} {patient.lastName}</p>
                          <p className="text-slate-400 text-sm">
                            {patient.age && `${patient.age} years old`}
                            {patient.city && patient.state && ` • ${patient.city}, ${patient.state}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-400 text-sm">
                          Added {formatDate(patient.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {organization.patients.length > 10 && (
                    <div className="text-center py-4">
                      <Button variant="outline" className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50">
                        View All {organization.patients.length} Patients
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-orange-400" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{activity.description}</p>
                        <p className="text-slate-400 text-sm">
                          {activity.user && `by ${activity.user} • `}
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
