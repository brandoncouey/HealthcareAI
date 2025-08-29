# Authentication System Setup Guide

> Complete authentication system implementation using NextAuth.js with credentials provider, password hashing, and protected routes for the Exponential AI Tech Platform.

[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24-000000?style=for-the-badge&logo=next.js)](https://next-auth.js.org/)
[![bcryptjs](https://img.shields.io/badge/bcryptjs-3.0-00D4AA?style=for-the-badge)](https://github.com/dcodeIO/bcrypt.js/)
[![Prisma](https://img.shields.io/badge/Prisma-6.14-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Implementation Details](#implementation-details)
- [Usage Guide](#usage-guide)
- [Security Features](#security-features)
- [Troubleshooting](#troubleshooting)
- [Production Considerations](#production-considerations)

---

## Overview

The Exponential AI Tech Platform implements a robust authentication system using NextAuth.js with a credentials provider. This system provides secure user registration, login, session management, and route protection for healthcare applications.

### Key Benefits

- **Secure Authentication** - Password hashing with bcrypt
- **Session Management** - JWT-based session handling
- **Route Protection** - Middleware-based access control
- **Type Safety** - Full TypeScript support
- **Scalable Design** - Easy to extend with additional providers

---

## Features

### Core Authentication Features

| Feature | Status | Description |
|---------|--------|-------------|
| **User Registration** | ✅ Implemented | Secure user account creation |
| **User Login** | ✅ Implemented | Email/password authentication |
| **Password Hashing** | ✅ Implemented | bcrypt with salt rounds |
| **Session Management** | ✅ Implemented | JWT token-based sessions |
| **Route Protection** | ✅ Implemented | Middleware-based access control |
| **Form Validation** | ✅ Implemented | Client and server-side validation |
| **Error Handling** | ✅ Implemented | Comprehensive error messages |
| **TypeScript Support** | ✅ Implemented | Full type safety |

### User Experience Features

| Feature | Status | Description |
|---------|--------|-------------|
| **Responsive Forms** | ✅ Implemented | Mobile-friendly authentication forms |
| **Loading States** | ✅ Implemented | User feedback during authentication |
| **Error Messages** | ✅ Implemented | Clear error communication |
| **Success Redirects** | ✅ Implemented | Automatic navigation after auth |
| **Logout Functionality** | ✅ Implemented | Secure session termination |

---

## Architecture

### System Components

```
Authentication System Architecture
├── 📁 Frontend Components
│   ├── 📄 Login Form (/app/ui/login-form.tsx)
│   ├── 📄 Register Form (/app/ui/register-form.tsx)
│   └── 📄 User Navigation (/app/ui/user-nav.tsx)
├── 📁 API Routes
│   ├── 📄 NextAuth Handler (/app/api/auth/[...nextauth]/route.ts)
│   └── 📄 Registration API (/app/api/register/route.ts)
├── 📁 Configuration
│   ├── 📄 Auth Config (/app/lib/auth.ts)
│   ├── 📄 Prisma Client (/app/lib/prisma.ts)
│   └── 📄 Type Definitions (/types/next-auth.d.ts)
└── 📁 Database
    └── 📄 User Model (prisma/schema.prisma)
```

### Authentication Flow

```mermaid
graph TD
    A[User Visits Protected Route] --> B{Middleware Check}
    B -->|Not Authenticated| C[Redirect to Login]
    B -->|Authenticated| D[Allow Access]
    C --> E[User Enters Credentials]
    E --> F[NextAuth Validation]
    F -->|Valid| G[Create Session]
    F -->|Invalid| H[Show Error]
    G --> I[Redirect to Page]
    H --> E
```

---

## API Endpoints

### Authentication Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/auth/signin` | POST | User login | `{email, password}` | Session token |
| `/api/auth/signout` | POST | User logout | None | Success message |
| `/api/auth/session` | GET | Get current session | None | Session data |
| `/api/auth/csrf` | GET | Get CSRF token | None | CSRF token |

### User Management Endpoints

| Endpoint | Method | Description | Request Body | Response |
|----------|--------|-------------|--------------|----------|
| `/api/register` | POST | Create new user account | `{name, email, password}` | User data |
| `/api/query` | GET | Data query endpoints | Query parameters | Query results |

### Request/Response Examples

#### User Registration
```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Response (400):**
```json
{
  "error": "User already exists"
}
```

#### User Login
```bash
POST /api/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response:**
```json
{
  "url": "/dashboard",
  "ok": true
}
```

### Error Handling

| Status Code | Error Type | Description |
|-------------|------------|-------------|
| **400** | Bad Request | Missing required fields, invalid data |
| **401** | Unauthorized | Invalid credentials, no session |
| **403** | Forbidden | Insufficient permissions |
| **404** | Not Found | Endpoint or resource not found |
| **500** | Internal Server Error | Server-side error |

---

## Setup Instructions

### Prerequisites

Before setting up the authentication system, ensure you have:

- **[Node.js](https://nodejs.org/)** (version 18 or higher)
- **[PostgreSQL](https://www.postgresql.org/)** database
- **[pnpm](https://pnpm.io/)** or npm package manager

### Step 1: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_SECRET="your-secure-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/exponential_db"

# Additional Configuration
NODE_ENV="development"
```

**Security Note:** Generate a secure random string for `NEXTAUTH_SECRET`:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Step 2: Database Setup

```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Seed the database (if applicable)
pnpm prisma db seed
```

### Step 3: Install Dependencies

```bash
# Install authentication dependencies
pnpm install next-auth@4.24.11 bcryptjs@3.0.2

# Install type definitions
pnpm install -D @types/bcryptjs
```

### Step 4: Start Development Server

```bash
pnpm dev
```

The authentication system will be available at:
- **Login**: `http://localhost:3000/login`
- **Register**: `http://localhost:3000/register`

---

## Implementation Details

### Database Schema

The authentication system uses the following Prisma schema:

```prisma
model User {
  id       String @id @default(uuid())
  email    String @unique
  name     String
  password String
}
```

### Key Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| **Auth Configuration** | NextAuth.js setup and providers | `/app/lib/auth.ts` |
| **Registration API** | User account creation endpoint | `/app/api/register/route.ts` |
| **NextAuth Handler** | Authentication API routes | `/app/api/auth/[...nextauth]/route.ts` |
| **Type Definitions** | TypeScript interfaces | `/types/next-auth.d.ts` |
| **Prisma Client** | Database connection | `/app/lib/prisma.ts` |

### Security Implementation

- **Password Hashing**: bcrypt with 10 salt rounds
- **Session Strategy**: JWT tokens with secure cookies
- **Route Protection**: Next.js middleware for protected routes
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error messages without data leakage

---

## Usage Guide

### For End Users

#### Registration Process

1. **Navigate to Registration**
   - Visit `/register` or click "Sign up" from the homepage
   - Fill in required fields: name, email, password
   - Submit the form

2. **Account Creation**
   - System validates input data
   - Password is securely hashed
   - User account is created in database
   - Success message is displayed

#### Login Process

1. **Access Login Page**
   - Visit `/login` or click "Sign in"
   - Enter email and password
   - Submit credentials

2. **Authentication**
   - System validates credentials
   - Creates secure session
   - Redirects to dashboard

#### Logout Process

1. **Session Termination**
   - Click logout button
   - Session is destroyed
   - Redirected to homepage

### For Developers

#### Using Authentication in Components

```typescript
import { useSession } from 'next-auth/react';

export default function ProtectedComponent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access denied</div>;
  }

  return (
    <div>
      Welcome, {session?.user?.name}!
    </div>
  );
}
```

#### Server-Side Authentication

```typescript
import { auth } from '@/app/lib/auth';

export default async function ServerComponent() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div>
      Server-side: Hello, {session.user.name}!
    </div>
  );
}
```

---

## Security Features

### Password Security

| Security Feature | Implementation | Description |
|------------------|----------------|-------------|
| **Password Hashing** | bcrypt with salt rounds | Secure password storage |
| **Salt Rounds** | 10 rounds | Optimal security/performance balance |
| **Password Validation** | Server-side validation | Prevents weak passwords |
| **No Plain Text** | Never stored | Passwords always hashed |

### Session Security

| Security Feature | Implementation | Description |
|------------------|----------------|-------------|
| **JWT Tokens** | NextAuth.js JWT strategy | Secure session management |
| **Token Expiration** | Configurable expiration | Automatic session cleanup |
| **Secure Cookies** | HTTP-only, secure flags | XSS protection |
| **CSRF Protection** | Built-in NextAuth protection | Cross-site request forgery prevention |

### Route Protection

| Security Feature | Implementation | Description |
|------------------|----------------|-------------|
| **Middleware Protection** | Next.js middleware | Automatic route protection |
| **Redirect Logic** | Unauthenticated users redirected | Seamless user experience |
| **Role-Based Access** | Extensible for future roles | Granular permission control |

### Data Validation

| Validation Type | Implementation | Description |
|-----------------|----------------|-------------|
| **Client-Side** | Form validation | Immediate user feedback |
| **Server-Side** | API validation | Security and data integrity |
| **Database** | Prisma validation | Data consistency |
| **Type Safety** | TypeScript | Compile-time error prevention |

---

## Troubleshooting

### Common Issues and Solutions

#### Authentication Errors

| Error | Cause | Solution |
|-------|-------|----------|
| **"Invalid credentials"** | Wrong email/password | Verify credentials |
| **"User not found"** | User doesn't exist | Check database |
| **"Password mismatch"** | Incorrect password | Reset password |
| **"Database connection"** | Database unavailable | Check DATABASE_URL |

#### Configuration Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| **NEXTAUTH_SECRET not set** | Missing environment variable | Add to .env.local |
| **Wrong NEXTAUTH_URL** | Incorrect URL configuration | Update environment variable |
| **Database connection failed** | Invalid DATABASE_URL | Verify database credentials |
| **Prisma client not generated** | Missing client generation | Run `pnpm prisma generate` |

#### Development Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| **TypeScript errors** | Missing type definitions | Install @types/bcryptjs |
| **Import errors** | Incorrect import paths | Check file structure |
| **Session not persisting** | Cookie configuration | Check browser settings |
| **Middleware not working** | Incorrect file location | Ensure middleware.ts in root |

### Debug Mode

Enable debug logging for troubleshooting:

```env
# Add to .env.local
NEXTAUTH_DEBUG=true
```

### Testing Authentication

```bash
# Test user creation
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# Test login (via browser)
# Visit http://localhost:3000/login
```

---

## Production Considerations

### Security Enhancements

| Enhancement | Priority | Description |
|-------------|----------|-------------|
| **HTTPS Enforcement** | High | Force HTTPS in production |
| **Rate Limiting** | High | Prevent brute force attacks |
| **Email Verification** | Medium | Verify user email addresses |
| **Password Reset** | Medium | Allow password recovery |
| **Two-Factor Auth** | Low | Additional security layer |

### Performance Optimizations

| Optimization | Implementation | Benefit |
|--------------|----------------|---------|
| **Database Indexing** | Index email field | Faster user lookups |
| **Connection Pooling** | Prisma connection pool | Better database performance |
| **Caching** | Redis session store | Reduced database load |
| **CDN** | Static asset delivery | Faster page loads |

### Monitoring and Logging

| Monitoring | Implementation | Purpose |
|------------|----------------|---------|
| **Authentication Logs** | Log auth attempts | Security monitoring |
| **Error Tracking** | Sentry integration | Bug detection |
| **Performance Monitoring** | Vercel Analytics | Performance insights |
| **Uptime Monitoring** | Health check endpoints | Service availability |

### Environment Variables for Production

```env
# Production Environment Variables
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
DATABASE_URL="postgresql://..."
NODE_ENV="production"

# Optional: Email provider for notifications
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
```

---

## Next Steps

### Planned Enhancements

| Feature | Priority | Timeline | Description |
|---------|----------|----------|-------------|
| **OAuth Providers** | Medium | Phase 2 | Google, GitHub, Microsoft login |
| **Email Verification** | High | Phase 1 | Verify user email addresses |
| **Password Reset** | High | Phase 1 | Self-service password recovery |
| **User Roles** | Medium | Phase 3 | Role-based access control |
| **Audit Logging** | Low | Phase 4 | Track user actions |

### Integration Opportunities

| Integration | Purpose | Benefit |
|-------------|---------|---------|
| **Email Service** | Notifications | User engagement |
| **SMS Service** | 2FA/Notifications | Enhanced security |
| **Analytics** | User behavior | Product insights |
| **Monitoring** | System health | Reliability |

---

**Built with NextAuth.js and modern security practices for healthcare applications.**

*Exponential AI Tech Platform - Secure Authentication for Healthcare*
