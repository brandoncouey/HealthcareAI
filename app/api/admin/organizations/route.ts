import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UserRole } from '@prisma/client'
import { requireAdmin } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin permissions
    const session = await requireAdmin();
    console.log('Session found:', { userId: session.user.id, userRole: session.user.role })

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
    
    if (error instanceof Error && (error.message === 'Authentication required' || error.message === 'Insufficient permissions')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.message === 'Authentication required' ? 401 : 403 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin permissions
    const session = await requireAdmin();

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
    
    if (error instanceof Error && (error.message === 'Authentication required' || error.message === 'Insufficient permissions')) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.message === 'Authentication required' ? 401 : 403 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
