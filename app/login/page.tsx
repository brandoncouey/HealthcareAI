import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
            <Header showSignIn={false} showBookDemo={false} />

            {/* Login Section */}
            <section className="pt-40 pb-20 bg-gradient-to-br from-black via-black to-slate-900 relative overflow-hidden">
                {/* Background glow effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/3 via-transparent to-[#00B5E2]/2"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5E2]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00B5E2]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00B5E2]/3 rounded-full blur-2xl animate-pulse delay-500"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="w-full max-w-lg">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x mx-4 leading-relaxed py-2">
                                        Sign in to Triage
                                    </h1>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
                                </div>
                                <p className="text-lg text-slate-400">
                                    Welcome back! Please sign in to continue
                                </p>
                            </div>

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

                                <Suspense fallback={
                                    <div className="flex items-center justify-center py-8">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00B5E2]"></div>
                                    </div>
                                }>
                                    <LoginForm />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
