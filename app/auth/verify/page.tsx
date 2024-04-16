import Link from 'next/link'

import Logo from '@/app/ui/components/Logo'
import { lusitana } from '@/app/ui/fonts'
import { Button, Text } from '@radix-ui/themes'

export default function VerifyPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 py-8 gap-6">
          <h1 className={`${lusitana.className} text-2xl`}>Verify your email</h1>
          <Text size="2" color="gray">
            We&apos;ve sent you an email with a link to verify your account. Click the link in the
            email to continue. If you don&apos;t see the email, check your spam folder.
          </Text>
        </div>
      </div>
    </main>
  )
}
