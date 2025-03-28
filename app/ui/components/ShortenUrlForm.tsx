'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { createTrialLink, State } from '@/app/lib/actions'
import { LinkIcon, SparklesIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, IconButton, Link, Spinner, Text, TextField } from '@radix-ui/themes'

import RecentLinks, { RecentLinksSkeleton } from './RecentLinks'

export default function ShortenUrlForm() {
  const initialState = {
    // For testing purposes
    // link: {
    //   id: 'cluh4z1tf0000vdc3wurr6zxn',
    //   createdAt: new Date('2024-04-01T15:59:54.868Z'),
    //   updatedAt: new Date('2024-04-01T15:59:54.868Z'),
    //   alias: 'AuHK2VEHCZ',
    //   target:
    //     'https://www.amazon.com/s?k=boric+powder+for+rice&crid=23DK20YM7HXIF&sprefix=boric+powder+for+rice%2Caps%2C380&ref=nb_sb_noss_1',
    //   clicks: 1,
    //   thumbnail: '',
    //   userId: 'cluh4z1tf0000vdc3wurr6zxn',
    // },
    link: null,
    error: null,
  }
  const [state, dispatch] = useFormState<State, FormData>(createTrialLink, initialState)

  return (
    <>
      <form action={dispatch} className="space-y-2">
        <div className="flex flex-col gap-4">
          <TextField.Root
            id="long_url"
            type="url"
            name="long_url"
            placeholder="Enter or Paste a Long URL"
            required
            size="3"
          >
            <TextField.Slot>
              <LinkIcon height="16" width="16" />
            </TextField.Slot>
            <TextField.Slot pr="3">
              <IconButton size="2" variant="ghost" type="reset" color="gray">
                <XMarkIcon height="16" width="16" />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
          <GetYourLinkButton />
        </div>
      </form>
      {state.link ? <RecentLinks link={state.link} /> : <RecentLinksSkeleton />}
      <Text color="gray" size="2">
        Want to create more links, edit them, or view their analytics?{' '}
        <Link href="/signup" underline="always">
          Create a free account
        </Link>{' '}
        or{' '}
        <Link href="/auth/signin" underline="always">
          login
        </Link>{' '}
        to get started.
      </Text>
    </>
  )
}

function GetYourLinkButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="3" className="mt-4 w-full" disabled={pending}>
      Get your link
      {pending ? <Spinner loading /> : <SparklesIcon className="h-6 w-6" />}
    </Button>
  )
}
