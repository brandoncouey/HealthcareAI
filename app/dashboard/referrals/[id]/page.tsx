"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  User,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Info,
  CheckCircle,
  X,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Heart,
  Activity,
  Pill,
  Syringe,
  Bandage,
  Droplets,
  Stethoscope,
  File,
  MessageSquare,
  Edit3,
  Home,
} from "lucide-react"

import { Button } from "@/app/components/ui/button"
import { Badge } from "@/app/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs"
import DashboardNavbar from "@/app/components/dashboard-navbar"
import { StatusBadge } from "@/app/components/ui/status-badge"
import { ReferralDetailSkeleton } from "@/app/components/ui/skeleton"

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs with movement */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '4s' }}></div>
      
      {/* Many small floating particles with different movement patterns */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-x"
          style={{
            left: `${(i * 7.3) % 100}%`,
            top: `${(i * 11.7) % 100}%`,
            animationDelay: `${(i * 0.8) % 5}s`,
            animationDuration: `${3 + (i * 0.3) % 4}s`
          }}
        />
      ))}
      
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`y-${i}`}
          className="absolute w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-float-y"
          style={{
            left: `${(i * 9.1) % 100}%`,
            top: `${(i * 13.2) % 100}%`,
            animationDelay: `${(i * 0.9) % 4}s`,
            animationDuration: `${4 + (i * 0.4) % 3}s`
          }}
        />
      ))}
      
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={`diag-${i}`}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float-diagonal"
          style={{
            left: `${(i * 8.7) % 100}%`,
            top: `${(i * 12.4) % 100}%`,
            animationDelay: `${(i * 0.7) % 6}s`,
            animationDuration: `${5 + (i * 0.5) % 4}s`
          }}
        />
      ))}
      
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`circ-${i}`}
          className="absolute w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-float-circular"
          style={{
            left: `${(i * 10.3) % 100}%`,
            top: `${(i * 14.8) % 100}%`,
            animationDelay: `${(i * 0.6) % 3}s`,
            animationDuration: `${3 + (i * 0.2) % 2}s`
          }}
        />
      ))}
      
      {/* Additional colored particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={`yellow-${i}`}
          className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-float-slow"
          style={{
            left: `${(i * 11.2) % 100}%`,
            top: `${(i * 16.1) % 100}%`,
            animationDelay: `${(i * 0.8) % 4}s`,
            animationDuration: `${6 + (i * 0.3) % 3}s`
          }}
        />
      ))}
      
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`orange-${i}`}
          className="absolute w-1.5 h-1.5 bg-orange-400/20 rounded-full animate-float-medium"
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 17.3) % 100}%`,
            animationDelay: `${(i * 0.7) % 5}s`,
            animationDuration: `${4 + (i * 0.4) % 3}s`
          }}
        />
      ))}
      
      {/* Floating lines with movement */}
      <div className="absolute top-1/3 left-10 w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-float-y"></div>
      <div className="absolute bottom-1/3 right-16 w-px h-16 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-float-x" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Dark animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black opacity-50"></div>
    </div>
  )
}

interface ReferralData {
  id: string
  name: string
  sex: string
  height: string
  weight: string
  age: number
  zipCode: string
  hospital: string
  physician: string
  timePassed: string
  status: string[]
  
  // Financial
  primaryInsurance: string
  secondaryInsurance: string
  ntaScore: string
  hmoPlanType: string
  medicareHmoProvider: string
  
  // Services
  catheter: string
  ostomies: string
  drain: string
  wound: string
  woundVac: string
  ivFluids: string
  
  // Medications
  highCostMedications: string[]
  
  // Home Support
  address: string
  livesWith: string
  emergencyContact: string
  emergencyPhone: string
  emergencyRelation: string
  
  // Diagnoses
  primaryDiagnosis: string
  otherDiagnoses: string[]
  
  // Documents
  documents: Array<{
    id: string
    name: string
    type: string
    url: string
    pages: number
  }>
}

