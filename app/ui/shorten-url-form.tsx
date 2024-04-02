'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { State, shortenUrl } from '@/app/lib/actions'
import { lusitana } from '@/app/ui/fonts'
import { LinkIcon, SparklesIcon } from '@heroicons/react/24/outline'

import { Button } from './button'
import RecentLinks from './recent-links'

export default function ShortenUrlForm() {
  const initialState = {
    // For testing purposes -
    // link: {
    //   id: 'cluh4z1tf0000vdc3wurr6zxn',
    //   createdAt: new Date('2024-04-01T15:59:54.868Z'),
    //   updatedAt: new Date('2024-04-01T15:59:54.868Z'),
    //   alias: 'AuHK2VEHCZ',
    //   target:
    //     'https://www.amazon.com/s?k=boric+powder+for+rice&crid=23DK20YM7HXIF&sprefix=boric+powder+for+rice%2Caps%2C380&ref=nb_sb_noss_1',
    //   clicks: 1,
    // },
    link: null,
    error: null,
  }
  const [state, dispatch] = useFormState<State, FormData>(shortenUrl, initialState)

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 pb-4 pt-8">
        <p
          className={`${lusitana.className} text-xl text-gray-800 pb-4 md:text-2xl md:leading-normal`}
        >
          Shorten your link
        </p>
        <div className="w-full">
          <div>
            <div className="relative">
              <input
                className="peer block w-full h-14 rounded-md border border-gray-200 py-[9px] pl-10 text-sm md:text-xl outline-2 placeholder:text-gray-500"
                id="long_url"
                type="url"
                name="long_url"
                placeholder="Enter or Paste a Long URL"
                required
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <GetYourLinkButton />
      </div>
      {state.link && <RecentLinks link={state.link} className="py-2" />}
    </form>
  )
}

function GetYourLinkButton() {
  const { pending } = useFormStatus()

  return (
    <Button className="mt-4 w-full" aria-disabled={pending}>
      <span className="text-sm md:text-xl">Get your link</span>
      <SparklesIcon className="ml-auto h-6 w-6 text-gray-50" />
    </Button>
  )
}
