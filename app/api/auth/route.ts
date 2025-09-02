import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma';
import { createSession, applySessionCookie } from "@/app/lib/session";


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
            }
        }) as {password: string, id: string} | null;

        if (!user) {
            return Response.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        const res = NextResponse.json({ success: isValidPassword }, { status: 200 })
        const { rawToken, expiresAt } = await createSession(user!.id, request);
        applySessionCookie(res, rawToken, expiresAt);
        return ;
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