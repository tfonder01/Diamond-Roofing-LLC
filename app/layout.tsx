import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diamond Roofing LLC | Residential Roofing in Clarksville, TN',
  description: 'Diamond Roofing LLC provides residential roofing, repairs, siding, framing, remodeling, decks, and fencing in Clarksville, TN.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#10151d',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
