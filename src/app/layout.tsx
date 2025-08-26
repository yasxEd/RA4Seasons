import type { Metadata } from 'next'
import './globals.css'
import BodyWithDir from '@/components/BodyWithDir'

export const metadata: Metadata = {
  title: 'Riad Atlas 4 Seasons',
  description: 'Explore the legacy of Moroccan hospitality with Riad Atlas 4 Seasons—authentic, artisan-made experiences for the modern world.',
  keywords: 'riad, atlas, imlil, moroccan hospitality, handmade, artisan, ethical travel, mountain retreat, home decor',
  authors: [{ name: 'Riad Atlas 4 Seasons Team' }],
  openGraph: {
    title: 'Riad Atlas 4 Seasons - Mountain Retreat',
    description: 'Explore the legacy of Moroccan hospitality with Riad Atlas 4 Seasons—authentic, artisan-made experiences for the modern world.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <BodyWithDir>
          {children}
        </BodyWithDir>
      </body>
    </html>
  )
}