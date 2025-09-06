import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Simple test - just get organizations without auth checks
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      count: organizations.length,
      organizations,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Debug organizations error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
