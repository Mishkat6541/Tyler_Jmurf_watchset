import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
}

export const metadata: Metadata = {
  title: {
    default: 'Horologer - Craft Your Own Timepiece',
    template: '%s | Horologer',
  },
  description:
    'Premium watch kits and fully assembled mechanical timepieces. Build your own luxury watch with precision components and expert guidance. Free worldwide shipping on orders over $500.',
  keywords: [
    'watch kit', 'DIY watch', 'mechanical watch', 'watchmaking',
    'luxury watch', 'watch assembly', 'custom watch', 'horology',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Horologer',
    title: 'Horologer - Craft Your Own Timepiece',
    description: 'Premium watch kits and assembled mechanical timepieces for the modern horologist.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="bg-brand-black text-brand-ivory font-sans antialiased">
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  )
}
