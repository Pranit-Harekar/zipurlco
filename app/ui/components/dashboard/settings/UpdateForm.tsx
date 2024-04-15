'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'

import { updateUser, UpdateUserState } from '@/app/lib/actions'
import { AtSymbolIcon, EyeIcon, KeyIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client'
import { Button, IconButton, Spinner, Text, TextField } from '@radix-ui/themes'

export default function Form({ user }: { user: User }) {
  const initialState = { message: null, errors: {} }
  const updateUserWithId = updateUser.bind(null, user.id)
  const [state, dispatch] = useFormState<UpdateUserState, FormData>(updateUserWithId, initialState)
  const { email } = user

  useEffect(() => {
    const message = state?.message
    if (message) {
      toast(message, {
        position: 'bottom-right',
      })
    }
  })

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* User Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <TextField.Root
              id="email"
              name="email"
              type="email"
              placeholder="https://example.com"
              aria-describedby="email-error"
              readOnly
              value={email}
            >
              <TextField.Slot>
                <AtSymbolIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Slot pr="3">
                <IconButton size="2" variant="ghost" type="reset" color="gray">
                  <XMarkIcon height="16" width="16" />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            <div id="email-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.email &&
                state?.errors.email.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        {/* User Password */}
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-2 rounded-md">
            <TextField.Root
              id="password"
              name="password"
              type="password"
              placeholder="********"
              aria-describedby="password-error"
            >
              <TextField.Slot>
                <KeyIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Slot pr="3">
                <IconButton size="2" variant="ghost" type="reset" color="gray">
                  <EyeIcon height="16" width="16" />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            <div id="password-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.password &&
                state?.errors.password.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium">
            Confirm Password
          </label>
          <div className="relative mt-2 rounded-md">
            <TextField.Root
              id="confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="********"
              aria-describedby="confirm-password-error"
            >
              <TextField.Slot>
                <KeyIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Slot pr="3">
                <IconButton size="2" variant="ghost" type="reset" color="gray">
                  <EyeIcon height="16" width="16" />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            <div id="confirm-password-error" aria-live="polite" aria-atomic="true">
              {state?.errors?.confirmPassword &&
                state?.errors.confirmPassword.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Password policy */}
        <Text color="gray" size="1">
          Passwords must be at least 8 characters long and contain one uppercase letter, one
          lowercase letter, one number, and one special character.
        </Text>
        <div className="mt-6 flex gap-4 justify-end">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <UpdateButton />
        </div>
      </div>
      <Toaster />
    </form>
  )
}

function UpdateButton() {
  const { pending } = useFormStatus()

  return (
    <Button size="2" disabled={pending}>
      Update
      {pending && <Spinner loading />}
    </Button>
  )
}
