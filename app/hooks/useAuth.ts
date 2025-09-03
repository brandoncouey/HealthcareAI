import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'SUPERADMIN' | 'ADMIN' | 'MEMBER';
    organizationId?: string;
    primaryOrganization?: {
        id: string;
        name: string;
        type: string;
    } | null;
    organizations?: Array<{
        id: string;
        name: string;
        type: string;
        isActive: boolean;
        role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'VIEWER';
    }>;
}

interface AuthState {
    user: User | null;
    authenticated: boolean;
    loading: boolean;
}

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>({
        user: null,
        authenticated: false,
        loading: true
    });
    const router = useRouter();

    // Check if user is authenticated
    const checkAuth = useCallback(async () => {
        try {
            // Add timeout for faster failure detection
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
            
            const response = await fetch('/api/auth/session', {
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            const data = await response.json();
            
            if (data.authenticated && data.user) {
                setAuthState({
                    user: data.user,
                    authenticated: true,
                    loading: false
                });
            } else {
                setAuthState({
                    user: null,
                    authenticated: false,
                    loading: false
                });
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                // Auth check timed out, treating as unauthenticated
            } else {
                console.error('Auth check error:', error);
            }
            setAuthState({
                user: null,
                authenticated: false,
                loading: false
            });
        }
    }, []);

    // Login function
    const login = useCallback(async (credentials: { email?: string; phone?: string; password: string; isEmail?: boolean }) => {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (data.success) {
                // Check auth status after successful login
                await checkAuth();
                return { success: true };
            } else {
                return { success: false, error: data.error };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error occurred' };
        }
    }, [checkAuth]);

    // Logout function
    const logout = useCallback(async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                setAuthState({
                    user: null,
                    authenticated: false,
                    loading: false
                });
                router.push('/login');
                return { success: true };
            } else {
                return { success: false, error: 'Logout failed' };
            }
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: 'Network error occurred' };
        }
    }, [router]);

    // Check auth on mount
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        ...authState,
        login,
        logout,
        checkAuth
    };
}
