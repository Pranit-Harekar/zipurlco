import Link from 'next/link'

import Logo from '@/app/ui/components/Logo'
import { lusitana } from '@/app/ui/fonts'
import { Button, Text } from '@radix-ui/themes'

export default function Page({
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let errorMap = {
    default: {
      title: '404 Not Found',
      message: 'Could not find the requested link.',
      action: 'Go Back',
      href: '/',
    },
    verification: {
      title: 'Unable to Sign In',
      message:
        'The sign in link is no longer valid. It may have been used already or it may have expired.',
      action: 'Sign In',
      href: '/auth/signin',
    },
  }

  let data
  switch (searchParams.error?.toString().toLowerCase()) {
    case 'verification':
      data = errorMap.verification
      break
    default:
      data = errorMap.default
  }

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-50 px-6 py-8 gap-6">
          <h1 className={`${lusitana.className} text-2xl`}>{data.title}</h1>
          <Text size="2" color="gray">
            {data.message}
          </Text>
          <Link href={data.href}>
            <Button variant="soft">{data.action}</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
