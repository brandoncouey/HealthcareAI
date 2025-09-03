'use client';

import {
    AtSymbolIcon,
    PhoneIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    ChevronDownIcon,
    KeyIcon,
} from '@heroicons/react/24/outline';
import {ArrowRightIcon} from '@heroicons/react/20/solid';
import {useRouter, useSearchParams} from 'next/navigation';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/app/hooks/useAuth';

// Country codes data for phone input
const countryCodes = [
    {code: '+1', country: 'US', flag: '🇺🇸'},
    {code: '+44', country: 'UK', flag: '🇬🇧'},
    {code: '+61', country: 'AU', flag: '🇦🇺'},
    {code: '+86', country: 'CN', flag: '🇨🇳'},
    {code: '+91', country: 'IN', flag: '🇮🇳'},
    {code: '+81', country: 'JP', flag: '🇯🇵'},
    {code: '+49', country: 'DE', flag: '🇩🇪'},
    {code: '+33', country: 'FR', flag: '🇫🇷'},
    {code: '+39', country: 'IT', flag: '🇮🇹'},
    {code: '+34', country: 'ES', flag: '🇪🇸'},
    {code: '+31', country: 'NL', flag: '🇳🇱'},
    {code: '+46', country: 'SE', flag: '🇸🇪'},
    {code: '+47', country: 'NO', flag: '🇳🇴'},
    {code: '+45', country: 'DK', flag: '🇩🇰'},
    {code: '+358', country: 'FI', flag: '🇫🇮'},
    {code: '+41', country: 'CH', flag: '🇨🇭'},
    {code: '+43', country: 'AT', flag: '🇦🇹'},
    {code: '+32', country: 'BE', flag: '🇧🇪'},
    {code: '+48', country: 'PL', flag: '🇵🇱'},
    {code: '+420', country: 'CZ', flag: '🇨🇿'},
];

