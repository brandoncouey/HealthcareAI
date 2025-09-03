import { NextRequest, NextResponse } from 'next/server'
import { getAllPatients } from '@/app/lib/dashboard-service'

export async function GET(request: NextRequest) {
  try {
    const patients = await getAllPatients()
    return NextResponse.json(patients)
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      { error: 'Failed to fetch patients' },
      { status: 500 }
    )
  }
}
