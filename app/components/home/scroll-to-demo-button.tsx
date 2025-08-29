'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

interface ScrollToDemoButtonProps {
  variant: 'hero' | 'navbar';
}

export default function ScrollToDemoButton({ variant }: ScrollToDemoButtonProps) {
  const scrollToDemo = () => {
    const element = document.getElementById('book-demo-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (variant === 'navbar') {
    return (
      <Button 
        onClick={scrollToDemo}
        className="bg-[#00B5E2] hover:bg-[#00B5E2]/80 text-white border-[#00B5E2]/30"
      >
        Book a Demo
      </Button>
    );
  }

  return (
    <Button 
      onClick={scrollToDemo}
      size="lg" 
      className="bg-[#00B5E2] hover:bg-[#00B5E2]/80 text-white border-[#00B5E2]/30 px-8"
    >
      Book a Demo
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  );
}


