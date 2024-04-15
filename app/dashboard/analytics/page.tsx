import { Metadata } from 'next'

import { AnalyticsSkeleton } from '@/app/ui/components/dashboard/analytics/AnalyticsSkeleton'
import { lusitana } from '@/app/ui/fonts'

export const metadata: Metadata = {
  title: 'Analytics',
}

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Analytics</h1>
      <AnalyticsSkeleton />
    </main>
  )
}
