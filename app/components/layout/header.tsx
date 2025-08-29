"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  showSignIn?: boolean;
  showBookDemo?: boolean;
}

export default function Header({ showSignIn = true, showBookDemo = true }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-[#00B5E2]/30 overflow-hidden">
      {/* Lightning effect on navigation border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent animate-lightning-stream-slow-nav"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Exponential AI"
              width={160}
              height={160}
              className="w-40 h-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">
              Terms
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {showSignIn && (
              <Link href="/login">
                <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 rounded-md">
                  Sign In
                </button>
              </Link>
            )}
            {showBookDemo && (
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-[#00B5E2] to-cyan-500 hover:from-[#00B5E2]/90 hover:to-cyan-500/90">
                  Book Demo
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800/30">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/contact" className="text-slate-300 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-slate-300 hover:text-white transition-colors">
                Terms
              </Link>
              {showSignIn && (
                <Link href="/login">
                  <button className="w-full text-left px-4 py-2 text-slate-300 hover:text-white transition-colors duration-200 rounded-md">
                    Sign In
                  </button>
                </Link>
              )}
              {showBookDemo && (
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-[#00B5E2] to-cyan-500 hover:from-[#00B5E2]/90 hover:to-cyan-500/90 w-full">
                    Book Demo
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

