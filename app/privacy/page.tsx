import Footer from "@/app/components/layout/footer";
import Header from "@/app/components/layout/header";

export const dynamic = 'force-static'
export const revalidate = false

export default function PrivacyPage() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
        <Header showSignIn={true} showBookDemo={true} />

        {/* Privacy Policy Section */}
        <section className="pt-40 pb-20 bg-gradient-to-br from-black via-slate-950 to-slate-900 relative overflow-hidden">
          {/* Background glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00B5E2]/5 via-transparent to-[#00B5E2]/3"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00B5E2]/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00B5E2]/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#00B5E2]/4 rounded-full blur-2xl animate-pulse delay-500"></div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#00B5E2]"></div>
                <h1 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00B5E2] to-white animate-gradient-x mx-4">
                  Privacy Policy
                </h1>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#00B5E2]"></div>
              </div>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                Your privacy is important to us. Learn how we protect and handle your personal information.
              </p>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300 mb-8">
                Welcome to Exponential LLC ("we," "our," "us")! Your privacy is important to us, and we are committed to protecting your personal information when you interact with our website and services. This Privacy Policy outlines how we collect, use, and protect your data while using our website at www.exponetialtriage.com ("Website") and other related platforms, applications, and services.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Acceptance and Jurisdiction</h2>
              <p className="text-slate-300 mb-6">
                By using or accessing our Website, you agree to the terms of this Privacy Policy and our data handling practices. Our Website is hosted in the United States. If you are accessing it from another country, you consent to the transfer and processing of your personal information in accordance with this Privacy Policy. Please ensure that you comply with applicable laws before using the Website.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Non-Personal Information Collection</h2>
              <p className="text-slate-300 mb-6">
                When you visit our Website, we automatically collect non-personally identifiable information, such as your IP address, browser type, operating system, and the pages you visit before, during, and after accessing the Website. This data is gathered via cookies, small files stored on your device to help us enhance the Website's functionality and user experience.
              </p>
              <p className="text-slate-300 mb-6">
                The non-personally identifiable data we collect helps us understand how our Website is used, identify trends, and improve navigation and content. From time to time, we may share aggregated non-personal data with third parties, such as advertisers or partners, for analytical and reporting purposes.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Cookies</h2>
              <p className="text-slate-300 mb-6">
                Cookies are an essential part of the Website's functionality. They enable us to remember your preferences, login information, and interactions with our Website. You can adjust your browser settings to refuse cookies, but doing so may affect the performance of certain features on the Website.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Analytics and Advertising</h2>
              <p className="text-slate-300 mb-6">
                To improve our services and provide a personalized experience, we use third-party tools like Google Analytics to track user activities on the Website. This includes information such as IP addresses, browser details, pages visited, and time spent on specific pages. This data allows us to analyze user behavior and optimize our services, as well as deliver targeted ads across other platforms.
              </p>
              <p className="text-slate-300 mb-6">
                If you prefer not to have your information used for advertising purposes, you can opt-out by visiting the Google Analytics opt-out page.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Personally Identifiable Information</h2>
              <p className="text-slate-300 mb-6">
                When you interact with our Website or register for our services, we may collect personally identifiable information (PII), such as your name, email address, mailing address, phone number, and payment details. Providing PII is voluntary, but opting not to share it may limit your access to certain features or services.
              </p>
              <p className="text-slate-300 mb-6">
                We use this information to process transactions, provide customer support, communicate with you, and personalize your experience, including sending you content, offers, and advertisements that may interest you.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Disclosure of Personally Identifiable Information</h2>
              <ul className="text-slate-300 mb-6 space-y-2 list-disc list-inside">
                <li><strong>Legal Compliance:</strong> We may disclose PII when required by law, to prevent fraud, or to protect the rights, property, or safety of Exponential LLC, our users, or others.</li>
                <li><strong>Marketing Communications:</strong> We may use your PII to send promotional offers unless you opt-out during registration. You can unsubscribe at any time.</li>
                <li><strong>Service Providers:</strong> We may share your PII with third-party service providers who assist us with customer support, data analysis, order fulfillment, and website maintenance.</li>
                <li><strong>Business Transitions:</strong> In the event of a business transaction, such as a merger, acquisition, or bankruptcy, your PII may be transferred to the successor organization.</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Data Security</h2>
              <p className="text-slate-300 mb-6">
                We take the protection of your personal data seriously and use reasonable measures to safeguard it from unauthorized access, loss, or alteration. However, no security system is entirely foolproof, so it is important to maintain the confidentiality of your account information and notify us immediately if you suspect any unauthorized access.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-slate-300 mb-6">
                We may update this Privacy Policy as our practices evolve or in response to legal changes. The most recent update date will be displayed at the top of the page. We encourage you to periodically review this policy. If significant changes are made, we may notify you by email or other means.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Children's Privacy</h2>
              <p className="text-slate-300 mb-6">
                Our Website is not intended for children under the age of 13, and we do not knowingly collect personal information from children. If you believe your child has provided personal information, please contact us to have it removed.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">California Privacy Rights</h2>
              <p className="text-slate-300 mb-6">
                California residents have specific rights regarding their personal information under California law. If you are a California resident and wish to make a request about your personal information, please contact us using the information below.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Do Not Track</h2>
              <p className="text-slate-300 mb-6">
                Our Website does not respond to "Do Not Track" signals. However, we respect your browser's privacy preferences and will honor your settings regarding cookies and tracking technologies.
              </p>

              <h2 className="text-2xl font-bold text-slate-100 mb-4">Contact Information</h2>
              <p className="text-slate-300 mb-6">
                If you have any questions or concerns about this Privacy Policy, please contact us:
              </p>
              <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
                <p className="text-slate-300 font-semibold">Exponential LLC</p>
                <p className="text-slate-400">34 Thames Blvd</p>
                <p className="text-slate-400">Bergenfield, NJ 07621, USA</p>
                <p className="text-slate-400">Email: support@exponentialplatform.com</p>
              </div>
              <p className="text-slate-300">
                Thank you for choosing Exponential LLC. We are committed to protecting your privacy and maintaining your trust while you use our Website and services.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
  );
}
