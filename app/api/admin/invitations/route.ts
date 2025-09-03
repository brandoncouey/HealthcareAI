import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UserRole, OrganizationRole } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check if user is admin or superadmin
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

    const user = sessionData.user
    const isSuperAdmin = user.role === UserRole.SUPERADMIN

    // Get invitations based on user role
    let invitations
    if (isSuperAdmin) {
      // Superadmin can see all invitations
      invitations = await prisma.organizationInvitation.findMany({
        include: {
          organization: {
            select: {
              id: true,
              name: true
            }
          },
          invitedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      // Regular admin can only see invitations for their organizations
      const userOrgs = await prisma.userOrganization.findMany({
        where: {
          userId: user.id,
          role: {
            in: [OrganizationRole.OWNER, OrganizationRole.ADMIN]
          },
          isActive: true
        },
        select: {
          organizationId: true
        }
      })

      const orgIds = userOrgs.map(org => org.organizationId)
      
      invitations = await prisma.organizationInvitation.findMany({
        where: {
          organizationId: {
            in: orgIds
          }
        },
        include: {
          organization: {
            select: {
              id: true,
              name: true
            }
          },
          invitedByUser: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }

    return NextResponse.json({
      success: true,
      invitations
    })

  } catch (error) {
    console.error('Error fetching invitations:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is admin or superadmin
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

    const user = sessionData.user
    const { organizationId, email, role } = await request.json()

    // Validate required fields
    if (!organizationId || !email || !role) {
      return NextResponse.json(
        { success: false, error: 'Organization ID, email, and role are required' },
        { status: 400 }
      )
    }

    // Check if user has permission to invite to this organization
    if (user.role !== UserRole.SUPERADMIN) {
      const userOrg = await prisma.userOrganization.findFirst({
        where: {
          userId: user.id,
          organizationId,
          role: {
            in: [OrganizationRole.OWNER, OrganizationRole.ADMIN]
          },
          isActive: true
        }
      })

      if (!userOrg) {
        return NextResponse.json(
          { success: false, error: 'Insufficient permissions for this organization' },
          { status: 403 }
        )
      }
    }

    // Check if user already exists in the organization
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        userOrganizations: {
          where: {
            organizationId,
            isActive: true
          }
        }
      }
    })

    if (existingUser && existingUser.userOrganizations.length > 0) {
      return NextResponse.json(
        { success: false, error: 'User is already a member of this organization' },
        { status: 400 }
      )
    }

    // Check if invitation already exists
    const existingInvitation = await prisma.organizationInvitation.findFirst({
      where: {
        organizationId,
        email,
        status: 'PENDING'
      }
    })

    if (existingInvitation) {
      return NextResponse.json(
        { success: false, error: 'Invitation already exists for this user' },
        { status: 400 }
      )
    }

    // Create invitation
    const invitation = await prisma.organizationInvitation.create({
      data: {
        organizationId,
        email,
        role,
        invitedBy: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      },
      include: {
        organization: {
          select: {
            name: true
          }
        }
      }
    })

    // TODO: Send email invitation
    // In production, integrate with your email service (SendGrid, AWS SES, etc.)

    return NextResponse.json({
      success: true,
      invitation,
      message: 'Invitation sent successfully'
    })

  } catch (error) {
    console.error('Error creating invitation:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
