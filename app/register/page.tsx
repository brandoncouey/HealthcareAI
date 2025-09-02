import RegisterForm from '@/app/components/forms/register-form';
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";

// Force static generation for better performance
export const dynamic = 'force-static'
export const revalidate = false

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
            <Header showSignIn={false} showBookDemo={false} />
            {/* Register Section */}
            <section className="pt-40 pb-20 bg-gradient-to-br from-black via-black to-slate-900 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="w-full max-w-xl">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
                                    <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x mx-4 leading-relaxed py-2">
                                        Create Account
                                    </h1>
                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
                                </div>
                                <p className="text-lg text-slate-400">
                                    Join us and start your journey with Triage
                                </p>
                            </div>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
