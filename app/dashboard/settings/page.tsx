"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/hooks/useAuth"
import DashboardNavbar from "@/app/components/dashboard-navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import { Separator } from "@/app/components/ui/separator"
import { Switch } from "@/app/components/ui/switch"
import { Badge } from "@/app/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import { useToast } from "@/app/components/ui/use-toast"
import {
  User,
  Lock,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface UserSettings {
  email: string
  name: string
  phone?: string
  timezone: string
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisibility: "public" | "private" | "organization"
    dataSharing: boolean
    analytics: boolean
  }
  theme: "light" | "dark" | "system"
}

export default function SettingsPage() {
  const { user, authenticated, loading: authLoading, updateUserData } = useAuth()
  const { toast } = useToast()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [isLoading, setIsLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [settings, setSettings] = useState<UserSettings>({
    email: "",
    name: "",
    phone: "",
    timezone: "UTC",
    language: "en",
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: "organization",
      dataSharing: true,
      analytics: true,
    },
    theme: "system",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Initialize settings with user data
  useEffect(() => {
    if (user) {
      console.log('User data updated in settings:', user)
      setSettings(prev => ({
        ...prev,
        email: user.email || "",
        name: user.name || "",
      }))
    }
  }, [user])

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !authenticated) {
      window.location.href = '/login'
    }
  }, [authLoading, authenticated])

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => {
      if (key.includes('.')) {
        const [section, setting] = key.split('.')
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof UserSettings],
            [setting]: value,
          },
        }
      }
      return {
        ...prev,
        [key]: value,
      }
    })
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new passwords match.",
        variant: "destructive",
      })
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Password updated successfully",
          description: "Your password has been changed.",
        })
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      } else {
        toast({
          title: "Failed to update password",
          description: data.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating your password.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveSettings = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/update-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      const data = await response.json()

      if (data.success) {
        // Update the user data in the auth context to reflect changes immediately
        console.log('Updating user data with:', { name: settings.name, phone: settings.phone })
        updateUserData({
          name: settings.name,
          phone: settings.phone
        })
        
        toast({
          title: "Settings saved",
          description: "Your settings have been updated successfully.",
        })
      } else {
        toast({
          title: "Failed to save settings",
          description: data.error || "Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while saving your settings.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-black via-slate-900 to-slate-800 text-slate-100 relative overflow-hidden`}>
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10">
        <DashboardNavbar 
          theme={theme}
          onThemeToggle={toggleTheme}
          user={user}
          onOrganizationChange={() => {}} // Settings page doesn't need organization switching
          currentOrganizationId={user?.primaryOrganization?.id || user?.organizations?.[0]?.id}
          organizationName={user?.primaryOrganization?.name || user?.organizations?.[0]?.name}
        />

        <div className="container mx-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-slate-400 mt-2">
                Manage your account settings and preferences
              </p>
            </div>

            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700/50">
                <TabsTrigger value="profile" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Lock className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="notifications" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <User className="w-5 h-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    <CardDescription>
                      Update your personal information and contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20 border-2 border-cyan-500/50">
                        <AvatarImage alt="Profile" />
                        <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-400 text-2xl font-semibold">
                          {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                        <Input
                          id="name"
                          value={settings.name}
                          onChange={(e) => handleSettingChange('name', e.target.value)}
                          className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-cyan-500/50"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                        <div className="px-4 py-3 bg-slate-800/30 border border-slate-600/30 rounded-xl text-slate-400 cursor-not-allowed">
                          {settings.email}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">Email address cannot be changed</p>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                        <Input
                          id="phone"
                          value={settings.phone}
                          onChange={(e) => handleSettingChange('phone', e.target.value)}
                          className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-cyan-500/50"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="timezone" className="text-slate-300">Timezone</Label>
                        <div className="relative mt-2">
                          <select
                            id="timezone"
                            value={settings.timezone}
                            onChange={(e) => handleSettingChange('timezone', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-500/70 hover:bg-slate-800/70"
                          >
                            <option value="UTC" className="bg-slate-800 text-slate-200">UTC</option>
                            <option value="America/New_York" className="bg-slate-800 text-slate-200">Eastern Time</option>
                            <option value="America/Chicago" className="bg-slate-800 text-slate-200">Central Time</option>
                            <option value="America/Denver" className="bg-slate-800 text-slate-200">Mountain Time</option>
                            <option value="America/Los_Angeles" className="bg-slate-800 text-slate-200">Pacific Time</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="language" className="text-slate-300">Language</Label>
                        <div className="relative mt-2">
                          <select
                            id="language"
                            value={settings.language}
                            onChange={(e) => handleSettingChange('language', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-500/70 hover:bg-slate-800/70"
                          >
                            <option value="en" className="bg-slate-800 text-slate-200">English</option>
                            <option value="es" className="bg-slate-800 text-slate-200">Spanish</option>
                            <option value="fr" className="bg-slate-800 text-slate-200">French</option>
                            <option value="de" className="bg-slate-800 text-slate-200">German</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Lock className="w-5 h-5 mr-2" />
                      Change Password
                    </CardTitle>
                    <CardDescription>
                      Update your password to keep your account secure
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <Label htmlFor="currentPassword" className="text-slate-300">Current Password</Label>
                        <div className="relative">
                          <Input
                            id="currentPassword"
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-cyan-500/50 pr-10"
                            placeholder="Enter your current password"
                            required
                          />
                          {showCurrentPassword && (
                            <p className="text-xs text-cyan-400 mt-1">• Password is visible</p>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                            onClick={() => {
                              const newValue = !showCurrentPassword;

                              setShowCurrentPassword(newValue);
                            }}
                            title={showCurrentPassword ? "Hide password" : "Show password"}
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
                        <div className="relative">
                          <Input
                            id="newPassword"
                            type={showNewPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-cyan-500/50 pr-10"
                            placeholder="Enter your new password"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                            onClick={() => {
                              const newValue = !showNewPassword;

                              setShowNewPassword(newValue);
                            }}
                            title={showNewPassword ? "Hide password" : "Show password"}
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Password must be at least 8 characters long
                          {showNewPassword && <span className="text-cyan-400 ml-2">• Password is visible</span>}
                        </p>
                      </div>

                      <div>
                        <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
                        <div className="relative">
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="bg-slate-800/50 border-slate-600/50 text-slate-200 focus:border-cyan-500/50 pr-10"
                            placeholder="Confirm your new password"
                            required
                          />
                          {showConfirmPassword && (
                            <p className="text-xs text-cyan-400 mt-1">• Password is visible</p>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-slate-700/50 text-slate-400 hover:text-slate-200"
                            onClick={() => {
                              const newValue = !showConfirmPassword;

                              setShowConfirmPassword(newValue);
                            }}
                            title={showConfirmPassword ? "Hide password" : "Show password"}
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        disabled={isLoading}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      >
                        {isLoading ? "Updating..." : "Update Password"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-cyan-400">Two-Factor Authentication</CardTitle>
                    <CardDescription>
                      Add an extra layer of security to your account
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-300">Two-factor authentication is not enabled</p>
                        <p className="text-sm text-slate-500">Protect your account with an additional verification step</p>
                      </div>
                      <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10">
                        Enable 2FA
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Bell className="w-5 h-5 mr-2" />
                      Notification Preferences
                    </CardTitle>
                    <CardDescription>
                      Choose how you want to receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">Email Notifications</Label>
                        <p className="text-sm text-slate-500">Receive notifications via email</p>
                      </div>
                      <Switch
                        checked={settings.notifications.email}
                        onCheckedChange={(checked) => handleSettingChange('notifications.email', checked)}
                      />
                    </div>

                    <Separator className="bg-slate-700/50" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">Push Notifications</Label>
                        <p className="text-sm text-slate-500">Receive push notifications in your browser</p>
                      </div>
                      <Switch
                        checked={settings.notifications.push}
                        onCheckedChange={(checked) => handleSettingChange('notifications.push', checked)}
                      />
                    </div>

                    <Separator className="bg-slate-700/50" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">SMS Notifications</Label>
                        <p className="text-sm text-slate-500">Receive notifications via text message</p>
                      </div>
                      <Switch
                        checked={settings.notifications.sms}
                        onCheckedChange={(checked) => handleSettingChange('notifications.sms', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-cyan-400">
                      <Shield className="w-5 h-5 mr-2" />
                      Privacy Settings
                    </CardTitle>
                    <CardDescription>
                      Control your privacy and data sharing preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-300">Profile Visibility</Label>
                      <div className="relative mt-2">
                        <select
                          value={settings.privacy.profileVisibility}
                          onChange={(e) => handleSettingChange('privacy.profileVisibility', e.target.value)}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl text-slate-200 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 appearance-none cursor-pointer hover:border-slate-500/70 hover:bg-slate-800/70"
                        >
                          <option value="public" className="bg-slate-800 text-slate-200">Public</option>
                          <option value="organization" className="bg-slate-800 text-slate-200">Organization Only</option>
                          <option value="private" className="bg-slate-800 text-slate-200">Private</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <Separator className="bg-slate-700/50" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">Data Sharing</Label>
                        <p className="text-sm text-slate-500">Allow data to be shared for research purposes</p>
                      </div>
                      <Switch
                        checked={settings.privacy.dataSharing}
                        onCheckedChange={(checked) => handleSettingChange('privacy.dataSharing', checked)}
                      />
                    </div>

                    <Separator className="bg-slate-700/50" />

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-slate-300">Analytics</Label>
                        <p className="text-sm text-slate-500">Help improve our services with usage analytics</p>
                      </div>
                      <Switch
                        checked={settings.privacy.analytics}
                        onCheckedChange={(checked) => handleSettingChange('privacy.analytics', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8"
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
