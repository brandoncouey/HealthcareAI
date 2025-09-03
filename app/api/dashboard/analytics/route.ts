import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')
    const timeRange = searchParams.get('timeRange') || '30d'

    // For now, return comprehensive referral-focused mock data
    const mockData = {
      referralStats: {
        total: 60,
        byStatus: [
          { status: 'NEW', count: 25 },
          { status: 'AM', count: 18 },
          { status: 'OP', count: 12 },
          { status: 'Complete', count: 5 }
        ],
        byMonth: [
          { month: 'Jan 2024', count: 8 },
          { month: 'Feb 2024', count: 12 },
          { month: 'Mar 2024', count: 15 },
          { month: 'Apr 2024', count: 18 },
          { month: 'May 2024', count: 22 },
          { month: 'Jun 2024', count: 16 }
        ],
        byService: [
          { service: 'Home Health Nursing', count: 25 },
          { service: 'Physical Therapy', count: 18 },
          { service: 'Occupational Therapy', count: 12 },
          { service: 'Speech Therapy', count: 8 },
          { service: 'Medical Social Work', count: 6 }
        ],
        byPayer: [
          { payer: 'Medicare', count: 30 },
          { payer: 'Medicaid', count: 15 },
          { payer: 'Blue Cross Blue Shield', count: 8 },
          { payer: 'Aetna', count: 5 },
          { payer: 'UnitedHealth', count: 2 }
        ],
        completionRate: 78,
        avgProcessingTime: 7,
        volumeTrend: [
          { period: 'Week 1', count: 12 },
          { period: 'Week 2', count: 15 },
          { period: 'Week 3', count: 18 },
          { period: 'Week 4', count: 15 }
        ],
        dailyVolume: [
          { date: 'Mon', count: 8 },
          { date: 'Tue', count: 12 },
          { date: 'Wed', count: 15 },
          { date: 'Thu', count: 10 },
          { date: 'Fri', count: 9 },
          { date: 'Sat', count: 4 },
          { date: 'Sun', count: 2 }
        ],
        weeklyVolume: [
          { week: 'Week 1', count: 45 },
          { week: 'Week 2', count: 52 },
          { week: 'Week 3', count: 48 },
          { week: 'Week 4', count: 55 }
        ],
        referralSources: [
          { source: 'Hospital Discharge', count: 35 },
          { source: 'Physician Office', count: 18 },
          { source: 'Emergency Room', count: 12 },
          { source: 'Skilled Nursing', count: 8 },
          { source: 'Direct Patient', count: 5 }
        ],
        turnaroundTime: [
          { range: '0-24h', count: 15 },
          { range: '1-3 days', count: 25 },
          { range: '3-7 days', count: 12 },
          { range: '7+ days', count: 8 }
        ]
      },
      patientStats: {
        total: 91,
        byAge: [
          { age: '18-30', count: 15 },
          { age: '31-45', count: 22 },
          { age: '46-60', count: 28 },
          { age: '61-75', count: 18 },
          { age: '76+', count: 8 }
        ],
        byStatus: [
          { status: 'Active', count: 67 },
          { status: 'Inactive', count: 24 }
        ],
        byDiagnosis: [
          { diagnosis: 'Type 2 Diabetes', count: 25 },
          { diagnosis: 'Hypertension', count: 32 },
          { diagnosis: 'Obesity', count: 18 },
          { diagnosis: 'COPD', count: 12 },
          { diagnosis: 'Heart Disease', count: 22 }
        ],
        monthlyGrowth: [
          { month: 'Jan 2024', count: 8 },
          { month: 'Feb 2024', count: 12 },
          { month: 'Mar 2024', count: 15 },
          { month: 'Apr 2024', count: 18 },
          { month: 'May 2024', count: 22 },
          { month: 'Jun 2024', count: 16 }
        ]
      },
      organizationStats: {
        totalOrganizations: 5,
        activeReferrals: 43,
        totalServices: 5,
        totalPayers: 5
      }
    }

    return NextResponse.json(mockData)

  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 })
  }
}
