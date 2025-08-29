/**
 * Login Form Component
 *
 * Two-step authentication form with email/phone toggle and country code selection.
 * Features modern UI with animated elements and proper form validation.
 */

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
    // Form state
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [inputType, setInputType] = useState<'email' | 'phone'>('email');
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
    const [showCountryDropdown, setShowCountryDropdown] = useState(false);

    // Navigation
    const router = useRouter();
    const searchParams = useSearchParams();

    // Handle success messages from URL params
    useEffect(() => {
        const message = searchParams.get('message');
        if (message) {
            setSuccess(message);
        }
    }, [searchParams]);

    /**
     * Handle form submission
     * Validates email/phone and redirects to password step
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const value = inputType === 'email' ? email : `${selectedCountryCode?.code || '+1'}${phone}`;

        try {
            // TODO: Replace with actual email/phone verification API call
            const exists = true; // This would be the result from your API

            if (exists) {
                // Email/phone exists, proceed to password step
                const param = inputType === 'email' ? 'email' : 'phone';
                router.push(`/login/password?${param}=${encodeURIComponent(value)}`);
            } else {
                setError(`${inputType === 'email' ? 'Email' : 'Phone number'} not found. Please check your ${inputType} or sign up.`);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Handle passkey authentication
     * TODO: Implement WebAuthn passkey authentication
     */
    const handlePasskeyLogin = () => {
        console.log('Passkey login clicked');
    };

    return (
        <div className="space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
                <Image src="/x-symbol.png" alt="Exponential" width={60} height={60} className="mx-auto mb-4"/>
            </div>

            {/* Email/Phone Toggle */}
            <div
                className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl p-1 border border-slate-700/30 shadow-lg">
                <div
                    className={`absolute top-1 bottom-1 w-1/2 bg-gradient-to-r from-[#00B5E2] to-[#00B5E2]/90 rounded-xl transition-all duration-300 ease-out shadow-lg ${
                        inputType === 'phone' ? 'translate-x-full' : 'translate-x-0'
                    }`}
                />
                <div className="relative flex">
                    <button type="button" onClick={() => setInputType('email')}
                        className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10 ${
                            inputType === 'email'
                                ? 'text-white'
                                : 'text-slate-400 hover:text-slate-300'
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <AtSymbolIcon className="w-4 h-4"/>
                            <span>Email</span>
                        </div>
                    </button>
                    <button type="button" onClick={() => setInputType('phone')} className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 relative z-10 ${
                            inputType === 'phone'
                                ? 'text-white'
                                : 'text-slate-400 hover:text-slate-300'
                        }`}
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <PhoneIcon className="w-4 h-4"/>
                            <span>Phone</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3" htmlFor={inputType}>
                        {inputType === 'email' ? 'Email' : 'Phone Number'}
                    </label>
                    <div className="relative">
                        {inputType === 'email' ? (
                            // Email Input
                            <>
                                <input className="form-input w-full px-4 py-4 pl-12 bg-slate-800/60 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                                    id="email" type="email" name="email" placeholder="Enter your email address" required disabled={isLoading}
                                />
                                <AtSymbolIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500 peer-focus:text-[#00B5E2]"/>
                            </>
                        ) : (
                            // Phone Input with Country Code
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
                                <input className="form-input flex-1 px-4 py-4 bg-slate-800/60 border border-slate-600/50 rounded-r-xl focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                                    id="phone" type="tel" name="phone" placeholder="Enter your phone number" required disabled={isLoading}/>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-transparent border border-[#00B5E2] text-[#00B5E2] font-semibold px-8 py-4 shadow-lg hover:bg-[#00B5E2]/10 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#00B5E2]/30 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isLoading}>
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            <span className="font-medium">Checking {inputType}...</span>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center">
                            <span className="font-medium">Continue</span>
                            <ArrowRightIcon className="ml-3 h-5 w-5"/>
                        </div>
                    )}
                </button>
            </form>

            {/* Passkey Option */}
            <div className="text-center">
                <button type="button" onClick={handlePasskeyLogin}
                        className="inline-flex items-center space-x-2 text-sm text-slate-400 hover:text-[#00B5E2] transition-colors duration-200">
                    <KeyIcon className="w-4 h-4"/>
                    <span>Use passkey instead</span>
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
