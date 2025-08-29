/**
 * Homepage Component
 * 
 * Main landing page for the Exponential AI platform.
 * Features hero section, problem/solution sections, and demo booking form.
 * Redirects authenticated users to dashboard.
 */

import { getServerSession } from 'next-auth/next';
import authOptions from '@/app/lib/auth';
import { redirect } from 'next/navigation';

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

export default async function Page() {
  const session = await getServerSession(authOptions);
  
  // Redirect authenticated users to dashboard
  if (session) {
    redirect('/dashboard/overview');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
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
