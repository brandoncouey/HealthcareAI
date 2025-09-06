import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check if user is superadmin
    const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    })

    if (!sessionResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const sessionData = await sessionResponse.json()
    
    if (!sessionData.authenticated || !sessionData.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    if (sessionData.user.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    // Get all organizations with user counts
    const organizations = await prisma.organization.findMany({
      include: {
        _count: {
          select: {
            userOrganizations: true,
            patients: true,
            invitations: {
              where: {
                status: 'PENDING'
              }
            }
          }
        },
        patients: {
          include: {
            referrals: true
          }
        },
        userOrganizations: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Transform organizations to include referral counts
    const transformedOrganizations = organizations.map(org => ({
      ...org,
      referralCount: org.patients.reduce((sum, patient) => sum + patient.referrals.length, 0)
    }))

    return NextResponse.json({
      success: true,
      organizations: transformedOrganizations
    })

  } catch (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is superadmin
    const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/session`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    })

    if (!sessionResponse.ok) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const sessionData = await sessionResponse.json()
    
    if (!sessionData.authenticated || !sessionData.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    if (sessionData.user.role !== UserRole.SUPERADMIN) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const { name, type, address, city, state, zipCode, phone, website } = await request.json()

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { success: false, error: 'Name and type are required' },
        { status: 400 }
      )
    }

    // Check if organization name already exists
    const existingOrg = await prisma.organization.findUnique({
      where: { name }
    })

    if (existingOrg) {
      return NextResponse.json(
        { success: false, error: 'Organization name already exists' },
        { status: 400 }
      )
    }

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name,
        type,
        address,
        city,
        state,
        zipCode,
        phone,
        website
      }
    })

    return NextResponse.json({
      success: true,
      organization,
      message: 'Organization created successfully'
    })

  } catch (error) {
    console.error('Error creating organization:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
