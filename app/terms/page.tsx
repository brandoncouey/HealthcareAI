import Footer from "@/app/components/layout/footer";
import Header from "@/app/components/layout/header";

// Force static generation for better performance
export const dynamic = 'force-static'
export const revalidate = false

export default function TermsOfServicePage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
        <Header showSignIn={true} showBookDemo={true} />

        <section className="pt-40 pb-20 bg-gradient-to-br from-black via-slate-950 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/5 via-transparent to-[#00B5E2]/3"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5E2]/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00B5E2]/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00B5E2]/4 rounded-full blur-2xl animate-pulse delay-500"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
                <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x mx-4">
                  Terms of Service
                </h1>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
              </div>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                Last Updated: February 18, 2025
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">1. Introduction</h2>
              <p className="text-slate-300 mb-6">
                Welcome to Exponential Platform's services. These Terms of Service ("Terms") govern your use of our services, including our triage software and related features ("Services"). By using our Services, you agree to these Terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">2. Definitions</h2>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>"We," "us," and "our" refer to Exponential Platform Inc.</li>
                <li>"You" and "your" refer to the organization or entity using our Services</li>
                <li>"Authorized Users" means your employees, consultants, and agents who are authorized to use the Services</li>
                <li>"Customer Data" means any information or content you or your Authorized Users submit through the Services</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">3. Using Our Services</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">3.1 Account Terms</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>You may only use our Services as permitted by these Terms and applicable laws</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You are responsible for all activities that occur under your account</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">3.2 Acceptable Use</h3>
              <p className="text-slate-300 mb-4">You agree not to:</p>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>Copy, modify, or create derivative works of our Services</li>
                <li>Reverse engineer or attempt to extract our source code</li>
                <li>Use the Services in any way that violates applicable laws</li>
                <li>Attempt to gain unauthorized access to the Services</li>
                <li>Use the Services to harm others or spread malware</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">4. Data Privacy and Security</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">4.1 Protected Health Information</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>We handle Protected Health Information (PHI) in accordance with HIPAA regulations</li>
                <li>Our handling of PHI is governed by our Business Associate Agreement</li>
                <li>We implement appropriate security measures to protect your data</li>
                <li>We will promptly notify you of any security incidents affecting your data</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">4.2 Data Usage</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>We may collect anonymized and aggregated statistics about Service usage</li>
                <li>We use this data to improve our Services and understand usage patterns</li>
                <li>We will not sell or share your identifiable data without your permission</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">5. Service Terms</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">5.1 Beta Features</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>We may offer beta or early access features</li>
                <li>Beta features are provided "as is" without warranty</li>
                <li>We may modify or discontinue beta features at any time</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">5.2 Service Availability</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>We strive to maintain high service availability</li>
                <li>We may perform maintenance with advance notice</li>
                <li>We may suspend service if necessary to protect security</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">6. Fees and Payment</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">6.1 Charges</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>You agree to pay all fees specified in your Service Order</li>
                <li>Fees are charged monthly unless otherwise specified</li>
                <li>Payments are non-refundable unless otherwise stated</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">6.2 Late Payments</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>Late payments may incur interest charges</li>
                <li>We may suspend service for accounts 14+ days past due</li>
                <li>You are responsible for applicable taxes and fees</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">7. Term and Termination</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">7.1 Duration</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>Initial term is one year unless otherwise specified</li>
                <li>Service renews automatically unless cancelled</li>
                <li>Either party can terminate with 60 days' notice</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">7.2 Effect of Termination</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>You must stop using the Services upon termination</li>
                <li>You must pay any outstanding fees</li>
                <li>You may request export of your data within 30 days</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">8. Warranties and Liability</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">8.1 Service Warranty</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>Services are provided "as is"</li>
                <li>We make no warranties about reliability or fitness for purpose</li>
                <li>We will use reasonable efforts to maintain service quality</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">8.2 Limitation of Liability</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>We are not liable for indirect or consequential damages</li>
                <li>Our total liability is limited to fees paid in prior 12 months</li>
                <li>These limitations don't apply where prohibited by law</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">9. General Provisions</h2>

              <h3 className="text-xl font-bold text-slate-100 mb-3">9.1 Changes to Terms</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>We may update these Terms with notice</li>
                <li>Continued use after changes means you accept new Terms</li>
                <li>Material changes require your explicit consent</li>
              </ul>

              <h3 className="text-xl font-bold text-slate-100 mb-3">9.2 Governing Law</h3>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li>These Terms are governed by New York law</li>
                <li>Disputes will be resolved in New York courts</li>
                <li>Each party consents to exclusive jurisdiction there</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">10. Contact Information</h2>
              <p className="text-slate-300 mb-6">
                For questions about these Terms, contact us at:
              </p>
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <p className="text-slate-300 font-semibold">Exponential Platform Inc.</p>
                <p className="text-slate-400">34 Thames Boulevard</p>
                <p className="text-slate-400">Bergenfield, NJ 07621</p>
                <p className="text-slate-400">Email: daniel@exponentialplatform.com</p>
              </div>
              <p className="text-slate-300">
                By using our Services, you acknowledge that you have read and agree to these Terms.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
}
