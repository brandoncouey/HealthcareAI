import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/app/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const {firstName, lastName, email, phone, password, confirmPassword} = data;
        if (!email || !password) {
            return NextResponse.json(
                {error: 'Email and password are required'},
                {status: 400}
            );
        }

        if (password !== confirmPassword) {
            return NextResponse.json(
                {error: 'Passwords do not match'},
                {status: 400}
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                {error: 'Password must be at least 8 characters long'},
                {status: 400}
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if (existingUser) {
            return NextResponse.json(
                {error: 'User with this email already exists'},
                {status: 400}
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';

        const user = await prisma.user.create({
            data: {
                name: fullName,
                email,
                password: hashedPassword,
                phone
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return NextResponse.json(
            {
                message: 'Account created successfully!',
                user,
                redirect: '/login',
                email,
                phone
            },
            {status: 201}
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {error: 'Failed to create account. Please try again.'},
            {status: 500}
        );
    }
}
