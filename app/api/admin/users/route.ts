import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient, UserRole } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { requireAdmin } from '@/app/lib/auth'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check authentication and admin permissions
    const session = await requireAdmin();

    // Get all users with their organization memberships
    const users = await prisma.user.findMany({
      include: {
        _count: {
          select: {
            userOrganizations: true
          }
        },
        userOrganizations: {
          include: {
            organization: {
              select: {
                id: true,
                name: true,
                type: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Calculate stats
    const stats = {
      totalUsers: users.length,
      superAdmins: users.filter(u => u.role === UserRole.SUPERADMIN).length,
      admins: users.filter(u => u.role === UserRole.ADMIN).length,
      members: users.filter(u => u.role === UserRole.MEMBER).length,
      activeUsers: users.filter(u => u.userOrganizations.some(uo => uo.isActive)).length,
      inactiveUsers: users.filter(u => !u.userOrganizations.some(uo => uo.isActive)).length,
      recentSignups: users.filter(u => {
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
        return new Date(u.createdAt) >= thirtyDaysAgo
      }).length
    }

    return NextResponse.json({
      success: true,
      users,
      stats
    })

  } catch (error) {
    console.error('Error fetching users:', error)
    
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

    const { name, email, phone, password, role } = await request.json()

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    // Validate role
    if (!Object.values(UserRole).includes(role)) {
      return NextResponse.json(
        { success: false, error: 'Invalid role' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: role as UserRole
      }
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      },
      message: 'User created successfully'
    })

  } catch (error) {
    console.error('Error creating user:', error)
    
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
