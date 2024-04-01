import '@/app/ui/global.css'
import { inter } from '@/app/ui/fonts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | ZipURL',
    default: 'ZipURL',
  },
  description:
    'ZipURL is a URL shortener that makes it easy to create, manage, and share shortened URLs.',
  metadataBase: new URL('https://zipurl.co'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
