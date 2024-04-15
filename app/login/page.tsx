import Link from 'next/link'

import LoginForm from '@/app/ui/components/login/LoginForm'
import Logo from '@/app/ui/components/Logo'

import { WIPCallout } from '../ui/components/WIPCallout'

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <WIPCallout />
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Link href="/">
              <Logo />
            </Link>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
