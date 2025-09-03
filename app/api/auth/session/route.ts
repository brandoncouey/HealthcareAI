import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/app/lib/prisma";

// ===== Crypto functions using Web Crypto API (works in both Node.js and browsers) =====
async function hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return btoa(hashHex).slice(0, 32);
}

// ===== Session validation =====
async function getSession() {
    const cookieStore = await cookies();
    const c = cookieStore.get("sb.session");
    if (!c?.value) return null;

    const tokenHash = await hashToken(c.value);

    const session = await prisma.session.findUnique({
        where: { tokenHash },
        include: { user: true },
    });

    if (!session) return null;

    if (session.expiresAt <= new Date()) {
        await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
        return null;
    }

    return session;
}

export async function GET(request: NextRequest) {
    try {
        const session = await getSession();
        
        if (!session) {
            return NextResponse.json({ authenticated: false }, { status: 200 });
        }

        const userOrgs = await prisma.userOrganization.findMany({
            where: {
                userId: session.user.id,
                isActive: true
            },
            include: {
                organization: true
            },
            orderBy: {
                joinedAt: 'asc'
            }
        });

        //TODO make better type safe
        const primaryOrganization = userOrgs.length > 0 ? {
            // @ts-ignore
            id: userOrgs[0].organization.id,
            // @ts-ignore
            name: userOrgs[0].organization.name,
            // @ts-ignore
            type: userOrgs[0].organization.type
        } : null;
        
        const organizations = userOrgs.map(uo => ({
            id: uo.organization.id,
            name: uo.organization.name,
            type: uo.organization.type,
            isActive: uo.isActive,
            role: uo.role
        }));

        return NextResponse.json({
            authenticated: true,
            user: {
                id: session.user.id,
                name: session.user.name,
                email: session.user.email,
                role: session.user.role,
                primaryOrganization,
                organizations
            }
        }, { status: 200 });
    } catch (error) {
        console.error('Session validation error:', error);
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
}
