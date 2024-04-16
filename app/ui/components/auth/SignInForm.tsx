'use client'

import { useFormState, useFormStatus } from 'react-dom'

import { authenticate, AuthState } from '@/app/lib/actions'
import { lusitana } from '@/app/ui/fonts'
import { ArrowRightIcon, AtSymbolIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Button, Link, Spinner, Text, TextField } from '@radix-ui/themes'

export default function SignIn() {
  const initialState = { message: null, errors: {} }
  const [state, dispatch] = useFormState<AuthState, FormData>(authenticate, initialState)

  return (
    <form action={dispatch} className="space-y-3">
      <div className="flex flex-col rounded-lg bg-gray-50 px-6 py-8 gap-4">
        <h1 className={`${lusitana.className} text-2xl`}>Sign into your account</h1>
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
                state.errors.email.map((error: string) => (
                  <Text size="2" color="red" key={error}>
                    {error}
                  </Text>
                ))}
            </div>
          </div>
        </div>
        <ContinueButton />
        <div className="flex items-end space-x-1" aria-live="polite" aria-atomic="true">
          {state?.message && (
            <>
              <ExclamationCircleIcon color="red" className="h-5 w-5" />
              <Text size="2" color="red">
                {state.message}
              </Text>
            </>
          )}
        </div>
        <Text size="2" color="gray">
          Don&apos;t have an account? <Link href="/auth/signup">Sign Up</Link> or{' '}
          <Link href="/">Go Home</Link>
        </Text>

        <Text size="1" color="gray" className="pt-2">
          By continuing, you acknowledge that you understand and agree to the{' '}
          <Link href="/terms">Terms of Service</Link> and{' '}
          <Link href="/privacy">Privacy Policy</Link>.
        </Text>
      </div>
    </form>
  )
}

function ContinueButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="2" disabled={pending}>
      Continue
      {pending ? <Spinner loading /> : <ArrowRightIcon className="h-5 w-5" />}
    </Button>
  )
}
