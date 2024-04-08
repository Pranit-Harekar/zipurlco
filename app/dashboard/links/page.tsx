import { Metadata } from 'next'

import { lusitana } from '@/app/ui/fonts'
import { Button, Skeleton } from '@radix-ui/themes'

export const metadata: Metadata = {
  title: 'Links',
}

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <Button>Create a Link</Button>
      <div className="mt-4 flow-root max-w-2/5 animate-pulse">
        <div className="inline-block min-w-full align-middle">
          <div className="py-2 md:pt-0">
            <div className="flex justify-between gap-2">
              {/* <!-- Links --> */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-12 h-12" />
                <div className="flex flex-col space-y-2 w-44 md:w-56 lg:w-72 xl:w-80">
                  <Skeleton className="h-5" />
                  <Skeleton className="h-5" />
                </div>
              </div>
              {/* <!-- Options --> */}
              <div className="items-center gap-1 hidden lg:flex">
                <Skeleton className="w-7 h-7" />
                <Skeleton className="w-0.5 h-7 mx-2" />
                <Skeleton className="w-7 h-7" />
              </div>

              {/* <!-- Options - small form factor--> */}
              <div className="items-center gap-1 flex lg:hidden">
                <Skeleton className="w-7 h-7" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
