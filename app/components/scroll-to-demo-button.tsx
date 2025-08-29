'use client';

import { ArrowRight } from 'lucide-react';

interface ScrollToDemoButtonProps {
  variant?: 'navbar' | 'hero';
  children?: React.ReactNode;
}

export default function ScrollToDemoButton({ variant = 'navbar', children }: ScrollToDemoButtonProps) {
  const handleScroll = () => {
    const element = document.getElementById('book-demo-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (variant === 'navbar') {
    return (
      <button 
        onClick={handleScroll}
        className="bg-[#00B5E2]/90 hover:bg-[#00B5E2]/70 text-white border-[#00B5E2]/30 px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        {children || 'Book a Demo'}
      </button>
    );
  }

  return (
    <button 
      onClick={handleScroll}
      className="inline-flex items-center px-8 py-4 text-lg bg-[#00B5E2]/90 hover:bg-[#00B5E2]/70 text-white font-semibold rounded-lg border-[#00B5E2]/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 cursor-glow"
      data-cursor-glow="blue"
    >
      {children || 'Book a Demo'}
      <ArrowRight className="ml-2 h-5 w-5" />
    </button>
  );
}
