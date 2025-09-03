"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/app/hooks/useAuth"
import {
  Search,
  Bell,
  Moon,
  Sun,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  User,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href?: string
  active?: boolean
}

// Component for nav items
function NavItem({ icon: Icon, label, href, active }: NavItemProps) {
  const buttonContent = (
    <>
      <Icon className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
      {label}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </>
  )

  if (href) {
    return (
      <a href={href} className="block">
        <Button
          variant="ghost"
          className="relative h-12 px-6 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-slate-600/30 hover:border-slate-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 group font-medium"
        >
          {buttonContent}
        </Button>
      </a>
    )
  }

  return (
    <Button
      variant="ghost"
      className="relative h-12 px-6 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-slate-600/30 hover:border-slate-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 group font-medium"
    >
      {buttonContent}
    </Button>
  )
}

interface DashboardNavbarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  theme: "dark" | "light"
  onThemeToggle: () => void
  organizationName?: string
}

export default function DashboardNavbar({ 
  searchTerm, 
  onSearchChange, 
  theme, 
  onThemeToggle,
  organizationName
}: DashboardNavbarProps) {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 sticky top-0 z-40 shadow-lg backdrop-blur-sm relative overflow-hidden">
      {/* Lightning stream effect - horizontal beam */}
      <div className="absolute top-0 left-0 w-full h-px pointer-events-none">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent animate-lightning-stream-slow-nav"></div>
      </div>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
                     {/* Logo */}
           <div className="flex items-center">
             <a href="/dashboard" className="relative group">
               <Image 
                 src="/logo.svg" 
                 alt="Exponential AI Tech Logo" 
                 width={40} 
                 height={40} 
                 className="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
               />
               <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300"></div>
             </a>
           </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            <NavItem icon={FileText} label="Referrals" href="/dashboard/referrals" />
            <NavItem icon={BarChart3} label="Analytics" />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative flex items-center space-x-3 bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-2.5 backdrop-blur-sm group-hover:border-slate-500/70 transition-all duration-300">
                <Search className="h-4 w-4 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search patients, diagnoses..."
                  className="bg-transparent border-none focus:outline-none text-sm w-56 placeholder:text-slate-500 focus:placeholder:text-slate-400 text-slate-200 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>

            {/* Notifications */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-11 w-11 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600/50 hover:border-slate-500/70 text-slate-400 hover:text-cyan-400 transition-all duration-300 group"
                  >
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={onThemeToggle}
                    className="h-11 w-11 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-slate-600/50 hover:border-slate-500/70 text-slate-400 hover:text-amber-400 transition-all duration-300 group"
                  >
                    {theme === "dark" ? (
                      <Moon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    ) : (
                      <Sun className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* User Avatar with Organization */}
            <div className="flex items-center space-x-3">
              {organizationName && (
                <div className="hidden lg:block">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-800/60 to-slate-700/60 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                    <div className="relative bg-slate-800/80 border border-slate-600/50 rounded-xl px-4 py-3 backdrop-blur-sm group-hover:border-slate-500/70 group-hover:bg-slate-800/90 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs text-slate-400 font-medium tracking-wide uppercase">Organization</div>
                          <div className="text-sm text-slate-200 font-semibold max-w-36 truncate leading-tight" title={organizationName}>
                            {organizationName}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="relative group cursor-pointer">
                    <Avatar className="h-11 w-11 border-2 border-slate-600/50 group-hover:border-cyan-500/50 transition-all duration-300">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-slate-700 to-slate-800 text-cyan-400 font-semibold text-lg">
                      {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'HC'}
                    </AvatarFallback>
                    </Avatar>
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-slate-900/95 border-slate-700/50 mt-2 backdrop-blur-sm shadow-xl w-48">
                  <DropdownMenuItem className="text-slate-200 hover:bg-slate-800/80 hover:text-cyan-300 cursor-pointer transition-all duration-200 px-4 py-3 rounded-lg mx-2 my-1">
                    <User className="w-4 h-4 mr-3 text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
                    {user?.name || 'Account'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-200 hover:bg-slate-800/80 hover:text-cyan-300 cursor-pointer transition-all duration-200 px-4 py-3 rounded-lg mx-2 my-1">
                    <Settings className="w-4 h-4 mr-3 text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={logout}
                    className="text-slate-200 hover:bg-slate-800/80 hover:text-cyan-300 cursor-pointer transition-all duration-200 px-4 py-3 rounded-lg mx-2 my-1 border-t border-slate-700/30"
                  >
                    <LogOut className="w-4 h-4 mr-3 text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
