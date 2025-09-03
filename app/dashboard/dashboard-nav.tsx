"use client"

import Link from "next/link"
import {usePathname} from "next/navigation"
import {cn} from "@/lib/utils"
import {Button} from "@/app/components/ui/button"
import {
    Activity,
    Users,
    FileText,
    Database,
    BarChart3,
    Shield,
    Settings,
    Monitor,
    Heart
} from "lucide-react"

const navigation = [
    {
        name: "System Dashboard",
        href: "/dashboard",
        icon: Monitor,
        description: "System monitoring and performance"
    },
    {
        name: "Healthcare Dashboard",
        href: "/dashboard/healthcare",
        icon: Heart,
        description: "Patient and referral management"
    }
]

const sidebarNav = [
    {
        name: "Dashboard",
        href: "#",
        icon: Activity
    },
    {
        name: "Patients",
        href: "#",
        icon: Users
    },
    {
        name: "Referrals",
        href: "#",
        icon: FileText
    },
    {
        name: "Services",
        href: "#",
        icon: Database
    },
    {
        name: "Analytics",
        href: "#",
        icon: BarChart3
    },
    {
        name: "Compliance",
        href: "#",
        icon: Shield
    },
    {
        name: "Settings",
        href: "#",
        icon: Settings
    }
]

export function DashboardNav() {
    const pathname = usePathname()

    return (
        <div className="flex flex-col space-y-4">
            {/* Dashboard Type Selector */}
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Dashboard Type
                </h2>
                <div className="space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                    isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4"/>
                                <div className="flex-1 text-left">
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-muted-foreground">{item.description}</div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                    Navigation
                </h2>
                <div className="space-y-1">
                    {sidebarNav.map((item) => (
                        <Button
                            key={item.name}
                            variant="ghost"
                            className="w-full justify-start"
                        >
                            <item.icon className="mr-2 h-4 w-4"/>
                            {item.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
