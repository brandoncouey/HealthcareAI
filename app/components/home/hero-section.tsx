import { Play } from 'lucide-react';
import { Badge } from '@/app/components/ui/badge';
import ScrollToDemoButton from '@/app/components/home/scroll-to-demo-button';

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-[#00B5E2]/10 text-[#00B5E2] border-[#00B5E2]/30">
                AI-Powered Healthcare Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-100 leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x">Triage</span>{' '}
                Makes PACs{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x">More Profitable</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed">
                Fill more beds, reduce costs, and empower your team with cutting-edge AI tools designed for post-acute care operators such as SNFs or HHAs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <ScrollToDemoButton variant="hero" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x">85%</div>
                <div className="text-sm text-slate-500">Faster Referral Processing</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x">24/7</div>
                <div className="text-sm text-slate-500">AI Monitoring</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/30 backdrop-blur-sm">
              <div 
                className="aspect-video bg-gradient-to-br from-slate-800 to-black rounded-lg flex items-center justify-center border border-slate-700/30 relative overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                id="dashboard-preview-btn"
                style={{
                  backgroundImage: 'url(/dashboard-preview.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#00B5E2] rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl hover:bg-[#00B5E2]/80 transition-colors duration-300 ring-4 ring-[#00B5E2]/20">
                      <Play className="h-8 w-8 text-white drop-shadow-lg" />
                    </div>
                    <p className="text-white font-semibold text-lg drop-shadow-lg">Watch Promo (1:05)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
