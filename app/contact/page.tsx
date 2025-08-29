import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";
import Footer from "@/app/components/layout/footer";
import Header from "@/app/components/layout/header";

export default function ContactPage() {
    return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 flex flex-col">
      <Header showSignIn={true} showBookDemo={false} />

                 {/* Contact Section */}
         <section className="pt-40 pb-20 bg-gradient-to-br from-black via-slate-950 to-slate-900 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/3 via-transparent to-[#00B5E2]/2"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5E2]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00B5E2]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00B5E2]/3 rounded-full blur-2xl animate-pulse delay-500"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
                <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x mx-4">
                  Contact us
                </h1>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
              </div>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                Get in touch with us to schedule a demo or to learn more about Triage.
              </p>
            </div>

                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Left Content - Contact Info */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x">Get in Touch</h2>
                  <p className="text-slate-400 text-lg">
                    Ready to transform your PAC facility's efficiency? We're here to help you get started with Exponential Triage.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#00B5E2]/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#00B5E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">Email</p>
                        <p className="text-slate-400">support@exponentialplatform.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-[#00B5E2]/20 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-[#00B5E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-300 font-medium">Address</p>
                        <p className="text-slate-400">34 Thames Blvd, Bergenfield, NJ 07621, USA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                             {/* Right Content - Contact Form */}
               <div className="lg:col-span-2 bg-slate-900/80 rounded-2xl p-8 shadow-2xl border border-slate-700/30 backdrop-blur-sm relative overflow-hidden">
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

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                      <input
                          type="text"
                          placeholder="Your full name"
                          className="form-input w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                      <input
                          type="email"
                          placeholder="Your email"
                          className="form-input w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                      <input
                          type="text"
                          placeholder="Your company"
                          className="form-input w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                      <input
                          type="text"
                          placeholder="Your position"
                          className="form-input w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <textarea
                        placeholder="Include as much details as you can"
                        rows={4}
                        className="form-input w-full px-4 py-3 bg-slate-800/60 border border-slate-600/50 rounded-lg focus:ring-2 focus:ring-[#00B5E2]/30 focus:border-[#00B5E2] text-slate-100 placeholder:text-slate-500 transition-all duration-200 resize-none"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <Button size="lg" className="bg-[#00B5E2] hover:bg-[#00B5E2]/80 text-white border-[#00B5E2]/30 px-8">
                      Send
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>

  );
}
