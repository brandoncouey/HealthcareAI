import Header from "@/app/components/layout/header"
import Footer from "@/app/components/layout/footer"
import RegisterForm from "@/app/ui/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
      <Header showSignIn={false} showBookDemo={false} />

      {/* Register Section */}
      <section className="pt-40 pb-20 bg-gradient-to-br from-black via-black to-slate-900 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/3 via-transparent to-[#00B5E2]/2"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5E2]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00B5E2]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00B5E2]/3 rounded-full blur-2xl animate-pulse delay-500"></div>

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
                  Join Exponential today and get started
                </p>
              </div>

              <RegisterForm />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
