'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import toast, { Toaster } from 'react-hot-toast'

import { updateUser, UpdateUserState } from '@/app/lib/actions'
import { AtSymbolIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client'
import { Button, Spinner, TextField } from '@radix-ui/themes'

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

        {/* <div className="mt-6 flex gap-4 justify-end">
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <UpdateButton />
        </div> */}
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
