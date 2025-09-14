"use client"

import { useAuth } from '@/app/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog'
import { Shield, Users, Building2, Settings, Database, Activity, Key, Plus, Eye, Edit, Trash2, X } from 'lucide-react'
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

export default function HealthcareCPPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'healthcare',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    website: ''
  })
  
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
      const response = await fetch('/api/admin/organizations')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Transform the data to match the expected interface
          const transformedOrgs = data.organizations.map((org: any) => ({
            id: org.id,
            name: org.name,
            type: org.type,
            city: org.city || 'N/A',
            state: org.state || 'N/A',
            userCount: org._count.userOrganizations,
            patientCount: org._count.patients,
            referralCount: org.referralCount,
            createdAt: org.createdAt
          }))
          setOrganizations(transformedOrgs)
        }
      }
    } catch (error) {
      console.error('Failed to fetch organizations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createOrganization = async () => {
    if (!formData.name.trim()) {
      alert('Organization name is required')
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch('/api/admin/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        // Reset form and close dialog
        setFormData({
          name: '',
          type: 'healthcare',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          phone: '',
          website: ''
        })
        setIsCreateDialogOpen(false)
        // Refresh organizations list
        await fetchOrganizations()
        alert('Organization created successfully!')
      } else {
        alert(data.error || 'Failed to create organization')
      }
    } catch (error) {
      console.error('Error creating organization:', error)
      alert('Failed to create organization')
    } finally {
      setIsCreating(false)
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
      action: 'create-organization',
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    },
    {
      title: 'User Management',
      description: 'Create, edit, and manage all system users',
      icon: Users,
      href: '/dashboard/healthcare-cp/users',
      color: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
    },
    {
      title: 'System Settings',
      description: 'Manage system-wide configurations',
      icon: Settings,
      href: '/dashboard/healthcare-cp/system',
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      title: 'Database Administration',
      description: 'Database monitoring, backups, and maintenance',
      icon: Database,
      href: '/dashboard/healthcare-cp/database',
      color: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
    },
    {
      title: 'System Analytics',
      description: 'System-wide performance and usage analytics',
      icon: Activity,
      href: '/dashboard/healthcare-cp/analytics',
      color: 'bg-red-500/10 text-red-400 border-red-500/20'
    },
    {
      title: 'Security & Access',
      description: 'Manage security policies and access controls',
      icon: Key,
      href: '/dashboard/healthcare-cp/security',
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
              <h1 className="text-4xl font-bold text-white">HealthcareCP</h1>
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
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Organization
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-slate-700/50 backdrop-blur-sm">
                <DialogHeader className="space-y-3 pb-6 border-b border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold text-white">Create New Organization</DialogTitle>
                      <DialogDescription className="text-slate-300 mt-1">
                        Add a new healthcare organization to the system with all necessary details.
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 py-6">
                  {/* Basic Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-px bg-gradient-to-r from-blue-500/50 to-transparent flex-1"></div>
                      <span className="text-sm font-medium text-blue-400 px-3">Basic Information</span>
                      <div className="h-px bg-gradient-to-l from-blue-500/50 to-transparent flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-slate-300 flex items-center">
                          Organization Name *
                          <span className="text-red-400 ml-1">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="Enter organization name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="type" className="text-sm font-medium text-slate-300">
                          Organization Type
                        </Label>
                        <select
                          id="type"
                          value={formData.type}
                          onChange={(e) => setFormData({...formData, type: e.target.value})}
                          className="w-full bg-slate-700/50 border border-slate-600/50 text-white rounded-md px-3 py-2 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        >
                          <option value="healthcare">Healthcare</option>
                          <option value="hospital">Hospital</option>
                          <option value="clinic">Clinic</option>
                          <option value="healthcare_system">Healthcare System</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-px bg-gradient-to-r from-green-500/50 to-transparent flex-1"></div>
                      <span className="text-sm font-medium text-green-400 px-3">Contact Information</span>
                      <div className="h-px bg-gradient-to-l from-green-500/50 to-transparent flex-1"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-slate-300">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-300"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="website" className="text-sm font-medium text-slate-300">
                          Website URL
                        </Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-300"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Address Information Section */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="h-px bg-gradient-to-r from-purple-500/50 to-transparent flex-1"></div>
                      <span className="text-sm font-medium text-purple-400 px-3">Address Information</span>
                      <div className="h-px bg-gradient-to-l from-purple-500/50 to-transparent flex-1"></div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-slate-300">
                          Street Address
                        </Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="123 Main Street"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium text-slate-300">
                            City
                          </Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="City"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-sm font-medium text-slate-300">
                            State
                          </Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => setFormData({...formData, state: e.target.value})}
                            className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="CA"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode" className="text-sm font-medium text-slate-300">
                            ZIP Code
                          </Label>
                          <Input
                            id="zipCode"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                            className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                            placeholder="90210"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DialogFooter className="pt-6 border-t border-slate-700/50">
                  <div className="flex space-x-3 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="flex-1 h-11 bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/70 hover:text-white hover:border-slate-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={createOrganization}
                      disabled={isCreating || !formData.name.trim()}
                      className="flex-1 h-11 bg-slate-800/80 border border-slate-600/50 text-white hover:bg-slate-700/80 hover:border-slate-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 disabled:hover:border-slate-600/50"
                    >
                      {isCreating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Create Organization
                        </>
                      )}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  onClick={() => setIsCreateDialogOpen(true)}
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
                          onClick={() => router.push(`/dashboard/healthcare-cp/organizations/${org.id}`)}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-700 hover:text-white"
                          onClick={() => router.push(`/dashboard/healthcare-cp/organizations/${org.id}/edit`)}
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
                  onClick={() => {
                    if (feature.action === 'create-organization') {
                      setIsCreateDialogOpen(true)
                    } else if (feature.href) {
                      router.push(feature.href)
                    }
                  }}
                >
                  {feature.action === 'create-organization' ? 'Create Organization' : `Access ${feature.title}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
