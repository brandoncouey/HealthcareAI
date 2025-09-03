import { NextRequest, NextResponse } from 'next/server'
import { getReferralAnalytics } from '@/app/lib/dashboard-service'

export async function GET(request: NextRequest) {
  try {
    const analytics = await getReferralAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching referral analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch referral analytics' },
      { status: 500 }
    )
  }
}
