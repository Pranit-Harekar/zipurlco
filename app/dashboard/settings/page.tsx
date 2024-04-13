import { Metadata } from 'next'

import { getUserById } from '@/app/lib/actions'
import Form from '@/app/ui/components/dashboard/settings/UpdateForm'
import { lusitana } from '@/app/ui/fonts'
import { auth, signOut } from '@/auth'
import { Button, Text } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: 'Settings',
}

export default async function Page() {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    await signOut()
    return
  }

  const user = await getUserById(userId)

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Settings</h1>
      {user && <Form {...{ user }} />}

      <div className="flex flex-col gap-4 items-start rounded-md bg-gray-50 mt-8 p-4 md:p-6">
        <Text weight="medium" size="2">
          Danger Zone
        </Text>
        <Button color="red" variant="ghost">
          Transfer account
        </Button>
        <Button color="red" variant="ghost">
          Delete account
        </Button>
      </div>
    </main>
  )
}