export default function LoginForm() {
    const { login, authenticated, loading } = useAuth();
    const [formData, setFormData] = useState({email: '', phone: '', password: '',});

    // Navigation
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Form state
    const [inputType, setInputType] = useState<'email' | 'phone'>('email');
    const [loginIdentifier, setLoginIdentifier] = useState('');
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    const [showUsernameField, setShowUsernameField] = useState(true);
    const [showPasswordField, setShowPasswordField] = useState(false);


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    const handleInputChange = (field: string, value: string) => {
        if (field === 'phone') {
            const numericValue = value.replace(/\D/g, '');
            if (numericValue.length <= 10) {
                setFormData(prev => ({ ...prev, [field]: numericValue }));
            }
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    /**
     * Handle email form submission
     * Validates email and redirects to password step
     */
    const handleEmailSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
         setIsSubmitting(true);
         setError(null);

        try {
            const response = await fetch(`/api/auth?email=${encodeURIComponent(formData.email)}`);
            const data = await response.json();
            if (data.exists) {
                setShowPasswordField(true);
                setShowUsernameField(false);
                setLoginIdentifier(formData.email);
            } else {
                setError('Email not found. Please check your email or sign up.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    /**
     * Handle password submission for login
     */
    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Determine if loginIdentifier is email or phone
            const isEmail = loginIdentifier.includes('@');

            // Use the auth hook to login
            const result = await login({
                ...formData,
                isEmail
            });

            if (result.success) {
                // Redirect to dashboard or handle successful login
                const redirectTo = searchParams.get('redirect') || '/dashboard';
                router.push(redirectTo);
            } else {
                setError(result.error || 'Invalid credentials');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Redirect if already authenticated
    useEffect(() => {
        if (authenticated && !loading) {
            const redirectTo = searchParams.get('redirect') || '/dashboard';
            router.push(redirectTo);
        }
    }, [authenticated, loading, router, searchParams]);

    /**
     * Handle passkey authentication
     * TODO: Implement WebAuthn passkey authentication
     */
    const handlePasskeyLogin = () => {
        // Handle passkey login logic here
    };

    return (
        <div className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
                <Image src="/x-symbol.png" alt="Exponential" width={60} height={60} className="mx-auto mb-4"/>
            </div>
            
            {/* Step Indicator Text */}
            {showPasswordField ? (
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-[#00B5E2]/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#00B5E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-lg font-medium">Enter the password associated with your account</p>
                    </div>
                    <button 
                        type="button"
                        onClick={() => {
                            setShowPasswordField(false);
                            setShowUsernameField(true);
                            setLoginIdentifier('');
                        }}
                        className="text-[#00B5E2] hover:text-[#00B5E2]/80 transition-colors text-sm font-medium inline-flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>{loginIdentifier}</span>
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-8 h-8 bg-[#00B5E2]/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#00B5E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <p className="text-slate-300 text-lg font-medium">Sign in to your account</p>
                    </div>
                </div>
            )}
            
            {/* Email/Phone Toggle */}
            {showUsernameField && (
                <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-1 border border-slate-700/30 shadow-lg">
                    <div
                        className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-[#00B5E2] to-[#00B5E2]/90 rounded-xl transition-all duration-300 ease-out shadow-lg 
                    ${inputType === 'phone' ? 'translate-x-full' : 'translate-x-0'}`}
                    />
                    <div className="relative flex">
                        <button type="button" onClick={() => setInputType('email')}
                                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10 
                        ${inputType === 'email' ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}>
                            <div className="flex items-center justify-center space-x-2">
                                <AtSymbolIcon className="w-4 h-4"/>
                                <span>Email</span>
                            </div>
                        </button>
                        <button type="button" onClick={() => setInputType('phone')} className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10 
                    ${inputType === 'phone' ? 'text-white' : 'text-slate-400 hover:text-slate-300'}`}>
                            <div className="flex items-center justify-center space-x-2">
                                <PhoneIcon className="w-4 h-4"/>
                                <span>Phone</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}


            {/* First Form - Email/Phone Validation */}
            {showUsernameField && (
                <>
                                         {/* Email Form */}
                     {inputType === 'email' && (
                         <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3" htmlFor="email">
                                    Email
                                </label>
                                <div className="relative">
                                    <input className="form-input w-full px-4 py-4 pl-12 bg-slate-800/60 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                                        id="email" type="email" name="email" placeholder="Enter your email address" required disabled={isSubmitting} onChange={(e) => handleInputChange('email', e.target.value)}
                                        value={formData.email}/>
                                    <AtSymbolIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 peer-focus:text-[#00B5E2]"/>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-transparent border border-[#00B5E2] text-[#00B5E2] font-semibold px-8 py-4 shadow-lg hover:bg-[#00B5E2]/10 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        <span className="font-medium">Checking email...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">Continue</span>
                                        <ArrowRightIcon className="ml-3 h-5 w-5"/>
                                    </div>
                                )}
                            </button>
                        </form>
                    )}

                                                              {/* Phone Form */}
                      {inputType === 'phone' && (
                          <form onSubmit={handlePasswordSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-3" htmlFor="phone">
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <div className="flex">
                                        {/* Country Code Dropdown */}
                                        <div className="relative">
                                            <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                                                className="flex items-center space-x-2 px-4 py-4 bg-slate-800/60 border border-slate-600/50 border-r-0 rounded-l-xl text-slate-300 hover:bg-slate-700/60 transition-colors duration-200">
                                                <span className="text-lg">{selectedCountryCode?.flag || '🇺🇸'}</span>
                                                <span className="text-sm font-medium">{selectedCountryCode?.code || '+1'}</span>
                                                <ChevronDownIcon className="w-4 h-4"/>
                                            </button>

                                            {/* Dropdown Menu */}
                                            {showCountryDropdown && (
                                                <div
                                                    className="absolute top-full left-0 mt-1 w-48 bg-slate-800/95 backdrop-blur-sm border border-slate-600/50 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto custom-scrollbar">
                                                    {countryCodes.map((country) => (
                                                        <button key={country.code} type="button" onClick={() => {
                                                                setSelectedCountryCode(country);
                                                                setShowCountryDropdown(false);
                                                            }}
                                                            className="flex items-center space-x-3 w-full px-4 py-3 text-left text-slate-300 hover:bg-slate-700/60 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg">
                                                            <span className="text-lg">{country.flag}</span>
                                                            <span className="text-sm font-medium">{country.code}</span>
                                                            <span className="text-xs text-slate-500">{country.country}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Phone Number Input */}
                                        <input 
                                            className="form-input flex-1 px-4 py-4 bg-slate-800/60 border border-slate-600/50 rounded-r-xl focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                                            id="phone" type="tel" name="phone" placeholder="Enter your phone number" maxLength={10} pattern="[0-9]{10}" inputMode="numeric"
                                            onKeyPress={(e) => {
                                                if (!/[0-9]/.test(e.key)) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onChange={(e) => {
                                                // Remove any non-numeric characters
                                                const value = e.target.value.replace(/\D/g, '');
                                                e.target.value = value;
                                                handleInputChange('phone', value);
                                            }}
                                            value={formData.phone}
                                            required 
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="w-full bg-transparent border border-[#00B5E2] text-[#00B5E2] font-semibold px-8 py-4 shadow-lg hover:bg-[#00B5E2]/10 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                        <span className="font-medium">Checking phone...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center">
                                        <span className="font-medium">Continue</span>
                                        <ArrowRightIcon className="ml-3 h-5 w-5"/>
                                    </div>
                                )}
                            </button>
                        </form>
                    )}
                </>
            )}

            {/* Second Form - Password */}
            {showPasswordField && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="form-input w-full px-4 py-4 pl-12 pr-12 bg-slate-800/60 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                                id="password" type="password" name="password" placeholder="Enter your password" required disabled={isSubmitting}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                value={formData.password}
                            />
                            <KeyIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 peer-focus:text-[#00B5E2]"/>

                            {/* Show/Hide Password Button */}
                            <button type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors duration-200"
                                aria-label="Toggle password visibility"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-transparent border border-[#00B5E2] text-[#00B5E2] font-semibold px-8 py-4 shadow-lg hover:bg-[#00B5E2]/10 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        disabled={isSubmitting}>
                        {isSubmitting ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                <span className="font-medium">Signing in...</span>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center">
                                <span className="font-medium">Sign In</span>
                                <ArrowRightIcon className="ml-3 h-5 w-5"/>
                            </div>
                        )}
                    </button>
                </form>
            )}

            {/* Passkey Option */}
            <div className="text-center">
                <button type="button" onClick={handlePasskeyLogin}
                        className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-[#00B5E2] transition-colors duration-200">
                    <KeyIcon className="w-4 h-4"/>
                    <span>Use PassKey instead</span>
                </button>
            </div>

            {/* Error/Success Messages */}
            <div className="flex h-8 items-end space-x-1">
                {error && (
                    <div className="flex items-center space-x-1 text-sm text-red-400">
                        <ExclamationCircleIcon className="h-4 w-4"/>
                        <p>{error}</p>
                    </div>
                )}
                {success && (
                    <div className="flex items-center space-x-1 text-sm text-green-400">
                        <CheckCircleIcon className="h-4 w-4"/>
                        <p>{success}</p>
                    </div>
                )}
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-slate-400">
                Don't have an account?{' '}
                <Link href="/register" className="text-[#00B5E2] hover:text-[#00B5E2]/80 transition-colors font-medium">
                    Sign up
                </Link>
            </div>

            {/* Terms and Privacy Links */}
            <div className="text-center text-xs text-slate-500">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-[#00B5E2] hover:text-[#00B5E2]/80 transition-colors">
                    Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#00B5E2] hover:text-[#00B5E2]/80 transition-colors">
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}
