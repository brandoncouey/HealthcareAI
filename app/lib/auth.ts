import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

// ===== Session validation utility =====
async function hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return btoa(hashHex).slice(0, 32);
}

export async function getSession() {
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

export async function requireAuth() {
    const session = await getSession();
    
    if (!session) {
        throw new Error('Authentication required');
    }
    
    return session;
}

export async function requireAdmin() {
    const session = await requireAuth();
    
    if (session.user.role !== 'SUPERADMIN' && session.user.role !== 'ADMIN') {
        throw new Error('Insufficient permissions');
    }
    
    return session;
}