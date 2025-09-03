import { CheckCircle, Users, TrendingUp, Zap } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section className="py-20 bg-slate-900/50 relative overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Section title with decorative lines */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
            <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white mx-6 animate-gradient-x">
              The Solution
            </h2>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
          </div>
          
          <h3 className="text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white mb-4 animate-gradient-x">
            Introducing Exponential
          </h3>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Win the race for High-Value Referrals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="solution-card group bg-slate-900/80 rounded-xl p-8 shadow-lg border border-slate-700/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-[#00B5E2]/10 cursor-pointer relative overflow-hidden cursor-magnetic hover:border-[#00B5E2]/50 hover:ring-2 hover:ring-[#00B5E2]/20">
            <div className="neighbor-outline"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00B5E2]/0 via-[#00B5E2]/5 to-[#00B5E2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/0 via-transparent to-[#00B5E2]/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:rotate-12 group-hover:scale-125"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#00B5E2]/20 to-[#00B5E2]/20 rounded-lg flex items-center justify-center mb-6 border border-[#00B5E2]/30 group-hover:bg-[#00B5E2]/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#00B5E2]/20">
              <Zap className="h-6 w-6 text-[#00B5E2] group-hover:text-[#00B5E2]/80 transition-all duration-300 group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white mb-4 group-hover:text-[#00B5E2]/80 transition-colors duration-300 animate-gradient-x group-hover:scale-105">Automate</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle className="h-5 w-5 text-[#00B5E2] mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-slate-300 transition-colors duration-300">All your referrals from all platforms in one place</span>
              </li>
              <li className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle className="h-5 w-5 text-[#00B5E2] mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-slate-300 transition-colors duration-300">Background, insurance, and medicare checks</span>
              </li>
            </ul>
          </div>

          <div className="solution-card group bg-slate-900/80 rounded-xl p-8 shadow-lg border border-slate-700/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-[#00B5E2]/10 cursor-pointer relative overflow-hidden cursor-magnetic hover:border-[#00B5E2]/50 hover:ring-2 hover:ring-[#00B5E2]/20">
            <div className="neighbor-outline"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00B5E2]/0 via-[#00B5E2]/5 to-[#00B5E2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/0 via-transparent to-[#00B5E2]/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:-rotate-12 group-hover:scale-125"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#00B5E2]/20 to-[#00B5E2]/20 rounded-lg flex items-center justify-center mb-6 border border-[#00B5E2]/30 group-hover:bg-[#00B5E2]/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#00B5E2]/20">
              <TrendingUp className="h-6 w-6 text-[#00B5E2] group-hover:text-[#00B5E2]/80 transition-all duration-300 group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white mb-4 group-hover:text-[#00B5E2]/80 transition-colors duration-300 animate-gradient-x group-hover:scale-105">Generate</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle className="h-5 w-5 text-[#00B5E2] mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-slate-300 transition-colors duration-300">Referrals automatically prioritized and sorted for you based on profitability and your admission's criteria</span>
              </li>
              <li className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle className="h-5 w-5 text-[#00B5E2] mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-slate-300 transition-colors duration-300">Easy to read clinical & behavioral summaries designed for your facility's services</span>
              </li>
            </ul>
          </div>

          <div className="solution-card group bg-slate-900/80 rounded-xl p-8 shadow-lg border border-slate-700/30 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-[#00B5E2]/10 cursor-pointer relative overflow-hidden cursor-magnetic hover:border-[#00B5E2]/50 hover:ring-2 hover:ring-[#00B5E2]/20">
            <div className="neighbor-outline"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00B5E2]/0 via-[#00B5E2]/5 to-[#00B5E2]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform group-hover:scale-110"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/0 via-transparent to-[#00B5E2]/0 opacity-0 group-hover:opacity-100 transition-all duration-1000 transform group-hover:rotate-6 group-hover:scale-125"></div>
            <div className="w-12 h-12 bg-gradient-to-br from-[#00B5E2]/20 to-[#00B5E2]/20 rounded-lg flex items-center justify-center mb-6 border border-[#00B5E2]/30 group-hover:bg-[#00B5E2]/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#00B5E2]/20">
              <Users className="h-6 w-6 text-[#00B5E2] group-hover:text-[#00B5E2]/80 transition-all duration-300 group-hover:scale-110" />
            </div>
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white mb-4 group-hover:text-[#00B5E2]/80 transition-colors duration-300 animate-gradient-x group-hover:scale-105">Communicate</h3>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle className="h-5 w-5 text-[#00B5E2] mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-slate-300 transition-colors duration-300">Read/Write Hospital messages for each of your referral platforms</span>
              </li>
              <li className="flex items-start group-hover:translate-x-1 transition-transform duration-300">
                <CheckCircle className="h-5 w-5 text-[#00B5E2] mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:text-slate-300 transition-colors duration-300">End-to-end PCC Integration</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


