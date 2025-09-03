"use client"

import { useAuth } from '@/app/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Shield, Users, Building2, Settings, Database, Activity, Key, Plus, Eye, Edit, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardNavbar from '@/app/components/dashboard-navbar'

interface Organization {
  id: string
  name: string
  type: string
  city: string
  state: string
  userCount: number
  patientCount: number
  referralCount: number
  createdAt: string
}

export default function ExponentialCPPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
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
      fetchOrganizations()
    }
  }, [user])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/organizations')
      if (response.ok) {
        const data = await response.json()
        setOrganizations(data.organizations || [])
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN')) {
    return null
  }

  const adminFeatures = [
    {
      title: 'Create Organization',
      description: 'Create new healthcare organizations',
      icon: Plus,
      href: '/dashboard/exponential-cp/organizations/create',
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      title: 'User Management',
      description: 'Create, edit, and manage all system users',
      icon: Users,
      href: '/dashboard/exponential-cp/users',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      title: 'System Settings',
      description: 'Manage system-wide configurations',
      icon: Settings,
      href: '/dashboard/exponential-cp/system',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      title: 'Database Administration',
      description: 'Database monitoring, backups, and maintenance',
      icon: Database,
      href: '/dashboard/exponential-cp/database',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
    {
      title: 'System Analytics',
      description: 'System-wide performance and usage analytics',
      icon: Activity,
      href: '/dashboard/exponential-cp/analytics',
      color: 'bg-red-500/10 text-red-400 border-red-500/20'
    },
    {
      title: 'Security & Access',
      description: 'Manage security policies and access controls',
      icon: Key,
      href: '/dashboard/exponential-cp/security',
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    }
  ]

  const totalUsers = organizations.reduce((sum, org) => sum + org.userCount, 0)
  const totalPatients = organizations.reduce((sum, org) => sum + org.patientCount, 0)
  const totalReferrals = organizations.reduce((sum, org) => sum + org.referralCount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardNavbar 
        theme={theme}
        onThemeToggle={toggleTheme}
        user={user}
      />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">ExponentialCP</h1>
              <p className="text-slate-300 text-lg">
                System Administration & Organization Management
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              {user.role === 'SUPERADMIN' ? 'Super Administrator' : 'System Administrator'}
            </Badge>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{user.email}</span>
          </div>
        </div>

        {/* System Overview Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Building2 className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{organizations.length}</p>
                    <p className="text-slate-400 text-sm">Organizations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{totalUsers}</p>
                    <p className="text-slate-400 text-sm">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-purple-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{totalPatients}</p>
                    <p className="text-slate-400 text-sm">Total Patients</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-orange-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{totalReferrals}</p>
                    <p className="text-slate-400 text-sm">Total Referrals</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Organizations List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">All Organizations</h2>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              onClick={() => router.push('/dashboard/exponential-cp/organizations/create')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Organization
            </Button>
          </div>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-slate-400">Loading organizations...</div>
            </div>
          ) : organizations.length === 0 ? (
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-8 text-center">
                <Building2 className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-300 mb-2">No Organizations</h3>
                <p className="text-slate-400 mb-4">Get started by creating your first healthcare organization.</p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white border-0"
                  onClick={() => router.push('/dashboard/exponential-cp/organizations/create')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create Organization
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizations.map((org) => (
                <Card key={org.id} className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{org.name}</CardTitle>
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                        {org.type}
                      </Badge>
                    </div>
                    <CardDescription className="text-slate-300">
                      {org.city}, {org.state}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center">
                          <p className="text-slate-400">Users</p>
                          <p className="text-white font-semibold">{org.userCount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-400">Patients</p>
                          <p className="text-white font-semibold">{org.patientCount}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-slate-400">Referrals</p>
                          <p className="text-white font-semibold">{org.referralCount}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
                          onClick={() => router.push(`/dashboard/exponential-cp/organizations/${org.id}`)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
                          onClick={() => router.push(`/dashboard/exponential-cp/organizations/${org.id}/edit`)}
                        >
                          <Edit className="mr-1 h-3 w-3" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/20">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${feature.color}`}>
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-slate-300">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700 hover:text-white hover:border-slate-500"
                  onClick={() => router.push(feature.href)}
                >
                  Access {feature.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
