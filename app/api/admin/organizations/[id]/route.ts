import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UserRole } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is superadmin or admin
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

    if (sessionData.user.role !== UserRole.SUPERADMIN && sessionData.user.role !== UserRole.ADMIN) {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions' },
        { status: 403 }
      )
    }

    const organizationId = params.id

    // Get organization with detailed information
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId },
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
          },
          orderBy: {
            joinedAt: 'desc'
          }
        },
        patients: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            age: true,
            city: true,
            state: true,
            createdAt: true
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 20 // Limit to recent patients for performance
        }
      }
    })

    if (!organization) {
      return NextResponse.json(
        { success: false, error: 'Organization not found' },
        { status: 404 }
      )
    }

    // Calculate referral count
    const referralCount = await prisma.referral.count({
      where: {
        patient: {
          organizationId: organizationId
        }
      }
    })

    // Get recent activity (simplified for now)
    const recentActivity = [
      {
        id: '1',
        type: 'user_joined',
        description: `New user joined the organization`,
        timestamp: new Date().toISOString(),
        user: 'System'
      },
      {
        id: '2',
        type: 'patient_added',
        description: `New patient was added`,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        user: 'System'
      }
    ]

    // Calculate stats
    const stats = {
      totalUsers: organization._count.userOrganizations,
      totalPatients: organization._count.patients,
      totalReferrals: referralCount,
      activeUsers: organization.userOrganizations.filter(uo => uo.isActive).length,
      recentActivity
    }

    // Add referral count to organization
    const organizationWithReferralCount = {
      ...organization,
      referralCount
    }

    return NextResponse.json({
      success: true,
      organization: organizationWithReferralCount,
      stats
    })

  } catch (error) {
    console.error('Error fetching organization:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
