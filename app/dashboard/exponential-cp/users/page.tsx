"use client"

import { useAuth } from '@/app/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  Eye,
  Key,
  Settings,
  Activity,
  TrendingUp,
  UserCheck,
  UserX,
  Crown,
  UserCog
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DashboardNavbar from '@/app/components/dashboard-navbar'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: 'SUPERADMIN' | 'ADMIN' | 'MEMBER'
  createdAt: string
  updatedAt: string
  userOrganizations: Array<{
    id: string
    role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER'
    isActive: boolean
    joinedAt: string
    organization: {
      id: string
      name: string
      type: string
    }
  }>
  _count: {
    userOrganizations: number
  }
}

interface UserStats {
  totalUsers: number
  superAdmins: number
  admins: number
  members: number
  activeUsers: number
  inactiveUsers: number
  recentSignups: number
}

export default function UsersPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [users, setUsers] = useState<User[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("ALL")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'MEMBER' as 'SUPERADMIN' | 'ADMIN' | 'MEMBER'
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
      fetchUsersData()
    }
  }, [user])

  const fetchUsersData = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/admin/users')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setUsers(data.users || [])
          setStats(data.stats || null)
        }
      }
    } catch (error) {
      console.error('Failed to fetch users data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const createUser = async () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert('Name, email, and password are required')
      return
    }

    setIsCreating(true)
    try {
      const response = await fetch('/api/admin/users', {
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
          email: '',
          phone: '',
          password: '',
          role: 'MEMBER'
        })
        setIsCreateDialogOpen(false)
        // Refresh users list
        await fetchUsersData()
        alert('User created successfully!')
      } else {
        alert(data.error || 'Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      alert('Failed to create user')
    } finally {
      setIsCreating(false)
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'SUPERADMIN':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'ADMIN':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'MEMBER':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
  }

  const getOrgRoleColor = (role: string) => {
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

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'SUPERADMIN':
        return <Crown className="h-4 w-4" />
      case 'ADMIN':
        return <Shield className="h-4 w-4" />
      case 'MEMBER':
        return <UserCheck className="h-4 w-4" />
      default:
        return <UserCog className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Filter users based on search term and role filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "ALL" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-xl text-slate-300">Loading users...</p>
        </div>
      </div>
    )
  }

  if (!user || (user.role !== 'SUPERADMIN' && user.role !== 'ADMIN')) {
    return null
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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">User Management</h1>
              <p className="text-slate-300 text-lg">
                Manage all system users and their permissions
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

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Users className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
                    <p className="text-slate-400 text-sm">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Crown className="h-8 w-8 text-red-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.superAdmins}</p>
                    <p className="text-slate-400 text-sm">Super Admins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.admins}</p>
                    <p className="text-slate-400 text-sm">Admins</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-8 w-8 text-green-400" />
                  <div>
                    <p className="text-2xl font-bold text-white">{stats.members}</p>
                    <p className="text-slate-400 text-sm">Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search and Filter Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">All Users</h2>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white border-0">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border-slate-700/50 backdrop-blur-sm">
                <DialogHeader className="space-y-3 pb-6 border-b border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <UserPlus className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <DialogTitle className="text-xl font-bold text-white">Create New User</DialogTitle>
                      <DialogDescription className="text-slate-300 mt-1">
                        Add a new user to the system with appropriate permissions.
                      </DialogDescription>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="space-y-6 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-slate-300 flex items-center">
                        Full Name *
                        <span className="text-red-400 ml-1">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="Enter full name"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-slate-300 flex items-center">
                        Email Address *
                        <span className="text-red-400 ml-1">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="user@example.com"
                      />
                    </div>
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
                      <Label htmlFor="role" className="text-sm font-medium text-slate-300">
                        Global Role
                      </Label>
                      <select
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value as 'SUPERADMIN' | 'ADMIN' | 'MEMBER'})}
                        className="w-full bg-slate-700/50 border border-slate-600/50 text-white rounded-md px-3 py-2 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-300"
                      >
                        <option value="MEMBER">Member</option>
                        <option value="ADMIN">Admin</option>
                        {user.role === 'SUPERADMIN' && <option value="SUPERADMIN">Super Admin</option>}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-slate-300 flex items-center">
                      Password *
                      <span className="text-red-400 ml-1">*</span>
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Enter password"
                    />
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
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={createUser}
                      disabled={isCreating || !formData.name.trim() || !formData.email.trim() || !formData.password.trim()}
                      className="flex-1 h-11 bg-slate-800/80 border border-slate-600/50 text-white hover:bg-slate-700/80 hover:border-slate-500/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800/80 disabled:hover:border-slate-600/50"
                    >
                      {isCreating ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Creating...
                        </>
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Create User
                        </>
                      )}
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="appearance-none bg-slate-800/50 border border-slate-600/50 text-white rounded-md px-4 py-2 pr-10 focus:border-blue-500/50 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 hover:border-slate-500/50 cursor-pointer min-w-[140px]"
              >
                <option value="ALL" className="bg-slate-800 text-white">All Roles</option>
                <option value="SUPERADMIN" className="bg-slate-800 text-white">Super Admins</option>
                <option value="ADMIN" className="bg-slate-800 text-white">Admins</option>
                <option value="MEMBER" className="bg-slate-800 text-white">Members</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users List */}
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardContent className="p-6">
            <div className="space-y-4">
              {filteredUsers.map((userItem) => (
                <div key={userItem.id} className="flex items-center justify-between p-6 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-lg">
                        {userItem.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-white font-medium text-lg">{userItem.name}</h3>
                        <Badge className={getRoleColor(userItem.role)}>
                          <span className="flex items-center space-x-1">
                            {getRoleIcon(userItem.role)}
                            <span>{userItem.role}</span>
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span className="flex items-center">
                          <Mail className="mr-1 h-3 w-3" />
                          {userItem.email}
                        </span>
                        {userItem.phone && (
                          <span className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {userItem.phone}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          Joined {formatDate(userItem.createdAt)}
                        </span>
                      </div>
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-3 w-3 text-slate-500" />
                          <span className="text-xs text-slate-500">
                            {userItem._count.userOrganizations} organization{userItem._count.userOrganizations !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {userItem.userOrganizations.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {userItem.userOrganizations.slice(0, 3).map((userOrg) => (
                              <Badge key={userOrg.id} className={`${getOrgRoleColor(userOrg.role)} text-xs`}>
                                {userOrg.organization.name} ({userOrg.role})
                              </Badge>
                            ))}
                            {userItem.userOrganizations.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{userItem.userOrganizations.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-300 mb-2">No Users Found</h3>
                  <p className="text-slate-400 mb-4">
                    {searchTerm || roleFilter !== "ALL" 
                      ? "No users match your current filters." 
                      : "Get started by creating your first user."}
                  </p>
                  {(!searchTerm && roleFilter === "ALL") && (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setIsCreateDialogOpen(true)}
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create User
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
