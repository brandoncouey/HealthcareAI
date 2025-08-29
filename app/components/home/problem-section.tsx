import { Users, TrendingUp, Shield } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section className="py-20 bg-black/30 relative overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Section title with decorative lines */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500"></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white mx-6 animate-gradient-x">
              The Problem
            </h2>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500"></div>
          </div>
          
          {/* Main headline with highlighted words */}
          <h3 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-8 leading-tight">
            On Average PAC Facilities{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white animate-gradient-x">Lose</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white animate-gradient-x">$250k</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-red-500 to-white animate-gradient-x">Annually</span>{' '}
            for Every Empty Bed
          </h3>
          
          {/* Supporting content with icon and text */}
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 max-w-5xl mx-auto">
            {/* Downward arrow icon */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center border border-red-500/40 shadow-lg shadow-red-500/20">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
            
            {/* Supporting paragraph */}
            <div className="flex-1 text-left">
              <p className="text-lg text-slate-400 leading-relaxed">
                Manual processes and multiple intake platforms slow down your referral acceptance rate, leaving your team overwhelmed and hindering growth.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="problem-card group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:bg-slate-900/20 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20">
                <Users className="h-10 w-10 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-red-100 transition-colors duration-300">Manual Processes</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">Slow and error-prone manual intake procedures that delay response times and reduce efficiency.</p>
            </div>
          </div>
          
          <div className="problem-card group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:bg-slate-900/20 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20">
                <TrendingUp className="h-10 w-10 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-red-100 transition-colors duration-300">Multiple Platforms</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">Scattered data across different intake systems creating confusion and missed opportunities.</p>
            </div>
          </div>
          
          <div className="problem-card group relative text-center p-8 rounded-2xl transition-all duration-500 hover:scale-105 hover:bg-slate-900/20 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30 group-hover:border-red-400/50 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-500/20">
                <Shield className="h-10 w-10 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3 group-hover:text-red-100 transition-colors duration-300">Overwhelmed Teams</h3>
              <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">Staff struggling with inefficient workflows and manual data entry tasks.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


