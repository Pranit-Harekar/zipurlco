import Image from 'next/image'

import { lusitana } from '@/app/ui/fonts'
import { Bars2Icon } from '@heroicons/react/24/outline'
import { DropdownMenu, IconButton, Link, Separator, Text } from '@radix-ui/themes'

import ZipUrlLogo from './ui/components/Logo'
import ShortenUrlForm from './ui/components/ShortenUrlForm'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex flex-row h-20 items-center justify-between rounded-lg bg-blue-500 p-4">
        <ZipUrlLogo />
        <div className="gap-6 hidden lg:flex pr-4">
          <Link href="/auth/signin" size="3">
            <Text className="text-white">Sign In</Text>
          </Link>
          <Link href="/auth/signup" size="3">
            <Text className="text-white">Sign Up</Text>
          </Link>
        </div>

        <div className="block lg:hidden">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton>
                <Bars2Icon className="w-6 h-6" />
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>
                <Link href="/auth/signin" size="2">
                  <Text>Signin</Text>
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>
                <Link href="/auth/signup" size="2">
                  <Text>Sign Up</Text>
                </Link>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 lg:w-2/5 lg:px-20">
          <p className={`${lusitana.className} text-2xl md:text-4xl md:leading-normal`}>
            <strong>Shorter Links. Bigger Impact.</strong> <br />
            <span className="text-lg md:text-2xl">
              ZipURL makes it easy to create, manage, and share shortened URLs. And it&apos;s{' '}
              <span className="underline decoration-4 decoration-blue-500">FREE!</span>
            </span>
          </p>
          <ShortenUrlForm />
        </div>
        <div className="flex items-center justify-center p-6 lg:w-3/5 lg:px-28 lg:py-12">
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  )
}
