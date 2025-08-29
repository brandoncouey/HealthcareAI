'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Eye, EyeOff, Mail, ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  return (
    <div className="bg-slate-900/80 rounded-2xl p-8 shadow-2xl border border-slate-700/30 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle border glow effect - on the very edge */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        {/* Top edge glow */}
        <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#00B5E2] to-transparent animate-form-border-glow pointer-events-none" style={{animationDelay: '-2s'}}></div>
        {/* Right edge glow */}
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#00B5E2] to-transparent animate-form-border-glow-vertical pointer-events-none" style={{animationDelay: '-0.5s'}}></div>
        {/* Bottom edge glow */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#00B5E2] to-transparent animate-form-border-glow-reverse pointer-events-none" style={{animationDelay: '1s'}}></div>
        {/* Left edge glow */}
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-t from-transparent via-[#00B5E2] to-transparent animate-form-border-glow-vertical-reverse-slow pointer-events-none" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <Image
          src="/x-symbol.png"
          alt="Exponential"
          width={60}
          height={60}
          className="mx-auto mb-4"
        />
      </div>

      <form className="space-y-6">
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              First Name (Optional)
            </label>
            <input
              type="text"
              placeholder="First name"
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Last Name (Optional)
            </label>
            <input
              type="text"
              placeholder="Last name"
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full pl-12 pr-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Phone Number (Optional)
          </label>
          <div className="relative">
            <div className="flex">
              {/* Country Code Dropdown */}
              <div className="relative">
                <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center space-x-2 px-4 py-3 bg-slate-800/60 border border-slate-600/50 border-r-0 rounded-l-lg text-slate-300 hover:bg-slate-700/60 transition-colors duration-200">
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
                type="tel"
                placeholder="Enter your phone number"
                className="flex-1 px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-r-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Password *
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              required
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Confirm Password *
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#00B5E2] hover:bg-[#00B5E2]/80 text-white border-[#00B5E2]/30"
        >
          Create Account
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="mt-8 text-center">
        <p className="text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#00B5E2] hover:text-[#00B5E2]/80 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}


