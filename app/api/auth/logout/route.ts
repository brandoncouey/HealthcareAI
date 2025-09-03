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

// ===== Cookie helpers =====
function clearSessionCookie(res: NextResponse) {
    res.cookies.set({
        name: "sb.session",
        value: "",
        expires: new Date(0),
        path: "/",
    });
}

// ===== Session deletion =====
async function deleteSession(res: NextResponse) {
    const cookieStore = await cookies();
    const raw = cookieStore.get("sb.session")?.value;
    if (raw) {
        const tokenHash = await hashToken(raw);
        await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
    }
    clearSessionCookie(res);
}

export async function POST(request: NextRequest) {
    try {
        const res = NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
        await deleteSession(res);
        return res;
    } catch (error) {
        console.error('Logout error:', error);
        // Even if there's an error, clear the cookie
        const res = NextResponse.json({ success: false, error: "Logout failed" }, { status: 500 });
        clearSessionCookie(res);
        return res;
    }
}
