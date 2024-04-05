import '@radix-ui/themes/styles.css'
import '@/app/ui/global.css'

import { Metadata } from 'next'

import { inter } from '@/app/ui/fonts'
import { Theme } from '@radix-ui/themes'

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
      <body className={`${inter.className} antialiased`}>
        <Theme accentColor="blue" appearance="light">
          {children}
        </Theme>
      </body>
    </html>
  )
}
