import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma';

// ===== Crypto functions using Web Crypto API (works in both Node.js and browsers) =====
function makeToken(bytes = 32): string {
    const array = new Uint8Array(bytes);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array)).slice(0, bytes);
}

async function hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return btoa(hashHex).slice(0, 32);
}

// ===== Session creation =====
async function createSession(userId: string, req?: NextRequest) {
    const rawToken = makeToken();
    const tokenHash = await hashToken(rawToken);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 60 * 60 * 24 * 7 * 1000); // 7 days

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

// ===== Cookie helpers =====
function applySessionCookie(res: NextResponse, rawToken: string, expiresAt: Date) {
    res.cookies.set({
        name: "sb.session",
        value: rawToken,
        expires: expiresAt,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}


export async function POST(request: NextRequest) {
    try {

        const {email, phone, password, isEmail} = await request.json();
        const loginIdentifier = email ?? phone;

        if (!loginIdentifier) {
            return NextResponse.json(
                { error: "Login identifier (email or phone) is required" },
                { status: 400 }
            );
        }

        if (!password || typeof password !== 'string') {
            return NextResponse.json({error : 'Password Request is not valid'}, {status:400});
        }

        const isEmailLogin = isEmail !== undefined ? isEmail : loginIdentifier.includes('@');
        const user = await prisma.user.findFirst({
            where: {
                ...(isEmailLogin ? { email: loginIdentifier } : { phone: loginIdentifier })
            },
            select : {
                id: true,
                password: true,
            }
        });

        if (!user) {
            return Response.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Create session and set cookie
        try {
            console.log('Creating session for user:', user.id);
            const { rawToken, expiresAt } = await createSession(user.id, request);
            console.log('Session created successfully');
            
            const res = NextResponse.json({ 
                success: true, 
                message: "Login successful",
                user: { id: user.id }
            }, { status: 200 });
            
            applySessionCookie(res, rawToken, expiresAt);
            return res;
        } catch (sessionError) {
            console.error('Session creation error:', sessionError);
            return NextResponse.json(
                { success: false, error: "Failed to create session" },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error(error);
        return Response.json({error: 'Internal server error'}, {status: 500});
    }
}


export async function GET(request: NextRequest) {
    try {
        console.log('GET endpoint called');
        const {searchParams} = new URL(request.url);
        const email = searchParams.get('email') ?? undefined;
        const phone = searchParams.get('phone') ?? undefined;
        console.log('GET params - email:', email, 'phone:', phone);
        if (!email && !phone) {
            return NextResponse.json(
                {error: 'Email or phone is required'},
                {status: 400}
            );
        }
        const user = await prisma.user.findFirst({
            where: {OR: [{email}, {phone}]}
        });
        return NextResponse.json({exists: !!user}, {status: 200});

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        );
    }
}