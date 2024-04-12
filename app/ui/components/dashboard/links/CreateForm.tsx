'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'

import { createLink, CreateLinkState } from '@/app/lib/actions'
import { LinkIcon } from '@heroicons/react/24/outline'
import { Button } from '@radix-ui/themes'

export default function Form() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState<CreateLinkState, FormData>(createLink, initialState)

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Link Target */}
        <div className="mb-4">
          <label htmlFor="target" className="mb-2 block text-sm font-medium">
            Enter or paste a URL
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="target"
                name="target"
                type="url"
                placeholder="https://example.com"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="target-error"
              />
              <LinkIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
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
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          variant="outline"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          <Link href="/dashboard/links">Cancel</Link>
        </Button>
        <Button type="submit">Create Link</Button>
      </div>
    </form>
  )
}
