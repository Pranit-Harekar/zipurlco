import Image from 'next/image'

import { lusitana } from '@/app/ui/fonts'

import ZipUrlLogo from './ui/components/Logo'
import ShortenUrlForm from './ui/components/ShortenUrlForm'

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4">
        <ZipUrlLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 lg:w-2/5 lg:px-20">
          <p
            className={`${lusitana.className} text-2xl text-gray-800 md:text-4xl md:leading-normal`}
          >
            <strong>Shorter Links. Bigger Impact.</strong> <br />
            <span className="text-lg md:text-2xl">
              ZipURL makes it easy to <span className="bg-blue-100">create</span>,
              <span className="bg-blue-100">manage</span>, and{' '}
              <span className="bg-blue-100">share</span> shortened URLs. And it&apos;s{' '}
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
