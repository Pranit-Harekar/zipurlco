'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { register, AuthState } from '@/app/lib/actions'
import { lusitana } from '@/app/ui/fonts'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { AtSymbolIcon, ExclamationCircleIcon, KeyIcon } from '@heroicons/react/24/outline'
import { Button, Link, Spinner, Text, TextField } from '@radix-ui/themes'

export default function SignUpForm() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState<AuthState, FormData>(register, initialState)

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 py-8 gap-4">
        <h1 className={`${lusitana.className} text-2xl`}>Please sign up to continue.</h1>
        <div className="w-full">
          <div>
            <label className="mb-3 mt-5 block text-xs font-medium text-gray-900" htmlFor="email">
              Email
            </label>
            <TextField.Root
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
            >
              <TextField.Slot>
                <AtSymbolIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email &&
                state?.errors.email.map((error: string) => (
                  <Text size="2" color="red" key={error}>
                    {error}
                  </Text>
                ))}
            </div>
          </div>
        </div>
        <SignUpButton />
        <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
          {state?.message && (
            <>
              <ExclamationCircleIcon color="red" className="h-5 w-5" />
              <Text size="2" color="red">
                {state?.message}
              </Text>
            </>
          )}
        </div>
        <Text size="2" color="gray">
          Already have an account? <Link href="/auth/signin">Sign In</Link> or{' '}
          <Link href="/">go home</Link>
        </Text>
      </div>
    </form>
  )
}

function SignUpButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="2" disabled={pending}>
      Sign Up
      {pending ? <Spinner loading /> : <ArrowRightIcon className="h-5 w-5" />}
    </Button>
  )
}
