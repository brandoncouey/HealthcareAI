// lib/session.ts
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

// ===== Config =====
export const SESSION_COOKIE = "sb.session";
export const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 7; // 7 days
export const ROTATE_AFTER_SEC = 60 * 60 * 24;        // 1 day

function cookieBaseOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
    };
}

// ===== Token utilities =====
export function makeToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString("base64url"); // raw session token (not stored)
}

export function hashToken(token: string) {
    return crypto.createHash("sha256").update(token).digest("base64url");
}

// ===== Cookie helpers (must operate on a NextResponse) =====
export function applySessionCookie(
    res: NextResponse,
    rawToken: string,
    expiresAt: Date
) {
    res.cookies.set({
        name: SESSION_COOKIE,
        value: rawToken,
        expires: expiresAt,
        ...cookieBaseOptions(),
    });
}

export function clearSessionCookie(res: NextResponse) {
    // Overwrite cookie with an immediate expiration to delete
    res.cookies.set({
        name: SESSION_COOKIE,
        value: "",
        expires: new Date(0),
        path: "/",
    });
}

// ===== Core operations =====

/**
 * Create a DB-backed session and return the raw token + expiry.
 * Caller should set the cookie on a NextResponse via `applySessionCookie`.
 */
export async function createSession(
    userId: string,
    req?: NextRequest
): Promise<{ rawToken: string; expiresAt: Date }> {
    const rawToken = makeToken();
    const tokenHash = hashToken(rawToken);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + SESSION_MAX_AGE_SEC * 1000);

    await prisma.session.create({
        data: {
            userId,
            tokenHash,
            expiresAt,
            ip: req?.headers.get("x-forwarded-for") ?? null,
            userAgent: req?.headers.get("user-agent") ?? null,
        },
    });

    return { rawToken, expiresAt };
}

/**
 * Fetch session (and user) for the current request.
 * Uses request-scoped cookies() (read-only, safe).
 */
export async function getSession() {
    const cookieStore = await cookies();
    const c = cookieStore.get(SESSION_COOKIE);
    if (!c?.value) return null;

    const tokenHash = hashToken(c.value);

    const session = await prisma.session.findUnique({
        where: { tokenHash },
        include: { user: true },
    });

    if (!session) return null;

    if (session.expiresAt <= new Date()) {
        // Expired: best-effort cleanup in DB; caller should clear cookie on the response they return
        await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
        return null;
    }

    return session; // { id, userId, expiresAt, user: {...} }
}

/**
 * Rotate the session if it's older than ROTATE_AFTER_SEC.
 * Requires the raw cookie value from cookies() and a NextResponse to write the new cookie.
 */
export async function rotateSessionIfNeeded(
    res: NextResponse
) {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    if (!raw) return;

    const tokenHash = hashToken(raw);
    const session = await prisma.session.findUnique({ where: { tokenHash } });
    if (!session) return;

    const ageSec = (Date.now() - session.createdAt.getTime()) / 1000;
    if (ageSec < ROTATE_AFTER_SEC) return;

    // Delete old session, create new one, set new cookie
    await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
    const { rawToken, expiresAt } = await createSession(session.userId);
    applySessionCookie(res, rawToken, expiresAt);
}

/**
 * Delete the current session (DB) and clear cookie on the provided response.
 * Safe to call even if no cookie/session is present.
 */
export async function deleteSession(res: NextResponse) {
    const cookieStore = await cookies();
    const raw = cookieStore.get(SESSION_COOKIE)?.value;
    if (raw) {
        const tokenHash = hashToken(raw);
        await prisma.session.delete({ where: { tokenHash } }).catch(() => {});
    }
    clearSessionCookie(res);
}
