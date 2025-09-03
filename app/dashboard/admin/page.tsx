"use client"

import { useAuth } from '@/app/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Building2, Users, UserPlus, Settings, Activity, Shield, Plus, Eye, Edit, Trash2, FileText, Calendar } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardNavbar from '@/app/components/dashboard-navbar'

interface OrganizationUser {
  id: string
  name: string
  email: string
  role: string
  joinedAt: string
  isActive: boolean
}

interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  city: string
  state: string
  status: string
}

interface Referral {
  id: string
  patientName: string
  service: string
  status: string
  createdAt: string
  priority: string
}

export default function AdminPanelPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [adminOrganizations, setAdminOrganizations] = useState<any[]>([])
  const [selectedOrg, setSelectedOrg] = useState<any>(null)
  const [orgUsers, setOrgUsers] = useState<OrganizationUser[]>([])
  const [orgPatients, setOrgPatients] = useState<Patient[]>([])
  const [orgReferrals, setOrgReferrals] = useState<Referral[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    if (!loading && (!user || !user.organizations?.some(org => 
      org.role === 'ADMIN' || org.role === 'OWNER'
    ))) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && user.organizations) {
      const adminOrgs = user.organizations.filter(org => 
        org.role === 'ADMIN' || org.role === 'OWNER'
      )
      setAdminOrganizations(adminOrgs)
      if (adminOrgs.length > 0) {
        setSelectedOrg(adminOrgs[0])
        fetchOrganizationData(adminOrgs[0].id)
      }
    }
  }, [user])

  const fetchOrganizationData = async (orgId: string) => {
    setIsLoading(true)
    try {
      // Fetch users, patients, and referrals for the selected organization
      // This would be implemented with actual API calls
      const mockUsers: OrganizationUser[] = [
        { id: '1', name: 'Dr. Sarah Martinez', email: 'dr.sarah@healthcare.org', role: 'ADMIN', joinedAt: '2024-01-15', isActive: true },
        { id: '2', name: 'Mike Johnson', email: 'nurse.mike@healthcare.org', role: 'MEMBER', joinedAt: '2024-02-01', isActive: true },
        { id: '3', name: 'Lisa Thompson', email: 'therapist.lisa@healthcare.org', role: 'MEMBER', joinedAt: '2024-02-15', isActive: true }
      ]
      
      const mockPatients: Patient[] = [
        { id: '1', firstName: 'John', lastName: 'Doe', dateOfBirth: '1985-03-15', city: 'Medical City', state: 'CA', status: 'Active' },
        { id: '2', firstName: 'Jane', lastName: 'Smith', dateOfBirth: '1990-07-22', city: 'Medical City', state: 'CA', status: 'Active' },
        { id: '3', firstName: 'Bob', lastName: 'Johnson', dateOfBirth: '1978-11-08', city: 'Medical City', state: 'CA', status: 'Inactive' }
      ]
      
      const mockReferrals: Referral[] = [
        { id: '1', patientName: 'John Doe', service: 'Physical Therapy', status: 'Pending', createdAt: '2024-03-01', priority: 'High' },
        { id: '2', patientName: 'Jane Smith', service: 'Cardiology', status: 'Approved', createdAt: '2024-02-28', priority: 'Medium' },
        { id: '3', patientName: 'Bob Johnson', service: 'Neurology', status: 'Completed', createdAt: '2024-02-15', priority: 'Low' }
      ]
      
      setOrgUsers(mockUsers)
      setOrgPatients(mockPatients)
      setOrgReferrals(mockReferrals)
    } catch (error) {
      console.error('Failed to fetch organization data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrgChange = (org: any) => {
    setSelectedOrg(org)
    fetchOrganizationData(org.id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user || !user.organizations?.some(org => 
    org.role === 'ADMIN' || org.role === 'OWNER'
  )) {
    return null
  }

  const adminFeatures = [
    {
      title: 'Organization Settings',
      description: 'Manage your organization\'s profile and settings',
      icon: Building2,
      href: '/dashboard/admin/organization',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      title: 'Member Management',
      description: 'Invite, manage, and organize team members',
      icon: Users,
      href: '/dashboard/admin/members',
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      title: 'Invite New Users',
      description: 'Send invitations to join your organization',
      icon: UserPlus,
      href: '/dashboard/admin/invitations',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      title: 'Patient Management',
      description: 'Manage patient records and information',
      icon: Activity,
      href: '/dashboard/admin/patients',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
    {
      title: 'Referral Management',
      description: 'Track and manage patient referrals',
      icon: FileText,
      href: '/dashboard/admin/referrals',
      color: 'bg-red-500/10 text-red-400 border-red-500/20'
    },
    {
      title: 'Custom Settings',
      description: 'Configure organization-specific features and workflows',
      icon: Settings,
      href: '/dashboard/admin/custom',
      color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    }
  ]

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
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
              <p className="text-slate-300 text-lg">
                Organization Administration & Management
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              Organization Admin
            </Badge>
            <span className="text-slate-400">•</span>
            <span className="text-slate-300">{user.email}</span>
          </div>
        </div>

        {/* Organization Selector */}
        {adminOrganizations.length > 1 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Select Organization</h2>
            <div className="flex flex-wrap gap-3">
              {adminOrganizations.map((org) => (
                <Button
                  key={org.id}
                  variant={selectedOrg?.id === org.id ? "default" : "outline"}
                  className={selectedOrg?.id === org.id 
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-0" 
                    : "border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
                  }
                  onClick={() => handleOrgChange(org)}
                >
                  {org.name}
                  <Badge variant="secondary" className="ml-2 bg-slate-700/50 text-slate-300">
                    {org.role}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Organization Overview Stats */}
        {selectedOrg && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {selectedOrg.name} - Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-blue-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{orgUsers.length}</p>
                      <p className="text-slate-400 text-sm">Team Members</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Activity className="h-8 w-8 text-green-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{orgPatients.length}</p>
                      <p className="text-slate-400 text-sm">Patients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-purple-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">{orgReferrals.length}</p>
                      <p className="text-slate-400 text-sm">Referrals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-8 w-8 text-orange-400" />
                    <div>
                      <p className="text-2xl font-bold text-white">12</p>
                      <p className="text-slate-400 text-sm">This Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white border-0"
              onClick={() => router.push('/dashboard/admin/invitations')}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              onClick={() => router.push('/dashboard/admin/patients/create')}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
            <Button 
              className="bg-purple-600 hover:bg-purple-700 text-white border-0"
              onClick={() => router.push('/dashboard/admin/referrals/create')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Referral
            </Button>
          </div>
        </div>

        {/* Recent Activity Grid */}
        {selectedOrg && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Recent Users */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recent Team Members</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
                    onClick={() => router.push('/dashboard/admin/members')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orgUsers.slice(0, 3).map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                      <Badge variant="secondary" className="bg-slate-600/50 text-slate-300">
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Referrals */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Recent Referrals</CardTitle>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
                    onClick={() => router.push('/dashboard/admin/referrals')}
                  >
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orgReferrals.slice(0, 3).map((referral) => (
                    <div key={referral.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{referral.patientName}</p>
                        <p className="text-slate-400 text-sm">{referral.service}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-slate-600/50 text-slate-300 mb-1">
                          {referral.status}
                        </Badge>
                        <p className="text-slate-400 text-xs">{referral.priority}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
