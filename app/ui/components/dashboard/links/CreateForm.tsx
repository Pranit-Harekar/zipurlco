'use client'

import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'

import { createLink, CreateLinkState } from '@/app/lib/actions'
import { LinkIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Button, IconButton, Spinner, TextField } from '@radix-ui/themes'
import { LinkStatusInput } from './Status'

export default function Form() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState<CreateLinkState, FormData>(createLink, initialState)

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Link Target */}
        <div className="mb-8">
          <label htmlFor="target" className="mb-3 block text-sm font-medium">
            Enter or paste a URL
          </label>
          <div className="relative mt-2 rounded-md">
            <TextField.Root
              id="target"
              name="target"
              type="url"
              placeholder="https://example.com"
              aria-describedby="target-error"
            >
              <TextField.Slot>
                <LinkIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            <div id="target-error" aria-live="polite" aria-atomic="true">
              {state.errors?.target &&
                state.errors.target.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Link Status */}
        <div className="mb-4">
          <LinkStatusInput />
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant="outline"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <Link href="/dashboard/links">Cancel</Link>
        </Button>
        <CreateLinkButton />
      </div>
    </form>
  )
}

function CreateLinkButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="2" disabled={pending} type="submit">
      Create Link
      {pending && <Spinner loading />}
    </Button>
  )
}
