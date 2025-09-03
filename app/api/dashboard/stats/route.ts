import {NextRequest, NextResponse} from 'next/server'
import {getDashboardStats} from '@/app/lib/dashboard-service'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const organizationId = searchParams.get('organizationId')
        
        const stats = await getDashboardStats(organizationId || undefined)
        return NextResponse.json(stats)
    } catch (error) {
        console.error('Error fetching dashboard stats:', error)
        return NextResponse.json(
            {error: 'Failed to fetch dashboard statistics'},
            {status: 500}
        )
    }
}
