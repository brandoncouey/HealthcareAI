import { ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import BenefitCycler from './benefit-cycler';

export default function BookDemoSection() {
  const benefits = [
    "Reduce referral processing time by 85%",
    "Increase bed occupancy rates by 40%",
    "Automate insurance and Medicare verification",
    "24/7 AI-powered monitoring and alerts",
    "Seamless integration with existing systems"
  ];

  return (
    <section id="book-demo-section" className="pt-40 pb-20 bg-gradient-to-br from-black via-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/3 via-transparent to-[#00B5E2]/2"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5E2]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00B5E2]/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00B5E2]/3 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Content - Benefits */}
          <div className="space-y-8 relative">
            {/* Vertical line with lightning/streaming effect */}
            <div className="absolute left-0 top-16 h-80 w-px bg-gradient-to-b from-transparent via-[#00B5E2]/10 via-[#00B5E2]/25 to-transparent overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-[#00B5E2] to-transparent animate-lightning-stream-slow"></div>
            </div>
            
            <div className="flex items-center pl-8 mb-6">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white mx-4 animate-gradient-x">
                Book a Demo
              </h2>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
            </div>
            
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 mb-6 leading-tight pl-8">
              Ready to streamline filling beds faster?
            </h3>
            
            {/* Benefits list with cycling highlight */}
            <BenefitCycler benefits={benefits} />
          </div>
          
                     {/* Right Content - Contact Form */}
           <div className="lg:col-span-2 bg-slate-900/80 rounded-2xl p-8 shadow-2xl border border-slate-700/30 backdrop-blur-sm relative overflow-hidden -mt-3">
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
  );
}


