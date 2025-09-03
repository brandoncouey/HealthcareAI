import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const settings = await request.json()

    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Settings data is required' },
        { status: 400 }
      )
    }

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
    if (!sessionData.authenticated || !sessionData.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const userId = sessionData.user.id
    const updateData: any = {}

    if (settings.name !== undefined) updateData.name = settings.name
    // Email cannot be changed - removed from updateData
    if (settings.phone !== undefined) updateData.phone = settings.phone

    if (settings.timezone || settings.language || settings.notifications || settings.privacy || settings.theme) {
      updateData.settings = {
        timezone: settings.timezone,
        language: settings.language,
        notifications: settings.notifications,
        privacy: settings.privacy,
        theme: settings.theme,
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully'
    })

  } catch (error) {
    console.error('Settings update error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
