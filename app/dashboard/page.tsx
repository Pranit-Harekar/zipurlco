import { lusitana } from '@/app/ui/fonts'
import { PowerIcon } from '@heroicons/react/24/outline'
import { Button } from '@radix-ui/themes'
import { signOut } from '@/auth'

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <form
        action={async () => {
          'use server'
          await signOut()
        }}
      >
        <Button variant="soft">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </Button>
      </form>
    </main>
  )
}
