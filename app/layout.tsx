import './components/ui/global.css'
import { Toaster } from '@/app/components/ui/toaster'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Healthcare AI - Healthcare Platform</title>
      </head>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