export default function ReferralDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [referral, setReferral] = useState<ReferralData | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentDocument, setCurrentDocument] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => {
    // Simulate fetching referral data
    // In production, this would fetch from your API
    setTimeout(() => {
      setReferral({
        id: params.id as string,
        name: "John Doe",
        sex: "M",
        height: "5'6\"",
        weight: "153 lb",
        age: 69,
        zipCode: "60652",
        hospital: "Gottlieb Memorial Hospital",
        physician: "Ahmad M El-Arabi",
        timePassed: "3 months ago",
        status: ["NEW", "AM"],
        
        // Financial
        primaryInsurance: "Managed Medicare - HUMANA CHOICE",
        secondaryInsurance: "N/A",
        ntaScore: "No values",
        hmoPlanType: "N/A",
        medicareHmoProvider: "HUMANA INSURANCE COMPANY",
        
        // Services
        catheter: "Indication",
        ostomies: "Ileostomy",
        drain: "No",
        wound: "Indication",
        woundVac: "No",
        ivFluids: "Yes",
        
        // Medications
        highCostMedications: [],
        
        // Home Support
        address: "123 Anywhere St., Chicago, IL, 60652, United States of America",
        livesWith: "Spouse",
        emergencyContact: "Jane Doe",
        emergencyPhone: "N/A",
        emergencyRelation: "Spouse",
        
        // Diagnoses
        primaryDiagnosis: "Radiation Cystitis",
        otherDiagnoses: [
          "Hypertension",
          "Other Lab Abnormality",
          "Hyperlipidemia",
          "Other Vascular Disease",
          "Urinary Tract Infection",
          "Atrial Fibrillation Or Cardiac Dysrhythmias",
          "Other Urinary Disorder",
          "Cancer",
          "Pain Disorder"
        ],
        
        // Documents
        documents: [
          {
            id: "1",
            name: "Clinicals.Pdf",
            type: "Clinical Report",
            url: "#",
            pages: 29
          }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [params.id])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }



  if (loading) {
    return (
      <div className={`${theme} min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 relative overflow-hidden`}>
        <FloatingParticles />
        <DashboardNavbar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          theme={theme}
          onThemeToggle={toggleTheme}
          organizationName="Phoenix Home Care, L.L.C."
        />
        <div className="w-4/5 mx-auto px-6 py-6">
          {/* Patient Summary Skeleton */}
          <div className="mb-8">
            <div className="bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm rounded-xl p-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-700/50 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-8 w-48 bg-slate-700/50 rounded animate-pulse"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="text-center">
                        <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse mb-2"></div>
                        <div className="h-6 w-12 bg-slate-700/50 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column Skeleton */}
            <div className="space-y-6">
              {/* Financial Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                      <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-6 w-20 bg-slate-700/50 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Services Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-20 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                      <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-6 w-16 bg-slate-700/50 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Center Column Skeleton */}
            <div className="space-y-6">
              {/* Medications Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-28 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-20 bg-slate-800/50 rounded border border-slate-700/50 animate-pulse"></div>
                </CardContent>
              </Card>

              {/* Home Support Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-28 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-800/50 rounded border border-slate-700/50">
                      <div className="h-4 w-28 bg-slate-700/50 rounded animate-pulse"></div>
                      <div className="h-6 w-20 bg-slate-700/50 rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column Skeleton */}
            <div className="space-y-6">
              {/* Diagnoses Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                        <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Patient Documents Skeleton */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-32 bg-slate-700/50 rounded animate-pulse"></div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded-lg animate-pulse"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-10 bg-slate-800/50 rounded border border-slate-700/50 animate-pulse"></div>
                    <div className="h-32 bg-slate-800/50 rounded border border-slate-700/50 animate-pulse"></div>
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="h-8 w-16 bg-slate-700/50 rounded animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!referral) {
    return (
      <div className={`${theme} min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 relative overflow-hidden`}>
        <DashboardNavbar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          theme={theme}
          onThemeToggle={toggleTheme}
          organizationName="Phoenix Home Care, L.L.C."
        />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-slate-400">Patient not found</p>
          </div>
        </div>
      </div>
    )
  }

    return (
    <div className={`${theme} min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 text-slate-100 relative overflow-hidden`}>
      <FloatingParticles />
      <DashboardNavbar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        theme={theme}
        onThemeToggle={toggleTheme}
        organizationName="Phoenix Home Care, L.L.C."
      />
      
      <div className="w-4/5 mx-auto px-6 py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="bg-slate-800/50 border-slate-600/50 text-slate-200 hover:bg-slate-700/50 hover:border-slate-500/50 rounded-xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Referrals
              </Button>
              <Button className="bg-cyan-600 hover:bg-cyan-700 rounded-xl">
                Create Pending Patient in PCC
              </Button>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-400">{referral.timePassed}</div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl mt-2">
                Acceptance Actions
              </Button>
            </div>
          </div>

                                           {/* Patient Summary */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
             <div className="flex items-center justify-between mb-6">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                   <User className="w-6 h-6 text-white" />
                 </div>
                                   <div>
                    <h1 className="text-3xl font-bold text-white">{referral.name}</h1>
                  </div>
               </div>
               <div className="flex gap-3">
                 {referral.status.map((status, index) => (
                   <Badge 
                     key={index} 
                     className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1 hover:bg-emerald-500/30 transition-colors duration-200"
                   >
                     {status}
                   </Badge>
                 ))}
               </div>
             </div>
             
             <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-slate-600/50 rounded-lg flex items-center justify-center">
                     <User className="w-4 h-4 text-slate-300" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Sex</div>
                     <div className="text-sm font-semibold text-white">{referral.sex}</div>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-emerald-600/50 rounded-lg flex items-center justify-center">
                     <Activity className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Height</div>
                     <div className="text-sm font-semibold text-white">{referral.height}</div>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-red-500/50 transition-all duration-300 hover:scale-105">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-red-600/50 rounded-lg flex items-center justify-center">
                     <Heart className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Weight</div>
                     <div className="text-sm font-semibold text-white">{referral.weight}</div>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-600/50 rounded-lg flex items-center justify-center">
                     <Calendar className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Age</div>
                     <div className="text-sm font-semibold text-white">{referral.age}</div>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-emerald-600/50 rounded-lg flex items-center justify-center">
                     <MapPin className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Zip Code</div>
                     <div className="text-sm font-semibold text-emerald-400">{referral.zipCode}</div>
                   </div>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-cyan-500/50 transition-all duration-300">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-cyan-600/50 rounded-lg flex items-center justify-center">
                     <Stethoscope className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Hospital</div>
                     <div className="text-sm font-semibold text-white">{referral.hospital}</div>
                   </div>
                 </div>
               </div>
               
               <div className="bg-slate-800/30 rounded-xl p-3 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-600/50 rounded-lg flex items-center justify-center">
                     <User className="w-4 h-4 text-white" />
                   </div>
                   <div>
                     <div className="text-xs text-slate-400 uppercase tracking-wider">Physician</div>
                     <div className="text-sm font-semibold text-white">{referral.physician}</div>
                   </div>
                 </div>
               </div>
             </div>
              </CardContent>
            </Card>
        </div>

        {/* Main Content - Three Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="space-y-6">
                         {/* Financial Section */}
             <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
               <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-emerald-600/50 rounded-lg flex items-center justify-center">
                       <FileText className="w-4 h-4 text-white" />
                     </div>
                     <CardTitle className="text-slate-200 text-lg">Financial</CardTitle>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                     </div>
                     <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                     </div>
                     <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer">
                       <Info className="w-3.5 h-3.5 text-blue-400" />
                     </div>
                   </div>
                 </div>
               </CardHeader>
              <CardContent className="space-y-3">
                                 <div>
                   <div className="text-sm text-slate-400 mb-1">Primary Insurance - Payor</div>
                   <StatusBadge status={referral.primaryInsurance} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400 mb-1">Secondary Insurance - Payor</div>
                   <StatusBadge status={referral.secondaryInsurance} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400 mb-1">NTA Score</div>
                   <div className="text-slate-200">{referral.ntaScore}</div>
                 </div>
                 <div>
                   <div className="text-sm text-slate-400 mb-1">HMO - Plan Type</div>
                   <StatusBadge status={referral.hmoPlanType} />
                 </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Medicare - HMO Provider</div>
                  <div className="text-slate-200">{referral.medicareHmoProvider}</div>
                </div>
              </CardContent>
            </Card>

                         {/* Services Section */}
             <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
               <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-blue-600/50 rounded-lg flex items-center justify-center">
                       <Syringe className="w-4 h-4 text-white" />
                     </div>
                     <CardTitle className="text-slate-200 text-lg">Services</CardTitle>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                     </div>
                     <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                     </div>
                     <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer">
                       <Info className="w-3.5 h-3.5 text-blue-400" />
                     </div>
                   </div>
                 </div>
               </CardHeader>
              <CardContent className="space-y-3">
                                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Catheter</span>
                   <StatusBadge status={referral.catheter} />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Ostomies</span>
                   <StatusBadge status={referral.ostomies} />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Drain</span>
                   <StatusBadge status={referral.drain} />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Wound</span>
                   <StatusBadge status={referral.wound} />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Wound Vac</span>
                   <StatusBadge status={referral.woundVac} />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">IV Fluids</span>
                   <StatusBadge status={referral.ivFluids} />
                 </div>
              </CardContent>
            </Card>

                         {/* Medications Section */}
             <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
               <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-purple-600/50 rounded-lg flex items-center justify-center">
                       <Pill className="w-4 h-4 text-white" />
                     </div>
                     <CardTitle className="text-slate-200 text-lg">Medications</CardTitle>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                     </div>
                     <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                     </div>
                     <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer">
                       <Info className="w-3.5 h-3.5 text-blue-400" />
                     </div>
                   </div>
                 </div>
               </CardHeader>
              <CardContent>
                <div>
                  <div className="text-sm text-slate-400 mb-1">High Cost Medications</div>
                  <div className="text-slate-200">
                    {referral.highCostMedications.length > 0 
                      ? referral.highCostMedications.join(", ")
                      : "No values"
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Panel */}
          <div className="space-y-6">
                         {/* Home Support Section */}
             <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
               <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-cyan-600/50 rounded-lg flex items-center justify-center">
                       <Home className="w-4 h-4 text-white" />
                     </div>
                     <CardTitle className="text-slate-200 text-lg">Home Support</CardTitle>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                     </div>
                     <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                     </div>
                     <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer">
                       <Info className="w-3.5 h-3.5 text-blue-400" />
                     </div>
                   </div>
                 </div>
               </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Patient Address</div>
                  <div className="text-slate-200 text-sm">{referral.address}</div>
                </div>
                                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Lives With</span>
                   <StatusBadge status={referral.livesWith} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400 mb-1">Emergency Contact Name</div>
                   <div className="text-slate-200">{referral.emergencyContact}</div>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Emergency Contact Phone</span>
                   <StatusBadge status={referral.emergencyPhone} />
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-slate-300">Emergency Contact Relation</span>
                   <StatusBadge status={referral.emergencyRelation} />
                 </div>
              </CardContent>
            </Card>

                         {/* Diagnoses Section */}
             <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300">
               <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-orange-600/50 rounded-lg flex items-center justify-center">
                       <Stethoscope className="w-4 h-4 text-white" />
                     </div>
                     <CardTitle className="text-slate-200 text-lg">Diagnoses</CardTitle>
                   </div>
                   <div className="flex items-center gap-2">
                     <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center hover:bg-emerald-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                     </div>
                     <div className="w-7 h-7 bg-red-500/20 rounded-lg flex items-center justify-center hover:bg-red-500/30 transition-colors duration-200 cursor-pointer">
                       <ThumbsDown className="w-3.5 h-3.5 text-red-400" />
                     </div>
                     <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center hover:bg-blue-500/30 transition-colors duration-200 cursor-pointer">
                       <Info className="w-3.5 h-3.5 text-blue-400" />
                     </div>
                   </div>
                 </div>
               </CardHeader>
              <CardContent className="space-y-3">
                                 <div>
                   <div className="text-sm text-slate-400 mb-1">Primary Diagnosis</div>
                   <StatusBadge status={referral.primaryDiagnosis} />
                 </div>
                 <div>
                   <div className="text-sm text-slate-400 mb-2">Diagnosis (Other)</div>
                   <div className="flex flex-wrap gap-2">
                     {referral.otherDiagnoses.map((diagnosis, index) => (
                       <StatusBadge key={index} status={diagnosis} />
                     ))}
                   </div>
                 </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Document Viewer */}
          <div className="space-y-6">
                         <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full hover:border-slate-600/50 transition-all duration-300">
               <CardHeader className="pb-3">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-indigo-600/50 rounded-lg flex items-center justify-center">
                       <File className="w-4 h-4 text-white" />
                     </div>
                     <CardTitle className="text-slate-200 text-lg">Patient Documents</CardTitle>
                   </div>
                   <div className="flex items-center gap-2">
                     <Button 
                       variant="ghost" 
                       size="sm" 
                       className="h-8 w-8 p-0 hover:bg-slate-700/50 transition-colors duration-200"
                     >
                       <Maximize2 className="w-4 h-4" />
                     </Button>
                   </div>
                 </div>
               </CardHeader>
              <CardContent>
                                 <Tabs defaultValue="documents" className="w-full">
                   <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-600/30">
                                           <TabsTrigger 
                        value="documents" 
                        className="text-slate-300 data-[state=active]:bg-slate-700/50 data-[state=active]:text-white transition-all duration-200 text-sm"
                      >
                        Documents
                      </TabsTrigger>
                      <TabsTrigger 
                        value="messages" 
                        className="text-slate-300 data-[state=active]:bg-slate-700/50 data-[state=active]:text-white transition-all duration-200 text-sm"
                      >
                        Hospital Messages
                      </TabsTrigger>
                      <TabsTrigger 
                        value="notes" 
                        className="text-slate-300 data-[state=active]:bg-slate-700/50 data-[state=active]:text-white transition-all duration-200 text-sm"
                      >
                        Notes
                      </TabsTrigger>
                   </TabsList>
                  
                  <TabsContent value="documents" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-slate-400">Filename</div>
                          <div className="text-slate-200 font-medium">{referral.documents[0]?.name}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Maximize2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                                             {/* Document Viewer */}
                       <div className="bg-white rounded-lg p-6 text-black min-h-[400px] relative">
                         {currentPage === 1 && (
                           <div className="space-y-3 text-sm">
                             <div className="text-center mb-4">
                               <div className="text-2xl font-bold">COVER PAGE</div>
                               <div className="text-sm text-gray-600">LOYOLA MEDICINE</div>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-4">
                               <div>MRN: <span className="font-medium">123456789</span></div>
                               <div>DOB: <span className="font-medium">01/15/1955</span></div>
                               <div>Legal Sex: <span className="font-medium">M</span></div>
                               <div>Acct #: <span className="font-medium">987654321</span></div>
                               <div>Adm: <span className="font-medium">11/4/2024</span></div>
                               <div>Disch: <span className="font-medium">11/8/2024</span></div>
                             </div>
                             
                             <div className="mt-6">
                               <div className="font-semibold mb-2">Summary report includes:</div>
                               <ul className="list-disc list-inside space-y-1 text-gray-700">
                                 <li>Pt Demographic-Facesheet</li>
                                 <li>Active Meds List</li>
                                 <li>Nursing Order</li>
                                 <li>H&P</li>
                                 <li>Progress Notes-last 2 days</li>
                                 <li>Consult Notes</li>
                                 <li>OT, PT, Speech and/or Nutrition Notes</li>
                               </ul>
                             </div>
                             
                             <div className="mt-6">
                               <div className="font-semibold mb-2">When present:</div>
                               <ul className="list-disc list-inside space-y-1 text-gray-700">
                                 <li>Special RN Notes</li>
                                 <li>Transfer Orders</li>
                               </ul>
                             </div>
                             
                             <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                               Report 666
                             </div>
                           </div>
                         )}
                         
                         {currentPage === 2 && (
                           <div className="space-y-3 text-sm">
                             <div className="text-center mb-4">
                               <div className="text-xl font-bold">PATIENT DEMOGRAPHICS</div>
                               <div className="text-sm text-gray-600">Page 2 of 29</div>
                             </div>
                             
                             <div className="space-y-4">
                               <div className="border-b border-gray-200 pb-2">
                                 <div className="font-semibold text-gray-800">Personal Information</div>
                                 <div className="grid grid-cols-2 gap-4 mt-2">
                                   <div>Name: <span className="font-medium">John Doe</span></div>
                                   <div>Date of Birth: <span className="font-medium">01/15/1955</span></div>
                                   <div>Age: <span className="font-medium">69 years</span></div>
                                   <div>Gender: <span className="font-medium">Male</span></div>
                                   <div>Marital Status: <span className="font-medium">Married</span></div>
                                   <div>SSN: <span className="font-medium">***-**-1234</span></div>
                                 </div>
                               </div>
                               
                               <div className="border-b border-gray-200 pb-2">
                                 <div className="font-semibold text-gray-800">Contact Information</div>
                                 <div className="mt-2">
                                   <div>Address: <span className="font-medium">123 Anywhere St., Chicago, IL 60652</span></div>
                                   <div>Phone: <span className="font-medium">(555) 123-4567</span></div>
                                   <div>Emergency Contact: <span className="font-medium">Jane Doe (Spouse)</span></div>
                                   <div>Emergency Phone: <span className="font-medium">(555) 123-4568</span></div>
                                 </div>
                               </div>
                               
                               <div>
                                 <div className="font-semibold text-gray-800">Insurance Information</div>
                                 <div className="mt-2">
                                   <div>Primary: <span className="font-medium">HUMANA CHOICE MEDICARE</span></div>
                                   <div>Secondary: <span className="font-medium">None</span></div>
                                   <div>Group #: <span className="font-medium">HUM123456</span></div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         )}
                         
                         {currentPage === 3 && (
                           <div className="space-y-3 text-sm">
                             <div className="text-center mb-4">
                               <div className="text-xl font-bold">ACTIVE MEDICATIONS</div>
                               <div className="text-sm text-gray-600">Page 3 of 29</div>
                             </div>
                             
                             <div className="space-y-4">
                               <div className="border-b border-gray-200 pb-2">
                                 <div className="font-semibold text-gray-800">Current Medications</div>
                                 <div className="mt-2 space-y-2">
                                   <div className="p-2 bg-gray-50 rounded">
                                     <div className="font-medium">Metformin 500mg</div>
                                     <div className="text-gray-600">Take 1 tablet twice daily with meals</div>
                                     <div className="text-gray-500 text-xs">Started: 01/15/2024</div>
                                   </div>
                                   <div className="p-2 bg-gray-50 rounded">
                                     <div className="font-medium">Lisinopril 10mg</div>
                                     <div className="text-gray-600">Take 1 tablet daily in the morning</div>
                                     <div className="text-gray-500 text-xs">Started: 12/01/2023</div>
                                   </div>
                                   <div className="p-2 bg-gray-50 rounded">
                                     <div className="font-medium">Atorvastatin 20mg</div>
                                     <div className="text-gray-600">Take 1 tablet daily at bedtime</div>
                                     <div className="text-gray-500 text-xs">Started: 11/15/2023</div>
                                   </div>
                                 </div>
                               </div>
                               
                               <div>
                                 <div className="font-semibold text-gray-800">Allergies</div>
                                 <div className="mt-2">
                                   <div className="text-red-600 font-medium">Penicillin - Rash, Hives</div>
                                   <div className="text-red-600 font-medium">Sulfa Drugs - Nausea</div>
                                 </div>
                               </div>
                             </div>
                           </div>
                         )}
                         
                         {currentPage > 3 && (
                           <div className="space-y-3 text-sm">
                             <div className="text-center mb-4">
                               <div className="text-xl font-bold">CLINICAL NOTES</div>
                               <div className="text-sm text-gray-600">Page {currentPage} of 29</div>
                             </div>
                             
                             <div className="space-y-4">
                               <div className="border-b border-gray-200 pb-2">
                                 <div className="font-semibold text-gray-800">Progress Notes</div>
                                 <div className="mt-2 text-gray-700">
                                   <p>Patient continues to show improvement in wound healing. 
                                   Dressing changes performed daily with no signs of infection. 
                                   Patient reports decreased pain levels and improved mobility.</p>
                                 </div>
                               </div>
                               
                               <div className="border-b border-gray-200 pb-2">
                                 <div className="font-semibold text-gray-800">Vital Signs</div>
                                 <div className="mt-2 grid grid-cols-2 gap-4">
                                   <div>BP: <span className="font-medium">128/82 mmHg</span></div>
                                   <div>HR: <span className="font-medium">72 bpm</span></div>
                                   <div>Temp: <span className="font-medium">98.6°F</span></div>
                                   <div>O2 Sat: <span className="font-medium">98%</span></div>
                                 </div>
                               </div>
                               
                               <div>
                                 <div className="font-semibold text-gray-800">Next Steps</div>
                                 <div className="mt-2 text-gray-700">
                                   <p>Continue current treatment plan. Schedule follow-up in 1 week. 
                                   Consider physical therapy evaluation for mobility improvement.</p>
                                 </div>
                               </div>
                             </div>
                           </div>
                         )}
                       </div>
                      
                                             {/* Pagination */}
                                               <div className="flex items-center justify-center gap-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-slate-400 font-medium">
                            Page {currentPage} of {referral.documents[0]?.pages}
                          </span>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => setCurrentPage(Math.min(referral.documents[0]?.pages || 29, currentPage + 1))}
                            disabled={currentPage === (referral.documents[0]?.pages || 29)}
                          >
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="messages" className="mt-4">
                    <div className="text-center text-slate-400 py-8">
                      <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No hospital messages available</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="notes" className="mt-4">
                    <div className="text-center text-slate-400 py-8">
                      <Edit3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No notes available</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
