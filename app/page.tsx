/**
 * Homepage Component
 * 
 * Main landing page for the Exponential AI platform.
 * Features hero section, problem/solution sections, and demo booking form.
 * Authentication redirects are handled client-side.
 */

// Layout components
import Header from '@/app/components/layout/header';
import Footer from '@/app/components/layout/footer';

// Home page components
import CursorEffects from '@/app/components/cursor-effects';
import VideoModal from '@/app/components/video-modal';
import HeroSection from '@/app/components/home/hero-section';
import ProblemSection from '@/app/components/home/problem-section';
import SolutionSection from '@/app/components/home/solution-section';
import BookDemoSection from '@/app/components/home/book-demo-section';

// Force static generation for better performance
export const dynamic = 'force-static'
export const revalidate = false

// Floating particles component for home page
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs with movement */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-float-slow"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-xl animate-float-medium" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-28 h-28 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl animate-float-fast" style={{ animationDelay: '4s' }}></div>
      
      {/* Many small floating particles with different movement patterns */}
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-float-x"
          style={{
            left: `${(i * 7.3) % 100}%`,
            top: `${(i * 11.7) % 100}%`,
            animationDelay: `${(i * 0.8) % 5}s`,
            animationDuration: `${3 + (i * 0.3) % 4}s`
          }}
        />
      ))}
      
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={`y-${i}`}
          className="absolute w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-float-y"
          style={{
            left: `${(i * 9.1) % 100}%`,
            top: `${(i * 13.2) % 100}%`,
            animationDelay: `${(i * 0.9) % 4}s`,
            animationDuration: `${4 + (i * 0.4) % 3}s`
          }}
        />
      ))}
      
      {Array.from({ length: 35 }).map((_, i) => (
        <div
          key={`diag-${i}`}
          className="absolute w-1 h-1 bg-blue-400/20 rounded-full animate-float-diagonal"
          style={{
            left: `${(i * 8.7) % 100}%`,
            top: `${(i * 12.4) % 100}%`,
            animationDelay: `${(i * 0.7) % 6}s`,
            animationDuration: `${5 + (i * 0.5) % 4}s`
          }}
        />
      ))}
      
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`circ-${i}`}
          className="absolute w-1.5 h-1.5 bg-purple-400/25 rounded-full animate-float-circular"
          style={{
            left: `${(i * 10.3) % 100}%`,
            top: `${(i * 14.8) % 100}%`,
            animationDelay: `${(i * 0.6) % 3}s`,
            animationDuration: `${3 + (i * 0.2) % 2}s`
          }}
        />
      ))}
      
      {/* Additional colored particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <div
          key={`yellow-${i}`}
          className="absolute w-1 h-1 bg-yellow-400/20 rounded-full animate-float-slow"
          style={{
            left: `${(i * 11.2) % 100}%`,
            top: `${(i * 16.1) % 100}%`,
            animationDelay: `${(i * 0.8) % 4}s`,
            animationDuration: `${6 + (i * 0.3) % 3}s`
          }}
        />
      ))}
      
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`orange-${i}`}
          className="absolute w-1.5 h-1.5 bg-orange-400/20 rounded-full animate-float-medium"
          style={{
            left: `${(i * 12.5) % 100}%`,
            top: `${(i * 17.3) % 100}%`,
            animationDelay: `${(i * 0.7) % 5}s`,
            animationDuration: `${4 + (i * 0.4) % 3}s`
          }}
        />
      ))}
      
      {/* Floating lines with movement */}
      <div className="absolute top-1/3 left-10 w-px h-20 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent animate-float-y"></div>
      <div className="absolute bottom-1/3 right-16 w-px h-16 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent animate-float-x" style={{ animationDelay: '1s' }}></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Dark animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black opacity-50"></div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      <FloatingParticles />
      <CursorEffects />
      <VideoModal />
      <Header showSignIn={true} showBookDemo={true} />

      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <BookDemoSection />
      </main>

      <Footer />
    </div>
  );
}
