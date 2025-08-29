import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black/20 border-t border-[#00B5E2]/30 overflow-hidden relative">
      {/* Lightning effect on footer border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent animate-lightning-stream-slow-footer"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-2">
              <Image
                src="/logo.svg"
                alt="Exponential AI"
                width={220}
                height={120}
                className="w-55 h-30"
              />
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              AI-powered healthcare management solutions designed for post-acute care operators.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-slate-400">
              <p>34 Thames Blvd</p>
              <p>Bergenfield, NJ 07621</p>
              <p>
                <a 
                  href="tel:+15551234567" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </p>
              <p>
                <a 
                  href="mailto:info@exponentialplatform.com" 
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  info@exponentialplatform.com
                </a>
              </p>
              <p>
                <a 
                  href="https://www.linkedin.com/company/104255014/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/30 mt-4 pt-4 text-center">
          <p className="text-slate-400">
            © 2025 Exponential. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
