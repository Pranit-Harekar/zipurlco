'use client'

import { useFormState } from 'react-dom'

import { updateUser } from '@/app/lib/actions'
import { AtSymbolIcon, EyeIcon, KeyIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client'
import { Button, IconButton, Text, TextField } from '@radix-ui/themes'

export default function Form({ user }: { user: User }) {
  const initialState = { message: '', errors: {} }
  const updateUserWithId = updateUser.bind(null, user.id)
  const [state, dispatch] = useFormState(updateUserWithId, initialState)
  const { email } = user

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
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
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
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
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
          <Button type="submit">Update</Button>
        </div>
      </div>
    </form>
  )
}
